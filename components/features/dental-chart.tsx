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

const treatments = [
  { value: "FILLING", label: "حشوة" },
  { value: "ROOT_CANAL", label: "علاج عصب" },
  { value: "EXTRACTION", label: "خلع" },
  { value: "CROWN", label: "تاج" },
  { value: "BRIDGE", label: "جسر" },
  { value: "IMPLANT", label: "زراعة" },
  { value: "ORTHODONTICS", label: "تقويم" },
  { value: "CLEANING", label: "تنظيف" },
  { value: "WHITENING", label: "تبييض" },
  { value: "DENTURE", label: "طقم أسنان" },
]

interface ToothData {
  number: number
  condition: string
  previousTreatment?: string
  notes?: string
}

interface DentalChartProps {
  patientId: string
  teeth?: ToothData[]
  onUpdate?: (teeth: ToothData[]) => void
}

export function DentalChart({ patientId, teeth = [], onUpdate }: DentalChartProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentTooth, setCurrentTooth] = useState<ToothData | null>(null)

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
    setDialogOpen(true)
  }

  const handleSaveToothState = () => {
    if (!currentTooth) return
    // TODO: Save tooth state only
    console.log("Saving tooth state:", currentTooth)
    setDialogOpen(false)
  }

  const handleSaveTreatmentPlan = () => {
    if (!currentTooth) return
    // TODO: Save and create treatment plan
    console.log("Creating treatment plan:", currentTooth)
    setDialogOpen(false)
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

      {/* Tooth Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل السن رقم {currentTooth?.number}</DialogTitle>
            <DialogDescription>
              حدد حالة السن والعلاج المطلوب
            </DialogDescription>
          </DialogHeader>

          {currentTooth && (
            <div className="space-y-6 py-4">
              {/* Tooth Condition */}
              <div className="space-y-3">
                <Label>حالة السن</Label>
                <div className="grid grid-cols-3 gap-2">
                  {toothConditions.map(condition => (
                    <button
                      key={condition.value}
                      onClick={() => setCurrentTooth({ ...currentTooth, condition: condition.value })}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all text-sm font-medium",
                        currentTooth.condition === condition.value
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary/50"
                      )}
                    >
                      <div className={cn("w-6 h-6 rounded mx-auto mb-2", condition.color)}></div>
                      {condition.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Previous Treatment */}
              <div className="space-y-3">
                <Label>العلاج السابق (إن وجد)</Label>
                <select
                  value={currentTooth.previousTreatment || ""}
                  onChange={(e) => setCurrentTooth({ ...currentTooth, previousTreatment: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3"
                >
                  <option value="">لا يوجد</option>
                  {treatments.map(treatment => (
                    <option key={treatment.value} value={treatment.value}>
                      {treatment.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Required Treatment */}
              <div className="space-y-3">
                <Label>العلاج المطلوب</Label>
                <div className="grid grid-cols-2 gap-2">
                  {treatments.map(treatment => (
                    <button
                      key={treatment.value}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all text-sm font-medium hover:border-primary/50 border-gray-200"
                      )}
                    >
                      {treatment.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Treatment-Specific Fields (shown when treatment is selected) */}
              {/* TODO: Add dynamic fields based on selected treatment */}

              {/* Notes */}
              <div className="space-y-3">
                <Label>ملاحظات</Label>
                <textarea
                  value={currentTooth.notes || ""}
                  onChange={(e) => setCurrentTooth({ ...currentTooth, notes: e.target.value })}
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                  placeholder="أضف ملاحظات إضافية..."
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="outline" onClick={handleSaveToothState}>
              حفظ حالة السن فقط
            </Button>
            <Button onClick={handleSaveTreatmentPlan}>
              حفظ الخطة العلاجية
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
