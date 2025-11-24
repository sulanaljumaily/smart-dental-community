import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

// GET - الحصول على جميع المحادثات للمستخدم الحالي
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') // STAFF, VENDOR, LAB, ADMIN, COMMUNITY
    const clinicId = searchParams.get('clinicId')

    // بناء الشرط للبحث
    const where: any = {
      OR: [
        { participant1Id: session.user.id },
        { participant2Id: session.user.id },
      ],
    }

    if (type) {
      where.type = type
    }

    if (clinicId) {
      where.clinicId = clinicId
    }

    // الحصول على المحادثات
    const conversations = await prisma.conversation.findMany({
      where,
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
          select: {
            id: true,
            isRead: true,
            senderId: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
    })

    // تنسيق البيانات لإرجاع الطرف الآخر في المحادثة
    const formattedConversations = conversations.map((conv) => {
      const otherParticipant =
        conv.participant1Id === session.user.id
          ? conv.participant2
          : conv.participant1

      // حساب عدد الرسائل غير المقروءة
      const unreadCount = conv.messages.filter(
        (msg) => !msg.isRead && msg.senderId !== session.user.id
      ).length

      return {
        id: conv.id,
        type: conv.type,
        clinicId: conv.clinicId,
        lastMessage: conv.lastMessage,
        lastMessageAt: conv.lastMessageAt,
        participant: otherParticipant,
        unreadCount,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
      }
    })

    return NextResponse.json({ conversations: formattedConversations })
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المحادثات' },
      { status: 500 }
    )
  }
}

// POST - إنشاء محادثة جديدة أو الحصول على محادثة موجودة
const createConversationSchema = z.object({
  participantId: z.string(),
  type: z.enum(['STAFF', 'VENDOR', 'LAB', 'ADMIN', 'COMMUNITY', 'SYSTEM']).default('STAFF'),
  clinicId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = createConversationSchema.parse(body)

    // التحقق من وجود محادثة بين المستخدمين
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            participant1Id: session.user.id,
            participant2Id: validatedData.participantId,
          },
          {
            participant1Id: validatedData.participantId,
            participant2Id: session.user.id,
          },
        ],
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
      },
    })

    if (existingConversation) {
      const otherParticipant =
        existingConversation.participant1Id === session.user.id
          ? existingConversation.participant2
          : existingConversation.participant1

      return NextResponse.json({
        conversation: {
          id: existingConversation.id,
          type: existingConversation.type,
          clinicId: existingConversation.clinicId,
          lastMessage: existingConversation.lastMessage,
          lastMessageAt: existingConversation.lastMessageAt,
          participant: otherParticipant,
          createdAt: existingConversation.createdAt,
          updatedAt: existingConversation.updatedAt,
        },
        isNew: false,
      })
    }

    // إنشاء محادثة جديدة
    const newConversation = await prisma.conversation.create({
      data: {
        participant1Id: session.user.id,
        participant2Id: validatedData.participantId,
        type: validatedData.type,
        clinicId: validatedData.clinicId,
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
      },
    })

    const otherParticipant =
      newConversation.participant1Id === session.user.id
        ? newConversation.participant2
        : newConversation.participant1

    return NextResponse.json(
      {
        conversation: {
          id: newConversation.id,
          type: newConversation.type,
          clinicId: newConversation.clinicId,
          lastMessage: newConversation.lastMessage,
          lastMessageAt: newConversation.lastMessageAt,
          participant: otherParticipant,
          createdAt: newConversation.createdAt,
          updatedAt: newConversation.updatedAt,
        },
        isNew: true,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating conversation:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء المحادثة' },
      { status: 500 }
    )
  }
}
