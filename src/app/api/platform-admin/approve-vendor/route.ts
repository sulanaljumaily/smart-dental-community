import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { vendorId, approved } = await req.json()

    const vendor = await prisma.vendorProfile.update({
      where: { id: vendorId },
      data: { isApproved: approved },
      include: { user: true },
    })

    // Create notification for vendor
    await prisma.notification.create({
      data: {
        userId: vendor.userId,
        type: 'SYSTEM',
        title: approved ? 'تم قبول طلبك' : 'تم رفض طلبك',
        message: approved
          ? 'تم قبول طلبك كمورد في المنصة. يمكنك الآن البدء بإضافة المنتجات'
          : 'تم رفض طلبك كمورد في المنصة. يرجى التواصل مع الإدارة',
      },
    })

    return NextResponse.json({
      message: approved ? 'تم قبول المورد' : 'تم رفض المورد',
      vendor,
    })
  } catch (error) {
    console.error('Error approving vendor:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة الطلب' },
      { status: 500 }
    )
  }
}
