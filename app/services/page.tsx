"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  ExternalLink,
  Sparkles,
  Zap,
  Home
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
      <header className="bg-white/80 border-b sticky top-0 z-40 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold">الخدمات الطبية</h1>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <Home className="w-4 h-4 ml-2" />
                الرئيسية
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Hero Section */}
        <Card className="bento-card bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-none mb-6 md:mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <CardContent className="p-6 md:p-10 text-center space-y-4 md:space-y-6 relative z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold">ابحث عن أفضل عيادات الأسنان قريبة منك</h2>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              احجز موعدك بسهولة بدون تسجيل واحصل على رعاية طبية احترافية
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto pt-2 md:pt-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="ابحث عن عيادة أو طبيب..."
                  className="pr-10 h-12 md:h-14 text-foreground"
                />
              </div>
              <Button size="lg" variant="secondary" className="h-12 md:h-14 font-bold">
                <Search className="w-5 h-5 ml-2" />
                بحث
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Services */}
        <Tabs defaultValue="clinics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-white/80 backdrop-blur-sm mb-6">
            <TabsTrigger
              value="clinics"
              className="flex items-center gap-2 py-3 text-sm md:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">عيادات قريبة</span>
              <span className="sm:hidden">العيادات</span>
            </TabsTrigger>
            <TabsTrigger
              value="diagnosis"
              className="flex items-center gap-2 py-3 text-sm md:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">التشخيص الذكي</span>
              <span className="sm:hidden">التشخيص</span>
            </TabsTrigger>
            <TabsTrigger
              value="emergency"
              className="flex items-center gap-2 py-3 text-sm md:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">الطوارئ</span>
              <span className="sm:hidden">طوارئ</span>
            </TabsTrigger>
            <TabsTrigger
              value="articles"
              className="flex items-center gap-2 py-3 text-sm md:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">المقالات</span>
              <span className="sm:hidden">مقالات</span>
            </TabsTrigger>
          </TabsList>

          {/* Clinics Tab */}
          <TabsContent value="clinics" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                العيادات القريبة منك
              </h2>
              <Button variant="outline" size="sm">
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
          </TabsContent>

          {/* Smart Diagnosis Tab */}
          <TabsContent value="diagnosis" className="space-y-6">
            <Card className="bento-card bg-gradient-to-br from-purple-500 via-fuchsia-600 to-pink-600 text-white border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <CardTitle className="text-white text-2xl md:text-3xl">التشخيص الذكي</CardTitle>
                <CardDescription className="text-white/90 text-base md:text-lg">
                  احصل على تشخيص أولي باستخدام الذكاء الاصطناعي وسنقترح لك أفضل العيادات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6 relative z-10">
                <div className="grid gap-3 md:gap-4 md:grid-cols-2">
                  <Button size="lg" variant="secondary" className="h-14 md:h-16 font-bold text-base">
                    <Sparkles className="w-5 h-5 ml-2" />
                    تشخيص تقليدي
                  </Button>
                  <Button size="lg" variant="secondary" className="h-14 md:h-16 font-bold text-base">
                    <Brain className="w-5 h-5 ml-2" />
                    تشخيص بالذكاء الاصطناعي
                  </Button>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
                  <h4 className="font-bold text-base md:text-lg mb-3">كيف يعمل التشخيص الذكي؟</h4>
                  <ul className="space-y-2 text-sm md:text-base text-white/90">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></div>
                      <span>أجب عن بعض الأسئلة حول الأعراض</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></div>
                      <span>سيقوم الذكاء الاصطناعي بتحليل إجاباتك</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></div>
                      <span>احصل على تشخيص أولي واقتراحات للعيادات المناسبة</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
                طوارئ الأسنان
              </h2>
              <p className="text-gray-600">إسعافات أولية وإرشادات سريعة للتعامل مع حالات الطوارئ</p>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
              {emergencyServices.map((service, index) => (
                <Card key={service.id} className="bento-card hover:shadow-xl group overflow-hidden relative cursor-pointer">
                  <div className={cn(
                    "absolute -bottom-6 -right-6 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500",
                    index === 0 && "bg-red-300/20",
                    index === 1 && "bg-orange-300/20",
                    index === 2 && "bg-pink-300/20"
                  )}></div>
                  <CardContent className="p-6 text-center space-y-4 relative z-10">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-lg md:text-xl">{service.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{service.description}</p>
                    <Button variant="outline" size="sm" className="w-full font-semibold">
                      <FileText className="w-4 h-4 ml-2" />
                      اقرأ المزيد
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bento-card bg-gradient-to-r from-red-500 to-orange-600 text-white border-none mt-6">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <AlertCircle className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-right">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">هل تحتاج مساعدة فورية؟</h3>
                    <p className="text-white/90 text-sm md:text-base">
                      اتصل بأقرب عيادة طوارئ أو احجز موعد عاجل الآن
                    </p>
                  </div>
                  <Button variant="secondary" size="lg" className="font-bold">
                    <Phone className="w-5 h-5 ml-2" />
                    اتصال سريع
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                  مقالات طبية
                </h2>
                <p className="text-gray-600">تعلم المزيد عن صحة أسنانك</p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 ml-2" />
                عرض الكل
              </Button>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
              {articles.map((article, index) => (
                <Card key={article.id} className="bento-card hover:shadow-xl group overflow-hidden relative cursor-pointer">
                  <div className={cn(
                    "absolute -bottom-6 -right-6 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500",
                    index === 0 && "bg-emerald-300/20",
                    index === 1 && "bg-blue-300/20",
                    index === 2 && "bg-purple-300/20"
                  )}></div>
                  <CardHeader className="relative z-10">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-5xl mb-4 shadow-lg">
                      {article.image}
                    </div>
                    <CardTitle className="text-lg md:text-xl">{article.title}</CardTitle>
                    <CardDescription className="text-sm md:text-base">{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-semibold">
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

            <Card className="bento-card bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-none mt-6">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <FileText className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-right">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">هل تريد المزيد من المقالات؟</h3>
                    <p className="text-white/90 text-sm md:text-base">
                      اشترك في نشرتنا الإخبارية للحصول على آخر المقالات الطبية
                    </p>
                  </div>
                  <Button variant="secondary" size="lg" className="font-bold">
                    <Sparkles className="w-5 h-5 ml-2" />
                    اشترك الآن
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
