"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  FlaskConical,
  Plus,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Star,
  Phone,
  MapPin,
  DollarSign
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function LabPage() {
  const [activeTab, setActiveTab] = useState("orders")

  // بيانات تجريبية
  const labOrders = [
    {
      id: "LAB-001",
      patientName: "أحمد علي",
      labName: "معمل الدقة للأسنان",
      type: "تاج خزفي",
      status: "IN_PROGRESS",
      paymentStatus: "UNPAID",
      amount: 450000,
      dueDate: "2024-01-28",
      orderDate: "2024-01-20",
      specifications: {
        material: "Zirconia",
        shade: "A2",
        toothNumber: 26,
      },
      progress: 60,
      inPlatform: true,
    },
    {
      id: "LAB-002",
      patientName: "سارة حسن",
      labName: "المختبر الذهبي",
      type: "طقم أسنان كامل",
      status: "READY",
      paymentStatus: "PARTIAL",
      amount: 1200000,
      paid: 600000,
      dueDate: "2024-01-25",
      orderDate: "2024-01-15",
      deliveryStatus: "جاهز للاستلام",
      inPlatform: true,
    },
    {
      id: "LAB-003",
      patientName: "محمد خالد",
      labName: "معمل الأمل (خارج المنصة)",
      type: "جسر ثابت",
      status: "PENDING",
      paymentStatus: "UNPAID",
      amount: 850000,
      dueDate: "2024-02-05",
      orderDate: "2024-01-22",
      inPlatform: false,
    },
  ]

  const savedLabs = [
    {
      id: "1",
      name: "معمل الدقة للأسنان",
      phone: "07701234567",
      city: "بغداد",
      rating: 4.8,
      specializations: ["Zirconia", "Emax", "PFM"],
      inPlatform: true,
      totalOrders: 45,
      isAvailable: true,
    },
    {
      id: "2",
      name: "المختبر الذهبي",
      phone: "07709876543",
      city: "بغداد",
      rating: 4.7,
      specializations: ["تركيبات متحركة", "أطقم كاملة"],
      inPlatform: true,
      totalOrders: 32,
      isAvailable: true,
    },
    {
      id: "3",
      name: "معمل الأمل (خارج المنصة)",
      phone: "07801234567",
      city: "النجف",
      inPlatform: false,
      totalOrders: 12,
    },
  ]

  const platformLabs = [
    {
      id: "4",
      name: "مختبر التميز الطبي",
      phone: "07751234567",
      city: "بغداد - الكرادة",
      rating: 4.9,
      reviews: 234,
      specializations: ["Zirconia", "Emax", "Veneers", "PFM"],
      deliveryTime: "3-5 أيام",
      priceRange: "متوسط",
      isAvailable: true,
      image: "🏆",
    },
    {
      id: "5",
      name: "معمل النجوم للتركيبات",
      phone: "07709998877",
      city: "بغداد - المنصور",
      rating: 4.6,
      reviews: 156,
      specializations: ["أطقم كاملة", "تركيبات متحركة"],
      deliveryTime: "5-7 أيام",
      priceRange: "اقتصادي",
      isAvailable: false,
      image: "⭐",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "IN_PROGRESS": return "info"
      case "READY": return "success"
      case "IN_TRANSIT": return "warning"
      case "DELIVERED": return "secondary"
      case "PENDING": return "warning"
      case "RETURNED": return "destructive"
      default: return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING": return "قيد الانتظار"
      case "ACCEPTED": return "مقبول"
      case "IN_PROGRESS": return "جاري التحضير"
      case "READY": return "جاهز"
      case "IN_TRANSIT": return "في الطريق"
      case "DELIVERED": return "تم التسليم"
      case "RETURNED": return "معاد"
      default: return status
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "success"
      case "PARTIAL": return "warning"
      case "UNPAID": return "destructive"
      default: return "default"
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "PAID": return "مسدد"
      case "PARTIAL": return "جزئي"
      case "UNPAID": return "غير مسدد"
      default: return status
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة المختبر</h2>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          طلب جديد
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="orders">طلبات المختبر</TabsTrigger>
          <TabsTrigger value="saved">المختبرات المحفوظة</TabsTrigger>
          <TabsTrigger value="platform">مختبرات المنصة</TabsTrigger>
        </TabsList>

        {/* Lab Orders Tab */}
        <TabsContent value="orders" className="space-y-4 mt-6">
          {labOrders.map((order) => (
            <Card key={order.id} className="bento-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-2">
                      طلب #{order.id}
                    </CardTitle>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold">{order.patientName}</p>
                      <p className="text-muted-foreground">{order.labName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                    <Badge variant={getPaymentStatusColor(order.paymentStatus)}>
                      {getPaymentStatusText(order.paymentStatus)}
                    </Badge>
                    {!order.inPlatform && (
                      <Badge variant="outline">خارج المنصة</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">نوع الطلب</p>
                    <p className="font-semibold">{order.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">تاريخ الاستحقاق</p>
                    <p className="font-semibold">{order.dueDate}</p>
                  </div>
                </div>

                {/* Specifications */}
                {order.specifications && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">المواصفات</p>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(order.specifications).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="justify-center">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                {order.status === "IN_PROGRESS" && order.progress && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">التقدم</span>
                      <span className="font-semibold">{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>
                )}

                {/* Delivery Status */}
                {order.deliveryStatus && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      {order.deliveryStatus}
                    </span>
                  </div>
                )}

                {/* Financial Info */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div>
                    <p className="text-sm text-muted-foreground">المبلغ الإجمالي</p>
                    <p className="text-lg font-bold text-blue-700">
                      {formatCurrency(order.amount)}
                    </p>
                  </div>
                  {order.paid && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">المدفوع</p>
                      <p className="text-lg font-bold text-green-700">
                        {formatCurrency(order.paid)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    التفاصيل
                  </Button>
                  {order.status === "READY" && (
                    <Button size="sm" className="flex-1">
                      <CheckCircle2 className="w-4 h-4 ml-1" />
                      تأكيد الاستلام
                    </Button>
                  )}
                  {order.status === "IN_PROGRESS" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 ml-1" />
                      المتابعة
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {labOrders.length === 0 && (
            <Card className="bento-card">
              <CardContent className="p-12 text-center">
                <FlaskConical className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">لا توجد طلبات</h3>
                <p className="text-muted-foreground mb-4">
                  لم يتم إنشاء أي طلبات مختبر بعد
                </p>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  إنشاء طلب جديد
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Saved Labs Tab */}
        <TabsContent value="saved" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {savedLabs.length} مختبر محفوظ
            </p>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 ml-2" />
              إضافة مختبر
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {savedLabs.map((lab) => (
              <Card key={lab.id} className="bento-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{lab.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span dir="ltr">{lab.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{lab.city}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {lab.inPlatform ? (
                        <Badge variant="success">في المنصة</Badge>
                      ) : (
                        <Badge variant="secondary">خارج المنصة</Badge>
                      )}
                      {lab.isAvailable !== undefined && (
                        <Badge variant={lab.isAvailable ? "success" : "secondary"}>
                          {lab.isAvailable ? "متاح" : "مشغول"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {lab.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{lab.rating}</span>
                    </div>
                  )}

                  {lab.specializations && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">التخصصات</p>
                      <div className="flex flex-wrap gap-2">
                        {lab.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground">إجمالي الطلبات</span>
                    <span className="font-bold">{lab.totalOrders}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      عرض الملف
                    </Button>
                    <Button size="sm" className="flex-1">
                      طلب جديد
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Platform Labs Tab */}
        <TabsContent value="platform" className="space-y-4 mt-6">
          {/* Filters */}
          <Card className="bento-card">
            <CardContent className="p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <select className="h-10 rounded-md border border-input bg-background px-3">
                  <option>جميع المحافظات</option>
                  <option>بغداد</option>
                  <option>البصرة</option>
                  <option>النجف</option>
                  <option>كربلاء</option>
                </select>
                <select className="h-10 rounded-md border border-input bg-background px-3">
                  <option>جميع التخصصات</option>
                  <option>Zirconia</option>
                  <option>Emax</option>
                  <option>PFM</option>
                  <option>تركيبات متحركة</option>
                </select>
                <select className="h-10 rounded-md border border-input bg-background px-3">
                  <option>الكل</option>
                  <option>متاح</option>
                  <option>مشغول</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {platformLabs.map((lab) => (
              <Card key={lab.id} className="bento-card hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-4xl flex-shrink-0">
                      {lab.image}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{lab.name}</CardTitle>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{lab.rating}</span>
                          <span className="text-muted-foreground">({lab.reviews})</span>
                        </div>
                        <Badge variant={lab.isAvailable ? "success" : "secondary"}>
                          {lab.isAvailable ? "متاح" : "مشغول"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{lab.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span dir="ltr">{lab.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>وقت التوصيل: {lab.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>الأسعار: {lab.priceRange}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">التخصصات</p>
                    <div className="flex flex-wrap gap-2">
                      {lab.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Star className="w-4 h-4 ml-1" />
                      حفظ
                    </Button>
                    <Button size="sm" className="flex-1">
                      عرض الملف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
