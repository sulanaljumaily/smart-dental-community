"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Building2,
  Users,
  Store,
  FlaskConical,
  Shield,
  UserPlus,
  X,
  Download,
  FileText,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ar } from "date-fns/locale"

export type MessageType = "STAFF" | "VENDOR" | "LAB" | "ADMIN" | "COMMUNITY" | "SYSTEM"

export interface Contact {
  id: string
  name: string
  avatar?: string
  role: string
  isOnline: boolean
  type: MessageType
  clinicId?: string
  clinicName?: string
  unreadCount?: number
}

export interface Attachment {
  name: string
  url: string
  type: string
  size: number
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  attachments?: Attachment[]
  isRead: boolean
  createdAt: Date
  sender: {
    id: string
    name: string
    avatar?: string
  }
}

export interface Conversation {
  id: string
  participant: Contact
  lastMessage?: string
  lastMessageAt: Date
  unreadCount: number
  messages?: Message[]
}

interface MessagingInterfaceProps {
  userId: string
  userRole: string
  contacts: Contact[]
  conversations: Conversation[]
  onSendMessage: (conversationId: string, content: string, attachments: Attachment[]) => Promise<void>
  onLoadMessages: (conversationId: string) => Promise<Message[]>
  onUploadFile: (file: File) => Promise<Attachment>
}

