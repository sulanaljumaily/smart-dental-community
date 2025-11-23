"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  FlaskConical,
} from "lucide-react"

export default function LabFinancePage() {
  // Financial Stats
  const stats = {
    totalRevenue: 128000000,
    monthlyRevenue: 32000000,
    pendingPayments: 8500000,
    availableBalance: 23500000,
    revenueGrowth: 15.3,
    ordersGrowth: 11.2,
  }

  // Recent Transactions
  const transactions = [
    {
      id: "TRX-001",
      type: "INCOME",
      description: "دفعة من عيادة الابتسامة الذكية - تيجان خزفية",
      amount: 2400000,
      status: "COMPLETED",
      date: "2024-01-20",
      orderId: "LAB-1234",
    },
    {
      id: "TRX-002",
      type: "INCOME",
      description: "دفعة من عيادة د. محمد أحمد - جسر",
      amount: 3600000,
      status: "COMPLETED",
      date: "2024-01-19",
      orderId: "LAB-1233",
    },
    {
      id: "TRX-003",
      type: "WITHDRAWAL",
      description: "سحب إلى حساب بنكي",
      amount: 10000000,
      status: "PENDING",
      date: "2024-01-18",
    },
    {
      id: "TRX-004",
      type: "INCOME",
      description: "دفعة من مركز الأسنان المتقدم - طقم أسنان",
      amount: 1800000,
      status: "COMPLETED",
      date: "2024-01-17",
      orderId: "LAB-1232",
    },
    {
      id: "TRX-005",
      type: "EXPENSE",
      description: "شراء مواد خزفية - شركة الطب الحديث",
      amount: 4500000,
      status: "COMPLETED",
      date: "2024-01-16",
    },
  ]

  // Monthly Revenue Data
  const monthlyData = [
    { month: "يناير", revenue: 32000000 },
    { month: "ديسمبر", revenue: 28000000 },
    { month: "نوفمبر", revenue: 26000000 },
    { month: "أكتوبر", revenue: 24000000 },
    { month: "سبتمبر", revenue: 22000000 },
    { month: "أغسطس", revenue: 20000000 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" dir="rtl">
      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(stats.totalRevenue)}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <p className="text-xs text-green-600">
                +{stats.revenueGrowth}% هذا الشهر
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">إيرادات الشهر</p>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xl font-bold">
              {formatCurrency(stats.monthlyRevenue)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              يناير 2024
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">مدفوعات معلقة</p>
              <CreditCard className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-xl font-bold text-orange-600">
              {formatCurrency(stats.pendingPayments)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              قيد المراجعة
            </p>
          </CardContent>
        </Card>

        <Card className="bento-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">الرصيد المتاح</p>
              <Wallet className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xl font-bold text-purple-600">
              {formatCurrency(stats.availableBalance)}
            </p>
            <Button size="sm" className="w-full mt-2" variant="outline">
              سحب
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      <Card className="bento-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>الإيرادات الشهرية</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 ml-2" />
              تصدير التقرير
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyData.map((item, index) => {
              const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))
              const percentage = (item.revenue / maxRevenue) * 100

              return (
                <div key={item.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.month}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle>المعاملات الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="bento-card hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "INCOME"
                          ? "bg-green-100"
                          : transaction.type === "EXPENSE"
                          ? "bg-red-100"
                          : "bg-orange-100"
                      }`}>
                        {transaction.type === "INCOME" ? (
                          <ArrowDownRight className="w-5 h-5 text-green-600" />
                        ) : transaction.type === "EXPENSE" ? (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm">{transaction.description}</h4>
                          <Badge variant={transaction.status === "COMPLETED" ? "success" : "warning"} className="text-xs">
                            {transaction.status === "COMPLETED" ? "مكتمل" : "معلق"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{transaction.id}</span>
                          {transaction.orderId && (
                            <>
                              <span>•</span>
                              <span>الطلب: {transaction.orderId}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className={`text-lg font-bold ${
                        transaction.type === "INCOME"
                          ? "text-green-600"
                          : transaction.type === "EXPENSE"
                          ? "text-red-600"
                          : "text-orange-600"
                      }`}>
                        {transaction.type === "INCOME" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Actions */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle>إجراءات مالية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Download className="w-6 h-6" />
              <span>تنزيل التقارير المالية</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <CreditCard className="w-6 h-6" />
              <span>إدارة طرق الدفع</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Wallet className="w-6 h-6" />
              <span>طلب سحب رصيد</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
