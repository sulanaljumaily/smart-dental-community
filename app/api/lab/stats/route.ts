import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    // TODO: استخدام session للحصول على معرّف المختبر الحقيقي
    const labId = "temp-lab-id" // مؤقت

    // جلب عدد الطلبات الجديدة
    const newOrdersCount = await prisma.labOrder.count({
      where: {
        labId: labId,
        status: "PENDING",
      },
    }).catch(() => 0)

    // جلب عدد الرسائل غير المقروءة
    const unreadMessagesCount = await prisma.message.count({
      where: {
        receiverId: labId,
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
    console.error("خطأ في جلب إحصائيات المختبر:", error)
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
