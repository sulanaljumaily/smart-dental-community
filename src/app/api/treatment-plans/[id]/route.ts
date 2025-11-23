import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const updateSchema = z.object({
  totalCost: z.number().optional(),
  amountPaid: z.number().optional(),
  progress: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
  details: z.any().optional(),
})

// PATCH - Update treatment plan
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

    const treatmentPlan = await prisma.treatmentPlan.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        treatment: true,
        tooth: true,
        dentist: true,
        sessions: true,
      },
    })

    return NextResponse.json({
      message: 'تم تحديث الخطة العلاجية بنجاح',
      treatmentPlan,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating treatment plan:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث الخطة العلاجية' },
      { status: 500 }
    )
  }
}

// DELETE - Delete treatment plan
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    await prisma.treatmentPlan.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'تم حذف الخطة العلاجية بنجاح' })
  } catch (error) {
    console.error('Error deleting treatment plan:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف الخطة العلاجية' },
      { status: 500 }
    )
  }
}
