import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST - الانضمام إلى مجموعة
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

    // التحقق من عدم الانضمام مسبقاً
    const existingMember = await prisma.groupMembership.findUnique({
      where: {
        groupId_userId: {
          groupId: params.id,
          userId,
        },
      },
    })

    if (existingMember) {
      return NextResponse.json(
        { error: "Already a member of this group" },
        { status: 400 }
      )
    }

    // إضافة العضو
    const membership = await prisma.groupMembership.create({
      data: {
        groupId: params.id,
        userId,
        role: "MEMBER",
      },
    })

    // تحديث عدد الأعضاء
    await prisma.medicalGroup.update({
      where: { id: params.id },
      data: {
        memberCount: { increment: 1 },
      },
    })

    return NextResponse.json({ membership }, { status: 201 })
  } catch (error) {
    console.error("Error joining group:", error)
    return NextResponse.json(
      { error: "Failed to join group" },
      { status: 500 }
    )
  }
}

// DELETE - الخروج من مجموعة
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

    // حذف العضوية
    await prisma.groupMembership.delete({
      where: {
        groupId_userId: {
          groupId: params.id,
          userId,
        },
      },
    })

    // تحديث عدد الأعضاء
    await prisma.medicalGroup.update({
      where: { id: params.id },
      data: {
        memberCount: { decrement: 1 },
      },
    })

    return NextResponse.json(
      { message: "Left group successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error leaving group:", error)
    return NextResponse.json(
      { error: "Failed to leave group" },
      { status: 500 }
    )
  }
}
