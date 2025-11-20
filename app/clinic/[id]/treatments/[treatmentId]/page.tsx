"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  User,
  DollarSign,
  TrendingUp,
  Users,
  Stethoscope,
  BarChart3,
  FileText,
  Clock,
  CheckCircle2,
  FlaskConical,
  Calendar,
  Phone
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function TreatmentDetailsPage({
  params,
}: {
  params: { id: string; treatmentId: string }
}) {
  const [activeTab, setActiveTab] = useState("overview")

  // بيانات تجريبية للعلاج
  const treatment = {
    id: params.treatmentId,
    name: "علاج عصب",
    type: "ROOT_CANAL",
    icon: "⚕️",
    description: "علاج عصب كامل مع حشوة نهائية",
    basePrice: 750000,
    defaultSessions: 3,
    needsLab: false,

    // إحصائيات
    totalPatients: 156,
    completedCases: 142,
    inProgressCases: 14,
    successRate: 95.5,
    averagePrice: 780000,
    totalRevenue: 109200000,
    averageDuration: 3.2, // weeks

    // الأطباء
    doctors: [
      {
        id: "1",
        name: "د. محمد أحمد",
        specialty: "جراحة الفم والأسنان",
        patients: 89,
        completedCases: 82,
        inProgressCases: 7,
        successRate: 97.2,
        averagePrice: 800000,
        totalRevenue: 65600000,
        experience: "12 سنة"
      },
      {
        id: "2",
        name: "د. سارة حسن",
        specialty: "علاج الجذور",
        patients: 67,
        completedCases: 60,
        inProgressCases: 7,
        successRate: 93.8,
        averagePrice: 760000,
        totalRevenue: 45600000,
        experience: "8 سنوات"
      }
    ],

    // المرضى
    patients: [
      {
        id: "1",
        name: "أحمد علي",
        phone: "07701234567",
        toothNumber: 16,
        status: "in_progress",
        progress: 66,
        completedSessions: 2,
        totalSessions: 3,
        cost: 750000,
        paid: 500000,
        doctor: "د. محمد أحمد",
        startDate: "2024-01-05",
        nextSession: "2024-01-25"
      },
      {
        id: "2",
        name: "فاطمة حسن",
        phone: "07709876543",
        toothNumber: 26,
        status: "completed",
        progress: 100,
        completedSessions: 3,
        totalSessions: 3,
        cost: 800000,
        paid: 800000,
        doctor: "د. سارة حسن",
        startDate: "2023-12-10",
        completionDate: "2023-12-28"
      },
      {
        id: "3",
        name: "محمد خالد",
        phone: "07801234567",
        toothNumber: 36,
        status: "in_progress",
        progress: 33,
        completedSessions: 1,
        totalSessions: 3,
        cost: 750000,
        paid: 250000,
        doctor: "د. محمد أحمد",
        startDate: "2024-01-15",
        nextSession: "2024-01-30"
      },
      {
        id: "4",
        name: "نور علي",
        phone: "07751234567",
        toothNumber: 46,
        status: "completed",
        progress: 100,
        completedSessions: 3,
        totalSessions: 3,
        cost: 820000,
        paid: 820000,
        doctor: "د. محمد أحمد",
        startDate: "2024-01-01",
        completionDate: "2024-01-20"
      }
    ],

    // تفاصيل الجلسات
    sessionDetails: [
      {
        session: 1,
        name: "فتح وتنظيف",
        duration: 60,
        fields: ["طول الجذور", "الملفات المستخدمة"],
        notes: "تنظيف القنوات بشكل كامل"
      },
      {
        session: 2,
        name: "حشو مؤقت",
        duration: 45,
        fields: ["الملفات", "المادة الحاشية"],
        notes: "وضع حشوة مؤقتة"
      },
      {
        session: 3,
        name: "الحشوة النهائية",
        duration: 45,
        fields: ["نوع الحشوة"],
        notes: "إنهاء العلاج بحشوة دائمة"
      }
    ]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "in_progress":
        return "info"
      case "scheduled":
        return "warning"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "مكتمل"
      case "in_progress":
        return "جاري"
      case "scheduled":
        return "مجدول"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/clinic/${params.id}/treatments`}>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
              {treatment.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{treatment.name}</h1>
              <p className="text-muted-foreground">{treatment.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي المرضى</p>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{treatment.totalPatients}</p>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-green-600">✓ {treatment.completedCases} مكتمل</span>
              <span className="text-orange-600">◷ {treatment.inProgressCases} جاري</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">نسبة النجاح</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{treatment.successRate}%</p>
            <Progress value={treatment.successRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {formatCurrency(treatment.totalRevenue)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              متوسط: {formatCurrency(treatment.averagePrice)}
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">متوسط المدة</p>
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{treatment.averageDuration}</p>
            <p className="text-xs text-muted-foreground mt-2">أسابيع</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <Card className="bento-card">
          <CardContent className="p-2">
            <TabsList className="w-full h-auto bg-transparent p-1">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full">
                <TabsTrigger value="overview" className="flex-1 min-w-fit">
                  <BarChart3 className="w-4 h-4 ml-1" />
                  نظرة عامة
                </TabsTrigger>
                <TabsTrigger value="doctors" className="flex-1 min-w-fit">
                  <Stethoscope className="w-4 h-4 ml-1" />
                  الأطباء
                </TabsTrigger>
                <TabsTrigger value="patients" className="flex-1 min-w-fit">
                  <Users className="w-4 h-4 ml-1" />
                  المرضى
                </TabsTrigger>
                <TabsTrigger value="details" className="flex-1 min-w-fit">
                  <FileText className="w-4 h-4 ml-1" />
                  تفاصيل العلاج
                </TabsTrigger>
              </div>
            </TabsList>
          </CardContent>
        </Card>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Doctors Performance */}
            <Card className="bento-card">
              <CardHeader>
                <CardTitle>أداء الأطباء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {treatment.doctors.map((doctor) => (
                  <div key={doctor.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {doctor.name.split(" ")[1].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{doctor.name}</p>
                          <p className="text-xs text-muted-foreground">{doctor.patients} مريض</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-green-600">{doctor.successRate}%</p>
                        <p className="text-xs text-muted-foreground">نسبة النجاح</p>
                      </div>
                    </div>
                    <Progress value={doctor.successRate} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card className="bento-card">
              <CardHeader>
                <CardTitle>توزيع الإيرادات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {treatment.doctors.map((doctor) => {
                  const percentage = (doctor.totalRevenue / treatment.totalRevenue) * 100
                  return (
                    <div key={doctor.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{doctor.name}</span>
                        <span className="font-bold text-purple-600">
                          {formatCurrency(doctor.totalRevenue)}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={percentage} className="h-3" />
                        <span className="absolute left-2 top-0 text-xs text-white font-semibold">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Status Distribution */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>توزيع الحالات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-3xl font-bold text-green-700">{treatment.completedCases}</p>
                  <p className="text-sm text-muted-foreground mt-1">مكتمل</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-3xl font-bold text-blue-700">{treatment.inProgressCases}</p>
                  <p className="text-sm text-muted-foreground mt-1">جاري</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <p className="text-3xl font-bold text-purple-700">{treatment.totalPatients}</p>
                  <p className="text-sm text-muted-foreground mt-1">المجموع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Doctors Tab */}
        <TabsContent value="doctors" className="space-y-4">
          <div className="grid gap-4">
            {treatment.doctors.map((doctor) => (
              <Card key={doctor.id} className="bento-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {doctor.name.split(" ")[1].charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{doctor.name}</h3>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          <Badge variant="outline" className="mt-2">{doctor.experience}</Badge>
                        </div>
                        <Badge variant="success" className="text-base">
                          {doctor.successRate}% نجاح
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                          <p className="text-2xl font-bold text-blue-700">{doctor.patients}</p>
                          <p className="text-xs text-muted-foreground">مريض</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                          <p className="text-2xl font-bold text-green-700">{doctor.completedCases}</p>
                          <p className="text-xs text-muted-foreground">مكتمل</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-orange-50 border border-orange-200">
                          <p className="text-2xl font-bold text-orange-700">{doctor.inProgressCases}</p>
                          <p className="text-xs text-muted-foreground">جاري</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-purple-50 border border-purple-200">
                          <p className="text-lg font-bold text-purple-700">
                            {formatCurrency(doctor.averagePrice)}
                          </p>
                          <p className="text-xs text-muted-foreground">متوسط السعر</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                        <span className="font-semibold">إجمالي الإيرادات</span>
                        <span className="text-xl font-bold text-purple-700">
                          {formatCurrency(doctor.totalRevenue)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Patients Tab */}
        <TabsContent value="patients" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">قائمة المرضى ({treatment.patients.length})</h3>
            <div className="flex gap-2">
              <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="all">جميع الحالات</option>
                <option value="in_progress">جاري</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4">
            {treatment.patients.map((patient) => (
              <Card key={patient.id} className="bento-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {patient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-lg">{patient.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {patient.phone}
                          </span>
                          <span>•</span>
                          <span>السن رقم {patient.toothNumber}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(patient.status)}>
                      {getStatusText(patient.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">التقدم</p>
                      <div className="space-y-2">
                        <Progress value={patient.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {patient.completedSessions} من {patient.totalSessions} جلسات
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">المالية</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={patient.paid >= patient.cost ? "success" : "warning"}>
                          {formatCurrency(patient.paid)} / {formatCurrency(patient.cost)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-sm">
                      <span className="text-muted-foreground">الطبيب: </span>
                      <span className="font-semibold">{patient.doctor}</span>
                    </div>
                    <div className="text-sm">
                      {patient.status === "in_progress" && patient.nextSession && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <Calendar className="w-4 h-4" />
                          <span>الجلسة القادمة: {patient.nextSession}</span>
                        </div>
                      )}
                      {patient.status === "completed" && patient.completionDate && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>اكتمل في: {patient.completionDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>معلومات العلاج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">نوع العلاج</p>
                  <p className="text-lg font-semibold">{treatment.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">السعر الافتراضي</p>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(treatment.basePrice)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">عدد الجلسات</p>
                  <p className="text-lg font-semibold">{treatment.defaultSessions} جلسات</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">يتطلب مختبر</p>
                  <Badge variant={treatment.needsLab ? "info" : "secondary"}>
                    {treatment.needsLab ? "نعم" : "لا"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>تفاصيل الجلسات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {treatment.sessionDetails.map((session, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {session.session}
                      </div>
                      <div>
                        <h4 className="font-bold">{session.name}</h4>
                        <p className="text-xs text-muted-foreground">{session.notes}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 ml-1" />
                      {session.duration} دقيقة
                    </Badge>
                  </div>
                  {session.fields && session.fields.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs font-semibold text-muted-foreground">الحقول المطلوبة:</span>
                      {session.fields.map((field, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {treatment.needsLab && (
            <Card className="bento-card bg-purple-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <FlaskConical className="w-8 h-8 text-purple-600" />
                  <div>
                    <h4 className="font-bold text-purple-900">متطلبات المختبر</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      هذا العلاج يتطلب طلب مختبر للتركيبات. سيتم إنشاء الطلب تلقائياً عند إضافة الخطة العلاجية.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
