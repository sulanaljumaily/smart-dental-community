import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            سياسة الخصوصية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Privacy Principles */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Lock, title: "تشفير البيانات", description: "جميع البيانات محمية بتشفير عالي المستوى" },
              { icon: Eye, title: "عدم المشاركة", description: "لن نشارك بياناتك مع أي جهة ثالثة" },
              { icon: Database, title: "تخزين آمن", description: "بياناتك محفوظة في خوادم آمنة" }
            ].map((item, idx) => (
              <Card key={idx} className="bento-card text-center hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Privacy Policy Content */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6" />
                1. جمع المعلومات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                نقوم بجمع المعلومات التالية عند استخدامك للمنصة:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>المعلومات الشخصية: الاسم، البريد الإلكتروني، رقم الهاتف</li>
                <li>المعلومات المهنية: التخصص، رقم الترخيص، معلومات العيادة</li>
                <li>بيانات الاستخدام: سجلات الدخول، إحصائيات الاستخدام</li>
                <li>المعلومات الطبية: سجلات المرضى والعلاجات (للأطباء فقط)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UserCheck className="w-6 h-6" />
                2. استخدام المعلومات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>نستخدم المعلومات المجمعة للأغراض التالية:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>توفير وتحسين خدماتنا</li>
                <li>إدارة حسابات المستخدمين</li>
                <li>التواصل معك بخصوص الخدمة</li>
                <li>تحليل الاستخدام لتطوير المنصة</li>
                <li>ضمان أمان المنصة ومنع الاحتيال</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lock className="w-6 h-6" />
                3. حماية البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                نتخذ إجراءات أمنية صارمة لحماية بياناتك:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>تشفير SSL/TLS لجميع الاتصالات</li>
                <li>تشفير البيانات في قاعدة البيانات</li>
                <li>نظام مصادقة ثنائية</li>
                <li>نسخ احتياطي منتظم للبيانات</li>
                <li>مراقبة أمنية على مدار الساعة</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Eye className="w-6 h-6" />
                4. حقوقك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>لديك الحق في:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>الوصول إلى بياناتك الشخصية</li>
                <li>تصحيح أو تحديث بياناتك</li>
                <li>حذف حسابك وبياناتك</li>
                <li>تصدير بياناتك</li>
                <li>الاعتراض على معالجة بياناتك</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Database className="w-6 h-6" />
                5. الاحتفاظ بالبيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                نحتفظ بمعلوماتك طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات.
                عند حذف حسابك، سيتم حذف جميع بياناتك بشكل دائم خلال 30 يوماً، باستثناء
                ما يتطلبه القانون الاحتفاظ به.
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">تحديثات السياسة</h3>
              <p className="text-white/95 mb-4">
                قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنقوم بإشعارك بأي تغييرات
                جوهرية عبر البريد الإلكتروني أو إشعار على المنصة.
              </p>
              <p className="text-sm text-white/80">
                آخر تحديث: يناير 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="text-center pb-12">
        <Button variant="ghost" asChild>
          <Link href="/">العودة للصفحة الرئيسية</Link>
        </Button>
      </div>
    </main>
  );
}
