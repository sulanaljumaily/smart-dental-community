import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "غير مصرح" },
        { status: 401 }
      )
    }

    const clinic = await prisma.clinic.findUnique({
      where: { id: params.id },
      select: {
        bookingLink: true,
        onlineBookingEnabled: true,
        showOnMap: true,
        bookingSlotDuration: true,
        maxBookingsPerDay: true,
        requireApproval: true,
        autoConfirm: true,
      },
    })

    if (!clinic) {
      return NextResponse.json(
        { success: false, error: "العيادة غير موجودة" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      settings: clinic,
    })
  } catch (error) {
    console.error("خطأ في جلب إعدادات الحجز:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في جلب الإعدادات" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "غير مصرح" },
        { status: 401 }
      )
    }

    const body = await req.json()

    // التحقق من الاشتراك
    const subscription = await prisma.clinicSubscription.findFirst({
      where: {
        clinicId: params.id,
        isActive: true,
      },
      include: {
        plan: true,
      },
    })

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: "لا يوجد اشتراك نشط" },
        { status: 403 }
      )
    }

    // التحقق من الصلاحيات بناءً على الباقة
    if (body.onlineBookingEnabled && !subscription.plan.allowOnlineBooking) {
      return NextResponse.json(
        { success: false, error: "الحجز الرقمي غير متاح في باقتك الحالية" },
        { status: 403 }
      )
    }

    if (body.showOnMap && !subscription.plan.allowMapDisplay) {
      return NextResponse.json(
        { success: false, error: "إظهار العيادة في الخريطة غير متاح في باقتك الحالية" },
        { status: 403 }
      )
    }

    // تحديث الإعدادات
    const updatedClinic = await prisma.clinic.update({
      where: { id: params.id },
      data: {
        bookingLink: body.bookingLink,
        onlineBookingEnabled: body.onlineBookingEnabled,
        showOnMap: body.showOnMap,
        bookingSlotDuration: body.bookingSlotDuration,
        maxBookingsPerDay: body.maxBookingsPerDay,
        requireApproval: body.requireApproval,
        autoConfirm: body.autoConfirm,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: "تم تحديث الإعدادات بنجاح",
      clinic: updatedClinic,
    })
  } catch (error: any) {
    console.error("خطأ في تحديث إعدادات الحجز:", error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: "رابط الحجز مستخدم بالفعل" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: "حدث خطأ في تحديث الإعدادات" },
      { status: 500 }
    )
  }
}
