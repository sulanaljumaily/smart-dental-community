"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CheckCircle2,
  Clock,
  Calendar,
  Eye,
  DollarSign,
  FlaskConical,
  User,
  FileText,
  AlertCircle,
} from "lucide-react"
import { getTreatmentType } from "@/lib/treatment-types"
import { cn } from "@/lib/utils"

export interface Session {
  id: string
  number: number
  name: string
  date?: string
  status: "PENDING" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED"
  notes?: string
  duration: number
  completedAt?: string
  completedBy?: string
}

export interface TreatmentPlan {
  id: string
  toothNumber: number
  treatmentType: string
  treatmentName: string
  doctorName: string
  price: number
  paid: number
  sessions: Session[]
  createdAt: string
  notes?: string
  needsLab?: boolean
  labOrderId?: string
}

interface TreatmentPlanViewProps {
  plans: TreatmentPlan[]
  onCompleteSession?: (planId: string, sessionId: string) => void
  onViewDetails?: (planId: string) => void
  onAddPayment?: (planId: string) => void
  onCreateLabOrder?: (planId: string) => void
}

export function TreatmentPlanView({
  plans,
  onCompleteSession,
  onViewDetails,
  onAddPayment,
  onCreateLabOrder,
}: TreatmentPlanViewProps) {
  const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success"
      case "IN_PROGRESS":
        return "info"
      case "SCHEDULED":
        return "warning"
      case "PENDING":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "مكتمل"
      case "IN_PROGRESS":
        return "جاري"
      case "SCHEDULED":
        return "مجدول"
      case "PENDING":
        return "معلق"
      default:
        return status
    }
  }

  const calculateProgress = (sessions: Session[]) => {
    const completed = sessions.filter(s => s.status === "COMPLETED").length
    return Math.round((completed / sessions.length) * 100)
  }

  const handleViewDetails = (plan: TreatmentPlan) => {
    setSelectedPlan(plan)
    setShowDetailsDialog(true)
    if (onViewDetails) {
      onViewDetails(plan.id)
    }
  }

  const handleCompleteSession = (planId: string, sessionId: string) => {
    if (onCompleteSession) {
      onCompleteSession(planId, sessionId)
    }
  }

  if (!plans || plans.length === 0) {
    return (
      <Card className="bento-card">
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">لا توجد خطط علاجية حالياً</p>
          <p className="text-sm text-muted-foreground mt-1">
            اضغط على السن في المخطط أعلاه لإضافة خطة علاجية
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">الخطط العلاجية النشطة</h3>
          <Badge variant="info" className="text-sm">
            {plans.length} خطة
          </Badge>
        </div>

        {plans.map((plan) => {
          const treatment = getTreatmentType(plan.treatmentType)
          const progress = calculateProgress(plan.sessions)
          const completedSessions = plan.sessions.filter(s => s.status === "COMPLETED").length
          const nextSession = plan.sessions.find(s => s.status !== "COMPLETED")
          const remaining = plan.price - plan.paid

          return (
            <Card key={plan.id} className="bento-card hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {plan.toothNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{plan.treatmentName}</CardTitle>
                        {treatment && (
                          <span className="text-2xl">{treatment.icon}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <User className="w-3 h-3" />
                        {plan.doctorName}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(plan)}
                  >
                    <Eye className="w-4 h-4 ml-1" />
                    عرض التفاصيل
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">التقدم العام</span>
                    <span className="font-bold text-blue-600">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {completedSessions} من {plan.sessions.length} جلسات مكتملة
                  </p>
                </div>

                <Separator />

                {/* Next Session */}
                {nextSession && (
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                            {nextSession.number}
                          </div>
                          <h4 className="font-bold text-blue-900">الجلسة القادمة</h4>
                        </div>
                        <p className="text-sm font-medium">{nextSession.name}</p>
                        {nextSession.date && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {nextSession.date}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {nextSession.duration} دقيقة
                        </p>
                      </div>
                      <Badge variant={getStatusColor(nextSession.status)}>
                        {getStatusText(nextSession.status)}
                      </Badge>
                    </div>

                    {nextSession.status !== "COMPLETED" && (
                      <Button
                        className="w-full"
                        onClick={() => handleCompleteSession(plan.id, nextSession.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 ml-2" />
                        إكمال الجلسة
                      </Button>
                    )}
                  </div>
                )}

                {/* Financial Summary */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                    <p className="text-xs text-muted-foreground mb-1">التكلفة</p>
                    <p className="text-sm font-bold text-blue-700">
                      {formatCurrency(plan.price)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                    <p className="text-xs text-muted-foreground mb-1">المدفوع</p>
                    <p className="text-sm font-bold text-green-700">
                      {formatCurrency(plan.paid)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-center">
                    <p className="text-xs text-muted-foreground mb-1">المتبقي</p>
                    <p className="text-sm font-bold text-orange-700">
                      {formatCurrency(remaining)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {remaining > 0 && onAddPayment && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => onAddPayment(plan.id)}
                    >
                      <DollarSign className="w-4 h-4 ml-1" />
                      إضافة دفعة
                    </Button>
                  )}
                  {plan.needsLab && !plan.labOrderId && onCreateLabOrder && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => onCreateLabOrder(plan.id)}
                    >
                      <FlaskConical className="w-4 h-4 ml-1" />
                      طلب مختبر
                    </Button>
                  )}
                </div>

                {/* Lab Order Alert */}
                {plan.needsLab && !plan.labOrderId && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <AlertCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <p className="text-xs text-purple-900">
                      هذا العلاج يتطلب طلب مختبر - يرجى إنشاء الطلب
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPlan && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {selectedPlan.toothNumber}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">
                      {selectedPlan.treatmentName} - السن رقم {selectedPlan.toothNumber}
                    </DialogTitle>
                    <DialogDescription>
                      الطبيب المعالج: {selectedPlan.doctorName}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Progress Overview */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">التقدم الإجمالي</h3>
                    <Badge variant="info" className="text-base px-3 py-1">
                      {calculateProgress(selectedPlan.sessions)}%
                    </Badge>
                  </div>
                  <Progress value={calculateProgress(selectedPlan.sessions)} className="h-4 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {selectedPlan.sessions.filter(s => s.status === "COMPLETED").length} من {selectedPlan.sessions.length} جلسات مكتملة
                  </p>
                </div>

                {/* All Sessions */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">جميع الجلسات</h3>
                  {selectedPlan.sessions.map((session) => (
                    <Card key={session.id} className={cn(
                      "bento-card",
                      session.status === "COMPLETED" && "bg-green-50 border-green-200"
                    )}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0",
                              session.status === "COMPLETED" ? "bg-green-600" : "bg-blue-600"
                            )}>
                              {session.number}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold">{session.name}</h4>
                                {session.status === "COMPLETED" && (
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                )}
                              </div>
                              <div className="space-y-1">
                                {session.date && (
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {session.date}
                                  </p>
                                )}
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {session.duration} دقيقة
                                </p>
                                {session.notes && (
                                  <p className="text-sm text-muted-foreground">
                                    {session.notes}
                                  </p>
                                )}
                                {session.completedAt && (
                                  <p className="text-xs text-green-700 mt-2">
                                    تم الإكمال في: {session.completedAt}
                                    {session.completedBy && ` - بواسطة: ${session.completedBy}`}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <Badge variant={getStatusColor(session.status)}>
                            {getStatusText(session.status)}
                          </Badge>
                        </div>

                        {session.status !== "COMPLETED" && (
                          <Button
                            className="w-full mt-3"
                            onClick={() => {
                              handleCompleteSession(selectedPlan.id, session.id)
                              setShowDetailsDialog(false)
                            }}
                          >
                            <CheckCircle2 className="w-4 h-4 ml-2" />
                            إكمال الجلسة
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Financial Details */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">التفاصيل المالية</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-200 text-center">
                      <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm text-muted-foreground mb-1">التكلفة الإجمالية</p>
                      <p className="text-xl font-bold text-blue-700">
                        {formatCurrency(selectedPlan.price)}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200 text-center">
                      <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                      <p className="text-sm text-muted-foreground mb-1">المبلغ المدفوع</p>
                      <p className="text-xl font-bold text-green-700">
                        {formatCurrency(selectedPlan.paid)}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-orange-50 border-2 border-orange-200 text-center">
                      <AlertCircle className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                      <p className="text-sm text-muted-foreground mb-1">المبلغ المتبقي</p>
                      <p className="text-xl font-bold text-orange-700">
                        {formatCurrency(selectedPlan.price - selectedPlan.paid)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedPlan.notes && (
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      ملاحظات
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedPlan.notes}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
