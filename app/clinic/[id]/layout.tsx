"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  Users,
  FlaskConical,
  Stethoscope,
  UserCog,
  Package,
  DollarSign,
  FileText,
  ArrowRight,
  Bell,
  MessageSquare
} from "lucide-react"

const sections = [
  { name: "النظرة العامة", href: "", icon: LayoutDashboard },
  { name: "الحجوزات", href: "/appointments", icon: Calendar },
  { name: "المرضى", href: "/patients", icon: Users },
  { name: "المختبر", href: "/lab", icon: FlaskConical },
  { name: "العلاجات", href: "/treatments", icon: Stethoscope },
  { name: "الطاقم", href: "/staff", icon: UserCog },
  { name: "الأصول المادية", href: "/assets", icon: Package },
  { name: "المالية", href: "/finance", icon: DollarSign },
  { name: "التقارير", href: "/reports", icon: FileText },
]

export default function ClinicLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const pathname = usePathname()

  // بيانات تجريبية للعيادة
  const clinic = {
    id: params.id,
    name: "عيادة النجوم لطب الأسنان",
    address: "بغداد - الكرادة",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dentist">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-bold">{clinic.name}</h1>
                <p className="text-sm text-muted-foreground">{clinic.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation */}
        <div className="border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-hide">
              {sections.map((section) => {
                const Icon = section.icon
                const isActive =
                  section.href === ""
                    ? pathname === `/clinic/${params.id}`
                    : pathname.startsWith(`/clinic/${params.id}${section.href}`)

                return (
                  <Link
                    key={section.name}
                    href={`/clinic/${params.id}${section.href}`}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {section.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
