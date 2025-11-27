"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Calendar,
  Link2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Globe,
  Settings,
  Copy,
  ExternalLink,
  Crown,
  Zap
} from "lucide-react"

interface ClinicBookingSettings {
  bookingLink: string
  onlineBookingEnabled: boolean
  showOnMap: boolean
  bookingSlotDuration: number
  maxBookingsPerDay: number
  requireApproval: boolean
  autoConfirm: boolean
}

interface Subscription {
  planType: string
  allowOnlineBooking: boolean
  allowMapDisplay: boolean
  isActive: boolean
  endDate: string
}

export default function BookingSettingsPage() {
  const params = useParams()
  const clinicId = params.id as string

  const [settings, setSettings] = useState<ClinicBookingSettings>({
    bookingLink: "",
    onlineBookingEnabled: false,
    showOnMap: false,
    bookingSlotDuration: 30,
    maxBookingsPerDay: 20,
    requireApproval: true,
    autoConfirm: false,
  })

  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchSettings()
    fetchSubscription()
  }, [clinicId])

  const fetchSettings = async () => {
    try {
      const response = await fetch(`/api/clinics/${clinicId}/booking-settings`)
      if (response.ok) {
        const data = await response.json()
        setSettings(data.settings)
      }
    } catch (error) {
      console.error("خطأ في جلب الإعدادات:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`/api/clinics/${clinicId}/subscription`)
      if (response.ok) {
        const data = await response.json()
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error("خطأ في جلب الاشتراك:", error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/clinics/${clinicId}/booking-settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert("تم حفظ الإعدادات بنجاح")
      } else {
        const data = await response.json()
        alert(data.error || "فشل حفظ الإعدادات")
      }
    } catch (error) {
      console.error("خطأ في حفظ الإعدادات:", error)
      alert("حدث خطأ أثناء حفظ الإعدادات")
    } finally {
      setSaving(false)
    }
  }

  const handleCopyLink = () => {
    const bookingUrl = `${window.location.origin}/booking/${settings.bookingLink}`
    navigator.clipboard.writeText(bookingUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBookingLinkChange = (value: string) => {
    // تحويل إلى slug صحيح
    const slug = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\u0621-\u064Aa-z0-9-]/g, '')
      .replace(/-+/g, '-')

    setSettings({ ...settings, bookingLink: slug })
  }

  const canUseBooking = subscription?.allowOnlineBooking && subscription?.isActive
  const canUseMap = subscription?.allowMapDisplay && subscription?.isActive
  const isPremium = subscription && subscription.planType !== "FREE"

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">إعدادات الحجز الرقمي</h1>
        <p className="text-muted-foreground">
          قم بإعداد وإدارة نظام الحجز الرقمي لعيادتك
        </p>
      </div>

      {/* Subscription Status */}
      {subscription && (
        <Card className={`border-2 ${isPremium ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50' : 'border-gray-300'}`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${isPremium ? 'bg-amber-500' : 'bg-gray-400'}`}>
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {subscription.planType === "FREE" && "الباقة المجانية"}
                    {subscription.planType === "BASIC" && "الباقة الأساسية"}
                    {subscription.planType === "PROFESSIONAL" && "الباقة الاحترافية"}
                    {subscription.planType === "ENTERPRISE" && "الباقة المؤسسية"}
                  </h3>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      {canUseBooking ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={canUseBooking ? "text-green-700" : "text-gray-500"}>
                        الحجز الرقمي
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {canUseMap ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={canUseMap ? "text-green-700" : "text-gray-500"}>
                        الخريطة التفاعلية
                      </span>
                    </div>
                  </div>
                  {subscription.endDate && (
                    <p className="text-sm text-muted-foreground mt-2">
                      تنتهي في: {new Date(subscription.endDate).toLocaleDateString('ar-IQ')}
                    </p>
                  )}
                </div>
              </div>
              {!isPremium && (
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  onClick={() => window.location.href = `/dentist/subscription`}
                >
                  <Zap className="w-4 h-4 ml-2" />
                  ترقية الباقة
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {!canUseBooking && (
        <Card className="border-amber-500 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900 mb-1">
                  ميزة الحجز الرقمي غير متاحة
                </h3>
                <p className="text-amber-800 mb-3">
                  للاستفادة من ميزة الحجز الرقمي وإظهار عيادتك في الخريطة التفاعلية، يرجى الترقية إلى إحدى الباقات المدفوعة.
                </p>
                <Button
                  variant="default"
                  className="bg-amber-500 hover:bg-amber-600"
                  onClick={() => window.location.href = `/dentist/subscription`}
                >
                  <Crown className="w-4 h-4 ml-2" />
                  عرض الباقات المتاحة
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Link Settings */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            رابط الحجز
          </CardTitle>
          <CardDescription>
            رابط فريد لعيادتك يمكن للمرضى استخدامه للحجز المباشر
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bookingLink">اسم الرابط (Slug)</Label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center border rounded-lg px-3 bg-gray-50">
                <span className="text-muted-foreground text-sm">
                  {typeof window !== 'undefined' && window.location.origin}/booking/
                </span>
                <Input
                  id="bookingLink"
                  value={settings.bookingLink}
                  onChange={(e) => handleBookingLinkChange(e.target.value)}
                  placeholder="clinic-name"
                  className="border-0 bg-transparent focus-visible:ring-0 px-1"
                  disabled={!canUseBooking}
                  dir="ltr"
                />
              </div>
              {settings.bookingLink && canUseBooking && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              استخدم أحرف إنجليزية صغيرة، أرقام، وشرطات فقط (مثال: my-dental-clinic)
            </p>
          </div>

          {settings.bookingLink && canUseBooking && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 mb-1">رابط الحجز النشط</p>
                  <a
                    href={`/booking/${settings.bookingLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    dir="ltr"
                  >
                    {typeof window !== 'undefined' && window.location.origin}/booking/{settings.bookingLink}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Activation */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            إعدادات التفعيل
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <Label htmlFor="online-booking" className="text-base font-medium">
                تفعيل الحجز الرقمي
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                السماح للمرضى بحجز المواعيد عبر الإنترنت
              </p>
            </div>
            <Switch
              id="online-booking"
              checked={settings.onlineBookingEnabled}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, onlineBookingEnabled: checked })
              }
              disabled={!canUseBooking}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <Label htmlFor="show-map" className="text-base font-medium">
                إظهار في الخريطة التفاعلية
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                عرض موقع عيادتك على الخريطة العامة للمرضى
              </p>
            </div>
            <Switch
              id="show-map"
              checked={settings.showOnMap}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, showOnMap: checked })
              }
              disabled={!canUseMap}
            />
          </div>
        </CardContent>
      </Card>

      {/* Booking Configuration */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            إعدادات المواعيد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slot-duration">
                مدة الموعد (بالدقائق)
              </Label>
              <Input
                id="slot-duration"
                type="number"
                value={settings.bookingSlotDuration}
                onChange={(e) =>
                  setSettings({ ...settings, bookingSlotDuration: parseInt(e.target.value) || 30 })
                }
                min="15"
                step="15"
                disabled={!canUseBooking}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-bookings">
                الحد الأقصى للحجوزات اليومية
              </Label>
              <Input
                id="max-bookings"
                type="number"
                value={settings.maxBookingsPerDay}
                onChange={(e) =>
                  setSettings({ ...settings, maxBookingsPerDay: parseInt(e.target.value) || 20 })
                }
                min="1"
                disabled={!canUseBooking}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <Label htmlFor="require-approval" className="text-base font-medium">
                يتطلب موافقة العيادة
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                مراجعة وتأكيد الحجوزات قبل قبولها
              </p>
            </div>
            <Switch
              id="require-approval"
              checked={settings.requireApproval}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, requireApproval: checked })
              }
              disabled={!canUseBooking}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <Label htmlFor="auto-confirm" className="text-base font-medium">
                التأكيد التلقائي
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                تأكيد الحجوزات تلقائياً دون مراجعة يدوية
              </p>
            </div>
            <Switch
              id="auto-confirm"
              checked={settings.autoConfirm}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, autoConfirm: checked })
              }
              disabled={!canUseBooking || settings.requireApproval}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          إلغاء
        </Button>
        <Button
          onClick={handleSave}
          disabled={saving || !canUseBooking}
        >
          {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
        </Button>
      </div>
    </div>
  )
}
