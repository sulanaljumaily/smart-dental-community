import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    // Get overall statistics
    const [
      totalUsers,
      totalDentists,
      totalVendors,
      totalLabs,
      totalClinics,
      totalPatients,
      totalAppointments,
      totalOrders,
      totalLabOrders,
      pendingVendors,
      pendingLabs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'DENTIST' } }),
      prisma.user.count({ where: { role: 'VENDOR' } }),
      prisma.user.count({ where: { role: 'LAB' } }),
      prisma.clinic.count(),
      prisma.patient.count(),
      prisma.appointment.count(),
      prisma.order.count(),
      prisma.labOrder.count(),
      prisma.vendorProfile.count({ where: { isApproved: false } }),
      prisma.labProfile.count({ where: { isApproved: false } }),
    ])

    // Get revenue statistics
    const [ordersRevenue, labOrdersRevenue] = await Promise.all([
      prisma.order.aggregate({
        where: { paymentStatus: 'PAID' },
        _sum: { platformFee: true, total: true },
      }),
      prisma.labOrder.aggregate({
        where: { paymentStatus: 'PAID' },
        _sum: { amount: true },
      }),
    ])

    // Get recent users
    const recentUsers = await prisma.user.findMany({
      include: {
        dentistProfile: true,
        vendorProfile: true,
        labProfile: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Get pending approvals
    const pendingVendorsList = await prisma.vendorProfile.findMany({
      where: { isApproved: false },
      include: { user: true },
      take: 10,
    })

    const pendingLabsList = await prisma.labProfile.findMany({
      where: { isApproved: false },
      include: { user: true },
      take: 10,
    })

    // Get active jobs
    const activeJobs = await prisma.job.count({
      where: { status: 'ACTIVE' },
    })

    // Get community posts
    const totalPosts = await prisma.post.count()

    const dashboard = {
      statistics: {
        users: {
          total: totalUsers,
          dentists: totalDentists,
          vendors: totalVendors,
          labs: totalLabs,
        },
        clinics: totalClinics,
        patients: totalPatients,
        appointments: totalAppointments,
        marketplace: {
          totalOrders,
          totalRevenue: ordersRevenue._sum.total || 0,
          platformRevenue: ordersRevenue._sum.platformFee || 0,
        },
        labs: {
          totalOrders: totalLabOrders,
          totalRevenue: labOrdersRevenue._sum.amount || 0,
        },
        community: {
          totalPosts,
          activeJobs,
        },
        pending: {
          vendors: pendingVendors,
          labs: pendingLabs,
        },
      },
      recentUsers,
      pendingApprovals: {
        vendors: pendingVendorsList,
        labs: pendingLabsList,
      },
    }

    return NextResponse.json({ dashboard })
  } catch (error) {
    console.error('Error fetching admin dashboard:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب لوحة التحكم' },
      { status: 500 }
    )
  }
}
