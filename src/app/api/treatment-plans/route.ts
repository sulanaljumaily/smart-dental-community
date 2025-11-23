import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const treatmentPlanSchema = z.object({
  patientId: z.string(),
  treatmentId: z.string(),
  toothId: z.string().optional(),
  dentistId: z.string().optional(),
  totalCost: z.number(),
  notes: z.string().optional(),
  details: z.any().optional(),
  sessions: z.array(z.object({
    sessionNumber: z.number(),
    scheduledDate: z.string().optional(),
    notes: z.string().optional(),
    details: z.any().optional(),
  })).optional(),
})

// GET - Fetch treatment plans
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const patientId = searchParams.get('patientId')
    const clinicId = searchParams.get('clinicId')

    const where: any = {}
    if (patientId) where.patientId = patientId

    const treatmentPlans = await prisma.treatmentPlan.findMany({
      where,
      include: {
        patient: true,
        treatment: true,
        tooth: true,
        dentist: true,
        sessions: {
          orderBy: { sessionNumber: 'asc' },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ treatmentPlans })
  } catch (error) {
    console.error('Error fetching treatment plans:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الخطط العلاجية' },
      { status: 500 }
    )
  }
}

// POST - Create treatment plan
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = treatmentPlanSchema.parse(body)

    const { sessions, ...planData } = validatedData

    const treatmentPlan = await prisma.treatmentPlan.create({
      data: {
        ...planData,
        toothId: validatedData.toothId || null,
        dentistId: validatedData.dentistId || null,
        sessions: sessions
          ? {
              create: sessions.map((session) => ({
                ...session,
                scheduledDate: session.scheduledDate
                  ? new Date(session.scheduledDate)
                  : null,
              })),
            }
          : undefined,
      },
      include: {
        treatment: true,
        tooth: true,
        dentist: true,
        sessions: true,
      },
    })

    return NextResponse.json(
      { message: 'تم إنشاء الخطة العلاجية بنجاح', treatmentPlan },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating treatment plan:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الخطة العلاجية' },
      { status: 500 }
    )
  }
}
