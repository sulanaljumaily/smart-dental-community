"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Stethoscope,
  ShoppingCart,
  Wrench,
  Zap,
  Calendar,
  FileText,
} from "lucide-react"

const EXPENSE_CATEGORIES = [
  { value: "SALARIES", label: "رواتب", icon: Users, color: "from-blue-500 to-blue-700" },
  { value: "LAB", label: "مختبر", icon: Stethoscope, color: "from-purple-500 to-purple-700" },
  { value: "INVENTORY", label: "مشتريات", icon: ShoppingCart, color: "from-green-500 to-green-700" },
  { value: "MAINTENANCE", label: "صيانة", icon: Wrench, color: "from-orange-500 to-orange-700" },
  { value: "UTILITIES", label: "خدمات", icon: Zap, color: "from-yellow-500 to-yellow-700" },
  { value: "OTHER", label: "أخرى", icon: FileText, color: "from-gray-500 to-gray-700" },
]

export default function FinancePage() {
  const [showExpenseDialog, setShowExpenseDialog] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("2024-01")

  // Financial Data
  const monthlyData = [
    { month: "2023-12", revenue: 42000000, expenses: 28000000 },
    { month: "2024-01", revenue: 48500000, expenses: 31500000 },
    { month: "2024-02", revenue: 52000000, expenses: 29000000 },
  ]

  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]
  const profit = currentMonth.revenue - currentMonth.expenses
  const profitMargin = (profit / currentMonth.revenue) * 100

  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100
  const expenseGrowth = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100

  // Revenue Breakdown
  const revenueItems = [
    {
      id: "1",
      date: "2024-01-20",
      patientName: "أحمد محمود",
      treatment: "زراعة سن",
      amount: 2500000,
      paid: 1500000,
      remaining: 1000000,
      status: "PARTIAL",
      paymentMethod: "ZainCash",
    },
    {
      id: "2",
      date: "2024-01-19",
      patientName: "فاطمة علي",
      treatment: "تقويم أسنان - جلسة شد",
      amount: 150000,
      paid: 150000,
      remaining: 0,
      status: "PAID",
      paymentMethod: "نقدي",
    },
    {
      id: "3",
      date: "2024-01-18",
      patientName: "محمد حسن",
      treatment: "علاج عصب",
      amount: 750000,
      paid: 750000,
      remaining: 0,
      status: "PAID",
      paymentMethod: "ZainCash",
    },
    {
      id: "4",
      date: "2024-01-17",
      patientName: "سارة أحمد",
      treatment: "تاج خزفي",
      amount: 1200000,
      paid: 600000,
      remaining: 600000,
      status: "PARTIAL",
      paymentMethod: "نقدي",
    },
  ]

  // Expenses Breakdown
  const expenses = [
    {
      id: "1",
      date: "2024-01-25",
      category: "SALARIES",
      description: "رواتب الطاقم - يناير 2024",
      amount: 7400000,
      paymentMethod: "تحويل بنكي",
      status: "PAID",
    },
    {
      id: "2",
      date: "2024-01-22",
      category: "LAB",
      description: "طلب تيجان - مختبر الابتسامة",
      amount: 2400000,
      paymentMethod: "ZainCash",
      status: "PAID",
    },
    {
      id: "3",
      date: "2024-01-20",
      category: "INVENTORY",
      description: "قفازات وكمامات - شركة الطب الحديث",
      amount: 890000,
      paymentMethod: "نقدي",
      status: "PAID",
    },
    {
      id: "4",
      date: "2024-01-15",
      category: "UTILITIES",
      description: "فاتورة كهرباء - ديسمبر 2023",
      amount: 450000,
      paymentMethod: "نقدي",
      status: "PAID",
    },
    {
      id: "5",
      date: "2024-01-10",
      category: "MAINTENANCE",
      description: "صيانة جهاز التعقيم",
      amount: 350000,
      paymentMethod: "نقدي",
      status: "PAID",
    },
    {
      id: "6",
      date: "2024-01-30",
      category: "INVENTORY",
      description: "حشوات مركبة - مؤسسة الابتسامة",
      amount: 1800000,
      paymentMethod: "آجل",
      status: "PENDING",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + " د.ع"
  }

  const getCategoryInfo = (category: string) => {
    return EXPENSE_CATEGORIES.find(c => c.value === category) || EXPENSE_CATEGORIES[0]
  }

  const totalRevenue = revenueItems.reduce((sum, item) => sum + item.paid, 0)
  const totalPending = revenueItems.reduce((sum, item) => sum + item.remaining, 0)
  const totalExpenses = expenses.filter(e => e.status === "PAID").reduce((sum, item) => sum + item.amount, 0)
  const pendingExpenses = expenses.filter(e => e.status === "PENDING").reduce((sum, item) => sum + item.amount, 0)

  // Expenses by category
  const expensesByCategory = EXPENSE_CATEGORIES.map(cat => ({
    ...cat,
    total: expenses.filter(e => e.category === cat.value && e.status === "PAID").reduce((sum, e) => sum + e.amount, 0)
  })).filter(cat => cat.total > 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">الإدارة المالية</h2>
        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3"
          >
            <option value="2024-01">يناير 2024</option>
            <option value="2023-12">ديسمبر 2023</option>
            <option value="2023-11">نوفمبر 2023</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <DollarSign className="w-4 h-4 ml-2" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="revenue">
            <TrendingUp className="w-4 h-4 ml-2" />
            الإيرادات
          </TabsTrigger>
          <TabsTrigger value="expenses">
            <TrendingDown className="w-4 h-4 ml-2" />
            المصروفات
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bento-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">الإيرادات</p>
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(currentMonth.revenue)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">
                    {revenueGrowth.toFixed(1)}% عن الشهر السابق
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bento-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">المصروفات</p>
                  <ArrowDownRight className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(currentMonth.expenses)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-red-600" />
                  <span className="text-xs text-red-600">
                    {expenseGrowth.toFixed(1)}% عن الشهر السابق
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bento-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">صافي الربح</p>
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(profit)}
                </p>
                <div className="mt-2">
                  <span className="text-xs text-muted-foreground">
                    هامش الربح: {profitMargin.toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bento-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">مستحقات</p>
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(totalPending)}
                </p>
                <div className="mt-2">
                  <span className="text-xs text-muted-foreground">
                    من {revenueItems.filter(r => r.remaining > 0).length} مريض
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>الاتجاه الشهري</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((month, index) => {
                  const monthProfit = month.revenue - month.expenses
                  const monthProfitMargin = (monthProfit / month.revenue) * 100

                  return (
                    <div key={month.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{month.month}</span>
                        <span className={`font-bold ${monthProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(monthProfit)}
                        </span>
                      </div>
                      <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="absolute h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end px-2"
                          style={{ width: `${(month.revenue / Math.max(...monthlyData.map(m => m.revenue))) * 100}%` }}
                        >
                          <span className="text-xs text-white font-medium">
                            {formatCurrency(month.revenue)}
                          </span>
                        </div>
                      </div>
                      <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="absolute h-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-end px-2"
                          style={{ width: `${(month.expenses / Math.max(...monthlyData.map(m => m.revenue))) * 100}%` }}
                        >
                          <span className="text-xs text-white font-medium">
                            {formatCurrency(month.expenses)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Expenses by Category */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle>المصروفات حسب الفئة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expensesByCategory.map((category) => {
                  const CategoryIcon = category.icon
                  const percentage = (category.total / totalExpenses) * 100

                  return (
                    <div key={category.value} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                            <CategoryIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{category.label}</span>
                        </div>
                        <div className="text-left">
                          <p className="font-bold">{formatCurrency(category.total)}</p>
                          <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`absolute h-full bg-gradient-to-r ${category.color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">تفاصيل الإيرادات</h3>
            <div className="flex items-center gap-4">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">إجمالي المحصل</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">مستحقات</p>
                <p className="text-xl font-bold text-orange-600">{formatCurrency(totalPending)}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {revenueItems.map((item) => (
              <Card key={item.id} className="bento-card hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg">{item.patientName}</h4>
                      <p className="text-sm text-muted-foreground">{item.treatment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                    </div>
                    <Badge variant={item.status === "PAID" ? "success" : "warning"}>
                      {item.status === "PAID" ? "مدفوع بالكامل" : "دفع جزئي"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">المبلغ الكلي</p>
                      <p className="text-sm font-bold text-blue-700">{formatCurrency(item.amount)}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">المدفوع</p>
                      <p className="text-sm font-bold text-green-700">{formatCurrency(item.paid)}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-orange-50 border border-orange-200 text-center">
                      <p className="text-xs text-muted-foreground mb-1">المتبقي</p>
                      <p className="text-sm font-bold text-orange-700">{formatCurrency(item.remaining)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">طريقة الدفع:</span>
                      <Badge variant="outline">{item.paymentMethod}</Badge>
                    </div>
                    {item.remaining > 0 && (
                      <Button size="sm" variant="outline">
                        تسجيل دفعة
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">تفاصيل المصروفات</h3>
            <div className="flex items-center gap-2">
              <div className="text-left ml-4">
                <p className="text-sm text-muted-foreground">إجمالي المدفوع</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
              </div>
              <Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مصروف
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إضافة مصروف جديد</DialogTitle>
                    <DialogDescription>
                      سجل مصروف جديد للعيادة
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>الفئة</Label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                        {EXPENSE_CATEGORIES.map(cat => {
                          const Icon = cat.icon
                          return (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>الوصف</Label>
                      <Input placeholder="وصف المصروف..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>المبلغ</Label>
                        <Input type="number" placeholder="100000" />
                      </div>
                      <div className="space-y-2">
                        <Label>التاريخ</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>طريقة الدفع</Label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                        <option value="CASH">نقدي</option>
                        <option value="ZAINCASH">ZainCash</option>
                        <option value="BANK">تحويل بنكي</option>
                        <option value="DEFERRED">آجل</option>
                      </select>
                    </div>
                    <Button className="w-full">حفظ المصروف</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-4">
            {expenses.map((expense) => {
              const categoryInfo = getCategoryInfo(expense.category)
              const CategoryIcon = categoryInfo.icon

              return (
                <Card key={expense.id} className="bento-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryInfo.color} flex items-center justify-center flex-shrink-0`}>
                        <CategoryIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold">{expense.description}</h4>
                              <Badge variant="outline" className="text-xs">
                                {categoryInfo.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{expense.date}</p>
                          </div>
                          <Badge variant={expense.status === "PAID" ? "success" : "warning"}>
                            {expense.status === "PAID" ? "مدفوع" : "قيد الانتظار"}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <p className="text-2xl font-bold text-red-600">
                              {formatCurrency(expense.amount)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {expense.paymentMethod}
                            </p>
                          </div>
                          {expense.status === "PENDING" && (
                            <Button size="sm" variant="outline">
                              تسجيل الدفع
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
