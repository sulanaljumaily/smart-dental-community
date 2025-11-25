"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  FlaskConical,
  Clock,
  FileText,
  User,
  Calendar,
  CheckCircle2,
  Plus
} from "lucide-react"

// FDI Numbering System (1-32)
const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

const toothConditions = [
  { value: "HEALTHY", label: "سليم", color: "bg-green-500" },
  { value: "CAVITY", label: "تسوس", color: "bg-orange-500" },
  { value: "FILLED", label: "محشو", color: "bg-blue-500" },
  { value: "MISSING", label: "مفقود", color: "bg-gray-400" },
  { value: "CROWNED", label: "مُتوج", color: "bg-yellow-500" },
  { value: "ROOT_CANAL_TREATED", label: "معالج عصب", color: "bg-purple-500" },
  { value: "EXTRACTED", label: "مخلوع", color: "bg-red-500" },
  { value: "IMPLANT", label: "مزروع", color: "bg-cyan-500" },
  { value: "DAMAGED", label: "تالف", color: "bg-red-700" },
]

// قائمة العلاجات - يجب أن تتطابق مع قسم العلاجات
const treatments = [
  {
    value: "FILLING",
    label: "حشوة تجميلية",
    icon: "🦷",
    defaultSessions: 1,
    needsLab: false,
    basePrice: 150000,
    sessionDetails: [
      { session: 1, name: "الحشوة", duration: 30, fields: ["نوع المادة", "اللون"] }
    ]
  },
  {
    value: "ROOT_CANAL",
    label: "علاج عصب",
    icon: "⚕️",
    defaultSessions: 3,
    needsLab: false,
    basePrice: 750000,
    sessionDetails: [
      { session: 1, name: "فتح وتنظيف", duration: 60, fields: ["طول الجذور", "الملفات المستخدمة"] },
      { session: 2, name: "حشو مؤقت", duration: 45, fields: ["الملفات", "المادة الحاشية"] },
      { session: 3, name: "الحشوة النهائية", duration: 45, fields: ["نوع الحشوة"] }
    ]
  },
  {
    value: "EXTRACTION",
    label: "خلع",
    icon: "🔧",
    defaultSessions: 1,
    needsLab: false,
    basePrice: 100000,
    sessionDetails: [
      { session: 1, name: "الخلع", duration: 20, fields: ["نوع الخلع", "التخدير"] }
    ]
  },
  {
    value: "CROWN",
    label: "تاج خزفي",
    icon: "👑",
    defaultSessions: 4,
    needsLab: true,
    basePrice: 1200000,
    sessionDetails: [
      {
        session: 1,
        name: "الجلسة الأولى",
        duration: 60,
        fields: ["إجراء الجلسة الأولى"],
        options: ["برد السن", "علاج عصب", "دعامة"]
      },
      {
        session: 2,
        name: "الجلسة الثانية",
        duration: 45,
        fields: ["إجراء الجلسة الثانية"],
        options: ["برد إضافي", "تركيبة مؤقتة", "دعامة"]
      },
      {
        session: 3,
        name: "أخذ الطبعة",
        duration: 30,
        fields: ["نوع التاج", "اللون", "المختبر", "نوع الطبعة"]
      },
      {
        session: 4,
        name: "فحص وتركيب التاج النهائي",
        duration: 30,
        fields: ["نوع التثبيت", "الإطباق"]
      }
    ]
  },
  {
    value: "BRIDGE",
    label: "جسر ثابت",
    icon: "🌉",
    defaultSessions: 4,
    needsLab: true,
    basePrice: 1800000,
    sessionDetails: [
      {
        session: 1,
        name: "الجلسة الأولى - التحضير",
        duration: 90,
        fields: ["إجراء الجلسة الأولى"],
        options: ["برد الأسنان الداعمة", "علاج عصب", "دعامة"]
      },
      {
        session: 2,
        name: "الجلسة الثانية",
        duration: 60,
        fields: ["إجراء الجلسة الثانية"],
        options: ["برد إضافي", "جسر مؤقت", "دعامة"]
      },
      {
        session: 3,
        name: "أخذ الطبعة النهائية",
        duration: 45,
        fields: ["عدد الوحدات", "المادة", "اللون", "المختبر", "نوع الطبعة"]
      },
      {
        session: 4,
        name: "فحص وتركيب الجسر النهائي",
        duration: 45,
        fields: ["نوع التثبيت", "الإطباق", "فحص المفاصل"]
      }
    ]
  },
  {
    value: "IMPLANT",
    label: "زراعة",
    icon: "🦴",
    defaultSessions: 5,
    needsLab: true,
    basePrice: 2500000,
    sessionDetails: [
      {
        session: 1,
        name: "الفحص والتخطيط",
        duration: 30,
        fields: ["صورة بانوراما", "CT Scan", "تقييم العظم"]
      },
      {
        session: 2,
        name: "زراعة الجذر (Implant Placement)",
        duration: 90,
        fields: ["نوع الزرعة", "القطر", "الطول", "العمق", "نوع التخدير"],
        waitPeriod: "3-6 أشهر للالتئام"
      },
      {
        session: 3,
        name: "فحص الالتئام والاندماج",
        duration: 20,
        fields: ["صورة أشعة", "فحص الاستقرار"]
      },
      {
        session: 4,
        name: "تركيب Healing Abutment وأخذ الطبعة",
        duration: 45,
        fields: ["نوع Abutment", "الطبعة", "اللون", "المختبر"]
      },
      {
        session: 5,
        name: "تركيب التاج النهائي",
        duration: 30,
        fields: ["نوع التاج", "نوع التثبيت", "الإطباق"]
      }
    ]
  },
  {
    value: "ORTHODONTICS",
    label: "تقويم",
    icon: "🔗",
    defaultSessions: 24,
    needsLab: false,
    basePrice: 3500000,
    sessionDetails: [
      {
        session: 1,
        name: "الفحص والتشخيص",
        duration: 60,
        fields: ["صور الأشعة", "قوالب الأسنان", "الصور الشخصية", "تحليل الحالة"]
      },
      {
        session: 2,
        name: "شرح خطة العلاج",
        duration: 30,
        fields: ["نوع التقويم", "المدة المتوقعة", "التكلفة"]
      },
      {
        session: 3,
        name: "التركيب الأولي (Bonding)",
        duration: 120,
        fields: ["نوع التقويم", "نوع الأسلاك", "Brackets"]
      },
      {
        session: 4,
        name: "أول متابعة",
        duration: 30,
        fields: ["تغيير السلك", "الملاحظات"],
        waitPeriod: "4-6 أسابيع"
      },
      {
        session: 5,
        name: "متابعة دورية",
        duration: 25,
        fields: ["تعديل السلك", "المطاطات", "التقدم"],
        note: "تتكرر كل 4-6 أسابيع"
      }
    ]
  },
  {
    value: "CLEANING",
    label: "تنظيف",
    icon: "✨",
    defaultSessions: 1,
    needsLab: false,
    basePrice: 50000,
    sessionDetails: [
      { session: 1, name: "التنظيف", duration: 30, fields: ["نوع التنظيف"] }
    ]
  },
  {
    value: "WHITENING",
    label: "تبييض",
    icon: "💎",
    defaultSessions: 1,
    needsLab: false,
    basePrice: 400000,
    sessionDetails: [
      { session: 1, name: "التبييض", duration: 60, fields: ["نوع التبييض", "الدرجة"] }
    ]
  },
  {
    value: "DENTURE",
    label: "طقم أسنان جزئي متحرك",
    icon: "🦷",
    defaultSessions: 5,
    needsLab: true,
    basePrice: 1500000,
    sessionDetails: [
      {
        session: 1,
        name: "الطبعة الأولية",
        duration: 30,
        fields: ["نوع الطقم", "عدد الأسنان المفقودة", "المختبر"]
      },
      {
        session: 2,
        name: "عمل Special Tray",
        duration: 20,
        fields: ["نوع Special Tray", "المادة"]
      },
      {
        session: 3,
        name: "الطبعة النهائية",
        duration: 30,
        fields: ["نوع مادة الطبعة", "اللون"]
      },
      {
        session: 4,
        name: "التجربة الأولية",
        duration: 25,
        fields: ["فحص الإطباق", "اللون"]
      },
      {
        session: 5,
        name: "الاستلام والتسليم النهائي",
        duration: 30,
        fields: ["التعليمات", "المتابعة"]
      }
    ]
  },
  {
    value: "COMPLETE_DENTURE",
    label: "طقم كامل متحرك",
    icon: "🦷",
    defaultSessions: 6,
    needsLab: true,
    basePrice: 2000000,
    sessionDetails: [
      {
        session: 1,
        name: "الطبعة الأولية",
        duration: 30,
        fields: ["نوع الطقم (علوي/سفلي/كامل)", "المختبر"]
      },
      {
        session: 2,
        name: "عمل Special Tray",
        duration: 25,
        fields: ["نوع Special Tray", "المادة"]
      },
      {
        session: 3,
        name: "الطبعة النهائية وتسجيل العضة",
        duration: 40,
        fields: ["نوع مادة الطبعة", "Bite Registration"]
      },
      {
        session: 4,
        name: "تجربة الشمع (Wax Try-in)",
        duration: 30,
        fields: ["فحص الشكل", "اللون", "الإطباق"]
      },
      {
        session: 5,
        name: "التسليم الأولي",
        duration: 35,
        fields: ["الإطباق النهائي", "التعليمات"]
      },
      {
        session: 6,
        name: "المتابعة والتعديلات",
        duration: 20,
        fields: ["التعديلات المطلوبة", "ملاحظات المريض"]
      }
    ]
  },
]

