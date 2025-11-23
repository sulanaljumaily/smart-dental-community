"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
} from "lucide-react"

export default function JobsManagementPage() {
  const jobs = [
    {
      id: "1",
      title: "طبيب أسنان - دوام كامل",
      clinic: "عيادة الابتسامة الذكية",
      city: "بغداد",
      salary: "2,000,000 - 3,000,000 د.ع",
      type: "full-time",
      experience: "3-5 سنوات",
      postedDate: "2024-01-20",
      applicants: 23,
      isFeatured: true,
      status: "active",
    },
    {
      id: "2",
      title: "فني أسنان",
      clinic: "مركز الأسنان المتقدم",
      city: "البصرة",
      salary: "800,000 - 1,200,000 د.ع",
      type: "full-time",
      experience: "1-3 سنوات",
      postedDate: "2024-01-19",
      applicants: 15,
      isFeatured: false,
      status: "active",
    },
  ]

  const stats = {
    totalJobs: 45,
    activeJobs: 38,
    featuredJobs: 12,
    totalApplicants: 234,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">إدارة الوظائف</h1>
        <p className="text-muted-foreground">نشر وإدارة الوظائف المميزة</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي الوظائف</p>
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalJobs}</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">وظائف نشطة</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.activeJobs}</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">وظائف مميزة</p>
              <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
            </div>
            <p className="text-2xl font-bold">{stats.featuredJobs}</p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">المتقدمين</p>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalApplicants}</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة وظيفة مميزة
        </Button>
        <Button variant="outline">
          عرض جميع الوظائف
        </Button>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <Card key={job.id} className="bento-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    {job.isFeatured && (
                      <Badge variant="default" className="bg-yellow-600">
                        <Star className="w-3 h-3 ml-1" />
                        مميز
                      </Badge>
                    )}
                    <Badge variant="success">نشط</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{job.clinic}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.applicants} متقدم</span>
                    </div>
                  </div>
                </div>
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 ml-1" />
                  عرض المتقدمين
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 ml-1" />
                  تعديل
                </Button>
                {job.isFeatured && (
                  <Button variant="outline" size="sm">
                    إلغاء التمييز
                  </Button>
                )}
                {!job.isFeatured && (
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4 ml-1" />
                    تمييز
                  </Button>
                )}
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 ml-1" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
