"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Calendar,
  Play,
  Star,
  Plus,
  Edit,
  Eye,
} from "lucide-react"

export default function CommunityManagementPage() {
  const [activeTab, setActiveTab] = useState("seminars")

  // الندوات والدورات
  const seminars = [
    {
      id: "1",
      title: "تقنيات زراعة الأسنان الحديثة",
      type: "webinar",
      instructor: "د. أحمد محمود",
      date: "2024-02-15",
      duration: "3 ساعات",
      participants: 145,
      status: "upcoming",
    },
    {
      id: "2",
      title: "التشخيص بالذكاء الاصطناعي",
      type: "course",
      instructor: "د. سارة علي",
      date: "2024-02-20",
      duration: "5 أيام",
      participants: 87,
      status: "upcoming",
    },
  ]

  // قائمة النخبة
  const eliteDoctors = [
    {
      id: "1",
      name: "د. محمد أحمد الجبوري",
      specialization: "جراحة الفم والأسنان",
      city: "بغداد",
      yearsOfExperience: 15,
      rating: 4.9,
      clinics: 3,
      isElite: true,
    },
    {
      id: "2",
      name: "د. فاطمة حسن",
      specialization: "تقويم الأسنان",
      city: "البصرة",
      yearsOfExperience: 12,
      rating: 4.8,
      clinics: 2,
      isElite: true,
    },
  ]

  // المجموعات
  const groups = [
    {
      id: "1",
      name: "مجموعة جراحة الأسنان",
      members: 234,
      posts: 456,
      moderator: "د. أحمد محمود",
      isActive: true,
    },
    {
      id: "2",
      name: "مجموعة التقويم المتقدم",
      members: 189,
      posts: 312,
      moderator: "د. سارة علي",
      isActive: true,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">إدارة المجتمع الطبي والتعليم</h1>
        <p className="text-muted-foreground">إدارة الندوات والدورات والمجموعات</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2">
          <TabsTrigger value="seminars">الندوات والدورات</TabsTrigger>
          <TabsTrigger value="elite">قائمة النخبة</TabsTrigger>
          <TabsTrigger value="groups">المجموعات</TabsTrigger>
          <TabsTrigger value="promotions">البطاقات الترويجية</TabsTrigger>
          <TabsTrigger value="resources">المصادر العلمية</TabsTrigger>
        </TabsList>

        {/* الندوات والدورات */}
        <TabsContent value="seminars" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">الندوات والدورات</h2>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة ندوة جديدة
            </Button>
          </div>

          <div className="space-y-3">
            {seminars.map((seminar) => (
              <Card key={seminar.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{seminar.title}</h3>
                        <Badge variant="outline">{seminar.type === 'webinar' ? 'ندوة' : 'دورة'}</Badge>
                        <Badge variant="success">قادم</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{seminar.instructor}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{seminar.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Play className="w-4 h-4" />
                          <span>{seminar.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{seminar.participants} مشارك</span>
                        </div>
                      </div>
                    </div>
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 ml-1" />
                      تعديل
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* قائمة النخبة */}
        <TabsContent value="elite" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">قائمة النخبة</h2>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة طبيب للنخبة
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {eliteDoctors.map((doctor) => (
              <Card key={doctor.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{doctor.name}</h3>
                        <Award className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                      </div>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                      <p className="text-sm text-muted-foreground">{doctor.city}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xs text-muted-foreground">الخبرة</p>
                      <p className="font-bold text-blue-700">{doctor.yearsOfExperience} سنة</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <p className="text-xs text-muted-foreground">التقييم</p>
                      <p className="font-bold text-yellow-700">⭐ {doctor.rating}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-xs text-muted-foreground">العيادات</p>
                      <p className="font-bold text-green-700">{doctor.clinics}</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    إزالة من النخبة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* المجموعات */}
        <TabsContent value="groups" className="space-y-4">
          <h2 className="text-2xl font-bold">المجموعات</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {groups.map((group) => (
              <Card key={group.id} className="bento-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{group.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">المشرف: {group.moderator}</p>
                      <Badge variant="success">نشط</Badge>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xs text-muted-foreground">الأعضاء</p>
                      <p className="font-bold text-blue-700">{group.members}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-xs text-muted-foreground">المنشورات</p>
                      <p className="font-bold text-green-700">{group.posts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* البطاقات الترويجية */}
        <TabsContent value="promotions" className="space-y-4">
          <h2 className="text-2xl font-bold">البطاقات الترويجية</h2>
          <Card className="bento-card">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                إدارة البطاقات الترويجية للمحتوى المميز
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* المصادر العلمية */}
        <TabsContent value="resources" className="space-y-4">
          <h2 className="text-2xl font-bold">المصادر العلمية</h2>
          <Card className="bento-card">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                إدارة المصادر والمراجع العلمية
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
