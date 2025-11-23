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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Image as ImageIcon,
  Plus,
  Star,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Upload,
  Grid3x3,
  List,
  Filter,
  Search,
} from "lucide-react"

export default function GalleryPage() {
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Gallery Stats
  const stats = {
    totalWorks: 245,
    thisMonth: 28,
    averageRating: 4.9,
    favorites: 42,
  }

  // Categories
  const categories = [
    { id: "all", name: "الكل", count: 245 },
    { id: "crowns", name: "تيجان", count: 98 },
    { id: "bridges", name: "جسور", count: 67 },
    { id: "dentures", name: "أطقم الأسنان", count: 45 },
    { id: "veneers", name: "عدسات", count: 35 },
  ]

  // Gallery Items
  const galleryItems = [
    {
      id: "1",
      title: "تاج زركونيا - لون A2",
      category: "crowns",
      categoryName: "تيجان",
      description: "تاج زركونيا بلون A2 للسن الأمامي العلوي",
      date: "2024-01-20",
      clinic: "عيادة الابتسامة الذكية",
      technician: "أحمد محمود",
      material: "زركونيا",
      color: "A2",
      tooth: "11",
      rating: 5,
      views: 234,
      isFavorite: true,
      imageUrl: "🦷",
    },
    {
      id: "2",
      title: "جسر بورسلين - 3 وحدات",
      category: "bridges",
      categoryName: "جسور",
      description: "جسر بورسلين من 3 وحدات للفك العلوي",
      date: "2024-01-19",
      clinic: "مركز الأسنان المتقدم",
      technician: "سارة علي",
      material: "بورسلين",
      color: "A3",
      tooth: "14-15-16",
      rating: 5,
      views: 189,
      isFavorite: false,
      imageUrl: "🦷",
    },
    {
      id: "3",
      title: "طقم أسنان كامل",
      category: "dentures",
      categoryName: "أطقم الأسنان",
      description: "طقم أسنان كامل علوي بتصميم طبيعي",
      date: "2024-01-18",
      clinic: "عيادة د. محمد أحمد",
      technician: "أحمد محمود",
      material: "أكريلك",
      rating: 5,
      views: 156,
      isFavorite: true,
      imageUrl: "🦷",
    },
    {
      id: "4",
      title: "عدسات لومينير",
      category: "veneers",
      categoryName: "عدسات",
      description: "مجموعة عدسات لومينير للأسنان الأمامية",
      date: "2024-01-17",
      clinic: "عيادة النور",
      technician: "سارة علي",
      material: "بورسلين",
      color: "BL1",
      tooth: "11-21",
      rating: 5,
      views: 298,
      isFavorite: true,
      imageUrl: "🦷",
    },
    {
      id: "5",
      title: "تاج ايماكس",
      category: "crowns",
      categoryName: "تيجان",
      description: "تاج ايماكس شفاف بلون طبيعي",
      date: "2024-01-16",
      clinic: "مركز الأسنان الذهبي",
      technician: "أحمد محمود",
      material: "ايماكس",
      color: "A1",
      tooth: "21",
      rating: 5,
      views: 267,
      isFavorite: false,
      imageUrl: "🦷",
    },
    {
      id: "6",
      title: "جسر زركونيا - 4 وحدات",
      category: "bridges",
      categoryName: "جسور",
      description: "جسر زركونيا من 4 وحدات للفك السفلي",
      date: "2024-01-15",
      clinic: "عيادة الابتسامة",
      technician: "سارة علي",
      material: "زركونيا",
      color: "A2",
      tooth: "34-35-36-37",
      rating: 5,
      views: 223,
      isFavorite: false,
      imageUrl: "🦷",
    },
  ]

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">معرض الأعمال</h1>
          <p className="text-muted-foreground mt-1">
            عرض وإدارة نماذج أعمال المختبر
          </p>
        </div>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة عمل جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة عمل جديد للمعرض</DialogTitle>
              <DialogDescription>
                أضف صورة وتفاصيل العمل الجديد
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input placeholder="مثال: تاج زركونيا - لون A2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الفئة</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option value="">اختر الفئة</option>
                    <option value="crowns">تيجان</option>
                    <option value="bridges">جسور</option>
                    <option value="dentures">أطقم الأسنان</option>
                    <option value="veneers">عدسات</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>المادة</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option value="">اختر المادة</option>
                    <option value="zirconia">زركونيا</option>
                    <option value="porcelain">بورسلين</option>
                    <option value="emax">ايماكس</option>
                    <option value="acrylic">أكريلك</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اللون</Label>
                  <Input placeholder="A2" />
                </div>
                <div className="space-y-2">
                  <Label>رقم السن</Label>
                  <Input placeholder="11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>الوصف</Label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                  placeholder="وصف تفصيلي للعمل..."
                />
              </div>
              <div className="space-y-2">
                <Label>صورة العمل</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">
                    اسحب وأفلت الصورة هنا أو انقر للتحميل
                  </p>
                  <Input type="file" accept="image/*" className="hidden" id="file-upload" />
                  <Label htmlFor="file-upload">
                    <Button variant="outline" size="sm" asChild>
                      <span>اختر صورة</span>
                    </Button>
                  </Label>
                </div>
              </div>
              <Button className="w-full">حفظ العمل</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي الأعمال</p>
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalWorks}</p>
            <p className="text-xs text-green-600 mt-1">
              +{stats.thisMonth} هذا الشهر
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">المفضلة</p>
              <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.favorites}</p>
            <p className="text-xs text-muted-foreground mt-1">عمل مميز</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">متوسط التقييم</p>
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.averageRating}</p>
            <p className="text-xs text-muted-foreground mt-1">من 5.0</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">هذا الشهر</p>
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.thisMonth}</p>
            <p className="text-xs text-muted-foreground mt-1">عمل جديد</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Options */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="بحث في المعرض..."
                className="max-w-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap"
          >
            {category.name}
            <Badge variant="secondary" className="mr-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bento-card hover:shadow-xl transition-all group">
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden rounded-t-lg">
                  <div className="text-8xl">{item.imageUrl}</div>
                  {item.isFavorite && (
                    <div className="absolute top-3 right-3">
                      <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="flex-1">
                        <Eye className="w-4 h-4 ml-1" />
                        عرض
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-sm line-clamp-1">{item.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {item.categoryName}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-muted-foreground mb-1">المادة</p>
                      <p className="font-bold text-blue-700">{item.material}</p>
                    </div>
                    {item.color && (
                      <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                        <p className="text-muted-foreground mb-1">اللون</p>
                        <p className="font-bold text-purple-700">{item.color}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t text-xs">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      <Calendar className="w-3 h-3 inline ml-1" />
                      {item.date}
                    </span>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <p>الفني: {item.technician}</p>
                    <p>العيادة: {item.clinic}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bento-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-4xl">{item.imageUrl}</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{item.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {item.categoryName}
                          </Badge>
                          {item.isFavorite && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 ml-1" />
                          عرض
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-muted-foreground mb-1">المادة</p>
                        <p className="font-bold text-blue-700">{item.material}</p>
                      </div>
                      {item.color && (
                        <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                          <p className="text-muted-foreground mb-1">اللون</p>
                          <p className="font-bold text-purple-700">{item.color}</p>
                        </div>
                      )}
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-muted-foreground mb-1">السن</p>
                        <p className="font-bold text-green-700">{item.tooth}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
                        <p className="text-muted-foreground mb-1">المشاهدات</p>
                        <p className="font-bold text-orange-700">{item.views}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>الفني: {item.technician}</span>
                      <span>العيادة: {item.clinic}</span>
                      <span>
                        <Calendar className="w-3 h-3 inline ml-1" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
