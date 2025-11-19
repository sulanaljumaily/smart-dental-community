"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Search,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  MapPin,
  DollarSign,
  Calendar,
  Filter,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function VendorOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const orders = [
    {
      id: "ORD-1234",
      clinicName: "عيادة الابتسامة الذكية",
      clinicCity: "بغداد",
      clinicAddress: "حي المنصور، شارع الأميرات",
      clinicPhone: "07701234567",
      items: [
        { name: "قفازات نتريل - 100 قطعة", quantity: 5, price: 35000 },
        { name: "كمامات N95 - عبوة 50", quantity: 2, price: 90000 },
      ],
      totalAmount: 355000,
      status: "PENDING",
      paymentStatus: "PENDING",
      paymentMethod: "ZainCash",
      orderedAt: "2024-01-20 10:30",
      notes: "توصيل سريع من فضلكم",
    },
    {
      id: "ORD-1233",
      clinicName: "عيادة د. محمد أحمد",
      clinicCity: "البصرة",
      clinicAddress: "منطقة العشار، شارع الكورنيش",
      clinicPhone: "07809876543",
      items: [
        { name: "حشوة مركبة A2", quantity: 3, price: 180000 },
        { name: "إبر تخدير - 27G", quantity: 10, price: 25000 },
      ],
      totalAmount: 790000,
      status: "PROCESSING",
      paymentStatus: "PAID",
      paymentMethod: "تحويل بنكي",
      orderedAt: "2024-01-19 14:15",
      notes: "",
      processedAt: "2024-01-19 15:30",
    },
    {
      id: "ORD-1232",
      clinicName: "مركز الأسنان المتقدم",
      clinicCity: "أربيل",
      clinicAddress: "حي إيمبريال، بناية طب الأسنان",
      clinicPhone: "07501234567",
      items: [
        { name: "جهاز تعقيم أوتوكليف صغير", quantity: 1, price: 8500000 },
        { name: "قفازات نتريل - 100 قطعة", quantity: 10, price: 35000 },
      ],
      totalAmount: 8850000,
      status: "SHIPPED",
      paymentStatus: "PAID",
      paymentMethod: "ZainCash",
      orderedAt: "2024-01-18 09:00",
      processedAt: "2024-01-18 11:00",
      shippedAt: "2024-01-19 08:00",
      trackingNumber: "TRK-2024-1234",
      estimatedDelivery: "2024-01-22",
    },
    {
      id: "ORD-1231",
      clinicName: "عيادة النور",
      clinicCity: "النجف",
      clinicAddress: "شارع الكوفة، مجمع الأطباء",
      clinicPhone: "07601234567",
      items: [
        { name: "مرايا أسنان - عبوة 100", quantity: 2, price: 45000 },
      ],
      totalAmount: 90000,
      status: "DELIVERED",
      paymentStatus: "PAID",
      paymentMethod: "نقدي",
      orderedAt: "2024-01-17 11:00",
      processedAt: "2024-01-17 12:00",
      shippedAt: "2024-01-18 08:00",
      deliveredAt: "2024-01-19 14:30",
    },
    {
      id: "ORD-1230",
      clinicName: "عيادة الأمل",
      clinicCity: "كربلاء",
      clinicAddress: "حي الحسين، شارع الإمام علي",
      clinicPhone: "07701111222",
      items: [
        { name: "كمامات N95 - عبوة 50", quantity: 5, price: 90000 },
      ],
      totalAmount: 450000,
      status: "CANCELLED",
      paymentStatus: "REFUNDED",
      paymentMethod: "ZainCash",
      orderedAt: "2024-01-16 16:00",
      cancelledAt: "2024-01-16 18:00",
      cancelReason: "الطلب مكرر",
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
      case "PROCESSING": return "info"
      case "SHIPPED": return "default"
      case "DELIVERED": return "success"
      case "CANCELLED": return "destructive"
      default: return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING": return "قيد الانتظار"
      case "PROCESSING": return "جاري التحضير"
      case "SHIPPED": return "تم الشحن"
      case "DELIVERED": return "تم التسليم"
      case "CANCELLED": return "ملغي"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-4 h-4" />
      case "PROCESSING": return <Package className="w-4 h-4" />
      case "SHIPPED": return <Truck className="w-4 h-4" />
      case "DELIVERED": return <CheckCircle className="w-4 h-4" />
      case "CANCELLED": return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.clinicName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const ordersByStatus = {
    pending: orders.filter(o => o.status === "PENDING").length,
    processing: orders.filter(o => o.status === "PROCESSING").length,
    shipped: orders.filter(o => o.status === "SHIPPED").length,
    delivered: orders.filter(o => o.status === "DELIVERED").length,
    cancelled: orders.filter(o => o.status === "CANCELLED").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">إدارة الطلبات</h1>
            <Button variant="outline" asChild>
              <Link href="/vendor">
                عودة للمركز
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-600">{ordersByStatus.pending}</p>
              <p className="text-xs text-muted-foreground">قيد الانتظار</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">{ordersByStatus.processing}</p>
              <p className="text-xs text-muted-foreground">جاري التحضير</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Truck className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-600">{ordersByStatus.shipped}</p>
              <p className="text-xs text-muted-foreground">تم الشحن</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{ordersByStatus.delivered}</p>
              <p className="text-xs text-muted-foreground">تم التسليم</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-600">{ordersByStatus.cancelled}</p>
              <p className="text-xs text-muted-foreground">ملغي</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="ابحث برقم الطلب أو اسم العيادة..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3"
              >
                <option value="all">جميع الحالات</option>
                <option value="PENDING">قيد الانتظار</option>
                <option value="PROCESSING">جاري التحضير</option>
                <option value="SHIPPED">تم الشحن</option>
                <option value="DELIVERED">تم التسليم</option>
                <option value="CANCELLED">ملغي</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bento-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{order.clinicName}</h3>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 ml-1" />
                        {order.clinicCity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      رقم الطلب: <span className="font-medium">{order.id}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 inline ml-1" />
                      {order.orderedAt}
                    </p>
                  </div>
                  <Badge variant={getStatusColor(order.status)} className="text-sm">
                    {getStatusIcon(order.status)}
                    <span className="mr-1">{getStatusText(order.status)}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold">المنتجات:</p>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 rounded-lg bg-accent/30">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">
                          {item.quantity} × {formatCurrency(item.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total & Payment */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                    <p className="text-xs text-muted-foreground mb-1">المبلغ الإجمالي</p>
                    <p className="text-lg font-bold text-green-700">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                    <p className="text-xs text-muted-foreground mb-1">طريقة الدفع</p>
                    <p className="text-sm font-medium text-blue-700">
                      {order.paymentMethod}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-center">
                    <p className="text-xs text-muted-foreground mb-1">حالة الدفع</p>
                    <Badge variant={order.paymentStatus === "PAID" ? "success" : "warning"}>
                      {order.paymentStatus === "PAID" ? "مدفوع" : order.paymentStatus === "REFUNDED" ? "مسترد" : "معلق"}
                    </Badge>
                  </div>
                </div>

                {/* Delivery Info */}
                {order.status === "SHIPPED" && (
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">رقم التتبع</p>
                        <p className="font-bold text-purple-700">{order.trackingNumber}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground mb-1">التسليم المتوقع</p>
                        <p className="font-medium text-purple-700">{order.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delivery Address */}
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs text-muted-foreground mb-1">عنوان التوصيل</p>
                  <p className="text-sm font-medium">{order.clinicAddress}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    هاتف: {order.clinicPhone}
                  </p>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-xs text-muted-foreground mb-1">ملاحظات العميل</p>
                    <p className="text-sm">{order.notes}</p>
                  </div>
                )}

                {/* Cancel Reason */}
                {order.status === "CANCELLED" && order.cancelReason && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-xs text-muted-foreground mb-1">سبب الإلغاء</p>
                    <p className="text-sm text-red-700">{order.cancelReason}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 ml-1" />
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="w-4 h-4 ml-1" />
                    مراسلة العيادة
                  </Button>
                  {order.status === "PENDING" && (
                    <>
                      <Button size="sm" className="flex-1">
                        قبول الطلب
                      </Button>
                      <Button variant="destructive" size="sm" className="flex-1">
                        رفض
                      </Button>
                    </>
                  )}
                  {order.status === "PROCESSING" && (
                    <Button size="sm" className="flex-1">
                      <Truck className="w-4 h-4 ml-1" />
                      تأكيد الشحن
                    </Button>
                  )}
                  {order.status === "DELIVERED" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 ml-1" />
                      تحميل الفاتورة
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="bento-card">
            <CardContent className="p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">لا توجد طلبات</h3>
              <p className="text-muted-foreground">
                لم يتم العثور على طلبات مطابقة للبحث
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
