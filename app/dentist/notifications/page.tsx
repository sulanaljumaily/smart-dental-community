"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Bell,
  Search,
  Calendar,
  Package,
  ShoppingCart,
  Truck,
  CheckCircle2,
  MessageSquare,
  AlertTriangle,
  Info,
  Building2,
  Trash2,
  Check,
  Filter,
  X,
} from "lucide-react"

type NotificationType =
  | "APPOINTMENT"
  | "INVENTORY"
  | "ORDER"
  | "DELIVERY"
  | "TASK"
  | "MESSAGE"
  | "SYSTEM"
  | "ALERT"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  link?: string
  timestamp: string
  isRead: boolean
  clinic: {
    id: string
    name: string
  }
  data?: Record<string, any>
}

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<NotificationType | "all">("all")
  const [filterClinic, setFilterClinic] = useState<string>("all")
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  // بيانات تجريبية - سيتم استبدالها بـ API
  const notifications: Notification[] = [
    {
      id: "1",
      type: "APPOINTMENT",
      title: "موعد جديد",
      message: "تم حجز موعد جديد مع المريض أحمد علي في تمام الساعة 3:00 مساءً",
      link: "/clinic/1/appointments",
      timestamp: "منذ 5 دقائق",
      isRead: false,
      clinic: { id: "1", name: "عيادة النجوم" },
    },
    {
      id: "2",
      type: "INVENTORY",
      title: "تنبيه مخزون منخفض",
      message: "نقص في مخزون القفازات الطبية - الكمية الحالية: 20 علبة",
      link: "/clinic/1/assets",
      timestamp: "منذ ساعة",
      isRead: false,
      clinic: { id: "1", name: "عيادة النجوم" },
    },
    {
      id: "3",
      type: "TASK",
      title: "مهمة جديدة",
      message: "تم تعيين مهمة جديدة لك: متابعة حالة المريض خالد",
      link: "/dentist/tasks",
      timestamp: "منذ ساعتين",
      isRead: false,
      clinic: { id: "1", name: "عيادة النجوم" },
    },
    {
      id: "4",
      type: "DELIVERY",
      title: "طلب مختبر جاهز",
      message: "طلب التاج #124 من معمل الدقة جاهز للاستلام",
      link: "/clinic/1/lab",
      timestamp: "منذ 3 ساعات",
      isRead: true,
      clinic: { id: "1", name: "عيادة النجوم" },
    },
    {
      id: "5",
      type: "MESSAGE",
      message: "رسالة جديدة من د. أحمد محمد: شكراً دكتور، سأتابع مع المريض غداً",
      title: "رسالة جديدة",
      link: "/dentist/messages",
      timestamp: "منذ 4 ساعات",
      isRead: true,
      clinic: { id: "1", name: "عيادة النجوم" },
    },
    {
      id: "6",
      type: "ORDER",
      title: "طلبية جديدة من المتجر",
      message: "تم تأكيد طلبيتك #5678 بقيمة 450,000 د.ع",
      link: "/marketplace",
      timestamp: "منذ 5 ساعات",
      isRead: true,
      clinic: { id: "2", name: "مركز الابتسامة" },
    },
    {
      id: "7",
      type: "SYSTEM",
      title: "تحديث النظام",
      message: "تم إضافة ميزات جديدة في لوحة التحكم",
      link: "#",
      timestamp: "منذ يوم",
      isRead: true,
      clinic: { id: "1", name: "عيادة النجوم" },
    },
    {
      id: "8",
      type: "APPOINTMENT",
      title: "إلغاء موعد",
      message: "تم إلغاء موعد المريضة سارة في تمام الساعة 2:00 مساءً",
      link: "/clinic/2/appointments",
      timestamp: "منذ يوم",
      isRead: true,
      clinic: { id: "2", name: "مركز الابتسامة" },
    },
    {
      id: "9",
      type: "ALERT",
      title: "تذكير صيانة",
      message: "موعد الصيانة الدورية لجهاز الأشعة بعد 3 أيام",
      link: "/clinic/1/assets",
      timestamp: "منذ يومين",
      isRead: true,
      clinic: { id: "1", name: "عيادة النجوم" },
    },
  ]

  const clinics = [
    { id: "1", name: "عيادة النجوم" },
    { id: "2", name: "مركز الابتسامة" },
    { id: "3", name: "عيادة الأمل" },
  ]

  // Helper functions
  const getTypeLabel = (type: NotificationType) => {
    const labels: Record<NotificationType, string> = {
      APPOINTMENT: "موعد",
      INVENTORY: "مخزون",
      ORDER: "طلبية",
      DELIVERY: "توصيل",
      TASK: "مهمة",
      MESSAGE: "رسالة",
      SYSTEM: "نظام",
      ALERT: "تنبيه",
    }
    return labels[type]
  }

  const getTypeIcon = (type: NotificationType) => {
    const icons: Record<NotificationType, any> = {
      APPOINTMENT: Calendar,
      INVENTORY: Package,
      ORDER: ShoppingCart,
      DELIVERY: Truck,
      TASK: CheckCircle2,
      MESSAGE: MessageSquare,
      SYSTEM: Info,
      ALERT: AlertTriangle,
    }
    return icons[type]
  }

  const getTypeColor = (type: NotificationType) => {
    const colors: Record<NotificationType, string> = {
      APPOINTMENT: "bg-blue-100 text-blue-700",
      INVENTORY: "bg-orange-100 text-orange-700",
      ORDER: "bg-green-100 text-green-700",
      DELIVERY: "bg-purple-100 text-purple-700",
      TASK: "bg-indigo-100 text-indigo-700",
      MESSAGE: "bg-pink-100 text-pink-700",
      SYSTEM: "bg-gray-100 text-gray-700",
      ALERT: "bg-red-100 text-red-700",
    }
    return colors[type]
  }

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesClinic = filterClinic === "all" || notification.clinic.id === filterClinic
    const matchesReadStatus = !showOnlyUnread || !notification.isRead
    return matchesSearch && matchesType && matchesClinic && matchesReadStatus
  })

  // Statistics
  const totalNotifications = notifications.length
  const unreadNotifications = notifications.filter((n) => !n.isRead).length
  const todayNotifications = notifications.filter((n) =>
    n.timestamp.includes("دقائق") || n.timestamp.includes("ساعة") || n.timestamp.includes("ساعات")
  ).length

  const handleMarkAsRead = (id: string) => {
    // TODO: Implement mark as read logic
    console.log("Mark as read:", id)
  }

  const handleMarkAllAsRead = () => {
    // TODO: Implement mark all as read logic
    console.log("Mark all as read")
  }

  const handleDelete = (id: string) => {
    // TODO: Implement delete logic
    console.log("Delete notification:", id)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">الإشعارات</h1>
          <p className="text-muted-foreground">جميع الإشعارات والتنبيهات من عياداتك</p>
        </div>
        <div className="flex items-center gap-3">
          {unreadNotifications > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="w-4 h-4 ml-2" />
              تحديد الكل كمقروء
            </Button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الإشعارات</p>
                <p className="text-2xl font-bold">{totalNotifications}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">غير مقروءة</p>
                <p className="text-2xl font-bold">{unreadNotifications}</p>
              </div>
              <Badge variant="destructive" className="h-10 w-10 rounded-full flex items-center justify-center text-lg">
                {unreadNotifications}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إشعارات اليوم</p>
                <p className="text-2xl font-bold">{todayNotifications}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في الإشعارات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Clinic Filter */}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterClinic}
                  onChange={(e) => setFilterClinic(e.target.value)}
                  className="px-3 py-1.5 border rounded-md text-sm"
                >
                  <option value="all">جميع العيادات</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as NotificationType | "all")}
                  className="px-3 py-1.5 border rounded-md text-sm"
                >
                  <option value="all">جميع الأنواع</option>
                  <option value="APPOINTMENT">مواعيد</option>
                  <option value="TASK">مهام</option>
                  <option value="MESSAGE">رسائل</option>
                  <option value="INVENTORY">مخزون</option>
                  <option value="ORDER">طلبيات</option>
                  <option value="DELIVERY">توصيل</option>
                  <option value="ALERT">تنبيهات</option>
                  <option value="SYSTEM">نظام</option>
                </select>
              </div>

              {/* Unread Toggle */}
              <Button
                variant={showOnlyUnread ? "default" : "outline"}
                size="sm"
                onClick={() => setShowOnlyUnread(!showOnlyUnread)}
              >
                {showOnlyUnread ? "إظهار الكل" : "غير المقروءة فقط"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const TypeIcon = getTypeIcon(notification.type)

          return (
            <Card
              key={notification.id}
              className={`bento-card hover:shadow-md transition-shadow ${
                notification.isRead ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full ${getTypeColor(
                      notification.type
                    )} flex items-center justify-center flex-shrink-0`}
                  >
                    <TypeIcon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleDelete(notification.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <Badge className={getTypeColor(notification.type)}>
                        {getTypeLabel(notification.type)}
                      </Badge>

                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {notification.clinic.name}
                      </span>

                      <span className="text-muted-foreground">{notification.timestamp}</span>
                    </div>

                    {/* Action Link */}
                    {notification.link && notification.link !== "#" && (
                      <Button variant="link" size="sm" className="h-auto p-0 text-blue-600">
                        عرض التفاصيل ←
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredNotifications.length === 0 && (
          <Card className="bento-card">
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">لا توجد إشعارات</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "لم يتم العثور على إشعارات تطابق بحثك"
                  : showOnlyUnread
                  ? "لا توجد إشعارات غير مقروءة"
                  : "لا توجد إشعارات حالياً"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
