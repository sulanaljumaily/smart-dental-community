import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { zaincashService } from '@/lib/zaincash'
import { z } from 'zod'

const paymentSchema = z.object({
  amount: number(),
  orderId: z.string(),
  serviceType: z.string().default('Dental Services'),
  redirectUrl: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = paymentSchema.parse(body)

    const result = await zaincashService.initializePayment(validatedData)

    return NextResponse.json({
      message: 'تم إنشاء عملية الدفع بنجاح',
      ...result,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Payment init error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء عملية الدفع' },
      { status: 500 }
    )
  }
}
