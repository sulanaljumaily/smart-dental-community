import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Check role-based access
    if (path.startsWith('/dentist') && token?.role !== 'DENTIST') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    if (path.startsWith('/vendor') && token?.role !== 'VENDOR') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    if (path.startsWith('/lab') && token?.role !== 'LAB') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    if (path.startsWith('/platform-admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    if (path.startsWith('/clinic') && token?.role !== 'DENTIST') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/dentist/:path*',
    '/vendor/:path*',
    '/lab/:path*',
    '/platform-admin/:path*',
    '/clinic/:path*',
  ],
}
