import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "معرف المستخدم مطلوب" },
        { status: 400 }
      )
    }

    // تحديث جميع الإشعارات غير المقروءة للمستخدم
    const result = await prisma.notification.updateMany({
      where: {
        recipientId: userId,
        read: false,
      },
      data: {
        read: true,
        readAt: new Date(),
      },
    }).catch(() => ({ count: 0 }))

    return NextResponse.json({
      success: true,
      message: `تم تحديث ${result.count} إشعار`,
      count: result.count,
    })
  } catch (error) {
    console.error("خطأ في تحديث الإشعارات:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في تحديث الإشعارات" },
      { status: 500 }
    )
  }
}
