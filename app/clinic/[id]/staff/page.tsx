"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { UserCog, Plus, Edit, DollarSign, Users, TrendingUp } from "lucide-react"

const STAFF_ROLES = [
  { value: "OWNER", label: "مالك", color: "from-purple-500 to-purple-700" },
  { value: "DENTIST", label: "طبيب", color: "from-blue-500 to-blue-700" },
  { value: "ASSISTANT", label: "مساعد", color: "from-green-500 to-green-700" },
  { value: "RECEPTIONIST", label: "استقبال", color: "from-orange-500 to-orange-700" },
  { value: "NURSE", label: "ممرض", color: "from-pink-500 to-pink-700" },
]

export default function StaffPage() {
  const [showDialog, setShowDialog] = useState(false)

  const staff = [
    {
      id: "1",
      name: "د. محمد أحمد",
      role: "OWNER",
      email: "mohammed@example.com",
      phone: "07701234567",
      specialization: "تجميل الأسنان",
      joinedAt: "2023-01-15",
      salary: 3000000,
      isActive: true,
      patientsCount: 156,
      monthlyRevenue: 25000000,
      permissions: ["all"],
    },
    {
      id: "2",
      name: "د. سارة علي",
      role: "DENTIST",
      email: "sara@example.com",
      phone: "07709876543",
      specialization: "علاج العصب",
      joinedAt: "2023-03-20",
      salary: 2500000,
      isActive: true,
      patientsCount: 89,
      monthlyRevenue: 15000000,
      permissions: ["patients", "treatments", "appointments"],
    },
    {
      id: "3",
      name: "أحمد حسن",
      role: "ASSISTANT",
      email: "ahmed@example.com",
      phone: "07801234567",
      joinedAt: "2023-06-10",
      salary: 1000000,
      isActive: true,
      permissions: ["appointments", "inventory"],
    },
    {
      id: "4",
      name: "فاطمة محمود",
      role: "RECEPTIONIST",
      email: "fatima@example.com",
      phone: "07709998877",
      joinedAt: "2023-07-01",
      salary: 900000,
      isActive: true,
      permissions: ["appointments"],
    },
  ]

  const getRoleInfo = (role: string) => {
    return STAFF_ROLES.find(r => r.value === role) || STAFF_ROLES[0]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة الطاقم</h2>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة عضو
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة عضو جديد للطاقم</DialogTitle>
              <DialogDescription>
                أدخل بيانات العضو الجديد
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>الدور الوظيفي</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                  {STAFF_ROLES.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>الاسم الكامل</Label>
                <Input placeholder="محمد أحمد" />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input type="email" placeholder="example@email.com" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input placeholder="07XXXXXXXXX" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>الراتب الشهري</Label>
                <Input type="number" placeholder="1000000" />
              </div>
              <Button className="w-full">إضافة للطاقم</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{staff.length}</p>
            <p className="text-xs text-muted-foreground">إجمالي الطاقم</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <UserCog className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{staff.filter(s => s.role === "DENTIST" || s.role === "OWNER").length}</p>
            <p className="text-xs text-muted-foreground">أطباء</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{formatCurrency(staff.reduce((sum, s) => sum + (s.salary || 0), 0))}</p>
            <p className="text-xs text-muted-foreground">الرواتب الشهرية</p>
          </CardContent>
        </Card>
        <Card className="bento-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{staff.filter(s => s.isActive).length}</p>
            <p className="text-xs text-muted-foreground">نشط</p>
          </CardContent>
        </Card>
      </div>

      {/* Staff Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {staff.map((member) => {
          const roleInfo = getRoleInfo(member.role)

          return (
            <Card key={member.id} className="bento-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className={`text-white text-xl font-bold bg-gradient-to-br ${roleInfo.color}`}>
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{member.specialization || roleInfo.label}</p>
                      </div>
                      <Badge variant={member.isActive ? "success" : "secondary"}>
                        {member.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">البريد</span>
                    <span className="font-medium" dir="ltr">{member.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">الهاتف</span>
                    <span className="font-medium" dir="ltr">{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">تاريخ الانضمام</span>
                    <span className="font-medium">{member.joinedAt}</span>
                  </div>
                </div>

                {/* Salary */}
                {member.salary && (
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-xs text-muted-foreground mb-1">الراتب الشهري</p>
                    <p className="text-lg font-bold text-green-700">
                      {formatCurrency(member.salary)}
                    </p>
                  </div>
                )}

                {/* Doctor Performance */}
                {(member.role === "DENTIST" || member.role === "OWNER") && member.patientsCount && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">المرضى</p>
                      <p className="text-xl font-bold text-blue-700">{member.patientsCount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">الإيرادات</p>
                      <p className="text-sm font-bold text-purple-700">
                        {formatCurrency(member.monthlyRevenue || 0)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Permissions */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold">الصلاحيات</p>
                  <div className="flex flex-wrap gap-2">
                    {member.permissions?.map((perm, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {perm === "all" ? "جميع الصلاحيات" : perm}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 ml-1" />
                    تعديل
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    الصلاحيات
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
