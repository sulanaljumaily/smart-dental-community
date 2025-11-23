"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Building2,
  Calendar,
  User,
  Trash2,
  Edit,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Minus,
  Flag,
} from "lucide-react"
import Link from "next/link"

type TaskStatus = "pending" | "in_progress" | "completed"
type TaskPriority = "low" | "medium" | "high" | "urgent"
type TaskType = "GENERAL" | "INVENTORY" | "APPOINTMENT" | "FOLLOW_UP" | "URGENT"

interface Task {
  id: string
  title: string
  description?: string
  type: TaskType
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  dueTime?: string
  clinic: {
    id: string
    name: string
  }
  assignedTo?: {
    id: string
    name: string
  }
  createdBy: {
    id: string
    name: string
  }
  createdAt: string
}

export default function TasksManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterClinic, setFilterClinic] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all")

  // بيانات تجريبية - سيتم استبدالها بـ API
  const tasks: Task[] = [
    {
      id: "1",
      title: "متابعة حالة المريض خالد محمد",
      description: "التأكد من تحسن الحالة بعد علاج الجذور",
      type: "FOLLOW_UP",
      status: "pending",
      priority: "high",
      dueDate: "اليوم",
      dueTime: "2:00 م",
      clinic: { id: "1", name: "عيادة النجوم" },
      assignedTo: { id: "1", name: "د. سلطان" },
      createdBy: { id: "1", name: "د. سلطان" },
      createdAt: "منذ ساعتين",
    },
    {
      id: "2",
      title: "مراجعة أشعة المريضة فاطمة علي",
      description: "فحص أشعة البانوراما للتخطيط لعلاج التقويم",
      type: "APPOINTMENT",
      status: "pending",
      priority: "high",
      dueDate: "اليوم",
      dueTime: "4:30 م",
      clinic: { id: "1", name: "عيادة النجوم" },
      assignedTo: { id: "2", name: "د. أحمد" },
      createdBy: { id: "1", name: "د. سلطان" },
      createdAt: "منذ 3 ساعات",
    },
    {
      id: "3",
      title: "طلب مواد من المتجر",
      description: "طلب قفازات طبية ومواد حشو",
      type: "INVENTORY",
      status: "in_progress",
      priority: "medium",
      dueDate: "غداً",
      clinic: { id: "2", name: "مركز الابتسامة" },
      assignedTo: { id: "3", name: "سارة" },
      createdBy: { id: "1", name: "د. سلطان" },
      createdAt: "منذ 5 ساعات",
    },
    {
      id: "4",
      title: "تنبيه: نقص في مخزون القفازات",
      description: "الكمية الحالية: 20 علبة - الحد الأدنى: 50 علبة",
      type: "URGENT",
      status: "pending",
      priority: "urgent",
      dueDate: "اليوم",
      clinic: { id: "1", name: "عيادة النجوم" },
      createdBy: { id: "system", name: "النظام" },
      createdAt: "منذ ساعة",
    },
    {
      id: "5",
      title: "تحضير تقرير المرضى الشهري",
      description: "إعداد تقرير شامل لعدد المرضى والعلاجات",
      type: "GENERAL",
      status: "pending",
      priority: "low",
      dueDate: "الأسبوع القادم",
      clinic: { id: "1", name: "عيادة النجوم" },
      assignedTo: { id: "4", name: "فاطمة" },
      createdBy: { id: "1", name: "د. سلطان" },
      createdAt: "منذ يوم",
    },
    {
      id: "6",
      title: "الاتصال بمعمل الدقة",
      description: "المتابعة بخصوص طلب التاج رقم #124",
      type: "FOLLOW_UP",
      status: "completed",
      priority: "medium",
      dueDate: "أمس",
      clinic: { id: "2", name: "مركز الابتسامة" },
      assignedTo: { id: "3", name: "ليلى" },
      createdBy: { id: "1", name: "د. سلطان" },
      createdAt: "منذ يومين",
    },
    {
      id: "7",
      title: "صيانة دورية لجهاز الأشعة",
      description: "موعد الصيانة الدورية الربع سنوية",
      type: "GENERAL",
      status: "pending",
      priority: "medium",
      dueDate: "بعد 3 أيام",
      clinic: { id: "1", name: "عيادة النجوم" },
      createdBy: { id: "1", name: "د. سلطان" },
      createdAt: "منذ أسبوع",
    },
    {
      id: "8",
      title: "موعد استشاري مع د. علي حسن",
      description: "مناقشة حالة مريض يحتاج إلى جراحة معقدة",
      type: "APPOINTMENT",
      status: "pending",
      priority: "high",
      dueDate: "غداً",
      dueTime: "10:00 ص",
      clinic: { id: "2", name: "مركز الابتسامة" },
      assignedTo: { id: "1", name: "د. سلطان" },
      createdBy: { id: "1", name: "د. سلطان" },
      createdAt: "منذ 4 ساعات",
    },
  ]

  const clinics = [
    { id: "1", name: "عيادة النجوم" },
    { id: "2", name: "مركز الابتسامة" },
    { id: "3", name: "عيادة الأمل" },
  ]

  // Helper functions
  const getStatusLabel = (status: TaskStatus) => {
    const labels: Record<TaskStatus, string> = {
      pending: "قيد الانتظار",
      in_progress: "جارٍ العمل",
      completed: "مكتملة",
    }
    return labels[status]
  }

  const getStatusIcon = (status: TaskStatus) => {
    const icons: Record<TaskStatus, any> = {
      pending: Circle,
      in_progress: Clock,
      completed: CheckCircle2,
    }
    return icons[status]
  }

  const getStatusColor = (status: TaskStatus) => {
    const colors: Record<TaskStatus, string> = {
      pending: "text-gray-500",
      in_progress: "text-blue-500",
      completed: "text-green-500",
    }
    return colors[status]
  }

  const getPriorityLabel = (priority: TaskPriority) => {
    const labels: Record<TaskPriority, string> = {
      low: "منخفضة",
      medium: "متوسطة",
      high: "عالية",
      urgent: "عاجلة",
    }
    return labels[priority]
  }

  const getPriorityIcon = (priority: TaskPriority) => {
    const icons: Record<TaskPriority, any> = {
      low: Minus,
      medium: ArrowUp,
      high: ArrowUp,
      urgent: AlertTriangle,
    }
    return icons[priority]
  }

  const getPriorityColor = (priority: TaskPriority) => {
    const colors: Record<TaskPriority, "default" | "secondary" | "destructive" | "warning"> = {
      low: "secondary",
      medium: "default",
      high: "warning",
      urgent: "destructive",
    }
    return colors[priority]
  }

  const getTypeLabel = (type: TaskType) => {
    const labels: Record<TaskType, string> = {
      GENERAL: "عام",
      INVENTORY: "مخزون",
      APPOINTMENT: "موعد",
      FOLLOW_UP: "متابعة",
      URGENT: "عاجل",
    }
    return labels[type]
  }

  const getTypeColor = (type: TaskType) => {
    const colors: Record<TaskType, string> = {
      GENERAL: "bg-gray-100 text-gray-700",
      INVENTORY: "bg-blue-100 text-blue-700",
      APPOINTMENT: "bg-purple-100 text-purple-700",
      FOLLOW_UP: "bg-green-100 text-green-700",
      URGENT: "bg-red-100 text-red-700",
    }
    return colors[type]
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    const matchesClinic = filterClinic === "all" || task.clinic.id === filterClinic
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    return matchesSearch && matchesClinic && matchesPriority && matchesStatus
  })

  // Statistics
  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((t) => t.status === "pending").length
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length
  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const urgentTasks = tasks.filter((t) => t.priority === "urgent").length
  const todayTasks = tasks.filter((t) => t.dueDate === "اليوم").length

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">المهام والتذكيرات</h1>
          <p className="text-muted-foreground">إدارة وتنظيم جميع المهام من عياداتك</p>
        </div>
        <Button size="lg">
          <Plus className="w-5 h-5 ml-2" />
          إضافة مهمة جديدة
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المهام</p>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">قيد الانتظار</p>
                <p className="text-2xl font-bold">{pendingTasks}</p>
              </div>
              <Circle className="w-8 h-8 text-gray-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">جارٍ العمل</p>
                <p className="text-2xl font-bold">{inProgressTasks}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">مكتملة</p>
                <p className="text-2xl font-bold">{completedTasks}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">عاجلة</p>
                <p className="text-2xl font-bold">{urgentTasks}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">مهام اليوم</p>
                <p className="text-2xl font-bold">{todayTasks}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن مهمة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Clinic Filter */}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterClinic}
                  onChange={(e) => setFilterClinic(e.target.value)}
                  className="px-3 py-1.5 border rounded-md text-sm"
                >
                  <option value="all">جميع العيادات</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-1.5 border rounded-md text-sm"
                >
                  <option value="all">جميع الأولويات</option>
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                  <option value="urgent">عاجلة</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  الكل
                </Button>
                <Button
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("pending")}
                >
                  قيد الانتظار
                </Button>
                <Button
                  variant={filterStatus === "in_progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("in_progress")}
                >
                  جارٍ العمل
                </Button>
                <Button
                  variant={filterStatus === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("completed")}
                >
                  مكتملة
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const StatusIcon = getStatusIcon(task.status)
          const PriorityIcon = getPriorityIcon(task.priority)

          return (
            <Card
              key={task.id}
              className={`bento-card hover:shadow-md transition-shadow ${
                task.status === "completed" ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                        task.status === "completed"
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      {task.status === "completed" && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    {/* Title and Badges */}
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="space-y-1 flex-1">
                        <h3
                          className={`font-semibold ${
                            task.status === "completed" ? "line-through" : ""
                          }`}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      {/* Status */}
                      <Badge variant="outline" className="gap-1">
                        <StatusIcon className={`w-3 h-3 ${getStatusColor(task.status)}`} />
                        {getStatusLabel(task.status)}
                      </Badge>

                      {/* Priority */}
                      <Badge variant={getPriorityColor(task.priority)} className="gap-1">
                        <PriorityIcon className="w-3 h-3" />
                        {getPriorityLabel(task.priority)}
                      </Badge>

                      {/* Type */}
                      <Badge className={getTypeColor(task.type)}>{getTypeLabel(task.type)}</Badge>

                      {/* Clinic */}
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {task.clinic.name}
                      </span>

                      {/* Due Date */}
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {task.dueDate}
                        {task.dueTime && ` - ${task.dueTime}`}
                      </span>

                      {/* Assigned To */}
                      {task.assignedTo && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <User className="w-3 h-3" />
                          {task.assignedTo.name}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                      <span>أُنشئت بواسطة: {task.createdBy.name}</span>
                      <span>{task.createdAt}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredTasks.length === 0 && (
          <Card className="bento-card">
            <CardContent className="p-12 text-center">
              <CheckSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">لا توجد مهام</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "لم يتم العثور على مهام تطابق بحثك"
                  : "ابدأ بإضافة مهمتك الأولى"}
              </p>
              {!searchQuery && (
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مهمة جديدة
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
