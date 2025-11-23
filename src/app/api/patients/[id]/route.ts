import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  medicalHistory: z.any().optional(),
  allergies: z.array(z.string()).optional(),
})

// GET - Fetch single patient with full details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      include: {
        clinic: true,
        appointments: {
          orderBy: { date: 'desc' },
          take: 10,
        },
        treatmentPlans: {
          include: {
            treatment: true,
            sessions: true,
          },
        },
        teeth: {
          orderBy: { toothNumber: 'asc' },
        },
        documents: {
          orderBy: { uploadedAt: 'desc' },
        },
        finances: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!patient) {
      return NextResponse.json({ error: 'المريض غير موجود' }, { status: 404 })
    }

    return NextResponse.json({ patient })
  } catch (error) {
    console.error('Error fetching patient:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب بيانات المريض' },
      { status: 500 }
    )
  }
}

// PATCH - Update patient
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

    const existingPatient = await prisma.patient.findUnique({
      where: { id: params.id },
    })

    if (!existingPatient) {
      return NextResponse.json({ error: 'المريض غير موجود' }, { status: 404 })
    }

    const patient = await prisma.patient.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        email: validatedData.email || null,
        dateOfBirth: validatedData.dateOfBirth
          ? new Date(validatedData.dateOfBirth)
          : undefined,
      },
    })

    return NextResponse.json({
      message: 'تم تحديث بيانات المريض بنجاح',
      patient,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating patient:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث بيانات المريض' },
      { status: 500 }
    )
  }
}

// DELETE - Delete patient
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
    })

    if (!patient) {
      return NextResponse.json({ error: 'المريض غير موجود' }, { status: 404 })
    }

    await prisma.patient.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'تم حذف المريض بنجاح' })
  } catch (error) {
    console.error('Error deleting patient:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف المريض' },
      { status: 500 }
    )
  }
}
