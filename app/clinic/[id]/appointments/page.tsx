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
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  User,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [showAddAppointment, setShowAddAppointment] = useState(false)
  const [showAddPatient, setShowAddPatient] = useState(false)

  // Generate week days for horizontal calendar
  const getWeekDays = () => {
    const days = []
    const current = new Date(selectedDate)
    current.setDate(current.getDate() - current.getDay()) // Start from Sunday

    for (let i = 0; i < 14; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    return days
  }

  const weekDays = getWeekDays()

  // بيانات تجريبية
  const doctors = [
    { id: "all", name: "جميع الأطباء" },
    { id: "1", name: "د. محمد أحمد" },
    { id: "2", name: "د. سارة علي" },
    { id: "3", name: "د. خالد حسن" },
  ]

  const appointments = [
    {
      id: "1",
      patientName: "أحمد علي محمد",
      doctorName: "د. محمد أحمد",
      time: "09:00 ص",
      duration: 30,
      type: "فحص دوري",
      status: "confirmed",
      phone: "07701234567",
      isDigital: false,
    },
    {
      id: "2",
      patientName: "سارة حسن علي",
      doctorName: "د. سارة علي",
      time: "10:00 ص",
      duration: 60,
      type: "علاج عصب",
      status: "pending",
      phone: "07709876543",
      isDigital: false,
    },
    {
      id: "3",
      patientName: "محمد خالد أحمد",
      doctorName: "د. محمد أحمد",
      time: "11:30 ص",
      duration: 45,
      type: "زراعة أسنان",
      status: "confirmed",
      phone: "07801234567",
      isDigital: false,
    },
    {
      id: "6",
      patientName: "يوسف حسين محمد",
      doctorName: "د. محمد أحمد",
      time: "01:00 م",
      duration: 30,
      type: "فحص دوري",
      status: "digital_pending",
      phone: "07701234567",
      isDigital: true,
      needsConfirmation: true,
      digitalBookingDate: "2024-01-20",
    },
    {
      id: "4",
      patientName: "فاطمة محمود",
      doctorName: "د. خالد حسن",
      time: "02:00 م",
      duration: 30,
      type: "تنظيف",
      status: "completed",
      phone: "07709998877",
      isDigital: false,
    },
    {
      id: "5",
      patientName: "علي أحمد حسن",
      doctorName: "د. محمد أحمد",
      time: "03:00 م",
      duration: 30,
      type: "تركيبات",
      status: "confirmed",
      phone: "07701112233",
      isDigital: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success"
      case "pending":
        return "warning"
      case "digital_pending":
        return "info"
      case "completed":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "مؤكد"
      case "pending":
        return "قيد الانتظار"
      case "digital_pending":
        return "حجز رقمي - يحتاج تأكيد"
      case "completed":
        return "مكتمل"
      case "cancelled":
        return "ملغى"
      default:
        return status
    }
  }

  const formatDate = (date: Date) => {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: date.getMonth() + 1,
    }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const filteredAppointments = selectedDoctor && selectedDoctor !== "all"
    ? appointments.filter(apt => apt.doctorName.includes(selectedDoctor))
    : appointments

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">الحجوزات والمواعيد</h2>
        <div className="flex gap-2">
          <Dialog open={showAddPatient} onOpenChange={setShowAddPatient}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 ml-2" />
                إضافة مريض
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة مريض جديد</DialogTitle>
                <DialogDescription>
                  أدخل بيانات المريض الجديد
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-name">الاسم الكامل</Label>
                  <Input id="patient-name" placeholder="أحمد علي محمد" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-phone">رقم الهاتف</Label>
                  <Input id="patient-phone" placeholder="07701234567" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-age">العمر</Label>
                  <Input id="patient-age" type="number" placeholder="25" />
                </div>
                <Button className="w-full">حفظ المريض</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showAddAppointment} onOpenChange={setShowAddAppointment}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                إضافة موعد
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة موعد جديد</DialogTitle>
                <DialogDescription>
                  حدد تفاصيل الموعد الجديد
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>المريض</Label>
                  <Input placeholder="ابحث عن مريض..." />
                </div>
                <div className="space-y-2">
                  <Label>الطبيب</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option>د. محمد أحمد</option>
                    <option>د. سارة علي</option>
                    <option>د. خالد حسن</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>التاريخ</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>الوقت</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>نوع العلاج</Label>
                  <Input placeholder="فحص دوري" />
                </div>
                <Button className="w-full">حفظ الموعد</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Horizontal Calendar */}
      <Card className="bento-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              التقويم
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {weekDays.map((date, index) => {
              const { day, date: dateNum, month } = formatDate(date)
              const today = isToday(date)
              const selected = isSelected(date)

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "flex flex-col items-center gap-2 min-w-[70px] p-3 rounded-xl transition-all",
                    selected
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : today
                      ? "bg-blue-50 border-2 border-primary text-primary"
                      : "hover:bg-accent"
                  )}
                >
                  <span className="text-xs font-medium">{day}</span>
                  <span className="text-2xl font-bold">{dateNum}</span>
                  <span className="text-xs">{month}</span>
                  {today && !selected && (
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Doctor Filter */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {doctors.map((doctor) => (
              <Button
                key={doctor.id}
                variant={selectedDoctor === doctor.id ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedDoctor(doctor.id)}
              >
                {doctor.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            مواعيد {formatDate(selectedDate).day} - {formatDate(selectedDate).date}/{formatDate(selectedDate).month}
          </h3>
          <Badge variant="secondary">
            {filteredAppointments.length} موعد
          </Badge>
        </div>

        <div className="space-y-3">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className={`bento-card hover:shadow-lg transition-shadow ${appointment.isDigital ? 'border-2 border-blue-400' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {appointment.patientName.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg">{appointment.patientName}</h4>
                          {appointment.isDigital && (
                            <Badge variant="info" className="text-xs">حجز رقمي</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                      </div>
                      <Badge variant={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                        <span className="text-xs">({appointment.duration} دقيقة)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{appointment.doctorName}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {appointment.type}
                    </Badge>

                    {appointment.isDigital && appointment.needsConfirmation && (
                      <div className="flex gap-2 mt-3 pt-3 border-t">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="w-4 h-4 ml-1" />
                          الاتصال للتأكيد
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 ml-1" />
                          تعديل الموعد
                        </Button>
                        <Button size="sm" className="flex-1">
                          <CheckCircle2 className="w-4 h-4 ml-1" />
                          تأكيد وإضافة
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAppointments.length === 0 && (
            <Card className="bento-card">
              <CardContent className="p-12 text-center">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">لا توجد مواعيد</h3>
                <p className="text-muted-foreground mb-4">
                  لا توجد مواعيد محجوزة لهذا اليوم
                </p>
                <Button onClick={() => setShowAddAppointment(true)}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة موعد جديد
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
