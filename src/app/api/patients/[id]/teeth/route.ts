import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const updateToothSchema = z.object({
  toothNumber: z.number().min(1).max(32),
  condition: z.enum([
    'HEALTHY',
    'CAVITY',
    'FILLED',
    'MISSING',
    'CROWNED',
    'ROOT_CANAL_TREATED',
    'EXTRACTED',
    'IMPLANT',
    'DAMAGED',
  ]),
  previousTreatment: z.string().optional(),
  notes: z.string().optional(),
})

// GET - Fetch patient teeth
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const teeth = await prisma.tooth.findMany({
      where: { patientId: params.id },
      orderBy: { toothNumber: 'asc' },
    })

    return NextResponse.json({ teeth })
  } catch (error) {
    console.error('Error fetching teeth:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب بيانات الأسنان' },
      { status: 500 }
    )
  }
}

// PATCH - Update tooth condition
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
    const validatedData = updateToothSchema.parse(body)

    const tooth = await prisma.tooth.upsert({
      where: {
        patientId_toothNumber: {
          patientId: params.id,
          toothNumber: validatedData.toothNumber,
        },
      },
      update: {
        condition: validatedData.condition,
        previousTreatment: validatedData.previousTreatment,
        notes: validatedData.notes,
      },
      create: {
        patientId: params.id,
        toothNumber: validatedData.toothNumber,
        condition: validatedData.condition,
        previousTreatment: validatedData.previousTreatment,
        notes: validatedData.notes,
      },
    })

    return NextResponse.json({
      message: 'تم تحديث حالة السن بنجاح',
      tooth,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating tooth:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث حالة السن' },
      { status: 500 }
    )
  }
}
