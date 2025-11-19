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
  Briefcase
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            المجتمع الذكي لطب الأسنان
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            منصة متكاملة تجمع أطباء الأسنان والموردين ومعامل الأسنان في العراق
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/auth/login">
                تسجيل الدخول
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/services">
                الخدمات الطبية
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid - Bento UI */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bento-grid">
            {/* Dentists Hub */}
            <Card className="bento-card col-span-full md:col-span-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white border-none">
              <CardHeader>
                <Stethoscope className="w-12 h-12 mb-4" />
                <CardTitle className="text-white text-3xl">مركز الأطباء</CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  إدارة شاملة للعيادات والمرضى والخطط العلاجية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/auth/login?role=dentist">
                    الدخول للمركز
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Clinic Management */}
            <Card className="bento-card hover:bg-green-50">
              <CardHeader>
                <Building2 className="w-10 h-10 mb-2 text-green-600" />
                <CardTitle>إدارة العيادات</CardTitle>
                <CardDescription>
                  نظام متكامل لإدارة عدة عيادات بسهولة
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Labs */}
            <Card className="bento-card hover:bg-purple-50">
              <CardHeader>
                <FlaskConical className="w-10 h-10 mb-2 text-purple-600" />
                <CardTitle>معامل الأسنان</CardTitle>
                <CardDescription>
                  إدارة الطلبات والتواصل مع المختبرات
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Marketplace */}
            <Card className="bento-card hover:bg-orange-50">
              <CardHeader>
                <ShoppingBag className="w-10 h-10 mb-2 text-orange-600" />
                <CardTitle>المتجر الطبي</CardTitle>
                <CardDescription>
                  متجر متكامل للمعدات والمواد الطبية
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Appointments */}
            <Card className="bento-card hover:bg-cyan-50">
              <CardHeader>
                <Calendar className="w-10 h-10 mb-2 text-cyan-600" />
                <CardTitle>نظام الحجوزات</CardTitle>
                <CardDescription>
                  تقويم تفاعلي ذكي لإدارة المواعيد
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Community */}
            <Card className="bento-card bg-gradient-to-br from-pink-500 to-rose-600 text-white border-none">
              <CardHeader>
                <Users className="w-10 h-10 mb-2" />
                <CardTitle className="text-white">المجتمع الطبي</CardTitle>
                <CardDescription className="text-pink-100">
                  شبكة تواصل مهنية ودورات تدريبية
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Messaging */}
            <Card className="bento-card hover:bg-indigo-50">
              <CardHeader>
                <MessageSquare className="w-10 h-10 mb-2 text-indigo-600" />
                <CardTitle>نظام الرسائل</CardTitle>
                <CardDescription>
                  تواصل فوري بين جميع الأطراف
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Jobs */}
            <Card className="bento-card hover:bg-amber-50">
              <CardHeader>
                <Briefcase className="w-10 h-10 mb-2 text-amber-600" />
                <CardTitle>منصة الوظائف</CardTitle>
                <CardDescription>
                  فرص عمل للأطباء والكوادر الطبية
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Smart Dental Community. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </main>
  );
}
