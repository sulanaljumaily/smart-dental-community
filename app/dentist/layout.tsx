"use client"

import { DoctorHubNav } from "@/components/shared/doctor-hub-nav"
import { MobileNav } from "@/components/shared/mobile-nav"

export default function DentistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: استبدال بـ API لجلب العدادات الحقيقية
  const notificationCount = 5
  const messageCount = 3
  const taskCount = 8

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
