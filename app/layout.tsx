import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ["arabic"],
  display: 'swap',
});

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
      <body className={tajawal.className}>
        {children}
      </body>
    </html>
  );
}
