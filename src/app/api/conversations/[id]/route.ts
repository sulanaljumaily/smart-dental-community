import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

interface RouteParams {
  params: {
    id: string
  }
}

// GET - الحصول على محادثة محددة مع جميع رسائلها
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: params.id,
      },
      include: {
        participant1: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },
        participant2: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
              },
            },
            receiver: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'المحادثة غير موجودة' },
        { status: 404 }
      )
    }

    // التحقق من أن المستخدم جزء من المحادثة
    if (
      conversation.participant1Id !== session.user.id &&
      conversation.participant2Id !== session.user.id
    ) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })
    }

    const otherParticipant =
      conversation.participant1Id === session.user.id
        ? conversation.participant2
        : conversation.participant1

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        type: conversation.type,
        clinicId: conversation.clinicId,
        lastMessage: conversation.lastMessage,
        lastMessageAt: conversation.lastMessageAt,
        participant: otherParticipant,
        messages: conversation.messages,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      },
    })
  } catch (error) {
    console.error('Error fetching conversation:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المحادثة' },
      { status: 500 }
    )
  }
}

// DELETE - حذف محادثة
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'المحادثة غير موجودة' },
        { status: 404 }
      )
    }

    // التحقق من أن المستخدم جزء من المحادثة
    if (
      conversation.participant1Id !== session.user.id &&
      conversation.participant2Id !== session.user.id
    ) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })
    }

    await prisma.conversation.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: 'تم حذف المحادثة بنجاح' })
  } catch (error) {
    console.error('Error deleting conversation:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف المحادثة' },
      { status: 500 }
    )
  }
}
