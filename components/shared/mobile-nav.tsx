"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  Users,
  Home,
  Briefcase,
  ShoppingBag,
  FlaskConical,
  Store
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
}

interface MobileNavProps {
  userRole: "DENTIST" | "VENDOR" | "LAB" | "ADMIN"
  isOwner?: boolean
}

export function MobileNav({ userRole, isOwner = true }: MobileNavProps) {
  const pathname = usePathname()

  // تحديد الأقسام حسب نوع المستخدم
  const getNavItems = (): NavItem[] => {
    if (userRole === "DENTIST") {
      if (isOwner) {
        return [
          { href: "/dentist", label: "مركز الأطباء", icon: Home },
          { href: "/dentist/clinics", label: "إدارة العيادات", icon: Building2 },
          { href: "/community", label: "المجتمع", icon: Users },
          { href: "/jobs", label: "الوظائف", icon: Briefcase },
          { href: "/marketplace", label: "المتجر", icon: ShoppingBag },
        ]
      } else {
        // طاقم العيادة
        return [
          { href: "/dentist", label: "مركز الأطباء", icon: Home },
          { href: "/clinic", label: "العيادة", icon: Building2 },
          { href: "/community", label: "المجتمع", icon: Users },
          { href: "/jobs", label: "الوظائف", icon: Briefcase },
          { href: "/marketplace", label: "المتجر", icon: ShoppingBag },
        ]
      }
    } else if (userRole === "VENDOR") {
      return [
        { href: "/vendor", label: "مركز الموردين", icon: Store },
        { href: "/marketplace", label: "المتجر", icon: ShoppingBag },
        { href: "/jobs", label: "الوظائف", icon: Briefcase },
      ]
    } else if (userRole === "LAB") {
      return [
        { href: "/lab", label: "مركز المعامل", icon: FlaskConical },
        { href: "/marketplace", label: "المتجر", icon: ShoppingBag },
        { href: "/jobs", label: "الوظائف", icon: Briefcase },
      ]
    } else {
      // ADMIN
      return [
        { href: "/admin", label: "الإدارة", icon: Home },
        { href: "/community", label: "المجتمع", icon: Users },
        { href: "/marketplace", label: "المتجر", icon: ShoppingBag },
      ]
    }
  }

  const navItems = getNavItems()

  return (
    <nav className="mobile-nav">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
