import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const clinic = await prisma.clinic.findFirst({
      where: {
        bookingLink: params.slug,
        onlineBookingEnabled: true,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        phone: true,
        email: true,
        description: true,
        logo: true,
        coverImage: true,
        specialties: true,
        amenities: true,
        rating: true,
        reviewsCount: true,
        workingHours: true,
        bookingSlotDuration: true,
        maxBookingsPerDay: true,
      },
    })

    if (!clinic) {
      return NextResponse.json(
        { success: false, error: "العيادة غير متاحة للحجز" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      clinic,
    })
  } catch (error) {
    console.error("خطأ في جلب معلومات العيادة:", error)
    return NextResponse.json(
      { success: false, error: "حدث خطأ في جلب معلومات العيادة" },
      { status: 500 }
    )
  }
}
