import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { zaincashService } from '@/lib/zaincash'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { transactionId } = await req.json()

    if (!transactionId) {
      return NextResponse.json(
        { error: 'معرف المعاملة مطلوب' },
        { status: 400 }
      )
    }

    const isValid = await zaincashService.verifyPayment(transactionId)

    return NextResponse.json({
      success: isValid,
      message: isValid ? 'الدفع صحيح' : 'الدفع غير صحيح',
    })
  } catch (error) {
    console.error('Payment verify error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التحقق من الدفع' },
      { status: 500 }
    )
  }
}
