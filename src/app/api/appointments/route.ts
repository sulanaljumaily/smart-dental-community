import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const appointmentSchema = z.object({
  clinicId: z.string(),
  patientId: z.string(),
  staffId: z.string().optional(),
  date: z.string(),
  duration: z.number().default(30),
  type: z.string().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']).default('PENDING'),
  notes: z.string().optional(),
})

// GET - Fetch appointments
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const clinicId = searchParams.get('clinicId')
    const patientId = searchParams.get('patientId')
    const status = searchParams.get('status')
    const date = searchParams.get('date')

    const where: any = {}
    if (clinicId) where.clinicId = clinicId
    if (patientId) where.patientId = patientId
    if (status) where.status = status
    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setHours(23, 59, 59, 999)
      where.date = {
        gte: startDate,
        lte: endDate,
      }
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        staff: true,
        clinic: true,
      },
      orderBy: {
        date: 'asc',
      },
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المواعيد' },
      { status: 500 }
    )
  }
}

// POST - Create appointment
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = appointmentSchema.parse(body)

    // Check for conflicts
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        clinicId: validatedData.clinicId,
        date: new Date(validatedData.date),
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
        ...(validatedData.staffId && { staffId: validatedData.staffId }),
      },
    })

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: 'يوجد موعد آخر في نفس الوقت' },
        { status: 400 }
      )
    }

    const appointment = await prisma.appointment.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
      },
      include: {
        patient: true,
        staff: true,
        clinic: true,
      },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: 'APPOINTMENT',
        title: 'موعد جديد',
        message: `تم إنشاء موعد جديد مع ${appointment.patient.name}`,
        clinicId: validatedData.clinicId,
      },
    })

    return NextResponse.json(
      { message: 'تم إنشاء الموعد بنجاح', appointment },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الموعد' },
      { status: 500 }
    )
  }
}
