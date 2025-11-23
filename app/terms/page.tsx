import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, AlertCircle, Scale, UserX, Shield } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
              <Scale className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            الشروط والأحكام
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            يرجى قراءة هذه الشروط بعناية قبل استخدام منصتنا
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Important Notice */}
          <Card className="bento-card bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">إشعار هام</h3>
                  <p className="text-white/95 leading-relaxed">
                    باستخدامك لهذه المنصة، فإنك توافق على الالتزام بهذه الشروط والأحكام.
                    إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام المنصة.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Content */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6" />
                1. قبول الشروط
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                بالوصول إلى واستخدام منصة المجتمع الذكي لطب الأسنان، فإنك توافق على الالتزام
                بهذه الشروط والأحكام وجميع القوانين واللوائح المعمول بها.
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                2. استخدام الخدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>يجب عليك:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>تقديم معلومات دقيقة وصحيحة عند التسجيل</li>
                <li>الحفاظ على سرية بيانات حسابك</li>
                <li>استخدام المنصة للأغراض المشروعة فقط</li>
                <li>احترام خصوصية المستخدمين الآخرين</li>
                <li>الالتزام بالقوانين واللوائح المحلية</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UserX className="w-6 h-6" />
                3. الاستخدام المحظور
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>يُحظر عليك:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>استخدام المنصة لأي غرض غير قانوني</li>
                <li>نشر محتوى مسيء أو تشهيري</li>
                <li>محاولة الوصول غير المصرح به إلى النظام</li>
                <li>التدخل في أمن المنصة أو أدائها</li>
                <li>انتحال شخصية أي شخص أو كيان</li>
                <li>نسخ أو توزيع محتوى المنصة دون إذن</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6" />
                4. المسؤولية المهنية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>للأطباء والمتخصصين:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>يجب أن تكون لديك رخصة مزاولة مهنة سارية</li>
                <li>أنت مسؤول عن دقة المعلومات الطبية المقدمة</li>
                <li>يجب الالتزام بمعايير الممارسة المهنية</li>
                <li>الحفاظ على سرية بيانات المرضى</li>
                <li>المنصة لا تتحمل مسؤولية القرارات الطبية</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6" />
                5. الملكية الفكرية
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                جميع المحتويات والمواد والتصاميم والشعارات على المنصة محمية بموجب قوانين
                الملكية الفكرية وهي ملك لـ المجتمع الذكي لطب الأسنان. لا يجوز استخدامها
                أو إعادة إنتاجها دون إذن كتابي صريح.
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Scale className="w-6 h-6" />
                6. إخلاء المسؤولية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                المنصة مقدمة كما هي دون أي ضمانات صريحة أو ضمنية. نحن لا نضمن:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>عمل المنصة بدون انقطاع أو أخطاء</li>
                <li>دقة أو اكتمال المعلومات المقدمة من المستخدمين</li>
                <li>ملاءمة الخدمة لأغراض معينة</li>
                <li>عدم وجود فيروسات أو مكونات ضارة</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                7. حدود المسؤولية
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية
                ناتجة عن استخدام أو عدم القدرة على استخدام المنصة، بما في ذلك على سبيل
                المثال لا الحصر، فقدان البيانات أو الأرباح.
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6" />
                8. إنهاء الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                نحتفظ بالحق في تعليق أو إنهاء حسابك في أي وقت دون إشعار مسبق في حالة:
              </p>
              <ul className="list-disc pr-6 space-y-2 mt-4">
                <li>انتهاك هذه الشروط والأحكام</li>
                <li>السلوك غير المناسب أو غير القانوني</li>
                <li>عدم النشاط لفترة طويلة</li>
                <li>طلبك الخطي لحذف الحساب</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6" />
                9. التعديلات
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات
                جوهرية، واستمرارك في استخدام المنصة بعد التعديلات يعني موافقتك على
                الشروط المعدلة.
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Scale className="w-6 h-6" />
                10. القانون الواجب التطبيق
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                تخضع هذه الشروط وتفسر وفقاً لقوانين جمهورية العراق. أي نزاع ينشأ عن أو
                يتعلق بهذه الشروط يخضع للاختصاص الحصري لمحاكم بغداد.
              </p>
            </CardContent>
          </Card>

          <Card className="bento-card bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">الاتصال بنا</h3>
              <p className="text-white/95 mb-4">
                إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا عبر
                صفحة الاتصال.
              </p>
              <p className="text-sm text-white/80">
                آخر تحديث: يناير 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="text-center pb-12 space-y-4">
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/privacy">سياسة الخصوصية</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">تواصل معنا</Link>
          </Button>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/">العودة للصفحة الرئيسية</Link>
        </Button>
      </div>
    </main>
  );
}
