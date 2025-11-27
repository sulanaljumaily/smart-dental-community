import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    // TODO: استخدام session للحصول على معرّف المورد الحقيقي
    const vendorId = "temp-vendor-id" // مؤقت

    // جلب عدد الطلبات الجديدة
    const newOrdersCount = await prisma.order.count({
      where: {
        vendorId: vendorId,
        status: "PENDING",
      },
    }).catch(() => 0)

    // جلب عدد الرسائل غير المقروءة
    const unreadMessagesCount = await prisma.message.count({
      where: {
        receiverId: vendorId,
        read: false,
      },
    }).catch(() => 0)

    return NextResponse.json({
      success: true,
      stats: {
        newOrdersCount,
        unreadMessagesCount,
      },
    })
  } catch (error) {
    console.error("خطأ في جلب إحصائيات المورد:", error)
    // إرجاع قيم افتراضية في حالة الخطأ
    return NextResponse.json({
      success: true,
      stats: {
        newOrdersCount: 0,
        unreadMessagesCount: 0,
      },
    })
  }
}
