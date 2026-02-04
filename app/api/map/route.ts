import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const radius = searchParams.get("radius") || "50" // Default 50km radius

    // Build where condition
    const whereCondition: any = {
      isActive: true,
      showOnMap: true,
      onlineBookingEnabled: true,
      // Only show clinics with active paid subscriptions
      subscriptions: {
        some: {
          isActive: true,
          endDate: {
            gte: new Date(),
          },
          plan: {
            allowMapDisplay: true,
            allowOnlineBooking: true,
          },
        },
      },
    }

    if (city) {
      whereCondition.city = city
    }

    // Get clinics
    const clinics = await prisma.clinic.findMany({
      where: whereCondition,
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
        latitude: true,
        longitude: true,
        bookingLink: true,
        onlineBookingEnabled: true,
        workingHours: true,
        subscriptions: {
          where: {
            isActive: true,
            endDate: {
              gte: new Date(),
            },
          },
          select: {
            plan: {
              select: {
                name: true,
                type: true,
              },
            },
          },
        },
      },
      orderBy: {
        rating: "desc",
      },
    })

    // Filter by distance if coordinates provided
    let filteredClinics = clinics

    if (lat && lng) {
      const userLat = parseFloat(lat)
      const userLng = parseFloat(lng)
      const maxRadius = parseFloat(radius)

      filteredClinics = clinics.filter((clinic) => {
        if (!clinic.latitude || !clinic.longitude) return false

        const distance = calculateDistance(
          userLat,
          userLng,
          clinic.latitude,
          clinic.longitude
        )

        return distance <= maxRadius
      })

      // Sort by distance
      filteredClinics.sort((a, b) => {
        const distA = calculateDistance(
          userLat,
          userLng,
          a.latitude!,
          a.longitude!
        )
        const distB = calculateDistance(
          userLat,
          userLng,
          b.latitude!,
          b.longitude!
        )
        return distA - distB
      })
    }

    return NextResponse.json(
      {
        success: true,
        clinics: filteredClinics,
        count: filteredClinics.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching clinics for map:", error)
    return NextResponse.json(
      { message: "حدث خطأ أثناء جلب العيادات" },
      { status: 500 }
    )
  }
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180
}
