"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Package,
  Plus,
  Edit,
  AlertTriangle,
  Wrench,
  TrendingDown,
  Calendar,
  DollarSign,
  Box,
  Activity
} from "lucide-react"

const INVENTORY_CATEGORIES = [
  { value: "GLOVES", label: "قفازات", icon: "🧤" },
  { value: "MASKS", label: "كمامات", icon: "😷" },
  { value: "FILLING", label: "حشوات", icon: "🦷" },
  { value: "ANESTHETIC", label: "تخدير", icon: "💉" },
  { value: "CLEANING", label: "تنظيف", icon: "🧼" },
  { value: "TOOLS", label: "أدوات", icon: "🔧" },
  { value: "OTHER", label: "أخرى", icon: "📦" },
]

const EQUIPMENT_TYPES = [
  { value: "DENTAL_CHAIR", label: "كرسي أسنان", icon: "🪑" },
  { value: "XRAY", label: "جهاز أشعة", icon: "📷" },
  { value: "STERILIZER", label: "جهاز تعقيم", icon: "🔬" },
  { value: "COMPRESSOR", label: "كومبريسر", icon: "⚙️" },
  { value: "SUCTION", label: "شفاط", icon: "💨" },
  { value: "ULTRASONIC", label: "جهاز موجات فوق صوتية", icon: "📡" },
  { value: "OTHER", label: "أخرى", icon: "🔧" },
]

