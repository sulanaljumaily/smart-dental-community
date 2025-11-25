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
  BookOpen,
  Video,
  FileText,
  Box,
  Clock,
  Calendar,
  User,
  ArrowRight,
  Play,
  Download,
  Eye,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EducationPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("courses")

  // بيانات تجريبية للدورات
  const courses = [
    {
      id: "1",
      title: "التصوير الرقمي المتقدم في طب الأسنان",
      description: "دورة شاملة تغطي أحدث تقنيات التصوير الرقمي وتطبيقاتها في التشخيص والعلاج",
      coverImage: "📷",
      category: "تصوير طبي",
      level: "متقدم",
      duration: 12,
      totalSessions: 6,
      enrollmentCount: 234,
      maxEnrollments: 500,
      instructors: [
        { name: "د. أحمد محمود", title: "استشاري تصوير طبي" },
        { name: "د. سارة علي", title: "أخصائية أشعة" },
      ],
      startDate: "2024-02-01",
      progress: 45,
      isEnrolled: true,
      isFeatured: true,
    },
    {
      id: "2",
      title: "زراعة الأسنان الرقمية",
      description: "تعلم تقنيات الزراعة الحديثة باستخدام التخطيط الرقمي والطباعة ثلاثية الأبعاد",
      coverImage: "🦷",
      category: "زراعة",
      level: "متوسط",
      duration: 20,
      totalSessions: 10,
      enrollmentCount: 189,
      maxEnrollments: 300,
      instructors: [
        { name: "د. خالد حسن", title: "استشاري زراعة" },
      ],
      startDate: "2024-02-15",
      progress: 0,
      isEnrolled: false,
      isFeatured: true,
    },
  ]

  // بيانات تجريبية للندوات
  const webinars = [
    {
      id: "1",
      title: "التطورات الحديثة في تقويم الأسنان الشفاف",
      description: "ندوة مباشرة تناقش أحدث التقنيات في التقويم الشفاف والحالات المعقدة",
      coverImage: "🎯",
      category: "تقويم",
      scheduledDate: "2024-01-28T19:00:00",
      duration: 90,
      attendeeCount: 456,
      maxAttendees: 1000,
      instructors: [
        { name: "د. فاطمة أحمد", title: "استشارية تقويم" },
      ],
      status: "SCHEDULED",
      isRegistered: true,
      meetingUrl: "https://zoom.us/j/123456789",
    },
    {
      id: "2",
      title: "إدارة الحالات الطارئة في عيادة الأسنان",
      description: "ندوة تفاعلية حول كيفية التعامل مع الحالات الطارئة بشكل احترافي",
      coverImage: "🚨",
      category: "طوارئ",
      scheduledDate: "2024-02-05T18:00:00",
      duration: 60,
      attendeeCount: 298,
      maxAttendees: 500,
      instructors: [
        { name: "د. محمد عبدالله", title: "استشاري طب أسنان" },
      ],
      status: "SCHEDULED",
      isRegistered: false,
    },
  ]

  // بيانات تجريبية للمصادر العلمية
  const resources = [
    {
      id: "1",
      title: "دليل جمعية طب الأسنان الأمريكية للتعقيم",
      description: "الإرشادات الكاملة لبروتوكولات التعقيم والوقاية من العدوى في عيادات الأسنان",
      category: "إرشادات",
      thumbnail: "📋",
      author: "American Dental Association",
      publishedDate: "2023-12-01",
      views: 1234,
      downloads: 567,
      tags: ["تعقيم", "وقاية", "إرشادات"],
      isFeatured: true,
    },
    {
      id: "2",
      title: "أبحاث حديثة في علاج العصب",
      description: "مجموعة من أحدث الأبحاث العلمية في تقنيات علاج العصب",
      category: "أبحاث",
      thumbnail: "🔬",
      author: "Journal of Endodontics",
      publishedDate: "2024-01-15",
      views: 892,
      downloads: 432,
      tags: ["علاج_عصب", "أبحاث", "تقنيات"],
      isFeatured: false,
    },
  ]

  // بيانات تجريبية للنماذج 3D
  const models3D = [
    {
      id: "1",
      title: "تشريح الفك العلوي - نموذج تفاعلي",
      description: "نموذج ثلاثي الأبعاد تفاعلي يوضح التشريح التفصيلي للفك العلوي",
      category: "تشريح",
      thumbnailUrl: "🦴",
      sketchfabUrl: "https://sketchfab.com/models/abc123",
      views: 2345,
      tags: ["تشريح", "فك_علوي", "تعليمي"],
      isFeatured: true,
    },
    {
      id: "2",
      title: "خطوات زراعة الأسنان - محاكاة",
      description: "نموذج يوضح جميع خطوات عملية زراعة الأسنان بشكل تفاعلي",
      category: "إجراءات",
      thumbnailUrl: "⚕️",
      sketchfabUrl: "https://sketchfab.com/models/def456",
      views: 1876,
      tags: ["زراعة", "إجراءات", "محاكاة"],
      isFeatured: true,
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
                <h1 className="text-xl font-bold">التعليم الطبي</h1>
                <p className="text-sm text-muted-foreground">تطوير مهاراتك المهنية</p>
              </div>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
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
              variant="default"
              size="sm"
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
              variant="ghost"
              size="sm"
              onClick={() => router.push("/community/more")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <MoreHorizontal className="w-4 h-4" />
              أخرى
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Education Sections Tabs */}
        <Tabs defaultValue="courses" className="space-y-6" onValueChange={setActiveSection}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">الدورات</span>
            </TabsTrigger>
            <TabsTrigger value="webinars" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">الندوات</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">المصادر العلمية</span>
            </TabsTrigger>
            <TabsTrigger value="models3d" className="flex items-center gap-2">
              <Box className="w-4 h-4" />
              <span className="hidden sm:inline">نماذج 3D</span>
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">الدورات التدريبية</h2>
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <Card key={course.id} className="bento-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="text-6xl">{course.coverImage}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
                          {course.isFeatured && (
                            <Badge variant="secondary" className="text-xs">مميزة</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{course.category}</Badge>
                      <Badge variant="outline">{course.level}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration} ساعة
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {course.enrollmentCount} مشارك
                      </Badge>
                    </div>

                    {course.isEnrolled && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">التقدم</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex gap-2">
                      {course.isEnrolled ? (
                        <Button className="flex-1">
                          <Play className="w-4 h-4 ml-2" />
                          متابعة الدورة
                        </Button>
                      ) : (
                        <Button className="flex-1">
                          التسجيل في الدورة
                        </Button>
                      )}
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Webinars Tab */}
          <TabsContent value="webinars" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">الندوات المباشرة</h2>
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {webinars.map((webinar) => (
                <Card key={webinar.id} className="bento-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="text-6xl">{webinar.coverImage}</div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-bold text-lg leading-tight">{webinar.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{webinar.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{webinar.category}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(webinar.scheduledDate).toLocaleDateString('ar-SA')}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {webinar.duration} دقيقة
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {webinar.attendeeCount} مسجل
                      </Badge>
                    </div>

                    {webinar.isRegistered && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800 font-semibold">✓ أنت مسجل في هذه الندوة</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {webinar.isRegistered ? (
                        webinar.status === "LIVE" ? (
                          <Button className="flex-1 bg-red-600 hover:bg-red-700">
                            <Video className="w-4 h-4 ml-2" />
                            انضم الآن • LIVE
                          </Button>
                        ) : (
                          <Button className="flex-1" variant="outline" disabled>
                            في انتظار البدء
                          </Button>
                        )
                      ) : (
                        <Button className="flex-1">
                          التسجيل في الندوة
                        </Button>
                      )}
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">المصادر العلمية</h2>
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Card key={resource.id} className="bento-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-6xl mb-4">{resource.thumbnail}</div>
                    <h3 className="font-bold text-lg leading-tight">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{resource.category}</Badge>
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {resource.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.downloads}
                      </span>
                    </div>

                    <Button className="w-full">
                      <Download className="w-4 h-4 ml-2" />
                      تحميل المصدر
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 3D Models Tab */}
          <TabsContent value="models3d" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">النماذج ثلاثية الأبعاد</h2>
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {models3D.map((model) => (
                <Card key={model.id} className="bento-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-6xl mb-4">
                      {model.thumbnailUrl}
                    </div>
                    <h3 className="font-bold text-lg leading-tight">{model.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{model.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{model.category}</Badge>
                      {model.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {model.views} مشاهدة
                      </span>
                    </div>

                    <Button className="w-full">
                      <Box className="w-4 h-4 ml-2" />
                      عرض النموذج 3D
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <MobileNav userRole="DENTIST" isOwner={true} />
    </div>
  )
}
