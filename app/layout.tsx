import type { Metadata } from "next";
import "./globals.css";
import { NotificationToast } from "@/components/shared/notification-toast";
import { CartSidebar } from "@/components/shared/cart-sidebar";
import { BookingDialog } from "@/components/shared/booking-dialog";

export const metadata: Metadata = {
  title: "Smart Dental Community | المجتمع الذكي لطب الأسنان",
  description: "منصة متكاملة لإدارة عيادات الأسنان والمجتمع الطبي في العراق",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="font-arabic">
        {children}
        <NotificationToast />
        <CartSidebar />
        <BookingDialog />
      </body>
    </html>
  );
}