export default function AssetsPage() {
  const [showInventoryDialog, setShowInventoryDialog] = useState(false)
  const [showEquipmentDialog, setShowEquipmentDialog] = useState(false)

  const inventory = [
    {
      id: "1",
      name: "قفازات نتريل - مقاس متوسط",
      category: "GLOVES",
      currentStock: 15,
      minStock: 30,
      unit: "علبة (100 قطعة)",
      pricePerUnit: 35000,
      supplier: "شركة الطب الحديث",
      lastPurchase: "2024-01-10",
      expiryDate: "2025-06-30",
    },
    {
      id: "2",
      name: "حشوة مركبة A2",
      category: "FILLING",
      currentStock: 45,
      minStock: 20,
      unit: "حقنة",
      pricePerUnit: 180000,
      supplier: "مؤسسة الابتسامة",
      lastPurchase: "2024-01-15",
      expiryDate: "2026-12-31",
    },
    {
      id: "3",
      name: "كمامات N95",
      category: "MASKS",
      currentStock: 8,
      minStock: 20,
      unit: "علبة (50 قطعة)",
      pricePerUnit: 90000,
      supplier: "شركة الطب الحديث",
      lastPurchase: "2024-01-05",
      expiryDate: "2027-01-31",
    },
    {
      id: "4",
      name: "مخدر موضعي - ليدوكائين 2%",
      category: "ANESTHETIC",
      currentStock: 120,
      minStock: 50,
      unit: "أمبولة",
      pricePerUnit: 15000,
      supplier: "المركز الطبي المتقدم",
      lastPurchase: "2024-01-12",
      expiryDate: "2025-03-31",
    },
  ]

  const equipment = [
    {
      id: "1",
      name: "كرسي أسنان إلكتروني",
      type: "DENTAL_CHAIR",
      manufacturer: "Sirona",
      model: "C4+",
      serialNumber: "SIR-2023-4567",
      purchaseDate: "2023-06-15",
      purchasePrice: 25000000,
      warrantyExpiry: "2026-06-15",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-07-10",
      status: "WORKING",
      notes: "صيانة دورية كل 6 أشهر",
    },
    {
      id: "2",
      name: "جهاز أشعة رقمي",
      type: "XRAY",
      manufacturer: "Planmeca",
      model: "ProX",
      serialNumber: "PLN-2023-8901",
      purchaseDate: "2023-08-20",
      purchasePrice: 35000000,
      warrantyExpiry: "2026-08-20",
      lastMaintenance: "2023-12-20",
      nextMaintenance: "2024-06-20",
      status: "WORKING",
      notes: "يحتاج معايرة سنوية",
    },
    {
      id: "3",
      name: "جهاز تعقيم أوتوكليف",
      type: "STERILIZER",
      manufacturer: "Melag",
      model: "Vacuklav 31B+",
      serialNumber: "MEL-2023-2345",
      purchaseDate: "2023-05-10",
      purchasePrice: 8500000,
      warrantyExpiry: "2025-05-10",
      lastMaintenance: "2024-01-05",
      nextMaintenance: "2024-04-05",
      status: "NEEDS_MAINTENANCE",
      notes: "صيانة دورية كل 3 أشهر",
    },
  ]

  const getCategoryInfo = (category: string) => {
    return INVENTORY_CATEGORIES.find(c => c.value === category) || INVENTORY_CATEGORIES[0]
  }

  const getTypeInfo = (type: string) => {
    return EQUIPMENT_TYPES.find(t => t.value === type) || EQUIPMENT_TYPES[0]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const isLowStock = (current: number, min: number) => current <= min
  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return expiry <= threeMonthsFromNow
  }

  const lowStockItems = inventory.filter(item => isLowStock(item.currentStock, item.minStock))
  const expiringItems = inventory.filter(item => isExpiringSoon(item.expiryDate))
  const needsMaintenanceEquipment = equipment.filter(eq => eq.status === "NEEDS_MAINTENANCE")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة الأصول</h2>
      </div>

      {/* Alerts */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className={lowStockItems.length > 0 ? "bento-card border-orange-500" : "bento-card"}>
          <CardContent className="p-4 text-center">
            <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${lowStockItems.length > 0 ? 'text-orange-600' : 'text-muted-foreground'}`} />
            <p className="text-2xl font-bold">{lowStockItems.length}</p>
            <p className="text-xs text-muted-foreground">مواد ناقصة</p>
          </CardContent>
        </Card>
        <Card className={expiringItems.length > 0 ? "bento-card border-red-500" : "bento-card"}>
          <CardContent className="p-4 text-center">
            <Calendar className={`w-8 h-8 mx-auto mb-2 ${expiringItems.length > 0 ? 'text-red-600' : 'text-muted-foreground'}`} />
            <p className="text-2xl font-bold">{expiringItems.length}</p>
            <p className="text-xs text-muted-foreground">مواد قاربت على الانتهاء</p>
          </CardContent>
        </Card>
        <Card className={needsMaintenanceEquipment.length > 0 ? "bento-card border-yellow-500" : "bento-card"}>
          <CardContent className="p-4 text-center">
            <Wrench className={`w-8 h-8 mx-auto mb-2 ${needsMaintenanceEquipment.length > 0 ? 'text-yellow-600' : 'text-muted-foreground'}`} />
            <p className="text-2xl font-bold">{needsMaintenanceEquipment.length}</p>
            <p className="text-xs text-muted-foreground">معدات تحتاج صيانة</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">
            <Package className="w-4 h-4 ml-2" />
            الجرد
          </TabsTrigger>
          <TabsTrigger value="equipment">
            <Wrench className="w-4 h-4 ml-2" />
            المعدات
          </TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">المواد الاستهلاكية</h3>
            <Dialog open={showInventoryDialog} onOpenChange={setShowInventoryDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مادة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة مادة جديدة للجرد</DialogTitle>
                  <DialogDescription>
                    أدخل تفاصيل المادة الاستهلاكية
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>الفئة</Label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                        {INVENTORY_CATEGORIES.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>اسم المادة</Label>
                      <Input placeholder="مثال: قفازات نتريل" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>الكمية الحالية</Label>
                      <Input type="number" placeholder="50" />
                    </div>
                    <div className="space-y-2">
                      <Label>الحد الأدنى</Label>
                      <Input type="number" placeholder="30" />
                    </div>
                    <div className="space-y-2">
                      <Label>الوحدة</Label>
                      <Input placeholder="علبة" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>السعر للوحدة</Label>
                      <Input type="number" placeholder="35000" />
                    </div>
                    <div className="space-y-2">
                      <Label>المورد</Label>
                      <Input placeholder="اسم المورد" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>تاريخ آخر شراء</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>تاريخ الانتهاء</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <Button className="w-full">حفظ المادة</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {inventory.map((item) => {
              const categoryInfo = getCategoryInfo(item.category)
              const lowStock = isLowStock(item.currentStock, item.minStock)
              const expiringSoon = isExpiringSoon(item.expiryDate)

              return (
                <Card key={item.id} className={`bento-card hover:shadow-lg transition-shadow ${lowStock ? 'border-orange-500' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lowStock ? 'from-orange-500 to-red-600' : 'from-blue-500 to-purple-600'} flex items-center justify-center text-2xl`}>
                        {categoryInfo.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{categoryInfo.label}</p>
                          </div>
                          {lowStock && (
                            <Badge variant="warning">
                              <TrendingDown className="w-3 h-3 ml-1" />
                              ناقص
                            </Badge>
                          )}
                          {expiringSoon && (
                            <Badge variant="destructive">
                              قارب على الانتهاء
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stock Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-3 rounded-lg ${lowStock ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
                        <p className="text-xs text-muted-foreground mb-1">الكمية الحالية</p>
                        <p className={`text-xl font-bold ${lowStock ? 'text-orange-700' : 'text-blue-700'}`}>
                          {item.currentStock} {item.unit}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="text-xs text-muted-foreground mb-1">الحد الأدنى</p>
                        <p className="text-xl font-bold text-gray-700">
                          {item.minStock} {item.unit}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">السعر</span>
                        <span className="font-medium">{formatCurrency(item.pricePerUnit)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">المورد</span>
                        <span className="font-medium">{item.supplier}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">آخر شراء</span>
                        <span className="font-medium">{item.lastPurchase}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">تاريخ الانتهاء</span>
                        <span className={`font-medium ${expiringSoon ? 'text-red-600' : ''}`}>
                          {item.expiryDate}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      <Button variant="default" size="sm" className="flex-1">
                        طلب شراء
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Equipment Tab */}
        <TabsContent value="equipment" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">المعدات والأجهزة</h3>
            <Dialog open={showEquipmentDialog} onOpenChange={setShowEquipmentDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة جهاز
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة جهاز جديد</DialogTitle>
                  <DialogDescription>
                    أدخل تفاصيل الجهاز أو المعدة
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>نوع الجهاز</Label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                        {EQUIPMENT_TYPES.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>اسم الجهاز</Label>
                      <Input placeholder="مثال: كرسي أسنان" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>الشركة المصنعة</Label>
                      <Input placeholder="Sirona" />
                    </div>
                    <div className="space-y-2">
                      <Label>الموديل</Label>
                      <Input placeholder="C4+" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>الرقم التسلسلي</Label>
                    <Input placeholder="SIR-2023-4567" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>تاريخ الشراء</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>سعر الشراء</Label>
                      <Input type="number" placeholder="25000000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>تاريخ انتهاء الضمان</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>ملاحظات</Label>
                    <textarea
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                      placeholder="ملاحظات حول الصيانة والاستخدام..."
                    />
                  </div>
                  <Button className="w-full">حفظ الجهاز</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            {equipment.map((item) => {
              const typeInfo = getTypeInfo(item.type)
              const needsMaintenance = item.status === "NEEDS_MAINTENANCE"
              const warrantyValid = new Date(item.warrantyExpiry) > new Date()

              return (
                <Card key={item.id} className={`bento-card hover:shadow-lg transition-shadow ${needsMaintenance ? 'border-yellow-500' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${needsMaintenance ? 'from-yellow-500 to-orange-600' : 'from-purple-500 to-blue-600'} flex items-center justify-center text-3xl`}>
                        {typeInfo.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <CardTitle className="text-xl">{item.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{item.manufacturer} - {item.model}</p>
                            <p className="text-xs text-muted-foreground mt-1">S/N: {item.serialNumber}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge variant={item.status === "WORKING" ? "success" : "warning"}>
                              {item.status === "WORKING" ? "يعمل" : "يحتاج صيانة"}
                            </Badge>
                            {warrantyValid && (
                              <Badge variant="info" className="text-xs">
                                تحت الضمان
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Purchase & Value */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-xs text-muted-foreground mb-1">قيمة الشراء</p>
                        <p className="text-lg font-bold text-green-700">
                          {formatCurrency(item.purchasePrice)}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-xs text-muted-foreground mb-1">تاريخ الشراء</p>
                        <p className="text-lg font-bold text-blue-700">
                          {item.purchaseDate}
                        </p>
                      </div>
                    </div>

                    {/* Warranty & Maintenance */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">انتهاء الضمان</span>
                        <span className={`font-medium ${!warrantyValid ? 'text-red-600' : ''}`}>
                          {item.warrantyExpiry}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">آخر صيانة</span>
                        <span className="font-medium">{item.lastMaintenance}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">الصيانة القادمة</span>
                        <span className={`font-medium ${needsMaintenance ? 'text-yellow-600' : ''}`}>
                          {item.nextMaintenance}
                        </span>
                      </div>
                    </div>

                    {/* Notes */}
                    {item.notes && (
                      <div className="p-3 rounded-lg bg-accent/30 text-sm">
                        <p className="text-muted-foreground text-xs mb-1">ملاحظات</p>
                        <p>{item.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Activity className="w-4 h-4 ml-1" />
                        سجل الصيانة
                      </Button>
                      {needsMaintenance && (
                        <Button variant="default" size="sm" className="flex-1">
                          جدولة صيانة
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
