"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  FlaskConical,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  Star,
  Package,
  Edit,
  Save,
  Camera,
  Shield,
  CreditCard,
  Bell,
  Award,
} from "lucide-react"

export default function LabProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  // Lab Profile Data
  const profile = {
    labName: "مختبر الابتسامة المتقدم",
    ownerName: "د. علي حسن محمد",
    email: "info@advancedsmilelab.iq",
    phone: "07801234567",
    whatsapp: "07801234567",
    address: "بغداد، حي الجادرية، شارع الجامعة",
    city: "بغداد",
    country: "العراق",
    website: "www.advancedsmilelab.iq",
    licenseNumber: "LAB-123456789",
    healthMinistryLicense: "HM-987654321",
    joinDate: "2023-03-10",
    rating: 4.9,
    totalOrders: 234,
    totalClients: 45,
    description: "مختبر متخصص في تصنيع التيجان والجسور والأطقم الصناعية بأعلى معايير الجودة، نستخدم أحدث التقنيات والمواد لضمان رضا العملاء.",
    specializations: ["تيجان زركونيا", "جسور خزفية", "أطقم أسنان", "تقويم شفاف"],
  }

  // Business Hours
  const businessHours = [
    { day: "الأحد - الخميس", hours: "8:00 ص - 5:00 م" },
    { day: "الجمعة", hours: "مغلق" },
    { day: "السبت", hours: "9:00 ص - 1:00 م" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" dir="rtl">
      {/* Profile Header */}
      <Card className="bento-card">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-3xl">
                  {profile.labName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 left-0 h-8 w-8 rounded-full bg-white shadow-lg"
                variant="outline"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{profile.labName}</h1>
                  <p className="text-muted-foreground">{profile.ownerName}</p>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 ml-2" />
                      حفظ التغييرات
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 ml-2" />
                      تعديل الملف
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 mb-3">
                <Badge variant="outline" className="gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {profile.rating}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Package className="w-4 h-4" />
                  {profile.totalOrders} طلب مكتمل
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <FlaskConical className="w-4 h-4" />
                  {profile.totalClients} عيادة
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="w-4 h-4" />
                  عضو منذ {profile.joinDate}
                </Badge>
                <Badge variant="success" className="gap-1">
                  <Shield className="w-4 h-4" />
                  موثق
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{profile.description}</p>
              <div className="flex flex-wrap gap-2">
                {profile.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    <Award className="w-3 h-3" />
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>معلومات الاتصال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={profile.email}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>رقم الهاتف</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={profile.phone}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>واتساب</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={profile.whatsapp}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الموقع الإلكتروني</Label>
                  <div className="relative">
                    <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={profile.website}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>العنوان</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>العنوان الكامل</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  <textarea
                    value={profile.address}
                    disabled={!isEditing}
                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <Input
                    value={profile.city}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>البلد</Label>
                  <Input
                    value={profile.country}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>المعلومات القانونية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>رقم الترخيص</Label>
                  <Input
                    value={profile.licenseNumber}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>رقم ترخيص وزارة الصحة</Label>
                  <Input
                    value={profile.healthMinistryLicense}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>الوصف والتخصصات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>نبذة عن المختبر</Label>
                <textarea
                  value={profile.description}
                  disabled={!isEditing}
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>التخصصات</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                      {isEditing && (
                        <button className="mr-1 hover:text-red-600">×</button>
                      )}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      + إضافة تخصص
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>ساعات العمل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {businessHours.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.day}</span>
                  <span className="font-medium">{item.hours}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>الإحصائيات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الطلبات المكتملة</span>
                <Badge variant="outline">{profile.totalOrders}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">العيادات العميلة</span>
                <Badge variant="outline">{profile.totalClients}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">التقييم</span>
                <Badge variant="outline">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 ml-1" />
                  {profile.rating}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>الإعدادات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Bell className="w-4 h-4" />
                إدارة الإشعارات
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <CreditCard className="w-4 h-4" />
                طرق الدفع
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield className="w-4 h-4" />
                الخصوصية والأمان
              </Button>
            </CardContent>
          </Card>

          <Card className="bento-card border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-600">منطقة الخطر</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full text-orange-600 border-orange-300 hover:bg-orange-50">
                حذف الحساب
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
