import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// الحصول على تفاصيل طلب مختبر
export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      )
    }

    const order = await prisma.labOrder.findUnique({
      where: { id: params.orderId },
      include: {
        lab: {
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
        plan: {
          include: {
            patient: true,
            treatment: true,
            dentist: true,
          },
        },
        clinic: true,
        deliveryStaff: true,
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: "طلب المختبر غير موجود" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error("Lab order fetch error:", error)
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب تفاصيل طلب المختبر" },
      { status: 500 }
    )
  }
}

// تحديث طلب مختبر
export async function PATCH(
  req: NextRequest,
  { params }: { params: { orderId: string } }
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
      status,
      paymentStatus,
      amount,
      description,
      specifications,
      dueDate,
      deliveredDate,
      deliveryStaffId,
    } = body

    // الحصول على الطلب الحالي
    const existingOrder = await prisma.labOrder.findUnique({
      where: { id: params.orderId },
      include: {
        clinic: true,
      },
    })

    if (!existingOrder) {
      return NextResponse.json(
        { error: "طلب المختبر غير موجود" },
        { status: 404 }
      )
    }

    // بناء بيانات التحديث
    const updateData: any = {
      updatedBy: session.user.id,
      updatedByName: session.user.name || "مجهول",
    }

    if (status) updateData.status = status
    if (paymentStatus) updateData.paymentStatus = paymentStatus
    if (amount) updateData.amount = amount
    if (description !== undefined) updateData.description = description
    if (specifications !== undefined) updateData.specifications = specifications
    if (dueDate) updateData.dueDate = new Date(dueDate)
    if (deliveredDate) updateData.deliveredDate = new Date(deliveredDate)
    if (deliveryStaffId) updateData.deliveryStaffId = deliveryStaffId

    // تحديث مع التكامل المالي
    const order = await prisma.$transaction(async (tx) => {
      // تحديث الطلب
      const updatedOrder = await tx.labOrder.update({
        where: { id: params.orderId },
        data: updateData,
      })

      // إذا تم تغيير المبلغ، نحدث السجل المالي أيضاً
      if (amount && existingOrder.financeRecordId) {
        await tx.finance.update({
          where: { id: existingOrder.financeRecordId },
          data: {
            amount,
            updatedBy: session.user.id,
            updatedByName: session.user.name || "مجهول",
          },
        })
      }

      // إذا تم تعليم الطلب كمدفوع، نحدث طريقة الدفع في المالية
      if (paymentStatus === "PAID" && existingOrder.financeRecordId) {
        await tx.finance.update({
          where: { id: existingOrder.financeRecordId },
          data: {
            paymentMethod: "CASH",
          },
        })
      }

      // إرسال إشعار للمختبر إذا تغيرت الحالة
      if (status && status !== existingOrder.status && existingOrder.labId) {
        const statusMessages: Record<string, string> = {
          ACCEPTED: "تم قبول طلبك",
          IN_PROGRESS: "طلبك قيد التحضير",
          READY: "طلبك جاهز للاستلام",
          IN_TRANSIT: "طلبك في الطريق",
          DELIVERED: "تم تسليم طلبك",
          RETURNED: "تم إرجاع طلبك",
        }

        const lab = await tx.labProfile.findUnique({
          where: { id: existingOrder.labId },
        })

        if (lab) {
          await tx.notification.create({
            data: {
              userId: lab.userId,
              type: "LAB_DELIVERY",
              title: "تحديث حالة الطلب",
              message: statusMessages[status] || "تم تحديث حالة الطلب",
              data: {
                orderId: params.orderId,
                status,
              },
            },
          })
        }
      }

      return updatedOrder
    })

    return NextResponse.json({
      success: true,
      order,
      message: "تم تحديث طلب المختبر بنجاح",
    })
  } catch (error) {
    console.error("Lab order update error:", error)
    return NextResponse.json(
      { error: "حدث خطأ أثناء تحديث طلب المختبر" },
      { status: 500 }
    )
  }
}

// حذف طلب مختبر
export async function DELETE(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      )
    }

    // الحصول على الطلب
    const order = await prisma.labOrder.findUnique({
      where: { id: params.orderId },
    })

    if (!order) {
      return NextResponse.json(
        { error: "طلب المختبر غير موجود" },
        { status: 404 }
      )
    }

    // حذف مع التكامل المالي
    await prisma.$transaction(async (tx) => {
      // حذف السجل المالي إذا كان موجوداً
      if (order.financeRecordId) {
        await tx.finance.delete({
          where: { id: order.financeRecordId },
        })
      }

      // حذف الطلب
      await tx.labOrder.delete({
        where: { id: params.orderId },
      })

      // تحديث حالة الخطة العلاجية
      if (order.planId) {
        await tx.treatmentPlan.update({
          where: { id: order.planId },
          data: {
            labOrderRequested: false,
          },
        })
      }
    })

    return NextResponse.json({
      success: true,
      message: "تم حذف طلب المختبر بنجاح",
    })
  } catch (error) {
    console.error("Lab order deletion error:", error)
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف طلب المختبر" },
      { status: 500 }
    )
  }
}
