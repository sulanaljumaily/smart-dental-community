import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    // جلب معلومات المنصة من قاعدة البيانات
    const settings = await prisma.platformSettings.findFirst().catch(() => null)

    if (!settings) {
      // إرجاع قيم افتراضية
      return NextResponse.json({
        success: true,
        settings: {
          name: "المجتمع الطبي السني الذكي",
          nameEn: "Smart Dental Community",
          version: "1.0.0",
          email: "info@smartdental.iq",
          phone: "+964 XXX XXX XXXX",
          address: "بغداد، العراق",
        },
      })
    }

    return NextResponse.json({
      success: true,
      settings,
    })
  } catch (error) {
    console.error("خطأ في جلب معلومات المنصة:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في جلب المعلومات" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, nameEn, version, email, phone, address } = body

    // التحقق من البيانات المطلوبة
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "الاسم والبريد الإلكتروني مطلوبان" },
        { status: 400 }
      )
    }

    // تحديث أو إنشاء إعدادات المنصة
    const settings = await prisma.platformSettings.upsert({
      where: { id: "default" },
      update: {
        name,
        nameEn,
        version,
        email,
        phone,
        address,
        updatedAt: new Date(),
      },
      create: {
        id: "default",
        name,
        nameEn,
        version,
        email,
        phone,
        address,
      },
    }).catch((error) => {
      console.error("خطأ في حفظ الإعدادات:", error)
      return null
    })

    if (!settings) {
      return NextResponse.json(
        { success: false, error: "فشل حفظ الإعدادات" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "تم حفظ معلومات المنصة بنجاح",
      settings,
    })
  } catch (error) {
    console.error("خطأ في حفظ معلومات المنصة:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في حفظ المعلومات" },
      { status: 500 }
    )
  }
}
