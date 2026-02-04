"use client"

import { useState, useEffect } from "react"
import { DoctorHubNav } from "@/components/shared/doctor-hub-nav"
import { MobileNav } from "@/components/shared/mobile-nav"

export default function DentistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [notificationCount, setNotificationCount] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const [taskCount, setTaskCount] = useState(0)

  // جلب العدادات من API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dentist/stats")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.stats) {
            setNotificationCount(data.stats.notificationCount || 0)
            setMessageCount(data.stats.messageCount || 0)
            setTaskCount(data.stats.taskCount || 0)
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
      <DoctorHubNav
        notificationCount={notificationCount}
        messageCount={messageCount}
        taskCount={taskCount}
      />

      {/* محتوى الصفحة */}
      <main className="pb-20">
        {children}
      </main>

      {/* القائمة السفلية للجوال */}
      <MobileNav userRole="DENTIST" isOwner={true} />
    </div>
  )
}
