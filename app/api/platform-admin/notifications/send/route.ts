import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, message, targetAudience, notificationType, promoCode } = body

    if (!title || !message) {
      return NextResponse.json(
        { success: false, error: "العنوان والنص مطلوبان" },
        { status: 400 }
      )
    }

    // تحديد المستلمين بناءً على الفئة المستهدفة
    let recipientFilter: any = {}

    switch (targetAudience) {
      case "dentists":
        recipientFilter = { role: "DENTIST" }
        break
      case "vendors":
        recipientFilter = { role: "VENDOR" }
        break
      case "labs":
        recipientFilter = { role: "LAB" }
        break
      case "all":
      default:
        recipientFilter = {} // جميع المستخدمين
        break
    }

    // جلب المستلمين
    const recipients = await prisma.user.findMany({
      where: recipientFilter,
      select: { id: true },
    }).catch(() => [])

    // إنشاء الإشعارات لكل مستلم
    const notifications = recipients.map(user => ({
      recipientId: user.id,
      title,
      message,
      type: notificationType || "ANNOUNCEMENT",
      read: false,
      metadata: promoCode ? { promoCode } : undefined,
    }))

    // حفظ الإشعارات في قاعدة البيانات
    const result = await prisma.notification.createMany({
      data: notifications,
    }).catch((error) => {
      console.error("خطأ في حفظ الإشعارات:", error)
      return { count: 0 }
    })

    // TODO: إرسال إشعارات push حقيقية هنا
    // يمكن استخدام Firebase Cloud Messaging أو OneSignal

    return NextResponse.json({
      success: true,
      message: "تم إرسال الإشعار بنجاح",
      sentCount: result.count,
    })
  } catch (error) {
    console.error("خطأ في إرسال الإشعار:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في إرسال الإشعار" },
      { status: 500 }
    )
  }
}
