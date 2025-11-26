import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// إنشاء طلب مختبر جديد
export async function POST(
  req: NextRequest,
  { params }: { params: { planId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const {
      labId,
      customLabName,
      customLabPhone,
      orderType,
      description,
      specifications,
      amount,
      dueDate,
      createTask,
      sendNotification,
    } = body

    // التحقق من صحة البيانات
    if (!orderType) {
      return NextResponse.json(
        { error: "نوع الطلب مطلوب" },
        { status: 400 }
      )
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "المبلغ غير صحيح" },
        { status: 400 }
      )
    }

    if (!dueDate) {
      return NextResponse.json(
        { error: "تاريخ الاستلام مطلوب" },
        { status: 400 }
      )
    }

    // الحصول على معلومات الخطة العلاجية
    const treatmentPlan = await prisma.treatmentPlan.findUnique({
      where: { id: params.planId },
      include: {
        patient: true,
        treatment: true,
        dentist: true,
      },
    })

    if (!treatmentPlan) {
      return NextResponse.json(
        { error: "الخطة العلاجية غير موجودة" },
        { status: 404 }
      )
    }

    // تحديد معلومات المختبر
    const isInPlatform = Boolean(labId)
    let labProfile = null
    let platformFee = 0

    if (labId) {
      labProfile = await prisma.labProfile.findUnique({
        where: { id: labId },
        include: { user: true },
      })

      if (!labProfile) {
        return NextResponse.json(
          { error: "المختبر غير موجود" },
          { status: 404 }
        )
      }

      // حساب نسبة المنصة (5% للمختبرات المسجلة)
      platformFee = amount * 0.05
    } else if (!customLabName || !customLabPhone) {
      return NextResponse.json(
        { error: "يرجى إدخال بيانات المختبر" },
        { status: 400 }
      )
    }

    // إنشاء طلب المختبر مع التكامل المالي
    const labOrder = await prisma.$transaction(async (tx) => {
      // 1. إنشاء طلب المختبر
      const order = await tx.labOrder.create({
        data: {
          clinicId: treatmentPlan.patient.clinicId,
          labId: labId || undefined,
          planId: params.planId,
          patientId: treatmentPlan.patientId,
          patientName: treatmentPlan.patient.name,
          orderType,
          description,
          specifications,
          amount,
          platformFee,
          labIsInPlatform: isInPlatform,
          customLabName,
          customLabPhone,
          dueDate: new Date(dueDate),
          createdBy: session.user.id,
          createdByName: session.user.name || "مجهول",
        },
      })

      // 2. تسجيل في المالية كمصروف
      const financeRecord = await tx.finance.create({
        data: {
          clinicId: treatmentPlan.patient.clinicId,
          type: "EXPENSE",
          category: "LAB_ORDER",
          amount,
          description: `طلب مختبر: ${orderType} - المريض: ${treatmentPlan.patient.name}`,
          sourceType: "Lab",
          sourceId: order.id,
          sourceName: labProfile?.labName || customLabName || "مختبر",
          paymentMethod: "PENDING",
          createdBy: session.user.id,
          createdByName: session.user.name || "مجهول",
          createdByRole: session.user.role || "DENTIST",
          date: new Date(),
        },
      })

      // 3. ربط طلب المختبر بسجل المالية
      await tx.labOrder.update({
        where: { id: order.id },
        data: {
          financeRecordId: financeRecord.id,
          isRecordedInFinance: true,
        },
      })

      // 4. إنشاء مهمة تذكير إذا طُلب ذلك
      if (createTask) {
        // الحصول على DentistProfile
        const dentistProfile = await tx.dentistProfile.findUnique({
          where: { userId: session.user.id },
        })

        if (dentistProfile) {
          await tx.task.create({
            data: {
              clinicId: treatmentPlan.patient.clinicId,
              title: `استلام طلب مختبر - ${orderType}`,
              description: `استلام طلب المختبر للمريض ${treatmentPlan.patient.name}`,
              type: "GENERAL",
              priority: "Medium",
              createdById: dentistProfile.id,
              assignedToId: treatmentPlan.dentistId || dentistProfile.id,
              dueDate: new Date(dueDate),
            },
          })
        }
      }

      // 5. إرسال إشعار للمختبر إذا كان في المنصة وطُلب ذلك
      if (isInPlatform && sendNotification && labProfile) {
        await tx.notification.create({
          data: {
            userId: labProfile.userId,
            type: "LAB_DELIVERY",
            title: "طلب مختبر جديد",
            message: `طلب جديد من العيادة: ${orderType}`,
            data: {
              orderId: order.id,
              orderType,
              amount,
              dueDate,
            },
          },
        })

        await tx.labOrder.update({
          where: { id: order.id },
          data: { notificationSent: true },
        })
      }

      // 6. تحديث حالة الخطة العلاجية
      await tx.treatmentPlan.update({
        where: { id: params.planId },
        data: {
          labOrderRequested: true,
        },
      })

      return order
    })

    return NextResponse.json({
      success: true,
      order: labOrder,
      message: "تم إنشاء طلب المختبر بنجاح",
    })
  } catch (error) {
    console.error("Lab order creation error:", error)
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء طلب المختبر" },
      { status: 500 }
    )
  }
}
