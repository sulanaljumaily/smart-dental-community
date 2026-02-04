import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { staffId, newPassword } = await req.json()

    if (!staffId || !newPassword) {
      return NextResponse.json(
        { success: false, error: "معرف الموظف وكلمة المرور الجديدة مطلوبان" },
        { status: 400 }
      )
    }

    // التحقق من قوة كلمة المرور
    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" },
        { status: 400 }
      )
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // تحديث كلمة المرور في قاعدة البيانات
    const updatedUser = await prisma.user.update({
      where: { id: staffId },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    }).catch(() => null)

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "فشل تحديث كلمة المرور" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "تم تحديث كلمة المرور بنجاح",
    })
  } catch (error) {
    console.error("خطأ في تحديث كلمة المرور:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في تحديث كلمة المرور" },
      { status: 500 }
    )
  }
}
