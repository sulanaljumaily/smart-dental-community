"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/shared/stat-card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Package,
  AlertCircle,
  Clock,
  UserCheck,
  FileText,
  Briefcase,
  UserCog,
  Settings,
  BarChart3,
  ClipboardList,
  ArrowRight,
} from "lucide-react"

export default function ClinicOverviewPage() {
  const params = useParams()
  const clinicId = params.id as string
  // بيانات تجريبية
  const stats = {
    revenue: {
      today: 2500000,
      month: 25000000,
      trend: 12,
    },
    expenses: {
      month: 8000000,
      trend: -5,
    },
    patients: {
      total: 156,
      today: 12,
      trend: 8,
    },
    appointments: {
      today: 12,
      completed: 7,
      pending: 5,
    },
  }

  const inventoryAlerts = [
    { id: 1, item: "قفازات طبية", quantity: 15, minQuantity: 50, urgency: "high" },
    { id: 2, item: "كمامات N95", quantity: 25, minQuantity: 100, urgency: "medium" },
    { id: 3, item: "حشوات مركبة", quantity: 8, minQuantity: 20, urgency: "high" },
  ]

  const todayTasks = [
    { id: 1, text: "متابعة المريض أحمد علي بعد الزراعة", time: "10:00 ص" },
    { id: 2, text: "استلام طلب المختبر من معمل الدقة", time: "02:00 م" },
    { id: 3, text: "جرد المخزون الأسبوعي", time: "05:00 م" },
  ]

  const doctorsPerformance = [
    { id: 1, name: "د. محمد أحمد", patients: 45, revenue: 12000000 },
    { id: 2, name: "د. سارة علي", patients: 38, revenue: 9500000 },
    { id: 3, name: "د. خالد حسن", patients: 31, revenue: 7200000 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  // Quick access sections
  const quickAccess = [
    { title: "المرضى", icon: Users, href: `/clinic/${clinicId}/patients`, color: "from-blue-500 to-blue-700", count: stats.patients.total },
    { title: "المواعيد", icon: Calendar, href: `/clinic/${clinicId}/appointments`, color: "from-green-500 to-green-700", count: stats.appointments.today },
    { title: "الخطط العلاجية", icon: ClipboardList, href: `/clinic/${clinicId}/treatment-plans`, color: "from-purple-500 to-purple-700" },
    { title: "المالية", icon: DollarSign, href: `/clinic/${clinicId}/finance`, color: "from-orange-500 to-orange-700" },
    { title: "المخزون", icon: Package, href: `/clinic/${clinicId}/assets`, color: "from-pink-500 to-pink-700" },
    { title: "المختبر", icon: Briefcase, href: `/clinic/${clinicId}/lab`, color: "from-teal-500 to-teal-700" },
    { title: "الطاقم", icon: UserCog, href: `/clinic/${clinicId}/staff`, color: "from-indigo-500 to-indigo-700" },
    { title: "الإعدادات", icon: Settings, href: `/clinic/${clinicId}/settings`, color: "from-gray-500 to-gray-700" },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Access Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">الوصول السريع</h2>
        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
          {quickAccess.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Card className="bento-card hover:shadow-xl transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      {item.count !== undefined && (
                        <p className="text-sm text-muted-foreground">
                          {item.count}
                        </p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full group-hover:bg-accent">
                      فتح
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Financial Stats */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">الإحصائيات المالية</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/clinic/${clinicId}/finance`}>
              عرض التفاصيل
              <ArrowRight className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="إيرادات اليوم"
            value={formatCurrency(stats.revenue.today)}
            icon={DollarSign}
            color="green"
          />
          <StatCard
            title="إيرادات الشهر"
            value={formatCurrency(stats.revenue.month)}
            icon={TrendingUp}
            color="blue"
            trend={{ value: stats.revenue.trend, isPositive: true }}
          />
          <StatCard
            title="مصروفات الشهر"
            value={formatCurrency(stats.expenses.month)}
            icon={TrendingDown}
            color="red"
            trend={{ value: Math.abs(stats.expenses.trend), isPositive: true }}
          />
          <StatCard
            title="صافي الربح"
            value={formatCurrency(stats.revenue.month - stats.expenses.month)}
            icon={DollarSign}
            color="purple"
          />
        </div>
      </section>

      {/* Activity Stats */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">نشاط العيادة</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="إجمالي المرضى"
            value={stats.patients.total}
            icon={Users}
            color="blue"
            trend={{ value: stats.patients.trend, isPositive: true }}
          />
          <StatCard
            title="مرضى اليوم"
            value={stats.patients.today}
            icon={UserCheck}
            color="green"
          />
          <StatCard
            title="مواعيد اليوم"
            value={`${stats.appointments.completed}/${stats.appointments.today}`}
            icon={Calendar}
            color="purple"
          />
        </div>
      </section>

      {/* Inventory Alerts & Today's Tasks */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inventory Alerts */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-600" />
              تنبيهات المخزون
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {inventoryAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200"
              >
                <AlertCircle className={cn(
                  "w-5 h-5 mt-0.5 flex-shrink-0",
                  alert.urgency === "high" ? "text-red-600" : "text-orange-600"
                )} />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{alert.item}</p>
                      <p className="text-xs text-muted-foreground">
                        متبقي: {alert.quantity} • المطلوب: {alert.minQuantity}
                      </p>
                    </div>
                    <Badge variant={alert.urgency === "high" ? "destructive" : "warning"}>
                      {alert.urgency === "high" ? "عاجل" : "متوسط"}
                    </Badge>
                  </div>
                  <Progress
                    value={(alert.quantity / alert.minQuantity) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            ))}
            {inventoryAlerts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>لا توجد تنبيهات للمخزون</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              مهام وتذكيرات اليوم
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded border-2 border-primary mt-0.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{task.text}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Doctors Performance */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle>أداء الأطباء - هذا الشهر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctorsPerformance.map((doctor, index) => (
              <div key={doctor.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doctor.patients} مريض
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(doctor.revenue)}
                    </p>
                    <p className="text-xs text-muted-foreground">إجمالي الإيرادات</p>
                  </div>
                </div>
                {index < doctorsPerformance.length - 1 && (
                  <div className="border-t" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
