"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageSquare,
  Send,
  Search,
  Phone,
  MoreVertical,
  Paperclip,
  Image as ImageIcon,
  Building2,
  User,
  HeadphonesIcon,
} from "lucide-react"

export default function VendorMessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1")
  const [messageText, setMessageText] = useState("")

  // Conversations
  const conversations = [
    {
      id: "1",
      type: "CLINIC",
      name: "عيادة الابتسامة الذكية",
      lastMessage: "شكراً على المنتجات، سنطلب المزيد قريباً",
      time: "10:30 ص",
      unread: 2,
      online: true,
      avatar: "ع",
    },
    {
      id: "2",
      type: "CLINIC",
      name: "عيادة د. محمد أحمد",
      lastMessage: "متى سيتم شحن الطلب؟",
      time: "أمس",
      unread: 0,
      online: false,
      avatar: "م",
    },
    {
      id: "3",
      type: "LAB",
      name: "مختبر الابتسامة المتقدم",
      lastMessage: "نحتاج إلى مواد خزفية جديدة",
      time: "أمس",
      unread: 1,
      online: true,
      avatar: "خ",
    },
    {
      id: "4",
      type: "PLATFORM",
      name: "الدعم الفني",
      lastMessage: "تم حل مشكلتك",
      time: "2024-01-18",
      unread: 0,
      online: true,
      avatar: "د",
    },
  ]

  // Messages for selected chat
  const messages = [
    {
      id: "1",
      senderId: "other",
      text: "السلام عليكم، نريد طلب قفازات نتريل",
      time: "9:00 ص",
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      text: "وعليكم السلام، متوفر لدينا بكميات كبيرة",
      time: "9:05 ص",
      type: "text",
    },
    {
      id: "3",
      senderId: "me",
      text: "كم الكمية المطلوبة؟",
      time: "9:05 ص",
      type: "text",
    },
    {
      id: "4",
      senderId: "other",
      text: "نحتاج 500 قطعة",
      time: "9:10 ص",
      type: "text",
    },
    {
      id: "5",
      senderId: "me",
      text: "ممتاز، سنقوم بتجهيز الطلب فوراً",
      time: "9:15 ص",
      type: "text",
    },
    {
      id: "6",
      senderId: "other",
      text: "شكراً على المنتجات، سنطلب المزيد قريباً",
      time: "10:30 ص",
      type: "text",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "CLINIC":
        return <Building2 className="w-4 h-4" />
      case "LAB":
        return <User className="w-4 h-4" />
      case "PLATFORM":
        return <HeadphonesIcon className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "CLINIC":
        return "عيادة"
      case "LAB":
        return "مختبر"
      case "PLATFORM":
        return "دعم فني"
      default:
        return ""
    }
  }

  const selectedConversation = conversations.find(c => c.id === selectedChat)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6" dir="rtl">
      <Card className="bento-card overflow-hidden">
        <div className="grid md:grid-cols-3 h-[calc(100vh-180px)]">
          {/* Conversations List */}
          <div className="border-l">
            <CardHeader className="border-b">
              <CardTitle className="text-lg">المحادثات</CardTitle>
              <div className="relative mt-3">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="بحث في المحادثات..."
                  className="pr-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto h-[calc(100vh-320px)]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === conversation.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {conversation.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-sm truncate">
                            {conversation.name}
                          </h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {conversation.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {getTypeIcon(conversation.type)}
                            <span className="mr-1">{getTypeLabel(conversation.type)}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {selectedConversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold">{selectedConversation.name}</h3>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className="text-xs">
                            {getTypeIcon(selectedConversation.type)}
                            <span className="mr-1">{getTypeLabel(selectedConversation.type)}</span>
                          </Badge>
                          {selectedConversation.online && (
                            <span className="text-green-600">• متصل الآن</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "me" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.senderId === "me"
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "me"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="w-5 h-5" />
                    </Button>
                    <Input
                      placeholder="اكتب رسالتك..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          // Handle send message
                          setMessageText("")
                        }
                      }}
                    />
                    <Button size="icon" className="bg-gradient-to-br from-blue-500 to-purple-600">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">اختر محادثة</h3>
                  <p className="text-sm text-muted-foreground">
                    اختر محادثة من القائمة لعرض الرسائل
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