interface ToothData {
  number: number
  condition: string
  previousTreatment?: string
  notes?: string
  conditionDetails?: {
    canalCount?: number
    workingLength?: number
    fileType?: string
  }
}

interface TreatmentPlanData {
  toothNumber: number
  treatmentType: string
  treatmentName: string
  condition: string
  price: number
  sessions: number
  needsLab: boolean
  doctorName?: string
  notes?: string
  sessionDetails: any[]
  customFields?: { [key: string]: string }
}

interface DentalChartProps {
  patientId: string
  teeth?: ToothData[]
  onUpdate?: (teeth: ToothData[]) => void
  onCreateTreatmentPlan?: (plan: TreatmentPlanData) => void
  doctorName?: string
}

export function DentalChart({
  patientId,
  teeth = [],
  onUpdate,
  onCreateTreatmentPlan,
  doctorName = "د. محمد أحمد"
}: DentalChartProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentTooth, setCurrentTooth] = useState<ToothData | null>(null)
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null)
  const [treatmentPrice, setTreatmentPrice] = useState<number>(0)
  const [treatmentNotes, setTreatmentNotes] = useState<string>("")
  const [customFields, setCustomFields] = useState<{ [key: string]: string }>({})

  const getToothData = (number: number): ToothData | undefined => {
    return teeth.find(t => t.number === number)
  }

  const getToothColor = (number: number): string => {
    const tooth = getToothData(number)
    if (!tooth) return "bg-white"
    const condition = toothConditions.find(c => c.value === tooth.condition)
    return condition?.color || "bg-white"
  }

  const handleToothClick = (number: number) => {
    setSelectedTooth(number)
    const existing = getToothData(number)
    setCurrentTooth(existing || { number, condition: "HEALTHY" })
    setSelectedTreatment(null)
    setTreatmentPrice(0)
    setTreatmentNotes("")
    setCustomFields({})
    setDialogOpen(true)
  }

  const handleTreatmentSelect = (treatmentValue: string) => {
    setSelectedTreatment(treatmentValue)
    const treatment = treatments.find(t => t.value === treatmentValue)
    if (treatment) {
      setTreatmentPrice(treatment.basePrice)
    }
  }

  const handleSaveToothState = () => {
    if (!currentTooth) return
    if (onUpdate) {
      const updatedTeeth = teeth.filter(t => t.number !== currentTooth.number)
      updatedTeeth.push(currentTooth)
      onUpdate(updatedTeeth)
    }
    setDialogOpen(false)
  }

  const handleCreateTreatmentPlan = () => {
    if (!currentTooth || !selectedTreatment) return

    const treatment = treatments.find(t => t.value === selectedTreatment)
    if (!treatment) return

    const planData: TreatmentPlanData = {
      toothNumber: currentTooth.number,
      treatmentType: selectedTreatment,
      treatmentName: treatment.label,
      condition: currentTooth.condition,
      price: treatmentPrice,
      sessions: treatment.defaultSessions,
      needsLab: treatment.needsLab,
      doctorName: doctorName,
      notes: treatmentNotes,
      sessionDetails: treatment.sessionDetails,
      customFields: customFields
    }

    if (onCreateTreatmentPlan) {
      onCreateTreatmentPlan(planData)
    }

    // Save tooth state as well
    handleSaveToothState()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const Tooth = ({ number, isUpper }: { number: number; isUpper: boolean }) => {
    const data = getToothData(number)
    const colorClass = getToothColor(number)

    return (
      <div className="flex flex-col items-center gap-1">
        {isUpper && <span className="text-xs text-muted-foreground">{number}</span>}
        <button
          onClick={() => handleToothClick(number)}
          className={cn(
            "w-8 h-12 rounded-md border-2 border-gray-300 transition-all hover:scale-110 hover:shadow-lg relative group",
            colorClass,
            selectedTooth === number && "ring-4 ring-primary ring-offset-2 scale-110"
          )}
        >
          {data && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></div>
          )}
        </button>
        {!isUpper && <span className="text-xs text-muted-foreground">{number}</span>}
      </div>
    )
  }

  return (
    <>
      <div className="space-y-8">
        {/* Upper Teeth */}
        <div className="space-y-2">
          <div className="text-center text-sm font-medium text-muted-foreground">الفك العلوي</div>
          <div className="flex justify-center gap-1">
            {upperTeeth.map(number => (
              <Tooth key={number} number={number} isUpper={true} />
            ))}
          </div>
        </div>

        <Separator />

        {/* Lower Teeth */}
        <div className="space-y-2">
          <div className="flex justify-center gap-1">
            {lowerTeeth.map(number => (
              <Tooth key={number} number={number} isUpper={false} />
            ))}
          </div>
          <div className="text-center text-sm font-medium text-muted-foreground">الفك السفلي</div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {toothConditions.map(condition => (
            <div key={condition.value} className="flex items-center gap-2">
              <div className={cn("w-4 h-4 rounded", condition.color)}></div>
              <span className="text-xs text-muted-foreground">{condition.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooth Details Dialog - Enhanced Professional Version */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {currentTooth?.number}
              </div>
              <div>
                <DialogTitle className="text-xl">تفاصيل السن رقم {currentTooth?.number}</DialogTitle>
                <DialogDescription>
                  حدد حالة السن والعلاج المطلوب - الطبيب المعالج: {doctorName}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {currentTooth && (
            <Tabs defaultValue="condition" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="condition">حالة السن</TabsTrigger>
                <TabsTrigger value="treatment">الخطة العلاجية</TabsTrigger>
              </TabsList>

              {/* Tab 1: Tooth Condition */}
              <TabsContent value="condition" className="space-y-6 mt-6">
                {/* Tooth Condition */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">حالة السن الحالية</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {toothConditions.map(condition => (
                      <button
                        key={condition.value}
                        onClick={() => setCurrentTooth({ ...currentTooth, condition: condition.value })}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-sm font-medium",
                          currentTooth.condition === condition.value
                            ? "border-primary bg-primary/10 shadow-lg scale-105"
                            : "border-gray-200 hover:border-primary/50 hover:shadow-md"
                        )}
                      >
                        <div className={cn("w-8 h-8 rounded-lg mx-auto mb-2", condition.color)}></div>
                        {condition.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Root Canal Specific Fields */}
                {currentTooth.condition === "ROOT_CANAL_TREATED" && (
                  <div className="space-y-4 p-4 rounded-xl bg-purple-50 border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-purple-900">تفاصيل معالجة العصب</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Canal Count */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">عدد القنوات</Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={currentTooth.conditionDetails?.canalCount || ""}
                          onChange={(e) => setCurrentTooth({
                            ...currentTooth,
                            conditionDetails: {
                              ...currentTooth.conditionDetails,
                              canalCount: Number(e.target.value)
                            }
                          })}
                          className="h-12 text-base"
                          placeholder="أدخل عدد القنوات"
                        />
                      </div>

                      {/* Working Length */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">طول العمل (مم)</Label>
                        <Input
                          type="number"
                          step="0.5"
                          min="0"
                          value={currentTooth.conditionDetails?.workingLength || ""}
                          onChange={(e) => setCurrentTooth({
                            ...currentTooth,
                            conditionDetails: {
                              ...currentTooth.conditionDetails,
                              workingLength: Number(e.target.value)
                            }
                          })}
                          className="h-12 text-base"
                          placeholder="أدخل طول العمل"
                        />
                      </div>
                    </div>

                    {/* File Type */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">نوع الملف</Label>
                      <select
                        value={currentTooth.conditionDetails?.fileType || ""}
                        onChange={(e) => setCurrentTooth({
                          ...currentTooth,
                          conditionDetails: {
                            ...currentTooth.conditionDetails,
                            fileType: e.target.value
                          }
                        })}
                        className="w-full h-12 rounded-lg border-2 border-input bg-white px-4 text-base"
                      >
                        <option value="">اختر نوع الملف</option>
                        <option value="Rotary">روتاري (Rotary)</option>
                        <option value="Hand">يدوي (Hand)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Previous Treatment */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">العلاج السابق (إن وجد)</Label>
                  <select
                    value={currentTooth.previousTreatment || ""}
                    onChange={(e) => setCurrentTooth({ ...currentTooth, previousTreatment: e.target.value })}
                    className="w-full h-12 rounded-lg border-2 border-input bg-background px-4 text-base"
                  >
                    <option value="">لا يوجد علاج سابق</option>
                    {treatments.map(treatment => (
                      <option key={treatment.value} value={treatment.value}>
                        {treatment.icon} {treatment.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* General Notes */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">ملاحظات عامة</Label>
                  <textarea
                    value={currentTooth.notes || ""}
                    onChange={(e) => setCurrentTooth({ ...currentTooth, notes: e.target.value })}
                    className="w-full min-h-[100px] rounded-lg border-2 border-input bg-background px-4 py-3 text-base"
                    placeholder="أضف أي ملاحظات حول حالة السن..."
                  />
                </div>
              </TabsContent>

              {/* Tab 2: Treatment Plan */}
              <TabsContent value="treatment" className="space-y-6 mt-6">
                {/* Required Treatment Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    اختر العلاج المطلوب
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {treatments.map(treatment => (
                      <button
                        key={treatment.value}
                        onClick={() => handleTreatmentSelect(treatment.value)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-sm font-medium text-right",
                          selectedTreatment === treatment.value
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-gray-200 hover:border-primary/50 hover:shadow-md"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{treatment.icon}</div>
                          <div className="flex-1">
                            <p className="font-bold">{treatment.label}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {treatment.defaultSessions} جلسة
                              {treatment.needsLab && (
                                <>
                                  <FlaskConical className="w-3 h-3 mr-2" />
                                  يحتاج مختبر
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Treatment Details (shown when treatment is selected) */}
                {selectedTreatment && (() => {
                  const treatment = treatments.find(t => t.value === selectedTreatment)
                  if (!treatment) return null

                  return (
                    <div className="space-y-6 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          تفاصيل العلاج: {treatment.label}
                        </h3>
                        <Badge variant="info" className="text-sm">
                          {treatment.defaultSessions} جلسة
                        </Badge>
                      </div>

                      {/* Session Details */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">تفاصيل الجلسات</Label>
                        <div className="space-y-2">
                          {treatment.sessionDetails.map((session: any, index: number) => (
                            <div key={index} className="p-3 rounded-lg bg-white border border-gray-200">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                                    {session.session}
                                  </div>
                                  <span className="font-semibold text-sm">{session.name}</span>
                                </div>
                                {session.duration && (
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="w-3 h-3 ml-1" />
                                    {session.duration} دقيقة
                                  </Badge>
                                )}
                              </div>
                              {session.options && (
                                <div className="mr-8 mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                                  <div className="text-xs font-semibold text-blue-900 mb-1">خيارات الجلسة:</div>
                                  <div className="flex flex-wrap gap-1">
                                    {session.options.map((option: string, optIndex: number) => (
                                      <Badge key={optIndex} variant="secondary" className="text-xs">
                                        {option}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {session.fields && (
                                <div className="text-xs text-muted-foreground mr-8 mt-2">
                                  الحقول المطلوبة: {session.fields.join(" • ")}
                                </div>
                              )}
                              {session.waitPeriod && (
                                <div className="text-xs text-orange-600 mr-8 mt-1">
                                  ⏰ فترة انتظار: {session.waitPeriod}
                                </div>
                              )}
                              {session.note && (
                                <div className="text-xs text-purple-600 mr-8 mt-1 italic">
                                  📝 {session.note}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Financial Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            التكلفة المتوقعة
                          </Label>
                          <Input
                            type="number"
                            value={treatmentPrice}
                            onChange={(e) => setTreatmentPrice(Number(e.target.value))}
                            className="h-12 text-lg font-bold"
                            placeholder="0"
                          />
                          <p className="text-xs text-muted-foreground">
                            السعر الافتراضي: {formatCurrency(treatment.basePrice)}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm flex items-center gap-1">
                            <User className="w-4 h-4" />
                            الطبيب المعالج
                          </Label>
                          <Input
                            value={doctorName}
                            disabled
                            className="h-12 text-base bg-gray-50"
                          />
                        </div>
                      </div>

                      {/* Lab Order */}
                      {treatment.needsLab && (
                        <div className="p-4 rounded-lg bg-purple-50 border-2 border-purple-200">
                          <div className="flex items-center gap-2 mb-2">
                            <FlaskConical className="w-5 h-5 text-purple-600" />
                            <span className="font-bold text-purple-900">يتطلب طلب مختبر</span>
                          </div>
                          <p className="text-sm text-purple-700">
                            سيتم إنشاء طلب مختبر تلقائياً عند إضافة الخطة العلاجية
                          </p>
                        </div>
                      )}

                      {/* Treatment Notes */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">ملاحظات العلاج</Label>
                        <textarea
                          value={treatmentNotes}
                          onChange={(e) => setTreatmentNotes(e.target.value)}
                          className="w-full min-h-[80px] rounded-lg border-2 border-input bg-white px-3 py-2 text-sm"
                          placeholder="ملاحظات خاصة بهذا العلاج، تعليمات للجلسات، إلخ..."
                        />
                      </div>
                    </div>
                  )
                })()}
              </TabsContent>
            </Tabs>
          )}

          <Separator className="my-4" />

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
              إلغاء
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveToothState}
              className="flex-1"
              disabled={!currentTooth}
            >
              <CheckCircle2 className="w-4 h-4 ml-2" />
              حفظ حالة السن
            </Button>
            <Button
              onClick={handleCreateTreatmentPlan}
              className="flex-1"
              disabled={!currentTooth || !selectedTreatment}
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة الخطة العلاجية
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
