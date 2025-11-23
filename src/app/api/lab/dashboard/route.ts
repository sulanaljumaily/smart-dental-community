import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'LAB') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const labProfile = await prisma.labProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        user: true,
      },
    })

    if (!labProfile) {
      return NextResponse.json(
        { error: 'الملف الشخصي غير موجود' },
        { status: 404 }
      )
    }

    // Get statistics
    const [
      totalOrders,
      pendingOrders,
      inProgressOrders,
      readyOrders,
      deliveredOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.labOrder.count({
        where: { labId: labProfile.id },
      }),
      prisma.labOrder.count({
        where: { labId: labProfile.id, status: 'PENDING' },
      }),
      prisma.labOrder.count({
        where: { labId: labProfile.id, status: 'IN_PROGRESS' },
      }),
      prisma.labOrder.count({
        where: { labId: labProfile.id, status: 'READY' },
      }),
      prisma.labOrder.count({
        where: { labId: labProfile.id, status: 'DELIVERED' },
      }),
      prisma.labOrder.aggregate({
        where: {
          labId: labProfile.id,
          paymentStatus: 'PAID',
        },
        _sum: { amount: true },
      }),
    ])

    // Get recent orders
    const recentOrders = await prisma.labOrder.findMany({
      where: { labId: labProfile.id },
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        plan: {
          include: {
            patient: {
              select: {
                id: true,
                name: true,
                phone: true,
              },
            },
            treatment: {
              select: {
                name: true,
                type: true,
              },
            },
          },
        },
        deliveryStaff: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Get delivery staff
    const deliveryStaff = await prisma.labDeliveryStaff.findMany({
      where: { labId: labProfile.id },
    })

    // Get unread messages
    const unreadMessages = await prisma.message.count({
      where: {
        receiverId: session.user.id,
        isRead: false,
      },
    })

    const dashboard = {
      lab: labProfile,
      statistics: {
        totalOrders,
        pendingOrders,
        inProgressOrders,
        readyOrders,
        deliveredOrders,
        totalRevenue: totalRevenue._sum.amount || 0,
        unreadMessages,
      },
      recentOrders,
      deliveryStaff,
    }

    return NextResponse.json({ dashboard })
  } catch (error) {
    console.error('Error fetching lab dashboard:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب لوحة التحكم' },
      { status: 500 }
    )
  }
}
