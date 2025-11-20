"use client"

import { useState } from "react"
import { useBookingStore } from "@/lib/stores/booking-store"
import { useNotificationStore } from "@/lib/stores/notification-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, Loader2, CheckCircle2, User, Phone } from "lucide-react"

// بيانات تجريبية للتخصصات والأطباء
const specialties = [
  { id: "general", name: "علاج عام" },
  { id: "orthodontics", name: "تقويم الأسنان" },
  { id: "surgery", name: "جراحة الفم والأسنان" },
  { id: "implants", name: "زراعة الأسنان" },
  { id: "cosmetic", name: "تجميل الأسنان" },
  { id: "pediatric", name: "طب أسنان الأطفال" },
]

const doctors = [
  { id: "dr1", name: "د. محمد أحمد", specialty: "general" },
  { id: "dr2", name: "د. سارة علي", specialty: "orthodontics" },
  { id: "dr3", name: "د. خالد حسن", specialty: "surgery" },
  { id: "dr4", name: "د. فاطمة محمود", specialty: "implants" },
  { id: "dr5", name: "د. أحمد عبدالله", specialty: "cosmetic" },
  { id: "dr6", name: "د. ليلى إبراهيم", specialty: "pediatric" },
]

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30", "18:00"
]

export function BookingDialog() {
  const { isDialogOpen, closeBookingDialog, selectedClinic, createBooking } = useBookingStore()
  const { addNotification } = useNotificationStore()

  const [isLoading, setIsLoading] = useState(false)
  const [specialty, setSpecialty] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [patientName, setPatientName] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [notes, setNotes] = useState("")

  // تصفية الأطباء حسب التخصص المختار
  const filteredDoctors = specialty
    ? doctors.filter(doc => doc.specialty === specialty)
    : doctors

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!doctorId || !date || !time || !patientName || !patientPhone) {
      addNotification({
        title: "بيانات ناقصة",
        message: "الرجاء ملء جميع الحقول المطلوبة",
        type: "warning"
      })
      return
    }

    setIsLoading(true)

    try {
      const selectedDoctor = doctors.find(d => d.id === doctorId)

      await createBooking({
        clinicId: selectedClinic?.id || "clinic-1",
        clinicName: selectedClinic?.name || "عيادة النور لطب الأسنان",
        doctorId,
        doctorName: selectedDoctor?.name || "طبيب",
        specialty: specialties.find(s => s.id === specialty)?.name || "علاج عام",
        date,
        time,
        patientName,
        patientPhone,
        notes: notes || undefined,
      })

      addNotification({
        title: "تم إرسال طلب الحجز بنجاح",
        message: `سيتم التواصل معك قريباً على الرقم ${patientPhone}`,
        type: "success"
      })

      // إعادة تعيين النموذج
      setSpecialty("")
      setDoctorId("")
      setDate("")
      setTime("")
      setPatientName("")
      setPatientPhone("")
      setNotes("")

      closeBookingDialog()
    } catch (error) {
      addNotification({
        title: "خطأ في إرسال الحجز",
        message: "حدث خطأ أثناء إرسال طلب الحجز، الرجاء المحاولة مرة أخرى",
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // الحصول على تاريخ اليوم بصيغة YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0]

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeBookingDialog()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            حجز موعد
          </DialogTitle>
          <DialogDescription>
            {selectedClinic
              ? `حجز موعد في ${selectedClinic.name}`
              : "احجز موعدك مع أفضل الأطباء"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Specialty Selection */}
          <div className="space-y-2">
            <Label htmlFor="specialty">التخصص المطلوب *</Label>
            <Select value={specialty} onValueChange={setSpecialty} required>
              <SelectTrigger>
                <SelectValue placeholder="اختر التخصص" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((spec) => (
                  <SelectItem key={spec.id} value={spec.id}>
                    {spec.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Doctor Selection */}
          <div className="space-y-2">
            <Label htmlFor="doctor">الطبيب *</Label>
            <Select value={doctorId} onValueChange={setDoctorId} required disabled={!specialty}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الطبيب" />
              </SelectTrigger>
              <SelectContent>
                {filteredDoctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              التاريخ *
            </Label>
            <Input
              id="date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="text-right"
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              الوقت *
            </Label>
            <Select value={time} onValueChange={setTime} required>
              <SelectTrigger>
                <SelectValue placeholder="اختر الوقت" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Patient Name */}
          <div className="space-y-2">
            <Label htmlFor="patientName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              اسم المريض *
            </Label>
            <Input
              id="patientName"
              type="text"
              placeholder="الاسم الكامل"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              className="text-right"
            />
          </div>

          {/* Patient Phone */}
          <div className="space-y-2">
            <Label htmlFor="patientPhone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              رقم الهاتف *
            </Label>
            <Input
              id="patientPhone"
              type="tel"
              placeholder="07XXXXXXXXX"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              required
              className="text-right"
              dir="ltr"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
            <Textarea
              id="notes"
              placeholder="أي ملاحظات أو معلومات إضافية..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="text-right resize-none"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeBookingDialog}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  إرسال طلب الحجز
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
