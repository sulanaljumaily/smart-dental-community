import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - الحصول على ترقيات النخبة
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const province = searchParams.get("province")
    const dentistId = searchParams.get("dentistId")

    const where: any = { isActive: true }

    if (province) where.province = province
    if (dentistId) where.dentistId = dentistId

    const promotions = await prisma.dentistPromotion.findMany({
      where,
      include: {
        dentist: {
          select: {
            id: true,
            name: true,
            avatar: true,
            dentistProfile: {
              select: {
                specialization: true,
                city: true,
              },
            },
          },
        },
      },
      orderBy: {
        promotedAt: "desc",
      },
    })

    return NextResponse.json({ promotions }, { status: 200 })
  } catch (error) {
    console.error("Error fetching promotions:", error)
    return NextResponse.json(
      { error: "Failed to fetch promotions" },
      { status: 500 }
    )
  }
}

// POST - ترقية طبيب إلى النخبة (للإدارة فقط)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      dentistId,
      province,
      reason,
      achievements,
      promotedByAdminId,
    } = body

    if (!dentistId || !province || !promotedByAdminId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // إنشاء الترقية
    const promotion = await prisma.dentistPromotion.create({
      data: {
        dentistId,
        province,
        reason,
        achievements,
        promotedByAdminId,
      },
    })

    // تحديث معلومات الطبيب
    await prisma.dentistProfile.update({
      where: { userId: dentistId },
      data: {
        isElite: true,
        eliteProvince: province,
      },
    })

    return NextResponse.json({ promotion }, { status: 201 })
  } catch (error) {
    console.error("Error creating promotion:", error)
    return NextResponse.json(
      { error: "Failed to create promotion" },
      { status: 500 }
    )
  }
}

// DELETE - إلغاء ترقية النخبة (للإدارة فقط)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dentistId = searchParams.get("dentistId")
    const province = searchParams.get("province")

    if (!dentistId || !province) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      )
    }

    // إلغاء الترقية
    await prisma.dentistPromotion.update({
      where: {
        dentistId_province: {
          dentistId,
          province: province as any,
        },
      },
      data: {
        isActive: false,
      },
    })

    // تحديث معلومات الطبيب
    await prisma.dentistProfile.update({
      where: { userId: dentistId },
      data: {
        isElite: false,
        eliteProvince: null,
      },
    })

    return NextResponse.json(
      { message: "Promotion cancelled successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error cancelling promotion:", error)
    return NextResponse.json(
      { error: "Failed to cancel promotion" },
      { status: 500 }
    )
  }
}
