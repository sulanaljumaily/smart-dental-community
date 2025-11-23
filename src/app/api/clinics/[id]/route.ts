import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { googleMapsService } from '@/lib/google-maps'
import { z } from 'zod'

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  workingHours: z.any().optional(),
  showOnMap: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

// GET - Fetch single clinic with full details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clinic = await prisma.clinic.findUnique({
      where: { id: params.id },
      include: {
        owner: {
          include: {
            user: true,
          },
        },
        staff: {
          include: {
            dentist: {
              include: {
                user: true,
              },
            },
          },
        },
        _count: {
          select: {
            patients: true,
            appointments: true,
            treatments: true,
            inventory: true,
            labOrders: true,
          },
        },
      },
    })

    if (!clinic) {
      return NextResponse.json({ error: 'العيادة غير موجودة' }, { status: 404 })
    }

    return NextResponse.json({ clinic })
  } catch (error) {
    console.error('Error fetching clinic:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب بيانات العيادة' },
      { status: 500 }
    )
  }
}

// PATCH - Update clinic
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

    // Geocode new address if provided
    let coordinates = undefined
    if (validatedData.address) {
      const coords = await googleMapsService.geocodeAddress(validatedData.address)
      if (coords) {
        coordinates = {
          latitude: coords.lat,
          longitude: coords.lng,
        }
      }
    }

    const clinic = await prisma.clinic.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        email: validatedData.email || null,
        ...coordinates,
      },
    })

    return NextResponse.json({
      message: 'تم تحديث بيانات العيادة بنجاح',
      clinic,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating clinic:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث بيانات العيادة' },
      { status: 500 }
    )
  }
}

// DELETE - Delete clinic
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    await prisma.clinic.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'تم حذف العيادة بنجاح' })
  } catch (error) {
    console.error('Error deleting clinic:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف العيادة' },
      { status: 500 }
    )
  }
}
