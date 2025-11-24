import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - الحصول على جميع النماذج 3D
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const featured = searchParams.get("featured")

    const where: any = { isActive: true }

    if (category) where.category = category
    if (tag) where.tags = { has: tag }
    if (featured === "true") where.isFeatured = true

    const models = await prisma.threeDModel.findMany({
      where,
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    })

    return NextResponse.json({ models }, { status: 200 })
  } catch (error) {
    console.error("Error fetching 3D models:", error)
    return NextResponse.json(
      { error: "Failed to fetch 3D models" },
      { status: 500 }
    )
  }
}

// POST - إضافة نموذج 3D جديد (للإدارة فقط)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      title,
      description,
      category,
      sketchfabUrl,
      sketchfabId,
      thumbnailUrl,
      tags,
      isFeatured,
      createdByAdminId,
    } = body

    if (!title || !category || !sketchfabUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const model = await prisma.threeDModel.create({
      data: {
        title,
        description,
        category,
        sketchfabUrl,
        sketchfabId,
        thumbnailUrl,
        tags: tags || [],
        isFeatured: isFeatured || false,
        createdByAdminId,
      },
    })

    return NextResponse.json({ model }, { status: 201 })
  } catch (error) {
    console.error("Error creating 3D model:", error)
    return NextResponse.json(
      { error: "Failed to create 3D model" },
      { status: 500 }
    )
  }
}
