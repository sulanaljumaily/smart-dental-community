import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// PATCH - Mark message as read
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const message = await prisma.message.update({
      where: {
        id: params.id,
        receiverId: session.user.id,
      },
      data: {
        isRead: true,
      },
    })

    return NextResponse.json({ message: 'تم وضع علامة مقروءة', data: message })
  } catch (error) {
    console.error('Error marking message as read:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث حالة الرسالة' },
      { status: 500 }
    )
  }
}
