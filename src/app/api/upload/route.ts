import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'smart-dental'

    if (!file) {
      return NextResponse.json({ error: 'لم يتم إرفاق ملف' }, { status: 400 })
    }

    const result = await uploadToCloudinary(file, folder)

    return NextResponse.json({
      message: 'تم رفع الملف بنجاح',
      url: result.url,
      publicId: result.publicId,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء رفع الملف' },
      { status: 500 }
    )
  }
}
