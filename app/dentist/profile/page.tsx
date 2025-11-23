"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  Building2,
  Crown,
  Shield,
  Lock,
  Bell,
  Globe,
  CreditCard,
  Settings,
  Camera,
  Edit,
  Save,
  X,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  // بيانات تجريبية - سيتم استبدالها بـ API
  const profile = {
    id: "1",
    name: "د. سلطان الجميلي",
    email: "sultan@example.com",
    phone: "+964 770 123 4567",
    specialty: "طب الأسنان العام",
    licenseNumber: "DEN-12345",
    yearsOfExperience: 10,
    education: "بكالوريوس طب الأسنان - جامعة بغداد",
    city: "بغداد",
    country: "العراق",
    bio: "طبيب أسنان متخصص في العلاجات التجميلية والزراعة. أمتلك خبرة 10 سنوات في مجال طب الأسنان.",
    joinDate: "2023",
    subscription: {
      plan: "FREE",
      planLabel: "مجانية",
      expiryDate: "غير محدد",
      aiCredits: 100,
      features: [
        "عيادة واحدة",
        "50 مريض كحد أقصى",
        "دعم محدود",
        "100 رصيد AI",
      ],
    },
    statistics: {
      totalClinics: 3,
      totalPatients: 247,
      totalAppointments: 1250,
      totalRevenue: 45000000,
    },
  }

  const subscriptionPlans = [
    {
      id: "free",
      name: "مجانية",
      price: 0,
      period: "شهرياً",
      features: [
        "عيادة واحدة",
        "50 مريض كحد أقصى",
        "دعم محدود",
        "100 رصيد AI شهرياً",
      ],
      current: true,
    },
    {
      id: "basic",
      name: "أساسية",
      price: 50000,
      period: "شهرياً",
      features: [
        "3 عيادات",
        "مرضى غير محدودين",
        "دعم فني 24/7",
        "500 رصيد AI شهرياً",
        "تقارير متقدمة",
      ],
      current: false,
    },
    {
      id: "professional",
      name: "احترافية",
      price: 100000,
      period: "شهرياً",
      features: [
        "10 عيادات",
        "مرضى غير محدودين",
        "دعم فني مخصص",
        "2000 رصيد AI شهرياً",
        "تقارير متقدمة",
        "تكامل مع أنظمة خارجية",
        "تدريب مجاني",
      ],
      current: false,
      recommended: true,
    },
    {
      id: "enterprise",
      name: "مؤسسية",
      price: null,
      period: "اتصل بنا",
      features: [
        "عيادات غير محدودة",
        "جميع المميزات",
        "دعم فني مخصص 24/7",
        "رصيد AI غير محدود",
        "حلول مخصصة",
        "مدير حساب مخصص",
      ],
      current: false,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">الملف الشخصي</h1>
        <p className="text-muted-foreground">إدارة معلوماتك الشخصية وإعدادات الحساب</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="profile">المعلومات الشخصية</TabsTrigger>
          <TabsTrigger value="subscription">الاشتراك</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          {/* Profile Card */}
          <Card className="bento-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>المعلومات الشخصية</CardTitle>
                <Button
                  variant={isEditing ? "ghost" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 ml-2" />
                      إلغاء
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 ml-2" />
                      تعديل
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-3xl">
                    د.س
                  </div>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -left-2 rounded-full h-8 w-8"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.specialty}</p>
                  <Badge className="mt-2" variant="outline">
                    {profile.subscription.planLabel}
                  </Badge>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      defaultValue={profile.name}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={profile.email}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      defaultValue={profile.phone}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">التخصص</Label>
                  <div className="relative">
                    <GraduationCap className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="specialty"
                      defaultValue={profile.specialty}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license">رقم الترخيص</Label>
                  <div className="relative">
                    <Shield className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="license"
                      defaultValue={profile.licenseNumber}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">سنوات الخبرة</Label>
                  <div className="relative">
                    <Award className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="experience"
                      type="number"
                      defaultValue={profile.yearsOfExperience}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">المدينة</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="city"
                      defaultValue={profile.city}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">الدولة</Label>
                  <div className="relative">
                    <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="country"
                      defaultValue={profile.country}
                      disabled={!isEditing}
                      className="pr-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">المؤهل العلمي</Label>
                <div className="relative">
                  <GraduationCap className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="education"
                    defaultValue={profile.education}
                    disabled={!isEditing}
                    className="pr-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">نبذة مختصرة</Label>
                <textarea
                  id="bio"
                  defaultValue={profile.bio}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md disabled:opacity-60"
                />
              </div>

              {isEditing && (
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={() => setIsEditing(false)}>
                    <Save className="w-4 h-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>الإحصائيات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{profile.statistics.totalClinics}</p>
                  <p className="text-sm text-muted-foreground mt-1">عيادات</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{profile.statistics.totalPatients}</p>
                  <p className="text-sm text-muted-foreground mt-1">مرضى</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">{profile.statistics.totalAppointments}</p>
                  <p className="text-sm text-muted-foreground mt-1">مواعيد</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(profile.statistics.totalRevenue)}</p>
                  <p className="text-sm text-muted-foreground mt-1">إيرادات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          {/* Current Subscription */}
          <Card className="bento-card bg-gradient-to-r from-amber-500 to-orange-600 text-white border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Crown className="w-16 h-16" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">الباقة الحالية: {profile.subscription.planLabel}</h3>
                  <p className="text-white/90">رصيد AI المتبقي: {profile.subscription.aiCredits} رصيد</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profile.subscription.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Plans */}
          <div>
            <h2 className="text-2xl font-bold mb-4">باقات الاشتراك</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subscriptionPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`bento-card ${
                    plan.recommended ? "border-2 border-blue-500 shadow-lg" : ""
                  } ${plan.current ? "border-2 border-green-500" : ""}`}
                >
                  <CardHeader>
                    <div className="text-center space-y-2">
                      {plan.recommended && (
                        <Badge variant="default" className="mb-2">
                          الأكثر شعبية
                        </Badge>
                      )}
                      {plan.current && (
                        <Badge variant="success" className="mb-2">
                          الباقة الحالية
                        </Badge>
                      )}
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold">
                        {plan.price !== null ? formatCurrency(plan.price) : plan.period}
                      </div>
                      {plan.price !== null && (
                        <p className="text-sm text-muted-foreground">{plan.period}</p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-6"
                      variant={plan.current ? "outline" : "default"}
                      disabled={plan.current}
                    >
                      {plan.current ? "الباقة الحالية" : plan.price !== null ? "ترقية الباقة" : "اتصل بنا"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Security Settings */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                الأمان وكلمة المرور
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>تحديث كلمة المرور</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إشعارات المواعيد</p>
                  <p className="text-sm text-muted-foreground">تلقي إشعارات عند حجز مواعيد جديدة</p>
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إشعارات المهام</p>
                  <p className="text-sm text-muted-foreground">تلقي إشعارات عند تعيين مهام جديدة</p>
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إشعارات الرسائل</p>
                  <p className="text-sm text-muted-foreground">تلقي إشعارات عند استلام رسائل جديدة</p>
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إشعارات المخزون</p>
                  <p className="text-sm text-muted-foreground">تلقي تنبيهات عند انخفاض المخزون</p>
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
