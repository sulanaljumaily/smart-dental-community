"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Users,
  UserPlus,
  Phone,
  MapPin,
  Package,
  CheckCircle,
  Truck,
  Clock,
  TrendingUp,
  Edit,
  Eye,
  BarChart3,
} from "lucide-react"

export default function LabRepresentativesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Delivery Staff/Representatives
  const representatives = [
    {
      id: "1",
      name: "عمر حسن علي",
      phone: "07701112233",
      vehicle: "دراجة نارية",
      vehicleNumber: "بغداد 12345",
      currentOrders: 3,
      completedToday: 8,
      completedThisMonth: 142,
      status: "ACTIVE",
      location: "حي المنصور",
      rating: 4.9,
      joinDate: "2023-06-15",
      totalDeliveries: 856,
    },
    {
      id: "2",
      name: "علي محمد صالح",
      phone: "07709998877",
      vehicle: "سيارة",
      vehicleNumber: "بغداد 67890",
      currentOrders: 2,
      completedToday: 5,
      completedThisMonth: 98,
      status: "ACTIVE",
      location: "حي الكرادة",
      rating: 4.7,
      joinDate: "2023-08-20",
      totalDeliveries: 567,
    },
    {
      id: "3",
      name: "حسين أحمد كريم",
      phone: "07801234567",
      vehicle: "دراجة نارية",
      vehicleNumber: "بغداد 11122",
      currentOrders: 0,
      completedToday: 6,
      completedThisMonth: 125,
      status: "AVAILABLE",
      location: "المختبر",
      rating: 4.8,
      joinDate: "2023-05-10",
      totalDeliveries: 723,
    },
    {
      id: "4",
      name: "محمد سعد عبدالله",
      phone: "07701234890",
      vehicle: "دراجة نارية",
      vehicleNumber: "بغداد 33344",
      currentOrders: 1,
      completedToday: 4,
      completedThisMonth: 87,
      status: "ACTIVE",
      location: "حي الجادرية",
      rating: 4.6,
      joinDate: "2023-09-05",
      totalDeliveries: 412,
    },
  ]

  // Stats
  const stats = {
    totalReps: representatives.length,
    activeReps: representatives.filter(r => r.status === "ACTIVE").length,
    availableReps: representatives.filter(r => r.status === "AVAILABLE").length,
    totalDeliveriesToday: representatives.reduce((sum, r) => sum + r.completedToday, 0),
  }

  const getStatusColor = (status: string) => {
    return status === "ACTIVE" ? "info" : "success"
  }

  const getStatusText = (status: string) => {
    return status === "ACTIVE" ? "نشط" : "متاح"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" dir="rtl">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي المندوبين</p>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalReps}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.activeReps} نشط
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">متاح الآن</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.availableReps}</p>
            <p className="text-xs text-muted-foreground mt-1">
              جاهز للتوصيل
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">توصيلات اليوم</p>
              <Truck className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.totalDeliveriesToday}</p>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3 inline ml-1" />
              +12% عن الأمس
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">متوسط التقييم</p>
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold">4.8</p>
            <p className="text-xs text-muted-foreground mt-1">
              من أصل 5.0
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Representatives List */}
      <Card className="bento-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>المندوبين</CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 ml-2" />
                  إضافة مندوب
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة مندوب جديد</DialogTitle>
                  <DialogDescription>
                    أدخل بيانات المندوب الجديد
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>الاسم الكامل</Label>
                    <Input placeholder="عمر حسن علي" />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الهاتف</Label>
                    <Input placeholder="07XXXXXXXXX" dir="ltr" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>نوع المركبة</Label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                        <option value="motorcycle">دراجة نارية</option>
                        <option value="car">سيارة</option>
                        <option value="bicycle">دراجة هوائية</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم المركبة</Label>
                      <Input placeholder="بغداد 12345" />
                    </div>
                  </div>
                  <Button className="w-full">إضافة المندوب</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {representatives.map((rep) => (
              <Card key={rep.id} className="bento-card hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-lg">
                          {rep.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">{rep.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {rep.phone}
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(rep.status)}>
                      {getStatusText(rep.status)}
                    </Badge>
                  </div>

                  {/* Vehicle Info */}
                  <div className="p-3 rounded-lg bg-gray-50 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{rep.vehicle}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {rep.vehicleNumber}
                      </Badge>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <p className="text-xs text-muted-foreground">نشط</p>
                      </div>
                      <p className="text-sm font-bold text-blue-700">{rep.currentOrders}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <p className="text-xs text-muted-foreground">اليوم</p>
                      </div>
                      <p className="text-sm font-bold text-green-700">{rep.completedToday}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Package className="w-3 h-3 text-purple-600" />
                        <p className="text-xs text-muted-foreground">الشهر</p>
                      </div>
                      <p className="text-sm font-bold text-purple-700">{rep.completedThisMonth}</p>
                    </div>
                  </div>

                  {/* Location & Rating */}
                  <div className="space-y-2 mb-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>الموقع:</span>
                      </div>
                      <span className="font-medium text-blue-600">{rep.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">التقييم:</span>
                      <Badge variant="outline" className="text-xs">
                        ⭐ {rep.rating}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">إجمالي التوصيلات:</span>
                      <span className="font-medium">{rep.totalDeliveries}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      عرض
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 ml-1" />
                      تعديل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
