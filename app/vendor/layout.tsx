"use client"

import { SupplierNav } from "@/components/shared/supplier-nav"
import { MobileNav } from "@/components/shared/mobile-nav"

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: استبدال بـ API لجلب العدادات الحقيقية
  const newOrdersCount = 12
  const unreadMessagesCount = 5

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
