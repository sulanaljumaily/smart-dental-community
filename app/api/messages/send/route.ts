import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { senderId, receiverId, message, conversationId } = await req.json()

    if (!senderId || !receiverId || !message) {
      return NextResponse.json(
        { success: false, error: "المرسل والمستقبل والرسالة مطلوبة" },
        { status: 400 }
      )
    }

    // إنشاء الرسالة
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        message,
        conversationId,
        read: false,
        createdAt: new Date(),
      },
    }).catch(() => null)

    if (!newMessage) {
      return NextResponse.json(
        { success: false, error: "فشل إرسال الرسالة" },
        { status: 500 }
      )
    }

    // TODO: إرسال إشعار في الوقت الفعلي عبر Socket.io

    return NextResponse.json({
      success: true,
      message: "تم إرسال الرسالة بنجاح",
      data: newMessage,
    })
  } catch (error) {
    console.error("خطأ في إرسال الرسالة:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في إرسال الرسالة" },
      { status: 500 }
    )
  }
}
