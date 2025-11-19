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
  Store,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Users,
  Box,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { MobileNav } from "@/components/shared/mobile-nav"

export default function VendorDashboard() {
  const [showProductDialog, setShowProductDialog] = useState(false)

  // Vendor Stats
  const stats = {
    totalProducts: 245,
    activeProducts: 234,
    pendingOrders: 12,
    completedOrders: 156,
    monthlyRevenue: 45000000,
    totalCustomers: 89,
    averageRating: 4.8,
    lowStockItems: 8,
  }

  // Recent Orders
  const recentOrders = [
    {
      id: "ORD-1234",
      clinicName: "عيادة الابتسامة الذكية",
      clinicCity: "بغداد",
      items: 5,
      total: 2500000,
      status: "PENDING",
      date: "2024-01-20",
      paymentStatus: "PENDING",
    },
    {
      id: "ORD-1233",
      clinicName: "عيادة د. محمد أحمد",
      clinicCity: "البصرة",
      items: 3,
      total: 1200000,
      status: "PROCESSING",
      date: "2024-01-19",
      paymentStatus: "PAID",
    },
    {
      id: "ORD-1232",
      clinicName: "مركز الأسنان المتقدم",
      clinicCity: "أربيل",
      items: 8,
      total: 3800000,
      status: "SHIPPED",
      date: "2024-01-18",
      paymentStatus: "PAID",
    },
    {
      id: "ORD-1231",
      clinicName: "عيادة النور",
      clinicCity: "النجف",
      items: 2,
      total: 850000,
      status: "DELIVERED",
      date: "2024-01-17",
      paymentStatus: "PAID",
    },
  ]

  // Top Products
  const topProducts = [
    {
      id: "1",
      name: "قفازات نتريل - 100 قطعة",
      category: "معدات طبية",
      price: 35000,
      stock: 450,
      sold: 234,
      rating: 4.9,
      image: "🧤",
    },
    {
      id: "2",
      name: "كمامات N95 - عبوة 50",
      category: "معدات طبية",
      price: 90000,
      stock: 12,
      sold: 189,
      rating: 4.7,
      image: "😷",
    },
    {
      id: "3",
      name: "حشوة مركبة A2",
      category: "مواد استهلاكية",
      price: 180000,
      stock: 78,
      sold: 156,
      rating: 4.8,
      image: "💊",
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
      case "SHIPPED": return <ShoppingCart className="w-4 h-4" />
      case "DELIVERED": return <CheckCircle className="w-4 h-4" />
      case "CANCELLED": return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">مركز الموردين</h1>
                <p className="text-sm text-muted-foreground">شركة الطب الحديث</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/vendor/profile">
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
                <p className="text-sm text-muted-foreground">المنتجات</p>
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
              <p className="text-xs text-green-600 mt-1">
                {stats.activeProducts} نشط
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">طلبات جديدة</p>
                <ShoppingCart className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.completedOrders} مكتمل
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
                من {stats.totalCustomers} عميل
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {stats.lowStockItems > 0 && (
          <Card className="bento-card border-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <div className="flex-1">
                  <p className="font-semibold">تنبيه: مخزون منخفض</p>
                  <p className="text-sm text-muted-foreground">
                    لديك {stats.lowStockItems} منتجات بحاجة إلى إعادة تخزين
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/vendor/inventory">
                    عرض التفاصيل
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/vendor/products">
            <Card className="bento-card hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">إدارة المنتجات</h3>
                <p className="text-sm text-muted-foreground">
                  إضافة وتعديل المنتجات
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/vendor/orders">
            <Card className="bento-card hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">إدارة الطلبات</h3>
                <p className="text-sm text-muted-foreground">
                  متابعة الطلبات والشحنات
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/vendor/analytics">
            <Card className="bento-card hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">التقارير والإحصائيات</h3>
                <p className="text-sm text-muted-foreground">
                  تحليل المبيعات والأداء
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Orders */}
        <Card className="bento-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>الطلبات الأخيرة</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/vendor/orders">
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
                            {order.clinicCity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          رقم الطلب: {order.id}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge variant={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="mr-1">{getStatusText(order.status)}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-center">
                        <p className="text-xs text-muted-foreground mb-1">المنتجات</p>
                        <p className="text-sm font-bold text-blue-700">{order.items}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-center">
                        <p className="text-xs text-muted-foreground mb-1">المبلغ</p>
                        <p className="text-xs font-bold text-green-700">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-center">
                        <p className="text-xs text-muted-foreground mb-1">الدفع</p>
                        <Badge
                          variant={order.paymentStatus === "PAID" ? "success" : "warning"}
                          className="text-xs"
                        >
                          {order.paymentStatus === "PAID" ? "مدفوع" : "معلق"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/vendor/orders/${order.id}`}>
                          <Eye className="w-4 h-4 ml-1" />
                          عرض
                        </Link>
                      </Button>
                      {order.status === "PENDING" && (
                        <Button size="sm" className="flex-1">
                          قبول الطلب
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bento-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
              <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة منتج
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>إضافة منتج جديد</DialogTitle>
                    <DialogDescription>
                      أدخل تفاصيل المنتج الجديد
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>اسم المنتج</Label>
                        <Input placeholder="مثال: قفازات نتريل" />
                      </div>
                      <div className="space-y-2">
                        <Label>الفئة</Label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                          <option value="">اختر الفئة</option>
                          <option value="medical">معدات طبية</option>
                          <option value="consumables">مواد استهلاكية</option>
                          <option value="tools">أدوات</option>
                          <option value="sterilization">تعقيم</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>الوصف</Label>
                      <textarea
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                        placeholder="وصف تفصيلي للمنتج..."
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>السعر</Label>
                        <Input type="number" placeholder="35000" />
                      </div>
                      <div className="space-y-2">
                        <Label>الكمية</Label>
                        <Input type="number" placeholder="100" />
                      </div>
                      <div className="space-y-2">
                        <Label>الحد الأدنى</Label>
                        <Input type="number" placeholder="20" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>صورة المنتج</Label>
                      <Input type="file" accept="image/*" />
                    </div>
                    <Button className="w-full">حفظ المنتج</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {topProducts.map((product) => (
                <Card key={product.id} className="bento-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="text-5xl text-center">{product.image}</div>
                    <div>
                      <h4 className="font-bold text-sm">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-center">
                        <p className="text-xs text-muted-foreground mb-1">السعر</p>
                        <p className="text-sm font-bold text-green-700">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                      <div className={`p-2 rounded-lg border text-center ${
                        product.stock < 20
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-blue-50 border-blue-200'
                      }`}>
                        <p className="text-xs text-muted-foreground mb-1">المخزون</p>
                        <p className={`text-sm font-bold ${
                          product.stock < 20 ? 'text-orange-700' : 'text-blue-700'
                        }`}>
                          {product.stock}
                        </p>
                      </div>
                    </div>

                    <div className="text-center pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        تم بيع {product.sold} وحدة
                      </p>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 ml-1" />
                      تعديل
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Mobile Navigation */}
      <MobileNav userRole="VENDOR" isOwner={false} />
    </div>
  )
}
