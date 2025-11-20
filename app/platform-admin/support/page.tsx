"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HeadphonesIcon,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  Calendar,
  Tag,
  Send,
  Eye,
  XCircle,
} from "lucide-react"

export default function SupportManagementPage() {
  const [activeTab, setActiveTab] = useState("tickets")

  // إحصائيات الدعم
  const stats = {
    openTickets: 12,
    inProgressTickets: 8,
    resolvedTickets: 247,
    averageResponseTime: "2.5 ساعة",
  }

  // التذاكر المفتوحة
  const openTickets = [
    {
      id: "TKT-001",
      title: "مشكلة في عملية الدفع",
      description: "لا أستطيع إتمام عملية الدفع عبر تحويل بنكي",
      type: "payment",
      priority: "high",
      status: "open",
      from: "د. أحمد محمود",
      userType: "dentist",
      createdDate: "2024-01-20 10:30",
      lastUpdate: "2024-01-20 11:45",
      messages: 3,
    },
    {
      id: "TKT-002",
      title: "شكوى على مورد",
      description: "تأخر في التوصيل وجودة المنتج غير مطابقة",
      type: "complaint",
      priority: "high",
      status: "in_progress",
      from: "د. سارة علي",
      userType: "dentist",
      vendor: "شركة الأمل الطبية",
      createdDate: "2024-01-20 09:15",
      lastUpdate: "2024-01-20 14:30",
      messages: 5,
    },
    {
      id: "TKT-003",
      title: "استفسار عن الاشتراك",
      description: "هل يمكن ترقية الباقة في منتصف الفترة؟",
      type: "inquiry",
      priority: "normal",
      status: "open",
      from: "د. خالد حسن",
      userType: "dentist",
      createdDate: "2024-01-20 08:00",
      lastUpdate: "2024-01-20 08:00",
      messages: 1,
    },
  ]

  // الشكاوى بين الموردين والأطباء
  const complaints = [
    {
      id: "CMP-001",
      type: "vendor_complaint",
      complainant: "د. محمد أحمد",
      against: "شركة التميز الطبي",
      reason: "تأخر في الشحن",
      severity: "medium",
      status: "investigating",
      date: "2024-01-20",
    },
    {
      id: "CMP-002",
      type: "quality_complaint",
      complainant: "د. فاطمة حسين",
      against: "مؤسسة الدقة",
      reason: "جودة المنتج غير مطابقة للمواصفات",
      severity: "high",
      status: "pending_review",
      date: "2024-01-19",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "normal": return "default"
      case "low": return "secondary"
      default: return "default"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "عاجل"
      case "normal": return "عادي"
      case "low": return "منخفض"
      default: return priority
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "warning"
      case "in_progress": return "info"
      case "resolved": return "success"
      case "closed": return "secondary"
      default: return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open": return "مفتوح"
      case "in_progress": return "قيد المعالجة"
      case "resolved": return "تم الحل"
      case "closed": return "مغلق"
      default: return status
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">الدعم الفني</h1>
        <p className="text-muted-foreground">متابعة الشكاوى والتذاكر للموردين والأطباء</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">تذاكر مفتوحة</p>
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{stats.openTickets}</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">قيد المعالجة</p>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.inProgressTickets}</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">تم الحل</p>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.resolvedTickets}</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">متوسط وقت الرد</p>
              <HeadphonesIcon className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-lg font-bold">{stats.averageResponseTime}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-2">
          <TabsTrigger value="tickets">
            التذاكر
            <Badge variant="destructive" className="mr-1 text-xs">{stats.openTickets}</Badge>
          </TabsTrigger>
          <TabsTrigger value="complaints">الشكاوى</TabsTrigger>
          <TabsTrigger value="history">السجل</TabsTrigger>
        </TabsList>

        {/* التذاكر */}
        <TabsContent value="tickets" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">التذاكر المفتوحة</h2>
            <Input placeholder="بحث في التذاكر..." className="max-w-xs" />
          </div>

          <div className="space-y-3">
            {openTickets.map((ticket) => (
              <Card key={ticket.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{ticket.title}</h3>
                        <Badge variant={getPriorityColor(ticket.priority)}>
                          {getPriorityText(ticket.priority)}
                        </Badge>
                        <Badge variant={getStatusColor(ticket.status)}>
                          {getStatusText(ticket.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{ticket.from}</span>
                          <Badge variant="outline" className="mr-1 text-xs">
                            {ticket.userType === 'dentist' ? 'طبيب' : 'مورد'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{ticket.createdDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{ticket.messages} رسالة</span>
                        </div>
                        {ticket.vendor && (
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            <span>{ticket.vendor}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 ml-1" />
                      الرد
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm">
                      <CheckCircle2 className="w-4 h-4 ml-1" />
                      حل التذكرة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* الشكاوى */}
        <TabsContent value="complaints" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">الشكاوى بين الموردين والأطباء</h2>
          </div>

          <div className="space-y-3">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{complaint.reason}</h3>
                        <Badge variant={complaint.severity === 'high' ? 'destructive' : 'default'}>
                          {complaint.severity === 'high' ? 'خطير' : 'متوسط'}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">المشتكي:</span>
                          <span className="font-medium">{complaint.complainant}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">ضد:</span>
                          <span className="font-medium">{complaint.against}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">التاريخ:</span>
                          <span>{complaint.date}</span>
                        </div>
                      </div>
                      <Badge variant="warning">
                        {complaint.status === 'investigating' ? 'قيد التحقيق' : 'بانتظار المراجعة'}
                      </Badge>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      بدء التحقيق
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      التفاصيل
                    </Button>
                    <Button variant="outline" size="sm">
                      مراسلة الأطراف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* السجل */}
        <TabsContent value="history" className="space-y-4">
          <h2 className="text-2xl font-bold">سجل التذاكر المغلقة</h2>
          <Card className="bento-card">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                سجل شامل بجميع التذاكر والشكاوى المحلولة
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
