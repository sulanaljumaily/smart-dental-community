"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  FlaskConical,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Package,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LabOrder {
  id: string
  patientName: string
  orderType: string
  amount: number
  status: string
  paymentStatus: string
  dueDate: string
  labIsInPlatform: boolean
  customLabName?: string
  createdAt: string
  lab?: {
    labName: string
    user: {
      name: string
      phone: string
    }
  }
}

export default function LabOrdersPage() {
  const params = useParams()
  const clinicId = params.id as string

  const [orders, setOrders] = useState<LabOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<LabOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<LabOrder | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [clinicId])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/lab-orders?clinicId=${clinicId}`)
      const data = await response.json()

      if (data.success) {
        setOrders(data.orders)
      } else {
        setError(data.error || "حدث خطأ أثناء جلب الطلبات")
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب الطلبات")
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    // البحث
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (order.lab?.labName || order.customLabName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    }

    // الفلترة حسب الحالة
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "warning"
      case "ACCEPTED":
        return "info"
      case "IN_PROGRESS":
        return "info"
      case "READY":
        return "success"
      case "IN_TRANSIT":
        return "info"
      case "DELIVERED":
        return "success"
      case "RETURNED":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "قيد الانتظار"
      case "ACCEPTED":
        return "مقبول"
      case "IN_PROGRESS":
        return "جاري التحضير"
      case "READY":
        return "جاهز"
      case "IN_TRANSIT":
        return "في الطريق"
      case "DELIVERED":
        return "تم التسليم"
      case "RETURNED":
        return "معاد"
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4" />
      case "ACCEPTED":
      case "IN_PROGRESS":
        return <FlaskConical className="w-4 h-4" />
      case "READY":
        return <Package className="w-4 h-4" />
      case "IN_TRANSIT":
        return <Truck className="w-4 h-4" />
      case "DELIVERED":
        return <CheckCircle2 className="w-4 h-4" />
      case "RETURNED":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-IQ", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-IQ")
  }

  const handleViewDetails = (order: LabOrder) => {
    setSelectedOrder(order)
    setShowDetailsDialog(true)
  }

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/lab-orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        fetchOrders()
      } else {
        setError(data.error || "حدث خطأ أثناء تحديث الحالة")
      }
    } catch (err) {
      setError("حدث خطأ أثناء تحديث الحالة")
    }
  }

  const handleDelete = async (orderId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      return
    }

    try {
      const response = await fetch(`/api/lab-orders/${orderId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        fetchOrders()
      } else {
        setError(data.error || "حدث خطأ أثناء حذف الطلب")
      }
    } catch (err) {
      setError("حدث خطأ أثناء حذف الطلب")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FlaskConical className="w-12 h-12 mx-auto mb-4 text-purple-600 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل الطلبات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة طلبات المختبر</h1>
          <p className="text-muted-foreground mt-1">
            إدارة ومتابعة طلبات المختبر للعيادة
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">قيد الانتظار</p>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "PENDING").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">جاري التحضير</p>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "IN_PROGRESS").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">جاهز</p>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "READY").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">مكتمل</p>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "DELIVERED").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث عن طلب، مريض، أو مختبر..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="PENDING">قيد الانتظار</SelectItem>
                <SelectItem value="ACCEPTED">مقبول</SelectItem>
                <SelectItem value="IN_PROGRESS">جاري التحضير</SelectItem>
                <SelectItem value="READY">جاهز</SelectItem>
                <SelectItem value="IN_TRANSIT">في الطريق</SelectItem>
                <SelectItem value="DELIVERED">تم التسليم</SelectItem>
                <SelectItem value="RETURNED">معاد</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>الطلبات ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المريض</TableHead>
                  <TableHead>نوع الطلب</TableHead>
                  <TableHead>المختبر</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>تاريخ الاستلام</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الدفع</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <FlaskConical className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">لا توجد طلبات</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.patientName}
                      </TableCell>
                      <TableCell>{order.orderType}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {order.lab?.labName || order.customLabName}
                          </span>
                          {order.labIsInPlatform && (
                            <Badge variant="success" className="w-fit text-xs mt-1">
                              في المنصة
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-green-700">
                        {formatCurrency(order.amount)}
                      </TableCell>
                      <TableCell>{formatDate(order.dueDate)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {getStatusText(order.status)}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.paymentStatus === "PAID" ? "success" : "warning"
                          }
                        >
                          {order.paymentStatus === "PAID" ? "مدفوع" : "غير مدفوع"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewDetails(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(order.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>تفاصيل طلب المختبر</DialogTitle>
                <DialogDescription>
                  معلومات كاملة عن الطلب #{selectedOrder.id.slice(0, 8)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">المريض</p>
                    <p className="font-medium">{selectedOrder.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">نوع الطلب</p>
                    <p className="font-medium">{selectedOrder.orderType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">المختبر</p>
                    <p className="font-medium">
                      {selectedOrder.lab?.labName || selectedOrder.customLabName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">المبلغ</p>
                    <p className="font-bold text-green-700">
                      {formatCurrency(selectedOrder.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">تاريخ الاستلام</p>
                    <p className="font-medium">{formatDate(selectedOrder.dueDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">الحالة</p>
                    <Badge variant={getStatusColor(selectedOrder.status)}>
                      {getStatusText(selectedOrder.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
