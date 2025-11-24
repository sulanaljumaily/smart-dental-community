"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { MessagingInterface, Contact, Conversation, Message, Attachment } from "@/components/messages/MessagingInterface"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, Store, FlaskConical, Shield } from "lucide-react"

export default function MessagesPage() {
  const { data: session } = useSession()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    staff: 0,
    vendors: 0,
    labs: 0,
  })

  // تحميل البيانات عند تحميل الصفحة
  useEffect(() => {
    if (session?.user) {
      loadData()
    }
  }, [session])

  const loadData = async () => {
    try {
      setIsLoading(true)

      // تحميل المحادثات
      const conversationsRes = await fetch("/api/conversations")
      const conversationsData = await conversationsRes.json()

      if (conversationsData.conversations) {
        const formattedConversations = conversationsData.conversations.map((conv: any) => ({
          id: conv.id,
          participant: {
            id: conv.participant.id,
            name: conv.participant.name,
            avatar: conv.participant.avatar,
            role: getParticipantRole(conv.participant.role),
            isOnline: Math.random() > 0.5, // محاكاة الحالة الحالية
            type: conv.type,
            clinicId: conv.clinicId,
            clinicName: conv.clinicName,
          },
          lastMessage: conv.lastMessage,
          lastMessageAt: new Date(conv.lastMessageAt),
          unreadCount: conv.unreadCount || 0,
        }))

        setConversations(formattedConversations)

        // حساب الإحصائيات
        const totalConversations = formattedConversations.length
        const unreadConversations = formattedConversations.filter((c: Conversation) => c.unreadCount > 0).length
        const staffConversations = formattedConversations.filter((c: Conversation) => c.participant.type === "STAFF").length
        const vendorConversations = formattedConversations.filter((c: Conversation) => c.participant.type === "VENDOR").length
        const labConversations = formattedConversations.filter((c: Conversation) => c.participant.type === "LAB").length

        setStats({
          total: totalConversations,
          unread: unreadConversations,
          staff: staffConversations,
          vendors: vendorConversations,
          labs: labConversations,
        })

        // استخراج جهات الاتصال من المحادثات
        const contactsList = formattedConversations.map((conv: Conversation) => ({
          ...conv.participant,
          unreadCount: conv.unreadCount,
        }))
        setContacts(contactsList)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getParticipantRole = (role: string) => {
    const roles: Record<string, string> = {
      DENTIST: "طبيب أسنان",
      VENDOR: "مورد",
      LAB: "معمل أسنان",
      ADMIN: "إدارة المنصة",
      STAFF: "طاقم العيادة",
    }
    return roles[role] || role
  }

  const handleSendMessage = async (conversationId: string, content: string, attachments: Attachment[]) => {
    try {
      const conversation = conversations.find((c) => c.id === conversationId)
      if (!conversation) return

      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          receiverId: conversation.participant.id,
          content,
          attachments,
          type: conversation.participant.type,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // إعادة تحميل البيانات بعد الإرسال
      await loadData()
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  }

  const handleLoadMessages = async (conversationId: string): Promise<Message[]> => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}`)
      const data = await response.json()

      if (data.conversation && data.conversation.messages) {
        return data.conversation.messages.map((msg: any) => ({
          id: msg.id,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          content: msg.content,
          attachments: msg.attachments || [],
          isRead: msg.isRead,
          createdAt: new Date(msg.createdAt),
          sender: {
            id: msg.sender.id,
            name: msg.sender.name,
            avatar: msg.sender.avatar,
          },
        }))
      }

      return []
    } catch (error) {
      console.error("Error loading messages:", error)
      return []
    }
  }

  const handleUploadFile = async (file: File): Promise<Attachment> => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "messages")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload file")
      }

      const data = await response.json()

      return {
        name: file.name,
        url: data.url,
        type: file.type,
        size: file.size,
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">جاري التحميل...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">يرجى تسجيل الدخول لعرض الرسائل</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">الرسائل</h1>
          <p className="text-muted-foreground">
            تواصل مع فريق العمل والموردين والمعامل والدعم الفني
          </p>
        </div>
        <div className="flex items-center gap-3">
          {stats.unread > 0 && (
            <Badge variant="destructive" className="h-6 px-3">
              {stats.unread} غير مقروء
            </Badge>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المحادثات</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">غير مقروءة</p>
                <p className="text-2xl font-bold">{stats.unread}</p>
              </div>
              <Badge className="h-10 w-10 rounded-full flex items-center justify-center text-lg">
                {stats.unread}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">طاقم العيادة</p>
                <p className="text-2xl font-bold">{stats.staff}</p>
              </div>
              <Users className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الموردين</p>
                <p className="text-2xl font-bold">{stats.vendors}</p>
              </div>
              <Store className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">المعامل</p>
                <p className="text-2xl font-bold">{stats.labs}</p>
              </div>
              <FlaskConical className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messaging Interface */}
      <MessagingInterface
        userId={session.user.id}
        userRole={session.user.role || "DENTIST"}
        contacts={contacts}
        conversations={conversations}
        onSendMessage={handleSendMessage}
        onLoadMessages={handleLoadMessages}
        onUploadFile={handleUploadFile}
      />
    </div>
  )
}
