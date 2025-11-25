import { LucideIcon, Users, Stethoscope, ShoppingCart, Wrench, Zap, Home, FlaskConical, HardDrive, Cpu } from "lucide-react"

export interface ExpenseCategory {
  value: string
  label: string
  icon: LucideIcon
  color: string
  description?: string
}

// أنواع المصروفات
export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    value: "RENT",
    label: "إيجار",
    icon: Home,
    color: "from-indigo-500 to-indigo-700",
    description: "إيجار العيادة أو المكان"
  },
  {
    value: "SALARIES",
    label: "رواتب",
    icon: Users,
    color: "from-blue-500 to-blue-700",
    description: "رواتب الموظفين والأطباء"
  },
  {
    value: "ELECTRICITY",
    label: "كهرباء",
    icon: Zap,
    color: "from-yellow-500 to-yellow-700",
    description: "فواتير الكهرباء"
  },
  {
    value: "INVENTORY_MATERIALS",
    label: "مخزون (أصول مادية)",
    icon: ShoppingCart,
    color: "from-green-500 to-green-700",
    description: "مواد طبية ومستلزمات"
  },
  {
    value: "INVENTORY_DEVICES",
    label: "أجهزة (أصول مادية)",
    icon: Cpu,
    color: "from-purple-500 to-purple-700",
    description: "أجهزة ومعدات طبية"
  },
  {
    value: "LAB_ORDER",
    label: "طلب مختبر",
    icon: FlaskConical,
    color: "from-pink-500 to-pink-700",
    description: "طلبات من المختبرات"
  },
  {
    value: "MAINTENANCE",
    label: "صيانة",
    icon: Wrench,
    color: "from-orange-500 to-orange-700",
    description: "صيانة الأجهزة والمعدات"
  },
  {
    value: "UTILITIES",
    label: "خدمات عامة",
    icon: HardDrive,
    color: "from-cyan-500 to-cyan-700",
    description: "ماء، إنترنت، هاتف، إلخ"
  },
  {
    value: "MEDICAL_SUPPLIES",
    label: "مستلزمات طبية",
    icon: Stethoscope,
    color: "from-red-500 to-red-700",
    description: "قفازات، كمامات، معقمات، إلخ"
  },
]

// دالة للحصول على فئة المصروف
export function getExpenseCategory(value: string): ExpenseCategory | undefined {
  return EXPENSE_CATEGORIES.find(c => c.value === value)
}

// دالة للحصول على جميع فئات المصروفات
export function getAllExpenseCategories(): ExpenseCategory[] {
  return EXPENSE_CATEGORIES
}
