"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Bell,
  Send,
  Users,
  Tag,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react"

export default function NotificationsManagementPage() {
  const [notificationText, setNotificationText] = useState("")
  const [notificationTitle, setNotificationTitle] = useState("")
  const [targetAudience, setTargetAudience] = useState("all")
  const [notificationType, setNotificationType] = useState("announcement")
  const [promoCode, setPromoCode] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // إحصائيات الإشعارات
  const stats = {
    totalSent: 1247,
    totalUsers: 402,
    openRate: 78,
    clickRate: 45,
  }

  // آخر الإشعارات المرسلة
  const recentNotifications = [
    {
      id: "1",
      title: "خصم 20% على جميع المنتجات",
      message: "استخدم كود DENTAL2024 للحصول على الخصم",
      sentTo: "جميع المستخدمين",
      sentDate: "2024-01-20 10:30",
      recipients: 402,
      opened: 315,
      clicked: 187,
    },
    {
      id: "2",
      title: "ندوة جديدة: تقنيات زراعة الأسنان",
      message: "سجل الآن في الندوة المجانية",
      sentTo: "الأطباء فقط",
      sentDate: "2024-01-19 14:15",
      recipients: 345,
      opened: 289,
      clicked: 156,
    },
  ]

  const handleSendNotification = async () => {
    if (!notificationTitle || !notificationText) {
      alert("الرجاء إدخال العنوان والنص")
      return
    }

    setIsSending(true)
    setSuccessMessage("")

    try {
      const response = await fetch("/api/platform-admin/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: notificationTitle,
          message: notificationText,
          targetAudience,
          notificationType,
          promoCode: promoCode || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccessMessage(`تم إرسال الإشعار بنجاح إلى ${data.sentCount} مستخدم`)
        // إعادة تعيين الحقول
        setNotificationTitle("")
        setNotificationText("")
        setPromoCode("")
      } else {
        alert(data.error || "حدث خطأ في إرسال الإشعار")
      }
    } catch (error) {
      console.error("خطأ في إرسال الإشعار:", error)
      alert("حدث خطأ في إرسال الإشعار")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">إدارة الإشعارات والتنبيهات</h1>
        <p className="text-muted-foreground">إرسال إشعارات للمستخدمين</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي المرسل</p>
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalSent}</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">المستخدمون</p>
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">معدل الفتح</p>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{stats.openRate}%</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">معدل النقر</p>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold">{stats.clickRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* إرسال إشعار جديد */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            إرسال إشعار جديد
          </CardTitle>
          <CardDescription>
            إرسال إشعار لجميع المستخدمين أو فئة محددة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {successMessage}
            </div>
          )}

          <div className="space-y-2">
            <Label>عنوان الإشعار</Label>
            <Input
              placeholder="مثال: عرض خاص - خصم 20%"
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>نص الإشعار</Label>
            <Textarea
              placeholder="اكتب نص الإشعار هنا..."
              value={notificationText}
              onChange={(e) => setNotificationText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>الفئة المستهدفة</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              >
                <option value="all">جميع المستخدمين</option>
                <option value="dentists">الأطباء فقط</option>
                <option value="vendors">الموردين فقط</option>
                <option value="labs">المختبرات فقط</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>نوع الإشعار</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3"
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
              >
                <option value="promotion">عرض ترويجي</option>
                <option value="announcement">إعلان</option>
                <option value="update">تحديث</option>
                <option value="reminder">تذكير</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>رمز الخصم (اختياري)</Label>
            <Input
              placeholder="مثال: DENTAL2024"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSendNotification}
              className="flex-1"
              disabled={isSending}
            >
              <Send className="w-4 h-4 ml-2" />
              {isSending ? "جاري الإرسال..." : "إرسال الإشعار"}
            </Button>
            <Button variant="outline" className="flex-1">
              جدولة الإرسال
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* آخر الإشعارات المرسلة */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle>آخر الإشعارات المرسلة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentNotifications.map((notification) => (
            <Card key={notification.id} className="bento-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{notification.sentTo}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{notification.sentDate}</span>
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-xs text-muted-foreground mb-1">المرسل إليهم</p>
                    <p className="text-lg font-bold text-blue-700">{notification.recipients}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-xs text-muted-foreground mb-1">تم الفتح</p>
                    <p className="text-lg font-bold text-green-700">{notification.opened}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="text-xs text-muted-foreground mb-1">النقرات</p>
                    <p className="text-lg font-bold text-purple-700">{notification.clicked}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">معدل الفتح</span>
                    <span className="font-semibold">
                      {Math.round((notification.opened / notification.recipients) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(notification.opened / notification.recipients) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
