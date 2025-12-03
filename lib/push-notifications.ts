/**
 * خدمة إرسال إشعارات Push للأجهزة المحمولة
 * يمكن استخدام أي من الخدمات التالية:
 * - Firebase Cloud Messaging (FCM)
 * - OneSignal
 * - Pusher Beams
 * - Web Push API
 */

interface PushNotificationOptions {
  userIds: string[]
  title: string
  body: string
  icon?: string
  image?: string
  data?: Record<string, any>
  link?: string
}

/**
 * إرسال إشعار Push عبر Firebase Cloud Messaging
 */
async function sendFCMNotification(options: PushNotificationOptions): Promise<boolean> {
  try {
    const fcmServerKey = process.env.FCM_SERVER_KEY

    if (!fcmServerKey) {
      console.warn("لم يتم تكوين مفتاح FCM Server")
      return false
    }

    // جلب رموز FCM للمستخدمين من قاعدة البيانات
    const { prisma } = require("@/lib/prisma")

    const fcmTokens = await prisma.userDevice.findMany({
      where: {
        userId: { in: options.userIds },
        fcmToken: { not: null },
        isActive: true,
      },
      select: {
        fcmToken: true,
      },
    }).catch(() => [])

    if (fcmTokens.length === 0) {
      console.log("لا توجد رموز FCM للمستخدمين المحددين")
      return false
    }

    const tokens = fcmTokens.map(t => t.fcmToken).filter(Boolean)

    // إرسال الإشعار عبر FCM
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Authorization": `key=${fcmServerKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registration_ids: tokens,
        notification: {
          title: options.title,
          body: options.body,
          icon: options.icon || "/icon-192.png",
          image: options.image,
          click_action: options.link || "/",
        },
        data: options.data || {},
      }),
    })

    return response.ok
  } catch (error) {
    console.error("خطأ في إرسال إشعار FCM:", error)
    return false
  }
}

/**
 * إرسال إشعار Push عبر OneSignal
 */
async function sendOneSignalNotification(options: PushNotificationOptions): Promise<boolean> {
  try {
    const oneSignalAppId = process.env.ONESIGNAL_APP_ID
    const oneSignalApiKey = process.env.ONESIGNAL_API_KEY

    if (!oneSignalAppId || !oneSignalApiKey) {
      console.warn("لم يتم تكوين OneSignal")
      return false
    }

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${oneSignalApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: oneSignalAppId,
        include_external_user_ids: options.userIds,
        headings: { en: options.title, ar: options.title },
        contents: { en: options.body, ar: options.body },
        big_picture: options.image,
        large_icon: options.icon,
        url: options.link,
        data: options.data,
      }),
    })

    return response.ok
  } catch (error) {
    console.error("خطأ في إرسال إشعار OneSignal:", error)
    return false
  }
}

/**
 * إرسال إشعار Push (يختار الخدمة المناسبة تلقائياً)
 */
export async function sendPushNotification(options: PushNotificationOptions): Promise<boolean> {
  const pushService = process.env.PUSH_SERVICE || "fcm"

  switch (pushService) {
    case "fcm":
      return sendFCMNotification(options)

    case "onesignal":
      return sendOneSignalNotification(options)

    default:
      console.warn("لم يتم تحديد خدمة Push Notifications")
      return false
  }
}

/**
 * إرسال إشعار لمستخدم واحد
 */
export async function sendPushToUser(
  userId: string,
  notification: {
    title: string
    body: string
    link?: string
    data?: Record<string, any>
  }
): Promise<boolean> {
  return sendPushNotification({
    userIds: [userId],
    title: notification.title,
    body: notification.body,
    link: notification.link,
    data: notification.data,
  })
}

/**
 * إرسال إشعار لمجموعة مستخدمين
 */
export async function sendPushToUsers(
  userIds: string[],
  notification: {
    title: string
    body: string
    link?: string
    data?: Record<string, any>
  }
): Promise<boolean> {
  if (userIds.length === 0) {
    return false
  }

  return sendPushNotification({
    userIds,
    title: notification.title,
    body: notification.body,
    link: notification.link,
    data: notification.data,
  })
}

/**
 * تسجيل رمز FCM لجهاز مستخدم
 */
export async function registerDeviceToken(
  userId: string,
  fcmToken: string,
  deviceInfo?: {
    deviceType?: string
    deviceName?: string
    platform?: string
  }
): Promise<boolean> {
  try {
    const { prisma } = require("@/lib/prisma")

    await prisma.userDevice.upsert({
      where: {
        userId_fcmToken: {
          userId,
          fcmToken,
        },
      },
      update: {
        isActive: true,
        lastActiveAt: new Date(),
        ...deviceInfo,
      },
      create: {
        userId,
        fcmToken,
        isActive: true,
        lastActiveAt: new Date(),
        ...deviceInfo,
      },
    })

    return true
  } catch (error) {
    console.error("خطأ في تسجيل رمز الجهاز:", error)
    return false
  }
}

/**
 * إلغاء تسجيل رمز FCM
 */
export async function unregisterDeviceToken(
  userId: string,
  fcmToken: string
): Promise<boolean> {
  try {
    const { prisma } = require("@/lib/prisma")

    await prisma.userDevice.updateMany({
      where: {
        userId,
        fcmToken,
      },
      data: {
        isActive: false,
      },
    })

    return true
  } catch (error) {
    console.error("خطأ في إلغاء تسجيل رمز الجهاز:", error)
    return false
  }
}
