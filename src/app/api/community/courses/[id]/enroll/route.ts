import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST - التسجيل في دورة
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    // التحقق من وجود الدورة
    const course = await prisma.course.findUnique({
      where: { id: params.id },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    // التحقق من أن الدورة منشورة
    if (course.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "Course is not available for enrollment" },
        { status: 400 }
      )
    }

    // التحقق من عدم تجاوز الحد الأقصى للمشاركين
    if (course.maxEnrollments && course.enrollmentCount >= course.maxEnrollments) {
      return NextResponse.json(
        { error: "Course is full" },
        { status: 400 }
      )
    }

    // التحقق من عدم التسجيل مسبقاً
    const existingEnrollment = await prisma.courseEnrollment.findUnique({
      where: {
        courseId_userId: {
          courseId: params.id,
          userId,
        },
      },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "Already enrolled in this course" },
        { status: 400 }
      )
    }

    // إنشاء التسجيل
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        courseId: params.id,
        userId,
        status: "REGISTERED",
      },
    })

    // تحديث عدد المشاركين
    await prisma.course.update({
      where: { id: params.id },
      data: {
        enrollmentCount: { increment: 1 },
      },
    })

    return NextResponse.json({ enrollment }, { status: 201 })
  } catch (error) {
    console.error("Error enrolling in course:", error)
    return NextResponse.json(
      { error: "Failed to enroll in course" },
      { status: 500 }
    )
  }
}

// DELETE - إلغاء التسجيل في دورة
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    // حذف التسجيل
    await prisma.courseEnrollment.delete({
      where: {
        courseId_userId: {
          courseId: params.id,
          userId,
        },
      },
    })

    // تحديث عدد المشاركين
    await prisma.course.update({
      where: { id: params.id },
      data: {
        enrollmentCount: { decrement: 1 },
      },
    })

    return NextResponse.json(
      { message: "Enrollment cancelled successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error cancelling enrollment:", error)
    return NextResponse.json(
      { error: "Failed to cancel enrollment" },
      { status: 500 }
    )
  }
}
