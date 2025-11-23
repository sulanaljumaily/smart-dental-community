import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const updateSchema = z.object({
  date: z.string().optional(),
  duration: z.number().optional(),
  type: z.string().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']).optional(),
  notes: z.string().optional(),
  staffId: z.string().optional(),
})

// GET - Fetch single appointment
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: {
        patient: true,
        staff: true,
        clinic: true,
      },
    })

    if (!appointment) {
      return NextResponse.json({ error: 'الموعد غير موجود' }, { status: 404 })
    }

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الموعد' },
      { status: 500 }
    )
  }
}

// PATCH - Update appointment
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

    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    })

    if (!existingAppointment) {
      return NextResponse.json({ error: 'الموعد غير موجود' }, { status: 404 })
    }

    const appointment = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        ...(validatedData.date && { date: new Date(validatedData.date) }),
      },
      include: {
        patient: true,
        staff: true,
        clinic: true,
      },
    })

    return NextResponse.json({
      message: 'تم تحديث الموعد بنجاح',
      appointment,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating appointment:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث الموعد' },
      { status: 500 }
    )
  }
}

// DELETE - Delete appointment
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    })

    if (!appointment) {
      return NextResponse.json({ error: 'الموعد غير موجود' }, { status: 404 })
    }

    await prisma.appointment.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'تم حذف الموعد بنجاح' })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف الموعد' },
      { status: 500 }
    )
  }
}
