"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Navigation,
  Calendar,
  AlertCircle,
  Brain,
  FileText,
  Search,
  Filter,
  ChevronDown,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ServicesPage() {
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null)
  const [showBooking, setShowBooking] = useState(false)

  // بيانات تجريبية
  const clinics = [
    {
      id: "1",
      name: "عيادة النجوم لطب الأسنان",
      address: "بغداد - الكرادة - شارع الرئيسي",
      phone: "07701234567",
      rating: 4.8,
      reviews: 234,
      distance: "500 م",
      isOpen: true,
      workingHours: "9:00 ص - 8:00 م",
      specializations: ["تجميل", "زراعة", "تقويم"],
      doctors: ["د. محمد أحمد", "د. سارة علي"],
      image: "🏥",
      isFeatured: true,
      location: { lat: 33.3152, lng: 44.3661 },
    },
    {
      id: "2",
      name: "مركز الابتسامة الطبي",
      address: "بغداد - المنصور - مجمع المنصور مول",
      phone: "07709876543",
      rating: 4.7,
      reviews: 189,
      distance: "1.2 كم",
      isOpen: true,
      workingHours: "10:00 ص - 9:00 م",
      specializations: ["علاج عصب", "تجميل"],
      doctors: ["د. أحمد علي"],
      image: "😁",
      isFeatured: true,
      location: { lat: 33.3152, lng: 44.4000 },
    },
    {
      id: "3",
      name: "عيادة الأمل التخصصية",
      address: "بغداد - الجادرية - قرب الجامعة",
      phone: "07801234567",
      rating: 4.6,
      reviews: 156,
      distance: "2.5 كم",
      isOpen: false,
      workingHours: "9:00 ص - 5:00 م",
      specializations: ["أطفال", "تقويم"],
      doctors: ["د. فاطمة حسن", "د. خالد محمود"],
      image: "🦷",
      isFeatured: false,
      location: { lat: 33.2800, lng: 44.4000 },
    },
  ]

  const articles = [
    {
      id: "1",
      title: "العناية اليومية بالأسنان",
      excerpt: "نصائح مهمة للحفاظ على صحة أسنانك",
      image: "🪥",
      readTime: "5 دقائق",
    },
    {
      id: "2",
      title: "متى تحتاج لزيارة طبيب الأسنان؟",
      excerpt: "علامات تستدعي الزيارة الفورية",
      image: "⚕️",
      readTime: "4 دقائق",
    },
    {
      id: "3",
      title: "تبييض الأسنان: الحقيقة والخرافة",
      excerpt: "كل ما تحتاج معرفته عن تبييض الأسنان",
      image: "✨",
      readTime: "6 دقائق",
    },
  ]

  const emergencyServices = [
    {
      id: "1",
      title: "ألم الأسنان الحاد",
      description: "إسعافات أولية لتخفيف الألم",
      icon: "🚨",
    },
    {
      id: "2",
      title: "كسر السن",
      description: "خطوات التعامل مع كسر الأسنان",
      icon: "💥",
    },
    {
      id: "3",
      title: "نزيف اللثة",
      description: "كيفية إيقاف النزيف",
      icon: "🩸",
    },
  ]

  const handleClinicSelect = (clinicId: string) => {
    if (selectedClinic === clinicId) {
      setSelectedClinic(null)
    } else {
      setSelectedClinic(clinicId)
    }
  }

  const selectedClinicData = clinics.find(c => c.id === selectedClinic)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">الخدمات الطبية</h1>
            <Button variant="outline" asChild>
              <Link href="/">
                العودة للرئيسية
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <Card className="bento-card bg-gradient-to-r from-blue-600 to-purple-700 text-white border-none">
          <CardContent className="p-8 text-center space-y-4">
            <div className="text-6xl">🦷</div>
            <h2 className="text-3xl font-bold">ابحث عن أفضل عيادات الأسنان قريبة منك</h2>
            <p className="text-lg text-white/90">احجز موعدك بسهولة بدون تسجيل</p>
            <div className="flex gap-3 max-w-2xl mx-auto pt-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                <Input
                  placeholder="ابحث عن عيادة أو طبيب..."
                  className="pr-10 h-12 text-foreground"
                />
              </div>
              <Button size="lg" variant="secondary">
                بحث
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Service Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bento-card hover:shadow-lg transition-all cursor-pointer" asChild>
            <Link href="#clinics">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">🗺️</div>
                <h3 className="font-bold">العيادات القريبة</h3>
                <p className="text-xs text-muted-foreground">على الخريطة</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="bento-card hover:shadow-lg transition-all cursor-pointer" asChild>
            <Link href="#diagnosis">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">🤖</div>
                <h3 className="font-bold">تشخيص ذكي</h3>
                <p className="text-xs text-muted-foreground">بالذكاء الاصطناعي</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="bento-card hover:shadow-lg transition-all cursor-pointer" asChild>
            <Link href="#emergency">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">🚨</div>
                <h3 className="font-bold">الطوارئ</h3>
                <p className="text-xs text-muted-foreground">إسعافات أولية</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="bento-card hover:shadow-lg transition-all cursor-pointer" asChild>
            <Link href="#articles">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">📰</div>
                <h3 className="font-bold">مقالات طبية</h3>
                <p className="text-xs text-muted-foreground">توعية صحية</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Nearby Clinics Section */}
        <section id="clinics">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">العيادات القريبة منك</h2>
            <Button variant="ghost">
              <Filter className="w-4 h-4 ml-2" />
              فلتر
            </Button>
          </div>

          {/* Featured Clinics */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              عيادات مميزة
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {clinics.filter(c => c.isFeatured).map(clinic => (
                <Card
                  key={clinic.id}
                  className={cn(
                    "bento-card hover:shadow-xl transition-all cursor-pointer",
                    selectedClinic === clinic.id && "ring-2 ring-primary"
                  )}
                  onClick={() => handleClinicSelect(clinic.id)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                        {clinic.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <CardTitle className="text-lg mb-1">{clinic.name}</CardTitle>
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-sm">{clinic.rating}</span>
                              <span className="text-xs text-muted-foreground">({clinic.reviews})</span>
                            </div>
                          </div>
                          <Badge variant={clinic.isOpen ? "success" : "secondary"}>
                            {clinic.isOpen ? "مفتوح" : "مغلق"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {selectedClinic === clinic.id ? (
                    // Expanded View
                    <CardContent className="space-y-4 pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span>{clinic.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span dir="ltr">{clinic.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{clinic.workingHours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-muted-foreground" />
                          <span>يبعد {clinic.distance}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold mb-2">التخصصات</p>
                        <div className="flex flex-wrap gap-2">
                          {clinic.specializations.map((spec, index) => (
                            <Badge key={index} variant="outline">{spec}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold mb-2">الأطباء</p>
                        <div className="flex flex-wrap gap-2">
                          {clinic.doctors.map((doctor, index) => (
                            <Badge key={index} variant="secondary">{doctor}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1">
                          <Phone className="w-4 h-4 ml-2" />
                          اتصال
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowBooking(true)
                          }}
                        >
                          <Calendar className="w-4 h-4 ml-2" />
                          حجز موعد
                        </Button>
                      </div>
                    </CardContent>
                  ) : (
                    // Collapsed View
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {clinic.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {clinic.isOpen ? "مفتوح الآن" : "مغلق"}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-3">
                        عرض التفاصيل
                        <ChevronDown className="w-4 h-4 mr-2" />
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* All Clinics */}
          <div className="space-y-3">
            {clinics.filter(c => !c.isFeatured).map(clinic => (
              <Card
                key={clinic.id}
                className="bento-card hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleClinicSelect(clinic.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {clinic.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{clinic.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {clinic.rating}
                        </span>
                        <span>•</span>
                        <span>{clinic.distance}</span>
                      </div>
                    </div>
                    <Badge variant={clinic.isOpen ? "success" : "secondary"}>
                      {clinic.isOpen ? "مفتوح" : "مغلق"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button size="lg" variant="outline">
              عرض جميع العيادات على الخريطة
              <ExternalLink className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </section>

        {/* Smart Diagnosis Section */}
        <section id="diagnosis">
          <Card className="bento-card bg-gradient-to-r from-purple-500 to-pink-600 text-white border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Brain className="w-8 h-8" />
                التشخيص الذكي
              </CardTitle>
              <CardDescription className="text-white/90">
                احصل على تشخيص أولي باستخدام الذكاء الاصطناعي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Button size="lg" variant="secondary">
                  تشخيص بدون AI
                </Button>
                <Button size="lg" variant="secondary">
                  <Brain className="w-5 h-5 ml-2" />
                  تشخيص بالـ AI
                </Button>
              </div>
              <p className="text-sm text-white/80 text-center">
                سنقترح لك أفضل العيادات القريبة بناءً على التشخيص
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Services */}
        <section id="emergency">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            طوارئ الأسنان
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {emergencyServices.map(service => (
              <Card key={service.id} className="bento-card hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-5xl">{service.icon}</div>
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    اقرأ المزيد
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Medical Articles */}
        <section id="articles">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">مقالات طبية</h2>
            <Button variant="ghost">عرض الكل</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {articles.map(article => (
              <Card key={article.id} className="bento-card hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <div className="text-6xl text-center mb-4">{article.image}</div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 ml-1" />
                      {article.readTime}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      اقرأ المزيد
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Booking Dialog */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حجز موعد</DialogTitle>
            <DialogDescription>
              {selectedClinicData?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>التخصص أو نوع العلاج</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                <option>فحص عام</option>
                <option>تنظيف أسنان</option>
                <option>علاج عصب</option>
                <option>تركيبات</option>
                <option>زراعة</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>اختر الطبيب</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                {selectedClinicData?.doctors.map((doctor, index) => (
                  <option key={index}>{doctor}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>التاريخ والوقت المفضل</Label>
              <Input type="datetime-local" />
            </div>

            <div className="space-y-2">
              <Label>رقم الهاتف</Label>
              <Input
                placeholder="07XXXXXXXXX"
                dir="ltr"
                className="text-right"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-blue-900">
                ✨ سيتم التواصل معك لتأكيد الموعد أو اقتراح وقت بديل
              </p>
            </div>

            <Button className="w-full" size="lg">
              <Calendar className="w-4 h-4 ml-2" />
              إرسال طلب الحجز
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
