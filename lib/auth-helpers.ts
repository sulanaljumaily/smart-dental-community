/**
 * دوال مساعدة للمصادقة والتحقق من الصلاحيات
 */

import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth"
import { UserRole } from "@prisma/client"
import { NextRequest } from "next/server"

/**
 * الحصول على جلسة المستخدم الحالية
 */
export async function getCurrentSession() {
  return await getServerSession(authOptions)
}

/**
 * الحصول على معلومات المستخدم الحالي
 */
export async function getCurrentUser() {
  const session = await getCurrentSession()
  return session?.user || null
}

/**
 * التحقق من تسجيل دخول المستخدم
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

/**
 * التحقق من أن المستخدم لديه دور معين
 */
export async function hasRole(role: UserRole | UserRole[]): Promise<boolean> {
  const user = await getCurrentUser()

  if (!user) return false

  if (Array.isArray(role)) {
    return role.includes(user.role)
  }

  return user.role === role
}

/**
 * التحقق من أن المستخدم هو مسؤول المنصة
 */
export async function isAdmin(): Promise<boolean> {
  return await hasRole("ADMIN")
}

/**
 * التحقق من أن المستخدم طبيب أسنان
 */
export async function isDentist(): Promise<boolean> {
  return await hasRole("DENTIST")
}

/**
 * التحقق من أن المستخدم مورد
 */
export async function isVendor(): Promise<boolean> {
  return await hasRole("VENDOR")
}

/**
 * التحقق من أن المستخدم مختبر
 */
export async function isLab(): Promise<boolean> {
  return await hasRole("LAB")
}

/**
 * التحقق من الصلاحيات والحصول على المستخدم
 * يطرح خطأ 401 إذا لم يكن مسجلاً
 * يطرح خطأ 403 إذا لم يملك الدور المطلوب
 */
export async function requireAuth(options?: {
  role?: UserRole | UserRole[]
  throwOnUnauthorized?: boolean
}) {
  const user = await getCurrentUser()

  if (!user) {
    if (options?.throwOnUnauthorized !== false) {
      throw new Error("Unauthorized: يجب تسجيل الدخول أولاً")
    }
    return null
  }

  if (options?.role) {
    const roles = Array.isArray(options.role) ? options.role : [options.role]

    if (!roles.includes(user.role)) {
      if (options?.throwOnUnauthorized !== false) {
        throw new Error("Forbidden: ليس لديك صلاحية للوصول لهذا المورد")
      }
      return null
    }
  }

  return user
}

/**
 * التحقق من صلاحيات مسؤول المنصة
 */
export async function requireAdmin() {
  return await requireAuth({
    role: "ADMIN",
    throwOnUnauthorized: true,
  })
}

/**
 * التحقق من صلاحيات الطبيب
 */
export async function requireDentist() {
  return await requireAuth({
    role: "DENTIST",
    throwOnUnauthorized: true,
  })
}

/**
 * التحقق من صلاحيات المورد
 */
export async function requireVendor() {
  return await requireAuth({
    role: "VENDOR",
    throwOnUnauthorized: true,
  })
}

/**
 * التحقق من صلاحيات المختبر
 */
export async function requireLab() {
  return await requireAuth({
    role: "LAB",
    throwOnUnauthorized: true,
  })
}

/**
 * التحقق من الصلاحيات لعدة أدوار
 */
export async function requireAnyRole(roles: UserRole[]) {
  return await requireAuth({
    role: roles,
    throwOnUnauthorized: true,
  })
}

/**
 * استخراج رمز Bearer من headers
 */
export function extractBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")

  if (!authHeader) return null

  const parts = authHeader.split(" ")

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null
  }

  return parts[1]
}

/**
 * التحقق من API key
 */
export function verifyApiKey(apiKey: string): boolean {
  const validApiKey = process.env.API_KEY

  if (!validApiKey) {
    console.warn("لم يتم تكوين API_KEY في متغيرات البيئة")
    return false
  }

  return apiKey === validApiKey
}
