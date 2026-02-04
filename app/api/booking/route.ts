import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendBookingConfirmationEmail } from "@/lib/email"
import { sendBookingConfirmationSMS } from "@/lib/sms"

// Generate confirmation code
function generateConfirmationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      clinicId,
      patientName,
      patientPhone,
      patientEmail,
      patientAge,
      patientGender,
      appointmentDate,
      appointmentTime,
      reason,
      symptoms,
      isFirstVisit,
    } = body

    // Validate required fields
    if (!clinicId || !patientName || !patientPhone || !appointmentDate || !appointmentTime || !reason) {
      return NextResponse.json(
        { message: "الرجاء ملء جميع الحقول المطلوبة" },
        { status: 400 }
      )
    }

    // Check if clinic exists and online booking is enabled
    const clinic = await prisma.clinic.findUnique({
      where: { id: clinicId },
      select: {
        id: true,
        onlineBookingEnabled: true,
        maxBookingsPerDay: true,
        requireApproval: true,
        autoConfirm: true,
      },
    })

    if (!clinic) {
      return NextResponse.json(
        { message: "العيادة غير موجودة" },
        { status: 404 }
      )
    }

    if (!clinic.onlineBookingEnabled) {
      return NextResponse.json(
        { message: "الحجز الرقمي غير مفعل لهذه العيادة" },
        { status: 403 }
      )
    }

    // Check if date/time slot is already taken
    const combinedDateTime = new Date(`${appointmentDate}T${appointmentTime}`)

    const existingBooking = await prisma.onlineBooking.findFirst({
      where: {
        clinicId,
        appointmentDate: combinedDateTime,
        appointmentTime,
        status: {
          not: "CANCELLED",
        },
      },
    })

    if (existingBooking) {
      return NextResponse.json(
        { message: "هذا الموعد محجوز مسبقاً. الرجاء اختيار وقت آخر" },
        { status: 409 }
      )
    }

    // Check max bookings per day
    const startOfDay = new Date(appointmentDate)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(appointmentDate)
    endOfDay.setHours(23, 59, 59, 999)

    const bookingsCount = await prisma.onlineBooking.count({
      where: {
        clinicId,
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          not: "CANCELLED",
        },
      },
    })

    if (bookingsCount >= clinic.maxBookingsPerDay) {
      return NextResponse.json(
        { message: "عذراً، تم الوصول للحد الأقصى من الحجوزات لهذا اليوم" },
        { status: 409 }
      )
    }

    // Get client IP and user agent
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Determine initial status
    const initialStatus = clinic.autoConfirm ? "CONFIRMED" : "PENDING"

    // Create booking
    const confirmationCode = generateConfirmationCode()

    const booking = await prisma.onlineBooking.create({
      data: {
        clinicId,
        patientName,
        patientPhone,
        patientEmail,
        patientAge,
        patientGender,
        appointmentDate: combinedDateTime,
        appointmentTime,
        reason,
        symptoms,
        isFirstVisit,
        status: initialStatus,
        confirmationCode,
        confirmedAt: clinic.autoConfirm ? new Date() : null,
        ipAddress,
        userAgent,
      },
    })

    // إرسال إشعار لطاقم العيادة
    try {
      const clinicStaff = await prisma.clinicStaff.findMany({
        where: {
          clinicId,
          isActive: true,
        },
        select: {
          userId: true,
        },
      })

      // إنشاء إشعارات لطاقم العيادة
      const staffNotifications = clinicStaff.map(staff => ({
        recipientId: staff.userId,
        title: "حجز جديد عبر الإنترنت",
        message: `تم استلام حجز جديد من ${patientName} بتاريخ ${appointmentDate} الساعة ${appointmentTime}`,
        type: "BOOKING" as const,
        read: false,
        metadata: {
          bookingId: booking.id,
          clinicId,
        },
      }))

      if (staffNotifications.length > 0) {
        await prisma.notification.createMany({
          data: staffNotifications,
        }).catch(err => console.error("خطأ في إنشاء الإشعارات:", err))
      }

      // إرسال تأكيد الحجز للمريض عبر Email و SMS
      const clinicInfo = await prisma.clinic.findUnique({
        where: { id: clinicId },
        select: { name: true },
      })

      const bookingConfirmationData = {
        clinicName: clinicInfo?.name || "العيادة",
        patientName,
        appointmentDate,
        appointmentTime,
        confirmationCode,
        status: initialStatus,
      }

      // إرسال Email إذا تم توفير البريد الإلكتروني
      if (patientEmail) {
        sendBookingConfirmationEmail(patientEmail, bookingConfirmationData)
          .then(success => {
            if (success) {
              console.log("تم إرسال بريد التأكيد للمريض")
            }
          })
          .catch(err => console.error("خطأ في إرسال بريد التأكيد:", err))
      }

      // إرسال SMS
      sendBookingConfirmationSMS(patientPhone, bookingConfirmationData)
        .then(success => {
          if (success) {
            console.log("تم إرسال رسالة نصية للمريض")
          }
        })
        .catch(err => console.error("خطأ في إرسال الرسالة النصية:", err))
    } catch (notificationError) {
      console.error("خطأ في إرسال الإشعارات:", notificationError)
      // لا نوقف العملية إذا فشل الإشعار
    }

    return NextResponse.json(
      {
        success: true,
        booking: {
          id: booking.id,
          confirmationCode: booking.confirmationCode,
          status: booking.status,
          appointmentDate: booking.appointmentDate,
          appointmentTime: booking.appointmentTime,
        },
        message: clinic.autoConfirm
          ? "تم تأكيد الحجز بنجاح! سنراك في الموعد المحدد."
          : "تم استلام طلب الحجز وسيتم التواصل معك قريباً للتأكيد.",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      { message: "حدث خطأ أثناء معالجة الحجز" },
      { status: 500 }
    )
  }
}

// Get bookings for a clinic
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clinicId = searchParams.get("clinicId")
    const date = searchParams.get("date")

    if (!clinicId) {
      return NextResponse.json(
        { message: "معرف العيادة مطلوب" },
        { status: 400 }
      )
    }

    const whereCondition: any = {
      clinicId,
      status: {
        not: "CANCELLED",
      },
    }

    if (date) {
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)

      whereCondition.appointmentDate = {
        gte: startOfDay,
        lte: endOfDay,
      }
    }

    const bookings = await prisma.onlineBooking.findMany({
      where: whereCondition,
      orderBy: {
        appointmentDate: "asc",
      },
      select: {
        id: true,
        appointmentDate: true,
        appointmentTime: true,
        patientName: true,
        status: true,
      },
    })

    return NextResponse.json({ bookings }, { status: 200 })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { message: "حدث خطأ أثناء جلب الحجوزات" },
      { status: 500 }
    )
  }
}
