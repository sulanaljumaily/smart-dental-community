import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendRealtimeMessage, sendRealtimeNotification } from "@/lib/socket-client"

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

    // إرسال الرسالة في الوقت الفعلي عبر Socket.io
    try {
      await sendRealtimeMessage(receiverId, {
        id: newMessage.id,
        senderId: newMessage.senderId,
        message: newMessage.message,
        createdAt: newMessage.createdAt,
      })

      // جلب معلومات المرسل لإنشاء إشعار
      const sender = await prisma.user.findUnique({
        where: { id: senderId },
        select: { name: true },
      })

      // إرسال إشعار فوري
      await sendRealtimeNotification(receiverId, {
        id: newMessage.id,
        title: "رسالة جديدة",
        message: `رسالة جديدة من ${sender?.name || "مستخدم"}`,
        type: "MESSAGE",
        link: `/messages?chat=${senderId}`,
      })

      console.log("✅ تم إرسال الرسالة والإشعار عبر Socket.io")
    } catch (socketError) {
      console.error("خطأ في إرسال الإشعار الفوري:", socketError)
      // لا نوقف العملية إذا فشل الإشعار الفوري
    }

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
