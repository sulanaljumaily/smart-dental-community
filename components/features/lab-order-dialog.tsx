"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FlaskConical, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LabOrderDialogProps {
  open: boolean
  onClose: () => void
  treatmentPlanId: string
  treatmentType: string
  patientName: string
  savedLabs?: Array<{
    id: string
    labName: string
    labPhone?: string
    isInPlatform: boolean
  }>
}

export function LabOrderDialog({
  open,
  onClose,
  treatmentPlanId,
  treatmentType,
  patientName,
  savedLabs = [],
}: LabOrderDialogProps) {
  const [formData, setFormData] = useState({
    labType: "saved", // saved, custom, platform
    selectedLabId: "",
    customLabName: "",
    customLabPhone: "",
    orderType: getDefaultOrderType(treatmentType),
    description: "",
    specifications: "",
    amount: "",
    dueDate: "",
    createTask: true,
    sendNotification: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  function getDefaultOrderType(type: string) {
    const typeMap: Record<string, string> = {
      CROWN: "تاج خزفي",
      BRIDGE: "جسر أسنان",
      IMPLANT: "تاج زراعة",
      DENTURE: "طقم أسنان",
      ORTHODONTICS: "جهاز تقويمي",
    }
    return typeMap[type] || "طلب مختبر"
  }

  const handleSubmit = async () => {
    setError("")
    setSuccess(false)

    // Validation
    if (!formData.orderType) {
      setError("يرجى تحديد نوع الطلب")
      return
    }

    if (formData.labType === "saved" && !formData.selectedLabId) {
      setError("يرجى اختيار مختبر من القائمة")
      return
    }

    if (formData.labType === "custom") {
      if (!formData.customLabName) {
        setError("يرجى إدخال اسم المختبر")
        return
      }
      if (!formData.customLabPhone) {
        setError("يرجى إدخال رقم هاتف المختبر")
        return
      }
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError("يرجى إدخال المبلغ")
      return
    }

    if (!formData.dueDate) {
      setError("يرجى تحديد تاريخ الاستلام")
      return
    }

    setIsSubmitting(true)

    try {
      const selectedLab = savedLabs.find((lab) => lab.id === formData.selectedLabId)

      const requestData: any = {
        orderType: formData.orderType,
        description: formData.description || `طلب ${formData.orderType} للمريض ${patientName}`,
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate,
        createTask: formData.createTask,
        sendNotification: formData.sendNotification && selectedLab?.isInPlatform,
      }

      // Add specifications if provided
      if (formData.specifications) {
        requestData.specifications = {
          notes: formData.specifications,
        }
      }

      // Determine lab details
      if (formData.labType === "saved" && selectedLab) {
        if (selectedLab.isInPlatform) {
          requestData.labId = formData.selectedLabId
        } else {
          requestData.customLabName = selectedLab.labName
          requestData.customLabPhone = selectedLab.labPhone
        }
      } else if (formData.labType === "custom") {
        requestData.customLabName = formData.customLabName
        requestData.customLabPhone = formData.customLabPhone
      }

      const response = await fetch(
        `/api/treatment-plans/${treatmentPlanId}/lab-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "فشل إنشاء طلب المختبر")
      }

      setSuccess(true)

      // Close dialog after a short delay
      setTimeout(() => {
        onClose()
        window.location.reload() // Refresh to show new lab order
      }, 1500)
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء إنشاء طلب المختبر")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-600" />
            طلب مختبر جديد
          </DialogTitle>
          <DialogDescription>
            إنشاء طلب مختبر للمريض {patientName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                تم إنشاء طلب المختبر بنجاح!
              </AlertDescription>
            </Alert>
          )}

          {/* Lab Selection */}
          <div className="space-y-2">
            <Label>اختيار المختبر</Label>
            <Select
              value={formData.labType}
              onValueChange={(value) =>
                setFormData({ ...formData, labType: value, selectedLabId: "" })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saved">من المختبرات المحفوظة</SelectItem>
                <SelectItem value="custom">مختبر جديد</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.labType === "saved" && (
            <div className="space-y-2">
              <Label>المختبر</Label>
              <Select
                value={formData.selectedLabId}
                onValueChange={(value) => setFormData({ ...formData, selectedLabId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر مختبر" />
                </SelectTrigger>
                <SelectContent>
                  {savedLabs.length === 0 ? (
                    <div className="p-3 text-sm text-muted-foreground text-center">
                      لا توجد مختبرات محفوظة
                    </div>
                  ) : (
                    savedLabs.map((lab) => (
                      <SelectItem key={lab.id} value={lab.id}>
                        {lab.labName}
                        {lab.isInPlatform && (
                          <span className="text-green-600 text-xs mr-2">• في المنصة</span>
                        )}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.labType === "custom" && (
            <>
              <div className="space-y-2">
                <Label>اسم المختبر</Label>
                <Input
                  value={formData.customLabName}
                  onChange={(e) =>
                    setFormData({ ...formData, customLabName: e.target.value })
                  }
                  placeholder="مختبر الأسنان المتطور"
                />
              </div>

              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input
                  value={formData.customLabPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, customLabPhone: e.target.value })
                  }
                  placeholder="07701234567"
                  dir="ltr"
                />
              </div>
            </>
          )}

          {/* Order Details */}
          <div className="space-y-2">
            <Label>نوع الطلب</Label>
            <Input
              value={formData.orderType}
              onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
              placeholder="مثال: تاج خزفي، جسر، طقم أسنان"
            />
          </div>

          <div className="space-y-2">
            <Label>الوصف والملاحظات</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="أضف تفاصيل إضافية عن الطلب..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>المواصفات الفنية</Label>
            <Textarea
              value={formData.specifications}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              placeholder="مثال: اللون A2، نوع التاج زيركون، القياسات..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>المبلغ (د.ع)</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="150000"
              />
            </div>

            <div className="space-y-2">
              <Label>تاريخ الاستلام المتوقع</Label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.createTask}
                onChange={(e) =>
                  setFormData({ ...formData, createTask: e.target.checked })
                }
                className="w-4 h-4"
              />
              <span className="text-sm">إنشاء مهمة تذكير تلقائياً</span>
            </label>

            {savedLabs.find((l) => l.id === formData.selectedLabId)?.isInPlatform && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendNotification}
                  onChange={(e) =>
                    setFormData({ ...formData, sendNotification: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">إرسال إشعار للمختبر</span>
              </label>
            )}
          </div>

          {/* Platform Fee Notice */}
          {savedLabs.find((l) => l.id === formData.selectedLabId)?.isInPlatform && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-sm text-blue-800">
                ℹ️ سيتم احتساب نسبة المنصة 5% من المبلغ الإجمالي للمختبرات المسجلة في المنصة.
              </AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || success}
              className="flex-1"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
