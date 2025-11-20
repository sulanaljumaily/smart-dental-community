"use client"

import { LabNav } from "@/components/shared/lab-nav"
import { MobileNav } from "@/components/shared/mobile-nav"

export default function LabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: استبدال بـ API لجلب العدادات الحقيقية
  const newOrdersCount = 8
  const unreadMessagesCount = 3

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* شريط التنقل العلوي */}
      <LabNav
        newOrdersCount={newOrdersCount}
        unreadMessagesCount={unreadMessagesCount}
      />

      {/* محتوى الصفحة */}
      <main className="pb-20">
        {children}
      </main>

      {/* القائمة السفلية للجوال */}
      <MobileNav userRole="LAB" isOwner={false} />
    </div>
  )
}
