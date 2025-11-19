"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Stethoscope,
  ShoppingCart,
  FlaskConical,
  Shield,
  ArrowRight,
  Zap,
  Sparkles
} from "lucide-react"

type UserType = "DENTIST" | "VENDOR" | "LAB" | "ADMIN" | null

export default function LoginPage() {
  const [selectedType, setSelectedType] = useState<UserType>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const userTypes = [
    {
      type: "DENTIST" as UserType,
      title: "طبيب أسنان",
      description: "إدارة عياداتك ومرضاك",
      icon: Stethoscope,
      color: "from-blue-500 to-blue-700",
      hoverColor: "hover:from-blue-600 hover:to-blue-800"
    },
    {
      type: "VENDOR" as UserType,
      title: "مورد",
      description: "إدارة منتجاتك ومبيعاتك",
      icon: ShoppingCart,
      color: "from-green-500 to-green-700",
      hoverColor: "hover:from-green-600 hover:to-green-800"
    },
    {
      type: "LAB" as UserType,
      title: "معمل أسنان",
      description: "إدارة طلبات المختبر",
      icon: FlaskConical,
      color: "from-purple-500 to-purple-700",
      hoverColor: "hover:from-purple-600 hover:to-purple-800"
    },
    {
      type: "ADMIN" as UserType,
      title: "إدارة المنصة",
      description: "لوحة التحكم الرئيسية",
      icon: Shield,
      color: "from-red-500 to-red-700",
      hoverColor: "hover:from-red-600 hover:to-red-800"
    }
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement authentication logic
    console.log("Login:", { email, password, type: selectedType })
  }

  const handleQuickDemo = () => {
    // Quick demo login - redirect to dentist dashboard
    console.log("Quick demo login")
    // TODO: Implement demo login logic
    window.location.href = "/dentist"
  }

  if (!selectedType) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 text-white mb-6 shadow-2xl">
              <Sparkles className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              تسجيل الدخول
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              SMART مرحباً بك في
            </p>
          </div>

          {/* Quick Demo Login Card */}
          <Card className="bento-card bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white border-none mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                    <Sparkles className="w-6 h-6" />
                    تسجيل دخول سريع
                  </h3>
                  <p className="text-white/90 text-base md:text-lg mb-1">
                    استخدم هذا الخيار للدخول السريع للتجربة بدون إنشاء حساب
                  </p>
                  <p className="text-white/80 text-sm">
                    <strong>نوع الحساب:</strong> طبيب أسنان
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    سيتم استخدام حساب تجريبي بميزات كاملة للتجربة السريعة
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    size="lg"
                    onClick={handleQuickDemo}
                    className="bg-white text-emerald-700 hover:bg-white/90 shadow-xl text-lg px-8 py-6 h-auto font-bold"
                  >
                    <Zap className="w-5 h-5 ml-2" />
                    دخول سريع للتجربة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-600 font-semibold">
                أو اختر نوع حسابك
              </span>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTypes.map((userType) => {
              const Icon = userType.icon
              return (
                <Card
                  key={userType.type}
                  className={`bento-card cursor-pointer hover:scale-105 border-2 border-transparent hover:border-primary/50 bg-gradient-to-br ${userType.color} text-white overflow-hidden group relative`}
                  onClick={() => setSelectedType(userType.type)}
                >
                  <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon className="w-32 h-32" />
                  </div>
                  <CardHeader className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-white text-2xl">{userType.title}</CardTitle>
                    <CardDescription className="text-white/90 text-lg">
                      {userType.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <Button
                      variant="secondary"
                      className="w-full group-hover:bg-white group-hover:text-gray-900 font-bold"
                      size="lg"
                    >
                      تسجيل دخول عادي
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    )
  }

  const currentType = userTypes.find(t => t.type === selectedType)!
  const Icon = currentType.icon

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <button
            onClick={() => setSelectedType(null)}
            className="text-sm text-gray-600 hover:text-gray-900 text-right flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            العودة
          </button>
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentType.color} flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl">تسجيل الدخول</CardTitle>
          <CardDescription className="text-lg">
            {currentType.title} - {currentType.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
                className="text-right"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-primary hover:underline">
                نسيت كلمة المرور؟
              </a>
            </div>
            <Button
              type="submit"
              className={`w-full bg-gradient-to-r ${currentType.color} hover:opacity-90`}
              size="lg"
            >
              دخول
            </Button>
            <div className="text-center text-sm text-gray-600">
              ليس لديك حساب؟{" "}
              <a href="/auth/register" className="text-primary hover:underline font-semibold">
                سجل الآن
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
