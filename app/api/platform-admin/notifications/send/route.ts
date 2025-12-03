import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPushToUsers } from "@/lib/push-notifications"
import { sendBulkNotifications } from "@/lib/socket-client"

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

    // إرسال إشعارات Push للأجهزة المحمولة
    const userIds = recipients.map(r => r.id)

    if (userIds.length > 0) {
      // إرسال عبر Push Notifications (FCM/OneSignal)
      sendPushToUsers(userIds, {
        title,
        body: message,
        data: promoCode ? { promoCode } : undefined,
      }).then(success => {
        if (success) {
          console.log(`✅ تم إرسال ${userIds.length} إشعار Push`)
        }
      }).catch(err => console.error("خطأ في إرسال إشعارات Push:", err))

      // إرسال عبر Socket.IO للإشعارات الفورية
      sendBulkNotifications(userIds, {
        id: Math.random().toString(36).substring(7),
        title,
        message,
        type: notificationType || "ANNOUNCEMENT",
      }).then(success => {
        if (success) {
          console.log(`✅ تم إرسال ${userIds.length} إشعار فوري عبر Socket.io`)
        }
      }).catch(err => console.error("خطأ في إرسال إشعارات Socket.io:", err))
    }

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
