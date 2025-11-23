import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const notificationSchema = z.object({
  userId: z.string(),
  type: z.enum(['APPOINTMENT', 'INVENTORY', 'ORDER', 'LAB_DELIVERY', 'TASK', 'MESSAGE', 'SYSTEM']),
  title: z.string(),
  message: z.string(),
  link: z.string().optional(),
  data: z.any().optional(),
  clinicId: z.string().optional(),
  clinicName: z.string().optional(),
  staffName: z.string().optional(),
  staffRole: z.string().optional(),
})

// GET - Fetch notifications
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const isRead = searchParams.get('isRead')
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = {
      userId: session.user.id,
    }

    if (isRead !== null) where.isRead = isRead === 'true'
    if (type) where.type = type

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })

    const unreadCount = await prisma.notification.count({
      where: {
        userId: session.user.id,
        isRead: false,
      },
    })

    return NextResponse.json({ notifications, unreadCount })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الإشعارات' },
      { status: 500 }
    )
  }
}

// POST - Create notification (Admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = notificationSchema.parse(body)

    const notification = await prisma.notification.create({
      data: validatedData,
    })

    return NextResponse.json(
      { message: 'تم إنشاء الإشعار بنجاح', notification },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating notification:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الإشعار' },
      { status: 500 }
    )
  }
}
