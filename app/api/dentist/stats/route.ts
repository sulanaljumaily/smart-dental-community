import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    // TODO: استخدام session للحصول على معرّف الطبيب الحقيقي
    const dentistId = "temp-dentist-id" // مؤقت

    // جلب عدد الإشعارات غير المقروءة
    const notificationCount = await prisma.notification.count({
      where: {
        recipientId: dentistId,
        read: false,
      },
    }).catch(() => 0)

    // جلب عدد الرسائل غير المقروءة
    const messageCount = await prisma.message.count({
      where: {
        receiverId: dentistId,
        read: false,
      },
    }).catch(() => 0)

    // جلب عدد المهام النشطة
    const taskCount = await prisma.task.count({
      where: {
        userId: dentistId,
        completed: false,
      },
    }).catch(() => 0)

    return NextResponse.json({
      success: true,
      stats: {
        notificationCount,
        messageCount,
        taskCount,
      },
    })
  } catch (error) {
    console.error("خطأ في جلب إحصائيات الطبيب:", error)
    // إرجاع قيم افتراضية في حالة الخطأ
    return NextResponse.json({
      success: true,
      stats: {
        notificationCount: 0,
        messageCount: 0,
        taskCount: 0,
      },
    })
  }
}