export function MessagingInterface({
  userId,
  userRole,
  contacts,
  conversations: initialConversations,
  onSendMessage,
  onLoadMessages,
  onUploadFile,
}: MessagingInterfaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<MessageType | "ALL">("ALL")
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showContactsList, setShowContactsList] = useState(true)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const contactsScrollRef = useRef<HTMLDivElement>(null)

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setShowContactsList(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // التمرير التلقائي للرسائل
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedConversation?.messages])

  // تحميل الرسائل عند اختيار محادثة
  const handleSelectConversation = async (conversation: Conversation) => {
    if (!conversation.messages) {
      const messages = await onLoadMessages(conversation.id)
      setConversations((prev) =>
        prev.map((c) => (c.id === conversation.id ? { ...c, messages } : c))
      )
      setSelectedConversation({ ...conversation, messages })
    } else {
      setSelectedConversation(conversation)
    }

    if (isMobile) {
      setShowContactsList(false)
    }
  }

  // إرسال رسالة
  const handleSendMessage = async () => {
    if (!selectedConversation || (!messageInput.trim() && attachments.length === 0)) return

    try {
      await onSendMessage(selectedConversation.id, messageInput, attachments)
      setMessageInput("")
      setAttachments([])

      // تحديث المحادثة بعد الإرسال
      const messages = await onLoadMessages(selectedConversation.id)
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversation.id
            ? { ...c, messages, lastMessage: messageInput, lastMessageAt: new Date() }
            : c
        )
      )
      setSelectedConversation((prev) =>
        prev ? { ...prev, messages, lastMessage: messageInput, lastMessageAt: new Date() } : null
      )
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  // رفع ملف
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const attachment = await onUploadFile(file)
      setAttachments((prev) => [...prev, attachment])
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setIsUploading(false)
    }
  }

  // حذف مرفق
  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  // فلترة المحادثات
  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conv.participant.clinicName || "").toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = selectedFilter === "ALL" || conv.participant.type === selectedFilter

    return matchesSearch && matchesFilter
  })

  // فلترة جهات الاتصال حسب النوع
  const getFilteredContacts = (type: MessageType) => {
    return contacts.filter((c) => c.type === type)
  }

  // الحصول على جهات الاتصال المجمعة
  const groupedContacts = {
    STAFF: getFilteredContacts("STAFF"),
    VENDOR: getFilteredContacts("VENDOR"),
    LAB: getFilteredContacts("LAB"),
    ADMIN: getFilteredContacts("ADMIN"),
    COMMUNITY: getFilteredContacts("COMMUNITY"),
  }

  // التمرير الأفقي للأشخاص
  const scrollContacts = (direction: "left" | "right") => {
    if (contactsScrollRef.current) {
      const scrollAmount = 200
      const newScrollLeft =
        direction === "right"
          ? contactsScrollRef.current.scrollLeft + scrollAmount
          : contactsScrollRef.current.scrollLeft - scrollAmount

      contactsScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  // الحصول على الأحرف الأولى من الاسم
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // الحصول على أيقونة النوع
  const getTypeIcon = (type: MessageType) => {
    switch (type) {
      case "STAFF":
        return <Users className="w-4 h-4" />
      case "VENDOR":
        return <Store className="w-4 h-4" />
      case "LAB":
        return <FlaskConical className="w-4 h-4" />
      case "ADMIN":
        return <Shield className="w-4 h-4" />
      case "COMMUNITY":
        return <UserPlus className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  // الحصول على اسم النوع بالعربي
  const getTypeName = (type: MessageType) => {
    switch (type) {
      case "STAFF":
        return "طاقم العيادة"
      case "VENDOR":
        return "الموردين"
      case "LAB":
        return "معامل الأسنان"
      case "ADMIN":
        return "الدعم الفني"
      case "COMMUNITY":
        return "المجتمع"
      default:
        return type
    }
  }

  // عرض بطاقة جهة اتصال
  const ContactCard = ({ contact }: { contact: Contact }) => (
    <button
      onClick={() => {
        const conversation = conversations.find((c) => c.participant.id === contact.id)
        if (conversation) {
          handleSelectConversation(conversation)
        }
      }}
      className="flex-shrink-0 w-20 flex flex-col items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
    >
      <div className="relative">
        <Avatar className="w-14 h-14 border-2 border-primary/20">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-bold">
            {getInitials(contact.name)}
          </AvatarFallback>
        </Avatar>
        {contact.isOnline && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
        {contact.unreadCount && contact.unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs flex items-center justify-center"
          >
            {contact.unreadCount}
          </Badge>
        )}
      </div>
      <span className="text-xs font-medium text-center line-clamp-2 w-full">{contact.name}</span>
    </button>
  )

  // عرض مجموعة جهات الاتصال
  const ContactGroup = ({ type, title }: { type: MessageType; title: string }) => {
    const groupContacts = groupedContacts[type]
    if (groupContacts.length === 0) return null

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4">
          {getTypeIcon(type)}
          <h3 className="font-semibold text-sm">{title}</h3>
          <Badge variant="secondary" className="h-5 px-2 text-xs">
            {groupContacts.length}
          </Badge>
        </div>
        <div className="relative">
          {groupContacts.length > 5 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md"
                onClick={() => scrollContacts("left")}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md"
                onClick={() => scrollContacts("right")}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
          <div
            ref={contactsScrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {groupContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* بطاقات جهات الاتصال القابلة للتمرير الأفقي */}
      <Card className="bento-card">
        <CardContent className="p-4 space-y-4">
          {userRole === "DENTIST" || userRole === "STAFF" ? (
            <>
              <ContactGroup type="STAFF" title="طاقم العيادة" />
              <ContactGroup type="VENDOR" title="الموردين" />
              <ContactGroup type="LAB" title="معامل الأسنان" />
              <ContactGroup type="ADMIN" title="الدعم الفني" />
              <ContactGroup type="COMMUNITY" title="المجتمع الطبي" />
            </>
          ) : (
            <ContactGroup type={userRole as MessageType} title={getTypeName(userRole as MessageType)} />
          )}
        </CardContent>
      </Card>

      {/* واجهة الرسائل */}
      <Card className="bento-card overflow-hidden">
        <div className="grid lg:grid-cols-3 h-[600px]">
          {/* قائمة المحادثات */}
          {(!isMobile || showContactsList) && (
            <div className="border-l lg:col-span-1 flex flex-col bg-gray-50/50">
              {/* البحث والفلترة */}
              <div className="p-4 border-b bg-white space-y-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث عن محادثة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>

                {/* فلاتر الأنواع */}
                <ScrollArea className="w-full">
                  <div className="flex gap-2">
                    <Button
                      variant={selectedFilter === "ALL" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter("ALL")}
                      className="text-xs whitespace-nowrap"
                    >
                      الكل
                    </Button>
                    {userRole === "DENTIST" || userRole === "STAFF" ? (
                      <>
                        <Button
                          variant={selectedFilter === "STAFF" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFilter("STAFF")}
                          className="text-xs whitespace-nowrap gap-1"
                        >
                          <Users className="w-3 h-3" />
                          الطاقم
                        </Button>
                        <Button
                          variant={selectedFilter === "VENDOR" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFilter("VENDOR")}
                          className="text-xs whitespace-nowrap gap-1"
                        >
                          <Store className="w-3 h-3" />
                          موردين
                        </Button>
                        <Button
                          variant={selectedFilter === "LAB" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFilter("LAB")}
                          className="text-xs whitespace-nowrap gap-1"
                        >
                          <FlaskConical className="w-3 h-3" />
                          معامل
                        </Button>
                        <Button
                          variant={selectedFilter === "ADMIN" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFilter("ADMIN")}
                          className="text-xs whitespace-nowrap gap-1"
                        >
                          <Shield className="w-3 h-3" />
                          دعم
                        </Button>
                        <Button
                          variant={selectedFilter === "COMMUNITY" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFilter("COMMUNITY")}
                          className="text-xs whitespace-nowrap gap-1"
                        >
                          <UserPlus className="w-3 h-3" />
                          مجتمع
                        </Button>
                      </>
                    ) : null}
                  </div>
                </ScrollArea>
              </div>

              {/* المحادثات */}
              <ScrollArea className="flex-1">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                    className={`w-full p-4 border-b hover:bg-accent transition-colors text-right ${
                      selectedConversation?.id === conversation.id ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                            {getInitials(conversation.participant.name)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.participant.isOnline && (
                          <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{conversation.participant.name}</h4>
                            <p className="text-xs text-muted-foreground">{conversation.participant.role}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDistanceToNow(new Date(conversation.lastMessageAt), {
                              addSuffix: true,
                              locale: ar,
                            })}
                          </span>
                        </div>

                        {conversation.lastMessage && (
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          {conversation.participant.clinicName && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Building2 className="w-3 h-3" />
                              {conversation.participant.clinicName}
                            </div>
                          )}
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {filteredConversations.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>لا توجد محادثات</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          )}

          {/* منطقة المحادثة */}
          {(!isMobile || !showContactsList) && (
            <div className="lg:col-span-2 flex flex-col bg-white">
              {selectedConversation ? (
                <>
                  {/* رأس المحادثة */}
                  <div className="p-4 border-b flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      {isMobile && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setShowContactsList(true)
                            setSelectedConversation(null)
                          }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      )}
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={selectedConversation.participant.avatar}
                            alt={selectedConversation.participant.name}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                            {getInitials(selectedConversation.participant.name)}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConversation.participant.isOnline && (
                          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedConversation.participant.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{selectedConversation.participant.role}</span>
                          {selectedConversation.participant.clinicName && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {selectedConversation.participant.clinicName}
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

                  {/* الرسائل */}
                  <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-gray-50/50 to-white">
                    <div className="space-y-4">
                      {selectedConversation.messages?.map((message) => {
                        const isSent = message.senderId === userId

                        return (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${isSent ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs">
                                {getInitials(message.sender.name)}
                              </AvatarFallback>
                            </Avatar>

                            <div
                              className={`max-w-[70%] ${isSent ? "items-end" : "items-start"} flex flex-col gap-1`}
                            >
                              <div
                                className={`rounded-2xl px-4 py-2.5 ${
                                  isSent
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm"
                                    : "bg-white border-2 border-gray-100 rounded-bl-sm shadow-sm"
                                }`}
                              >
                                <p className="text-sm leading-relaxed">{message.content}</p>

                                {/* المرفقات */}
                                {message.attachments && message.attachments.length > 0 && (
                                  <div className="mt-2 space-y-2">
                                    {message.attachments.map((attachment, index) => (
                                      <a
                                        key={index}
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 p-2 rounded ${
                                          isSent ? "bg-blue-600/50" : "bg-gray-100"
                                        } hover:opacity-80 transition-opacity`}
                                      >
                                        {attachment.type.startsWith("image/") ? (
                                          <ImageIcon className="w-4 h-4" />
                                        ) : (
                                          <FileText className="w-4 h-4" />
                                        )}
                                        <span className="text-xs truncate flex-1">{attachment.name}</span>
                                        <Download className="w-4 h-4" />
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <span className={`text-xs text-muted-foreground px-2`}>
                                {formatDistanceToNow(new Date(message.createdAt), {
                                  addSuffix: true,
                                  locale: ar,
                                })}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* إدخال الرسالة */}
                  <div className="p-4 border-t bg-white space-y-2">
                    {/* عرض المرفقات */}
                    {attachments.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm"
                          >
                            {attachment.type.startsWith("image/") ? (
                              <ImageIcon className="w-4 h-4" />
                            ) : (
                              <FileText className="w-4 h-4" />
                            )}
                            <span className="truncate max-w-[150px]">{attachment.name}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleRemoveAttachment(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
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
                        disabled={isUploading}
                      />
                      <Button onClick={handleSendMessage} disabled={isUploading || (!messageInput.trim() && attachments.length === 0)}>
                        <Send className="w-5 h-5 ml-2" />
                        إرسال
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground bg-gradient-to-br from-gray-50 to-white">
                  <div className="text-center">
                    <MessageSquare className="w-20 h-20 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-semibold mb-2">اختر محادثة</h3>
                    <p>اختر محادثة من القائمة أو ابدأ محادثة جديدة</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
