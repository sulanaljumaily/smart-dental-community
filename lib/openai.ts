import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface DiagnosisInput {
  symptoms: string
  patientHistory?: string
  teethConditions?: any[]
}

export interface TreatmentRecommendation {
  diagnosis: string
  recommendedTreatments: string[]
  urgency: 'low' | 'medium' | 'high'
  estimatedCost?: string
  notes: string
}

export class OpenAIService {
  async getDentalDiagnosis(input: DiagnosisInput): Promise<TreatmentRecommendation> {
    try {
      const prompt = `
أنت طبيب أسنان خبير. بناءً على المعلومات التالية، قدم تشخيصاً وتوصيات علاجية:

الأعراض: ${input.symptoms}
${input.patientHistory ? `التاريخ الطبي: ${input.patientHistory}` : ''}
${input.teethConditions ? `حالة الأسنان: ${JSON.stringify(input.teethConditions)}` : ''}

قدم استجابة بصيغة JSON تحتوي على:
- diagnosis: التشخيص
- recommendedTreatments: قائمة العلاجات المقترحة
- urgency: درجة الاستعجال (low, medium, high)
- estimatedCost: التكلفة التقديرية بالدينار العراقي
- notes: ملاحظات إضافية
`

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'أنت طبيب أسنان خبير تقدم تشخيصات وتوصيات علاجية دقيقة.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      })

      const result = JSON.parse(completion.choices[0].message.content || '{}')
      return result as TreatmentRecommendation
    } catch (error) {
      console.error('OpenAI diagnosis error:', error)
      throw new Error('فشل الحصول على التشخيص الذكي')
    }
  }

  async generateTreatmentPlan(
    diagnosis: string,
    patientInfo: any
  ): Promise<string> {
    try {
      const prompt = `
بناءً على التشخيص التالي: ${diagnosis}

ومعلومات المريض:
${JSON.stringify(patientInfo, null, 2)}

قم بإنشاء خطة علاجية مفصلة تتضمن:
1. خطوات العلاج المقترحة
2. عدد الجلسات المتوقعة
3. المدة الزمنية
4. التوصيات للمريض
`

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'أنت طبيب أسنان خبير تقوم بإنشاء خطط علاجية مفصلة.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      })

      return completion.choices[0].message.content || ''
    } catch (error) {
      console.error('OpenAI treatment plan error:', error)
      throw new Error('فشل إنشاء الخطة العلاجية')
    }
  }

  async analyzeDentalImage(imageUrl: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'قم بتحليل هذه الصورة السنية وقدم ملاحظاتك المهنية حول أي مشاكل قد تراها.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      })

      return completion.choices[0].message.content || ''
    } catch (error) {
      console.error('OpenAI image analysis error:', error)
      throw new Error('فشل تحليل الصورة')
    }
  }
}

export const openaiService = new OpenAIService()
