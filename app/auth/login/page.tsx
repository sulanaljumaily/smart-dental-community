"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore, type UserRole } from "@/lib/stores/auth-store"
import { useNotificationStore } from "@/lib/stores/notification-store"
import {
  Stethoscope,
  ShoppingCart,
  FlaskConical,
  Shield,
  ArrowRight,
  Zap,
  Sparkles,
  Users,
  Phone,
  Mail,
  Lock,
  CheckCircle2,
  Loader2,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

type LoginMode = "normal" | "quick"
type UserRoleOrNull = UserRole | null

export default function LoginPage() {
  const router = useRouter()
  const { login, quickDemo, isLoading, error, clearError, isAuthenticated, user } = useAuthStore()
  const { addNotification } = useNotificationStore()

  const [loginMode, setLoginMode] = useState<LoginMode>("normal")
  const [selectedRole, setSelectedRole] = useState<UserRoleOrNull>(null)
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")

  // إعادة التوجيه إذا كان المستخدم مسجل دخوله بالفعل
  useEffect(() => {
    if (isAuthenticated && user) {
      redirectToRolePage(user.role)
    }
  }, [isAuthenticated, user])

  // مسح الأخطاء عند تغيير النمط أو الدور
  useEffect(() => {
    clearError()
  }, [loginMode, selectedRole])

  const userRoles = [
    {
      role: "DENTIST" as UserRole,
      title: "طبيب أسنان",
      description: "إدارة العيادات والمرضى",
      icon: Stethoscope,
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      bgGradient: "from-blue-50 to-indigo-100",
      borderColor: "border-blue-200",
      hoverShadow: "hover:shadow-blue-500/30"
    },
    {
      role: "CLINIC_STAFF" as UserRole,
      title: "طاقم عيادة",
      description: "موظفي واستقبال العيادات",
      icon: Users,
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      bgGradient: "from-emerald-50 to-cyan-100",
      borderColor: "border-emerald-200",
      hoverShadow: "hover:shadow-emerald-500/30"
    },
    {
      role: "VENDOR" as UserRole,
      title: "مورد",
      description: "إدارة المنتجات والمبيعات",
      icon: ShoppingCart,
      gradient: "from-orange-500 via-amber-600 to-yellow-700",
      bgGradient: "from-orange-50 to-amber-100",
      borderColor: "border-orange-200",
      hoverShadow: "hover:shadow-orange-500/30"
    },
    {
      role: "LAB" as UserRole,
      title: "معمل أسنان",
      description: "إدارة طلبات المختبر",
      icon: FlaskConical,
      gradient: "from-purple-500 via-fuchsia-600 to-pink-700",
      bgGradient: "from-purple-50 to-pink-100",
      borderColor: "border-purple-200",
      hoverShadow: "hover:shadow-purple-500/30"
    },
    {
      role: "ADMIN" as UserRole,
      title: "إدارة المنصة",
      description: "لوحة التحكم الرئيسية",
      icon: Shield,
      gradient: "from-red-500 via-rose-600 to-pink-700",
      bgGradient: "from-red-50 to-rose-100",
      borderColor: "border-red-200",
      hoverShadow: "hover:shadow-red-500/30"
    }
  ]

  const redirectToRolePage = (role: UserRole) => {
    const roleRoutes: Record<UserRole, string> = {
      DENTIST: "/dentist",
      CLINIC_STAFF: "/clinic/clinic-1", // افتراضياً نأخذ أول عيادة
      VENDOR: "/vendor",
      LAB: "/lab",
      ADMIN: "/platform-admin",
      PATIENT: "/services"
    }

    router.push(roleRoutes[role])
  }

  const handleNormalLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRole) return

    try {
      await login(emailOrPhone, password, selectedRole)

      // عرض إشعار نجاح
      addNotification({
        title: "تم تسجيل الدخول بنجاح",
        message: `مرحباً بك في لوحة التحكم`,
        type: "success"
      })

      // إعادة التوجيه
      redirectToRolePage(selectedRole)
    } catch (err) {
      // الخطأ سيتم التعامل معه في المتجر
      console.error("Login error:", err)
    }
  }

  const handleQuickDemo = async (role: UserRole) => {
    try {
      await quickDemo(role)

      // عرض إشعار نجاح
      addNotification({
        title: "تم الدخول التجريبي بنجاح",
        message: `مرحباً بك في الوضع التجريبي`,
        type: "success"
      })

      // إعادة التوجيه
      redirectToRolePage(role)
    } catch (err) {
      console.error("Quick demo error:", err)
    }
  }

  // First Screen: Login Mode Selection + Role Selection
  if (!selectedRole) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden" dir="rtl">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen p-4 py-12">
          <div className="w-full max-w-6xl">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <Link href="/" className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white mb-6 shadow-2xl hover:scale-110 transition-transform duration-300 group">
                <Sparkles className="w-10 h-10 md:w-12 md:h-12 group-hover:rotate-12 transition-transform" />
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-l from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  تسجيل الدخول
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                مرحباً بك في المجتمع الذكي لطب الأسنان
              </p>
            </div>

            {/* Login Mode Toggle */}
            <div className="flex justify-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 p-2 bg-white rounded-2xl shadow-xl border-2 border-gray-100">
                <button
                  onClick={() => setLoginMode("normal")}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${
                    loginMode === "normal"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    تسجيل عادي
                  </div>
                </button>
                <button
                  onClick={() => setLoginMode("quick")}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${
                    loginMode === "quick"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    تسجيل سريع
                  </div>
                </button>
              </div>
            </div>

            {/* Info Card */}
            <div className="max-w-3xl mx-auto mb-8">
              {loginMode === "normal" ? (
                <Card className="bento-card bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white border-none overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                  <CardContent className="p-6 md:p-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <Lock className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-right">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">تسجيل دخول عادي</h3>
                        <p className="text-white/90 text-sm md:text-base">
                          سجل دخولك باستخدام البريد الإلكتروني أو رقم الهاتف مع كلمة المرور
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bento-card bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700 text-white border-none overflow-hidden relative animate-in fade-in duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                  <CardContent className="p-6 md:p-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse">
                          <Zap className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-right">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                          <Sparkles className="w-6 h-6" />
                          تسجيل دخول سريع - تجريبي
                        </h3>
                        <p className="text-white/90 text-sm md:text-base">
                          اختر دورك وادخل فوراً بحساب تجريبي كامل المميزات بدون الحاجة لإدخال بيانات
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Role Selection Title */}
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                اختر دورك في المنصة
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                {loginMode === "normal"
                  ? "حدد نوع حسابك للمتابعة إلى صفحة تسجيل الدخول"
                  : "حدد الدور الذي تريد تجربته للدخول السريع"
                }
              </p>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {userRoles.map((userRole) => {
                const Icon = userRole.icon
                return (
                  <Card
                    key={userRole.role}
                    onClick={() => {
                      if (loginMode === "quick") {
                        handleQuickDemo(userRole.role)
                      } else {
                        setSelectedRole(userRole.role)
                      }
                    }}
                    className={`bento-card cursor-pointer group bg-gradient-to-br ${userRole.bgGradient} border-2 ${userRole.borderColor} hover:scale-105 ${userRole.hoverShadow} hover:shadow-2xl overflow-hidden relative transition-all duration-300`}
                  >
                    {/* Background Icon */}
                    <div className="absolute -bottom-4 -left-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <Icon className="w-32 h-32" />
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>

                    <CardHeader className="relative z-10 pb-4">
                      <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${userRole.gradient} rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <CardTitle className="text-gray-900 text-xl md:text-2xl mb-2">
                        {userRole.title}
                      </CardTitle>
                      <CardDescription className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {userRole.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      {loginMode === "normal" ? (
                        <Button
                          variant="outline"
                          className="w-full font-bold border-2 group-hover:bg-white group-hover:border-gray-900 transition-all duration-300"
                          size="lg"
                        >
                          متابعة
                          <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      ) : (
                        <Button
                          className={`w-full font-bold bg-gradient-to-r ${userRole.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                          size="lg"
                        >
                          <Zap className="ml-2 h-5 w-5" />
                          دخول تجريبي فوري
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Back to Home Link */}
            <div className="text-center mt-8 md:mt-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors group"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                العودة للصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Second Screen: Normal Login Form
  const currentRole = userRoles.find(r => r.role === selectedRole)!
  const RoleIcon = currentRole.icon

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden" dir="rtl">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md md:max-w-lg shadow-2xl bento-card border-2">
          <CardHeader className="space-y-4 pb-6">
            {/* Back Button */}
            <button
              onClick={() => setSelectedRole(null)}
              className="text-sm md:text-base text-gray-600 hover:text-gray-900 text-right flex items-center gap-2 font-semibold transition-colors group"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              تغيير الدور
            </button>

            {/* Role Icon */}
            <div className="flex justify-center">
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${currentRole.gradient} flex items-center justify-center shadow-2xl animate-in zoom-in duration-500`}>
                <RoleIcon className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <CardTitle className="text-3xl md:text-4xl mb-3 text-gray-900">
                تسجيل الدخول
              </CardTitle>
              <CardDescription className="text-base md:text-lg">
                <span className="font-bold text-gray-900">{currentRole.title}</span>
                <br />
                <span className="text-gray-600">{currentRole.description}</span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleNormalLogin} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-lg bg-red-50 border-2 border-red-200 animate-in slide-in-from-top duration-300">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-bold text-red-900 mb-1">خطأ في تسجيل الدخول</h4>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Email or Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="emailOrPhone" className="text-base font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  البريد الإلكتروني أو رقم الهاتف
                </Label>
                <div className="relative">
                  <Input
                    id="emailOrPhone"
                    type="text"
                    placeholder="example@email.com أو 07XXXXXXXXX"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    required
                    disabled={isLoading}
                    className="text-right h-12 md:h-14 text-base pr-4 border-2 focus:border-primary disabled:opacity-50"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  يمكنك استخدام البريد الإلكتروني أو رقم الهاتف للدخول
                </p>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  كلمة المرور
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="text-right h-12 md:h-14 text-base border-2 focus:border-primary disabled:opacity-50"
                  dir="ltr"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-between text-sm">
                <a href="#" className="text-primary hover:underline font-semibold transition-colors">
                  نسيت كلمة المرور؟
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r ${currentRole.gradient} hover:opacity-90 shadow-xl text-base md:text-lg font-bold disabled:opacity-50`}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="ml-2 w-5 h-5" />
                    تسجيل الدخول
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500 font-semibold">أو</span>
                </div>
              </div>

              {/* Quick Demo Login Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => selectedRole && handleQuickDemo(selectedRole)}
                disabled={isLoading || !selectedRole}
                className="w-full border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-bold text-base md:text-lg h-12 md:h-14 disabled:opacity-50"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                    جاري الدخول...
                  </>
                ) : (
                  <>
                    <Zap className="ml-2 w-5 h-5" />
                    دخول تجريبي سريع
                  </>
                )}
              </Button>

              {/* Register Link */}
              <div className="text-center text-sm md:text-base text-gray-600 pt-4">
                ليس لديك حساب؟{" "}
                <a href="/auth/register" className="text-primary hover:underline font-bold transition-colors">
                  سجل الآن
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
