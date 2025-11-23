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
  Truck,
  Package,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  User,
  Plus,
  Calendar,
  Activity,
  TrendingUp,
  Users,
  Navigation,
  AlertCircle,
} from "lucide-react"

export default function DeliveryManagement() {
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false)

  // Delivery Stats
  const stats = {
    activeDeliveries: 8,
    availableStaff: 3,
    completedToday: 24,
    totalStaff: 5,
  }

  // Delivery Staff
  const deliveryStaff = [
    {
      id: "1",
      name: "عمر حسن",
      phone: "07701112233",
      vehicle: "دراجة نارية",
      vehicleNumber: "123 ABC",
      currentOrders: 3,
      completedToday: 8,
      completedTotal: 245,
      status: "ACTIVE",
      location: "حي المنصور",
      rating: 4.9,
      joinedDate: "2024-01-01",
    },
    {
      id: "2",
      name: "علي محمد",
      phone: "07709998877",
      vehicle: "سيارة",
      vehicleNumber: "456 DEF",
      currentOrders: 2,
      completedToday: 5,
      completedTotal: 189,
      status: "ACTIVE",
      location: "حي الكرادة",
      rating: 4.7,
      joinedDate: "2024-02-15",
    },
    {
      id: "3",
      name: "حسين أحمد",
      phone: "07801234567",
      vehicle: "دراجة نارية",
      vehicleNumber: "789 GHI",
      currentOrders: 0,
      completedToday: 6,
      completedTotal: 156,
      status: "AVAILABLE",
      location: "المختبر",
      rating: 4.8,
      joinedDate: "2024-03-01",
    },
    {
      id: "4",
      name: "محمد رضا",
      phone: "07701234444",
      vehicle: "دراجة نارية",
      vehicleNumber: "101 JKL",
      currentOrders: 2,
      completedToday: 5,
      completedTotal: 134,
      status: "ACTIVE",
      location: "حي العامرية",
      rating: 4.6,
      joinedDate: "2024-04-10",
    },
    {
      id: "5",
      name: "سعد جاسم",
      phone: "07809876543",
      vehicle: "سيارة",
      vehicleNumber: "202 MNO",
      currentOrders: 1,
      completedToday: 0,
      completedTotal: 98,
      status: "ACTIVE",
      location: "حي الحرية",
      rating: 4.5,
      joinedDate: "2024-05-20",
    },
  ]

  // Ready for Delivery Orders
  const readyOrders = [
    {
      id: "LAB-1232",
      clinicName: "مركز الأسنان المتقدم",
      clinicAddress: "شارع الكندي، أربيل",
      clinicPhone: "07501234567",
      orderType: "طقم أسنان كامل",
      completedAt: "2024-01-20 11:00",
      priority: "NORMAL",
      value: 1800000,
    },
    {
      id: "LAB-1235",
      clinicName: "عيادة الابتسامة",
      clinicAddress: "حي المنصور، بغداد",
      clinicPhone: "07701234567",
      orderType: "تاج خزفي × 2",
      completedAt: "2024-01-20 13:30",
      priority: "HIGH",
      value: 2400000,
    },
    {
      id: "LAB-1236",
      clinicName: "عيادة د. أحمد",
      clinicAddress: "شارع الجامعة، الموصل",
      clinicPhone: "07609876543",
      orderType: "جسر",
      completedAt: "2024-01-20 14:00",
      priority: "NORMAL",
      value: 3600000,
    },
  ]

  // Active Deliveries
  const activeDeliveries = [
    {
      id: "LAB-1231",
      clinicName: "عيادة النور",
      clinicAddress: "شارع الكوفة، النجف",
      orderType: "تاج خزفي",
      deliveryPerson: "عمر حسن",
      deliveryPhone: "07701112233",
      estimatedTime: "14:30",
      currentLocation: "شارع الجمهورية",
      progress: 65,
      value: 1200000,
    },
    {
      id: "LAB-1234",
      clinicName: "مركز الأسنان الذهبي",
      clinicAddress: "حي الضباط، البصرة",
      orderType: "جسر × 2",
      deliveryPerson: "علي محمد",
      deliveryPhone: "07709998877",
      estimatedTime: "15:00",
      currentLocation: "حي البراضعية",
      progress: 40,
      value: 4800000,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getStaffStatusColor = (status: string) => {
    return status === "ACTIVE" ? "info" : "success"
  }

  const getStaffStatusText = (status: string) => {
    return status === "ACTIVE" ? "نشط" : "متاح"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة التوصيل</h1>
          <p className="text-muted-foreground mt-1">
            متابعة الشحنات وطاقم التوصيل
          </p>
        </div>
        <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
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
              <div className="space-y-2">
                <Label>رقم المركبة</Label>
                <Input placeholder="123 ABC" dir="ltr" />
              </div>
              <Button className="w-full">إضافة الموصل</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">شحنات نشطة</p>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.activeDeliveries}</p>
            <p className="text-xs text-muted-foreground mt-1">في الطريق الآن</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">طاقم متاح</p>
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.availableStaff}</p>
            <p className="text-xs text-muted-foreground mt-1">
              من {stats.totalStaff} موصل
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">اكتمل اليوم</p>
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.completedToday}</p>
            <p className="text-xs text-muted-foreground mt-1">عملية توصيل</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">جاهز للشحن</p>
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{readyOrders.length}</p>
            <p className="text-xs text-muted-foreground mt-1">طلب</p>
          </CardContent>
        </Card>
      </div>

      {/* Ready for Delivery */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            جاهز للتوصيل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {readyOrders.map((order) => (
              <Card key={order.id} className="bento-card hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold">{order.clinicName}</h4>
                        {order.priority === "HIGH" && (
                          <Badge variant="destructive" className="text-xs">
                            عاجل
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {order.clinicAddress}
                        </p>
                        <p className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {order.clinicPhone}
                        </p>
                        <p className="text-xs">
                          <Clock className="w-3 h-3 inline ml-1" />
                          اكتمل: {order.completedAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xs text-muted-foreground mb-1">نوع الطلب</p>
                      <p className="text-sm font-bold text-blue-700">{order.orderType}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-xs text-muted-foreground mb-1">القيمة</p>
                      <p className="text-sm font-bold text-green-700">
                        {formatCurrency(order.value)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <select className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">اختر الموصل...</option>
                      {deliveryStaff
                        .filter(s => s.status === "AVAILABLE" || s.currentOrders < 3)
                        .map(staff => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name} ({staff.currentOrders} طلبات)
                          </option>
                        ))
                      }
                    </select>
                    <Button>
                      <Truck className="w-4 h-4 ml-1" />
                      إرسال
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Deliveries */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            شحنات نشطة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeDeliveries.map((delivery) => (
              <Card key={delivery.id} className="bento-card hover:shadow-md transition-shadow border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{delivery.clinicName}</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {delivery.clinicAddress}
                        </p>
                        <p className="text-xs">طلب: {delivery.id}</p>
                      </div>
                    </div>
                    <Badge variant="info">
                      <Activity className="w-3 h-3 ml-1" />
                      في الطريق
                    </Badge>
                  </div>

                  {/* Delivery Person Info */}
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                            {delivery.deliveryPerson.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold">{delivery.deliveryPerson}</p>
                          <p className="text-xs text-muted-foreground">{delivery.deliveryPhone}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-muted-foreground">
                        <Navigation className="w-3 h-3 inline ml-1" />
                        الموقع الحالي: {delivery.currentLocation}
                      </span>
                      <span className="font-medium">
                        <Clock className="w-3 h-3 inline ml-1" />
                        الوصول المتوقع: {delivery.estimatedTime}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                        style={{ width: `${delivery.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">نوع الطلب</p>
                      <p className="text-xs font-bold text-purple-700">{delivery.orderType}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">القيمة</p>
                      <p className="text-xs font-bold text-green-700">
                        {formatCurrency(delivery.value)}
                      </p>
                    </div>
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
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            طاقم التوصيل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deliveryStaff.map((staff) => (
              <Card key={staff.id} className="bento-card hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {staff.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">{staff.name}</h4>
                        <p className="text-xs text-muted-foreground">{staff.phone}</p>
                      </div>
                    </div>
                    <Badge variant={getStaffStatusColor(staff.status)}>
                      {getStaffStatusText(staff.status)}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">المركبة:</span>
                      <span className="font-medium">{staff.vehicle}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">رقم المركبة:</span>
                      <span className="font-medium">{staff.vehicleNumber}</span>
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
                      <span className="text-muted-foreground">إجمالي الطلبات:</span>
                      <span className="font-medium">{staff.completedTotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">التقييم:</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-yellow-600" />
                        <span className="font-medium">{staff.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">الموقع:</span>
                      <span className="font-medium text-blue-600">
                        <MapPin className="w-3 h-3 inline ml-1" />
                        {staff.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 ml-1" />
                      اتصال
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
