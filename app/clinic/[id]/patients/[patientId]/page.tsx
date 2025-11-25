"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DentalChart } from "@/components/features/dental-chart"
import { SessionDetailsForm } from "@/components/features/session-details-form"
import { LabOrderDialog } from "@/components/features/lab-order-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowRight,
  User,
  Phone,
  Calendar,
  MapPin,
  FileText,
  Stethoscope,
  Brain,
  Archive,
  History,
  DollarSign,
  Edit,
  Plus,
  CheckCircle2,
  Clock,
  FlaskConical,
} from "lucide-react"
import Link from "next/link"

export default function PatientFilePageEnhanced({
  params,
}: {
  params: { id: string; patientId: string }
}) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [showSessionDialog, setShowSessionDialog] = useState(false)
  const [showLabDialog, setShowLabDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  // بيانات تجريبية للمريض - سيتم استبدالها بـ API calls
  const patient = {
    id: params.patientId,
    name: "أحمد علي محمد",
    phone: "07701234567",
    age: 28,
    gender: "ذكر",
    address: "بغداد - الكرادة",
    dateOfBirth: "1996-05-15",
    firstVisit: "2023-06-10",
    lastVisit: "2024-01-15",
    totalVisits: 12,
    nextAppointment: "2024-01-25",
    doctor: "د. محمد أحمد",
    medicalHistory: {
      allergies: ["البنسلين"],
      chronicDiseases: ["ضغط الدم"],
      medications: ["أملوديبين 5 ملغ"],
    },
    totalCost: 5500000,
    totalPaid: 4000000,
    balance: 1500000,
  }

  const treatmentPlans = [
    {
      id: "1",
      toothNumber: 16,
      treatment: "علاج عصب",
      type: "ROOT_CANAL",
      status: "in_progress",
      progress: 66,
      totalSessions: 3,
      completedSessions: 2,
      cost: 750000,
      paid: 500000,
      needsLabOrder: false,
      sessions: [
        {
          id: "s1",
          number: 1,
          date: "2024-01-05",
          status: "COMPLETED",
          notes: "فتح السن وتنظيف القناة",
          rootCanals: 3,
          filesUsed: ["#15", "#20"],
        },
        {
          id: "s2",
          number: 2,
          date: "2024-01-12",
          status: "COMPLETED",
          notes: "حشو القناة المؤقت",
          canalLength: "21mm",
          rootFillingType: "Gutta-percha",
        },
        {
          id: "s3",
          number: 3,
          date: "2024-01-25",
          status: "SCHEDULED",
          notes: "الحشوة النهائية",
        },
      ],
    },
    {
      id: "2",
      toothNumber: 26,
      treatment: "تاج خزفي",
      type: "CROWN",
      status: "pending_lab",
      progress: 50,
      totalSessions: 2,
      completedSessions: 1,
      cost: 1200000,
      paid: 600000,
      needsLabOrder: true,
      labOrderRequested: false,
      sessions: [
        {
          id: "s4",
          number: 1,
          date: "2024-01-10",
          status: "COMPLETED",
          notes: "تحضير السن وأخذ الطبعة",
          crownType: "Zirconia",
          crownColor: "A2",
        },
        {
          id: "s5",
          number: 2,
          date: "2024-01-30",
          status: "SCHEDULED",
          notes: "تركيب التاج",
        },
      ],
    },
  ]

  const savedLabs = [
    {
      id: "lab1",
      labName: "مختبر الأسنان المتطور",
      labPhone: "07701111111",
      isInPlatform: true,
    },
    {
      id: "lab2",
      labName: "مختبر النجوم",
      labPhone: "07702222222",
      isInPlatform: false,
    },
  ]

  const documents = [
    {
      id: "1",
      title: "أشعة بانوراما",
      type: "X-Ray",
      date: "2024-01-10",
      fileUrl: "#",
    },
    {
      id: "2",
      title: "نتائج التحاليل",
      type: "Lab Report",
      date: "2024-01-05",
      fileUrl: "#",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "completed":
        return "success"
      case "IN_PROGRESS":
      case "in_progress":
        return "info"
      case "SCHEDULED":
      case "scheduled":
        return "warning"
      case "pending_lab":
        return "warning"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "completed":
        return "مكتمل"
      case "IN_PROGRESS":
      case "in_progress":
        return "جاري"
      case "SCHEDULED":
      case "scheduled":
        return "مجدول"
      case "pending_lab":
        return "بانتظار المختبر"
      default:
        return status
    }
  }

  const formatCurrency = (amount: number) => {
    return (
      new Intl.NumberFormat("ar-IQ", {
        style: "decimal",
        minimumFractionDigits: 0,
      }).format(amount) + " د.ع"
    )
  }

  const handleSessionClick = (session: any, plan: any) => {
    setSelectedSession({ ...session, treatmentType: plan.type, sessionNumber: session.number })
    setSelectedPlan(plan)
    setShowSessionDialog(true)
  }

  const handleSaveSession = async (data: any) => {
    console.log("Saving session:", data)
    // Here you would call the API
    // await fetch(`/api/treatment-plans/${selectedPlan.id}/sessions/${selectedSession.id}`, {
    //   method: "PATCH",
    //   body: JSON.stringify(data)
    // })
    setShowSessionDialog(false)
    // Refresh data
  }

  const handleLabOrder = (plan: any) => {
    setSelectedPlan(plan)
    setShowLabDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/clinic/${params.id}/patients`}>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">ملف المريض</h1>
            <p className="text-muted-foreground">{patient.name}</p>
          </div>
        </div>
        <Button>
          <Edit className="w-4 h-4 ml-2" />
          تعديل البيانات
        </Button>
      </div>

      {/* Patient Info Card */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {patient.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">الهاتف</span>
                </div>
                <p className="font-semibold" dir="ltr">
                  {patient.phone}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">العمر</span>
                </div>
                <p className="font-semibold">{patient.age} سنة</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">العنوان</span>
                </div>
                <p className="font-semibold">{patient.address}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">الطبيب المعالج</span>
                </div>
                <p className="font-semibold">{patient.doctor}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                <TabsTrigger value="treatment" className="flex-1 min-w-fit">
                  <Stethoscope className="w-4 h-4 ml-1" />
                  الخطة العلاجية
                </TabsTrigger>
                <TabsTrigger value="smart" className="flex-1 min-w-fit">
                  <Brain className="w-4 h-4 ml-1" />
                  الخدمات الذكية
                </TabsTrigger>
                <TabsTrigger value="archive" className="flex-1 min-w-fit">
                  <Archive className="w-4 h-4 ml-1" />
                  الأرشيف
                </TabsTrigger>
                <TabsTrigger value="history" className="flex-1 min-w-fit">
                  <History className="w-4 h-4 ml-1" />
                  التاريخ الطبي
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
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">إجمالي الزيارات</p>
                  <p className="text-3xl font-bold">{patient.totalVisits}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">آخر زيارة</p>
                  <p className="text-lg font-bold">{patient.lastVisit}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">الموعد القادم</p>
                  <p className="text-lg font-bold text-blue-600">{patient.nextAppointment}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>ملخص الخطط العلاجية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {treatmentPlans.map((plan) => (
                <div key={plan.id} className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {plan.toothNumber}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{plan.treatment}</p>
                      <Badge variant={getStatusColor(plan.status)}>{getStatusText(plan.status)}</Badge>
                    </div>
                    <Progress value={plan.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {plan.completedSessions} من {plan.totalSessions} جلسات
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Treatment Plan Tab */}
        <TabsContent value="treatment" className="space-y-6">
          <Card className="bento-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>مخطط الأسنان التفاعلي</CardTitle>
                <p className="text-sm text-muted-foreground">اضغط على السن لإضافة أو تعديل الخطة العلاجية</p>
              </div>
            </CardHeader>
            <CardContent>
              <DentalChart patientId={patient.id} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">الخطط العلاجية</h3>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                إضافة خطة جديدة
              </Button>
            </div>

            {treatmentPlans.map((plan) => (
              <Card key={plan.id} className="bento-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {plan.toothNumber}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{plan.treatment}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {plan.completedSessions} من {plan.totalSessions} جلسات مكتملة
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={getStatusColor(plan.status)}>{getStatusText(plan.status)}</Badge>
                      {plan.needsLabOrder && !plan.labOrderRequested && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2"
                          onClick={() => handleLabOrder(plan)}
                        >
                          <FlaskConical className="w-4 h-4" />
                          طلب مختبر
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">التقدم</span>
                      <span className="font-semibold">{plan.progress}%</span>
                    </div>
                    <Progress value={plan.progress} className="h-3" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">الجلسات</h4>
                    {plan.sessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-accent/30 cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => handleSessionClick(session, plan)}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                          {session.number}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{session.date}</p>
                            {session.status === "COMPLETED" && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                            {session.status === "SCHEDULED" && <Clock className="w-4 h-4 text-orange-600" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{session.notes}</p>
                          {'rootCanals' in session && session.rootCanals && (
                            <Badge variant="outline" className="text-xs">
                              {session.rootCanals} قنوات
                            </Badge>
                          )}
                          {'crownType' in session && session.crownType && (
                            <Badge variant="outline" className="text-xs">
                              {session.crownType}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                    <div>
                      <p className="text-sm text-muted-foreground">التكلفة</p>
                      <p className="font-bold text-green-700">{formatCurrency(plan.cost)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المدفوع</p>
                      <p className="font-bold text-blue-700">{formatCurrency(plan.paid)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المتبقي</p>
                      <p className="font-bold text-red-700">{formatCurrency(plan.cost - plan.paid)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tabs remain the same... */}
        <TabsContent value="finance" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">التكلفة الإجمالية</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(patient.totalCost)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">المبلغ المدفوع</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(patient.totalPaid)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bento-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">المبلغ المتبقي</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(patient.balance)}</p>
                  <Badge className="w-full justify-center mt-2">الدفع نقداً فقط</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Session Details Dialog */}
      <Dialog open={showSessionDialog} onOpenChange={setShowSessionDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSession && (
            <SessionDetailsForm
              session={selectedSession}
              treatmentType={selectedSession.treatmentType}
              onSave={handleSaveSession}
              onCancel={() => setShowSessionDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Lab Order Dialog */}
      {selectedPlan && (
        <LabOrderDialog
          open={showLabDialog}
          onClose={() => setShowLabDialog(false)}
          treatmentPlanId={selectedPlan.id}
          treatmentType={selectedPlan.type}
          patientName={patient.name}
          savedLabs={savedLabs}
        />
      )}
    </div>
  )
}
