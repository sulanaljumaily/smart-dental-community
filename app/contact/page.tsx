import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            تواصل معنا
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن هنا للإجابة على استفساراتك ومساعدتك في أي وقت
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bento-card">
                <CardHeader>
                  <CardTitle className="text-2xl">أرسل لنا رسالة</CardTitle>
                  <CardDescription>
                    املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input id="name" placeholder="أحمد محمد" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" placeholder="example@email.com" dir="ltr" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input id="phone" placeholder="07XXXXXXXXX" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">الموضوع</Label>
                      <select id="subject" className="w-full h-10 rounded-md border border-input bg-background px-3">
                        <option>استفسار عام</option>
                        <option>الدعم الفني</option>
                        <option>اقتراح</option>
                        <option>شكوى</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <Button size="lg" className="w-full md:w-auto font-bold">
                    <Send className="w-4 h-4 ml-2" />
                    إرسال الرسالة
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bento-card bg-gradient-to-br from-blue-500 to-purple-700 text-white border-none">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-2xl font-bold mb-6">معلومات التواصل</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">البريد الإلكتروني</p>
                        <p className="text-white/90" dir="ltr">info@dentalcommunity.iq</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">الهاتف</p>
                        <p className="text-white/90" dir="ltr">+964 770 123 4567</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">العنوان</p>
                        <p className="text-white/90">بغداد - الكرادة</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">ساعات العمل</p>
                        <p className="text-white/90">السبت - الخميس: 9:00 - 17:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bento-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">تابعنا على</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, color: "from-blue-600 to-blue-700" },
                      { icon: Instagram, color: "from-pink-600 to-purple-700" },
                      { icon: Twitter, color: "from-sky-500 to-blue-600" }
                    ].map((social, idx) => (
                      <button
                        key={idx}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg`}
                      >
                        <social.icon className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="text-center pb-12">
        <Button variant="ghost" asChild>
          <Link href="/">العودة للصفحة الرئيسية</Link>
        </Button>
      </div>
    </main>
  );
}
