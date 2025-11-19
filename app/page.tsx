import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Stethoscope,
  Building2,
  FlaskConical,
  ShoppingBag,
  Calendar,
  MessageSquare,
  Briefcase,
  Sparkles,
  Heart,
  TrendingUp,
  Award,
  Shield,
  MapPin,
  Brain,
  Zap,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Hero Section */}
      <section className="pt-12 md:pt-20 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              المجتمع الذكي لطب الأسنان
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto">
              منصة متكاملة تجمع أطباء الأسنان والموردين ومعامل الأسنان في العراق
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 font-bold shadow-lg" asChild>
                <Link href="/auth/login">
                  <Zap className="w-5 h-5 ml-2" />
                  تسجيل الدخول
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 font-bold" asChild>
                <Link href="/services">
                  <Activity className="w-5 h-5 ml-2" />
                  الخدمات الطبية
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Bento UI */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Main Feature - Dentists Hub (takes 2 columns on large screens) */}
            <Card className="bento-card lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 text-white border-none overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Stethoscope className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <CardTitle className="text-white text-2xl md:text-3xl mb-3">مركز الأطباء</CardTitle>
                <CardDescription className="text-white/90 text-base md:text-lg mb-4">
                  إدارة شاملة للعيادات والمرضى والخطط العلاجية بأحدث التقنيات
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-2 mb-6 text-white/90 text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    إدارة ملفات المرضى
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    جدولة المواعيد الذكية
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    التقارير المالية والإحصائية
                  </li>
                </ul>
                <Button variant="secondary" size="lg" className="w-full font-bold" asChild>
                  <Link href="/auth/login?role=dentist">
                    الدخول للمركز
                    <Sparkles className="w-4 h-4 mr-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Clinic Management */}
            <Card className="bento-card bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200 hover:shadow-xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-emerald-900">إدارة العيادات</CardTitle>
                <CardDescription className="text-emerald-700">
                  نظام متكامل لإدارة عدة عيادات بسهولة
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Labs */}
            <Card className="bento-card bg-gradient-to-br from-purple-50 to-fuchsia-100 border-purple-200 hover:shadow-xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <FlaskConical className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-purple-900">معامل الأسنان</CardTitle>
                <CardDescription className="text-purple-700">
                  إدارة الطلبات والتواصل مع المختبرات
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Medical Services - Featured */}
            <Card className="bento-card lg:col-span-2 bg-gradient-to-r from-pink-500 via-rose-600 to-red-600 text-white border-none overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-right">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">اكتشف أفضل العيادات</h3>
                    <p className="text-white/90 text-sm md:text-base">
                      ابحث عن عيادات قريبة منك واحجز موعدك بسهولة
                    </p>
                  </div>
                  <Button variant="secondary" size="lg" className="font-bold" asChild>
                    <Link href="/services">
                      استكشف الآن
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Marketplace */}
            <Card className="bento-card bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 hover:shadow-xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-orange-900">المتجر الطبي</CardTitle>
                <CardDescription className="text-orange-700">
                  متجر متكامل للمعدات والمواد الطبية
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Appointments */}
            <Card className="bento-card bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-200 hover:shadow-xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-cyan-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-cyan-900">نظام الحجوزات</CardTitle>
                <CardDescription className="text-cyan-700">
                  تقويم تفاعلي ذكي لإدارة المواعيد
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Smart Diagnosis */}
            <Card className="bento-card lg:col-span-2 bg-gradient-to-br from-violet-500 to-purple-700 text-white border-none overflow-hidden relative group">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 translate-x-1/2"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3">
                  <Brain className="w-8 h-8" />
                </div>
                <CardTitle className="text-white text-xl md:text-2xl">التشخيص الذكي</CardTitle>
                <CardDescription className="text-violet-100">
                  احصل على تشخيص أولي باستخدام الذكاء الاصطناعي
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Community */}
            <Card className="bento-card bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200 hover:shadow-xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-indigo-900">المجتمع الطبي</CardTitle>
                <CardDescription className="text-indigo-700">
                  شبكة تواصل مهنية ودورات تدريبية
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Messaging */}
            <Card className="bento-card bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200 hover:shadow-xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-sky-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-sky-900">نظام الرسائل</CardTitle>
                <CardDescription className="text-sky-700">
                  تواصل فوري بين جميع الأطراف
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Jobs */}
            <Card className="bento-card bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200 hover:shadow-xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-yellow-900">منصة الوظائف</CardTitle>
                <CardDescription className="text-yellow-700">
                  فرص عمل للأطباء والكوادر الطبية
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-3">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">طبيب أسنان</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">200+</div>
              <div className="text-sm text-gray-600">عيادة</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">10k+</div>
              <div className="text-sm text-gray-600">مريض راضٍ</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">95%</div>
              <div className="text-sm text-gray-600">معدل الرضا</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-400 mb-2">
            © 2024 Smart Dental Community. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-500 text-sm">
            منصة احترافية لإدارة عيادات الأسنان في العراق
          </p>
        </div>
      </footer>
    </main>
  );
}
