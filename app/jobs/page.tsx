"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileNav } from "@/components/shared/mobile-nav"
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  User,
  Plus,
  Filter,
  TrendingUp,
  Users,
  FileText,
  CheckCircle2
} from "lucide-react"

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // بيانات تجريبية
  const featuredJobs = [
    {
      id: "1",
      type: "job",
      title: "طبيب أسنان عام",
      clinic: "عيادة النجوم لطب الأسنان",
      location: "بغداد - الكرادة",
      salary: "2,000,000 - 3,000,000",
      jobType: "دوام كامل",
      posted: "منذ يوم",
      applicants: 12,
      isFeatured: true,
    },
    {
      id: "2",
      type: "job",
      title: "أخصائي تقويم أسنان",
      clinic: "مركز الابتسامة الطبي",
      location: "بغداد - المنصور",
      salary: "3,500,000 - 4,500,000",
      jobType: "دوام جزئي",
      posted: "منذ 3 أيام",
      applicants: 8,
      isFeatured: true,
    },
  ]

  const jobs = [
    {
      id: "3",
      type: "job",
      title: "طبيب أسنان - قسم الأطفال",
      clinic: "عيادة الأمل التخصصية",
      location: "بغداد - الجادرية",
      salary: "2,500,000",
      jobType: "دوام كامل",
      posted: "منذ أسبوع",
      applicants: 15,
      requirements: ["خبرة سنتين على الأقل", "رخصة مزاولة المهنة"],
    },
    {
      id: "4",
      type: "job",
      title: "مساعد طبيب أسنان",
      clinic: "مركز النور الطبي",
      location: "بغداد - الكرادة",
      salary: "1,000,000 - 1,200,000",
      jobType: "دوام كامل",
      posted: "منذ أسبوعين",
      applicants: 23,
    },
  ]

  const availableDentists = [
    {
      id: "1",
      name: "د. أحمد محمود",
      specialization: "طب الأسنان العام",
      experience: "5 سنوات",
      location: "بغداد",
      availability: "فوري",
      avatar: "أ",
    },
    {
      id: "2",
      name: "د. فاطمة حسن",
      specialization: "تقويم الأسنان",
      experience: "8 سنوات",
      location: "بغداد",
      availability: "بعد شهر",
      avatar: "ف",
    },
    {
      id: "3",
      name: "د. علي كريم",
      specialization: "زراعة الأسنان",
      experience: "10 سنوات",
      location: "النجف",
      availability: "فوري",
      avatar: "ع",
    },
  ]

  const latestOffers = [
    {
      id: "1",
      title: "عرض عمل من عيادة متميزة",
      description: "فرصة للانضمام لفريق عمل محترف",
      posted: "منذ ساعتين",
    },
    {
      id: "2",
      title: "طبيب أسنان يبحث عن فرصة",
      description: "خبرة 3 سنوات في التجميل",
      posted: "منذ 5 ساعات",
    },
  ]

  const stats = {
    totalJobs: 234,
    totalDentists: 156,
    recentHires: 45,
  }

  const iraqCities = [
    "بغداد", "البصرة", "الموصل", "أربيل", "النجف", "كربلاء",
    "السليمانية", "الأنبار", "ديالى", "ذي قار", "القادسية", "المثنى"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">منصة الوظائف</h1>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              نشر وظيفة
            </Button>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن وظائف أو أطباء..."
                className="pr-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{stats.totalJobs}</p>
              <p className="text-xs text-muted-foreground">وظيفة متاحة</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{stats.totalDentists}</p>
              <p className="text-xs text-muted-foreground">طبيب متاح</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">{stats.recentHires}</p>
              <p className="text-xs text-muted-foreground">تم التوظيف</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-12">
            <TabsTrigger value="all" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase className="w-4 h-4" />
              الوظائف
            </TabsTrigger>
            <TabsTrigger value="dentists" className="gap-2">
              <Users className="w-4 h-4" />
              الأطباء
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="all" className="space-y-6 mt-6">
            {/* Latest Offers */}
            <section>
              <h2 className="text-xl font-bold mb-4">آخر العروض</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {latestOffers.map((offer) => (
                  <Card key={offer.id} className="bento-card hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white flex-shrink-0">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{offer.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                          <p className="text-xs text-muted-foreground">{offer.posted}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Featured Jobs */}
            <section>
              <h2 className="text-xl font-bold mb-4">وظائف مميزة</h2>
              <div className="space-y-4">
                {featuredJobs.map((job) => (
                  <Card key={job.id} className="bento-card hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl flex-shrink-0">
                          🏥
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-lg">{job.title}</h3>
                                <p className="text-sm text-muted-foreground">{job.clinic}</p>
                              </div>
                              {job.isFeatured && (
                                <Badge variant="default">مميزة</Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary} د.ع</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{job.jobType}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{job.posted}</span>
                              <span>•</span>
                              <span>{job.applicants} متقدم</span>
                            </div>
                            <Button size="sm">
                              <FileText className="w-4 h-4 ml-1" />
                              تقديم
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Available Dentists Preview */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">أطباء متاحون للعمل</h2>
                <Button variant="ghost" onClick={() => setActiveTab("dentists")}>
                  عرض الكل
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {availableDentists.slice(0, 3).map((dentist) => (
                  <Card key={dentist.id} className="bento-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                        {dentist.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold">{dentist.name}</h3>
                        <p className="text-sm text-muted-foreground">{dentist.specialization}</p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">خبرة: {dentist.experience}</p>
                        <Badge variant={dentist.availability === "فوري" ? "success" : "secondary"}>
                          {dentist.availability}
                        </Badge>
                      </div>
                      <Button size="sm" className="w-full">
                        عرض السيرة الذاتية
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6 mt-6">
            {/* Filters */}
            <Card className="bento-card">
              <CardContent className="p-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <select className="h-10 rounded-md border border-input bg-background px-3">
                    <option>جميع المحافظات</option>
                    {iraqCities.map(city => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                  <select className="h-10 rounded-md border border-input bg-background px-3">
                    <option>جميع التخصصات</option>
                    <option>طب أسنان عام</option>
                    <option>تقويم</option>
                    <option>زراعة</option>
                    <option>تجميل</option>
                  </select>
                  <select className="h-10 rounded-md border border-input bg-background px-3">
                    <option>نوع الدوام</option>
                    <option>دوام كامل</option>
                    <option>دوام جزئي</option>
                    <option>عقد</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* All Jobs */}
            <div className="space-y-4">
              {[...featuredJobs, ...jobs].map((job) => (
                <Card key={job.id} className="bento-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl flex-shrink-0">
                        🏥
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-bold text-lg">{job.title}</h3>
                            {'isFeatured' in job && job.isFeatured && (
                              <Badge variant="default">مميزة</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{job.clinic}</p>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm">
                          <Badge variant="outline">
                            <MapPin className="w-3 h-3 ml-1" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline">
                            <DollarSign className="w-3 h-3 ml-1" />
                            {job.salary} د.ع
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 ml-1" />
                            {job.jobType}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{job.posted}</span>
                            <span>•</span>
                            <span>{job.applicants} متقدم</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              التفاصيل
                            </Button>
                            <Button size="sm">
                              تقديم
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Dentists Tab */}
          <TabsContent value="dentists" className="space-y-6 mt-6">
            {/* Filters */}
            <Card className="bento-card">
              <CardContent className="p-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <select className="h-10 rounded-md border border-input bg-background px-3">
                    <option>جميع المحافظات</option>
                    {iraqCities.map(city => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                  <select className="h-10 rounded-md border border-input bg-background px-3">
                    <option>جميع التخصصات</option>
                    <option>طب أسنان عام</option>
                    <option>تقويم</option>
                    <option>زراعة</option>
                    <option>تجميل</option>
                  </select>
                  <select className="h-10 rounded-md border border-input bg-background px-3">
                    <option>سنوات الخبرة</option>
                    <option>1-3 سنوات</option>
                    <option>3-5 سنوات</option>
                    <option>5-10 سنوات</option>
                    <option>أكثر من 10 سنوات</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* All Available Dentists */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableDentists.map((dentist) => (
                <Card key={dentist.id} className="bento-card hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                        {dentist.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{dentist.name}</h3>
                        <p className="text-sm text-muted-foreground">{dentist.specialization}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">الخبرة</span>
                        <span className="font-semibold">{dentist.experience}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">الموقع</span>
                        <span className="font-semibold">{dentist.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">التوفر</span>
                        <Badge variant={dentist.availability === "فوري" ? "success" : "secondary"}>
                          {dentist.availability}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        السيرة الذاتية
                      </Button>
                      <Button size="sm" className="flex-1">
                        تواصل
                      </Button>
                    </div>
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
