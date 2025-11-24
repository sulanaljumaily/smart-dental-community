import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - الحصول على تفاصيل ندوة معينة
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const webinar = await prisma.webinar.findUnique({
      where: { id: params.id },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    })

    if (!webinar) {
      return NextResponse.json(
        { error: "Webinar not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ webinar }, { status: 200 })
  } catch (error) {
    console.error("Error fetching webinar:", error)
    return NextResponse.json(
      { error: "Failed to fetch webinar" },
      { status: 500 }
    )
  }
}

// PATCH - تعديل ندوة (للإدارة فقط)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const webinar = await prisma.webinar.update({
      where: { id: params.id },
      data: {
        ...body,
        scheduledDate: body.scheduledDate ? new Date(body.scheduledDate) : undefined,
      },
    })

    return NextResponse.json({ webinar }, { status: 200 })
  } catch (error) {
    console.error("Error updating webinar:", error)
    return NextResponse.json(
      { error: "Failed to update webinar" },
      { status: 500 }
    )
  }
}

// DELETE - حذف ندوة (للإدارة فقط)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.webinar.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: "Webinar deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting webinar:", error)
    return NextResponse.json(
      { error: "Failed to delete webinar" },
      { status: 500 }
    )
  }
}
