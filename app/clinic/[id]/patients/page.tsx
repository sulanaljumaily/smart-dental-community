"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/shared/stat-card"
import {
  Users,
  Search,
  Plus,
  Edit,
  FileText,
  TrendingUp,
  Stethoscope,
  UserCheck
} from "lucide-react"
import Link from "next/link"

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // بيانات تجريبية
  const stats = {
    topVisitors: 45,
    perDoctor: {
      "د. محمد": 52,
      "د. سارة": 48,
      "د. خالد": 36,
    },
    perTreatment: {
      "تقويم": 32,
      "زراعة": 28,
      "علاج عصب": 24,
      "تنظيف": 72,
    },
  }

  const patients = [
    {
      id: "1",
      name: "أحمد علي محمد",
      phone: "07701234567",
      age: 28,
      lastVisit: "2024-01-15",
      visits: 12,
      nextAppointment: "2024-01-25",
      doctor: "د. محمد أحمد",
      treatmentPlan: "علاج عصب",
      status: "active",
    },
    {
      id: "2",
      name: "سارة حسن علي",
      phone: "07709876543",
      age: 35,
      lastVisit: "2024-01-10",
      visits: 8,
      nextAppointment: null,
      doctor: "د. سارة علي",
      treatmentPlan: "زراعة أسنان",
      status: "active",
    },
    {
      id: "3",
      name: "محمد خالد أحمد",
      phone: "07801234567",
      age: 42,
      lastVisit: "2024-01-20",
      visits: 15,
      nextAppointment: "2024-02-01",
      doctor: "د. محمد أحمد",
      treatmentPlan: "تركيبات",
      status: "active",
    },
    {
      id: "4",
      name: "فاطمة محمود",
      phone: "07709998877",
      age: 25,
      lastVisit: "2024-01-18",
      visits: 5,
      nextAppointment: "2024-01-28",
      doctor: "د. خالد حسن",
      treatmentPlan: "تقويم",
      status: "active",
    },
    {
      id: "5",
      name: "علي أحمد حسن",
      phone: "07701112233",
      age: 31,
      lastVisit: "2023-12-15",
      visits: 3,
      nextAppointment: null,
      doctor: "د. محمد أحمد",
      treatmentPlan: null,
      status: "inactive",
    },
  ]

  const filteredPatients = patients.filter((patient) =>
    patient.name.includes(searchQuery) || patient.phone.includes(searchQuery)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة المرضى</h2>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة مريض
        </Button>
      </div>

      {/* Interactive Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bento-card hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <Badge variant="success">نشط</Badge>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">الأكثر زيارة</h3>
            <p className="text-3xl font-bold">{stats.topVisitors}</p>
            <p className="text-xs text-muted-foreground mt-2">مريض متكرر</p>
          </CardContent>
        </Card>

        <Card className="bento-card hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm text-muted-foreground mb-2">حسب الطبيب</h3>
            <div className="space-y-2">
              {Object.entries(stats.perDoctor).map(([doctor, count]) => (
                <div key={doctor} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{doctor}</span>
                  <span className="font-bold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm text-muted-foreground mb-2">حسب العلاج</h3>
            <div className="space-y-2">
              {Object.entries(stats.perTreatment).slice(0, 3).map(([treatment, count]) => (
                <div key={treatment} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{treatment}</span>
                  <span className="font-bold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن مريض بالاسم أو رقم الهاتف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">قائمة المرضى</h3>
          <Badge variant="secondary">
            {filteredPatients.length} مريض
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="bento-card hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-lg">{patient.name}</h4>
                        <p className="text-sm text-muted-foreground" dir="ltr">
                          {patient.phone}
                        </p>
                      </div>
                      <Badge variant={patient.status === "active" ? "success" : "secondary"}>
                        {patient.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">العمر</p>
                        <p className="font-semibold">{patient.age} سنة</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">عدد الزيارات</p>
                        <p className="font-semibold">{patient.visits}</p>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">الطبيب المعالج</p>
                      <p className="font-semibold">{patient.doctor}</p>
                    </div>

                    {patient.treatmentPlan && (
                      <Badge variant="outline" className="w-full justify-center">
                        <Stethoscope className="w-3 h-3 ml-1" />
                        {patient.treatmentPlan}
                      </Badge>
                    )}

                    {patient.nextAppointment && (
                      <div className="text-xs text-muted-foreground">
                        الموعد القادم: {patient.nextAppointment}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/clinic/1/patients/${patient.id}`}>
                          <FileText className="w-4 h-4 ml-1" />
                          عرض الملف
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="bento-card">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">
                لم يتم العثور على مرضى مطابقين للبحث
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
