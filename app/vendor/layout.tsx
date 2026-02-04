"use client"

import { useState, useEffect } from "react"
import { SupplierNav } from "@/components/shared/supplier-nav"
import { MobileNav } from "@/components/shared/mobile-nav"

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [newOrdersCount, setNewOrdersCount] = useState(0)
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0)

  // جلب العدادات من API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/vendor/stats")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.stats) {
            setNewOrdersCount(data.stats.newOrdersCount || 0)
            setUnreadMessagesCount(data.stats.unreadMessagesCount || 0)
          }
        }
      } catch (error) {
        console.error("خطأ في جلب الإحصائيات:", error)
      }
    }

    fetchStats()
    // تحديث كل 30 ثانية
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* شريط التنقل العلوي */}
      <SupplierNav
        newOrdersCount={newOrdersCount}
        unreadMessagesCount={unreadMessagesCount}
      />

      {/* محتوى الصفحة */}
      <main className="pb-20">
        {children}
      </main>

      {/* القائمة السفلية للجوال */}
      <MobileNav userRole="VENDOR" isOwner={false} />
    </div>
  )
}
