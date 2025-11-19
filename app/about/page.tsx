import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Target,
  Heart,
  Award,
  Users,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl float-animation">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            من نحن
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            المجتمع الذكي لطب الأسنان - منصة رائدة تجمع أطباء الأسنان والموردين ومعامل الأسنان في العراق
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bento-card bg-gradient-to-br from-blue-500 to-purple-700 text-white border-none overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <CardTitle className="text-3xl mb-4">رؤيتنا</CardTitle>
                <CardDescription className="text-white/95 text-lg leading-relaxed">
                  أن نكون المنصة الأولى والأكثر موثوقية لإدارة عيادات الأسنان في العراق والمنطقة،
                  ونساهم في تطوير قطاع طب الأسنان من خلال توفير حلول تقنية متقدمة وسهلة الاستخدام.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bento-card bg-gradient-to-br from-pink-500 to-red-600 text-white border-none overflow-hidden relative group">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <CardTitle className="text-3xl mb-4">رسالتنا</CardTitle>
                <CardDescription className="text-white/95 text-lg leading-relaxed">
                  تمكين أطباء الأسنان من تقديم أفضل رعاية ممكنة لمرضاهم من خلال توفير أدوات إدارية
                  متطورة، وتسهيل التواصل بين جميع الأطراف في المجال الطبي.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">قيمنا</h2>
            <p className="text-lg text-gray-600">المبادئ التي نؤمن بها ونعمل من خلالها</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "الجودة والاحترافية",
                description: "نلتزم بأعلى معايير الجودة في كل ما نقدمه",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Shield,
                title: "الأمان والخصوصية",
                description: "حماية بيانات المرضى والأطباء أولوية قصوى",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Zap,
                title: "الابتكار المستمر",
                description: "نسعى دائماً لتطوير وتحسين خدماتنا",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((value, idx) => (
              <Card key={idx} className="bento-card hover:shadow-2xl transition-all group">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">إنجازاتنا</h2>
            <p className="text-lg text-gray-600">أرقام تعكس ثقة المجتمع الطبي بنا</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "طبيب أسنان", icon: Users, gradient: "from-blue-500 to-purple-600" },
              { value: "200+", label: "عيادة", icon: Award, gradient: "from-emerald-500 to-teal-600" },
              { value: "10k+", label: "مريض راضٍ", icon: Heart, gradient: "from-orange-500 to-red-600" },
              { value: "95%", label: "معدل الرضا", icon: TrendingUp, gradient: "from-violet-500 to-purple-600" }
            ].map((stat, idx) => (
              <Card key={idx} className="bento-card hover:shadow-xl transition-all group">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bento-card bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-4xl font-bold mb-4">انضم إلينا اليوم</h2>
              <p className="text-xl text-white/95 mb-8 leading-relaxed">
                كن جزءاً من مجتمعنا المتنامي من المحترفين في مجال طب الأسنان
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 h-14 font-bold" asChild>
                <Link href="/auth/login" className="flex items-center gap-2">
                  ابدأ الآن
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Link */}
      <div className="text-center pb-12">
        <Button variant="ghost" asChild>
          <Link href="/">العودة للصفحة الرئيسية</Link>
        </Button>
      </div>
    </main>
  );
}
