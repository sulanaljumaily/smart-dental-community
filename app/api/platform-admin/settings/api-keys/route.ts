import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    // جلب مفاتيح API من قاعدة البيانات
    const apiKeys = await prisma.apiKeys.findFirst().catch(() => null)

    if (!apiKeys) {
      // إرجاع قيم فارغة للأمان
      return NextResponse.json({
        success: true,
        apiKeys: {
          googleMapsKey: "",
          openaiKey: "",
          stripeKey: "",
          cloudinaryKey: "",
        },
      })
    }

    return NextResponse.json({
      success: true,
      apiKeys: {
        googleMapsKey: apiKeys.googleMapsKey || "",
        openaiKey: apiKeys.openaiKey ? "sk-**********************" : "",
        stripeKey: apiKeys.stripeKey ? "pk-**********************" : "",
        cloudinaryKey: apiKeys.cloudinaryKey || "",
      },
    })
  } catch (error) {
    console.error("خطأ في جلب مفاتيح API:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في جلب المفاتيح" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { googleMapsKey, openaiKey, stripeKey, cloudinaryKey } = body

    // TODO: إضافة مصادقة للتأكد من أن المستخدم هو مسؤول المنصة

    // تحديث أو إنشاء مفاتيح API
    const apiKeys = await prisma.apiKeys.upsert({
      where: { id: "default" },
      update: {
        googleMapsKey: googleMapsKey || undefined,
        openaiKey: openaiKey || undefined,
        stripeKey: stripeKey || undefined,
        cloudinaryKey: cloudinaryKey || undefined,
        updatedAt: new Date(),
      },
      create: {
        id: "default",
        googleMapsKey,
        openaiKey,
        stripeKey,
        cloudinaryKey,
      },
    }).catch((error) => {
      console.error("خطأ في حفظ مفاتيح API:", error)
      return null
    })

    if (!apiKeys) {
      return NextResponse.json(
        { success: false, error: "فشل حفظ المفاتيح" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "تم حفظ مفاتيح API بنجاح",
    })
  } catch (error) {
    console.error("خطأ في حفظ مفاتيح API:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في حفظ المفاتيح" },
      { status: 500 }
    )
  }
}
