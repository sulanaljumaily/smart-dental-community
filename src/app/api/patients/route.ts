import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const patientSchema = z.object({
  clinicId: z.string(),
  name: z.string().min(2),
  phone: z.string(),
  email: z.string().email().optional().or(z.literal('')),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  medicalHistory: z.any().optional(),
  allergies: z.array(z.string()).default([]),
})

// GET - Fetch patients
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const clinicId = searchParams.get('clinicId')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}
    if (clinicId) where.clinicId = clinicId
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        include: {
          _count: {
            select: {
              appointments: true,
              treatmentPlans: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.patient.count({ where }),
    ])

    return NextResponse.json({ patients, total })
  } catch (error) {
    console.error('Error fetching patients:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المرضى' },
      { status: 500 }
    )
  }
}

// POST - Create patient
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = patientSchema.parse(body)

    // Check if patient exists
    const existingPatient = await prisma.patient.findFirst({
      where: {
        clinicId: validatedData.clinicId,
        phone: validatedData.phone,
      },
    })

    if (existingPatient) {
      return NextResponse.json(
        { error: 'المريض موجود بالفعل بنفس رقم الهاتف' },
        { status: 400 }
      )
    }

    const patient = await prisma.patient.create({
      data: {
        ...validatedData,
        email: validatedData.email || null,
        dateOfBirth: validatedData.dateOfBirth
          ? new Date(validatedData.dateOfBirth)
          : null,
      },
    })

    // Initialize teeth records (32 teeth)
    const teethData = Array.from({ length: 32 }, (_, i) => ({
      patientId: patient.id,
      toothNumber: i + 1,
      condition: 'HEALTHY' as const,
    }))

    await prisma.tooth.createMany({
      data: teethData,
    })

    return NextResponse.json(
      { message: 'تم إضافة المريض بنجاح', patient },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating patient:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة المريض' },
      { status: 500 }
    )
  }
}
