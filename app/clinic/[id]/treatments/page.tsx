"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Stethoscope, Plus, Edit, DollarSign, Clock } from "lucide-react"

const TREATMENT_TYPES = [
  { value: "FILLING", label: "حشوة", icon: "🦷" },
  { value: "ROOT_CANAL", label: "علاج عصب", icon: "⚕️" },
  { value: "EXTRACTION", label: "خلع", icon: "🔧" },
  { value: "CROWN", label: "تاج", icon: "👑" },
  { value: "BRIDGE", label: "جسر", icon: "🌉" },
  { value: "IMPLANT", label: "زراعة", icon: "🦴" },
  { value: "ORTHODONTICS", label: "تقويم", icon: "🔗" },
  { value: "CLEANING", label: "تنظيف", icon: "✨" },
  { value: "WHITENING", label: "تبييض", icon: "💎" },
  { value: "DENTURE", label: "طقم أسنان", icon: "🦷" },
]

export default function TreatmentsPage() {
  const [showDialog, setShowDialog] = useState(false)

  const treatments = [
    {
      id: "1",
      name: "حشوة تجميلية",
      type: "FILLING",
      price: 150000,
      defaultSessions: 1,
      description: "حشوة مركبة بلون الأسنان",
      isActive: true,
      sessionDetails: {
        session1: { name: "الحشوة", duration: 30 }
      }
    },
    {
      id: "2",
      name: "علاج عصب",
      type: "ROOT_CANAL",
      price: 750000,
      defaultSessions: 3,
      description: "علاج عصب كامل",
      isActive: true,
      sessionDetails: {
        session1: { name: "فتح وتنظيف", duration: 60, details: ["طول الجذور", "الملفات المستخدمة"] },
        session2: { name: "حشو مؤقت", duration: 45, details: ["الملفات", "المادة الحاشية"] },
        session3: { name: "الحشوة النهائية", duration: 45, details: ["نوع الحشوة"] }
      }
    },
    {
      id: "3",
      name: "تاج خزفي",
      type: "CROWN",
      price: 1200000,
      defaultSessions: 2,
      description: "تاج خزفي كامل",
      isActive: true,
      needsLab: true,
      sessionDetails: {
        session1: { name: "تحضير وطبعة", duration: 60, details: ["نوع التاج", "اللون"] },
        session2: { name: "التركيب", duration: 30 }
      }
    },
    {
      id: "4",
      name: "زراعة سن",
      type: "IMPLANT",
      price: 2500000,
      defaultSessions: 3,
      description: "زراعة كاملة مع التاج",
      isActive: true,
      needsLab: true,
      sessionDetails: {
        session1: { name: "زراعة الجذر", duration: 90, details: ["نوع الزرعة", "القطر", "الطول"] },
        session2: { name: "فحص الالتئام", duration: 20, waitPeriod: "3-6 أشهر" },
        session3: { name: "التاج النهائي", duration: 45, details: ["نوع التاج"] }
      }
    },
    {
      id: "5",
      name: "تقويم أسنان",
      type: "ORTHODONTICS",
      price: 3500000,
      defaultSessions: 24,
      description: "تقويم معدني كامل",
      isActive: true,
      sessionDetails: {
        session1: { name: "التركيب الأولي", duration: 120 },
        recurring: { name: "جلسة شد", duration: 30, frequency: "شهرياً" }
      }
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة العلاجات</h2>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة علاج
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة علاج جديد</DialogTitle>
              <DialogDescription>
                حدد تفاصيل العلاج والجلسات الافتراضية
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>نوع العلاج</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option value="">اختر النوع</option>
                    {TREATMENT_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>اسم العلاج</Label>
                  <Input placeholder="مثال: حشوة تجميلية" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>الوصف</Label>
                <textarea
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                  placeholder="وصف مختصر للعلاج..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>السعر الافتراضي</Label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="number" placeholder="150000" className="pr-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>عدد الجلسات</Label>
                  <Input type="number" defaultValue="1" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="needsLab" className="rounded" />
                <Label htmlFor="needsLab">يحتاج طلب مختبر</Label>
              </div>

              <Button className="w-full">حفظ العلاج</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Treatments Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {treatments.map((treatment) => {
          const typeInfo = TREATMENT_TYPES.find(t => t.value === treatment.type)

          return (
            <Card key={treatment.id} className="bento-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                      {typeInfo?.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{treatment.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{typeInfo?.label}</p>
                    </div>
                  </div>
                  <Badge variant={treatment.isActive ? "success" : "secondary"}>
                    {treatment.isActive ? "نشط" : "غير نشط"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{treatment.description}</p>

                {/* Price & Sessions */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-xs text-muted-foreground mb-1">السعر</p>
                    <p className="text-lg font-bold text-green-700">
                      {formatCurrency(treatment.price)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-xs text-muted-foreground mb-1">الجلسات</p>
                    <p className="text-lg font-bold text-blue-700">
                      {treatment.defaultSessions}
                    </p>
                  </div>
                </div>

                {/* Session Details */}
                {treatment.sessionDetails && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">تفاصيل الجلسات</p>
                    <div className="space-y-2">
                      {Object.entries(treatment.sessionDetails).map(([key, session]: [string, any]) => (
                        <div key={key} className="p-2 rounded-lg bg-accent/30 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{session.name}</span>
                            {session.duration && (
                              <Badge variant="outline" className="text-xs">
                                <Clock className="w-3 h-3 ml-1" />
                                {session.duration} دقيقة
                              </Badge>
                            )}
                          </div>
                          {session.details && (
                            <div className="mt-1 text-xs text-muted-foreground">
                              {session.details.join(" • ")}
                            </div>
                          )}
                          {session.waitPeriod && (
                            <div className="mt-1 text-xs text-orange-600">
                              ⏰ فترة انتظار: {session.waitPeriod}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {treatment.needsLab && (
                  <Badge variant="info" className="w-full justify-center">
                    يتطلب طلب مختبر
                  </Badge>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 ml-1" />
                    تعديل
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    {treatment.isActive ? "تعطيل" : "تفعيل"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {treatments.length === 0 && (
        <Card className="bento-card">
          <CardContent className="p-12 text-center">
            <Stethoscope className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">لا توجد علاجات</h3>
            <p className="text-muted-foreground mb-4">
              ابدأ بإضافة العلاجات المتوفرة في عيادتك
            </p>
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة علاج
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
