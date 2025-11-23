"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Package,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Search,
  Filter,
  Download,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function InventoryPage() {
  const [showAdjustDialog, setShowAdjustDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Inventory Stats
  const stats = {
    totalProducts: 245,
    lowStock: 8,
    outOfStock: 3,
    totalValue: 125000000,
  }

  // Products
  const products = [
    {
      id: "1",
      name: "قفازات نتريل - 100 قطعة",
      sku: "GLV-NTR-100",
      category: "معدات طبية",
      currentStock: 450,
      minStock: 100,
      maxStock: 1000,
      price: 35000,
      cost: 25000,
      unitsSold: 234,
      status: "IN_STOCK",
      lastRestocked: "2024-01-15",
      supplier: "شركة المعدات الطبية",
    },
    {
      id: "2",
      name: "كمامات N95 - عبوة 50",
      sku: "MSK-N95-50",
      category: "معدات طبية",
      currentStock: 12,
      minStock: 50,
      maxStock: 500,
      price: 90000,
      cost: 65000,
      unitsSold: 189,
      status: "LOW_STOCK",
      lastRestocked: "2024-01-10",
      supplier: "شركة الحماية الطبية",
    },
    {
      id: "3",
      name: "حشوة مركبة A2",
      sku: "FIL-CMP-A2",
      category: "مواد استهلاكية",
      currentStock: 78,
      minStock: 30,
      maxStock: 200,
      price: 180000,
      cost: 140000,
      unitsSold: 156,
      status: "IN_STOCK",
      lastRestocked: "2024-01-18",
      supplier: "شركة المواد السنية",
    },
    {
      id: "4",
      name: "إبر التخدير - عبوة 100",
      sku: "NDL-ANS-100",
      category: "أدوات طبية",
      currentStock: 0,
      minStock: 50,
      maxStock: 300,
      price: 120000,
      cost: 85000,
      unitsSold: 98,
      status: "OUT_OF_STOCK",
      lastRestocked: "2024-01-05",
      supplier: "شركة الأدوات الطبية",
    },
    {
      id: "5",
      name: "محلول تعقيم - 5 لتر",
      sku: "STR-SOL-5L",
      category: "تعقيم",
      currentStock: 34,
      minStock: 20,
      maxStock: 100,
      price: 95000,
      cost: 70000,
      unitsSold: 145,
      status: "IN_STOCK",
      lastRestocked: "2024-01-20",
      supplier: "شركة التعقيم المتقدمة",
    },
    {
      id: "6",
      name: "خيط أسنان طبي - عبوة 200",
      sku: "FLS-DNT-200",
      category: "مواد استهلاكية",
      currentStock: 8,
      minStock: 40,
      maxStock: 200,
      price: 45000,
      cost: 32000,
      unitsSold: 78,
      status: "LOW_STOCK",
      lastRestocked: "2024-01-12",
      supplier: "شركة المواد السنية",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "IN_STOCK": return "success"
      case "LOW_STOCK": return "warning"
      case "OUT_OF_STOCK": return "destructive"
      default: return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "IN_STOCK": return "متوفر"
      case "LOW_STOCK": return "مخزون منخفض"
      case "OUT_OF_STOCK": return "نفذ من المخزون"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "IN_STOCK": return <CheckCircle className="w-4 h-4" />
      case "LOW_STOCK": return <AlertCircle className="w-4 h-4" />
      case "OUT_OF_STOCK": return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100
  }

  const handleAdjustStock = (product: any) => {
    setSelectedProduct(product)
    setShowAdjustDialog(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المخزون</h1>
          <p className="text-muted-foreground mt-1">
            متابعة وإدارة مخزون المنتجات
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p className="text-xs text-green-600 mt-1">
              منتج نشط
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">مخزون منخفض</p>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
            <p className="text-xs text-muted-foreground mt-1">
              يحتاج إعادة تخزين
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">نفذ من المخزون</p>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            <p className="text-xs text-muted-foreground mt-1">
              منتج
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">قيمة المخزون</p>
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(stats.totalValue)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              إجمالي القيمة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStock > 0 && (
        <Card className="bento-card border-orange-500 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-orange-900">تنبيه: مخزون منخفض</p>
                <p className="text-sm text-orange-700">
                  لديك {stats.lowStock} منتجات بحاجة إلى إعادة تخزين و {stats.outOfStock} منتجات نفذت من المخزون
                </p>
              </div>
              <Button variant="outline" size="sm">
                عرض التفاصيل
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="البحث بالاسم أو الكود..."
                className="max-w-md"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 ml-2" />
              تصفية
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle>قائمة المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {products.map((product) => {
              const stockPercentage = getStockPercentage(product.currentStock, product.maxStock)
              const profitMargin = ((product.price - product.cost) / product.price * 100).toFixed(1)

              return (
                <Card
                  key={product.id}
                  className={`bento-card hover:shadow-md transition-shadow ${
                    product.status === "OUT_OF_STOCK" ? "border-red-200 bg-red-50" :
                    product.status === "LOW_STOCK" ? "border-orange-200 bg-orange-50" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{product.name}</h4>
                          <Badge variant={getStatusColor(product.status)}>
                            {getStatusIcon(product.status)}
                            <span className="mr-1">{getStatusText(product.status)}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>الكود: {product.sku}</span>
                          <span>•</span>
                          <span>{product.category}</span>
                          <span>•</span>
                          <span>تم البيع: {product.unitsSold} وحدة</span>
                        </div>
                      </div>
                    </div>

                    {/* Stock Level */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground">
                          المخزون: {product.currentStock} / {product.maxStock}
                        </span>
                        <span className={`font-medium ${
                          product.status === "OUT_OF_STOCK" ? "text-red-600" :
                          product.status === "LOW_STOCK" ? "text-orange-600" :
                          "text-green-600"
                        }`}>
                          {stockPercentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            product.status === "OUT_OF_STOCK" ? "bg-red-500" :
                            product.status === "LOW_STOCK" ? "bg-orange-500" :
                            "bg-green-500"
                          }`}
                          style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        />
                      </div>
                      {product.currentStock < product.minStock && (
                        <p className="text-xs text-orange-600 mt-1">
                          <AlertCircle className="w-3 h-3 inline ml-1" />
                          تحت الحد الأدنى ({product.minStock} وحدة)
                        </p>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-center">
                        <p className="text-xs text-muted-foreground mb-1">السعر</p>
                        <p className="text-xs font-bold text-blue-700">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-center">
                        <p className="text-xs text-muted-foreground mb-1">التكلفة</p>
                        <p className="text-xs font-bold text-purple-700">
                          {formatCurrency(product.cost)}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-center">
                        <p className="text-xs text-muted-foreground mb-1">الهامش</p>
                        <p className="text-xs font-bold text-green-700">
                          {profitMargin}%
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-orange-50 border border-orange-200 text-center">
                        <p className="text-xs text-muted-foreground mb-1">القيمة</p>
                        <p className="text-xs font-bold text-orange-700">
                          {formatCurrency(product.currentStock * product.cost)}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-center">
                        <p className="text-xs text-muted-foreground mb-1">آخر تخزين</p>
                        <p className="text-xs font-bold text-gray-700">
                          {product.lastRestocked}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground mb-3">
                      المورد: {product.supplier}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleAdjustStock(product)}
                      >
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل الكمية
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={product.status === "IN_STOCK"}
                      >
                        <Plus className="w-4 h-4 ml-1" />
                        إعادة تخزين
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Adjust Stock Dialog */}
      <Dialog open={showAdjustDialog} onOpenChange={setShowAdjustDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل الكمية</DialogTitle>
            <DialogDescription>
              {selectedProduct && `تعديل كمية ${selectedProduct.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">المخزون الحالي</p>
                    <p className="text-lg font-bold text-blue-700">
                      {selectedProduct.currentStock}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">الحد الأدنى</p>
                    <p className="text-lg font-bold text-orange-700">
                      {selectedProduct.minStock}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>نوع العملية</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                  <option value="add">إضافة إلى المخزون</option>
                  <option value="subtract">خصم من المخزون</option>
                  <option value="set">تعيين الكمية</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>الكمية</Label>
                <Input type="number" placeholder="0" />
              </div>

              <div className="space-y-2">
                <Label>السبب</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                  <option value="">اختر السبب</option>
                  <option value="restock">إعادة تخزين</option>
                  <option value="sale">بيع</option>
                  <option value="damage">تلف</option>
                  <option value="return">إرجاع</option>
                  <option value="adjustment">تصحيح</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>ملاحظات (اختياري)</Label>
                <textarea
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                  placeholder="أضف ملاحظات إضافية..."
                />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setShowAdjustDialog(false)}>
                  حفظ التعديل
                </Button>
                <Button variant="outline" onClick={() => setShowAdjustDialog(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
