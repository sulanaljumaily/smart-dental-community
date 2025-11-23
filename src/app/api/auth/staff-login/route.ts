import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, password, clinicId } = await req.json()

    if (!email || !password || !clinicId) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      )
    }

    // Find staff member
    const staff = await prisma.clinicStaff.findFirst({
      where: {
        email,
        clinicId,
        isActive: true,
      },
      include: {
        clinic: true,
        dentist: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!staff) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // Check password
    if (!staff.password) {
      return NextResponse.json(
        { error: 'هذا الحساب يتطلب تسجيل الدخول من خلال حساب المنصة' },
        { status: 401 }
      )
    }

    const isPasswordValid = await compare(password, staff.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // Update last login
    await prisma.clinicStaff.update({
      where: { id: staff.id },
      data: { lastLogin: new Date() },
    })

    // Return staff data (will be used by NextAuth)
    return NextResponse.json({
      id: staff.id,
      userId: staff.userId || staff.id,
      email: staff.email,
      name: staff.name,
      role: 'STAFF',
      clinicId: staff.clinicId,
      clinicName: staff.clinic.name,
      staffRole: staff.role,
      permissions: staff.permissions,
      isStaff: true,
    })
  } catch (error) {
    console.error('Staff login error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    )
  }
}
