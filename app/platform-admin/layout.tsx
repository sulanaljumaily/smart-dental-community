"use client"

import { PlatformAdminNav } from "@/components/shared/platform-admin-nav"

export default function PlatformAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: استبدال بـ API لجلب العدادات الحقيقية
  const pendingSubscriptionsCount = 8
  const pendingVendorsCount = 5
  const supportTicketsCount = 12

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
