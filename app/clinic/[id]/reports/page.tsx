"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Download,
  Users,
  UserCog,
  Stethoscope,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Filter,
} from "lucide-react"

const REPORT_TYPES = [
  { value: "PATIENTS", label: "تقرير المرضى", icon: Users },
  { value: "DOCTORS", label: "تقرير الأطباء", icon: UserCog },
  { value: "TREATMENTS", label: "تقرير العلاجات", icon: Stethoscope },
  { value: "FINANCIAL", label: "تقرير مالي", icon: DollarSign },
]

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState("2024-01-01")
  const [dateTo, setDateTo] = useState("2024-01-31")
  const [selectedDoctor, setSelectedDoctor] = useState("all")

  // Sample Data
  const patientStats = {
    totalPatients: 342,
    newPatients: 45,
    returningPatients: 297,
    averageAge: 35,
    malePatients: 156,
    femalePatients: 186,
  }

  const doctorStats = [
    {
      id: "1",
      name: "د. محمد أحمد",
      patientsCount: 156,
      appointmentsCount: 234,
      revenue: 25000000,
      completedTreatments: 187,
      avgRating: 4.8,
    },
    {
      id: "2",
      name: "د. سارة علي",
      patientsCount: 89,
      appointmentsCount: 145,
      revenue: 15000000,
      completedTreatments: 112,
      avgRating: 4.9,
    },
  ]

  const treatmentStats = [
    { type: "حشوة تجميلية", count: 89, revenue: 13350000, avgDuration: 30 },
    { type: "علاج عصب", count: 34, revenue: 25500000, avgDuration: 135 },
    { type: "تاج خزفي", count: 28, revenue: 33600000, avgDuration: 90 },
    { type: "زراعة سن", count: 12, revenue: 30000000, avgDuration: 255 },
    { type: "تقويم أسنان", count: 8, revenue: 28000000, avgDuration: 720 },
    { type: "تنظيف", count: 145, revenue: 7250000, avgDuration: 30 },
    { type: "خلع", count: 67, revenue: 3350000, avgDuration: 20 },
  ]

  const monthlyTrend = [
    { month: "أكتوبر", patients: 98, revenue: 38500000, appointments: 156 },
    { month: "نوفمبر", patients: 112, revenue: 42000000, appointments: 178 },
    { month: "ديسمبر", patients: 105, revenue: 40500000, appointments: 167 },
    { month: "يناير", patients: 124, revenue: 48500000, appointments: 198 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const totalRevenue = treatmentStats.reduce((sum, t) => sum + t.revenue, 0)
  const totalTreatments = treatmentStats.reduce((sum, t) => sum + t.count, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">التقارير والإحصائيات</h2>
      </div>

      {/* Date Range & Filters */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>من تاريخ</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>إلى تاريخ</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>الطبيب</Label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              >
                <option value="all">جميع الأطباء</option>
                <option value="1">د. محمد أحمد</option>
                <option value="2">د. سارة علي</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Button variant="outline" className="flex-1">
                <Filter className="w-4 h-4 ml-2" />
                تطبيق
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 ml-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="patients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {REPORT_TYPES.map((type) => {
            const Icon = type.icon
            return (
              <TabsTrigger key={type.value} value={type.value.toLowerCase()}>
                <Icon className="w-4 h-4 ml-2" />
                {type.label}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {/* Patients Report */}
        <TabsContent value="patients" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">تقرير المرضى الشامل</h3>
            <Button variant="outline">
              <Download className="w-4 h-4 ml-2" />
              تصدير PDF
            </Button>
          </div>

          {/* Patient Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bento-card">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-3xl font-bold">{patientStats.totalPatients}</p>
                <p className="text-sm text-muted-foreground">إجمالي المرضى</p>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-3xl font-bold">{patientStats.newPatients}</p>
                <p className="text-sm text-muted-foreground">مرضى جدد</p>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-3xl font-bold">{patientStats.returningPatients}</p>
                <p className="text-sm text-muted-foreground">مرضى عائدون</p>
              </CardContent>
            </Card>
          </div>

          {/* Demographics */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>التركيبة الديموغرافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Age */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">متوسط العمر</span>
                  <span className="text-xl font-bold text-blue-600">{patientStats.averageAge} سنة</span>
                </div>
              </div>

              {/* Gender */}
              <div>
                <h4 className="text-sm font-medium mb-3">توزيع الجنس</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">ذكور</span>
                      <span className="text-sm font-bold">{patientStats.malePatients} ({((patientStats.malePatients / patientStats.totalPatients) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        style={{ width: `${(patientStats.malePatients / patientStats.totalPatients) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">إناث</span>
                      <span className="text-sm font-bold">{patientStats.femalePatients} ({((patientStats.femalePatients / patientStats.totalPatients) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-pink-600"
                        style={{ width: `${(patientStats.femalePatients / patientStats.totalPatients) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>الاتجاه الشهري للمرضى</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrend.map((month) => (
                  <div key={month.month} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{month.month}</span>
                      <span className="font-bold text-blue-600">{month.patients} مريض</span>
                    </div>
                    <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-end px-2"
                        style={{ width: `${(month.patients / Math.max(...monthlyTrend.map(m => m.patients))) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {month.appointments} جلسة
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Doctors Report */}
        <TabsContent value="doctors" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">تقرير أداء الأطباء</h3>
            <Button variant="outline">
              <Download className="w-4 h-4 ml-2" />
              تصدير Excel
            </Button>
          </div>

          <div className="grid gap-4">
            {doctorStats.map((doctor) => (
              <Card key={doctor.id} className="bento-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{doctor.name}</CardTitle>
                    <Badge variant="success">
                      ★ {doctor.avgRating}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                      <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                      <p className="text-xl font-bold text-blue-700">{doctor.patientsCount}</p>
                      <p className="text-xs text-muted-foreground">مريض</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-center">
                      <Calendar className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                      <p className="text-xl font-bold text-purple-700">{doctor.appointmentsCount}</p>
                      <p className="text-xs text-muted-foreground">جلسة</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                      <Stethoscope className="w-5 h-5 mx-auto mb-1 text-green-600" />
                      <p className="text-xl font-bold text-green-700">{doctor.completedTreatments}</p>
                      <p className="text-xs text-muted-foreground">علاج مكتمل</p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-center">
                      <DollarSign className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                      <p className="text-lg font-bold text-orange-700">{formatCurrency(doctor.revenue)}</p>
                      <p className="text-xs text-muted-foreground">الإيرادات</p>
                    </div>
                  </div>

                  {/* Performance Indicators */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">متوسط الجلسات لكل مريض</p>
                      <p className="text-lg font-bold">
                        {(doctor.appointmentsCount / doctor.patientsCount).toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">متوسط الإيراد لكل جلسة</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(Math.round(doctor.revenue / doctor.appointmentsCount))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Treatments Report */}
        <TabsContent value="treatments" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">تقرير العلاجات</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 ml-2" />
                رسم بياني
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 ml-2" />
                تصدير
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bento-card">
              <CardContent className="p-4 text-center">
                <Stethoscope className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-3xl font-bold">{totalTreatments}</p>
                <p className="text-sm text-muted-foreground">إجمالي العلاجات</p>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
                <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-3xl font-bold">{formatCurrency(Math.round(totalRevenue / totalTreatments))}</p>
                <p className="text-sm text-muted-foreground">متوسط قيمة العلاج</p>
              </CardContent>
            </Card>
          </div>

          {/* Treatment Breakdown */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>تفصيل العلاجات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treatmentStats
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((treatment, index) => {
                    const percentage = (treatment.revenue / totalRevenue) * 100
                    const countPercentage = (treatment.count / totalTreatments) * 100

                    return (
                      <div key={treatment.type} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                            <span className="font-medium">{treatment.type}</span>
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-green-600">{formatCurrency(treatment.revenue)}</p>
                            <p className="text-xs text-muted-foreground">{treatment.count} علاج ({countPercentage.toFixed(1)}%)</p>
                          </div>
                        </div>
                        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="absolute h-full bg-gradient-to-r from-green-500 to-green-600"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{percentage.toFixed(1)}% من إجمالي الإيرادات</span>
                          <span>متوسط المدة: {treatment.avgDuration} دقيقة</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Report */}
        <TabsContent value="financial" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">التقرير المالي الشامل</h3>
            <Button variant="outline">
              <Download className="w-4 h-4 ml-2" />
              تصدير PDF
            </Button>
          </div>

          {/* Revenue vs Expenses */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>الإيرادات مقابل المصروفات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrend.map((month) => {
                  const expenses = month.revenue * 0.65 // Simulated expenses
                  const profit = month.revenue - expenses
                  const profitMargin = (profit / month.revenue) * 100

                  return (
                    <div key={month.month} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{month.month}</span>
                        <div className="text-left">
                          <p className="font-bold text-blue-600">{formatCurrency(profit)}</p>
                          <p className="text-xs text-muted-foreground">هامش ربح {profitMargin.toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="relative h-6 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="absolute h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end px-2"
                            style={{ width: `${(month.revenue / Math.max(...monthlyTrend.map(m => m.revenue))) * 100}%` }}
                          >
                            <span className="text-xs text-white font-medium">
                              إيرادات: {formatCurrency(month.revenue)}
                            </span>
                          </div>
                        </div>
                        <div className="relative h-6 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="absolute h-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-end px-2"
                            style={{ width: `${(expenses / Math.max(...monthlyTrend.map(m => m.revenue))) * 100}%` }}
                          >
                            <span className="text-xs text-white font-medium">
                              مصروفات: {formatCurrency(expenses)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Key Financial Metrics */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bento-card">
              <CardHeader>
                <CardTitle className="text-base">نمو الإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-12 h-12 text-green-600" />
                  <div>
                    <p className="text-3xl font-bold text-green-600">+15.5%</p>
                    <p className="text-sm text-muted-foreground">مقارنة بالشهر السابق</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bento-card">
              <CardHeader>
                <CardTitle className="text-base">متوسط الإيراد اليومي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <DollarSign className="w-12 h-12 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(Math.round(monthlyTrend[monthlyTrend.length - 1].revenue / 30))}
                    </p>
                    <p className="text-sm text-muted-foreground">للشهر الحالي</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
