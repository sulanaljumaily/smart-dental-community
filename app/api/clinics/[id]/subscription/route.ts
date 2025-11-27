import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "غير مصرح" },
        { status: 401 }
      )
    }

    const subscription = await prisma.clinicSubscription.findFirst({
      where: {
        clinicId: params.id,
      },
      include: {
        plan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!subscription) {
      return NextResponse.json({
        success: true,
        subscription: {
          planType: "FREE",
          allowOnlineBooking: false,
          allowMapDisplay: false,
          isActive: false,
          endDate: null,
        },
      })
    }

    return NextResponse.json({
      success: true,
      subscription: {
        planType: subscription.plan.type,
        allowOnlineBooking: subscription.plan.allowOnlineBooking,
        allowMapDisplay: subscription.plan.allowMapDisplay,
        isActive: subscription.isActive && new Date(subscription.endDate) > new Date(),
        endDate: subscription.endDate,
        aiCreditsUsed: subscription.aiCreditsUsed,
        aiCreditsLimit: subscription.aiCreditsLimit,
      },
    })
  } catch (error) {
    console.error("خطأ في جلب معلومات الاشتراك:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في جلب معلومات الاشتراك" },
      { status: 500 }
    )
  }
}
