import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// الحصول على قائمة طلبات المختبر
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const clinicId = searchParams.get("clinicId")
    const labId = searchParams.get("labId")
    const status = searchParams.get("status")
    const patientId = searchParams.get("patientId")

    // بناء الفلاتر
    const where: any = {}

    if (clinicId) {
      where.clinicId = clinicId
    }

    if (labId) {
      where.labId = labId
    }

    if (status) {
      where.status = status
    }

    if (patientId) {
      where.patientId = patientId
    }

    // الحصول على الطلبات
    const orders = await prisma.labOrder.findMany({
      where,
      include: {
        lab: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        plan: {
          include: {
            patient: true,
            treatment: true,
          },
        },
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      orders,
      count: orders.length,
    })
  } catch (error) {
    console.error("Lab orders fetch error:", error)
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب طلبات المختبر" },
      { status: 500 }
    )
  }
}
