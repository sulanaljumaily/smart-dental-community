import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const clinic = await prisma.clinic.findUnique({
      where: {
        bookingLink: slug,
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
        languages: true,
        rating: true,
        reviewsCount: true,
        workingHours: true,
        onlineBookingEnabled: true,
        bookingSlotDuration: true,
        maxBookingsPerDay: true,
        latitude: true,
        longitude: true,
      },
    })

    if (!clinic) {
      return NextResponse.json(
        { message: "العيادة غير موجودة" },
        { status: 404 }
      )
    }

    // Check if online booking is enabled
    if (!clinic.onlineBookingEnabled) {
      return NextResponse.json(
        {
          ...clinic,
          message: "الحجز الرقمي غير مفعل لهذه العيادة",
        },
        { status: 200 }
      )
    }

    return NextResponse.json(clinic, { status: 200 })
  } catch (error) {
    console.error("Error fetching clinic:", error)
    return NextResponse.json(
      { message: "حدث خطأ في الخادم" },
      { status: 500 }
    )
  }
}
