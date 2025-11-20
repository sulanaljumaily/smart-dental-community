"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/shared/stat-card"
import {
  Building2,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  Crown,
  ArrowUpRight,
  Activity,
  DollarSign,
  UserCheck,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function DentistOverviewPage() {
  // بيانات تجريبية - سيتم استبدالها بـ API
  const stats = {
    totalClinics: 3,
    activeClinics: 2,
    totalPatients: 247,
    todayAppointments: 12,
    completedToday: 8,
    monthlyRevenue: 45000000, // IQD
    weeklyGrowth: 12,
    totalStaff: 8,
  }

  const clinicsQuickView = [
    {
      id: "1",
      name: "عيادة النجوم",
      patients: 156,
      todayAppointments: 8,
      completedToday: 5,
      staff: 5,
      revenue: 25000000,
      status: "active",
      alerts: 1,
    },
    {
      id: "2",
      name: "مركز الابتسامة",
      patients: 91,
      todayAppointments: 4,
      completedToday: 3,
      staff: 3,
      revenue: 15000000,
      status: "active",
      alerts: 0,
    },
    {
      id: "3",
      name: "عيادة الأمل",
      patients: 0,
      todayAppointments: 0,
      completedToday: 0,
      staff: 0,
      revenue: 0,
      status: "inactive",
      alerts: 0,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "appointment",
      text: "موعد جديد مع المريض أحمد علي",
      time: "منذ 5 دقائق",
      clinic: "عيادة النجوم",
    },
    {
      id: 2,
      type: "treatment",
      text: "تم إكمال علاج زراعة للمريضة سارة",
      time: "منذ 30 دقيقة",
      clinic: "مركز الابتسامة",
    },
    {
      id: 3,
      type: "lab",
      text: "طلب مختبر جديد من معمل الدقة",
      time: "منذ ساعة",
      clinic: "عيادة النجوم",
    },
    {
      id: 4,
      type: "alert",
      text: "تنبيه: نقص في مخزون القفازات",
      time: "منذ ساعتين",
      clinic: "عيادة النجوم",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "متابعة حالة المريض خالد",
      priority: "high",
      dueDate: "اليوم",
      clinic: "عيادة النجوم",
    },
    {
      id: 2,
      title: "مراجعة أشعة المريضة فاطمة",
      priority: "high",
      dueDate: "اليوم",
      clinic: "عيادة النجوم",
    },
    {
      id: 3,
      title: "طلب مواد من المتجر",
      priority: "medium",
      dueDate: "غداً",
      clinic: "مركز الابتسامة",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "appointment": return Calendar
      case "treatment": return CheckCircle2
      case "lab": return Activity
      case "alert": return AlertTriangle
      default: return Activity
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "appointment": return "text-blue-500"
      case "treatment": return "text-green-500"
      case "lab": return "text-purple-500"
      case "alert": return "text-orange-500"
      default: return "text-gray-500"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">نظرة عامة</h1>
          <p className="text-muted-foreground">إحصائيات شاملة من جميع عياداتك</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
            د.س
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="عدد العيادات"
          value={`${stats.activeClinics}/${stats.totalClinics}`}
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="إجمالي المرضى"
          value={stats.totalPatients}
          icon={Users}
          color="green"
          trend={{ value: stats.weeklyGrowth, isPositive: true }}
        />
        <StatCard
          title="مواعيد اليوم"
          value={`${stats.completedToday}/${stats.todayAppointments}`}
          icon={Calendar}
          color="purple"
        />
        <StatCard
          title="الإيرادات الشهرية"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={TrendingUp}
          color="orange"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الطاقم الإجمالي</p>
                <p className="text-2xl font-bold">{stats.totalStaff}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">المعاملات اليوم</p>
                <p className="text-2xl font-bold">{stats.completedToday}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">معدل الإنجاز</p>
                <p className="text-2xl font-bold">
                  {Math.round((stats.completedToday / stats.todayAppointments) * 100)}%
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Banner */}
      <Card className="bento-card bg-gradient-to-r from-amber-500 to-orange-600 text-white border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Crown className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold mb-1">الباقة المجانية</h3>
                <p className="text-white/90 text-sm">
                  ترقّ إلى الباقة الاحترافية للحصول على مميزات أكثر وأدوات ذكاء اصطناعي
                </p>
              </div>
            </div>
            <Button variant="secondary" size="lg" className="whitespace-nowrap">
              ترقية الباقة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clinics Quick View */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">نظرة سريعة على العيادات</h2>
          <Button variant="outline" asChild>
            <Link href="/dentist/clinics">
              عرض الكل
              <ArrowUpRight className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clinicsQuickView.map((clinic) => (
            <Card key={clinic.id} className="bento-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{clinic.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={clinic.status === "active" ? "success" : "secondary"}>
                        {clinic.status === "active" ? "نشط" : "غير مفعل"}
                      </Badge>
                      {clinic.alerts > 0 && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {clinic.alerts}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-blue-600">{clinic.patients}</p>
                    <p className="text-xs text-muted-foreground">مريض</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-green-600">
                      {clinic.completedToday}/{clinic.todayAppointments}
                    </p>
                    <p className="text-xs text-muted-foreground">مواعيد</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-purple-600">{clinic.staff}</p>
                    <p className="text-xs text-muted-foreground">طاقم</p>
                  </div>
                </div>

                {clinic.revenue > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-0.5">الإيرادات الشهرية</p>
                    <p className="text-sm font-bold text-green-600">
                      {formatCurrency(clinic.revenue)}
                    </p>
                  </div>
                )}

                {clinic.status === "active" && (
                  <Button className="w-full" size="sm" asChild>
                    <Link href={`/clinic/${clinic.id}`}>
                      دخول لوحة التحكم
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Activities and Tasks */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="bento-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                آخر الأنشطة
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dentist/notifications">عرض الكل</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.type)
              const colorClass = getActivityColor(activity.type)

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <ActivityIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.clinic}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="bento-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                المهام القادمة
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dentist/tasks">عرض الكل</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded border-2 border-primary mt-0.5 flex-shrink-0"></div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">{task.title}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge
                      variant={task.priority === "high" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {task.priority === "high" ? "عاجل" : "متوسط"}
                    </Badge>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.dueDate}
                    </span>
                    <span className="text-muted-foreground">• {task.clinic}</span>
                  </div>
                </div>
              </div>
            ))}

            {upcomingTasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>لا توجد مهام معلقة</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
