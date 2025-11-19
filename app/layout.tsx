import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}
