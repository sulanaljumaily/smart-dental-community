"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
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
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  FlaskConical,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SavedLab {
  id: string
  labId?: string
  labName: string
  labPhone?: string
  labAddress?: string
  isInPlatform: boolean
  specializations?: string[]
  createdAt: string
}

export default function LabsSettingsPage() {
  const params = useParams()
  const clinicId = params.id as string

  const [labs, setLabs] = useState<SavedLab[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    labType: "custom", // custom or platform
    labId: "",
    customName: "",
    customPhone: "",
    customAddress: "",
  })

  useEffect(() => {
    fetchLabs()
  }, [clinicId])

  const fetchLabs = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/saved-labs?clinicId=${clinicId}`)
      const data = await response.json()

      if (data.success) {
        setLabs(data.labs)
      } else {
        setError(data.error || "حدث خطأ أثناء جلب المختبرات")
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب المختبرات")
    } finally {
      setLoading(false)
    }
  }

  const handleAddLab = async () => {
    setError("")
    setSuccess("")

    // Validation
    if (formData.labType === "custom") {
      if (!formData.customName || !formData.customPhone) {
        setError("يرجى إدخال اسم المختبر ورقم الهاتف")
        return
      }
    } else {
      if (!formData.labId) {
        setError("يرجى اختيار مختبر من المنصة")
        return
      }
    }

    try {
      const response = await fetch("/api/saved-labs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicId,
          labId: formData.labType === "platform" ? formData.labId : undefined,
          customName: formData.customName,
          customPhone: formData.customPhone,
          customAddress: formData.customAddress,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("تمت إضافة المختبر بنجاح")
        setShowAddDialog(false)
        setFormData({
          labType: "custom",
          labId: "",
          customName: "",
          customPhone: "",
          customAddress: "",
        })
        fetchLabs()
      } else {
        setError(data.error || "حدث خطأ أثناء إضافة المختبر")
      }
    } catch (err) {
      setError("حدث خطأ أثناء إضافة المختبر")
    }
  }

  const handleDeleteLab = async (labId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المختبر؟")) {
      return
    }

    try {
      const response = await fetch(`/api/saved-labs?id=${labId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("تم حذف المختبر بنجاح")
        fetchLabs()
      } else {
        setError(data.error || "حدث خطأ أثناء حذف المختبر")
      }
    } catch (err) {
      setError("حدث خطأ أثناء حذف المختبر")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-IQ")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FlaskConical className="w-12 h-12 mx-auto mb-4 text-purple-600 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل المختبرات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">المختبرات المحفوظة</h1>
          <p className="text-muted-foreground mt-1">
            إدارة قائمة المختبرات ومعامل الأسنان المفضلة
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة مختبر جديد
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المختبرات</p>
                <p className="text-2xl font-bold">{labs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">في المنصة</p>
                <p className="text-2xl font-bold">
                  {labs.filter((l) => l.isInPlatform).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">مخصصة</p>
                <p className="text-2xl font-bold">
                  {labs.filter((l) => !l.isInPlatform).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Labs Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المختبرات ({labs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم المختبر</TableHead>
                  <TableHead>رقم الهاتف</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>تاريخ الإضافة</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <FlaskConical className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">
                        لا توجد مختبرات محفوظة
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setShowAddDialog(true)}
                      >
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة أول مختبر
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  labs.map((lab) => (
                    <TableRow key={lab.id}>
                      <TableCell className="font-medium">{lab.labName}</TableCell>
                      <TableCell dir="ltr">{lab.labPhone || "-"}</TableCell>
                      <TableCell>{lab.labAddress || "-"}</TableCell>
                      <TableCell>
                        {lab.isInPlatform ? (
                          <Badge variant="success">في المنصة</Badge>
                        ) : (
                          <Badge variant="secondary">مخصص</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(lab.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteLab(lab.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Lab Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة مختبر جديد</DialogTitle>
            <DialogDescription>
              أضف مختبر أو معمل أسنان إلى قائمتك المفضلة
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Lab Type - Hidden for now, only custom */}
            <div className="space-y-2">
              <Label>اسم المختبر *</Label>
              <Input
                value={formData.customName}
                onChange={(e) =>
                  setFormData({ ...formData, customName: e.target.value })
                }
                placeholder="مختبر الأسنان المتطور"
              />
            </div>

            <div className="space-y-2">
              <Label>رقم الهاتف *</Label>
              <Input
                value={formData.customPhone}
                onChange={(e) =>
                  setFormData({ ...formData, customPhone: e.target.value })
                }
                placeholder="07701234567"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label>العنوان (اختياري)</Label>
              <Input
                value={formData.customAddress}
                onChange={(e) =>
                  setFormData({ ...formData, customAddress: e.target.value })
                }
                placeholder="بغداد - الكرادة"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddLab}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
