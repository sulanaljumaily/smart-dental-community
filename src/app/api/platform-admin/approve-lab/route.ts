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

    const { labId, approved } = await req.json()

    const lab = await prisma.labProfile.update({
      where: { id: labId },
      data: { isApproved: approved },
      include: { user: true },
    })

    // Create notification for lab
    await prisma.notification.create({
      data: {
        userId: lab.userId,
        type: 'SYSTEM',
        title: approved ? 'تم قبول طلبك' : 'تم رفض طلبك',
        message: approved
          ? 'تم قبول طلبك كمختبر أسنان في المنصة. يمكنك الآن البدء باستقبال الطلبات'
          : 'تم رفض طلبك كمختبر في المنصة. يرجى التواصل مع الإدارة',
      },
    })

    return NextResponse.json({
      message: approved ? 'تم قبول المختبر' : 'تم رفض المختبر',
      lab,
    })
  } catch (error) {
    console.error('Error approving lab:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة الطلب' },
      { status: 500 }
    )
  }
}
