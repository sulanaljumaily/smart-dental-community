import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const notificationId = searchParams.get("id")

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: "معرف الإشعار مطلوب" },
        { status: 400 }
      )
    }

    // حذف الإشعار
    await prisma.notification.delete({
      where: { id: notificationId },
    }).catch(() => null)

    return NextResponse.json({
      success: true,
      message: "تم حذف الإشعار بنجاح",
    })
  } catch (error) {
    console.error("خطأ في حذف الإشعار:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في حذف الإشعار" },
      { status: 500 }
    )
  }
}
