import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// الحصول على قائمة المختبرات المحفوظة
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

    if (!clinicId) {
      return NextResponse.json(
        { error: "معرّف العيادة مطلوب" },
        { status: 400 }
      )
    }

    const savedLabs = await prisma.savedLab.findMany({
      where: { clinicId },
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
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // تنسيق البيانات
    const formattedLabs = savedLabs.map((savedLab) => ({
      id: savedLab.id,
      labId: savedLab.labId,
      labName: savedLab.lab?.labName || savedLab.customName || "غير محدد",
      labPhone: savedLab.lab?.user?.phone || savedLab.customPhone,
      labAddress: savedLab.lab?.address || savedLab.customAddress,
      isInPlatform: savedLab.isInPlatform,
      specializations: savedLab.lab?.specializations || [],
      createdAt: savedLab.createdAt,
    }))

    return NextResponse.json({
      success: true,
      labs: formattedLabs,
      count: formattedLabs.length,
    })
  } catch (error) {
    console.error("Saved labs fetch error:", error)
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب المختبرات المحفوظة" },
      { status: 500 }
    )
  }
}

// إضافة مختبر جديد إلى القائمة المحفوظة
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { clinicId, labId, customName, customPhone, customAddress } = body

    if (!clinicId) {
      return NextResponse.json(
        { error: "معرّف العيادة مطلوب" },
        { status: 400 }
      )
    }

    // التحقق من وجود المختبر أو البيانات المخصصة
    const isInPlatform = Boolean(labId)

    if (!isInPlatform && (!customName || !customPhone)) {
      return NextResponse.json(
        { error: "يرجى إدخال بيانات المختبر" },
        { status: 400 }
      )
    }

    // التحقق من عدم تكرار المختبر
    if (labId) {
      const existingLab = await prisma.savedLab.findUnique({
        where: {
          clinicId_labId: {
            clinicId,
            labId,
          },
        },
      })

      if (existingLab) {
        return NextResponse.json(
          { error: "هذا المختبر موجود بالفعل في القائمة" },
          { status: 400 }
        )
      }
    }

    const savedLab = await prisma.savedLab.create({
      data: {
        clinicId,
        labId: labId || undefined,
        customName,
        customPhone,
        customAddress,
        isInPlatform,
      },
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
      },
    })

    return NextResponse.json({
      success: true,
      lab: savedLab,
      message: "تمت إضافة المختبر بنجاح",
    })
  } catch (error) {
    console.error("Saved lab creation error:", error)
    return NextResponse.json(
      { error: "حدث خطأ أثناء إضافة المختبر" },
      { status: 500 }
    )
  }
}

// حذف مختبر من القائمة المحفوظة
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const savedLabId = searchParams.get("id")

    if (!savedLabId) {
      return NextResponse.json(
        { error: "معرّف المختبر مطلوب" },
        { status: 400 }
      )
    }

    await prisma.savedLab.delete({
      where: { id: savedLabId },
    })

    return NextResponse.json({
      success: true,
      message: "تم حذف المختبر بنجاح",
    })
  } catch (error) {
    console.error("Saved lab deletion error:", error)
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف المختبر" },
      { status: 500 }
    )
  }
}
