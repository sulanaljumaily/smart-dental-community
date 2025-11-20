"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Archive,
  Trash2,
  Filter,
  Building2,
  Users,
  User,
  Store,
  FlaskConical,
  Shield,
  UserPlus,
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  isRead: boolean
  isSent: boolean
}

type MessageCategory = "STAFF" | "VENDOR" | "LAB" | "ADMIN" | "COMMUNITY"

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    avatar: string
    role: string
  }
  category: MessageCategory
  clinic?: {
    id: string
    name: string
  }
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  messages: Message[]
}

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [messageInput, setMessageInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory | "ALL">("ALL")

  // بيانات تجريبية - سيتم استبدالها بـ API
  const conversations: Conversation[] = [
    {
      id: "1",
      participant: {
        id: "2",
        name: "د. أحمد محمد",
        avatar: "د.أ",
        role: "طبيب أسنان",
      },
      category: "STAFF",
      clinic: {
        id: "1",
        name: "عيادة النجوم",
      },
      lastMessage: "شكراً دكتور، سأتابع مع المريض غداً",
      lastMessageTime: "منذ 5 دقائق",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: "1",
          senderId: "1",
          senderName: "د. سلطان",
          senderAvatar: "د.س",
          content: "مرحباً د. أحمد، كيف حال المريض خالد؟",
          timestamp: "10:30 ص",
          isRead: true,
          isSent: true,
        },
        {
          id: "2",
          senderId: "2",
          senderName: "د. أحمد",
          senderAvatar: "د.أ",
          content: "مرحباً دكتور، الحالة جيدة والتعافي يسير بشكل ممتاز",
          timestamp: "10:32 ص",
          isRead: true,
          isSent: false,
        },
        {
          id: "3",
          senderId: "1",
          senderName: "د. سلطان",
          senderAvatar: "د.س",
          content: "ممتاز، يرجى متابعة حالته والتأكد من التزامه بالأدوية",
          timestamp: "10:35 ص",
          isRead: true,
          isSent: true,
        },
        {
          id: "4",
          senderId: "2",
          senderName: "د. أحمد",
          senderAvatar: "د.أ",
          content: "شكراً دكتور، سأتابع مع المريض غداً",
          timestamp: "10:40 ص",
          isRead: false,
          isSent: false,
        },
      ],
    },
    {
      id: "2",
      participant: {
        id: "3",
        name: "فاطمة علي",
        avatar: "ف",
        role: "مساعدة طبية",
      },
      category: "STAFF",
      clinic: {
        id: "1",
        name: "عيادة النجوم",
      },
      lastMessage: "تم طلب المواد من المتجر",
      lastMessageTime: "منذ ساعة",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "1",
          senderId: "1",
          senderName: "د. سلطان",
          senderAvatar: "د.س",
          content: "فاطمة، يرجى طلب قفازات طبية من المتجر",
          timestamp: "9:15 ص",
          isRead: true,
          isSent: true,
        },
        {
          id: "2",
          senderId: "3",
          senderName: "فاطمة",
          senderAvatar: "ف",
          content: "تم طلب المواد من المتجر",
          timestamp: "9:45 ص",
          isRead: true,
          isSent: false,
        },
      ],
    },
    {
      id: "3",
      participant: {
        id: "4",
        name: "سارة حسن",
        avatar: "س",
        role: "موظفة استقبال",
      },
      category: "STAFF",
      clinic: {
        id: "1",
        name: "عيادة النجوم",
      },
      lastMessage: "تم تأكيد المواعيد",
      lastMessageTime: "منذ 3 ساعات",
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: "1",
          senderId: "1",
          senderName: "د. سلطان",
          senderAvatar: "د.س",
          content: "سارة، يرجى تأكيد مواعيد غداً",
          timestamp: "أمس 5:00 م",
          isRead: true,
          isSent: true,
        },
        {
          id: "2",
          senderId: "4",
          senderName: "سارة",
          senderAvatar: "س",
          content: "تم تأكيد المواعيد",
          timestamp: "أمس 5:30 م",
          isRead: true,
          isSent: false,
        },
      ],
    },
    {
      id: "4",
      participant: {
        id: "5",
        name: "د. زينب خالد",
        avatar: "د.ز",
        role: "جراحة الفم",
      },
      category: "STAFF",
      clinic: {
        id: "2",
        name: "مركز الابتسامة",
      },
      lastMessage: "شكراً على التوضيح",
      lastMessageTime: "منذ يوم",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "1",
          senderId: "5",
          senderName: "د. زينب",
          senderAvatar: "د.ز",
          content: "دكتور، ما رأيك بحالة المريض الذي يحتاج جراحة؟",
          timestamp: "أمس 2:00 م",
          isRead: true,
          isSent: false,
        },
        {
          id: "2",
          senderId: "1",
          senderName: "د. سلطان",
          senderAvatar: "د.س",
          content: "الحالة تحتاج إلى تخطيط دقيق، دعينا نجتمع غداً لمناقشتها",
          timestamp: "أمس 2:15 م",
          isRead: true,
          isSent: true,
        },
        {
          id: "3",
          senderId: "5",
          senderName: "د. زينب",
          senderAvatar: "د.ز",
          content: "شكراً على التوضيح",
          timestamp: "أمس 2:20 م",
          isRead: true,
          isSent: false,
        },
      ],
    },
    {
      id: "5",
      participant: {
        id: "6",
        name: "شركة الرعاية الطبية",
        avatar: "ش",
        role: "مورد مستلزمات طبية",
      },
      category: "VENDOR",
      lastMessage: "الشحنة جاهزة للتوصيل غداً",
      lastMessageTime: "منذ ساعتين",
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: "1",
          senderId: "1",
          senderName: "د. سلطان",
          senderAvatar: "د.س",
          content: "مرحباً، هل الطلب جاهز؟",
          timestamp: "11:00 ص",
          isRead: true,
          isSent: true,
        },
        {
          id: "2",
          senderId: "6",
          senderName: "شركة الرعاية",
          senderAvatar: "ش",
          content: "الشحنة جاهزة للتوصيل غداً",
          timestamp: "11:30 ص",
          isRead: false,
          isSent: false,
        },
      ],
    },
    {
      id: "6",
      participant: {
        id: "7",
        name: "معمل الدقة لطب الأسنان",
        avatar: "م",
        role: "معمل أسنان",
      },
      category: "LAB",
      clinic: {
        id: "1",
        name: "عيادة النجوم",
      },
      lastMessage: "التاج جاهز للتسليم",
      lastMessageTime: "منذ 4 ساعات",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "1",
          senderId: "1",
          senderName: "د. سلطان",
          senderAvatar: "د.س",
          content: "هل التاج للمريض أحمد جاهز؟",
          timestamp: "9:00 ص",
          isRead: true,
          isSent: true,
        },
        {
          id: "2",
          senderId: "7",
          senderName: "معمل الدقة",
          senderAvatar: "م",
          content: "التاج جاهز للتسليم",
          timestamp: "9:30 ص",
          isRead: true,
          isSent: false,
        },
      ],
    },
    {
      id: "7",
      participant: {
        id: "8",
        name: "فريق الدعم الفني",
        avatar: "د",
        role: "إدارة المنصة",
      },
      category: "ADMIN",
      lastMessage: "تم حل المشكلة بنجاح",
      lastMessageTime: "أمس",
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: "1",
          senderId: "1",
          senderName: "د. سلطان",
          senderAvatar: "د.س",
          content: "مرحباً، أواجه مشكلة في تحميل التقارير",
          timestamp: "أمس 3:00 م",
          isRead: true,
          isSent: true,
        },
        {
          id: "2",
          senderId: "8",
          senderName: "فريق الدعم",
          senderAvatar: "د",
          content: "تم حل المشكلة بنجاح",
          timestamp: "أمس 3:45 م",
          isRead: true,
          isSent: false,
        },
      ],
    },
    {
      id: "8",
      participant: {
        id: "9",
        name: "د. محمد العبيدي",
        avatar: "د.م",
        role: "استشاري زراعة أسنان",
      },
      category: "COMMUNITY",
      lastMessage: "نعم، لدي خبرة في هذا المجال",
      lastMessageTime: "منذ 3 أيام",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "1",
          senderId: "1",
          senderName: "د. سلطان",
          senderAvatar: "د.س",
          content: "مرحباً دكتور، هل لديك خبرة في زراعة الأسنان الفورية؟",
          timestamp: "منذ 3 أيام",
          isRead: true,
          isSent: true,
        },
        {
          id: "2",
          senderId: "9",
          senderName: "د. محمد",
          senderAvatar: "د.م",
          content: "نعم، لدي خبرة في هذا المجال",
          timestamp: "منذ 3 أيام",
          isRead: true,
          isSent: false,
        },
      ],
    },
  ]

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conv.clinic?.name || "").toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "ALL" || conv.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get selected conversation
  const activeConversation = conversations.find((c) => c.id === selectedConversation)

  // Statistics
  const totalConversations = conversations.length
  const unreadConversations = conversations.filter((c) => c.unreadCount > 0).length
  const totalUnreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // TODO: Implement send message logic
      console.log("Sending message:", messageInput)
      setMessageInput("")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">الرسائل</h1>
          <p className="text-muted-foreground">تواصل مع فريق العمل في عياداتك</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="h-6 px-3">
            {totalUnreadMessages} غير مقروء
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المحادثات</p>
                <p className="text-2xl font-bold">{totalConversations}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">محادثات غير مقروءة</p>
                <p className="text-2xl font-bold">{unreadConversations}</p>
              </div>
              <Badge className="h-10 w-10 rounded-full flex items-center justify-center text-lg">
                {unreadConversations}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">رسائل غير مقروءة</p>
                <p className="text-2xl font-bold">{totalUnreadMessages}</p>
              </div>
              <Badge variant="destructive" className="h-10 w-10 rounded-full flex items-center justify-center text-lg">
                {totalUnreadMessages}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Interface */}
      <Card className="bento-card overflow-hidden">
        <div className="grid lg:grid-cols-3 h-[600px]">
          {/* Conversations List */}
          <div className="border-l lg:col-span-1 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b space-y-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن محادثة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-1 overflow-x-auto pb-1">
                <Button
                  variant={selectedCategory === "ALL" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("ALL")}
                  className="text-xs whitespace-nowrap"
                >
                  الكل
                </Button>
                <Button
                  variant={selectedCategory === "STAFF" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("STAFF")}
                  className="text-xs whitespace-nowrap gap-1"
                >
                  <Users className="w-3 h-3" />
                  الطاقم
                </Button>
                <Button
                  variant={selectedCategory === "VENDOR" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("VENDOR")}
                  className="text-xs whitespace-nowrap gap-1"
                >
                  <Store className="w-3 h-3" />
                  الموردين
                </Button>
                <Button
                  variant={selectedCategory === "LAB" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("LAB")}
                  className="text-xs whitespace-nowrap gap-1"
                >
                  <FlaskConical className="w-3 h-3" />
                  المختبر
                </Button>
                <Button
                  variant={selectedCategory === "ADMIN" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("ADMIN")}
                  className="text-xs whitespace-nowrap gap-1"
                >
                  <Shield className="w-3 h-3" />
                  الإدارة
                </Button>
                <Button
                  variant={selectedCategory === "COMMUNITY" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("COMMUNITY")}
                  className="text-xs whitespace-nowrap gap-1"
                >
                  <UserPlus className="w-3 h-3" />
                  المجتمع
                </Button>
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
                    selectedConversation === conversation.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                        {conversation.participant.avatar}
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">
                            {conversation.participant.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {conversation.participant.role}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {conversation.lastMessageTime}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {conversation.lastMessage}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {conversation.clinic ? (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Building2 className="w-3 h-3" />
                            {conversation.clinic.name}
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredConversations.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>لا توجد محادثات</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                        {activeConversation.participant.avatar}
                      </div>
                      {activeConversation.isOnline && (
                        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{activeConversation.participant.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{activeConversation.participant.role}</span>
                        {activeConversation.clinic && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {activeConversation.clinic.name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-accent/20">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.isSent ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {message.senderAvatar}
                      </div>
                      <div
                        className={`max-w-[70%] ${
                          message.isSent ? "items-end" : "items-start"
                        } flex flex-col gap-1`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.isSent
                              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-br-none"
                              : "bg-white border rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground px-2">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Input
                      placeholder="اكتب رسالتك..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-5 h-5 ml-2" />
                      إرسال
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">اختر محادثة</h3>
                  <p>اختر محادثة من القائمة لبدء التواصل</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
