"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  FlaskConical,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Plus,
  Edit,
  Eye,
  MapPin,
  Calendar,
  Image as ImageIcon,
  UserPlus,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { MobileNav } from "@/components/shared/mobile-nav"

export default function LabDashboard() {
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [showStaffDialog, setShowStaffDialog] = useState(false)

  // Lab Stats
  const stats = {
    pendingOrders: 8,
    inProgressOrders: 15,
    completedOrders: 234,
    deliveryStaff: 5,
    monthlyRevenue: 32000000,
    averageRating: 4.9,
    totalClients: 45,
    activeOrders: 23,
  }

  // Recent Orders
  const recentOrders = [
    {
      id: "LAB-1234",
      clinicName: "عيادة الابتسامة الذكية",
      clinicCity: "بغداد",
      clinicPhone: "07701234567",
      orderType: "CROWN",
      orderTypeName: "تاج خزفي",
      quantity: 2,
      teethNumbers: [11, 21],
      details: {
        color: "A2",
        material: "زركونيا",
      },
      price: 2400000,
      status: "PENDING",
      orderedAt: "2024-01-20 10:30",
      deadline: "2024-01-25",
      priority: "HIGH",
      notes: "لون دقيق حسب العينة",
    },
    {
      id: "LAB-1233",
      clinicName: "عيادة د. محمد أحمد",
      clinicCity: "البصرة",
      clinicPhone: "07809876543",
      orderType: "BRIDGE",
      orderTypeName: "جسر",
      quantity: 1,
      teethNumbers: [14, 15, 16],
      details: {
        color: "A3",
        material: "بورسلين",
      },
      price: 3600000,
      status: "IN_PROGRESS",
      orderedAt: "2024-01-19 14:15",
      startedAt: "2024-01-19 16:00",
      deadline: "2024-01-24",
      progress: 45,
      assignedTechnician: "أحمد محمود",
      notes: "",
    },
    {
      id: "LAB-1232",
      clinicName: "مركز الأسنان المتقدم",
      clinicCity: "أربيل",
      clinicPhone: "07501234567",
      orderType: "DENTURE",
      orderTypeName: "طقم أسنان كامل",
      quantity: 1,
      details: {
        type: "كامل علوي",
        material: "أكريلك",
      },
      price: 1800000,
      status: "READY",
      orderedAt: "2024-01-18 09:00",
      completedAt: "2024-01-20 11:00",
      deadline: "2024-01-23",
      assignedTechnician: "سارة علي",
      notes: "",
    },
    {
      id: "LAB-1231",
      clinicName: "عيادة النور",
      clinicCity: "النجف",
      clinicPhone: "07601234567",
      orderType: "CROWN",
      orderTypeName: "تاج خزفي",
      quantity: 1,
      teethNumbers: [36],
      details: {
        color: "A1",
        material: "زركونيا",
      },
      price: 1200000,
      status: "IN_TRANSIT",
      orderedAt: "2024-01-17 11:00",
      completedAt: "2024-01-19 15:00",
      shippedAt: "2024-01-20 08:00",
      deadline: "2024-01-22",
      deliveryPerson: "عمر حسن",
      deliveryPhone: "07701112233",
      estimatedDelivery: "2024-01-20 16:00",
    },
  ]

  // Delivery Staff
  const deliveryStaff = [
    {
      id: "1",
      name: "عمر حسن",
      phone: "07701112233",
      vehicle: "دراجة نارية",
      currentOrders: 3,
      completedToday: 8,
      status: "ACTIVE",
      location: "حي المنصور",
    },
    {
      id: "2",
      name: "علي محمد",
      phone: "07709998877",
      vehicle: "سيارة",
      currentOrders: 2,
      completedToday: 5,
      status: "ACTIVE",
      location: "حي الكرادة",
    },
    {
      id: "3",
      name: "حسين أحمد",
      phone: "07801234567",
      vehicle: "دراجة نارية",
      currentOrders: 0,
      completedToday: 6,
      status: "AVAILABLE",
      location: "المختبر",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "warning"
      case "IN_PROGRESS": return "info"
      case "READY": return "success"
      case "IN_TRANSIT": return "default"
      case "DELIVERED": return "success"
      default: return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING": return "قيد الانتظار"
      case "IN_PROGRESS": return "جاري العمل"
      case "READY": return "جاهز"
      case "IN_TRANSIT": return "في الطريق"
      case "DELIVERED": return "تم التسليم"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-4 h-4" />
      case "IN_PROGRESS": return <FlaskConical className="w-4 h-4" />
      case "READY": return <CheckCircle className="w-4 h-4" />
      case "IN_TRANSIT": return <Truck className="w-4 h-4" />
      case "DELIVERED": return <CheckCircle className="w-4 h-4" />
      default: return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH": return "destructive"
      case "MEDIUM": return "warning"
      case "LOW": return "secondary"
      default: return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">مركز المعامل</h1>
                <p className="text-sm text-muted-foreground">مختبر الابتسامة المتقدم</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/lab/profile">
                <Edit className="w-4 h-4 ml-2" />
                الملف الشخصي
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bento-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">طلبات نشطة</p>
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold">{stats.activeOrders}</p>
              <p className="text-xs text-orange-600 mt-1">
                {stats.pendingOrders} قيد الانتظار
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">طاقم التوصيل</p>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold">{stats.deliveryStaff}</p>
              <p className="text-xs text-green-600 mt-1">
                {deliveryStaff.filter(s => s.status === "AVAILABLE").length} متاح
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">الإيرادات</p>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(stats.monthlyRevenue)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                هذا الشهر
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">التقييم</p>
                <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
              </div>
              <p className="text-2xl font-bold">{stats.averageRating}</p>
              <p className="text-xs text-muted-foreground mt-1">
                من {stats.totalClients} عيادة
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bento-card hover:shadow-lg transition-all cursor-pointer" asChild>
            <Link href="/lab/orders">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold">إدارة الطلبات</h3>
                <p className="text-sm text-muted-foreground">
                  متابعة الطلبات والعمل
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="bento-card hover:shadow-lg transition-all cursor-pointer" asChild>
            <Link href="/lab/delivery">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold">إدارة التوصيل</h3>
                <p className="text-sm text-muted-foreground">
                  تتبع طاقم التوصيل
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="bento-card hover:shadow-lg transition-all cursor-pointer" asChild>
            <Link href="/lab/gallery">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold">معرض الأعمال</h3>
                <p className="text-sm text-muted-foreground">
                  عرض نماذج العمل
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="bento-card hover:shadow-lg transition-all cursor-pointer" asChild>
            <Link href="/lab/analytics">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold">التقارير</h3>
                <p className="text-sm text-muted-foreground">
                  إحصائيات الأداء
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="bento-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>الطلبات الأخيرة</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/lab/orders">
                  عرض الكل
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Card key={order.id} className="bento-card hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{order.clinicName}</h4>
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 ml-1" />
                            {order.clinicCity}
                          </Badge>
                          {order.priority === "HIGH" && (
                            <Badge variant={getPriorityColor(order.priority)} className="text-xs">
                              عاجل
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.id} • {order.orderTypeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 inline ml-1" />
                          موعد التسليم: {order.deadline}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="mr-1">{getStatusText(order.status)}</span>
                      </Badge>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">الكمية:</span>
                        <span className="font-medium">{order.quantity}</span>
                      </div>
                      {order.teethNumbers && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">الأسنان:</span>
                          <span className="font-medium">{order.teethNumbers.join(", ")}</span>
                        </div>
                      )}
                      {Object.entries(order.details).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{key === "color" ? "اللون" : key === "material" ? "المادة" : key === "type" ? "النوع" : key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar for IN_PROGRESS */}
                    {order.status === "IN_PROGRESS" && order.progress !== undefined && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">التقدم</span>
                          <span className="font-medium">{order.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                        {order.assignedTechnician && (
                          <p className="text-xs text-muted-foreground mt-1">
                            الفني: {order.assignedTechnician}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Delivery Info */}
                    {order.status === "IN_TRANSIT" && order.deliveryPerson && (
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-medium text-blue-700">{order.deliveryPerson}</p>
                            <p className="text-xs text-muted-foreground">{order.deliveryPhone}</p>
                          </div>
                          <Badge variant="info" className="text-xs">
                            <Truck className="w-3 h-3 ml-1" />
                            في الطريق
                          </Badge>
                        </div>
                      </div>
                    )}

                    {/* Price */}
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">المبلغ</span>
                        <span className="text-lg font-bold text-green-700">
                          {formatCurrency(order.price)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 ml-1" />
                        عرض
                      </Button>
                      {order.status === "PENDING" && (
                        <Button size="sm" className="flex-1">
                          بدء العمل
                        </Button>
                      )}
                      {order.status === "READY" && (
                        <Button size="sm" className="flex-1">
                          <Truck className="w-4 h-4 ml-1" />
                          إرسال للتوصيل
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Staff */}
        <Card className="bento-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>طاقم التوصيل</CardTitle>
              <Dialog open={showStaffDialog} onOpenChange={setShowStaffDialog}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="w-4 h-4 ml-2" />
                    إضافة موصل
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إضافة موصل جديد</DialogTitle>
                    <DialogDescription>
                      أدخل بيانات الموصل الجديد
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>الاسم الكامل</Label>
                      <Input placeholder="عمر حسن" />
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الهاتف</Label>
                      <Input placeholder="07XXXXXXXXX" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <Label>نوع المركبة</Label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                        <option value="motorcycle">دراجة نارية</option>
                        <option value="car">سيارة</option>
                        <option value="bicycle">دراجة هوائية</option>
                      </select>
                    </div>
                    <Button className="w-full">إضافة الموصل</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {deliveryStaff.map((staff) => (
                <Card key={staff.id} className="bento-card hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {staff.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-sm">{staff.name}</h4>
                          <p className="text-xs text-muted-foreground">{staff.phone}</p>
                        </div>
                      </div>
                      <Badge variant={staff.status === "ACTIVE" ? "info" : "success"}>
                        {staff.status === "ACTIVE" ? "نشط" : "متاح"}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">المركبة:</span>
                        <span className="font-medium">{staff.vehicle}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">طلبات حالية:</span>
                        <Badge variant="outline" className="text-xs">
                          {staff.currentOrders}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">اكتملت اليوم:</span>
                        <Badge variant="success" className="text-xs">
                          {staff.completedToday}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">الموقع:</span>
                        <span className="font-medium text-blue-600">
                          <MapPin className="w-3 h-3 inline ml-1" />
                          {staff.location}
                        </span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Eye className="w-4 h-4 ml-1" />
                      التفاصيل
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Mobile Navigation */}
      <MobileNav userRole="LAB" isOwner={false} />
    </div>
  )
}
