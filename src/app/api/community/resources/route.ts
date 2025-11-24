import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - الحصول على جميع المصادر العلمية
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

    const resources = await prisma.scientificResource.findMany({
      where,
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    })

    return NextResponse.json({ resources }, { status: 200 })
  } catch (error) {
    console.error("Error fetching resources:", error)
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    )
  }
}

// POST - إضافة مصدر علمي جديد (للإدارة فقط)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      title,
      description,
      category,
      url,
      externalUrl,
      thumbnail,
      author,
      publisher,
      publishedDate,
      tags,
      isFeatured,
      createdByAdminId,
    } = body

    if (!title || !category || !url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const resource = await prisma.scientificResource.create({
      data: {
        title,
        description,
        category,
        url,
        externalUrl,
        thumbnail,
        author,
        publisher,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        tags: tags || [],
        isFeatured: isFeatured || false,
        createdByAdminId,
      },
    })

    return NextResponse.json({ resource }, { status: 201 })
  } catch (error) {
    console.error("Error creating resource:", error)
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    )
  }
}
