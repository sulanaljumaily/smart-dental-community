import { create } from 'zustand'

export interface Booking {
  id: string
  clinicId: string
  clinicName: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  patientName: string
  patientPhone: string
  notes?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
}

interface BookingState {
  bookings: Booking[]
  isDialogOpen: boolean
  selectedClinic: {
    id: string
    name: string
  } | null

  // Actions
  createBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => Promise<void>
  cancelBooking: (bookingId: string) => void
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void
  getBookingsByPatient: (patientPhone: string) => Booking[]
  openBookingDialog: (clinic?: { id: string, name: string }) => void
  closeBookingDialog: () => void
}

export const useBookingStore = create<BookingState>()((set, get) => ({
  bookings: [],
  isDialogOpen: false,
  selectedClinic: null,

  createBooking: async (bookingData) => {
    // محاكاة استدعاء API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }))
  },

  cancelBooking: (bookingId) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' as const }
          : booking
      ),
    }))
  },

  updateBookingStatus: (bookingId, status) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      ),
    }))
  },

  getBookingsByPatient: (patientPhone) => {
    return get().bookings.filter(
      (booking) => booking.patientPhone === patientPhone
    )
  },

  openBookingDialog: (clinic) => {
    set({
      isDialogOpen: true,
      selectedClinic: clinic || null,
    })
  },

  closeBookingDialog: () => {
    set({
      isDialogOpen: false,
      selectedClinic: null,
    })
  },
}))
