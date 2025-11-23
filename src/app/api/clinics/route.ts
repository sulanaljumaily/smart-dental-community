import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { googleMapsService } from '@/lib/google-maps'
import { z } from 'zod'

const clinicSchema = z.object({
  name: z.string().min(2),
  address: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  workingHours: z.any().optional(),
  showOnMap: z.boolean().default(false),
})

// GET - Fetch clinics
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const ownerId = searchParams.get('ownerId')
    const showOnMap = searchParams.get('showOnMap')

    const where: any = {}
    if (ownerId) {
      const dentistProfile = await prisma.dentistProfile.findUnique({
        where: { userId: ownerId },
      })
      if (dentistProfile) {
        where.ownerId = dentistProfile.id
      }
    }
    if (showOnMap !== null) where.showOnMap = showOnMap === 'true'

    const clinics = await prisma.clinic.findMany({
      where,
      include: {
        owner: {
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
        _count: {
          select: {
            staff: true,
            patients: true,
            appointments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ clinics })
  } catch (error) {
    console.error('Error fetching clinics:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب العيادات' },
      { status: 500 }
    )
  }
}

// POST - Create clinic
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'DENTIST') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = clinicSchema.parse(body)

    // Get dentist profile
    const dentistProfile = await prisma.dentistProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (!dentistProfile) {
      return NextResponse.json(
        { error: 'الملف الشخصي غير موجود' },
        { status: 404 }
      )
    }

    // Geocode address if provided
    let coordinates = null
    if (validatedData.address) {
      coordinates = await googleMapsService.geocodeAddress(validatedData.address)
    }

    // Generate unique booking link
    const bookingLink = `clinic-${Date.now()}-${Math.random().toString(36).substring(7)}`

    const clinic = await prisma.clinic.create({
      data: {
        ...validatedData,
        email: validatedData.email || null,
        ownerId: dentistProfile.id,
        bookingLink,
        latitude: coordinates?.lat,
        longitude: coordinates?.lng,
      },
    })

    return NextResponse.json(
      { message: 'تم إنشاء العيادة بنجاح', clinic },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating clinic:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء العيادة' },
      { status: 500 }
    )
  }
}
