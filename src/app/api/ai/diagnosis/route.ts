import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { openaiService } from '@/lib/openai'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const diagnosisSchema = z.object({
  symptoms: z.string().min(10),
  patientId: z.string(),
  patientHistory: z.string().optional(),
  teethConditions: z.any().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'DENTIST') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = diagnosisSchema.parse(body)

    // Check AI credits
    const dentistProfile = await prisma.dentistProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (!dentistProfile) {
      return NextResponse.json(
        { error: 'الملف الشخصي غير موجود' },
        { status: 404 }
      )
    }

    if (dentistProfile.aiCreditsUsed >= dentistProfile.maxAiCredits) {
      return NextResponse.json(
        { error: 'لقد استنفدت رصيد الذكاء الاصطناعي. يرجى الترقية للحصول على المزيد.' },
        { status: 403 }
      )
    }

    const diagnosis = await openaiService.getDentalDiagnosis(validatedData)

    // Increment AI credits used
    await prisma.dentistProfile.update({
      where: { userId: session.user.id },
      data: {
        aiCreditsUsed: { increment: 1 },
      },
    })

    return NextResponse.json({
      message: 'تم الحصول على التشخيص الذكي بنجاح',
      diagnosis,
      creditsRemaining: dentistProfile.maxAiCredits - dentistProfile.aiCreditsUsed - 1,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('AI diagnosis error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء الحصول على التشخيص' },
      { status: 500 }
    )
  }
}
