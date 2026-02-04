// @ts-nocheck
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import prisma from './prisma'
import { UserRole } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('البريد الإلكتروني وكلمة المرور مطلوبان')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            dentistProfile: true,
            vendorProfile: true,
            labProfile: true,
          },
        })

        if (!user) {
          throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
        }

        if (!user.isActive) {
          throw new Error('الحساب غير نشط. يرجى التواصل مع الإدارة')
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
          isVerified: user.isVerified,
          profile: user.dentistProfile || user.vendorProfile || user.labProfile,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.avatar = user.avatar
        token.isVerified = user.isVerified
        token.profile = user.profile
      }

      // Handle session update
      if (trigger === 'update' && session) {
        token = { ...token, ...session.user }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.avatar = token.avatar as string | null
        session.user.isVerified = token.isVerified as boolean
        session.user.profile = token.profile as any
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}
