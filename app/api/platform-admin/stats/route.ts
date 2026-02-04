import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    // جلب عدد الاشتراكات المعلقة
    const pendingSubscriptionsCount = await prisma.subscription.count({
      where: {
        status: "PENDING",
      },
    }).catch(() => 0)

    // جلب عدد الموردين المعلقين (في انتظار الموافقة)
    const pendingVendorsCount = await prisma.user.count({
      where: {
        role: "VENDOR",
        isApproved: false,
      },
    }).catch(() => 0)

    // جلب عدد تذاكر الدعم المفتوحة
    const supportTicketsCount = await prisma.supportTicket.count({
      where: {
        status: {
          in: ["OPEN", "IN_PROGRESS"],
        },
      },
    }).catch(() => 0)

    return NextResponse.json({
      success: true,
      stats: {
        pendingSubscriptionsCount,
        pendingVendorsCount,
        supportTicketsCount,
      },
    })
  } catch (error) {
    console.error("خطأ في جلب إحصائيات الإدارة:", error)
    // إرجاع قيم افتراضية في حالة الخطأ
    return NextResponse.json({
      success: true,
      stats: {
        pendingSubscriptionsCount: 0,
        pendingVendorsCount: 0,
        supportTicketsCount: 0,
      },
    })
  }
}
