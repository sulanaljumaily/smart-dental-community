"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Star,
  Building2
} from "lucide-react"

interface Clinic {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  description: string
  logo: string | null
  coverImage: string | null
  specialties: string[]
  amenities: string[]
  rating: number
  reviewsCount: number
  workingHours: any
}

export default function BookingPage() {
  const params = useParams()
  const slug = params.slug as string

  const [clinic, setClinic] = useState<Clinic | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientAge: "",
    patientGender: "male",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    symptoms: "",
    isFirstVisit: true,
  })

  useEffect(() => {
    fetchClinicInfo()
  }, [slug])

  const fetchClinicInfo = async () => {
    try {
      const response = await fetch(`/api/booking/clinic/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setClinic(data.clinic)
      }
    } catch (error) {
      console.error("خطأ في جلب معلومات العيادة:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicId: clinic?.id,
          ...formData,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setConfirmationCode(data.booking.confirmationCode)
        setBookingSuccess(true)
      } else {
        const data = await response.json()
        alert(data.message || "فشل الحجز")
      }
    } catch (error) {
      console.error("خطأ في الحجز:", error)
      alert("حدث خطأ أثناء الحجز")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!clinic) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">عيادة غير موجودة</h2>
            <p className="text-muted-foreground mb-4">
              الرابط المطلوب غير صحيح أو العيادة غير متاحة للحجز الرقمي
            </p>
            <Button onClick={() => window.location.href = "/"}>
              العودة للصفحة الرئيسية
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (bookingSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">تم الحجز بنجاح!</h2>
            <p className="text-muted-foreground mb-6">
              تم استلام طلب الحجز بنجاح. سنتواصل معك قريباً للتأكيد.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-2">رمز التأكيد</p>
              <p className="text-3xl font-bold text-blue-600 tracking-wider">
                {confirmationCode}
              </p>
            </div>

            <div className="space-y-3 text-right mb-6">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <span>{clinic.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span>{formData.appointmentDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>{formData.appointmentTime}</span>
              </div>
            </div>

            <Button onClick={() => window.location.href = "/"} className="w-full">
              العودة للصفحة الرئيسية
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Clinic Info */}
        <Card className="mb-8 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              {clinic.logo && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img src={clinic.logo} alt={clinic.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{clinic.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="font-semibold">{clinic.rating.toFixed(1)}</span>
                  </div>
                  {clinic.city && <Badge variant="secondary">{clinic.city}</Badge>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span dir="ltr">{clinic.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">احجز موعدك الآن</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    required
                    dir="ltr"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                    placeholder="07XXXXXXXXX"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">التاريخ *</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    min={today}
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">الوقت *</Label>
                  <Input
                    id="time"
                    type="time"
                    required
                    value={formData.appointmentTime}
                    onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">سبب الزيارة *</Label>
                <Input
                  id="reason"
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">الأعراض</Label>
                <Textarea
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full h-12 text-lg">
                {submitting ? "جاري الحجز..." : "تأكيد الحجز"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
