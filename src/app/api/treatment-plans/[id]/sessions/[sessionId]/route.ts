import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

// Schema for updating session with advanced fields
const sessionUpdateSchema = z.object({
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  notes: z.string().optional(),
  completedDate: z.string().optional(),

  // Root canal treatment fields
  rootCanals: z.number().optional(),
  canalLength: z.string().optional(),
  filesUsed: z.array(z.string()).optional(),
  rootFillingType: z.string().optional(),
  rootFillingLength: z.string().optional(),
  finalFillingType: z.string().optional(),

  // Crown/Bridge fields
  crownType: z.string().optional(),
  crownColor: z.string().optional(),
  bridgeSpan: z.string().optional(),
  postAndCore: z.boolean().optional(),
  needsCrownCoverage: z.boolean().optional(),

  // Orthodontics fields
  bracketType: z.string().optional(),
  archWireSize: z.string().optional(),
  elasticType: z.string().optional(),
  tighteningAmount: z.string().optional(),

  // Implant fields
  implantBrand: z.string().optional(),
  implantDiameter: z.string().optional(),
  implantLength: z.string().optional(),
  healingPeriod: z.string().optional(),
  abutmentType: z.string().optional(),

  // General fields
  measurements: z.any().optional(),
  materials: z.array(z.string()).optional(),
  stage: z.string().optional(),
  details: z.any().optional(),
})

// GET - Fetch specific session
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; sessionId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const treatmentSession = await prisma.treatmentSession.findUnique({
      where: { id: params.sessionId },
      include: {
        plan: {
          include: {
            treatment: true,
            patient: true,
          },
        },
      },
    })

    if (!treatmentSession) {
      return NextResponse.json({ error: 'الجلسة غير موجودة' }, { status: 404 })
    }

    return NextResponse.json({ session: treatmentSession })
  } catch (error) {
    console.error('Error fetching session:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب بيانات الجلسة' },
      { status: 500 }
    )
  }
}

// PATCH - Update session with advanced fields
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; sessionId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = sessionUpdateSchema.parse(body)

    // Check if session exists
    const existingSession = await prisma.treatmentSession.findUnique({
      where: { id: params.sessionId },
      include: {
        plan: true,
      },
    })

    if (!existingSession) {
      return NextResponse.json({ error: 'الجلسة غير موجودة' }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = { ...validatedData }

    // Handle date conversion
    if (validatedData.completedDate) {
      updateData.completedDate = new Date(validatedData.completedDate)
    }

    // Update session
    const updatedSession = await prisma.treatmentSession.update({
      where: { id: params.sessionId },
      data: updateData,
      include: {
        plan: {
          include: {
            treatment: true,
            patient: true,
          },
        },
      },
    })

    // If session is completed, update treatment plan progress
    if (validatedData.status === 'COMPLETED') {
      const allSessions = await prisma.treatmentSession.findMany({
        where: { planId: existingSession.planId },
      })

      const completedSessions = allSessions.filter((s) => s.status === 'COMPLETED')
      const progress = Math.round((completedSessions.length / allSessions.length) * 100)

      await prisma.treatmentPlan.update({
        where: { id: existingSession.planId },
        data: {
          progress,
          status: progress === 100 ? 'COMPLETED' : 'ACTIVE',
        },
      })
    }

    return NextResponse.json({
      message: 'تم تحديث الجلسة بنجاح',
      session: updatedSession,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating session:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث الجلسة' },
      { status: 500 }
    )
  }
}

// DELETE - Delete session
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; sessionId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    await prisma.treatmentSession.delete({
      where: { id: params.sessionId },
    })

    return NextResponse.json({ message: 'تم حذف الجلسة بنجاح' })
  } catch (error) {
    console.error('Error deleting session:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف الجلسة' },
      { status: 500 }
    )
  }
}
