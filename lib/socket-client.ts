/**
 * Socket.IO Client للاتصال من API routes
 * يستخدم للإرسال الفوري للإشعارات والرسائل من الخادم
 */

import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

/**
 * الحصول على اتصال Socket.IO
 */
export function getSocketConnection(): Socket {
  if (!socket || !socket.connected) {
    const socketUrl = process.env.SOCKET_URL || "http://localhost:3001"

    socket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      transports: ["websocket", "polling"],
    })

    socket.on("connect", () => {
      console.log("✅ Socket.IO client connected to server")
    })

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket.IO client disconnected:", reason)
    })

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error)
    })
  }

  return socket
}

/**
 * إرسال رسالة فورية عبر Socket.IO
 */
export async function emitMessageToUser(
  userId: string,
  event: string,
  data: any
): Promise<boolean> {
  try {
    const socketClient = getSocketConnection()

    if (!socketClient.connected) {
      console.warn("Socket.IO غير متصل، جاري المحاولة مرة أخرى...")
      await new Promise(resolve => setTimeout(resolve, 500))

      if (!socketClient.connected) {
        console.error("فشل الاتصال بـ Socket.IO")
        return false
      }
    }

    // إرسال الرسالة للمستخدم المحدد
    socketClient.emit("server:emit", {
      targetUserId: userId,
      event,
      data,
    })

    return true
  } catch (error) {
    console.error("خطأ في إرسال رسالة Socket.IO:", error)
    return false
  }
}

/**
 * إرسال إشعار فوري للمستخدم
 */
export async function sendRealtimeNotification(
  userId: string,
  notification: {
    id: string
    title: string
    message: string
    type: string
    link?: string
  }
): Promise<boolean> {
  try {
    return await emitMessageToUser(userId, "notification:new", notification)
  } catch (error) {
    console.error("خطأ في إرسال الإشعار الفوري:", error)
    return false
  }
}

/**
 * إرسال رسالة فورية
 */
export async function sendRealtimeMessage(
  receiverId: string,
  message: {
    id: string
    senderId: string
    message: string
    createdAt: Date
  }
): Promise<boolean> {
  try {
    return await emitMessageToUser(receiverId, "message:receive", message)
  } catch (error) {
    console.error("خطأ في إرسال الرسالة الفورية:", error)
    return false
  }
}

/**
 * بث إشعار لجميع مستخدمي عيادة معينة
 */
export async function broadcastToClinic(
  clinicId: string,
  event: string,
  data: any
): Promise<boolean> {
  try {
    const socketClient = getSocketConnection()

    if (!socketClient.connected) {
      console.warn("Socket.IO غير متصل")
      return false
    }

    socketClient.emit("clinic:broadcast", {
      clinicId,
      event,
      data,
    })

    return true
  } catch (error) {
    console.error("خطأ في البث للعيادة:", error)
    return false
  }
}

/**
 * إرسال إشعار لمجموعة مستخدمين
 */
export async function sendBulkNotifications(
  userIds: string[],
  notification: {
    id: string
    title: string
    message: string
    type: string
  }
): Promise<boolean> {
  try {
    const socketClient = getSocketConnection()

    if (!socketClient.connected) {
      console.warn("Socket.IO غير متصل")
      return false
    }

    // إرسال لكل مستخدم على حدة
    for (const userId of userIds) {
      socketClient.emit("server:emit", {
        targetUserId: userId,
        event: "notification:new",
        data: notification,
      })
    }

    return true
  } catch (error) {
    console.error("خطأ في إرسال الإشعارات الجماعية:", error)
    return false
  }
}

/**
 * إغلاق الاتصال بـ Socket.IO
 */
export function closeSocketConnection(): void {
  if (socket && socket.connected) {
    socket.disconnect()
    socket = null
    console.log("تم إغلاق اتصال Socket.IO")
  }
}
