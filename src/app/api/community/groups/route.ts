import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - الحصول على جميع المجموعات
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const userId = searchParams.get("userId")

    const where: any = { isActive: true }

    if (category) where.category = category

    // إذا تم تحديد userId، احصل على المجموعات التي ينتمي إليها المستخدم
    if (userId) {
      where.memberships = {
        some: {
          userId,
        },
      }
    }

    const groups = await prisma.medicalGroup.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            memberships: true,
            posts: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ groups }, { status: 200 })
  } catch (error) {
    console.error("Error fetching groups:", error)
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    )
  }
}

// POST - إنشاء مجموعة جديدة
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      description,
      category,
      coverImage,
      avatar,
      privacy,
      allowAdminOnly,
      creatorId,
    } = body

    if (!name || !creatorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // إنشاء المجموعة
    const group = await prisma.medicalGroup.create({
      data: {
        name,
        description,
        category,
        coverImage,
        avatar,
        privacy: privacy || "PUBLIC",
        allowAdminOnly: allowAdminOnly || false,
        creatorId,
      },
    })

    // إضافة المنشئ كعضو أدمن
    await prisma.groupMembership.create({
      data: {
        groupId: group.id,
        userId: creatorId,
        role: "ADMIN",
      },
    })

    return NextResponse.json({ group }, { status: 201 })
  } catch (error) {
    console.error("Error creating group:", error)
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    )
  }
}
