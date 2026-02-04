"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MobileNav } from "@/components/shared/mobile-nav"
import {
  Home,
  GraduationCap,
  MessageSquare,
  Users,
  MoreHorizontal,
  Plus,
  Search,
  ArrowRight,
  Lock,
  Globe,
  TrendingUp,
  MessageCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function GroupsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // بيانات تجريبية للمجموعات
  const groups = [
    {
      id: "1",
      name: "أطباء الأسنان في بغداد",
      description: "مجموعة لتبادل الخبرات والمعلومات بين أطباء الأسنان في محافظة بغداد",
      category: "محلي",
      coverImage: "🏙️",
      privacy: "PUBLIC",
      memberCount: 1234,
      postCount: 567,
      isMember: true,
      creator: {
        name: "د. أحمد محمود",
        avatar: "أ",
      },
    },
    {
      id: "2",
      name: "استشاريو زراعة الأسنان",
      description: "مجموعة متخصصة في زراعة الأسنان للاستشاريين والأطباء المتقدمين",
      category: "تخصص",
      coverImage: "🦷",
      privacy: "PRIVATE",
      memberCount: 456,
      postCount: 892,
      isMember: false,
      creator: {
        name: "د. خالد حسن",
        avatar: "خ",
      },
    },
    {
      id: "3",
      name: "تقويم الأسنان الحديث",
      description: "نقاشات وحالات حول أحدث تقنيات تقويم الأسنان",
      category: "تخصص",
      coverImage: "⚕️",
      privacy: "PUBLIC",
      memberCount: 789,
      postCount: 1234,
      isMember: true,
      creator: {
        name: "د. فاطمة أحمد",
        avatar: "ف",
      },
    },
    {
      id: "4",
      name: "أطباء الأسنان الشباب",
      description: "مجموعة لحديثي التخرج ومشاركة تجاربهم في بداية المسيرة المهنية",
      category: "عام",
      coverImage: "👨‍⚕️",
      privacy: "PUBLIC",
      memberCount: 2345,
      postCount: 3456,
      isMember: false,
      creator: {
        name: "د. سارة علي",
        avatar: "س",
      },
    },
  ]

  const myGroups = groups.filter(g => g.isMember)
  const suggestedGroups = groups.filter(g => !g.isMember)

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
                <h1 className="text-xl font-bold">المجموعات الطبية</h1>
                <p className="text-sm text-muted-foreground">تواصل مع زملائك</p>
              </div>
            </div>
            <Button onClick={() => alert("إنشاء مجموعة جديدة")}>
              <Plus className="w-4 h-4 ml-2" />
              مجموعة جديدة
            </Button>
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
              variant="default"
              size="sm"
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

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ابحث عن مجموعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* My Groups */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">مجموعاتي ({myGroups.length})</h2>
            <Button variant="outline" size="sm">
              عرض الكل
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myGroups.map((group) => (
              <Card key={group.id} className="bento-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{group.coverImage}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg leading-tight">{group.name}</h3>
                        {group.privacy === "PRIVATE" ? (
                          <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{group.category}</Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {group.memberCount} عضو
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {group.postCount} منشور
                    </Badge>
                  </div>

                  <Button className="w-full" variant="outline">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    عرض المجموعة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Suggested Groups */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              مجموعات مقترحة
            </h2>
            <Button variant="outline" size="sm">
              عرض الكل
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestedGroups.map((group) => (
              <Card key={group.id} className="bento-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{group.coverImage}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg leading-tight">{group.name}</h3>
                        {group.privacy === "PRIVATE" ? (
                          <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{group.category}</Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {group.memberCount} عضو
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {group.postCount} منشور
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {group.creator.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      أنشأها {group.creator.name}
                    </span>
                  </div>

                  <Button className="w-full">
                    <Plus className="w-4 h-4 ml-2" />
                    انضم للمجموعة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Navigation */}
      <MobileNav userRole="DENTIST" isOwner={true} />
    </div>
  )
}
