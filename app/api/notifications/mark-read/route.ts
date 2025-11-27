import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { notificationId } = await req.json()

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: "معرف الإشعار مطلوب" },
        { status: 400 }
      )
    }

    // تحديث حالة الإشعار إلى مقروء
    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        read: true,
        readAt: new Date(),
      },
    }).catch(() => null)

    if (!updatedNotification) {
      return NextResponse.json(
        { success: false, error: "فشل تحديث الإشعار" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "تم تحديث الإشعار بنجاح",
    })
  } catch (error) {
    console.error("خطأ في تحديث الإشعار:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في تحديث الإشعار" },
      { status: 500 }
    )
  }
}
