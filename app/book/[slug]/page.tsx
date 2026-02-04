"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Star,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  User,
  Users,
} from "lucide-react"

interface Clinic {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  description: string
  logo: string
  coverImage: string
  specialties: string[]
  amenities: string[]
  languages: string[]
  rating: number
  reviewsCount: number
  workingHours: any
  onlineBookingEnabled: boolean
  bookingSlotDuration: number
  maxBookingsPerDay: number
}

export default function BookingPage() {
  const params = useParams()
  const slug = params.slug as string

  const [clinic, setClinic] = useState<Clinic | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

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

  useEffect(() => {
    fetchClinicData()
  }, [slug])

  const fetchClinicData = async () => {
    try {
      const response = await fetch(`/api/clinics/${slug}`)
      if (!response.ok) throw new Error("العيادة غير موجودة")

      const data = await response.json()
      setClinic(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          clinicId: clinic?.id,
          patientAge: formData.patientAge ? parseInt(formData.patientAge) : undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "حدث خطأ أثناء الحجز")
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (error && !clinic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4">
        <Card className="max-w-md w-full bento-card">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">العيادة غير متاحة</h2>
            <p className="text-gray-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!clinic?.onlineBookingEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4">
        <Card className="max-w-md w-full bento-card">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">الحجز غير متاح</h2>
            <p className="text-gray-600">عذراً، الحجز الرقمي غير مفعّل لهذه العيادة حالياً</p>
            <p className="text-gray-600 mt-2">يرجى الاتصال على: {clinic?.phone}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4">
        <Card className="max-w-md w-full bento-card">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">تم الحجز بنجاح!</h2>
            <p className="text-gray-600 mb-4">
              شكراً لك! تم استلام طلب الحجز وسيتم التواصل معك قريباً للتأكيد.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>ملاحظة:</strong> سيتم إرسال رسالة تأكيد على رقم الهاتف المُدخل
              </p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="bg-teal-600 hover:bg-teal-700"
            >
              حجز موعد آخر
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-teal-600 to-blue-600 overflow-hidden">
        {clinic.coverImage && (
          <img
            src={clinic.coverImage}
            alt={clinic.name}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-4">
              {clinic.logo && (
                <img
                  src={clinic.logo}
                  alt={clinic.name}
                  className="w-16 h-16 rounded-full bg-white p-1"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold">{clinic.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white/90">
                    {clinic.rating.toFixed(1)} ({clinic.reviewsCount} تقييم)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* معلومات العيادة */}
          <div className="lg:col-span-1 space-y-4">
            {/* البطاقة الرئيسية */}
            <Card className="bento-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  معلومات العيادة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">العنوان</p>
                    <p className="text-sm text-gray-600">{clinic.address}, {clinic.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">الهاتف</p>
                    <p className="text-sm text-gray-600 direction-ltr text-right">{clinic.phone}</p>
                  </div>
                </div>

                {clinic.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">البريد الإلكتروني</p>
                      <p className="text-sm text-gray-600 direction-ltr text-right">{clinic.email}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* التخصصات */}
            {clinic.specialties && clinic.specialties.length > 0 && (
              <Card className="bento-card">
                <CardHeader>
                  <CardTitle className="text-base">التخصصات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {clinic.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* المرافق */}
            {clinic.amenities && clinic.amenities.length > 0 && (
              <Card className="bento-card">
                <CardHeader>
                  <CardTitle className="text-base">المرافق المتاحة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {clinic.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* اللغات */}
            {clinic.languages && clinic.languages.length > 0 && (
              <Card className="bento-card">
                <CardHeader>
                  <CardTitle className="text-base">اللغات المتاحة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {clinic.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* نموذج الحجز */}
          <div className="lg:col-span-2">
            <Card className="bento-card">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  احجز موعدك الآن
                </CardTitle>
                <p className="text-sm text-gray-600">
                  املأ النموذج أدناه وسيتم التواصل معك للتأكيد
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* معلومات المريض */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      معلومات المريض
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patientName">الاسم الكامل *</Label>
                        <Input
                          id="patientName"
                          value={formData.patientName}
                          onChange={(e) =>
                            setFormData({ ...formData, patientName: e.target.value })
                          }
                          required
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>

                      <div>
                        <Label htmlFor="patientPhone">رقم الهاتف *</Label>
                        <Input
                          id="patientPhone"
                          type="tel"
                          value={formData.patientPhone}
                          onChange={(e) =>
                            setFormData({ ...formData, patientPhone: e.target.value })
                          }
                          required
                          placeholder="07XX XXX XXXX"
                          dir="ltr"
                          className="text-right"
                        />
                      </div>

                      <div>
                        <Label htmlFor="patientEmail">البريد الإلكتروني (اختياري)</Label>
                        <Input
                          id="patientEmail"
                          type="email"
                          value={formData.patientEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, patientEmail: e.target.value })
                          }
                          placeholder="example@email.com"
                          dir="ltr"
                          className="text-right"
                        />
                      </div>

                      <div>
                        <Label htmlFor="patientAge">العمر (اختياري)</Label>
                        <Input
                          id="patientAge"
                          type="number"
                          value={formData.patientAge}
                          onChange={(e) =>
                            setFormData({ ...formData, patientAge: e.target.value })
                          }
                          placeholder="25"
                          min="1"
                          max="120"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="patientGender">الجنس</Label>
                        <select
                          id="patientGender"
                          value={formData.patientGender}
                          onChange={(e) =>
                            setFormData({ ...formData, patientGender: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">اختر الجنس</option>
                          <option value="male">ذكر</option>
                          <option value="female">أنثى</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* تفاصيل الموعد */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      تفاصيل الموعد
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="appointmentDate">التاريخ *</Label>
                        <Input
                          id="appointmentDate"
                          type="date"
                          value={formData.appointmentDate}
                          onChange={(e) =>
                            setFormData({ ...formData, appointmentDate: e.target.value })
                          }
                          required
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div>
                        <Label htmlFor="appointmentTime">الوقت المفضل *</Label>
                        <Input
                          id="appointmentTime"
                          type="time"
                          value={formData.appointmentTime}
                          onChange={(e) =>
                            setFormData({ ...formData, appointmentTime: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="reason">سبب الزيارة *</Label>
                        <Textarea
                          id="reason"
                          value={formData.reason}
                          onChange={(e) =>
                            setFormData({ ...formData, reason: e.target.value })
                          }
                          required
                          placeholder="مثال: ألم في الأسنان، فحص دوري، تنظيف، إلخ..."
                          rows={3}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="symptoms">الأعراض (اختياري)</Label>
                        <Textarea
                          id="symptoms"
                          value={formData.symptoms}
                          onChange={(e) =>
                            setFormData({ ...formData, symptoms: e.target.value })
                          }
                          placeholder="اذكر أي أعراض تعاني منها..."
                          rows={2}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.isFirstVisit}
                            onChange={(e) =>
                              setFormData({ ...formData, isFirstVisit: e.target.checked })
                            }
                            className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                          />
                          <span className="text-sm text-gray-700">
                            هذه زيارتي الأولى لهذه العيادة
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-6 text-lg"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin ml-2" />
                        جاري الحجز...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 ml-2" />
                        تأكيد الحجز
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    بالضغط على &quot;تأكيد الحجز&quot; فإنك توافق على سياسة الخصوصية وشروط الاستخدام
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
