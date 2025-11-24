"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/shared/mobile-nav"
import {
  Home,
  GraduationCap,
  MessageSquare,
  Users,
  MoreHorizontal,
  Image as ImageIcon,
  Video,
  FileText,
  Send,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  BookOpen,
  Bell,
  Settings,
  Search,
  Globe,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function CommunityPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [activeFilter, setActiveFilter] = useState("all")

  // بيانات تجريبية
  const posts = [
    {
      id: "1",
      author: {
        name: "د. محمد أحمد",
        avatar: "م",
        title: "استشاري تجميل الأسنان",
        isElite: true,
      },
      content: "حالة تقويم معقدة تم إنجازها بنجاح بعد 18 شهر من العلاج. النتيجة مذهلة والمريض سعيد جداً 🦷✨",
      images: ["📸", "📸", "📸"],
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: "منذ ساعتين",
      category: "case-study",
    },
    {
      id: "2",
      author: {
        name: "د. سارة علي",
        avatar: "س",
        title: "أخصائية علاج العصب",
        isElite: true,
      },
      content: "تقنية جديدة لعلاج العصب بدون ألم باستخدام التخدير الموضعي المتطور. النتائج ممتازة مع المرضى 👨‍⚕️",
      video: "🎥",
      likes: 189,
      comments: 32,
      shares: 28,
      timestamp: "منذ 4 ساعات",
      category: "technique",
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "ندوة: التطورات الحديثة في زراعة الأسنان",
      date: "25 يناير 2024",
      time: "07:00 م",
      type: "webinar",
      attendees: 456,
    },
    {
      id: "2",
      title: "دورة: التصوير الرقمي في طب الأسنان",
      date: "30 يناير 2024",
      time: "06:00 م",
      type: "course",
      attendees: 234,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      {/* Header with Navigation Tabs */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">المجتمع الطبي</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("overview")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Home className="w-4 h-4" />
              نظرة عامة
            </Button>
            <Button
              variant={activeTab === "education" ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push("/community/education")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4" />
              التعليم
            </Button>
            <Button
              variant={activeTab === "messages" ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push("/dentist/messages")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              الرسائل
            </Button>
            <Button
              variant={activeTab === "groups" ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push("/community/groups")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Users className="w-4 h-4" />
              المجموعات
            </Button>
            <Button
              variant={activeTab === "more" ? "default" : "ghost"}
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
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4">
            {/* Profile Card */}
            <Card className="bento-card">
              <CardContent className="p-6 text-center space-y-4">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    د.س
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">د. سلطان الجميلي</h3>
                  <p className="text-sm text-muted-foreground">طبيب أسنان</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <p className="font-bold">234</p>
                    <p className="text-muted-foreground text-xs">منشور</p>
                  </div>
                  <div>
                    <p className="font-bold">1.2K</p>
                    <p className="text-muted-foreground text-xs">متابع</p>
                  </div>
                  <div>
                    <p className="font-bold">567</p>
                    <p className="text-muted-foreground text-xs">متابَع</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline" size="sm">
                  عرض الملف الشخصي
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bento-card">
              <CardContent className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="sm" onClick={() => router.push("/community/groups")}>
                  <Users className="w-4 h-4 ml-2" />
                  المجموعات
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm" onClick={() => router.push("/community/education")}>
                  <BookOpen className="w-4 h-4 ml-2" />
                  دوراتي
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Bookmark className="w-4 h-4 ml-2" />
                  المحفوظات
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Events Promo Banner */}
            <Card className="bento-card bg-gradient-to-r from-purple-500 to-pink-600 text-white border-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">📚</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">ندوة: التطورات الحديثة في زراعة الأسنان</h3>
                    <p className="text-white/90 text-sm mb-3">25 يناير 2024 - 07:00 م</p>
                    <Button variant="secondary" size="sm" onClick={() => router.push("/community/education")}>
                      سجل الآن
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Create Post */}
            <Card className="bento-card">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      د.س
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <textarea
                      placeholder="شارك خبرتك، حالة طبية، أو سؤال مع المجتمع..."
                      className="w-full min-h-[80px] p-3 rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <ImageIcon className="w-4 h-4 ml-1" />
                          صورة
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4 ml-1" />
                          فيديو
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4 ml-1" />
                          ملف
                        </Button>
                      </div>
                      <Button>
                        <Send className="w-4 h-4 ml-2" />
                        نشر
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filter Tabs */}
            <Card className="bento-card">
              <CardContent className="p-2">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  <Button
                    variant={activeFilter === "all" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter("all")}
                  >
                    <Globe className="w-4 h-4 ml-1" />
                    الكل
                  </Button>
                  <Button
                    variant={activeFilter === "elite" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter("elite")}
                  >
                    <TrendingUp className="w-4 h-4 ml-1" />
                    النخبة
                  </Button>
                  <Button
                    variant={activeFilter === "friends" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter("friends")}
                  >
                    <Users className="w-4 h-4 ml-1" />
                    الأصدقاء
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="bento-card hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                          {post.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{post.author.name}</h4>
                          {post.author.isElite && (
                            <Badge variant="default" className="text-xs">
                              نخبة
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{post.author.title}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-base leading-relaxed">{post.content}</p>

                    {post.images && (
                      <div className="grid grid-cols-3 gap-2">
                        {post.images.map((img, index) => (
                          <div
                            key={index}
                            className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-4xl cursor-pointer hover:scale-105 transition-transform"
                          >
                            {img}
                          </div>
                        ))}
                      </div>
                    )}

                    {post.video && (
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-6xl cursor-pointer hover:scale-105 transition-transform">
                        {post.video}
                      </div>
                    )}

                    <Separator />

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{post.likes} إعجاب</span>
                        <span>{post.comments} تعليق</span>
                      </div>
                      <span>{post.shares} مشاركة</span>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-4 gap-2">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Heart className="w-4 h-4 ml-1" />
                        أعجبني
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <MessageCircle className="w-4 h-4 ml-1" />
                        تعليق
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Share2 className="w-4 h-4 ml-1" />
                        مشاركة
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Bookmark className="w-4 h-4 ml-1" />
                        حفظ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4">
            {/* Trending Topics */}
            <Card className="bento-card">
              <CardHeader>
                <h3 className="font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  المواضيع الرائجة
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { tag: "#زراعة_الأسنان", posts: 1234 },
                  { tag: "#تقويم_الأسنان", posts: 987 },
                  { tag: "#تجميل_الأسنان", posts: 845 },
                  { tag: "#علاج_العصب", posts: 678 },
                ].map((topic, index) => (
                  <div key={index} className="space-y-1 cursor-pointer hover:bg-accent p-2 rounded-lg transition-colors">
                    <p className="font-semibold text-sm text-primary">{topic.tag}</p>
                    <p className="text-xs text-muted-foreground">{topic.posts} منشور</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bento-card">
              <CardHeader>
                <h3 className="font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  الفعاليات القادمة
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg bg-accent/50 space-y-2">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{event.attendees} مشترك</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => router.push("/community/education")}>
                      سجل الآن
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav userRole="DENTIST" isOwner={true} />
    </div>
  )
}
