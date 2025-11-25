export interface Coordinates {
  lat: number
  lng: number
}

export interface PlaceDetails {
  name: string
  address: string
  coordinates: Coordinates
  placeId: string
}

export class GoogleMapsService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  }

  async geocodeAddress(address: string): Promise<Coordinates | null> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${this.apiKey}`
      )

      const data = await response.json()

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location
        return {
          lat: location.lat,
          lng: location.lng,
        }
      }

      return null
    } catch (error) {
      console.error('Geocoding error:', error)
      return null
    }
  }

  async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`
      )

      const data = await response.json()

      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address
      }

      return null
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      return null
    }
  }

  async searchPlaces(query: string, location?: Coordinates): Promise<PlaceDetails[]> {
    try {
      let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${this.apiKey}`

      if (location) {
        url += `&location=${location.lat},${location.lng}&radius=5000`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (data.status === 'OK') {
        return data.results.map((place: any) => ({
          name: place.name,
          address: place.formatted_address,
          coordinates: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          },
          placeId: place.place_id,
        }))
      }

      return []
    } catch (error) {
      console.error('Places search error:', error)
      return []
    }
  }

  getStaticMapUrl(lat: number, lng: number, zoom: number = 15): string {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&markers=color:red%7C${lat},${lng}&key=${this.apiKey}`
  }

  getDirectionsUrl(origin: Coordinates, destination: Coordinates): string {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`
  }
}

export const googleMapsService = new GoogleMapsService()
