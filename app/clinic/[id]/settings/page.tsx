"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Building2,
  Clock,
  DollarSign,
  Bell,
  Upload,
  Save,
  AlertCircle,
  CheckCircle,
  Trash2,
  MapPin,
  Calendar,
  Globe,
  Link as LinkIcon,
} from "lucide-react"

export default function ClinicSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إعدادات العيادة</h1>
          <p className="text-muted-foreground mt-1">
            إدارة معلومات وإعدادات العيادة
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 ml-2" />
          {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6" dir="rtl">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">
            <Building2 className="w-4 h-4 ml-2" />
            معلومات عامة
          </TabsTrigger>
          <TabsTrigger value="hours">
            <Clock className="w-4 h-4 ml-2" />
            ساعات العمل
          </TabsTrigger>
          <TabsTrigger value="booking">
            <Calendar className="w-4 h-4 ml-2" />
            إعدادات الحجز
          </TabsTrigger>
          <TabsTrigger value="map">
            <MapPin className="w-4 h-4 ml-2" />
            الخريطة التفاعلية
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <DollarSign className="w-4 h-4 ml-2" />
            الأسعار
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 ml-2" />
            الإشعارات
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>معلومات العيادة الأساسية</CardTitle>
              <CardDescription>
                قم بتحديث معلومات العيادة الأساسية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اسم العيادة</Label>
                  <Input defaultValue="عيادة النجوم" />
                </div>
                <div className="space-y-2">
                  <Label>رقم الترخيص</Label>
                  <Input defaultValue="CLN-2023-001" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>رقم الهاتف</Label>
                  <Input defaultValue="07701234567" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>البريد الإلكتروني</Label>
                  <Input defaultValue="info@clinic.com" dir="ltr" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input defaultValue="شارع الأطباء، حي المنصور، بغداد" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option value="baghdad">بغداد</option>
                    <option value="basra">البصرة</option>
                    <option value="erbil">أربيل</option>
                    <option value="mosul">الموصل</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>المنطقة</Label>
                  <Input defaultValue="المنصور" />
                </div>
                <div className="space-y-2">
                  <Label>الرمز البريدي</Label>
                  <Input defaultValue="10001" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>الوصف</Label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                  defaultValue="عيادة متخصصة في جميع علاجات الأسنان والتجميل"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>الشعار وال صور</CardTitle>
              <CardDescription>
                قم بتحميل شعار العيادة والصور
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>شعار العيادة</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    اسحب وأفلت الصورة هنا أو انقر للتحميل
                  </p>
                  <Input type="file" accept="image/*" className="hidden" id="logo-upload" />
                  <Label htmlFor="logo-upload">
                    <Button variant="outline" size="sm" asChild>
                      <span>اختر صورة</span>
                    </Button>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Working Hours */}
        <TabsContent value="hours" className="space-y-6">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>ساعات العمل</CardTitle>
              <CardDescription>
                حدد أوقات عمل العيادة في كل يوم
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { day: "الأحد", key: "sunday" },
                { day: "الاثنين", key: "monday" },
                { day: "الثلاثاء", key: "tuesday" },
                { day: "الأربعاء", key: "wednesday" },
                { day: "الخميس", key: "thursday" },
                { day: "الجمعة", key: "friday" },
                { day: "السبت", key: "saturday" },
              ].map(({ day, key }) => (
                <div key={key} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 w-32">
                    <input type="checkbox" defaultChecked={key !== "friday"} className="w-4 h-4" />
                    <label className="font-medium">{day}</label>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Input type="time" defaultValue="09:00" className="w-32" />
                    <span>إلى</span>
                    <Input type="time" defaultValue="17:00" className="w-32" />
                  </div>
                  {key === "friday" && (
                    <Badge variant="secondary">عطلة</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle>مدة المواعيد</CardTitle>
              <CardDescription>
                حدد المدة الافتراضية لكل موعد
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>موعد عادي</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option value="15">15 دقيقة</option>
                    <option value="30" selected>30 دقيقة</option>
                    <option value="45">45 دقيقة</option>
                    <option value="60">60 دقيقة</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>فحص شامل</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option value="30">30 دقيقة</option>
                    <option value="45">45 دقيقة</option>
                    <option value="60" selected>60 دقيقة</option>
                    <option value="90">90 دقيقة</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>علاج متقدم</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option value="60">60 دقيقة</option>
                    <option value="90" selected>90 دقيقة</option>
                    <option value="120">120 دقيقة</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Settings */}
        <TabsContent value="booking" className="space-y-6">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>إعدادات الحجز الرقمي</CardTitle>
              <CardDescription>
                تفعيل وإدارة الحجوزات الرقمية من المرضى
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">تفعيل الحجز الرقمي</h4>
                  <p className="text-sm text-muted-foreground">
                    السماح للمرضى بحجز المواعيد عبر الخريطة التفاعلية
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <Label>وقت الاستجابة المطلوب (ساعات)</Label>
                <Input type="number" defaultValue="24" />
                <p className="text-xs text-muted-foreground">
                  الوقت المتوقع للرد على الحجوزات الرقمية
                </p>
              </div>

              <div className="space-y-2">
                <Label>الحد الأقصى للحجوزات اليومية</Label>
                <Input type="number" defaultValue="10" />
                <p className="text-xs text-muted-foreground">
                  عدد الحجوزات الرقمية المسموحة يومياً
                </p>
              </div>

              <div className="space-y-2">
                <Label>رسالة تأكيد تلقائية</Label>
                <textarea
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                  defaultValue="شكراً لحجزك موعد في عيادتنا. سنتصل بك قريباً لتأكيد الموعد."
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">التذكيرات التلقائية</h4>
                  <p className="text-sm text-muted-foreground">
                    إرسال تذكيرات للمرضى قبل المواعيد
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>التذكير الأول (ساعات قبل)</Label>
                  <Input type="number" defaultValue="24" />
                </div>
                <div className="space-y-2">
                  <Label>التذكير الثاني (ساعات قبل)</Label>
                  <Input type="number" defaultValue="2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Map Settings */}
        <TabsContent value="map" className="space-y-6">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>الظهور على الخريطة التفاعلية</CardTitle>
              <CardDescription>
                تحديد موقع العيادة على الخريطة للمرضى في المنصة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    الظهور على الخريطة التفاعلية
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    إظهار العيادة للمرضى في قسم &quot;العيادات القريبة&quot;
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <Label>الموقع الجغرافي</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">خط العرض (Latitude)</Label>
                    <Input dir="ltr" defaultValue="33.3152" placeholder="33.3152" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">خط الطول (Longitude)</Label>
                    <Input dir="ltr" defaultValue="44.3661" placeholder="44.3661" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <MapPin className="w-4 h-4 ml-1" />
                  تحديد الموقع على الخريطة
                </Button>
              </div>

              <div className="space-y-2">
                <Label>نطاق الظهور (كم)</Label>
                <Input type="number" defaultValue="10" />
                <p className="text-xs text-muted-foreground">
                  المسافة التي تظهر فيها العيادة للمرضى القريبين
                </p>
              </div>

              <div className="space-y-2">
                <Label>رابط الحجز المباشر</Label>
                <div className="flex gap-2">
                  <Input
                    dir="ltr"
                    readOnly
                    value="https://dental-app.com/clinic/booking/123"
                    className="bg-gray-50"
                  />
                  <Button variant="outline" size="icon">
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  هذا الرابط يظهر في بطاقة العيادة على الخريطة التفاعلية
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">العيادة مفعلة على الخريطة</h4>
                    <p className="text-sm text-green-700 mt-1">
                      المرضى في نطاق 10 كم يمكنهم رؤية عيادتك وحجز موعد رقمياً
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>معلومات إضافية للعرض</Label>
                <div className="space-y-2">
                  {[
                    { id: "parking", label: "مواقف سيارات متاحة" },
                    { id: "wheelchair", label: "مهيأة لذوي الاحتياجات الخاصة" },
                    { id: "emergency", label: "تقبل الحالات الطارئة" },
                    { id: "insurance", label: "تقبل التأمين الصحي" },
                  ].map(({ id, label }) => (
                    <label key={id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing" className="space-y-6">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>العملة وطريقة الدفع</CardTitle>
              <CardDescription>
                إعدادات الأسعار وطرق الدفع
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>العملة</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option value="IQD">دينار عراقي (IQD)</option>
                    <option value="USD">دولار أمريكي (USD)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>ضريبة القيمة المضافة (%)</Label>
                  <Input type="number" defaultValue="0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>طرق الدفع المقبولة</Label>
                <div className="space-y-2">
                  {[
                    { id: "cash", label: "نقدي" },
                    { id: "card", label: "بطاقة ائتمان" },
                    { id: "bank", label: "تحويل بنكي" },
                    { id: "installment", label: "تقسيط" },
                  ].map(({ id, label }) => (
                    <label key={id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>
                اختر أنواع الإشعارات التي تريد استلامها
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "appointments",
                  title: "المواعيد الجديدة",
                  description: "إشعار عند حجز موعد جديد",
                },
                {
                  id: "cancellations",
                  title: "إلغاء المواعيد",
                  description: "إشعار عند إلغاء موعد",
                },
                {
                  id: "reminders",
                  title: "تذكيرات المواعيد",
                  description: "تذكيرات تلقائية قبل المواعيد",
                },
                {
                  id: "payments",
                  title: "المدفوعات",
                  description: "إشعارات عن المدفوعات المستلمة",
                },
                {
                  id: "inventory",
                  title: "المخزون",
                  description: "تنبيهات عند نقص المخزون",
                },
              ].map(({ id, title, description }) => (
                <div key={id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <input type="checkbox" defaultChecked className="w-4 h-4 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">بريد</Badge>
                    <Badge variant="outline" className="text-xs">رسائل</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          إلغاء
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 ml-2" />
          {isSaving ? "جاري الحفظ..." : "حفظ جميع التغييرات"}
        </Button>
      </div>
    </div>
  )
}
