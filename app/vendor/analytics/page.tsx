"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Star,
  Download,
  Filter,
  Activity,
  Percent,
} from "lucide-react"

export default function VendorAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Overview Stats
  const stats = {
    revenue: {
      current: 45000000,
      previous: 38500000,
      growth: 16.9,
    },
    orders: {
      current: 168,
      previous: 142,
      growth: 18.3,
    },
    customers: {
      current: 89,
      previous: 76,
      growth: 17.1,
    },
    avgOrderValue: {
      current: 267857,
      previous: 271127,
      growth: -1.2,
    },
  }

  // Monthly Revenue Data
  const monthlyRevenue = [
    { month: "يناير", revenue: 38000000, orders: 142 },
    { month: "فبراير", revenue: 41500000, orders: 151 },
    { month: "مارس", revenue: 39000000, orders: 145 },
    { month: "أبريل", revenue: 42500000, orders: 156 },
    { month: "مايو", revenue: 43000000, orders: 162 },
    { month: "يونيو", revenue: 45000000, orders: 168 },
  ]

  // Top Products
  const topProducts = [
    {
      name: "قفازات نتريل - 100 قطعة",
      category: "معدات طبية",
      unitsSold: 234,
      revenue: 8190000,
      avgPrice: 35000,
      growth: 22.5,
      stock: 450,
    },
    {
      name: "كمامات N95 - عبوة 50",
      category: "معدات طبية",
      unitsSold: 189,
      revenue: 17010000,
      avgPrice: 90000,
      growth: 18.3,
      stock: 12,
    },
    {
      name: "حشوة مركبة A2",
      category: "مواد استهلاكية",
      unitsSold: 156,
      revenue: 28080000,
      avgPrice: 180000,
      growth: 15.7,
      stock: 78,
    },
    {
      name: "محلول تعقيم - 5 لتر",
      category: "تعقيم",
      unitsSold: 145,
      revenue: 13775000,
      avgPrice: 95000,
      growth: 12.1,
      stock: 34,
    },
  ]

  // Top Customers
  const topCustomers = [
    {
      name: "عيادة الابتسامة الذكية",
      city: "بغداد",
      orders: 24,
      revenue: 6480000,
      avgOrderValue: 270000,
      lastOrder: "2024-01-20",
    },
    {
      name: "مركز الأسنان المتقدم",
      city: "أربيل",
      orders: 19,
      revenue: 5130000,
      avgOrderValue: 270000,
      lastOrder: "2024-01-19",
    },
    {
      name: "عيادة د. محمد أحمد",
      city: "البصرة",
      orders: 17,
      revenue: 4420000,
      avgOrderValue: 260000,
      lastOrder: "2024-01-18",
    },
    {
      name: "عيادة النور",
      city: "النجف",
      orders: 15,
      revenue: 3750000,
      avgOrderValue: 250000,
      lastOrder: "2024-01-17",
    },
    {
      name: "مركز الأسنان الذهبي",
      city: "الموصل",
      orders: 13,
      revenue: 3510000,
      avgOrderValue: 270000,
      lastOrder: "2024-01-16",
    },
  ]

  // Category Performance
  const categoryPerformance = [
    {
      name: "معدات طبية",
      revenue: 18500000,
      orders: 89,
      growth: 24.5,
      percentage: 41.1,
    },
    {
      name: "مواد استهلاكية",
      revenue: 15800000,
      orders: 56,
      growth: 18.2,
      percentage: 35.1,
    },
    {
      name: "أدوات طبية",
      revenue: 6200000,
      orders: 28,
      growth: 12.5,
      percentage: 13.8,
    },
    {
      name: "تعقيم",
      revenue: 4500000,
      orders: 23,
      growth: 8.3,
      percentage: 10.0,
    },
  ]

  // Performance Metrics
  const performanceMetrics = {
    fulfillmentRate: 96.5,
    avgDeliveryTime: "2.8",
    customerRetention: 82.5,
    productReturnRate: 1.2,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const formatGrowth = (growth: number) => {
    const isPositive = growth >= 0
    return (
      <span className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {Math.abs(growth)}%
      </span>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">التقارير والإحصائيات</h1>
          <p className="text-muted-foreground mt-1">
            تحليل المبيعات والأداء
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            تصفية
          </Button>
          <Button>
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        <Button
          variant={selectedPeriod === "week" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPeriod("week")}
        >
          أسبوع
        </Button>
        <Button
          variant={selectedPeriod === "month" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPeriod("month")}
        >
          شهر
        </Button>
        <Button
          variant={selectedPeriod === "quarter" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPeriod("quarter")}
        >
          ربع سنة
        </Button>
        <Button
          variant={selectedPeriod === "year" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPeriod("year")}
        >
          سنة
        </Button>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">الإيرادات</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(stats.revenue.current)}
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                مقارنة بـ {formatCurrency(stats.revenue.previous)}
              </p>
              {formatGrowth(stats.revenue.growth)}
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">الطلبات</p>
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.orders.current}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                مقارنة بـ {stats.orders.previous}
              </p>
              {formatGrowth(stats.orders.growth)}
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">العملاء</p>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.customers.current}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                مقارنة بـ {stats.customers.previous}
              </p>
              {formatGrowth(stats.customers.growth)}
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">متوسط الطلب</p>
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-lg font-bold text-orange-600">
              {formatCurrency(stats.avgOrderValue.current)}
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                مقارنة بـ {formatCurrency(stats.avgOrderValue.previous)}
              </p>
              {formatGrowth(stats.avgOrderValue.growth)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            الإيرادات الشهرية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyRevenue.map((data, index) => {
              const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))
              const percentage = (data.revenue / maxRevenue) * 100

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{data.orders} طلب</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(data.revenue)}
                      </span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            مؤشرات الأداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-700">
                {performanceMetrics.fulfillmentRate}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                معدل تنفيذ الطلبات
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">
                {performanceMetrics.avgDeliveryTime} يوم
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                متوسط وقت التسليم
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-700">
                {performanceMetrics.customerRetention}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                الاحتفاظ بالعملاء
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 text-center">
              <Percent className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-700">
                {performanceMetrics.productReturnRate}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                معدل الإرجاع
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            أداء الفئات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryPerformance.map((category, index) => (
              <Card key={index} className="bento-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold">{category.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {category.percentage}%
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {category.orders} طلب
                      </p>
                    </div>
                    {formatGrowth(category.growth)}
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">حصة المبيعات</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(category.revenue)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Products */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              المنتجات الأكثر مبيعاً
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <Card key={index} className="bento-card">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <h4 className="font-bold text-sm">{product.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {product.category}
                        </p>
                      </div>
                      {formatGrowth(product.growth)}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-muted-foreground mb-1">المبيعات</p>
                        <p className="font-bold text-blue-700">{product.unitsSold}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-muted-foreground mb-1">الإيرادات</p>
                        <p className="font-bold text-green-700 text-xs">
                          {formatCurrency(product.revenue)}
                        </p>
                      </div>
                      <div className={`p-2 rounded-lg border ${
                        product.stock < 20
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-purple-50 border-purple-200'
                      }`}>
                        <p className="text-muted-foreground mb-1">المخزون</p>
                        <p className={`font-bold ${
                          product.stock < 20 ? 'text-orange-700' : 'text-purple-700'
                        }`}>
                          {product.stock}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              أفضل العملاء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCustomers.map((customer, index) => (
                <Card key={index} className="bento-card">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <h4 className="font-bold text-sm">{customer.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {customer.city}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-muted-foreground mb-1">الطلبات</p>
                        <p className="font-bold text-blue-700">{customer.orders}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-muted-foreground mb-1">الإيرادات</p>
                        <p className="font-bold text-green-700 text-xs">
                          {formatCurrency(customer.revenue)}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                        <p className="text-muted-foreground mb-1">المتوسط</p>
                        <p className="font-bold text-purple-700 text-xs">
                          {formatCurrency(customer.avgOrderValue)}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      آخر طلب: {customer.lastOrder}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
