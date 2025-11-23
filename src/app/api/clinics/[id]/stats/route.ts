import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const [
      totalPatients,
      totalAppointments,
      todayAppointments,
      pendingAppointments,
      totalRevenue,
      totalExpenses,
      lowStockItems,
      activeTreatmentPlans,
      pendingLabOrders,
    ] = await Promise.all([
      // Total patients
      prisma.patient.count({ where: { clinicId: params.id } }),

      // Total appointments
      prisma.appointment.count({ where: { clinicId: params.id } }),

      // Today's appointments
      prisma.appointment.count({
        where: {
          clinicId: params.id,
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      }),

      // Pending appointments
      prisma.appointment.count({
        where: {
          clinicId: params.id,
          status: 'PENDING',
        },
      }),

      // Total revenue
      prisma.finance.aggregate({
        where: { clinicId: params.id, type: 'Revenue' },
        _sum: { amount: true },
      }),

      // Total expenses
      prisma.finance.aggregate({
        where: { clinicId: params.id, type: 'Expense' },
        _sum: { amount: true },
      }),

      // Low stock items
      prisma.inventoryItem.count({
        where: {
          clinicId: params.id,
          quantity: { lte: prisma.inventoryItem.fields.minQuantity },
        },
      }),

      // Active treatment plans
      prisma.treatmentPlan.count({
        where: {
          patient: { clinicId: params.id },
          progress: { lt: 100 },
        },
      }),

      // Pending lab orders
      prisma.labOrder.count({
        where: {
          clinicId: params.id,
          status: { in: ['PENDING', 'ACCEPTED', 'IN_PROGRESS'] },
        },
      }),
    ])

    const stats = {
      patients: {
        total: totalPatients,
      },
      appointments: {
        total: totalAppointments,
        today: todayAppointments,
        pending: pendingAppointments,
      },
      finances: {
        revenue: totalRevenue._sum.amount || 0,
        expenses: totalExpenses._sum.amount || 0,
        profit: (totalRevenue._sum.amount || 0) - (totalExpenses._sum.amount || 0),
      },
      inventory: {
        lowStock: lowStockItems,
      },
      treatments: {
        active: activeTreatmentPlans,
      },
      labOrders: {
        pending: pendingLabOrders,
      },
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Error fetching clinic stats:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الإحصائيات' },
      { status: 500 }
    )
  }
}
