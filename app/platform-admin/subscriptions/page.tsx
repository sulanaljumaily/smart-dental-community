"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Clock,
  Users,
  DollarSign,
  Gift,
  Ticket,
  FileText,
  MapPin,
  CheckCircle2,
  XCircle,
  Edit,
  Plus,
  TrendingUp,
  Calendar,
  CreditCard,
  UserCheck,
} from "lucide-react"

export default function SubscriptionsManagementPage() {
  const [activeTab, setActiveTab] = useState("plans")

  // الخطط المتاحة
  const plans = [
    {
      id: "1",
      name: "المجانية",
      nameEn: "Free",
      price: 0,
      duration: "دائم",
      features: ["عيادة واحدة", "مرضى غير محدودين", "10 استخدامات AI شهرياً"],
      maxClinics: 1,
      aiUsage: 10,
      subscribers: 58,
      status: "active",
    },
    {
      id: "2",
      name: "Premium",
      nameEn: "Premium",
      price: 2500000,
      duration: "سنوي",
      features: ["حتى 3 عيادات", "مرضى غير محدودين", "100 استخدام AI شهرياً", "تقارير متقدمة"],
      maxClinics: 3,
      aiUsage: 100,
      subscribers: 189,
      status: "active",
    },
    {
      id: "3",
      name: "Enterprise",
      nameEn: "Enterprise",
      price: 4500000,
      duration: "سنوي",
      features: ["عيادات غير محدودة", "مرضى غير محدودين", "استخدام AI غير محدود", "دعم فني مخصص"],
      maxClinics: -1,
      aiUsage: -1,
      subscribers: 42,
      status: "active",
    },
  ]

  // طلبات الاشتراك
  const subscriptionRequests = [
    {
      id: "SUB-001",
      dentistName: "د. أحمد محمود",
      clinicName: "عيادة الابتسامة الذكية",
      city: "بغداد",
      plan: "Premium",
      requestDate: "2024-01-20",
      paymentMethod: "تحويل بنكي",
      amount: 2500000,
      status: "pending",
      proofImage: "/proof1.jpg",
    },
    {
      id: "SUB-002",
      dentistName: "د. سارة علي",
      clinicName: "مركز الأسنان المتقدم",
      city: "البصرة",
      plan: "Enterprise",
      requestDate: "2024-01-20",
      paymentMethod: "وكيل محلي - بغداد",
      agent: "محمد حسن",
      amount: 4500000,
      status: "pending",
    },
  ]

  // الوكلاء المحليون
  const agents = [
    {
      id: "1",
      name: "محمد حسن الجبوري",
      city: "بغداد",
      phone: "+964 770 123 4567",
      email: "agent1@example.com",
      activeSubscriptions: 23,
      totalRevenue: 57500000,
      status: "active",
    },
    {
      id: "2",
      name: "فاطمة أحمد العلي",
      city: "البصرة",
      phone: "+964 771 234 5678",
      email: "agent2@example.com",
      activeSubscriptions: 18,
      totalRevenue: 45000000,
      status: "active",
    },
    {
      id: "3",
      name: "علي حسين المشهداني",
      city: "أربيل",
      phone: "+964 772 345 6789",
      email: "agent3@example.com",
      activeSubscriptions: 15,
      totalRevenue: 37500000,
      status: "active",
    },
  ]

  // طرق الدفع
  const paymentMethods = [
    {
      id: "1",
      name: "تحويل بنكي محلي",
      type: "bank_transfer",
      isActive: true,
      usageCount: 145,
      details: "بنك الرافدين - حساب رقم 123456789",
    },
    {
      id: "2",
      name: "وكيل محلي",
      type: "agent",
      isActive: true,
      usageCount: 98,
      details: "الدفع من خلال وكلائنا في المحافظات",
    },
    {
      id: "3",
      name: "زين كاش",
      type: "zaincash",
      isActive: true,
      usageCount: 67,
      details: "رقم المحفظة: +964 770 XXX XXXX",
    },
  ]

  // القسائم والكوبونات
  const coupons = [
    {
      id: "1",
      code: "DENTAL2024",
      discount: 20,
      type: "percentage",
      maxUses: 100,
      currentUses: 23,
      validUntil: "2024-12-31",
      status: "active",
    },
    {
      id: "2",
      code: "NEWCLINIC",
      discount: 500000,
      type: "fixed",
      maxUses: 50,
      currentUses: 12,
      validUntil: "2024-06-30",
      status: "active",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "Enterprise": return "bg-purple-100 text-purple-700 border-purple-300"
      case "Premium": return "bg-blue-100 text-blue-700 border-blue-300"
      default: return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">إدارة الاشتراكات والباقات</h1>
        <p className="text-muted-foreground">إدارة الخطط والطلبات والوكلاء وطرق الدفع</p>
      </div>

      {/* Tabs System */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 gap-2">
          <TabsTrigger value="plans" className="text-xs lg:text-sm">الخطط</TabsTrigger>
          <TabsTrigger value="requests" className="text-xs lg:text-sm">
            طلبات الاشتراك
            <Badge variant="destructive" className="mr-1 text-xs">8</Badge>
          </TabsTrigger>
          <TabsTrigger value="agents" className="text-xs lg:text-sm">الوكلاء</TabsTrigger>
          <TabsTrigger value="payment" className="text-xs lg:text-sm">طرق الدفع</TabsTrigger>
          <TabsTrigger value="offers" className="text-xs lg:text-sm">العروض</TabsTrigger>
          <TabsTrigger value="coupons" className="text-xs lg:text-sm">القسائم</TabsTrigger>
          <TabsTrigger value="subscribers" className="text-xs lg:text-sm">المشتركون</TabsTrigger>
          <TabsTrigger value="support" className="text-xs lg:text-sm">الدعم</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs lg:text-sm">التقارير</TabsTrigger>
        </TabsList>

        {/* الخطط */}
        <TabsContent value="plans" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">الخطط المتاحة</h2>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة خطة جديدة
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className="bento-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{plan.nameEn}</p>
                    </div>
                    <Crown className={`w-6 h-6 ${
                      plan.name === 'Enterprise' ? 'text-purple-600' :
                      plan.name === 'Premium' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-primary">
                      {plan.price === 0 ? 'مجاناً' : formatCurrency(plan.price)}
                    </p>
                    <p className="text-sm text-muted-foreground">{plan.duration}</p>
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">المشتركون</span>
                      <Badge variant="secondary">{plan.subscribers}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">الحالة</span>
                      <Badge variant="success">نشط</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 ml-1" />
                      تعديل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* طلبات الاشتراك */}
        <TabsContent value="requests" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">طلبات الاشتراك</h2>
            <Badge variant="destructive" className="text-sm">
              {subscriptionRequests.length} طلب قيد الانتظار
            </Badge>
          </div>

          <div className="space-y-3">
            {subscriptionRequests.map((request) => (
              <Card key={request.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{request.dentistName}</h3>
                        <Badge className={getPlanBadgeColor(request.plan)}>
                          {request.plan}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-1">{request.clinicName}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{request.city}</span>
                        <span>•</span>
                        <Calendar className="w-4 h-4" />
                        <span>{request.requestDate}</span>
                      </div>
                    </div>
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xs text-muted-foreground mb-1">رقم الطلب</p>
                      <p className="font-semibold text-blue-700">{request.id}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-xs text-muted-foreground mb-1">المبلغ</p>
                      <p className="font-semibold text-green-700">{formatCurrency(request.amount)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 col-span-2 lg:col-span-1">
                      <p className="text-xs text-muted-foreground mb-1">طريقة الدفع</p>
                      <p className="font-semibold text-purple-700">{request.paymentMethod}</p>
                    </div>
                  </div>

                  {request.agent && (
                    <div className="mb-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
                      <p className="text-xs text-muted-foreground mb-1">الوكيل</p>
                      <p className="font-semibold">{request.agent}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle2 className="w-4 h-4 ml-1" />
                      قبول وتفعيل
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <XCircle className="w-4 h-4 ml-1" />
                      رفض
                    </Button>
                    <Button variant="outline" size="sm">
                      عرض الإثبات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* الوكلاء */}
        <TabsContent value="agents" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">الوكلاء المحليون</h2>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة وكيل جديد
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {agents.map((agent) => (
              <Card key={agent.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{agent.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{agent.city}</span>
                      </div>
                      <Badge variant="success">نشط</Badge>
                    </div>
                    <UserCheck className="w-8 h-8 text-blue-600" />
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">الهاتف:</span>
                      <span className="font-medium" dir="ltr">{agent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">البريد:</span>
                      <span className="font-medium">{agent.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">الاشتراكات النشطة</p>
                      <p className="text-2xl font-bold text-blue-700">{agent.activeSubscriptions}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">إجمالي الإيرادات</p>
                      <p className="text-sm font-bold text-green-700">{formatCurrency(agent.totalRevenue)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 ml-1" />
                      تعديل
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* طرق الدفع */}
        <TabsContent value="payment" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">طرق الدفع</h2>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة طريقة دفع
            </Button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                        <div>
                          <h3 className="font-bold text-lg">{method.name}</h3>
                          <p className="text-sm text-muted-foreground">{method.details}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <Badge variant={method.isActive ? "success" : "secondary"} className="mb-2">
                        {method.isActive ? "مفعّل" : "غير مفعّل"}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        استخدم {method.usageCount} مرة
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* القسائم */}
        <TabsContent value="coupons" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">القسائم والكوبونات</h2>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة قسيمة جديدة
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {coupons.map((coupon) => (
              <Card key={coupon.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Ticket className="w-6 h-6 text-orange-600" />
                        <h3 className="font-bold text-xl">{coupon.code}</h3>
                      </div>
                      <Badge variant="success">نشط</Badge>
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-orange-600">
                        {coupon.type === 'percentage'
                          ? `${coupon.discount}%`
                          : formatCurrency(coupon.discount)
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">خصم</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">الاستخدام:</span>
                      <span className="font-medium">{coupon.currentUses} / {coupon.maxUses}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">صالح حتى:</span>
                      <span className="font-medium">{coupon.validUntil}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{width: `${(coupon.currentUses / coupon.maxUses) * 100}%`}}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 ml-1" />
                      تعديل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* المشتركون */}
        <TabsContent value="subscribers" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">قائمة المشتركين</h2>
            <Card className="bento-card">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  جدول شامل بجميع المشتركين مع إمكانية البحث والتصفية
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* الدعم */}
        <TabsContent value="support" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">دعم المشتركين</h2>
            <Card className="bento-card">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  نظام الدعم الفني للمشتركين وحل المشاكل
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* التقارير */}
        <TabsContent value="reports" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">التقارير والإحصائيات</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bento-card">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <h3 className="font-bold mb-2">تقرير الإيرادات</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    تحليل شامل للإيرادات حسب الفترة
                  </p>
                  <Button variant="outline" size="sm">عرض التقرير</Button>
                </CardContent>
              </Card>

              <Card className="bento-card">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-bold mb-2">تقرير المشتركين</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    إحصائيات المشتركين والخطط
                  </p>
                  <Button variant="outline" size="sm">عرض التقرير</Button>
                </CardContent>
              </Card>

              <Card className="bento-card">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-bold mb-2">تقرير شامل</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    تقرير شامل عن جميع الاشتراكات
                  </p>
                  <Button variant="outline" size="sm">عرض التقرير</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* العروض */}
        <TabsContent value="offers" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">العروض الخاصة</h2>
            <Card className="bento-card">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  إدارة العروض والخصومات الموسمية
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
