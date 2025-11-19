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
import {
  Package,
  Plus,
  Edit,
  Search,
  Filter,
  Eye,
  EyeOff,
  Star,
  TrendingUp,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

const CATEGORIES = [
  { value: "medical-equipment", label: "معدات طبية", icon: "🦷" },
  { value: "consumables", label: "مواد استهلاكية", icon: "🧤" },
  { value: "tools", label: "أدوات", icon: "🔧" },
  { value: "sterilization", label: "تعقيم", icon: "🧼" },
  { value: "xray", label: "أشعة", icon: "📷" },
  { value: "orthodontics", label: "تقويم", icon: "🦷" },
]

export default function VendorProductsPage() {
  const [showDialog, setShowDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const products = [
    {
      id: "1",
      name: "قفازات نتريل - مقاس متوسط - 100 قطعة",
      category: "consumables",
      brand: "MediGlove Pro",
      price: 35000,
      stock: 450,
      minStock: 100,
      sold: 234,
      rating: 4.9,
      reviews: 87,
      isActive: true,
      image: "🧤",
      sku: "GLV-NTR-M-100",
    },
    {
      id: "2",
      name: "كمامات N95 - عبوة 50 قطعة",
      category: "consumables",
      brand: "SafeMask",
      price: 90000,
      stock: 12,
      minStock: 50,
      sold: 189,
      rating: 4.7,
      reviews: 64,
      isActive: true,
      image: "😷",
      sku: "MSK-N95-50",
    },
    {
      id: "3",
      name: "حشوة مركبة A2 - 4 جرام",
      category: "consumables",
      brand: "Dental Plus",
      price: 180000,
      stock: 78,
      minStock: 30,
      sold: 156,
      rating: 4.8,
      reviews: 52,
      isActive: true,
      image: "💊",
      sku: "FIL-CMP-A2-4G",
    },
    {
      id: "4",
      name: "جهاز تعقيم أوتوكليف صغير",
      category: "sterilization",
      brand: "SteriliTech",
      price: 8500000,
      stock: 5,
      minStock: 3,
      sold: 12,
      rating: 4.9,
      reviews: 18,
      isActive: true,
      image: "🔬",
      sku: "STE-AUT-S",
    },
    {
      id: "5",
      name: "إبر تخدير - 27G",
      category: "consumables",
      brand: "MedicalSupply",
      price: 25000,
      stock: 2,
      minStock: 20,
      sold: 298,
      rating: 4.6,
      reviews: 112,
      isActive: true,
      image: "💉",
      sku: "NDL-ANS-27G",
    },
    {
      id: "6",
      name: "مرايا أسنان - عبوة 100",
      category: "tools",
      brand: "DentalTools",
      price: 45000,
      stock: 156,
      minStock: 50,
      sold: 67,
      rating: 4.5,
      reviews: 34,
      isActive: false,
      image: "🪞",
      sku: "TL-MIR-100",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getCategoryInfo = (categoryValue: string) => {
    return CATEGORIES.find(c => c.value === categoryValue) || CATEGORIES[0]
  }

  const isLowStock = (stock: number, minStock: number) => stock <= minStock

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    lowStock: products.filter(p => isLowStock(p.stock, p.minStock)).length,
    inactive: products.filter(p => !p.isActive).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">إدارة المنتجات</h1>
            <Button variant="outline" asChild>
              <Link href="/vendor">
                عودة للمركز
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">إجمالي المنتجات</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              <p className="text-xs text-muted-foreground">نشط</p>
            </CardContent>
          </Card>
          <Card className={`bento-card ${stats.lowStock > 0 ? 'border-orange-500' : ''}`}>
            <CardContent className="p-4 text-center">
              <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${stats.lowStock > 0 ? 'text-orange-600' : 'text-muted-foreground'}`} />
              <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
              <p className="text-xs text-muted-foreground">مخزون منخفض</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <EyeOff className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
              <p className="text-xs text-muted-foreground">غير نشط</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن منتج بالاسم أو رقم SKU..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3"
              >
                <option value="all">جميع الفئات</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Add Product Button */}
        <div className="flex justify-end">
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                إضافة منتج جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إضافة منتج جديد</DialogTitle>
                <DialogDescription>
                  أدخل تفاصيل المنتج الجديد للمتجر
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اسم المنتج</Label>
                    <Input placeholder="مثال: قفازات نتريل" />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم SKU</Label>
                    <Input placeholder="GLV-NTR-M-100" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الفئة</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                      {CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>اسم البراند</Label>
                    <Input placeholder="MediGlove Pro" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                    placeholder="وصف تفصيلي للمنتج..."
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>السعر (د.ع)</Label>
                    <Input type="number" placeholder="35000" />
                  </div>
                  <div className="space-y-2">
                    <Label>الكمية</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label>الحد الأدنى</Label>
                    <Input type="number" placeholder="20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>صور المنتج</Label>
                  <Input type="file" accept="image/*" multiple />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isActive" className="rounded" defaultChecked />
                  <Label htmlFor="isActive">منتج نشط (متاح للبيع)</Label>
                </div>
                <Button className="w-full">حفظ المنتج</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const categoryInfo = getCategoryInfo(product.category)
            const lowStock = isLowStock(product.stock, product.minStock)

            return (
              <Card key={product.id} className={`bento-card hover:shadow-lg transition-shadow ${lowStock ? 'border-orange-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-5xl">{product.image}</div>
                    <div className="flex flex-col gap-1">
                      <Badge variant={product.isActive ? "success" : "secondary"}>
                        {product.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                      {lowStock && (
                        <Badge variant="warning" className="text-xs">
                          <AlertTriangle className="w-3 h-3 ml-1" />
                          ناقص
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-base mb-1">{product.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {categoryInfo.icon} {categoryInfo.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      SKU: {product.sku}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.brand}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews} تقييم)</span>
                  </div>

                  {/* Price & Stock */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">السعر</p>
                      <p className="text-sm font-bold text-green-700">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg border text-center ${
                      lowStock
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <p className="text-xs text-muted-foreground mb-1">المخزون</p>
                      <p className={`text-sm font-bold ${
                        lowStock ? 'text-orange-700' : 'text-blue-700'
                      }`}>
                        {product.stock}
                      </p>
                    </div>
                  </div>

                  {/* Sales Info */}
                  <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-3 h-3 text-purple-600" />
                      <p className="text-xs text-muted-foreground">المبيعات</p>
                    </div>
                    <p className="text-sm font-bold text-purple-700">{product.sold} وحدة</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 ml-1" />
                      تعديل
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="w-4 h-4 ml-1" />
                      إحصائيات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="bento-card">
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">لا توجد منتجات</h3>
              <p className="text-muted-foreground mb-4">
                لم يتم العثور على منتجات مطابقة للبحث
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
