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
  Brain,
  Zap,
  Activity,
  ArrowRight,
  Check,
  Star,
  Clock,
  FileText,
  Settings,
  BarChart3,
  Wallet,
  PackagePlus
} from "lucide-react";
import Link from "next/link";

export default function DentistLandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden" dir="rtl">
      {/* شريط علوي خاص بصفحة الأطباء */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
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
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-9 md:h-10 text-sm font-semibold"
                asChild
              >
                <Link href="/vendor">
                  <PackagePlus className="w-4 h-4 ml-2" />
                  مورد
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 md:h-10 text-sm font-semibold"
                asChild
              >
                <Link href="/lab">
                  <FlaskConical className="w-4 h-4 ml-2" />
                  معمل أسنان
                </Link>
              </Button>
              <Button
                size="sm"
                className="h-9 md:h-10 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                asChild
              >
                <Link href="/auth/login">
                  <Zap className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl float-animation">
                <Sparkles className="w-12 h-12 md:w-14 md:h-14 text-white" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              <span className="bg-gradient-to-l from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                المجتمع الذكي
              </span>
              <br />
              <span className="text-gray-800">لطب الأسنان</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              منصة متكاملة تجمع أطباء الأسنان والموردين ومعامل الأسنان في العراق
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 h-14 md:h-16 font-bold shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 pulse-glow group"
                asChild
              >
                <Link href="/auth/login" className="flex items-center gap-2">
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  تسجيل الدخول
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 h-14 md:h-16 font-bold border-2 hover:bg-gray-50 transition-all duration-300 group"
                asChild
              >
                <Link href="/services" className="flex items-center gap-2">
                  <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  الخدمات الطبية
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">آمن ومضمون</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">تقييم 4.9/5</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">+500 طبيب</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Modern Bento UI */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              كل ما تحتاجه في منصة واحدة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              أدوات احترافية لإدارة عيادتك وتطوير عملك الطبي
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Main Feature - Dentists Hub (takes 2 columns on large screens) */}
            <Card className="bento-card lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white border-none overflow-hidden relative group cursor-pointer">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>

              <CardHeader className="relative z-10 pb-4">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 icon-container group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <CardTitle className="text-white text-3xl md:text-4xl mb-3 font-bold">مركز الأطباء</CardTitle>
                <CardDescription className="text-white/95 text-base md:text-lg leading-relaxed">
                  إدارة شاملة للعيادات والمرضى والخطط العلاجية بأحدث التقنيات
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <ul className="space-y-3 text-white/95">
                  {[
                    { icon: FileText, text: "إدارة ملفات المرضى الإلكترونية" },
                    { icon: Calendar, text: "جدولة المواعيد الذكية" },
                    { icon: BarChart3, text: "التقارير المالية والإحصائية" },
                    { icon: Settings, text: "إدارة الموظفين والصلاحيات" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm md:text-base">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full font-bold text-base h-12 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                  asChild
                >
                  <Link href="/auth/login?role=dentist" className="flex items-center justify-center gap-2">
                    الدخول للمركز
                    <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Clinic Management */}
            <Card className="bento-card bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200 hover:shadow-2xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl icon-container group-hover:rotate-6 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-emerald-900 text-xl mb-2">إدارة العيادات</CardTitle>
                  <CardDescription className="text-emerald-700 leading-relaxed">
                    نظام متكامل لإدارة عدة عيادات بسهولة واحترافية
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Labs */}
            <Card className="bento-card bg-gradient-to-br from-purple-50 to-fuchsia-100 border-purple-200 hover:shadow-2xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl icon-container group-hover:rotate-6 transition-transform duration-300">
                  <FlaskConical className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-purple-900 text-xl mb-2">معامل الأسنان</CardTitle>
                  <CardDescription className="text-purple-700 leading-relaxed">
                    إدارة الطلبات والتواصل المباشر مع المختبرات
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Marketplace */}
            <Card className="bento-card bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 hover:shadow-2xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl icon-container group-hover:rotate-6 transition-transform duration-300">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-orange-900 text-xl mb-2">المتجر الطبي</CardTitle>
                  <CardDescription className="text-orange-700 leading-relaxed">
                    متجر متكامل للمعدات والمواد الطبية عالية الجودة
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Appointments */}
            <Card className="bento-card bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-200 hover:shadow-2xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl icon-container group-hover:rotate-6 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-cyan-900 text-xl mb-2">نظام الحجوزات</CardTitle>
                  <CardDescription className="text-cyan-700 leading-relaxed">
                    تقويم تفاعلي ذكي لإدارة المواعيد بكفاءة
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Smart Diagnosis */}
            <Card className="bento-card lg:col-span-2 bg-gradient-to-br from-violet-600 to-purple-800 text-white border-none overflow-hidden relative group cursor-pointer">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
              <CardHeader className="relative z-10 space-y-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center icon-container group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-10 h-10" />
                </div>
                <div>
                  <CardTitle className="text-white text-2xl md:text-3xl mb-3">التشخيص الذكي بالذكاء الاصطناعي</CardTitle>
                  <CardDescription className="text-violet-100 text-base md:text-lg leading-relaxed">
                    احصل على تشخيص أولي دقيق باستخدام أحدث تقنيات الذكاء الاصطناعي
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Community */}
            <Card className="bento-card bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200 hover:shadow-2xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl icon-container group-hover:rotate-6 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-indigo-900 text-xl mb-2">المجتمع الطبي</CardTitle>
                  <CardDescription className="text-indigo-700 leading-relaxed">
                    شبكة تواصل مهنية ودورات تدريبية متخصصة
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Messaging */}
            <Card className="bento-card bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200 hover:shadow-2xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-sky-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl icon-container group-hover:rotate-6 transition-transform duration-300">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sky-900 text-xl mb-2">نظام الرسائل</CardTitle>
                  <CardDescription className="text-sky-700 leading-relaxed">
                    تواصل فوري وآمن بين جميع الأطراف
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Jobs */}
            <Card className="bento-card bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200 hover:shadow-2xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl icon-container group-hover:rotate-6 transition-transform duration-300">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-yellow-900 text-xl mb-2">منصة الوظائف</CardTitle>
                  <CardDescription className="text-yellow-700 leading-relaxed">
                    فرص عمل مميزة للأطباء والكوادر الطبية
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Financial Management */}
            <Card className="bento-card bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-2xl group overflow-hidden relative cursor-pointer">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-green-300/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl icon-container group-hover:rotate-6 transition-transform duration-300">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-green-900 text-xl mb-2">الإدارة المالية</CardTitle>
                  <CardDescription className="text-green-700 leading-relaxed">
                    تتبع دقيق للفواتير والإيرادات والمصروفات
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              أرقام تتحدث عن نفسها
            </h2>
            <p className="text-lg text-gray-600">
              نفخر بثقة المجتمع الطبي بنا
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Award, value: "500+", label: "طبيب أسنان", gradient: "from-blue-500 to-purple-600" },
              { icon: Building2, value: "200+", label: "عيادة", gradient: "from-emerald-500 to-teal-600" },
              { icon: Heart, value: "10k+", label: "مريض راضٍ", gradient: "from-orange-500 to-red-600" },
              { icon: TrendingUp, value: "95%", label: "معدل الرضا", gradient: "from-violet-500 to-purple-600" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا المجتمع الذكي لطب الأسنان؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نوفر لك كل الأدوات اللازمة لإدارة عيادتك بكفاءة واحترافية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Shield,
                title: "آمن وموثوق",
                description: "حماية كاملة لبياناتك مع أعلى معايير الأمان",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Zap,
                title: "سريع وسهل",
                description: "واجهة بسيطة وسهلة الاستخدام لجميع الفئات",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Clock,
                title: "دعم 24/7",
                description: "فريق دعم متواجد على مدار الساعة لمساعدتك",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 md:p-12 text-center text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                ابدأ رحلتك معنا اليوم
              </h2>
              <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed">
                انضم إلى مئات الأطباء الذين يثقون بنا لإدارة عياداتهم بكفاءة واحترافية
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 h-14 md:h-16 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                asChild
              >
                <Link href="/auth/login" className="flex items-center gap-2">
                  ابدأ الآن مجاناً
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-16">
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
