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
  ArrowRight
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

  if (!selectedType) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              مرحباً بك في المجتمع الذكي لطب الأسنان
            </h1>
            <p className="text-lg text-gray-600">
              اختر نوع حسابك للمتابعة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTypes.map((userType) => {
              const Icon = userType.icon
              return (
                <Card
                  key={userType.type}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-primary/50 bg-gradient-to-br ${userType.color} text-white overflow-hidden group`}
                  onClick={() => setSelectedType(userType.type)}
                >
                  <CardHeader className="relative">
                    <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Icon className="w-32 h-32" />
                    </div>
                    <Icon className="w-16 h-16 mb-4 relative z-10" />
                    <CardTitle className="text-white text-2xl relative z-10">{userType.title}</CardTitle>
                    <CardDescription className="text-white/90 text-lg relative z-10">
                      {userType.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <Button
                      variant="secondary"
                      className="w-full group-hover:bg-white group-hover:text-gray-900"
                    >
                      تسجيل الدخول
                      <ArrowRight className="mr-2 h-4 w-4" />
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
