import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'VENDOR') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const vendorProfile = await prisma.vendorProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        user: true,
      },
    })

    if (!vendorProfile) {
      return NextResponse.json(
        { error: 'الملف الشخصي غير موجود' },
        { status: 404 }
      )
    }

    // Get statistics
    const [totalProducts, activeProducts, totalOrders, pendingOrders, totalRevenue] =
      await Promise.all([
        prisma.product.count({
          where: { vendorId: vendorProfile.id },
        }),
        prisma.product.count({
          where: { vendorId: vendorProfile.id, isActive: true },
        }),
        prisma.order.count({
          where: { vendorId: vendorProfile.id },
        }),
        prisma.order.count({
          where: { vendorId: vendorProfile.id, status: 'Pending' },
        }),
        prisma.order.aggregate({
          where: {
            vendorId: vendorProfile.id,
            paymentStatus: 'PAID',
          },
          _sum: { total: true },
        }),
      ])

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      where: { vendorId: vendorProfile.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Get low stock products
    const lowStockProducts = await prisma.product.findMany({
      where: {
        vendorId: vendorProfile.id,
        stock: { lte: 10 },
      },
      take: 10,
    })

    // Get unread messages
    const unreadMessages = await prisma.message.count({
      where: {
        receiverId: session.user.id,
        isRead: false,
      },
    })

    const dashboard = {
      vendor: vendorProfile,
      statistics: {
        totalProducts,
        activeProducts,
        totalOrders,
        pendingOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        unreadMessages,
      },
      recentOrders,
      lowStockProducts,
    }

    return NextResponse.json({ dashboard })
  } catch (error) {
    console.error('Error fetching vendor dashboard:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب لوحة التحكم' },
      { status: 500 }
    )
  }
}
