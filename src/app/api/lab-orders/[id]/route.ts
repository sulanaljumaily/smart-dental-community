import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const updateSchema = z.object({
  status: z.enum([
    'PENDING',
    'ACCEPTED',
    'IN_PROGRESS',
    'READY',
    'IN_TRANSIT',
    'DELIVERED',
    'RETURNED',
  ]).optional(),
  paymentStatus: z.enum(['PAID', 'UNPAID', 'PARTIAL']).optional(),
  deliveryStaffId: z.string().optional(),
  deliveredDate: z.string().optional(),
})

// PATCH - Update lab order
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = updateSchema.parse(body)

    const order = await prisma.labOrder.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        deliveredDate: validatedData.deliveredDate
          ? new Date(validatedData.deliveredDate)
          : undefined,
      },
      include: {
        clinic: true,
        lab: true,
      },
    })

    // Create notification for clinic if status changed to DELIVERED
    if (validatedData.status === 'DELIVERED') {
      // Get clinic owner to send notification
      const clinic = await prisma.clinic.findUnique({
        where: { id: order.clinicId },
        include: {
          owner: {
            include: {
              user: true,
            },
          },
        },
      })

      if (clinic) {
        await prisma.notification.create({
          data: {
            userId: clinic.owner.userId,
            type: 'LAB_DELIVERY',
            title: 'تم توصيل الطلب',
            message: `تم توصيل طلب المختبر رقم ${order.id}`,
            link: `/clinic/${clinic.id}/lab-orders/${order.id}`,
          },
        })
      }
    }

    return NextResponse.json({
      message: 'تم تحديث الطلب بنجاح',
      order,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating lab order:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث الطلب' },
      { status: 500 }
    )
  }
}

// DELETE - Delete lab order
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    await prisma.labOrder.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'تم حذف الطلب بنجاح' })
  } catch (error) {
    console.error('Error deleting lab order:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف الطلب' },
      { status: 500 }
    )
  }
}
