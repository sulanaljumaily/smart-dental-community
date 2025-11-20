"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  MapPin,
  Star,
  Clock,
  ArrowRight,
  Stethoscope,
  FileText,
  Brain,
  AlertCircle,
  Heart,
  Calendar,
  Phone,
  Navigation
} from "lucide-react";
import Link from "next/link";

export default function PatientHomePage() {
  // بيانات تجريبية للعيادات القريبة
  const nearbyClinic = [
    {
      id: "1",
      name: "عيادة النجوم لطب الأسنان",
      address: "بغداد - الكرادة",
      distance: "500 م",
      rating: 4.8,
      reviews: 234,
      isOpen: true,
      image: "🏥"
    },
    {
      id: "2",
      name: "مركز الابتسامة الطبي",
      address: "بغداد - المنصور",
      distance: "1.2 كم",
      rating: 4.7,
      reviews: 189,
      isOpen: true,
      image: "😁"
    },
    {
      id: "3",
      name: "عيادة الأمل التخصصية",
      address: "بغداد - الجادرية",
      distance: "2.5 كم",
      rating: 4.6,
      reviews: 156,
      isOpen: false,
      image: "🦷"
    }
  ];

  // بيانات تجريبية للمقالات
  const articles = [
    {
      id: "1",
      title: "العناية اليومية بالأسنان",
      excerpt: "نصائح مهمة للحفاظ على صحة أسنانك",
      image: "🪥",
      readTime: "5 دقائق"
    },
    {
      id: "2",
      title: "متى تحتاج لزيارة طبيب الأسنان؟",
      excerpt: "علامات تستدعي الزيارة الفورية",
      image: "⚕️",
      readTime: "4 دقائق"
    },
    {
      id: "3",
      title: "تبييض الأسنان: الحقيقة والخرافة",
      excerpt: "كل ما تحتاج معرفته عن تبييض الأسنان",
      image: "✨",
      readTime: "6 دقائق"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Header - شريط علوي */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / الشعار */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-l from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  المجتمع الذكي
                </h1>
                <p className="text-xs text-gray-600">لطب الأسنان</p>
              </div>
            </Link>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="outline"
                size="sm"
                className="h-9 md:h-10 text-sm md:text-base font-semibold"
                asChild
              >
                <Link href="/services">
                  <Stethoscope className="w-4 h-4 ml-2" />
                  الخدمات الطبية
                </Link>
              </Button>
              <Button
                size="sm"
                className="h-9 md:h-10 text-sm md:text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                asChild
              >
                <Link href="/dentist-landing">
                  <Stethoscope className="w-4 h-4 ml-2" />
                  هل أنت طبيب أسنان؟
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* بطاقات ترويجية للخدمات الطبية */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* العيادات القريبة */}
            <Link href="/services?tab=clinics">
              <Card className="bento-card bg-gradient-to-br from-blue-500 to-purple-600 text-white border-none cursor-pointer group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">عيادات قريبة</h3>
                  <p className="text-white/90 text-sm">ابحث عن عيادات قريبة منك</p>
                </CardContent>
              </Card>
            </Link>

            {/* التشخيص الذكي */}
            <Link href="/services?tab=diagnosis">
              <Card className="bento-card bg-gradient-to-br from-purple-500 to-pink-600 text-white border-none cursor-pointer group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">التشخيص الذكي</h3>
                  <p className="text-white/90 text-sm">احصل على تشخيص دقيق</p>
                </CardContent>
              </Card>
            </Link>

            {/* طوارئ الأسنان */}
            <Link href="/services?tab=emergency">
              <Card className="bento-card bg-gradient-to-br from-red-500 to-orange-600 text-white border-none cursor-pointer group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">طوارئ الأسنان</h3>
                  <p className="text-white/90 text-sm">إسعافات أولية فورية</p>
                </CardContent>
              </Card>
            </Link>

            {/* المقالات التعليمية */}
            <Link href="/services?tab=articles">
              <Card className="bento-card bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-none cursor-pointer group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">مقالات تعليمية</h3>
                  <p className="text-white/90 text-sm">تعلم المزيد عن صحة أسنانك</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* خريطة تفاعلية للعيادات القريبة */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
                <MapPin className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                العيادات القريبة منك
              </h2>
              <p className="text-gray-600">اكتشف أفضل العيادات في منطقتك</p>
            </div>
          </div>

          {/* Placeholder للخريطة التفاعلية */}
          <Card className="bento-card mb-6 overflow-hidden">
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-40"></div>
              <div className="text-center z-10">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-2">الخريطة التفاعلية</p>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  عرض العيادات المسجلة والمشتركة في باقة المنصة على الخريطة
                </p>
              </div>
            </div>
          </Card>

          {/* قائمة العيادات القريبة - أفقية قابلة للتمرير */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">العيادات المميزة</h3>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/services?tab=clinics">
                  عرض الكل
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Link>
              </Button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {nearbyClinic.map((clinic) => (
                <Card
                  key={clinic.id}
                  className="bento-card min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {clinic.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-base line-clamp-1">{clinic.name}</CardTitle>
                          <Badge variant={clinic.isOpen ? "success" : "secondary"} className="text-xs">
                            {clinic.isOpen ? "مفتوح" : "مغلق"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">{clinic.rating}</span>
                          <span className="text-xs text-muted-foreground">({clinic.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{clinic.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Navigation className="w-4 h-4 flex-shrink-0" />
                      <span>يبعد {clinic.distance}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="w-4 h-4 ml-1" />
                        اتصال
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Calendar className="w-4 h-4 ml-1" />
                        حجز
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* المقالات التعليمية */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
                <FileText className="w-7 h-7 md:w-8 md:h-8 text-emerald-600" />
                مقالات تعليمية
              </h2>
              <p className="text-gray-600">تعلم المزيد عن صحة أسنانك</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/services?tab=articles">
                عرض جميع المقالات
                <ArrowRight className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {articles.map((article, index) => (
              <Card
                key={article.id}
                className="bento-card min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start cursor-pointer group"
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    {article.image}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-semibold">
                      <Clock className="w-3 h-3 ml-1" />
                      {article.readTime}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      اقرأ المزيد
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center shadow-xl">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">المجتمع الذكي لطب الأسنان</h3>
              <p className="text-gray-400 mb-1">
                © 2024 Smart Dental Community. جميع الحقوق محفوظة.
              </p>
              <p className="text-gray-500 text-sm">
                منصة احترافية لإدارة عيادات الأسنان في العراق
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">من نحن</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
              <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
              <Link href="/contact" className="hover:text-white transition-colors">اتصل بنا</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
