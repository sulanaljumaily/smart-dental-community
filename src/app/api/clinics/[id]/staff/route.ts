import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'

const staffSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  role: z.enum(['OWNER', 'DENTIST', 'ASSISTANT', 'RECEPTIONIST', 'NURSE']),
  specialty: z.string().optional(),
  permissions: z.array(z.string()).default([]),
  salary: z.number().optional(),
  password: z.string().min(8).optional(), // للحسابات الجديدة
  dentistId: z.string().optional(), // إذا كان طبيب مسجل في المنصة
})

// GET - Fetch clinic staff
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const clinic = await prisma.clinic.findUnique({
      where: { id: params.id },
      include: {
        owner: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!clinic) {
      return NextResponse.json({ error: 'العيادة غير موجودة' }, { status: 404 })
    }

    // Check if user is owner or has permission
    const isOwner = clinic.owner.userId === session.user.id

    if (!isOwner) {
      // Check if staff member has VIEW_STAFF permission
      const staffMember = await prisma.clinicStaff.findFirst({
        where: {
          clinicId: params.id,
          userId: session.user.id,
          permissions: {
            has: 'VIEW_STAFF',
          },
        },
      })

      if (!staffMember) {
        return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })
      }
    }

    const staff = await prisma.clinicStaff.findMany({
      where: {
        clinicId: params.id,
        isActive: true,
      },
      include: {
        dentist: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: {
        joinedAt: 'desc',
      },
    })

    return NextResponse.json({ staff })
  } catch (error) {
    console.error('Error fetching clinic staff:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الطاقم' },
      { status: 500 }
    )
  }
}

// POST - Add staff member
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = staffSchema.parse(body)

    // Check if user is clinic owner
    const clinic = await prisma.clinic.findUnique({
      where: { id: params.id },
      include: {
        owner: true,
      },
    })

    if (!clinic) {
      return NextResponse.json({ error: 'العيادة غير موجودة' }, { status: 404 })
    }

    if (clinic.owner.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'فقط مالك العيادة يمكنه إضافة الطاقم' },
        { status: 403 }
      )
    }

    // Check if email already exists in this clinic
    if (validatedData.email) {
      const existingStaff = await prisma.clinicStaff.findFirst({
        where: {
          clinicId: params.id,
          email: validatedData.email,
        },
      })

      if (existingStaff) {
        return NextResponse.json(
          { error: 'البريد الإلكتروني موجود بالفعل' },
          { status: 400 }
        )
      }
    }

    // Create staff member
    const staffData: any = {
      clinicId: params.id,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      role: validatedData.role,
      specialty: validatedData.specialty,
      permissions: validatedData.permissions,
      salary: validatedData.salary,
    }

    // If dentist is registered in platform, link to their profile
    if (validatedData.dentistId) {
      staffData.dentistId = validatedData.dentistId

      // Get dentist user ID
      const dentist = await prisma.dentistProfile.findUnique({
        where: { id: validatedData.dentistId },
      })
      if (dentist) {
        staffData.userId = dentist.userId
      }
    }

    // If password provided, hash it (for non-platform staff)
    if (validatedData.password) {
      staffData.password = await hash(validatedData.password, 12)
    }

    const staff = await prisma.clinicStaff.create({
      data: staffData,
      include: {
        dentist: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: 'SYSTEM',
        title: 'تمت إضافة عضو طاقم جديد',
        message: `تمت إضافة ${staff.name} إلى طاقم ${clinic.name}`,
        clinicId: params.id,
        clinicName: clinic.name,
        staffName: staff.name,
        staffRole: staff.role,
      },
    })

    return NextResponse.json(
      {
        message: 'تمت إضافة عضو الطاقم بنجاح',
        staff,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error adding staff:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة عضو الطاقم' },
      { status: 500 }
    )
  }
}
