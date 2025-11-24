import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST - التسجيل في ندوة
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

    // التحقق من وجود الندوة
    const webinar = await prisma.webinar.findUnique({
      where: { id: params.id },
    })

    if (!webinar) {
      return NextResponse.json(
        { error: "Webinar not found" },
        { status: 404 }
      )
    }

    // التحقق من أن الندوة مجدولة
    if (webinar.status === "COMPLETED" || webinar.status === "CANCELLED") {
      return NextResponse.json(
        { error: "Webinar is not available for registration" },
        { status: 400 }
      )
    }

    // التحقق من عدم تجاوز الحد الأقصى للحضور
    if (webinar.maxAttendees && webinar.attendeeCount >= webinar.maxAttendees) {
      return NextResponse.json(
        { error: "Webinar is full" },
        { status: 400 }
      )
    }

    // التحقق من عدم التسجيل مسبقاً
    const existingEnrollment = await prisma.webinarEnrollment.findUnique({
      where: {
        webinarId_userId: {
          webinarId: params.id,
          userId,
        },
      },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "Already registered for this webinar" },
        { status: 400 }
      )
    }

    // إنشاء التسجيل
    const enrollment = await prisma.webinarEnrollment.create({
      data: {
        webinarId: params.id,
        userId,
      },
    })

    // تحديث عدد الحضور
    await prisma.webinar.update({
      where: { id: params.id },
      data: {
        attendeeCount: { increment: 1 },
      },
    })

    return NextResponse.json({ enrollment }, { status: 201 })
  } catch (error) {
    console.error("Error registering for webinar:", error)
    return NextResponse.json(
      { error: "Failed to register for webinar" },
      { status: 500 }
    )
  }
}

// DELETE - إلغاء التسجيل في ندوة
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
    await prisma.webinarEnrollment.delete({
      where: {
        webinarId_userId: {
          webinarId: params.id,
          userId,
        },
      },
    })

    // تحديث عدد الحضور
    await prisma.webinar.update({
      where: { id: params.id },
      data: {
        attendeeCount: { decrement: 1 },
      },
    })

    return NextResponse.json(
      { message: "Registration cancelled successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error cancelling registration:", error)
    return NextResponse.json(
      { error: "Failed to cancel registration" },
      { status: 500 }
    )
  }
}
