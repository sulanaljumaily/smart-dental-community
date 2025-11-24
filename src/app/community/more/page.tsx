"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MobileNav } from "@/components/shared/mobile-nav"
import {
  Home,
  GraduationCap,
  MessageSquare,
  Users,
  MoreHorizontal,
  FileText,
  BookOpen,
  Video,
  ArrowRight,
  Settings,
  Award,
  MapPin,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function MorePage() {
  const router = useRouter()

  // بيانات تجريبية للاختصارات السريعة
  const myPosts = 234
  const myCourses = [
    {
      id: "1",
      title: "التصوير الرقمي المتقدم",
      progress: 65,
      nextSession: "2024-01-30",
      coverImage: "📷",
    },
    {
      id: "2",
      title: "تقنيات الزراعة الحديثة",
      progress: 30,
      nextSession: "2024-02-02",
      coverImage: "🦷",
    },
  ]

  const myWebinars = [
    {
      id: "1",
      title: "التطورات الحديثة في التقويم",
      scheduledDate: "2024-01-28T19:00:00",
      status: "UPCOMING",
      coverImage: "🎯",
    },
    {
      id: "2",
      title: "إدارة الحالات الطارئة",
      scheduledDate: "2024-02-05T18:00:00",
      status: "UPCOMING",
      coverImage: "🚨",
    },
  ]

  const myGroups = [
    {
      id: "1",
      name: "أطباء بغداد",
      memberCount: 1234,
      coverImage: "🏙️",
      newPosts: 12,
    },
    {
      id: "2",
      name: "تقويم الأسنان",
      memberCount: 789,
      coverImage: "⚕️",
      newPosts: 5,
    },
  ]

  // بيانات إعدادات إضافية
  const communitySettings = [
    {
      icon: <Award className="w-5 h-5 text-yellow-600" />,
      title: "إنجازاتي",
      description: "عرض الشهادات والإنجازات",
      action: () => alert("عرض الإنجازات"),
    },
    {
      icon: <MapPin className="w-5 h-5 text-blue-600" />,
      title: "تحديث المحافظة",
      description: "تحديث موقعك الجغرافي",
      action: () => alert("تحديث المحافظة"),
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      title: "الإحصائيات",
      description: "عرض إحصائيات تفاعلك",
      action: () => alert("عرض الإحصائيات"),
    },
    {
      icon: <Settings className="w-5 h-5 text-gray-600" />,
      title: "إعدادات الخصوصية",
      description: "التحكم في من يرى محتواك",
      action: () => alert("إعدادات الخصوصية"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      {/* Header with Navigation */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">نشاطاتي وإعداداتي</h1>
                <p className="text-sm text-muted-foreground">اختصارات سريعة وإعدادات</p>
              </div>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/community")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Home className="w-4 h-4" />
              نظرة عامة
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/community/education")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4" />
              التعليم
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dentist/messages")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              الرسائل
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/community/groups")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Users className="w-4 h-4" />
              المجموعات
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <MoreHorizontal className="w-4 h-4" />
              أخرى
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Quick Shortcuts */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold mb-4">الاختصارات السريعة</h2>

              {/* My Posts */}
              <Card className="bento-card mb-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">منشوراتي</h3>
                        <p className="text-sm text-muted-foreground">{myPosts} منشور</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      عرض الكل
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* My Courses */}
              <Card className="bento-card mb-4">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <BookOpen className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">دوراتي المسجلة</h3>
                        <p className="text-sm text-muted-foreground">{myCourses.length} دورة نشطة</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push("/community/education")}>
                      عرض الكل
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myCourses.map((course) => (
                    <div key={course.id} className="space-y-3 p-4 bg-accent/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{course.coverImage}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{course.title}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            الجلسة القادمة: {new Date(course.nextSession).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">التقدم</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button size="sm" className="w-full">
                        متابعة الدورة
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* My Webinars */}
              <Card className="bento-card mb-4">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Video className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">الندوات المسجلة</h3>
                        <p className="text-sm text-muted-foreground">{myWebinars.length} ندوة قادمة</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push("/community/education")}>
                      عرض الكل
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {myWebinars.map((webinar) => (
                    <div key={webinar.id} className="p-4 bg-accent/30 rounded-lg space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{webinar.coverImage}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{webinar.title}</h4>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(webinar.scheduledDate).toLocaleDateString('ar-SA')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(webinar.scheduledDate).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        مسجل ✓
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* My Groups */}
              <Card className="bento-card">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Users className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">مجموعاتي</h3>
                        <p className="text-sm text-muted-foreground">{myGroups.length} مجموعة</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push("/community/groups")}>
                      عرض الكل
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {myGroups.map((group) => (
                    <div key={group.id} className="p-4 bg-accent/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{group.coverImage}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{group.name}</h4>
                          <p className="text-xs text-muted-foreground">{group.memberCount} عضو</p>
                        </div>
                        {group.newPosts > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {group.newPosts} جديد
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column - Additional Settings */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold mb-4">إعدادات إضافية</h2>

              <Card className="bento-card">
                <CardContent className="p-6 space-y-3">
                  {communitySettings.map((setting, index) => (
                    <div key={index}>
                      <button
                        onClick={setting.action}
                        className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-accent transition-colors text-right"
                      >
                        <div className="p-2 bg-accent rounded-lg">
                          {setting.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{setting.title}</h3>
                          <p className="text-xs text-muted-foreground">{setting.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground rotate-180" />
                      </button>
                      {index < communitySettings.length - 1 && <Separator className="my-3" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Elite Status Card */}
              <Card className="bento-card bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-none mt-4">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">👑</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">انضم إلى النخبة</h3>
                      <p className="text-white/90 text-sm mb-3">
                        كن من النخبة في محافظتك واحصل على مزايا حصرية
                      </p>
                      <p className="text-xs text-white/80">
                        * يتم الترقية بواسطة إدارة المنصة بناءً على الإنجازات والمساهمات
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav userRole="DENTIST" isOwner={true} />
    </div>
  )
}
