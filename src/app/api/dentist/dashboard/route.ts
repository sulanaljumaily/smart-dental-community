import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    // Check if user is staff member
    const isStaff = (session.user as any).isStaff
    const staffClinicId = (session.user as any).clinicId

    let clinics = []

    if (isStaff && staffClinicId) {
      // Staff member - get only their clinic
      const clinic = await prisma.clinic.findUnique({
        where: { id: staffClinicId },
        include: {
          owner: {
            include: {
              user: true,
            },
          },
          _count: {
            select: {
              patients: true,
              appointments: true,
              staff: true,
            },
          },
        },
      })

      if (clinic) {
        clinics = [clinic]
      }
    } else {
      // Clinic owner - get all their clinics
      const dentistProfile = await prisma.dentistProfile.findUnique({
        where: { userId: session.user.id },
      })

      if (dentistProfile) {
        clinics = await prisma.clinic.findMany({
          where: { ownerId: dentistProfile.id },
          include: {
            owner: {
              include: {
                user: true,
              },
            },
            _count: {
              select: {
                patients: true,
                appointments: true,
                staff: true,
              },
            },
          },
        })
      }
    }

    // Get statistics for all accessible clinics
    const clinicIds = clinics.map((c) => c.id)

    const [
      totalPatients,
      todayAppointments,
      pendingTasks,
      unreadMessages,
      unreadNotifications,
      lowStockItems,
    ] = await Promise.all([
      prisma.patient.count({
        where: { clinicId: { in: clinicIds } },
      }),
      prisma.appointment.count({
        where: {
          clinicId: { in: clinicIds },
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      }),
      prisma.task.count({
        where: {
          clinicId: { in: clinicIds },
          status: 'PENDING',
        },
      }),
      prisma.message.count({
        where: {
          receiverId: session.user.id,
          isRead: false,
        },
      }),
      prisma.notification.count({
        where: {
          userId: session.user.id,
          isRead: false,
        },
      }),
      prisma.inventoryItem.count({
        where: {
          clinicId: { in: clinicIds },
          quantity: { lte: prisma.inventoryItem.fields.minQuantity },
        },
      }),
    ])

    // Get recent notifications with clinic details
    const recentNotifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
        clinicId: { in: clinicIds },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Get recent tasks with clinic details
    const recentTasks = await prisma.task.findMany({
      where: {
        clinicId: { in: clinicIds },
        OR: [
          { createdById: session.user.id },
          { assignedToId: session.user.id },
        ],
      },
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Get recent messages with clinic context
    const recentMessages = await prisma.message.findMany({
      where: {
        receiverId: session.user.id,
        clinicId: { in: clinicIds },
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    const dashboard = {
      clinics,
      statistics: {
        totalClinics: clinics.length,
        totalPatients,
        todayAppointments,
        pendingTasks,
        unreadMessages,
        unreadNotifications,
        lowStockItems,
      },
      recentNotifications,
      recentTasks,
      recentMessages,
      isStaff,
      staffClinicId,
    }

    return NextResponse.json({ dashboard })
  } catch (error) {
    console.error('Error fetching dashboard:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب لوحة التحكم' },
      { status: 500 }
    )
  }
}
