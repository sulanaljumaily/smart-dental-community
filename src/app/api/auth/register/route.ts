import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { UserRole } from '@prisma/client'

const registerSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  phone: z.string().optional(),
  role: z.nativeEnum(UserRole),
  // Dentist specific
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
  // Vendor specific
  companyName: z.string().optional(),
  // Lab specific
  labName: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          validatedData.phone ? { phone: validatedData.phone } : {},
        ],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'المستخدم موجود بالفعل' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12)

    // Create user with profile based on role
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        phone: validatedData.phone,
        role: validatedData.role,
        isVerified: false,
        isActive: true,
        // Create profile based on role
        ...(validatedData.role === 'DENTIST' && {
          dentistProfile: {
            create: {
              specialization: validatedData.specialization,
              licenseNumber: validatedData.licenseNumber,
              subscriptionTier: 'FREE',
            },
          },
        }),
        ...(validatedData.role === 'VENDOR' && {
          vendorProfile: {
            create: {
              companyName: validatedData.companyName || validatedData.name,
              licenseNumber: validatedData.licenseNumber,
              isApproved: false,
            },
          },
        }),
        ...(validatedData.role === 'LAB' && {
          labProfile: {
            create: {
              labName: validatedData.labName || validatedData.name,
              licenseNumber: validatedData.licenseNumber,
              isApproved: false,
            },
          },
        }),
      },
      include: {
        dentistProfile: true,
        vendorProfile: true,
        labProfile: true,
      },
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: 'تم إنشاء الحساب بنجاح',
        user: userWithoutPassword,
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

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    )
  }
}
