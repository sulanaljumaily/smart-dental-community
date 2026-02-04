import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "غير مصرح" },
        { status: 401 }
      )
    }

    const vendorId = session.user.id

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
