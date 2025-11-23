import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'

const updateStaffSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  role: z.enum(['OWNER', 'DENTIST', 'ASSISTANT', 'RECEPTIONIST', 'NURSE']).optional(),
  specialty: z.string().optional(),
  permissions: z.array(z.string()).optional(),
  salary: z.number().optional(),
  password: z.string().min(8).optional(),
  isActive: z.boolean().optional(),
})

// GET - Get single staff member
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; staffId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const staff = await prisma.clinicStaff.findUnique({
      where: {
        id: params.staffId,
        clinicId: params.id,
      },
      include: {
        clinic: true,
        dentist: {
          include: {
            user: true,
          },
        },
        appointments: {
          take: 10,
          orderBy: { date: 'desc' },
          include: {
            patient: true,
          },
        },
      },
    })

    if (!staff) {
      return NextResponse.json({ error: 'عضو الطاقم غير موجود' }, { status: 404 })
    }

    return NextResponse.json({ staff })
  } catch (error) {
    console.error('Error fetching staff member:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب بيانات عضو الطاقم' },
      { status: 500 }
    )
  }
}

// PATCH - Update staff member
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; staffId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = updateStaffSchema.parse(body)

    // Check if user is clinic owner
    const clinic = await prisma.clinic.findUnique({
      where: { id: params.id },
      include: { owner: true },
    })

    if (!clinic) {
      return NextResponse.json({ error: 'العيادة غير موجودة' }, { status: 404 })
    }

    if (clinic.owner.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'فقط مالك العيادة يمكنه تعديل بيانات الطاقم' },
        { status: 403 }
      )
    }

    const updateData: any = { ...validatedData }

    // Hash password if provided
    if (validatedData.password) {
      updateData.password = await hash(validatedData.password, 12)
    }

    const staff = await prisma.clinicStaff.update({
      where: {
        id: params.staffId,
        clinicId: params.id,
      },
      data: updateData,
      include: {
        dentist: {
          include: {
            user: true,
          },
        },
      },
    })

    return NextResponse.json({
      message: 'تم تحديث بيانات عضو الطاقم بنجاح',
      staff,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating staff member:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث بيانات عضو الطاقم' },
      { status: 500 }
    )
  }
}

// DELETE - Remove staff member
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; staffId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    // Check if user is clinic owner
    const clinic = await prisma.clinic.findUnique({
      where: { id: params.id },
      include: { owner: true },
    })

    if (!clinic) {
      return NextResponse.json({ error: 'العيادة غير موجودة' }, { status: 404 })
    }

    if (clinic.owner.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'فقط مالك العيادة يمكنه حذف الطاقم' },
        { status: 403 }
      )
    }

    // Soft delete by setting isActive to false
    await prisma.clinicStaff.update({
      where: {
        id: params.staffId,
        clinicId: params.id,
      },
      data: {
        isActive: false,
        leftAt: new Date(),
      },
    })

    return NextResponse.json({ message: 'تم حذف عضو الطاقم بنجاح' })
  } catch (error) {
    console.error('Error deleting staff member:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف عضو الطاقم' },
      { status: 500 }
    )
  }
}
