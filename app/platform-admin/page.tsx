"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/shared/stat-card"
import {
  Building2,
  Store,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ShieldCheck,
  ShoppingCart,
  GraduationCap,
  Briefcase,
  Crown,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function PlatformAdminOverviewPage() {
  // بيانات تجريبية - سيتم استبدالها بـ API
  const stats = {
    totalClinics: 347,
    activeClinics: 289,
    totalVendors: 56,
    activeVendors: 48,
    pendingVendors: 5,
    totalRevenue: 1250000000, // IQD
    monthlyRevenue: 185000000, // IQD
    subscriptionRevenue: 95000000, // IQD
    marketplaceRevenue: 90000000, // IQD
    monthlyGrowth: 18,
    totalDentists: 402,
    activeDentists: 345,
    totalSubscriptions: 289,
    pendingSubscriptions: 8,
    freeSubscriptions: 58,
    premiumSubscriptions: 231,
  }

  // قائمة انتظار اشتراكات الأطباء
  const pendingSubscriptions = [
    {
      id: "SUB-001",
      dentistName: "د. أحمد محمود",
      clinicName: "عيادة الابتسامة الذكية",
      city: "بغداد",
      plan: "Premium",
      requestDate: "2024-01-20",
      paymentMethod: "تحويل بنكي",
      amount: 2500000,
      status: "pending_verification",
    },
    {
      id: "SUB-002",
      dentistName: "د. سارة علي",
      clinicName: "مركز الأسنان المتقدم",
      city: "البصرة",
      plan: "Enterprise",
      requestDate: "2024-01-20",
      paymentMethod: "وكيل محلي",
      amount: 4500000,
      status: "pending_verification",
    },
    {
      id: "SUB-003",
      dentistName: "د. محمد حسن",
      clinicName: "عيادة النور",
      city: "أربيل",
      plan: "Premium",
      requestDate: "2024-01-19",
      paymentMethod: "تحويل بنكي",
      amount: 2500000,
      status: "pending_verification",
    },
  ]

  // قائمة انتظار الموردين
  const pendingVendors = [
    {
      id: "VND-001",
      companyName: "شركة الطب الحديث للتوريدات",
      ownerName: "علي حسن",
      city: "بغداد",
      requestDate: "2024-01-20",
      category: "معدات طبية",
      status: "pending_approval",
      documentsComplete: true,
    },
    {
      id: "VND-002",
      companyName: "مؤسسة الدقة للمستلزمات الطبية",
      ownerName: "فاطمة محمد",
      city: "النجف",
      requestDate: "2024-01-19",
      category: "مواد استهلاكية",
      status: "pending_approval",
      documentsComplete: true,
    },
    {
      id: "VND-003",
      companyName: "شركة التميز الطبي",
      ownerName: "خالد أحمد",
      city: "كربلاء",
      requestDate: "2024-01-19",
      category: "أجهزة طبية",
      status: "pending_documents",
      documentsComplete: false,
    },
  ]

  // الاختصارات السريعة
  const quickActions = [
    {
      title: "إدارة المنصة",
      description: "إعدادات وتفعيل أقسام المنصة",
      icon: ShieldCheck,
      href: "/platform-admin/platform-settings",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "الاشتراكات والباقات",
      description: "إدارة الخطط والطلبات",
      icon: Crown,
      href: "/platform-admin/subscriptions",
      color: "from-amber-500 to-orange-600",
      badge: stats.pendingSubscriptions,
    },
    {
      title: "المتجر والموردين",
      description: "إدارة الموردين والمنتجات",
      icon: ShoppingCart,
      href: "/platform-admin/marketplace",
      color: "from-green-500 to-green-700",
      badge: stats.pendingVendors,
    },
    {
      title: "المجتمع والتعليم",
      description: "الندوات والدورات",
      icon: GraduationCap,
      href: "/platform-admin/community",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "الوظائف",
      description: "إدارة الوظائف المميزة",
      icon: Briefcase,
      href: "/platform-admin/jobs",
      color: "from-cyan-500 to-cyan-700",
    },
    {
      title: "الدعم الفني",
      description: "متابعة الشكاوى والتذاكر",
      icon: AlertTriangle,
      href: "/platform-admin/support",
      color: "from-red-500 to-red-700",
      badge: 12,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_verification": return <Clock className="w-4 h-4 text-orange-500" />
      case "pending_approval": return <Clock className="w-4 h-4 text-orange-500" />
      case "pending_documents": return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">مركز إدارة المنصة</h1>
          <p className="text-muted-foreground">نظرة عامة شاملة على جميع أقسام المنصة</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            A
          </div>
        </div>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="العيادات المسجلة"
          value={`${stats.activeClinics}/${stats.totalClinics}`}
          icon={Building2}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="الموردين"
          value={`${stats.activeVendors}/${stats.totalVendors}`}
          icon={Store}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="الإيرادات الشهرية"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={DollarSign}
          color="orange"
          trend={{ value: stats.monthlyGrowth, isPositive: true }}
        />
        <StatCard
          title="إجمالي الأطباء"
          value={stats.totalDentists}
          icon={Users}
          color="purple"
        />
      </div>

      {/* إحصائيات ثانوية */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">اشتراكات Premium</p>
                <p className="text-2xl font-bold text-blue-600">{stats.premiumSubscriptions}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Crown className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">طلبات قيد الانتظار</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingSubscriptions}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">موردين بانتظار الموافقة</p>
                <p className="text-2xl font-bold text-red-600">{stats.pendingVendors}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إيرادات الاشتراكات</p>
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(stats.subscriptionRevenue)}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الاختصارات السريعة */}
      <section>
        <h2 className="text-2xl font-bold mb-4">الاختصارات السريعة</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href}>
                <Card className="bento-card hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {action.badge && action.badge > 0 && (
                        <Badge variant="destructive" className="text-sm">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* قوائم الانتظار */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* قائمة انتظار اشتراكات الأطباء */}
        <Card className="bento-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                قائمة انتظار الاشتراكات
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/platform-admin/subscriptions">
                  عرض الكل
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                </Link>
              </Button>
            </div>
            <CardDescription>
              {stats.pendingSubscriptions} طلب اشتراك بانتظار التحقق
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingSubscriptions.map((sub) => (
              <Card key={sub.id} className="bento-card hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold">{sub.dentistName}</h4>
                        <Badge className={getPlanBadgeColor(sub.plan)}>
                          {sub.plan}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{sub.clinicName}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{sub.city}</span>
                      </div>
                    </div>
                    {getStatusIcon(sub.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">طريقة الدفع</p>
                      <p className="font-medium">{sub.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">المبلغ</p>
                      <p className="font-medium text-green-600">{formatCurrency(sub.amount)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle2 className="w-4 h-4 ml-1" />
                      موافقة
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* قائمة انتظار الموردين */}
        <Card className="bento-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                قائمة انتظار الموردين
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/platform-admin/marketplace">
                  عرض الكل
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                </Link>
              </Button>
            </div>
            <CardDescription>
              {stats.pendingVendors} مورد بانتظار الموافقة على التفعيل
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingVendors.map((vendor) => (
              <Card key={vendor.id} className="bento-card hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{vendor.companyName}</h4>
                      <p className="text-sm text-muted-foreground">{vendor.ownerName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {vendor.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{vendor.city}</span>
                        </div>
                      </div>
                    </div>
                    {getStatusIcon(vendor.status)}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {vendor.documentsComplete ? (
                      <Badge variant="success" className="text-xs">
                        <CheckCircle2 className="w-3 h-3 ml-1" />
                        المستندات مكتملة
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <XCircle className="w-3 h-3 ml-1" />
                        مستندات ناقصة
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{vendor.requestDate}</span>
                  </div>

                  <div className="flex gap-2">
                    {vendor.documentsComplete ? (
                      <>
                        <Button size="sm" className="flex-1">
                          <CheckCircle2 className="w-4 h-4 ml-1" />
                          قبول
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1">
                          <XCircle className="w-4 h-4 ml-1" />
                          رفض
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full">
                        طلب المستندات
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
