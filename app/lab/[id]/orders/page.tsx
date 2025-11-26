"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  DialogFooter,
} from "@/components/ui/dialog"
import {
  FlaskConical,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Package,
  Truck,
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
  createdAt: string
  description?: string
  specifications?: any
  clinic: {
    name: string
  }
}

export default function LabOrdersPage() {
  const params = useParams()
  const labId = params.id as string

  const [orders, setOrders] = useState<LabOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<LabOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<LabOrder | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [labId])

  useEffect(() => {
    filterOrders()
  }, [orders, statusFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/lab-orders?labId=${labId}`)
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

  const handleUpdateStatus = (order: LabOrder) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setShowUpdateDialog(true)
  }

  const handleAcceptOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/lab-orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ACCEPTED" }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("تم قبول الطلب بنجاح")
        fetchOrders()
      } else {
        setError(data.error || "حدث خطأ أثناء قبول الطلب")
      }
    } catch (err) {
      setError("حدث خطأ أثناء قبول الطلب")
    }
  }

  const handleRejectOrder = async (orderId: string) => {
    if (!confirm("هل أنت متأكد من رفض هذا الطلب؟")) {
      return
    }

    try {
      const response = await fetch(`/api/lab-orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "RETURNED" }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("تم رفض الطلب")
        fetchOrders()
      } else {
        setError(data.error || "حدث خطأ أثناء رفض الطلب")
      }
    } catch (err) {
      setError("حدث خطأ أثناء رفض الطلب")
    }
  }

  const handleSaveStatus = async () => {
    if (!selectedOrder) return

    try {
      const response = await fetch(`/api/lab-orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("تم تحديث حالة الطلب بنجاح")
        setShowUpdateDialog(false)
        fetchOrders()
      } else {
        setError(data.error || "حدث خطأ أثناء تحديث الحالة")
      }
    } catch (err) {
      setError("حدث خطأ أثناء تحديث الحالة")
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
      <div>
        <h1 className="text-3xl font-bold">طلبات المختبر</h1>
        <p className="text-muted-foreground mt-1">
          إدارة ومتابعة الطلبات الواردة من العيادات
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
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
                <p className="text-sm text-muted-foreground">طلبات جديدة</p>
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
                <p className="text-sm text-muted-foreground">قيد التحضير</p>
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
                <p className="text-sm text-muted-foreground">جاهزة</p>
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
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">في الطريق</p>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "IN_TRANSIT").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الطلبات</SelectItem>
              <SelectItem value="PENDING">طلبات جديدة</SelectItem>
              <SelectItem value="ACCEPTED">مقبولة</SelectItem>
              <SelectItem value="IN_PROGRESS">قيد التحضير</SelectItem>
              <SelectItem value="READY">جاهزة</SelectItem>
              <SelectItem value="IN_TRANSIT">في الطريق</SelectItem>
              <SelectItem value="DELIVERED">مكتملة</SelectItem>
            </SelectContent>
          </Select>
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
                  <TableHead>العيادة</TableHead>
                  <TableHead>المريض</TableHead>
                  <TableHead>نوع الطلب</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>تاريخ الاستلام</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <FlaskConical className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">لا توجد طلبات</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.clinic.name}
                      </TableCell>
                      <TableCell>{order.patientName}</TableCell>
                      <TableCell>{order.orderType}</TableCell>
                      <TableCell className="font-bold text-green-700">
                        {formatCurrency(order.amount)}
                      </TableCell>
                      <TableCell>{formatDate(order.dueDate)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
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
                          {order.status === "PENDING" && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-green-600"
                                onClick={() => handleAcceptOrder(order.id)}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600"
                                onClick={() => handleRejectOrder(order.id)}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {order.status !== "PENDING" &&
                            order.status !== "DELIVERED" && (
                              <Button
                                size="sm"
                                onClick={() => handleUpdateStatus(order)}
                              >
                                تحديث الحالة
                              </Button>
                            )}
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
                <DialogTitle>تفاصيل الطلب</DialogTitle>
                <DialogDescription>
                  معلومات كاملة عن الطلب #{selectedOrder.id.slice(0, 8)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">العيادة</p>
                    <p className="font-medium">{selectedOrder.clinic.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">المريض</p>
                    <p className="font-medium">{selectedOrder.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">نوع الطلب</p>
                    <p className="font-medium">{selectedOrder.orderType}</p>
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
                {selectedOrder.description && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">الوصف</p>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">
                      {selectedOrder.description}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تحديث حالة الطلب</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACCEPTED">مقبول</SelectItem>
                <SelectItem value="IN_PROGRESS">جاري التحضير</SelectItem>
                <SelectItem value="READY">جاهز</SelectItem>
                <SelectItem value="IN_TRANSIT">في الطريق</SelectItem>
                <SelectItem value="DELIVERED">تم التسليم</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveStatus}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
