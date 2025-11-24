"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Save, X } from "lucide-react"

interface SessionDetailsFormProps {
  session: any
  treatmentType: string
  onSave: (data: any) => Promise<void>
  onCancel: () => void
}

export function SessionDetailsForm({
  session,
  treatmentType,
  onSave,
  onCancel,
}: SessionDetailsFormProps) {
  const [formData, setFormData] = useState({
    notes: session.notes || "",
    status: session.status || "SCHEDULED",

    // Root Canal fields
    rootCanals: session.rootCanals || "",
    canalLength: session.canalLength || "",
    filesUsed: session.filesUsed || [],
    rootFillingType: session.rootFillingType || "",
    rootFillingLength: session.rootFillingLength || "",
    finalFillingType: session.finalFillingType || "",

    // Crown/Bridge fields
    crownType: session.crownType || "",
    crownColor: session.crownColor || "",
    bridgeSpan: session.bridgeSpan || "",
    postAndCore: session.postAndCore || false,
    needsCrownCoverage: session.needsCrownCoverage || false,

    // Orthodontics fields
    bracketType: session.bracketType || "",
    archWireSize: session.archWireSize || "",
    elasticType: session.elasticType || "",
    tighteningAmount: session.tighteningAmount || "",

    // Implant fields
    implantBrand: session.implantBrand || "",
    implantDiameter: session.implantDiameter || "",
    implantLength: session.implantLength || "",
    healingPeriod: session.healingPeriod || "",
    abutmentType: session.abutmentType || "",

    // General
    materials: session.materials || [],
    stage: session.stage || "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [fileInput, setFileInput] = useState("")
  const [materialInput, setMaterialInput] = useState("")

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(formData)
    } finally {
      setIsSaving(false)
    }
  }

  const addFile = () => {
    if (fileInput.trim()) {
      setFormData({
        ...formData,
        filesUsed: [...formData.filesUsed, fileInput.trim()],
      })
      setFileInput("")
    }
  }

  const removeFile = (index: number) => {
    setFormData({
      ...formData,
      filesUsed: formData.filesUsed.filter((_, i) => i !== index),
    })
  }

  const addMaterial = () => {
    if (materialInput.trim()) {
      setFormData({
        ...formData,
        materials: [...formData.materials, materialInput.trim()],
      })
      setMaterialInput("")
    }
  }

  const removeMaterial = (index: number) => {
    setFormData({
      ...formData,
      materials: formData.materials.filter((_, i) => i !== index),
    })
  }

  return (
    <Card className="bento-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>تفاصيل الجلسة {session.sessionNumber}</CardTitle>
          <Badge variant={
            session.status === "COMPLETED" ? "success" :
            session.status === "IN_PROGRESS" ? "info" : "secondary"
          }>
            {session.status === "COMPLETED" ? "مكتملة" :
             session.status === "IN_PROGRESS" ? "جارية" :
             session.status === "SCHEDULED" ? "مجدولة" : "ملغاة"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status and Notes */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>حالة الجلسة</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SCHEDULED">مجدولة</SelectItem>
                  <SelectItem value="IN_PROGRESS">جارية</SelectItem>
                  <SelectItem value="COMPLETED">مكتملة</SelectItem>
                  <SelectItem value="CANCELLED">ملغاة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>المرحلة</Label>
              <Input
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                placeholder="مثال: التحضير، التنفيذ، الإنهاء"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>ملاحظات</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="أضف ملاحظات حول الجلسة..."
              rows={3}
            />
          </div>
        </div>

        {/* Root Canal Treatment Fields */}
        {treatmentType === "ROOT_CANAL" && (
          <div className="space-y-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-blue-900">تفاصيل علاج العصب</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>عدد قنوات العصب</Label>
                <Input
                  type="number"
                  value={formData.rootCanals}
                  onChange={(e) => setFormData({ ...formData, rootCanals: e.target.value })}
                  placeholder="مثال: 3"
                />
              </div>

              <div className="space-y-2">
                <Label>طول القناة/العصب</Label>
                <Input
                  value={formData.canalLength}
                  onChange={(e) => setFormData({ ...formData, canalLength: e.target.value })}
                  placeholder="مثال: 21mm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>الملفات المستخدمة</Label>
              <div className="flex gap-2">
                <Input
                  value={fileInput}
                  onChange={(e) => setFileInput(e.target.value)}
                  placeholder="مثال: #15"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFile())}
                />
                <Button type="button" onClick={addFile} variant="outline">
                  إضافة
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.filesUsed.map((file, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {file}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeFile(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع حشو العصب</Label>
                <Select
                  value={formData.rootFillingType}
                  onValueChange={(value) => setFormData({ ...formData, rootFillingType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الحشو" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gutta-percha">Gutta-percha</SelectItem>
                    <SelectItem value="MTA">MTA</SelectItem>
                    <SelectItem value="Resin-based">Resin-based</SelectItem>
                    <SelectItem value="Other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>طول حشو العصب</Label>
                <Input
                  value={formData.rootFillingLength}
                  onChange={(e) => setFormData({ ...formData, rootFillingLength: e.target.value })}
                  placeholder="مثال: 21mm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>نوع الحشوة النهائية</Label>
              <Select
                value={formData.finalFillingType}
                onValueChange={(value) => setFormData({ ...formData, finalFillingType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الحشوة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Simple">حشوة عادية</SelectItem>
                  <SelectItem value="Complex">حشوة معقدة</SelectItem>
                  <SelectItem value="Crown">تركيبة/تاج</SelectItem>
                  <SelectItem value="PostAndCore">Post and Core</SelectItem>
                  <SelectItem value="PostAndCoreCrown">Post and Core + Crown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Crown/Bridge Fields */}
        {(treatmentType === "CROWN" || treatmentType === "BRIDGE") && (
          <div className="space-y-4 p-4 rounded-lg bg-purple-50 border border-purple-200">
            <h4 className="font-semibold text-purple-900">تفاصيل التركيبات</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع التاج/التركيبة</Label>
                <Select
                  value={formData.crownType}
                  onValueChange={(value) => setFormData({ ...formData, crownType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ceramic">خزفي كامل</SelectItem>
                    <SelectItem value="PFM">معدن مغطى بالبورسلين (PFM)</SelectItem>
                    <SelectItem value="Zirconia">زيركون</SelectItem>
                    <SelectItem value="Metal">معدني</SelectItem>
                    <SelectItem value="Emax">E-max</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>اللون</Label>
                <Input
                  value={formData.crownColor}
                  onChange={(e) => setFormData({ ...formData, crownColor: e.target.value })}
                  placeholder="مثال: A2, B1"
                />
              </div>
            </div>

            {treatmentType === "BRIDGE" && (
              <div className="space-y-2">
                <Label>نطاق الجسر</Label>
                <Input
                  value={formData.bridgeSpan}
                  onChange={(e) => setFormData({ ...formData, bridgeSpan: e.target.value })}
                  placeholder="مثال: من سن 14 إلى سن 16"
                />
              </div>
            )}

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.postAndCore}
                  onChange={(e) => setFormData({ ...formData, postAndCore: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>يحتاج Post and Core</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.needsCrownCoverage}
                  onChange={(e) => setFormData({ ...formData, needsCrownCoverage: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>يحتاج تغطية بالتاج</span>
              </label>
            </div>
          </div>
        )}

        {/* Orthodontics Fields */}
        {treatmentType === "ORTHODONTICS" && (
          <div className="space-y-4 p-4 rounded-lg bg-green-50 border border-green-200">
            <h4 className="font-semibold text-green-900">تفاصيل التقويم</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع التقويم</Label>
                <Select
                  value={formData.bracketType}
                  onValueChange={(value) => setFormData({ ...formData, bracketType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Metal">معدني</SelectItem>
                    <SelectItem value="Ceramic">خزفي</SelectItem>
                    <SelectItem value="Clear">شفاف</SelectItem>
                    <SelectItem value="Lingual">لساني</SelectItem>
                    <SelectItem value="Invisalign">Invisalign</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>حجم السلك</Label>
                <Input
                  value={formData.archWireSize}
                  onChange={(e) => setFormData({ ...formData, archWireSize: e.target.value })}
                  placeholder="مثال: 0.014, 0.016"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع المطاط</Label>
                <Input
                  value={formData.elasticType}
                  onChange={(e) => setFormData({ ...formData, elasticType: e.target.value })}
                  placeholder="مثال: 3/16 Medium"
                />
              </div>

              <div className="space-y-2">
                <Label>مقدار الشد</Label>
                <Input
                  value={formData.tighteningAmount}
                  onChange={(e) => setFormData({ ...formData, tighteningAmount: e.target.value })}
                  placeholder="مثال: خفيف، متوسط، قوي"
                />
              </div>
            </div>
          </div>
        )}

        {/* Implant Fields */}
        {treatmentType === "IMPLANT" && (
          <div className="space-y-4 p-4 rounded-lg bg-orange-50 border border-orange-200">
            <h4 className="font-semibold text-orange-900">تفاصيل الزراعة</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ماركة الزرعة</Label>
                <Input
                  value={formData.implantBrand}
                  onChange={(e) => setFormData({ ...formData, implantBrand: e.target.value })}
                  placeholder="مثال: Straumann, Nobel"
                />
              </div>

              <div className="space-y-2">
                <Label>قطر الزرعة</Label>
                <Input
                  value={formData.implantDiameter}
                  onChange={(e) => setFormData({ ...formData, implantDiameter: e.target.value })}
                  placeholder="مثال: 4.1mm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>طول الزرعة</Label>
                <Input
                  value={formData.implantLength}
                  onChange={(e) => setFormData({ ...formData, implantLength: e.target.value })}
                  placeholder="مثال: 10mm"
                />
              </div>

              <div className="space-y-2">
                <Label>فترة الالتئام</Label>
                <Input
                  value={formData.healingPeriod}
                  onChange={(e) => setFormData({ ...formData, healingPeriod: e.target.value })}
                  placeholder="مثال: 3-6 أشهر"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>نوع الدعامة</Label>
              <Input
                value={formData.abutmentType}
                onChange={(e) => setFormData({ ...formData, abutmentType: e.target.value })}
                placeholder="مثال: Titanium, Zirconia"
              />
            </div>
          </div>
        )}

        {/* Materials */}
        <div className="space-y-2">
          <Label>المواد المستخدمة</Label>
          <div className="flex gap-2">
            <Input
              value={materialInput}
              onChange={(e) => setMaterialInput(e.target.value)}
              placeholder="أضف مادة..."
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMaterial())}
            />
            <Button type="button" onClick={addMaterial} variant="outline">
              إضافة
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.materials.map((material, index) => (
              <Badge key={index} variant="outline" className="gap-1">
                {material}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => removeMaterial(index)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} disabled={isSaving} className="flex-1">
            <Save className="w-4 h-4 ml-2" />
            {isSaving ? "جاري الحفظ..." : "حفظ التفاصيل"}
          </Button>
          <Button onClick={onCancel} variant="outline" disabled={isSaving}>
            إلغاء
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
