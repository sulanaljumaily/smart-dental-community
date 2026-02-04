import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { staffId, permissions } = await req.json()

    if (!staffId || !permissions) {
      return NextResponse.json(
        { success: false, error: "معرف الموظف والصلاحيات مطلوبان" },
        { status: 400 }
      )
    }

    // تحديث الصلاحيات في قاعدة البيانات
    const updatedStaff = await prisma.clinicStaff.update({
      where: { id: staffId },
      data: {
        permissions,
        updatedAt: new Date(),
      },
    }).catch(() => null)

    if (!updatedStaff) {
      return NextResponse.json(
        { success: false, error: "فشل تحديث الصلاحيات" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "تم تحديث الصلاحيات بنجاح",
    })
  } catch (error) {
    console.error("خطأ في تحديث الصلاحيات:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في تحديث الصلاحيات" },
      { status: 500 }
    )
  }
}
