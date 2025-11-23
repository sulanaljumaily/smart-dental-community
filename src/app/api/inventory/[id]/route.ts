import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const updateSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  quantity: z.number().optional(),
  minQuantity: z.number().optional(),
  unit: z.string().optional(),
  expiryDate: z.string().optional(),
  cost: z.number().optional(),
})

// PATCH - Update inventory item
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = updateSchema.parse(body)

    const item = await prisma.inventoryItem.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        expiryDate: validatedData.expiryDate
          ? new Date(validatedData.expiryDate)
          : undefined,
      },
    })

    return NextResponse.json({
      message: 'تم تحديث المادة بنجاح',
      item,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating inventory item:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث المادة' },
      { status: 500 }
    )
  }
}

// DELETE - Delete inventory item
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    await prisma.inventoryItem.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'تم حذف المادة بنجاح' })
  } catch (error) {
    console.error('Error deleting inventory item:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف المادة' },
      { status: 500 }
    )
  }
}
