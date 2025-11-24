import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - الحصول على جميع الدورات
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")

    const where: any = { isActive: true }

    if (category) where.category = category
    if (status) where.status = status
    if (featured === "true") where.isFeatured = true

    const courses = await prisma.course.findMany({
      where,
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    })

    return NextResponse.json({ courses }, { status: 200 })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    )
  }
}

// POST - إنشاء دورة جديدة (للإدارة فقط)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      title,
      description,
      objectives,
      syllabus,
      category,
      level,
      coverImage,
      videoUrl,
      materials,
      duration,
      totalSessions,
      instructors,
      maxEnrollments,
      startDate,
      endDate,
      status,
      isFeatured,
    } = body

    // التحقق من البيانات المطلوبة
    if (!title || !description || !category || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        objectives,
        syllabus,
        category,
        level: level || "Beginner",
        coverImage,
        videoUrl,
        materials: materials || [],
        duration,
        totalSessions: totalSessions || 1,
        instructors: instructors || [],
        maxEnrollments,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        status: status || "DRAFT",
        isFeatured: isFeatured || false,
        createdByAdmin: true,
      },
    })

    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    )
  }
}
