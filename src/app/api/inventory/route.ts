import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const inventorySchema = z.object({
  clinicId: z.string(),
  name: z.string(),
  category: z.string(),
  quantity: z.number(),
  minQuantity: z.number().default(10),
  unit: z.string().optional(),
  expiryDate: z.string().optional(),
  cost: z.number().optional(),
})

// GET - Fetch inventory items
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const clinicId = searchParams.get('clinicId')
    const lowStock = searchParams.get('lowStock') === 'true'

    const where: any = {}
    if (clinicId) where.clinicId = clinicId

    if (lowStock) {
      where.quantity = { lte: prisma.inventoryItem.fields.minQuantity }
    }

    const items = await prisma.inventoryItem.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const lowStockCount = await prisma.inventoryItem.count({
      where: {
        ...where,
        quantity: { lte: prisma.inventoryItem.fields.minQuantity },
      },
    })

    return NextResponse.json({ items, lowStockCount })
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المخزون' },
      { status: 500 }
    )
  }
}

// POST - Create inventory item
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = inventorySchema.parse(body)

    const item = await prisma.inventoryItem.create({
      data: {
        ...validatedData,
        expiryDate: validatedData.expiryDate
          ? new Date(validatedData.expiryDate)
          : null,
      },
    })

    // Create notification if low stock
    if (item.quantity <= item.minQuantity) {
      await prisma.notification.create({
        data: {
          userId: session.user.id,
          type: 'INVENTORY',
          title: 'تنبيه مخزون منخفض',
          message: `المادة "${item.name}" أصبحت في المخزون المنخفض`,
          clinicId: validatedData.clinicId,
        },
      })
    }

    return NextResponse.json(
      { message: 'تم إضافة المادة بنجاح', item },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating inventory item:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة المادة' },
      { status: 500 }
    )
  }
}
