"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building2,
  Globe,
  Users,
} from "lucide-react"

interface Clinic {
  id: string
  name: string
  address?: string
  city?: string
  phone?: string
  email?: string
  description?: string
  logo?: string
  coverImage?: string
  specialties: string[]
  amenities: string[]
  languages: string[]
  rating: number
  reviewsCount: number
  workingHours: any
  onlineBookingEnabled: boolean
  bookingSlotDuration: number
  maxBookingsPerDay: number
  latitude?: number
  longitude?: number
}

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [clinic, setClinic] = useState<Clinic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")

  // Form data
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientAge: "",
    patientGender: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    symptoms: "",
    isFirstVisit: true,
  })

  // Fetch clinic data
  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const response = await fetch(`/api/clinics/${slug}`)
        const data = await response.json()

        if (response.ok) {
          setClinic(data)
          if (!data.onlineBookingEnabled) {
            setError("الحجز الرقمي غير مفعل لهذه العيادة")
          }
        } else {
          setError(data.message || "العيادة غير موجودة")
        }
      } catch (err) {
        setError("حدث خطأ في تحميل بيانات العيادة")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchClinic()
    }
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clinic?.onlineBookingEnabled) {
      setError("الحجز الرقمي غير مفعل لهذه العيادة")
      return
    }

    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clinicId: clinic.id,
          ...formData,
          patientAge: formData.patientAge ? parseInt(formData.patientAge) : undefined,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setConfirmationCode(data.booking.confirmationCode)
      } else {
        setError(data.message || "حدث خطأ أثناء الحجز")
      }
    } catch (err) {
      setError("حدث خطأ أثناء معالجة الطلب")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (error && !clinic) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">عذراً</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => router.push("/")}>العودة للصفحة الرئيسية</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
        <Card className="max-w-2xl w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-2">تم استلام طلب الحجز بنجاح!</h2>
              <p className="text-muted-foreground mb-6">
                شكراً لك على حجز موعد في {clinic?.name}. سنتواصل معك قريباً لتأكيد الموعد.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-sm text-blue-900 mb-2">رمز التأكيد الخاص بك:</p>
                <p className="text-3xl font-bold text-blue-600 tracking-wider">{confirmationCode}</p>
                <p className="text-xs text-blue-700 mt-2">احتفظ بهذا الرمز للمراجعة</p>
              </div>

              <div className="text-right bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">اسم المريض:</span>
                  <span className="font-semibold">{formData.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span className="font-semibold">{formData.appointmentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الوقت:</span>
                  <span className="font-semibold">{formData.appointmentTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الهاتف:</span>
                  <span className="font-semibold" dir="ltr">{formData.patientPhone}</span>
                </div>
              </div>

              {clinic?.phone && (
                <p className="text-sm text-muted-foreground mb-4">
                  للاستفسار يمكنك التواصل معنا على: <span className="font-semibold" dir="ltr">{clinic.phone}</span>
                </p>
              )}

              <Button onClick={() => router.push("/")}>العودة للصفحة الرئيسية</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Clinic Header */}
        <div className="mb-8">
          {clinic?.coverImage && (
            <div className="h-64 rounded-xl overflow-hidden mb-6">
              <img src={clinic.coverImage} alt={clinic.name} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-start gap-6">
            {clinic?.logo && (
              <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <img src={clinic.logo} alt={clinic.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{clinic?.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-3">
                    {clinic?.city && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{clinic.city}</span>
                      </div>
                    )}
                    {clinic?.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{clinic.rating}</span>
                        <span className="text-sm">({clinic.reviewsCount} تقييم)</span>
                      </div>
                    )}
                  </div>
                </div>

                {clinic?.onlineBookingEnabled && (
                  <Badge className="bg-green-600">
                    <CheckCircle className="w-3 h-3 ml-1" />
                    الحجز الرقمي متاح
                  </Badge>
                )}
              </div>

              {clinic?.description && (
                <p className="text-muted-foreground leading-relaxed">{clinic.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {clinic?.specialties?.map((specialty, index) => (
                  <Badge key={index} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clinic Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bento-card">
              <CardHeader>
                <CardTitle className="text-lg">معلومات الاتصال</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {clinic?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span dir="ltr">{clinic.phone}</span>
                  </div>
                )}
                {clinic?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span dir="ltr">{clinic.email}</span>
                  </div>
                )}
                {clinic?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <span>{clinic.address}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {clinic?.amenities && clinic.amenities.length > 0 && (
              <Card className="bento-card">
                <CardHeader>
                  <CardTitle className="text-lg">المرافق المتاحة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {clinic.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {clinic?.languages && clinic.languages.length > 0 && (
              <Card className="bento-card">
                <CardHeader>
                  <CardTitle className="text-lg">اللغات المتاحة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {clinic.languages.map((lang, index) => (
                      <Badge key={index} variant="outline">
                        <Globe className="w-3 h-3 ml-1" />
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="bento-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  احجز موعدك الآن
                </CardTitle>
                <CardDescription>
                  املأ النموذج التالي وسنتواصل معك لتأكيد الموعد
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!clinic?.onlineBookingEnabled ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">الحجز الرقمي غير متاح حالياً</h3>
                    <p className="text-muted-foreground mb-4">
                      يرجى التواصل مع العيادة مباشرة لحجز موعد
                    </p>
                    {clinic?.phone && (
                      <Button asChild>
                        <a href={`tel:${clinic.phone}`}>
                          <Phone className="w-4 h-4 ml-2" />
                          اتصل الآن: {clinic.phone}
                        </a>
                      </Button>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">الاسم الكامل *</Label>
                        <Input
                          id="patientName"
                          required
                          value={formData.patientName}
                          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patientPhone">رقم الهاتف *</Label>
                        <Input
                          id="patientPhone"
                          type="tel"
                          required
                          value={formData.patientPhone}
                          onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                          placeholder="07XXXXXXXXX"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientEmail">البريد الإلكتروني (اختياري)</Label>
                        <Input
                          id="patientEmail"
                          type="email"
                          value={formData.patientEmail}
                          onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                          placeholder="example@email.com"
                          dir="ltr"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patientAge">العمر (اختياري)</Label>
                        <Input
                          id="patientAge"
                          type="number"
                          value={formData.patientAge}
                          onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                          placeholder="25"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patientGender">الجنس (اختياري)</Label>
                      <select
                        id="patientGender"
                        className="w-full h-10 rounded-md border border-input bg-background px-3"
                        value={formData.patientGender}
                        onChange={(e) => setFormData({ ...formData, patientGender: e.target.value })}
                      >
                        <option value="">اختر الجنس</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointmentDate">تاريخ الموعد *</Label>
                        <Input
                          id="appointmentDate"
                          type="date"
                          required
                          value={formData.appointmentDate}
                          onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="appointmentTime">وقت الموعد المفضل *</Label>
                        <Input
                          id="appointmentTime"
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
                        placeholder="مثال: فحص دوري، ألم في الأسنان، تنظيف، إلخ"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symptoms">الأعراض أو التفاصيل (اختياري)</Label>
                      <textarea
                        id="symptoms"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                        value={formData.symptoms}
                        onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                        placeholder="صف الأعراض أو أي تفاصيل إضافية تود إبلاغنا بها"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isFirstVisit"
                        checked={formData.isFirstVisit}
                        onChange={(e) => setFormData({ ...formData, isFirstVisit: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="isFirstVisit" className="cursor-pointer">
                        هذه أول زيارة لي للعيادة
                      </Label>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-900">
                          <p className="font-semibold mb-1">ملاحظة مهمة:</p>
                          <p>
                            بعد إرسال الطلب، سيتم التواصل معك من قبل العيادة لتأكيد الموعد.
                            يرجى التأكد من صحة رقم الهاتف المدخل.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-lg"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                          جاري الحجز...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-5 h-5 ml-2" />
                          تأكيد الحجز
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
