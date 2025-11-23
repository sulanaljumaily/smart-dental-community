import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const labOrderSchema = z.object({
  clinicId: z.string(),
  labId: z.string(),
  planId: z.string().optional(),
  orderType: z.string(),
  description: z.string().optional(),
  specifications: z.any().optional(),
  amount: z.number(),
  dueDate: z.string(),
})

// GET - Fetch lab orders
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const clinicId = searchParams.get('clinicId')
    const labId = searchParams.get('labId')
    const status = searchParams.get('status')

    const where: any = {}
    if (clinicId) where.clinicId = clinicId
    if (labId) where.labId = labId
    if (status) where.status = status

    const orders = await prisma.labOrder.findMany({
      where,
      include: {
        clinic: true,
        lab: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        plan: {
          include: {
            patient: true,
            treatment: true,
          },
        },
        deliveryStaff: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Error fetching lab orders:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب طلبات المختبر' },
      { status: 500 }
    )
  }
}

// POST - Create lab order
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = labOrderSchema.parse(body)

    const order = await prisma.labOrder.create({
      data: {
        ...validatedData,
        planId: validatedData.planId || null,
        dueDate: new Date(validatedData.dueDate),
      },
      include: {
        lab: {
          include: {
            user: true,
          },
        },
      },
    })

    // Create notification for lab
    await prisma.notification.create({
      data: {
        userId: order.lab.userId,
        type: 'ORDER',
        title: 'طلب مختبر جديد',
        message: `طلب جديد من العيادة بمبلغ ${order.amount} دينار`,
        link: `/lab/orders/${order.id}`,
      },
    })

    return NextResponse.json(
      { message: 'تم إنشاء الطلب بنجاح', order },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating lab order:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الطلب' },
      { status: 500 }
    )
  }
}
