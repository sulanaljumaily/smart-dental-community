import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - الحصول على جميع الندوات
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")
    const upcoming = searchParams.get("upcoming")

    const where: any = { isActive: true }

    if (category) where.category = category
    if (status) where.status = status
    if (featured === "true") where.isFeatured = true
    if (upcoming === "true") {
      where.scheduledDate = { gte: new Date() }
      where.status = { in: ["SCHEDULED", "LIVE"] }
    }

    const webinars = await prisma.webinar.findMany({
      where,
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: [
        { scheduledDate: "asc" },
      ],
    })

    return NextResponse.json({ webinars }, { status: 200 })
  } catch (error) {
    console.error("Error fetching webinars:", error)
    return NextResponse.json(
      { error: "Failed to fetch webinars" },
      { status: 500 }
    )
  }
}

// POST - إنشاء ندوة جديدة (للإدارة فقط)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      title,
      description,
      agenda,
      category,
      coverImage,
      meetingUrl,
      instructors,
      maxAttendees,
      scheduledDate,
      duration,
      status,
      isFeatured,
    } = body

    // التحقق من البيانات المطلوبة
    if (!title || !description || !category || !scheduledDate || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const webinar = await prisma.webinar.create({
      data: {
        title,
        description,
        agenda,
        category,
        coverImage,
        meetingUrl,
        instructors: instructors || [],
        maxAttendees,
        scheduledDate: new Date(scheduledDate),
        duration,
        status: status || "SCHEDULED",
        isFeatured: isFeatured || false,
        createdByAdmin: true,
      },
    })

    return NextResponse.json({ webinar }, { status: 201 })
  } catch (error) {
    console.error("Error creating webinar:", error)
    return NextResponse.json(
      { error: "Failed to create webinar" },
      { status: 500 }
    )
  }
}
