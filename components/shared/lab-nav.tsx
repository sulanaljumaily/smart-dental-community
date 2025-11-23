"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  Package,
  DollarSign,
  MessageSquare,
  User,
  Menu,
  X,
} from "lucide-react"

interface LabNavProps {
  newOrdersCount?: number
  unreadMessagesCount?: number
}

const navItems = [
  {
    label: "نظرة عامة",
    href: "/lab",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "المندوبين",
    href: "/lab/representatives",
    icon: Users,
  },
  {
    label: "الطلبات",
    href: "/lab/orders",
    icon: Package,
    badge: "newOrdersCount",
  },
  {
    label: "المالية",
    href: "/lab/finance",
    icon: DollarSign,
  },
  {
    label: "الرسائل",
    href: "/lab/messages",
    icon: MessageSquare,
    badge: "unreadMessagesCount",
  },
  {
    label: "الملف الشخصي",
    href: "/lab/profile",
    icon: User,
  },
]

export function LabNav({
  newOrdersCount = 0,
  unreadMessagesCount = 0,
}: LabNavProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const badgeCounts = {
    newOrdersCount,
    unreadMessagesCount,
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href, item.exact)
              const badgeKey = item.badge as keyof typeof badgeCounts | undefined
              const badgeValue = badgeKey ? badgeCounts[badgeKey] : 0

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    className={cn(
                      "relative h-12 px-4 gap-2 transition-all",
                      active && "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-md"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{item.label}</span>
                    {badgeValue > 0 && (
                      <Badge
                        variant={active ? "secondary" : "destructive"}
                        className="h-5 min-w-5 px-1.5 text-xs"
                      >
                        {badgeValue > 99 ? "99+" : badgeValue}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b backdrop-blur-sm bg-white/95">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-bold text-lg">مركز معمل الأسنان</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="border-t bg-white">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href, item.exact)
                const badgeKey = item.badge as keyof typeof badgeCounts | undefined
                const badgeValue = badgeKey ? badgeCounts[badgeKey] : 0

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={active ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-11",
                        active && "bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="flex-1 text-right">{item.label}</span>
                      {badgeValue > 0 && (
                        <Badge
                          variant={active ? "secondary" : "destructive"}
                          className="h-5 min-w-5 px-1.5 text-xs"
                        >
                          {badgeValue > 99 ? "99+" : badgeValue}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
