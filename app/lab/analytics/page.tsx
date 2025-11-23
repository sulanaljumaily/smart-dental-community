"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Clock,
  CheckCircle,
  Calendar,
  Download,
  Filter,
  Star,
  Activity,
} from "lucide-react"

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Overview Stats
  const stats = {
    revenue: {
      current: 32000000,
      previous: 28500000,
      growth: 12.3,
    },
    orders: {
      current: 234,
      previous: 198,
      growth: 18.2,
    },
    clients: {
      current: 45,
      previous: 42,
      growth: 7.1,
    },
    avgOrderValue: {
      current: 136752,
      previous: 143939,
      growth: -5.0,
    },
  }

  // Monthly Revenue Data
  const monthlyRevenue = [
    { month: "يناير", revenue: 28000000, orders: 198 },
    { month: "فبراير", revenue: 30500000, orders: 215 },
    { month: "مارس", revenue: 29000000, orders: 203 },
    { month: "أبريل", revenue: 31500000, orders: 221 },
    { month: "مايو", revenue: 33000000, orders: 228 },
    { month: "يونيو", revenue: 32000000, orders: 234 },
  ]

  // Top Services
  const topServices = [
    {
      name: "تيجان زركونيا",
      orders: 89,
      revenue: 10680000,
      avgPrice: 120000,
      growth: 15.2,
    },
    {
      name: "جسور بورسلين",
      orders: 67,
      revenue: 24120000,
      avgPrice: 360000,
      growth: 22.5,
    },
    {
      name: "أطقم الأسنان",
      orders: 45,
      revenue: 8100000,
      avgPrice: 180000,
      growth: 8.3,
    },
    {
      name: "عدسات لومينير",
      orders: 33,
      revenue: 5940000,
      avgPrice: 180000,
      growth: -3.2,
    },
  ]

  // Top Clients
  const topClients = [
    {
      name: "عيادة الابتسامة الذكية",
      city: "بغداد",
      orders: 34,
      revenue: 4080000,
      avgRating: 4.9,
    },
    {
      name: "مركز الأسنان المتقدم",
      city: "أربيل",
      orders: 28,
      revenue: 5040000,
      avgRating: 4.8,
    },
    {
      name: "عيادة د. محمد أحمد",
      city: "البصرة",
      orders: 25,
      revenue: 3000000,
      avgRating: 4.7,
    },
    {
      name: "عيادة النور",
      city: "النجف",
      orders: 22,
      revenue: 2640000,
      avgRating: 4.9,
    },
    {
      name: "مركز الأسنان الذهبي",
      city: "الموصل",
      orders: 19,
      revenue: 3420000,
      avgRating: 4.6,
    },
  ]

  // Performance Metrics
  const performanceMetrics = {
    avgCompletionTime: "3.2",
    onTimeDelivery: 94.5,
    customerSatisfaction: 4.8,
    repeatCustomerRate: 78.5,
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
            تحليل الأداء والإيرادات
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
              <Package className="w-5 h-5 text-blue-600" />
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
            <p className="text-2xl font-bold text-purple-600">{stats.clients.current}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                مقارنة بـ {stats.clients.previous}
              </p>
              {formatGrowth(stats.clients.growth)}
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
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">
                {performanceMetrics.avgCompletionTime} يوم
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                متوسط وقت الإنجاز
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-700">
                {performanceMetrics.onTimeDelivery}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                التسليم في الوقت المحدد
              </p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <p className="text-2xl font-bold text-yellow-700">
                {performanceMetrics.customerSatisfaction}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                رضا العملاء
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-700">
                {performanceMetrics.repeatCustomerRate}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                عملاء متكررون
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Services */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              الخدمات الأكثر طلباً
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topServices.map((service, index) => (
                <Card key={index} className="bento-card">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <h4 className="font-bold text-sm">{service.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {service.orders} طلب
                        </p>
                      </div>
                      {formatGrowth(service.growth)}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-muted-foreground mb-1">الإيرادات</p>
                        <p className="font-bold text-green-700 text-xs">
                          {formatCurrency(service.revenue)}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-muted-foreground mb-1">متوسط السعر</p>
                        <p className="font-bold text-blue-700 text-xs">
                          {formatCurrency(service.avgPrice)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              أفضل العملاء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topClients.map((client, index) => (
                <Card key={index} className="bento-card">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <h4 className="font-bold text-sm">{client.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {client.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        <span className="text-sm font-bold">{client.avgRating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-muted-foreground mb-1">الطلبات</p>
                        <p className="font-bold text-blue-700">{client.orders}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-muted-foreground mb-1">الإيرادات</p>
                        <p className="font-bold text-green-700 text-xs">
                          {formatCurrency(client.revenue)}
                        </p>
                      </div>
                    </div>
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
