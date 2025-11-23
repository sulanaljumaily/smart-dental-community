"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowRight,
  User,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  Edit,
  FlaskConical,
  Stethoscope,
  Save
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function TreatmentPlanDetailPage({
  params,
}: {
  params: { id: string; planId: string }
}) {
  const [activeTab, setActiveTab] = useState("overview")
  const [editingSession, setEditingSession] = useState<number | null>(null)

  // بيانات تجريبية للخطة العلاجية
  const treatmentPlan = {
    id: params.planId,
    patientName: "أحمد علي محمد",
    patientPhone: "07701234567",
    toothNumber: 16,
    treatmentType: "ROOT_CANAL",
    treatmentName: "علاج عصب",
    treatmentIcon: "⚕️",
    condition: "CAVITY",
    conditionLabel: "تسوس",
    status: "in_progress",
    progress: 66,
    doctorName: "د. محمد أحمد",
    totalCost: 750000,
    totalPaid: 500000,
    startDate: "2024-01-05",
    nextSessionDate: "2024-01-25",
    needsLab: false,

    // الجلسات
    sessions: [
      {
        number: 1,
        name: "فتح وتنظيف",
        status: "completed",
        date: "2024-01-05",
        duration: 60,
        notes: "تم فتح السن وتنظيف القناة بشكل كامل. استخدام ملفات #15، #20، #25",
        customFields: {
          "طول الجذور": "21mm",
          "الملفات المستخدمة": "#15, #20, #25"
        },
        cost: 250000,
        paid: 250000
      },
      {
        number: 2,
        name: "حشو مؤقت",
        status: "completed",
        date: "2024-01-12",
        duration: 45,
        notes: "وضع حشوة مؤقتة بعد تنظيف القنوات. المريض لا يشعر بأي ألم",
        customFields: {
          "الملفات": "#25, #30",
          "المادة الحاشية": "Gutta-percha"
        },
        cost: 250000,
        paid: 250000
      },
      {
        number: 3,
        name: "الحشوة النهائية",
        status: "scheduled",
        date: "2024-01-25",
        duration: 45,
        notes: "",
        customFields: {
          "نوع الحشوة": ""
        },
        cost: 250000,
        paid: 0
      }
    ],

    // التاريخ الطبي
    medicalHistory: {
      allergies: ["البنسلين"],
      chronicDiseases: ["ضغط الدم"],
      medications: ["أملوديبين 5 ملغ"]
    },

    // المعاملات المالية
    financialTransactions: [
      {
        id: "1",
        date: "2024-01-05",
        amount: 250000,
        type: "payment",
        method: "ZainCash",
        session: 1,
        description: "دفعة للجلسة الأولى"
      },
      {
        id: "2",
        date: "2024-01-12",
        amount: 250000,
        type: "payment",
        method: "نقدي",
        session: 2,
        description: "دفعة للجلسة الثانية"
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
            <Link href={`/clinic/${params.id}/patients/${treatmentPlan.patientName}`}>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">الخطة العلاجية</h1>
            <p className="text-muted-foreground">
              {treatmentPlan.treatmentName} - السن رقم {treatmentPlan.toothNumber}
            </p>
          </div>
        </div>
        <Badge variant={getStatusColor(treatmentPlan.status)} className="text-base px-4 py-2">
          {getStatusText(treatmentPlan.status)}
        </Badge>
      </div>

      {/* Patient Info Card */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {treatmentPlan.patientName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">اسم المريض</span>
                </div>
                <p className="font-semibold">{treatmentPlan.patientName}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">الهاتف</span>
                </div>
                <p className="font-semibold" dir="ltr">{treatmentPlan.patientPhone}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Stethoscope className="w-4 h-4" />
                  <span className="text-sm">الطبيب المعالج</span>
                </div>
                <p className="font-semibold">{treatmentPlan.doctorName}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">تاريخ البدء</span>
                </div>
                <p className="font-semibold">{treatmentPlan.startDate}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">التقدم الكلي</p>
              <p className="text-3xl font-bold">{treatmentPlan.progress}%</p>
              <Progress value={treatmentPlan.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {treatmentPlan.sessions.filter(s => s.status === "completed").length} من {treatmentPlan.sessions.length} جلسات
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">المالية</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(treatmentPlan.totalPaid)}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">من {formatCurrency(treatmentPlan.totalCost)}</span>
                <span className="text-red-600">متبقي: {formatCurrency(treatmentPlan.totalCost - treatmentPlan.totalPaid)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">الجلسة القادمة</p>
              <p className="text-lg font-bold text-blue-600">
                {treatmentPlan.nextSessionDate}
              </p>
              <p className="text-xs text-muted-foreground">
                {treatmentPlan.sessions.find(s => s.status === "scheduled")?.name}
              </p>
            </div>
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
                  <FileText className="w-4 h-4 ml-1" />
                  نظرة عامة
                </TabsTrigger>
                <TabsTrigger value="sessions" className="flex-1 min-w-fit">
                  <Calendar className="w-4 h-4 ml-1" />
                  الجلسات
                </TabsTrigger>
                <TabsTrigger value="finance" className="flex-1 min-w-fit">
                  <DollarSign className="w-4 h-4 ml-1" />
                  المالية
                </TabsTrigger>
              </div>
            </TabsList>
          </CardContent>
        </Card>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>معلومات العلاج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">نوع العلاج</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{treatmentPlan.treatmentIcon}</span>
                    <span className="text-lg font-semibold">{treatmentPlan.treatmentName}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">رقم السن</p>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {treatmentPlan.toothNumber}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">حالة السن</p>
                  <Badge variant="warning">{treatmentPlan.conditionLabel}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">يتطلب مختبر</p>
                  <Badge variant={treatmentPlan.needsLab ? "info" : "secondary"}>
                    {treatmentPlan.needsLab ? "نعم" : "لا"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical History */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>التاريخ الطبي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">الحساسية</h4>
                <div className="flex flex-wrap gap-2">
                  {treatmentPlan.medicalHistory.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive">{allergy}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">الأمراض المزمنة</h4>
                <div className="flex flex-wrap gap-2">
                  {treatmentPlan.medicalHistory.chronicDiseases.map((disease, index) => (
                    <Badge key={index} variant="warning">{disease}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">الأدوية الحالية</h4>
                <div className="flex flex-wrap gap-2">
                  {treatmentPlan.medicalHistory.medications.map((med, index) => (
                    <Badge key={index} variant="secondary">{med}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          {treatmentPlan.sessions.map((session) => (
            <Card key={session.number} className="bento-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                      session.status === "completed" ? "bg-green-600" :
                      session.status === "scheduled" ? "bg-orange-600" : "bg-gray-400"
                    )}>
                      {session.number}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{session.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {session.date}
                        {session.duration && ` • ${session.duration} دقيقة`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(session.status)}>
                      {getStatusText(session.status)}
                    </Badge>
                    {session.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {session.status === "scheduled" && (
                      <Clock className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Custom Fields */}
                {session.customFields && Object.keys(session.customFields).length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(session.customFields).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <Label className="text-sm">{key}</Label>
                        {editingSession === session.number ? (
                          <Input
                            defaultValue={value}
                            className="h-10"
                          />
                        ) : (
                          <p className="font-semibold">{value || "-"}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Notes */}
                <div className="space-y-2">
                  <Label className="text-sm">ملاحظات الجلسة</Label>
                  {editingSession === session.number ? (
                    <textarea
                      defaultValue={session.notes}
                      className="w-full min-h-[100px] rounded-lg border-2 border-input bg-background px-3 py-2"
                      placeholder="أضف ملاحظات الجلسة..."
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground p-3 rounded-lg bg-accent/30">
                      {session.notes || "لا توجد ملاحظات"}
                    </p>
                  )}
                </div>

                {/* Financial Info */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div>
                    <p className="text-sm text-muted-foreground">تكلفة الجلسة</p>
                    <p className="font-bold text-blue-700">{formatCurrency(session.cost)}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">المدفوع</p>
                    <p className="font-bold text-green-700">{formatCurrency(session.paid)}</p>
                  </div>
                  {session.cost > session.paid && (
                    <Badge variant="warning">
                      متبقي: {formatCurrency(session.cost - session.paid)}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {editingSession === session.number ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          // Save changes
                          setEditingSession(null)
                        }}
                      >
                        <Save className="w-4 h-4 ml-2" />
                        حفظ التغييرات
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingSession(null)}
                      >
                        إلغاء
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setEditingSession(session.number)}
                      >
                        <Edit className="w-4 h-4 ml-2" />
                        تعديل
                      </Button>
                      {session.status === "scheduled" && (
                        <Button size="sm" className="flex-1">
                          <CheckCircle2 className="w-4 h-4 ml-2" />
                          إكمال الجلسة
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button className="w-full" size="lg">
            <Plus className="w-4 h-4 ml-2" />
            إضافة جلسة جديدة
          </Button>
        </TabsContent>

        {/* Finance Tab */}
        <TabsContent value="finance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">التكلفة الإجمالية</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(treatmentPlan.totalCost)}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">المبلغ المدفوع</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(treatmentPlan.totalPaid)}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">المبلغ المتبقي</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(treatmentPlan.totalCost - treatmentPlan.totalPaid)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bento-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>المعاملات المالية</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة دفعة
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {treatmentPlan.financialTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{transaction.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <Badge variant="outline">{transaction.method}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
