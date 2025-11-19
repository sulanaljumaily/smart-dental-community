"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "@/components/shared/stat-card"
import { MobileNav } from "@/components/shared/mobile-nav"
import {
  Building2,
  Users,
  Calendar,
  TrendingUp,
  Bell,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Crown,
  Plus,
  Settings,
  UserCog,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

export default function DentistHubPage() {
  // بيانات تجريبية - سيتم استبدالها بـ API
  const stats = {
    totalClinics: 3,
    totalPatients: 247,
    todayAppointments: 12,
    monthlyRevenue: 45000000, // IQD
  }

  const clinics = [
    {
      id: "1",
      name: "عيادة النجوم لطب الأسنان",
      address: "بغداد - الكرادة",
      patients: 156,
      todayAppointments: 8,
      staff: 5,
      revenue: 25000000,
      isActive: true,
    },
    {
      id: "2",
      name: "مركز الابتسامة الطبي",
      address: "بغداد - المنصور",
      patients: 91,
      todayAppointments: 4,
      staff: 3,
      revenue: 15000000,
      isActive: true,
    },
    {
      id: "3",
      name: "عيادة الأمل التخصصية",
      address: "بغداد - الجادرية",
      patients: 0,
      todayAppointments: 0,
      staff: 0,
      revenue: 0,
      isActive: false,
    },
  ]

  const recentActivities = [
    { id: 1, text: "موعد جديد مع المريض أحمد علي", time: "منذ 5 دقائق", clinic: "عيادة النجوم" },
    { id: 2, text: "تم إكمال علاج زراعة للمريضة سارة", time: "منذ 30 دقيقة", clinic: "مركز الابتسامة" },
    { id: 3, text: "طلب مختبر جديد من معمل الدقة", time: "منذ ساعة", clinic: "عيادة النجوم" },
    { id: 4, text: "تنبيه: نقص في مخزون القفازات", time: "منذ ساعتين", clinic: "عيادة النجوم" },
  ]

  const tasks = [
    { id: 1, title: "متابعة حالة المريض خالد", priority: "high", dueDate: "اليوم", clinic: "عيادة النجوم" },
    { id: 2, title: "طلب مواد من المتجر", priority: "medium", dueDate: "غداً", clinic: "مركز الابتسامة" },
    { id: 3, title: "مراجعة أشعة المريضة فاطمة", priority: "high", dueDate: "اليوم", clinic: "عيادة النجوم" },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "warning"
      default: return "secondary"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                د.س
              </div>
              <div>
                <h1 className="text-lg font-bold">د. سلطان الجميلي</h1>
                <p className="text-sm text-muted-foreground">مركز الأطباء</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="عدد العيادات"
            value={stats.totalClinics}
            icon={Building2}
            color="blue"
          />
          <StatCard
            title="إجمالي المرضى"
            value={stats.totalPatients}
            icon={Users}
            color="green"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="مواعيد اليوم"
            value={stats.todayAppointments}
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

        {/* Subscription Banner */}
        <Card className="bento-card bg-gradient-to-r from-amber-500 to-orange-600 text-white border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Crown className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-bold mb-1">الباقة المجانية</h3>
                  <p className="text-white/90 text-sm">
                    ترقّ إلى الباقة الاحترافية للحصول على مميزات أكثر
                  </p>
                </div>
              </div>
              <Button variant="secondary" size="lg">
                ترقية الباقة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Clinics Management Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">إدارة العيادات</h2>
            <Button asChild>
              <Link href="/dentist/clinics/new">
                <Plus className="w-4 h-4 ml-2" />
                إضافة عيادة
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clinics.map((clinic) => (
              <Card key={clinic.id} className="bento-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{clinic.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-xs">
                        <Building2 className="w-3 h-3" />
                        {clinic.address}
                      </CardDescription>
                    </div>
                    <Badge variant={clinic.isActive ? "success" : "secondary"}>
                      {clinic.isActive ? "نشط" : "غير مفعل"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-blue-600">{clinic.patients}</p>
                      <p className="text-xs text-muted-foreground">مريض</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-green-600">{clinic.todayAppointments}</p>
                      <p className="text-xs text-muted-foreground">موعد اليوم</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-purple-600">{clinic.staff}</p>
                      <p className="text-xs text-muted-foreground">طاقم</p>
                    </div>
                  </div>

                  {clinic.revenue > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">الإيرادات الشهرية</p>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(clinic.revenue)}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/dentist/clinics/${clinic.id}/settings`}>
                        <Settings className="w-4 h-4 ml-1" />
                        الإعدادات
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/dentist/clinics/${clinic.id}/staff`}>
                        <UserCog className="w-4 h-4 ml-1" />
                        الطاقم
                      </Link>
                    </Button>
                  </div>

                  {clinic.isActive && (
                    <Button className="w-full" asChild>
                      <Link href={`/clinic/${clinic.id}`}>
                        <ExternalLink className="w-4 h-4 ml-2" />
                        دخول لوحة التحكم
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tasks and Activities */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tasks Section */}
          <Card className="bento-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  المهام والتذكيرات
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dentist/tasks">عرض الكل</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="w-5 h-5 rounded border-2 border-primary mt-0.5 flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">{task.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority === "high" ? "عاجل" : task.priority === "medium" ? "متوسط" : "عادي"}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.dueDate}
                      </span>
                      <span className="text-xs">• {task.clinic}</span>
                    </div>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>لا توجد مهام معلقة</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bento-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  آخر الأنشطة
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.clinic}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav userRole="DENTIST" isOwner={true} />
    </div>
  )
}
