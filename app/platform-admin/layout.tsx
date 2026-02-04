"use client"

import { useState, useEffect } from "react"
import { PlatformAdminNav } from "@/components/shared/platform-admin-nav"

export default function PlatformAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [pendingSubscriptionsCount, setPendingSubscriptionsCount] = useState(0)
  const [pendingVendorsCount, setPendingVendorsCount] = useState(0)
  const [supportTicketsCount, setSupportTicketsCount] = useState(0)

  // جلب العدادات من API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/platform-admin/stats")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.stats) {
            setPendingSubscriptionsCount(data.stats.pendingSubscriptionsCount || 0)
            setPendingVendorsCount(data.stats.pendingVendorsCount || 0)
            setSupportTicketsCount(data.stats.supportTicketsCount || 0)
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50" dir="rtl">
      {/* شريط التنقل العلوي */}
      <PlatformAdminNav
        pendingSubscriptionsCount={pendingSubscriptionsCount}
        pendingVendorsCount={pendingVendorsCount}
        supportTicketsCount={supportTicketsCount}
      />

      {/* محتوى الصفحة */}
      <main className="pb-8">
        {children}
      </main>
    </div>
  )
}
