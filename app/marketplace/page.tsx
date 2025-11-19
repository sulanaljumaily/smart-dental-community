"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/shared/mobile-nav"
import {
  Search,
  ShoppingCart,
  Star,
  TrendingUp,
  Package,
  Sparkles,
  Store,
  Award,
  Filter,
  ChevronLeft,
  Bell,
  User
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function MarketplacePage() {
  const [cart, setCart] = useState(0)

  // بيانات تجريبية
  const categories = [
    { id: "1", name: "معدات طبية", icon: "🦷", count: 245 },
    { id: "2", name: "مواد استهلاكية", icon: "🧤", count: 432 },
    { id: "3", name: "أدوات", icon: "🔧", count: 189 },
    { id: "4", name: "تعقيم", icon: "🧼", count: 167 },
    { id: "5", name: "أشعة", icon: "📷", count: 89 },
    { id: "6", name: "تقويم", icon: "🦷", count: 134 },
  ]

  const promoSlides = [
    {
      id: "1",
      title: "خصم 30% على جميع القفازات الطبية",
      description: "عرض لفترة محدودة",
      image: "🧤",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "2",
      title: "أجهزة تعقيم بأسعار خاصة",
      description: "توفير حتى 50%",
      image: "🔬",
      color: "from-purple-500 to-purple-700",
    },
    {
      id: "3",
      title: "منتجات جديدة من أفضل البراندات",
      description: "اكتشف المزيد",
      image: "✨",
      color: "from-green-500 to-green-700",
    },
  ]

  const featuredProducts = [
    {
      id: "1",
      name: "قفازات نتريل - 100 قطعة",
      vendor: "شركة الطب الحديث",
      brand: "MediGlove",
      price: 45000,
      salePrice: 35000,
      rating: 4.8,
      reviews: 156,
      image: "🧤",
      inStock: true,
      badge: "الأكثر مبيعاً",
    },
    {
      id: "2",
      name: "حشوات مركبة - A2",
      vendor: "مؤسسة الابتسامة",
      brand: "Dental Plus",
      price: 180000,
      salePrice: null,
      rating: 4.9,
      reviews: 89,
      image: "💊",
      inStock: true,
      badge: "جديد",
    },
    {
      id: "3",
      name: "كمامات N95 - عبوة 50",
      vendor: "شركة الطب الحديث",
      brand: "SafeMask",
      price: 120000,
      salePrice: 90000,
      rating: 4.7,
      reviews: 234,
      image: "😷",
      inStock: true,
      badge: "عرض خاص",
    },
  ]

  const topVendors = [
    {
      id: "1",
      name: "شركة الطب الحديث",
      logo: "🏢",
      rating: 4.9,
      products: 345,
    },
    {
      id: "2",
      name: "مؤسسة الابتسامة",
      logo: "😁",
      rating: 4.8,
      products: 278,
    },
    {
      id: "3",
      name: "المركز الطبي المتقدم",
      logo: "🏥",
      rating: 4.7,
      products: 198,
    },
  ]

  const topBrands = [
    { id: "1", name: "3M", logo: "3️⃣" },
    { id: "2", name: "Dentsply", logo: "🦷" },
    { id: "3", name: "Ivoclar", logo: "💎" },
    { id: "4", name: "GC", logo: "🔬" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const calculateDiscount = (price: number, salePrice: number) => {
    return Math.round(((price - salePrice) / price) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">المتجر الطبي</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cart > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cart}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن منتجات، موردين، أو براندات..."
              className="pr-10"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Promotional Slider */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {promoSlides.map((slide) => (
            <Card
              key={slide.id}
              className={cn(
                "min-w-[300px] md:min-w-[400px] bento-card bg-gradient-to-r text-white border-none cursor-pointer hover:scale-105 transition-transform",
                slide.color
              )}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="text-6xl">{slide.image}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{slide.title}</h3>
                  <p className="text-white/90 text-sm">{slide.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">الفئات</h2>
            <Button variant="ghost" asChild>
              <Link href="/marketplace/categories">
                عرض الكل
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="bento-card hover:shadow-lg transition-all cursor-pointer"
              >
                <CardContent className="p-4 text-center space-y-2">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <p className="font-semibold text-sm">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.count} منتج</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">منتجات مميزة</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="bento-card hover:shadow-xl transition-all group">
                <CardHeader className="pb-3">
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 z-10" variant={
                      product.badge === "عرض خاص" ? "destructive" :
                      product.badge === "جديد" ? "success" : "default"
                    }>
                      {product.badge}
                    </Badge>
                  )}
                  <div className="text-6xl text-center py-4">{product.image}</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                    <p className="text-xs text-muted-foreground">{product.vendor}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(product.salePrice)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatCurrency(product.price)}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          خصم {calculateDiscount(product.price, product.salePrice)}%
                        </Badge>
                      </>
                    ) : (
                      <span className="text-2xl font-bold">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1">
                    <ShoppingCart className="w-4 h-4 ml-2" />
                    أضف للسلة
                  </Button>
                  <Button variant="outline" size="icon">
                    <Star className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button size="lg" variant="outline" asChild>
              <Link href="/marketplace/products">
                عرض جميع المنتجات المميزة
              </Link>
            </Button>
          </div>
        </section>

        {/* New Products */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">وصل حديثاً</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[...featuredProducts].reverse().map((product) => (
              <Card key={product.id} className="min-w-[250px] bento-card hover:shadow-lg transition-all">
                <CardContent className="p-4 space-y-3">
                  <div className="text-5xl text-center">{product.image}</div>
                  <div>
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(product.salePrice || product.price)}
                  </p>
                  <Button size="sm" className="w-full">
                    أضف للسلة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">عروض خاصة</h2>
          </div>

          <Card className="bento-card bg-gradient-to-r from-red-500 to-orange-600 text-white border-none">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold mb-2">تخفيضات نهاية الموسم</h3>
              <p className="text-xl mb-4">خصومات تصل إلى 50% على منتجات مختارة</p>
              <Button size="lg" variant="secondary">
                تصفح العروض
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Top Vendors */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold">أبرز الموردين</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topVendors.map((vendor) => (
              <Card key={vendor.id} className="bento-card hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto">
                    {vendor.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{vendor.name}</h3>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{vendor.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {vendor.products} منتج
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    زيارة المتجر
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button variant="ghost" asChild>
              <Link href="/marketplace/vendors">
                عرض جميع الموردين
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Top Brands */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold">أبرز البراندات</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topBrands.map((brand) => (
              <Card
                key={brand.id}
                className="bento-card hover:shadow-lg transition-all cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-2">{brand.logo}</div>
                  <p className="font-bold">{brand.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button variant="ghost" asChild>
              <Link href="/marketplace/brands">
                عرض جميع البراندات
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Mobile Navigation */}
      <MobileNav userRole="DENTIST" isOwner={true} />
    </div>
  )
}
