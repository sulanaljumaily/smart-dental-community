import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'DENTIST' | 'CLINIC_STAFF' | 'VENDOR' | 'LAB' | 'ADMIN' | 'PATIENT'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  avatar?: string
  clinics?: Array<{
    id: string
    name: string
  }>
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (email: string, password: string, role?: UserRole) => Promise<void>
  quickDemo: (role: UserRole) => Promise<void>
  logout: () => void
  updateUser: (user: Partial<User>) => void
  setError: (error: string | null) => void
  clearError: () => void
}

// بيانات تجريبية للمستخدمين
const demoUsers: Record<UserRole, User> = {
  DENTIST: {
    id: 'dentist-1',
    name: 'د. محمد أحمد',
    email: 'dentist@demo.com',
    phone: '+964 770 123 4567',
    role: 'DENTIST',
    avatar: '',
    clinics: [
      { id: 'clinic-1', name: 'عيادة النور لطب الأسنان' },
      { id: 'clinic-2', name: 'مركز الابتسامة الطبي' },
      { id: 'clinic-3', name: 'عيادة الأمل' },
    ],
  },
  CLINIC_STAFF: {
    id: 'staff-1',
    name: 'سارة علي',
    email: 'staff@demo.com',
    phone: '+964 770 234 5678',
    role: 'CLINIC_STAFF',
    avatar: '',
    clinics: [
      { id: 'clinic-1', name: 'عيادة النور لطب الأسنان' },
    ],
  },
  VENDOR: {
    id: 'vendor-1',
    name: 'شركة الطب الحديث',
    email: 'vendor@demo.com',
    phone: '+964 770 345 6789',
    role: 'VENDOR',
    avatar: '',
  },
  LAB: {
    id: 'lab-1',
    name: 'معمل الدقة لطب الأسنان',
    email: 'lab@demo.com',
    phone: '+964 770 456 7890',
    role: 'LAB',
    avatar: '',
  },
  ADMIN: {
    id: 'admin-1',
    name: 'مدير المنصة',
    email: 'admin@demo.com',
    phone: '+964 770 567 8901',
    role: 'ADMIN',
    avatar: '',
  },
  PATIENT: {
    id: 'patient-1',
    name: 'أحمد خالد',
    email: 'patient@demo.com',
    phone: '+964 770 678 9012',
    role: 'PATIENT',
    avatar: '',
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string, role?: UserRole) => {
        set({ isLoading: true, error: null })

        try {
          // محاكاة استدعاء API
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // في الوضع التجريبي، نتحقق من البريد الإلكتروني والدور
          let user: User | null = null

          if (role) {
            user = demoUsers[role]
          } else {
            // البحث عن المستخدم بناءً على البريد الإلكتروني
            const foundUser = Object.values(demoUsers).find(u => u.email === email)
            if (foundUser) {
              user = foundUser
            }
          }

          if (user) {
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } else {
            set({
              error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
              isLoading: false,
            })
          }
        } catch (error) {
          set({
            error: 'حدث خطأ أثناء تسجيل الدخول',
            isLoading: false,
          })
        }
      },

      quickDemo: async (role: UserRole) => {
        set({ isLoading: true, error: null })

        try {
          // محاكاة تحميل سريع
          await new Promise((resolve) => setTimeout(resolve, 500))

          const user = demoUsers[role]

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error) {
          set({
            error: 'حدث خطأ أثناء تسجيل الدخول السريع',
            isLoading: false,
          })
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        })
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }))
      },

      setError: (error: string | null) => {
        set({ error })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
