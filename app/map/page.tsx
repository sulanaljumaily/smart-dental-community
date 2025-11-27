"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  Phone,
  Calendar,
  Navigation,
  Search,
  Filter,
  Loader2,
  Building2,
  CheckCircle,
  Clock,
} from "lucide-react"

interface Clinic {
  id: string
  name: string
  address?: string
  city?: string
  phone?: string
  description?: string
  logo?: string
  specialties: string[]
  amenities: string[]
  rating: number
  reviewsCount: number
  latitude?: number
  longitude?: number
  bookingLink?: string
  onlineBookingEnabled: boolean
  workingHours: any
}

export default function InteractiveMapPage() {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)

  const [clinics, setClinics] = useState<Clinic[]>([])
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const cities = [
    "بغداد",
    "البصرة",
    "أربيل",
    "الموصل",
    "النجف",
    "كربلاء",
    "السليمانية",
    "دهوك",
  ]

  useEffect(() => {
    fetchClinics()
    getUserLocation()
  }, [])

  useEffect(() => {
    filterClinics()
  }, [searchQuery, selectedCity, clinics])

  const fetchClinics = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      const mockClinics: Clinic[] = [
        {
          id: "1",
          name: "عيادة النجوم لطب الأسنان",
          address: "شارع الأطباء، حي المنصور",
          city: "بغداد",
          phone: "07701234567",
          description: "عيادة متخصصة في جميع علاجات الأسنان والتجميل",
          logo: "/clinic-logo.jpg",
          specialties: ["تجميل الأسنان", "تقويم", "زراعة"],
          amenities: ["مواقف سيارات", "مهيأة لذوي الاحتياجات الخاصة"],
          rating: 4.8,
          reviewsCount: 127,
          latitude: 33.3152,
          longitude: 44.3661,
          bookingLink: "clinic-najoom",
          onlineBookingEnabled: true,
          workingHours: {},
        },
        {
          id: "2",
          name: "مركز الإبتسامة الطبي",
          address: "شارع الجامعة، الكرادة",
          city: "بغداد",
          phone: "07709876543",
          description: "مركز طبي متكامل لعلاج وتجميل الأسنان",
          logo: "/clinic-logo.jpg",
          specialties: ["علاج عصب", "تبييض", "تنظيف"],
          amenities: ["تأمين صحي", "حالات طارئة"],
          rating: 4.6,
          reviewsCount: 89,
          latitude: 33.3395,
          longitude: 44.4009,
          bookingLink: "clinic-smile",
          onlineBookingEnabled: true,
          workingHours: {},
        },
        {
          id: "3",
          name: "عيادة الرعاية المتقدمة",
          address: "شارع الرشيد، البصرة",
          city: "البصرة",
          phone: "07801234567",
          description: "أحدث التقنيات في علاج وتجميل الأسنان",
          logo: "/clinic-logo.jpg",
          specialties: ["زراعة متقدمة", "جراحة الفم", "تقويم"],
          amenities: ["مواقف سيارات", "wifi مجاني"],
          rating: 4.9,
          reviewsCount: 156,
          latitude: 30.5085,
          longitude: 47.7835,
          bookingLink: "clinic-care",
          onlineBookingEnabled: true,
          workingHours: {},
        },
      ]

      setClinics(mockClinics)
      setFilteredClinics(mockClinics)
    } catch (error) {
      console.error("Error fetching clinics:", error)
    } finally {
      setLoading(false)
    }
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          // Default to Baghdad coordinates
          setUserLocation({ lat: 33.3152, lng: 44.3661 })
        }
      )
    } else {
      // Default to Baghdad coordinates
      setUserLocation({ lat: 33.3152, lng: 44.3661 })
    }
  }

  const filterClinics = () => {
    let filtered = clinics

    if (searchQuery) {
      filtered = filtered.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          clinic.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCity) {
      filtered = filtered.filter((clinic) => clinic.city === selectedCity)
    }

    setFilteredClinics(filtered)
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const handleBooking = (clinic: Clinic) => {
    if (clinic.bookingLink && clinic.onlineBookingEnabled) {
      router.push(`/booking/${clinic.bookingLink}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">جاري تحميل العيادات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">الخريطة التفاعلية للعيادات</h1>
              <p className="text-muted-foreground">
                اعثر على أقرب عيادة أسنان واحجز موعدك بسهولة
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {filteredClinics.length} عيادة متاحة
            </Badge>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="ابحث عن عيادة أو تخصص..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">جميع المدن</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <Card
              key={clinic.id}
              className="bento-card hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedClinic(clinic)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  {clinic.logo ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
                      <img
                        src={clinic.logo}
                        alt={clinic.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-1 truncate">{clinic.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">{clinic.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({clinic.reviewsCount})
                        </span>
                      </div>
                      {clinic.onlineBookingEnabled && (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle className="w-3 h-3 ml-1" />
                          حجز رقمي
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {clinic.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {clinic.description}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  {clinic.address && (
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{clinic.address}</span>
                    </div>
                  )}
                  {clinic.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span dir="ltr">{clinic.phone}</span>
                    </div>
                  )}
                  {userLocation && clinic.latitude && clinic.longitude && (
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation className="w-4 h-4 text-primary" />
                      <span>
                        على بعد{" "}
                        {calculateDistance(
                          userLocation.lat,
                          userLocation.lng,
                          clinic.latitude,
                          clinic.longitude
                        ).toFixed(1)}{" "}
                        كم
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {clinic.specialties.slice(0, 3).map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {clinic.specialties.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{clinic.specialties.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  {clinic.onlineBookingEnabled && clinic.bookingLink ? (
                    <Button
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBooking(clinic)
                      }}
                    >
                      <Calendar className="w-4 h-4 ml-2" />
                      احجز الآن
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={`tel:${clinic.phone}`} onClick={(e) => e.stopPropagation()}>
                        <Phone className="w-4 h-4 ml-2" />
                        اتصل الآن
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClinics.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-24 h-24 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-2xl font-bold mb-2">لا توجد عيادات</h3>
            <p className="text-muted-foreground">
              لم نتمكن من العثور على عيادات تطابق معايير البحث
            </p>
          </div>
        )}
      </div>

      {/* Selected Clinic Modal */}
      {selectedClinic && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedClinic(null)}
        >
          <Card
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {selectedClinic.logo ? (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                      <img
                        src={selectedClinic.logo}
                        alt={selectedClinic.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Building2 className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-2xl mb-2">{selectedClinic.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{selectedClinic.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({selectedClinic.reviewsCount} تقييم)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedClinic(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedClinic.description && (
                <div>
                  <h4 className="font-semibold mb-2">عن العيادة</h4>
                  <p className="text-muted-foreground">{selectedClinic.description}</p>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">معلومات الاتصال</h4>
                <div className="space-y-2">
                  {selectedClinic.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <span>{selectedClinic.address}</span>
                    </div>
                  )}
                  {selectedClinic.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      <span dir="ltr">{selectedClinic.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">التخصصات</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedClinic.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedClinic.amenities.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">المرافق المتاحة</h4>
                  <ul className="space-y-1">
                    {selectedClinic.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                {selectedClinic.onlineBookingEnabled && selectedClinic.bookingLink ? (
                  <Button className="flex-1" onClick={() => handleBooking(selectedClinic)}>
                    <Calendar className="w-4 h-4 ml-2" />
                    احجز موعد الآن
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={`tel:${selectedClinic.phone}`}>
                      <Phone className="w-4 h-4 ml-2" />
                      اتصل الآن
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
