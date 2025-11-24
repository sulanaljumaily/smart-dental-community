import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const labOrderSchema = z.object({
  labId: z.string().optional(), // المختبر المسجل في المنصة
  customLabName: z.string().optional(), // اسم المختبر المخصص
  customLabPhone: z.string().optional(), // رقم المختبر المخصص
  orderType: z.string(),
  description: z.string().optional(),
  specifications: z.any().optional(),
  amount: z.number(),
  dueDate: z.string(),
  createTask: z.boolean().optional().default(true), // إنشاء مهمة تلقائياً
  sendNotification: z.boolean().optional().default(true), // إرسال إشعار
})

// POST - Create lab order for treatment plan
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
    const validatedData = labOrderSchema.parse(body)

    // Fetch treatment plan
    const treatmentPlan = await prisma.treatmentPlan.findUnique({
      where: { id: params.id },
      include: {
        patient: true,
        treatment: true,
      },
    })

    if (!treatmentPlan) {
      return NextResponse.json({ error: 'الخطة العلاجية غير موجودة' }, { status: 404 })
    }

    // Get clinic ID from patient
    const patient = await prisma.patient.findUnique({
      where: { id: treatmentPlan.patientId },
      select: { clinicId: true },
    })

    if (!patient) {
      return NextResponse.json({ error: 'المريض غير موجود' }, { status: 404 })
    }

    // Determine if lab is in platform
    const labIsInPlatform = !!validatedData.labId

    // Calculate platform fee (5% if lab is in platform)
    const platformFee = labIsInPlatform ? validatedData.amount * 0.05 : 0

    // Determine which labId to use
    let finalLabId = validatedData.labId

    // If custom lab, check if we have a saved lab with this info
    if (!labIsInPlatform && validatedData.customLabName) {
      const savedLab = await prisma.savedLab.findFirst({
        where: {
          clinicId: patient.clinicId,
          customName: validatedData.customLabName,
        },
      })

      if (savedLab && savedLab.labId) {
        finalLabId = savedLab.labId
      }
    }

    // If still no labId, we need to create or use a default one
    // For now, we'll require a labId or custom lab info
    if (!finalLabId && !validatedData.customLabName) {
      return NextResponse.json(
        { error: 'يجب تحديد مختبر أو إدخال معلومات مختبر مخصص' },
        { status: 400 }
      )
    }

    // Create lab order
    const labOrderData: any = {
      clinicId: patient.clinicId,
      planId: params.id,
      orderType: validatedData.orderType,
      description: validatedData.description,
      specifications: validatedData.specifications,
      amount: validatedData.amount,
      platformFee,
      dueDate: new Date(validatedData.dueDate),
      labIsInPlatform,
      customLabName: validatedData.customLabName,
      customLabPhone: validatedData.customLabPhone,
    }

    // Only add labId if we have one
    if (finalLabId) {
      labOrderData.labId = finalLabId
    } else {
      // Create a temporary lab profile or handle this case
      // For now, we'll skip this and let the admin handle it
      return NextResponse.json(
        { error: 'المختبر غير موجود في المنصة. يرجى إضافة المختبر أولاً.' },
        { status: 400 }
      )
    }

    const labOrder = await prisma.labOrder.create({
      data: labOrderData,
      include: {
        lab: true,
        plan: {
          include: {
            patient: true,
            treatment: true,
          },
        },
      },
    })

    // Create task if requested
    let task = null
    if (validatedData.createTask && session.user.dentistProfile?.id) {
      task = await prisma.task.create({
        data: {
          title: `طلب مختبر - ${treatmentPlan.treatment.name}`,
          description: `طلب مختبر للمريض ${treatmentPlan.patient.name} - ${validatedData.orderType}`,
          type: 'GENERAL',
          priority: 'High',
          clinicId: patient.clinicId,
          createdById: session.user.dentistProfile.id,
          dueDate: new Date(validatedData.dueDate),
          status: 'PENDING',
        },
      })

      // Link task to lab order
      await prisma.labOrder.update({
        where: { id: labOrder.id },
        data: { taskId: task.id },
      })
    }

    // Send notification if requested and lab is in platform
    if (validatedData.sendNotification && labIsInPlatform && labOrder.lab.userId) {
      await prisma.notification.create({
        data: {
          userId: labOrder.lab.userId,
          type: 'LAB_DELIVERY',
          title: 'طلب مختبر جديد',
          message: `لديك طلب مختبر جديد من عيادة - ${validatedData.orderType}`,
          link: `/lab/orders/${labOrder.id}`,
          data: {
            orderId: labOrder.id,
            orderType: validatedData.orderType,
          },
        },
      })

      // Mark notification as sent
      await prisma.labOrder.update({
        where: { id: labOrder.id },
        data: { notificationSent: true },
      })
    }

    // Update treatment plan
    await prisma.treatmentPlan.update({
      where: { id: params.id },
      data: {
        needsLabOrder: true,
        labOrderRequested: true,
      },
    })

    return NextResponse.json({
      message: 'تم إنشاء طلب المختبر بنجاح',
      labOrder,
      task,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating lab order:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء طلب المختبر' },
      { status: 500 }
    )
  }
}

// GET - Get lab orders for treatment plan
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const labOrders = await prisma.labOrder.findMany({
      where: { planId: params.id },
      include: {
        lab: true,
        deliveryStaff: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ labOrders })
  } catch (error) {
    console.error('Error fetching lab orders:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب طلبات المختبر' },
      { status: 500 }
    )
  }
}
