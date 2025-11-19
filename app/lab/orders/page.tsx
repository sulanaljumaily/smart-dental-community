"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FlaskConical,
  Clock,
  CheckCircle,
  Truck,
  Search,
  Eye,
  Play,
  Upload,
  MessageSquare,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Package,
  Image as ImageIcon,
} from "lucide-react"
import Link from "next/link"

const ORDER_TYPES = [
  { value: "CROWN", label: "تاج", icon: "👑" },
  { value: "BRIDGE", label: "جسر", icon: "🌉" },
  { value: "DENTURE", label: "طقم أسنان", icon: "🦷" },
  { value: "IMPLANT_CROWN", label: "تاج زراعة", icon: "🦴" },
  { value: "VENEER", label: "عدسة", icon: "💎" },
  { value: "ORTHODONTIC", label: "تقويم", icon: "🔗" },
  { value: "OTHER", label: "أخرى", icon: "📦" },
]

export default function LabOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [showAssignDialog, setShowAssignDialog] = useState(false)

  const orders = [
    {
      id: "LAB-1234",
      clinicName: "عيادة الابتسامة الذكية",
      doctorName: "د. محمد أحمد",
      clinicCity: "بغداد",
      clinicAddress: "حي المنصور، شارع الأميرات",
      clinicPhone: "07701234567",
      orderType: "CROWN",
      orderTypeName: "تاج خزفي",
      quantity: 2,
      teethNumbers: [11, 21],
      details: {
        color: "A2",
        material: "زركونيا",
        shade: "Natural",
      },
      price: 2400000,
      status: "PENDING",
      paymentStatus: "PENDING",
      orderedAt: "2024-01-20 10:30",
      deadline: "2024-01-25",
      priority: "HIGH",
      notes: "لون دقيق حسب العينة المرفقة",
      attachments: ["impression-photo.jpg", "shade-guide.jpg"],
    },
    {
      id: "LAB-1233",
      clinicName: "عيادة د. محمد أحمد",
      doctorName: "د. محمد أحمد",
      clinicCity: "البصرة",
      clinicAddress: "منطقة العشار، شارع الكورنيش",
      clinicPhone: "07809876543",
      orderType: "BRIDGE",
      orderTypeName: "جسر",
      quantity: 1,
      teethNumbers: [14, 15, 16],
      details: {
        color: "A3",
        material: "بورسلين على معدن",
        pontic: "15",
      },
      price: 3600000,
      status: "IN_PROGRESS",
      paymentStatus: "PAID",
      orderedAt: "2024-01-19 14:15",
      startedAt: "2024-01-19 16:00",
      deadline: "2024-01-24",
      priority: "MEDIUM",
      progress: 45,
      assignedTechnician: "أحمد محمود",
      workPhases: [
        { name: "تحضير النموذج", completed: true },
        { name: "صب المعدن", completed: true },
        { name: "وضع البورسلين", completed: false },
        { name: "التلميع النهائي", completed: false },
      ],
      notes: "",
    },
    {
      id: "LAB-1232",
      clinicName: "مركز الأسنان المتقدم",
      doctorName: "د. سارة علي",
      clinicCity: "أربيل",
      clinicAddress: "حي إيمبريال، بناية طب الأسنان",
      clinicPhone: "07501234567",
      orderType: "DENTURE",
      orderTypeName: "طقم أسنان كامل",
      quantity: 1,
      details: {
        type: "كامل علوي",
        material: "أكريلك عالي الجودة",
        gumShade: "وردي فاتح",
      },
      price: 1800000,
      status: "READY",
      paymentStatus: "PAID",
      orderedAt: "2024-01-18 09:00",
      startedAt: "2024-01-18 11:00",
      completedAt: "2024-01-20 11:00",
      deadline: "2024-01-23",
      priority: "LOW",
      assignedTechnician: "سارة علي",
      qualityCheck: true,
      photos: ["front-view.jpg", "side-view.jpg", "occlusion.jpg"],
      notes: "",
    },
    {
      id: "LAB-1231",
      clinicName: "عيادة النور",
      doctorName: "د. عمر حسن",
      clinicCity: "النجف",
      clinicAddress: "شارع الكوفة، مجمع الأطباء",
      clinicPhone: "07601234567",
      orderType: "CROWN",
      orderTypeName: "تاج خزفي",
      quantity: 1,
      teethNumbers: [36],
      details: {
        color: "A1",
        material: "زركونيا متعدد الطبقات",
      },
      price: 1200000,
      status: "IN_TRANSIT",
      paymentStatus: "PAID",
      orderedAt: "2024-01-17 11:00",
      startedAt: "2024-01-17 14:00",
      completedAt: "2024-01-19 15:00",
      shippedAt: "2024-01-20 08:00",
      deadline: "2024-01-22",
      priority: "MEDIUM",
      deliveryPerson: "عمر حسن",
      deliveryPhone: "07701112233",
      estimatedDelivery: "2024-01-20 16:00",
      trackingStatus: "في الطريق إلى العيادة",
    },
  ]

  const technicians = [
    { id: "1", name: "أحمد محمود", specialty: "تيجان وجسور" },
    { id: "2", name: "سارة علي", specialty: "أطقم أسنان" },
    { id: "3", name: "علي حسن", specialty: "تقويم" },
  ]

  const deliveryStaff = [
    { id: "1", name: "عمر حسن", phone: "07701112233", status: "AVAILABLE" },
    { id: "2", name: "علي محمد", phone: "07709998877", status: "ACTIVE" },
    { id: "3", name: "حسين أحمد", phone: "07801234567", status: "AVAILABLE" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "warning"
      case "IN_PROGRESS": return "info"
      case "READY": return "success"
      case "IN_TRANSIT": return "default"
      case "DELIVERED": return "success"
      default: return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING": return "قيد الانتظار"
      case "IN_PROGRESS": return "جاري العمل"
      case "READY": return "جاهز"
      case "IN_TRANSIT": return "في الطريق"
      case "DELIVERED": return "تم التسليم"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-4 h-4" />
      case "IN_PROGRESS": return <FlaskConical className="w-4 h-4" />
      case "READY": return <CheckCircle className="w-4 h-4" />
      case "IN_TRANSIT": return <Truck className="w-4 h-4" />
      case "DELIVERED": return <CheckCircle className="w-4 h-4" />
      default: return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH": return "destructive"
      case "MEDIUM": return "warning"
      case "LOW": return "secondary"
      default: return "secondary"
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.clinicName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const ordersByStatus = {
    pending: orders.filter(o => o.status === "PENDING").length,
    inProgress: orders.filter(o => o.status === "IN_PROGRESS").length,
    ready: orders.filter(o => o.status === "READY").length,
    inTransit: orders.filter(o => o.status === "IN_TRANSIT").length,
    delivered: orders.filter(o => o.status === "DELIVERED").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20" dir="rtl">
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">إدارة الطلبات</h1>
            <Button variant="outline" asChild>
              <Link href="/lab">
                عودة للمركز
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-600">{ordersByStatus.pending}</p>
              <p className="text-xs text-muted-foreground">قيد الانتظار</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <FlaskConical className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">{ordersByStatus.inProgress}</p>
              <p className="text-xs text-muted-foreground">جاري العمل</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{ordersByStatus.ready}</p>
              <p className="text-xs text-muted-foreground">جاهز</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <Truck className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-600">{ordersByStatus.inTransit}</p>
              <p className="text-xs text-muted-foreground">في الطريق</p>
            </CardContent>
          </Card>
          <Card className="bento-card">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600 fill-green-600" />
              <p className="text-2xl font-bold text-green-600">{ordersByStatus.delivered}</p>
              <p className="text-xs text-muted-foreground">تم التسليم</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="ابحث برقم الطلب أو اسم العيادة..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3"
              >
                <option value="all">جميع الحالات</option>
                <option value="PENDING">قيد الانتظار</option>
                <option value="IN_PROGRESS">جاري العمل</option>
                <option value="READY">جاهز</option>
                <option value="IN_TRANSIT">في الطريق</option>
                <option value="DELIVERED">تم التسليم</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const orderTypeInfo = ORDER_TYPES.find(t => t.value === order.orderType)

            return (
              <Card key={order.id} className="bento-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{orderTypeInfo?.icon}</span>
                        <div>
                          <h3 className="font-bold text-lg">{order.clinicName}</h3>
                          <p className="text-sm text-muted-foreground">{order.doctorName}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="w-3 h-3 ml-1" />
                          {order.clinicCity}
                        </Badge>
                        {order.priority && (
                          <Badge variant={getPriorityColor(order.priority)} className="text-xs">
                            {order.priority === "HIGH" ? "عاجل" : order.priority === "MEDIUM" ? "متوسط" : "عادي"}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        رقم الطلب: <span className="font-medium">{order.id}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 inline ml-1" />
                        طُلب في: {order.orderedAt} • موعد التسليم: {order.deadline}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(order.status)} className="text-sm">
                      {getStatusIcon(order.status)}
                      <span className="mr-1">{getStatusText(order.status)}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Type & Details */}
                  <div className="p-3 rounded-lg bg-accent/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{order.orderTypeName}</h4>
                      <Badge variant="outline">الكمية: {order.quantity}</Badge>
                    </div>
                    {order.teethNumbers && (
                      <p className="text-sm text-muted-foreground mb-2">
                        الأسنان: <span className="font-medium">{order.teethNumbers.join(", ")}</span>
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(order.details).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            {key === "color" ? "اللون" :
                             key === "material" ? "المادة" :
                             key === "shade" ? "الدرجة" :
                             key === "type" ? "النوع" :
                             key === "pontic" ? "الجسر" :
                             key === "gumShade" ? "لون اللثة" : key}:
                          </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress (for IN_PROGRESS) */}
                  {order.status === "IN_PROGRESS" && order.workPhases && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">مراحل العمل</p>
                        <p className="text-sm text-muted-foreground">{order.progress}%</p>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                      <div className="space-y-1">
                        {order.workPhases.map((phase, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className={`w-4 h-4 ${phase.completed ? 'text-green-600' : 'text-gray-300'}`} />
                            <span className={phase.completed ? 'text-green-700' : 'text-muted-foreground'}>
                              {phase.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      {order.assignedTechnician && (
                        <p className="text-xs text-muted-foreground mt-2">
                          <Users className="w-3 h-3 inline ml-1" />
                          الفني: {order.assignedTechnician}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Photos (for READY) */}
                  {order.status === "READY" && order.photos && (
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-4 h-4 text-green-700" />
                        <p className="text-sm font-semibold text-green-700">
                          صور العمل النهائي ({order.photos.length})
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {order.photos.map((photo, index) => (
                          <div key={index} className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-green-600" />
                          </div>
                        ))}
                      </div>
                      {order.qualityCheck && (
                        <Badge variant="success" className="mt-2">
                          <CheckCircle className="w-3 h-3 ml-1" />
                          فحص الجودة مكتمل
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Delivery Info (for IN_TRANSIT) */}
                  {order.status === "IN_TRANSIT" && (
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-blue-700">{order.deliveryPerson}</p>
                          <p className="text-sm text-muted-foreground">{order.deliveryPhone}</p>
                        </div>
                        <Badge variant="info">
                          <Truck className="w-3 h-3 ml-1" />
                          في الطريق
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-700">{order.trackingStatus}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        الوصول المتوقع: {order.estimatedDelivery}
                      </p>
                    </div>
                  )}

                  {/* Attachments */}
                  {order.attachments && order.attachments.length > 0 && (
                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                      <p className="text-sm font-semibold text-purple-700 mb-2">
                        المرفقات ({order.attachments.length})
                      </p>
                      <div className="space-y-1">
                        {order.attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-purple-700">
                            <ImageIcon className="w-4 h-4" />
                            <span>{file}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {order.notes && (
                    <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <p className="text-xs text-muted-foreground mb-1">ملاحظات من العيادة</p>
                      <p className="text-sm text-yellow-800">{order.notes}</p>
                    </div>
                  )}

                  {/* Price & Payment */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">المبلغ</p>
                      <p className="text-lg font-bold text-green-700">
                        {formatCurrency(order.price)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">حالة الدفع</p>
                      <Badge variant={order.paymentStatus === "PAID" ? "success" : "warning"}>
                        {order.paymentStatus === "PAID" ? "مدفوع" : "معلق"}
                      </Badge>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm">
                    <p className="font-medium mb-1">{order.clinicAddress}</p>
                    <p className="text-muted-foreground">هاتف: {order.clinicPhone}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 ml-1" />
                      مراسلة
                    </Button>
                    {order.status === "PENDING" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="flex-1">
                              <Play className="w-4 h-4 ml-1" />
                              بدء العمل
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>بدء العمل على الطلب</DialogTitle>
                              <DialogDescription>
                                تعيين فني وبدء العمل
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>تعيين فني</Label>
                                <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                                  {technicians.map(tech => (
                                    <option key={tech.id} value={tech.id}>
                                      {tech.name} - {tech.specialty}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <Button className="w-full">تأكيد البدء</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                    {order.status === "IN_PROGRESS" && (
                      <Button size="sm" className="flex-1">
                        <Upload className="w-4 h-4 ml-1" />
                        تحديث التقدم
                      </Button>
                    )}
                    {order.status === "READY" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1">
                            <Truck className="w-4 h-4 ml-1" />
                            إرسال للتوصيل
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>تعيين موصل</DialogTitle>
                            <DialogDescription>
                              اختر موصل لتوصيل الطلب للعيادة
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>اختر الموصل</Label>
                              <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                                {deliveryStaff.filter(s => s.status === "AVAILABLE").map(staff => (
                                  <option key={staff.id} value={staff.id}>
                                    {staff.name} - {staff.phone}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label>وقت الوصول المتوقع</Label>
                              <Input type="datetime-local" />
                            </div>
                            <Button className="w-full">تأكيد الإرسال</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
