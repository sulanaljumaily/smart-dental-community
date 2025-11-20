"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  Settings,
  UserCog,
  ExternalLink,
  Search,
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Activity,
  ChevronRight,
  UserCheck,
  UserPlus,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function ClinicsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")

  // بيانات تجريبية - سيتم استبدالها بـ API
  const clinics = [
    {
      id: "1",
      name: "عيادة النجوم لطب الأسنان",
      address: "بغداد - الكرادة - شارع الربيعي",
      city: "بغداد",
      phone: "07701234567",
      workingHours: "9:00 ص - 6:00 م",
      patients: 156,
      todayAppointments: 8,
      completedToday: 5,
      monthlyRevenue: 25000000,
      isActive: true,
      alerts: 1,
      staff: [
        { id: "1", name: "د. سلطان الجميلي", role: "OWNER", specialty: "طب الأسنان العام", avatar: "د.س" },
        { id: "2", name: "د. أحمد محمد", role: "DENTIST", specialty: "تقويم الأسنان", avatar: "د.أ" },
        { id: "3", name: "فاطمة علي", role: "ASSISTANT", specialty: "مساعدة طبية", avatar: "ف" },
        { id: "4", name: "سارة حسن", role: "RECEPTIONIST", specialty: "الاستقبال", avatar: "س" },
        { id: "5", name: "نور كريم", role: "NURSE", specialty: "تمريض", avatar: "ن" },
      ],
    },
    {
      id: "2",
      name: "مركز الابتسامة الطبي",
      address: "بغداد - المنصور - قرب ساحة الفلسطينيين",
      city: "بغداد",
      phone: "07707654321",
      workingHours: "10:00 ص - 7:00 م",
      patients: 91,
      todayAppointments: 4,
      completedToday: 3,
      monthlyRevenue: 15000000,
      isActive: true,
      alerts: 0,
      staff: [
        { id: "6", name: "د. سلطان الجميلي", role: "OWNER", specialty: "طب الأسنان العام", avatar: "د.س" },
        { id: "7", name: "د. زينب خالد", role: "DENTIST", specialty: "جراحة الفم", avatar: "د.ز" },
        { id: "8", name: "ليلى عباس", role: "ASSISTANT", specialty: "مساعدة طبية", avatar: "ل" },
      ],
    },
    {
      id: "3",
      name: "عيادة الأمل التخصصية",
      address: "بغداد - الجادرية - قرب جامعة بغداد",
      city: "بغداد",
      phone: "07709876543",
      workingHours: "8:00 ص - 4:00 م",
      patients: 0,
      todayAppointments: 0,
      completedToday: 0,
      monthlyRevenue: 0,
      isActive: false,
      alerts: 0,
      staff: [
        { id: "9", name: "د. سلطان الجميلي", role: "OWNER", specialty: "طب الأسنان العام", avatar: "د.س" },
      ],
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      OWNER: "المالك",
      DENTIST: "طبيب أسنان",
      ASSISTANT: "مساعد",
      RECEPTIONIST: "موظف استقبال",
      NURSE: "ممرض/ممرضة",
    }
    return roleLabels[role] || role
  }

  const getRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      OWNER: "bg-gradient-to-br from-amber-500 to-orange-600",
      DENTIST: "bg-gradient-to-br from-blue-500 to-blue-700",
      ASSISTANT: "bg-gradient-to-br from-green-500 to-green-700",
      RECEPTIONIST: "bg-gradient-to-br from-purple-500 to-purple-700",
      NURSE: "bg-gradient-to-br from-pink-500 to-pink-700",
    }
    return roleColors[role] || "bg-gradient-to-br from-gray-500 to-gray-700"
  }

  // Filter clinics
  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && clinic.isActive) ||
      (filterStatus === "inactive" && !clinic.isActive)
    return matchesSearch && matchesFilter
  })

  // Statistics
  const totalClinics = clinics.length
  const activeClinics = clinics.filter((c) => c.isActive).length
  const totalPatients = clinics.reduce((sum, c) => sum + c.patients, 0)
  const totalStaff = clinics.reduce((sum, c) => sum + c.staff.length, 0)
  const totalRevenue = clinics.reduce((sum, c) => sum + c.monthlyRevenue, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">إدارة العيادات</h1>
          <p className="text-muted-foreground">إدارة وتنظيم جميع عياداتك وطاقم العمل</p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dentist/clinics/new">
            <Plus className="w-5 h-5 ml-2" />
            إضافة عيادة جديدة
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي العيادات</p>
                <p className="text-2xl font-bold">{totalClinics}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">العيادات النشطة</p>
                <p className="text-2xl font-bold">{activeClinics}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المرضى</p>
                <p className="text-2xl font-bold">{totalPatients}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الطاقم</p>
                <p className="text-2xl font-bold">{totalStaff}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الإيرادات الشهرية</p>
                <p className="text-lg font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن عيادة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
              >
                الكل ({totalClinics})
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                onClick={() => setFilterStatus("active")}
              >
                نشطة ({activeClinics})
              </Button>
              <Button
                variant={filterStatus === "inactive" ? "default" : "outline"}
                onClick={() => setFilterStatus("inactive")}
              >
                غير مفعلة ({totalClinics - activeClinics})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinics List */}
      <div className="space-y-4">
        {filteredClinics.map((clinic) => (
          <Card key={clinic.id} className="bento-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-2xl">{clinic.name}</CardTitle>
                    <Badge variant={clinic.isActive ? "success" : "secondary"}>
                      {clinic.isActive ? "نشط" : "غير مفعل"}
                    </Badge>
                    {clinic.alerts > 0 && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {clinic.alerts} تنبيه
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {clinic.address}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {clinic.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {clinic.workingHours}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dentist/clinics/${clinic.id}/settings`}>
                      <Settings className="w-4 h-4 ml-1" />
                      الإعدادات
                    </Link>
                  </Button>
                  {clinic.isActive && (
                    <Button size="sm" asChild>
                      <Link href={`/clinic/${clinic.id}`}>
                        <ExternalLink className="w-4 h-4 ml-1" />
                        دخول لوحة التحكم
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-accent/50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{clinic.patients}</p>
                  <p className="text-sm text-muted-foreground">مريض مسجل</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {clinic.completedToday}/{clinic.todayAppointments}
                  </p>
                  <p className="text-sm text-muted-foreground">مواعيد اليوم</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{clinic.staff.length}</p>
                  <p className="text-sm text-muted-foreground">طاقم العمل</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(clinic.monthlyRevenue)}
                  </p>
                  <p className="text-sm text-muted-foreground">الإيرادات الشهرية</p>
                </div>
              </div>

              {/* Staff Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <UserCog className="w-5 h-5" />
                    طاقم العمل ({clinic.staff.length})
                  </h3>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dentist/clinics/${clinic.id}/staff`}>
                      <UserPlus className="w-4 h-4 ml-1" />
                      إدارة الطاقم
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {clinic.staff.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-full ${getRoleColor(
                          member.role
                        )} flex items-center justify-center text-white font-bold flex-shrink-0`}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{member.name}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {getRoleLabel(member.role)}
                          </Badge>
                          {member.role === "OWNER" && (
                            <Shield className="w-3 h-3 text-amber-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredClinics.length === 0 && (
          <Card className="bento-card">
            <CardContent className="p-12 text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">لا توجد عيادات</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "لم يتم العثور على عيادات تطابق بحثك"
                  : "ابدأ بإضافة عيادتك الأولى"}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link href="/dentist/clinics/new">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة عيادة جديدة
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
