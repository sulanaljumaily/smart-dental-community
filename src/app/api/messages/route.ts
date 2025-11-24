import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const messageSchema = z.object({
  conversationId: z.string().optional(), // اختياري لإنشاء محادثة جديدة تلقائياً
  receiverId: z.string(),
  content: z.string().min(1),
  type: z.enum(['STAFF', 'VENDOR', 'LAB', 'ADMIN', 'COMMUNITY', 'SYSTEM']).default('STAFF'),
  clinicId: z.string().optional(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
  })).default([]),
})

// GET - Fetch messages
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const chatWithId = searchParams.get('chatWith')
    const type = searchParams.get('type')
    const clinicId = searchParams.get('clinicId')

    const where: any = {
      OR: [
        { senderId: session.user.id },
        { receiverId: session.user.id },
      ],
    }

    if (chatWithId) {
      where.OR = [
        { senderId: session.user.id, receiverId: chatWithId },
        { senderId: chatWithId, receiverId: session.user.id },
      ]
    }

    if (type) where.type = type
    if (clinicId) where.clinicId = clinicId

    const messages = await prisma.message.findMany({
      where,
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
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الرسائل' },
      { status: 500 }
    )
  }
}

// POST - Send message
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = messageSchema.parse(body)

    let conversationId = validatedData.conversationId

    // إذا لم يتم توفير conversationId، ابحث عن محادثة موجودة أو أنشئ واحدة جديدة
    if (!conversationId) {
      let conversation = await prisma.conversation.findFirst({
        where: {
          OR: [
            {
              participant1Id: session.user.id,
              participant2Id: validatedData.receiverId,
            },
            {
              participant1Id: validatedData.receiverId,
              participant2Id: session.user.id,
            },
          ],
        },
      })

      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            participant1Id: session.user.id,
            participant2Id: validatedData.receiverId,
            type: validatedData.type,
            clinicId: validatedData.clinicId,
          },
        })
      }

      conversationId = conversation.id
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: session.user.id,
        receiverId: validatedData.receiverId,
        content: validatedData.content,
        type: validatedData.type,
        clinicId: validatedData.clinicId,
        attachments: validatedData.attachments,
      },
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
    })

    // تحديث آخر رسالة في المحادثة
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessage: validatedData.content,
        lastMessageAt: new Date(),
      },
    })

    // Create notification for receiver
    await prisma.notification.create({
      data: {
        userId: validatedData.receiverId,
        type: 'MESSAGE',
        title: 'رسالة جديدة',
        message: `رسالة جديدة من ${session.user.name}`,
        link: `/messages?chat=${session.user.id}`,
      },
    })

    return NextResponse.json(
      { message: 'تم إرسال الرسالة بنجاح', data: message },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إرسال الرسالة' },
      { status: 500 }
    )
  }
}
