"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Store,
  Package,
  TrendingUp,
  DollarSign,
  Star,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Ban,
  MessageSquare,
  Tag,
  Trophy,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ShoppingCart,
  Users,
  Eye,
  Clock,
} from "lucide-react"

export default function MarketplaceManagementPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // نظرة عامة
  const stats = {
    totalVendors: 56,
    activeVendors: 48,
    pendingVendors: 5,
    suspendedVendors: 3,
    totalProducts: 2845,
    totalOrders: 1234,
    monthlyRevenue: 450000000,
    platformRevenue: 45000000,
  }

  // الموردين بانتظار الموافقة
  const pendingVendors = [
    {
      id: "VND-001",
      companyName: "شركة الطب الحديث للتوريدات",
      ownerName: "علي حسن",
      city: "بغداد",
      phone: "+964 770 123 4567",
      email: "ali@modern-medical.iq",
      requestDate: "2024-01-20",
      category: "معدات طبية",
      status: "pending_approval",
      documentsComplete: true,
      businessLicense: true,
      taxCertificate: true,
    },
    {
      id: "VND-002",
      companyName: "مؤسسة الدقة للمستلزمات الطبية",
      ownerName: "فاطمة محمد",
      city: "النجف",
      phone: "+964 771 234 5678",
      email: "info@precision-med.iq",
      requestDate: "2024-01-19",
      category: "مواد استهلاكية",
      status: "pending_approval",
      documentsComplete: true,
      businessLicense: true,
      taxCertificate: true,
    },
  ]

  // الموردين النشطين
  const activeVendors = [
    {
      id: "1",
      companyName: "شركة الأمل الطبية",
      ownerName: "محمد أحمد",
      city: "بغداد",
      rating: 4.8,
      totalOrders: 342,
      totalRevenue: 125000000,
      platformCommission: 12500000,
      productsCount: 145,
      complaints: 2,
      status: "active",
    },
    {
      id: "2",
      companyName: "مؤسسة التميز للمستلزمات",
      ownerName: "سارة علي",
      city: "البصرة",
      rating: 4.6,
      totalOrders: 287,
      totalRevenue: 98000000,
      platformCommission: 9800000,
      productsCount: 123,
      complaints: 1,
      status: "active",
    },
    {
      id: "3",
      companyName: "شركة الرائد الطبي",
      ownerName: "خالد حسن",
      city: "أربيل",
      rating: 4.9,
      totalOrders: 412,
      totalRevenue: 156000000,
      platformCommission: 15600000,
      productsCount: 178,
      complaints: 0,
      status: "active",
    },
  ]

  // منتجات مميزة للترويج
  const featuredProducts = [
    {
      id: "1",
      name: "قفازات نتريل - 100 قطعة",
      vendor: "شركة الأمل الطبية",
      price: 35000,
      sold: 342,
      rating: 4.9,
      isFeatured: true,
    },
    {
      id: "2",
      name: "كمامات N95 - عبوة 50",
      vendor: "مؤسسة التميز",
      price: 90000,
      sold: 256,
      rating: 4.7,
      isFeatured: true,
    },
  ]

  // وسوم وشارات للموردين
  const vendorBadges = [
    { id: "1", name: "موثوق", type: "verified", color: "blue" },
    { id: "2", name: "الأفضل مبيعاً", type: "bestseller", color: "orange" },
    { id: "3", name: "جودة عالية", type: "quality", color: "green" },
    { id: "4", name: "توصيل سريع", type: "fast", color: "purple" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getCommissionRate = (revenue: number) => {
    return 10 // نسبة ثابتة 10%
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">إدارة المتجر والموردين</h1>
        <p className="text-muted-foreground">إدارة الموردين والمنتجات والطلبات</p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي الموردين</p>
              <Store className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalVendors}</p>
            <p className="text-xs text-green-600 mt-1">
              {stats.activeVendors} نشط
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">بانتظار الموافقة</p>
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{stats.pendingVendors}</p>
            <p className="text-xs text-muted-foreground mt-1">
              طلب جديد
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p className="text-xs text-muted-foreground mt-1">
              منتج متاح
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">أرباح المنصة</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(stats.platformRevenue)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              هذا الشهر
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs System */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="pending">
            قائمة الانتظار
            <Badge variant="destructive" className="mr-1 text-xs">{stats.pendingVendors}</Badge>
          </TabsTrigger>
          <TabsTrigger value="vendors">الموردين</TabsTrigger>
          <TabsTrigger value="featured">الترويج</TabsTrigger>
          <TabsTrigger value="badges">الوسوم والشارات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-4">
          <h2 className="text-2xl font-bold">نظرة عامة على المتجر</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">إجمالي الطلبات</p>
                    <p className="text-3xl font-bold">{stats.totalOrders}</p>
                  </div>
                  <ShoppingCart className="w-10 h-10 text-blue-600" />
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground">نمو شهري</p>
                  <p className="text-sm font-bold text-green-600">+12%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">إيرادات المتجر</p>
                    <p className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-600" />
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground">هذا الشهر</p>
                  <p className="text-sm font-bold text-green-600">+18%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">متوسط التقييم</p>
                    <p className="text-3xl font-bold">4.7</p>
                  </div>
                  <Star className="w-10 h-10 text-yellow-600 fill-yellow-600" />
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground">من جميع الموردين</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* قائمة انتظار الموردين */}
        <TabsContent value="pending" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">قائمة انتظار الموردين</h2>
            <Badge variant="destructive" className="text-sm">
              {pendingVendors.length} طلب بانتظار المراجعة
            </Badge>
          </div>

          <div className="space-y-4">
            {pendingVendors.map((vendor) => (
              <Card key={vendor.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl">{vendor.companyName}</h3>
                        <Badge variant="outline">{vendor.category}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{vendor.ownerName}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{vendor.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span dir="ltr">{vendor.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span>{vendor.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{vendor.requestDate}</span>
                        </div>
                      </div>
                    </div>
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">رخصة تجارية</p>
                        <p className="text-sm font-semibold text-green-700">
                          {vendor.businessLicense ? "مكتمل" : "ناقص"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">شهادة ضريبية</p>
                        <p className="text-sm font-semibold text-green-700">
                          {vendor.taxCertificate ? "مكتمل" : "ناقص"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle2 className="w-4 h-4 ml-1" />
                      قبول وتفعيل
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <XCircle className="w-4 h-4 ml-1" />
                      رفض
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 ml-1" />
                      عرض المستندات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* الموردين النشطين */}
        <TabsContent value="vendors" className="space-y-4">
          <h2 className="text-2xl font-bold">الموردين النشطين</h2>

          <div className="space-y-3">
            {activeVendors.map((vendor) => (
              <Card key={vendor.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{vendor.companyName}</h3>
                        <Badge variant="success">نشط</Badge>
                        {vendor.complaints > 0 && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {vendor.complaints} شكوى
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{vendor.ownerName} • {vendor.city}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{vendor.rating}</span>
                        <span className="text-xs text-muted-foreground">({vendor.totalOrders} طلب)</span>
                      </div>
                    </div>
                    <Store className="w-8 h-8 text-blue-600" />
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">المنتجات</p>
                      <p className="text-lg font-bold text-blue-700">{vendor.productsCount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">الإيرادات</p>
                      <p className="text-sm font-bold text-green-700">{formatCurrency(vendor.totalRevenue)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">عمولة المنصة</p>
                      <p className="text-sm font-bold text-purple-700">{formatCurrency(vendor.platformCommission)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">نسبة العمولة</p>
                      <p className="text-lg font-bold text-orange-700">{getCommissionRate(vendor.totalRevenue)}%</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 ml-1" />
                      مراسلة
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Ban className="w-4 h-4 ml-1" />
                      إيقاف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* الترويج والتخفيضات */}
        <TabsContent value="featured" className="space-y-4">
          <h2 className="text-2xl font-bold">الترويج والمنتجات المميزة</h2>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>إضافة منتج مميز</CardTitle>
              <CardDescription>اختر المنتجات التي تريد عرضها في الصفحة الرئيسية</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <Tag className="w-4 h-4 ml-2" />
                إضافة منتج للترويج
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.vendor}</p>
                    </div>
                    <Badge variant="default" className="bg-orange-600">
                      مميز
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">السعر</p>
                      <p className="font-bold text-green-600">{formatCurrency(product.price)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">المبيعات</p>
                      <p className="font-bold text-blue-600">{product.sold}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">التقييم</p>
                      <p className="font-bold text-yellow-600">⭐ {product.rating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* الوسوم والشارات */}
        <TabsContent value="badges" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">الوسوم والشارات للموردين</h2>
            <Button>
              <Trophy className="w-4 h-4 ml-2" />
              إضافة شارة جديدة
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {vendorBadges.map((badge) => (
              <Card key={badge.id} className="bento-card">
                <CardContent className="p-6 text-center">
                  <Trophy className={`w-12 h-12 mx-auto mb-3 text-${badge.color}-600`} />
                  <h3 className="font-bold mb-1">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground">{badge.type}</p>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    تعيين للمورد
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* التقارير */}
        <TabsContent value="reports" className="space-y-4">
          <h2 className="text-2xl font-bold">التقارير والإحصائيات</h2>
          <Card className="bento-card">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                تقارير تفصيلية عن أداء المتجر والموردين
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
