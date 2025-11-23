import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const financeSchema = z.object({
  clinicId: z.string(),
  type: z.enum(['Revenue', 'Expense']),
  category: z.string(),
  amount: z.number(),
  description: z.string().optional(),
  date: z.string().optional(),
})

// GET - Fetch finances with statistics
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const clinicId = searchParams.get('clinicId')
    const type = searchParams.get('type')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {}
    if (clinicId) where.clinicId = clinicId
    if (type) where.type = type

    if (startDate || endDate) {
      where.date = {}
      if (startDate) where.date.gte = new Date(startDate)
      if (endDate) where.date.lte = new Date(endDate)
    }

    const [finances, totalRevenue, totalExpense] = await Promise.all([
      prisma.finance.findMany({
        where,
        orderBy: {
          date: 'desc',
        },
      }),
      prisma.finance.aggregate({
        where: { ...where, type: 'Revenue' },
        _sum: { amount: true },
      }),
      prisma.finance.aggregate({
        where: { ...where, type: 'Expense' },
        _sum: { amount: true },
      }),
    ])

    const statistics = {
      totalRevenue: totalRevenue._sum.amount || 0,
      totalExpense: totalExpense._sum.amount || 0,
      netProfit: (totalRevenue._sum.amount || 0) - (totalExpense._sum.amount || 0),
    }

    return NextResponse.json({ finances, statistics })
  } catch (error) {
    console.error('Error fetching finances:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب البيانات المالية' },
      { status: 500 }
    )
  }
}

// POST - Create finance record
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = financeSchema.parse(body)

    const finance = await prisma.finance.create({
      data: {
        ...validatedData,
        date: validatedData.date ? new Date(validatedData.date) : new Date(),
      },
    })

    return NextResponse.json(
      { message: 'تم إضافة السجل المالي بنجاح', finance },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating finance record:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة السجل المالي' },
      { status: 500 }
    )
  }
}
