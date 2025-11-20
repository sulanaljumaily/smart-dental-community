// نظام الصلاحيات الافتراضية لكل دور في العيادة
// Default Permissions System for Each Clinic Role

import { ClinicStaffRole, Permission } from "@prisma/client"

export const ROLE_PERMISSIONS: Record<ClinicStaffRole, Permission[]> = {
  // المالك - صلاحيات كاملة
  OWNER: [
    // المرضى
    Permission.VIEW_PATIENTS,
    Permission.ADD_PATIENTS,
    Permission.EDIT_PATIENTS,
    Permission.DELETE_PATIENTS,

    // المواعيد
    Permission.VIEW_APPOINTMENTS,
    Permission.ADD_APPOINTMENTS,
    Permission.EDIT_APPOINTMENTS,
    Permission.DELETE_APPOINTMENTS,

    // الخطط العلاجية
    Permission.VIEW_TREATMENTS,
    Permission.ADD_TREATMENTS,
    Permission.EDIT_TREATMENTS,
    Permission.DELETE_TREATMENTS,

    // المالية
    Permission.VIEW_FINANCES,
    Permission.ADD_FINANCES,
    Permission.EDIT_FINANCES,
    Permission.DELETE_FINANCES,

    // المخزون
    Permission.VIEW_INVENTORY,
    Permission.ADD_INVENTORY,
    Permission.EDIT_INVENTORY,
    Permission.DELETE_INVENTORY,

    // المختبر
    Permission.VIEW_LAB_ORDERS,
    Permission.ADD_LAB_ORDERS,
    Permission.EDIT_LAB_ORDERS,
    Permission.DELETE_LAB_ORDERS,

    // الطاقم
    Permission.VIEW_STAFF,
    Permission.ADD_STAFF,
    Permission.EDIT_STAFF,
    Permission.DELETE_STAFF,

    // الإعدادات
    Permission.VIEW_SETTINGS,
    Permission.EDIT_SETTINGS,

    // التقارير
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
  ],

  // الطبيب - صلاحيات طبية كاملة
  DENTIST: [
    // المرضى
    Permission.VIEW_PATIENTS,
    Permission.ADD_PATIENTS,
    Permission.EDIT_PATIENTS,

    // المواعيد
    Permission.VIEW_APPOINTMENTS,
    Permission.ADD_APPOINTMENTS,
    Permission.EDIT_APPOINTMENTS,

    // الخطط العلاجية
    Permission.VIEW_TREATMENTS,
    Permission.ADD_TREATMENTS,
    Permission.EDIT_TREATMENTS,

    // المالية
    Permission.VIEW_FINANCES,
    Permission.ADD_FINANCES,

    // المخزون
    Permission.VIEW_INVENTORY,
    Permission.ADD_INVENTORY,

    // المختبر
    Permission.VIEW_LAB_ORDERS,
    Permission.ADD_LAB_ORDERS,
    Permission.EDIT_LAB_ORDERS,

    // التقارير
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
  ],

  // المساعد - صلاحيات مساعدة طبية
  ASSISTANT: [
    // المرضى
    Permission.VIEW_PATIENTS,
    Permission.ADD_PATIENTS,
    Permission.EDIT_PATIENTS,

    // المواعيد
    Permission.VIEW_APPOINTMENTS,
    Permission.ADD_APPOINTMENTS,
    Permission.EDIT_APPOINTMENTS,

    // الخطط العلاجية
    Permission.VIEW_TREATMENTS,

    // المخزون
    Permission.VIEW_INVENTORY,
    Permission.ADD_INVENTORY,

    // المختبر
    Permission.VIEW_LAB_ORDERS,

    // التقارير
    Permission.VIEW_REPORTS,
  ],

  // موظف الاستقبال - صلاحيات إدارية
  RECEPTIONIST: [
    // المرضى
    Permission.VIEW_PATIENTS,
    Permission.ADD_PATIENTS,
    Permission.EDIT_PATIENTS,

    // المواعيد
    Permission.VIEW_APPOINTMENTS,
    Permission.ADD_APPOINTMENTS,
    Permission.EDIT_APPOINTMENTS,
    Permission.DELETE_APPOINTMENTS,

    // المالية
    Permission.VIEW_FINANCES,
    Permission.ADD_FINANCES,

    // التقارير
    Permission.VIEW_REPORTS,
  ],

  // الممرض/ممرضة - صلاحيات تمريضية
  NURSE: [
    // المرضى
    Permission.VIEW_PATIENTS,
    Permission.EDIT_PATIENTS,

    // المواعيد
    Permission.VIEW_APPOINTMENTS,
    Permission.ADD_APPOINTMENTS,
    Permission.EDIT_APPOINTMENTS,

    // الخطط العلاجية
    Permission.VIEW_TREATMENTS,

    // المخزون
    Permission.VIEW_INVENTORY,
    Permission.ADD_INVENTORY,

    // المختبر
    Permission.VIEW_LAB_ORDERS,

    // التقارير
    Permission.VIEW_REPORTS,
  ],
}

// التحقق من صلاحية معينة
export function hasPermission(
  role: ClinicStaffRole,
  permission: Permission,
  customPermissions?: Permission[]
): boolean {
  // إذا كان هناك صلاحيات مخصصة، استخدمها
  if (customPermissions && customPermissions.length > 0) {
    return customPermissions.includes(permission)
  }

  // وإلا استخدم الصلاحيات الافتراضية
  const defaultPermissions = ROLE_PERMISSIONS[role] || []
  return defaultPermissions.includes(permission)
}

// الحصول على جميع الصلاحيات لدور معين
export function getRolePermissions(
  role: ClinicStaffRole,
  customPermissions?: Permission[]
): Permission[] {
  // إذا كان هناك صلاحيات مخصصة، استخدمها
  if (customPermissions && customPermissions.length > 0) {
    return customPermissions
  }

  // وإلا استخدم الصلاحيات الافتراضية
  return ROLE_PERMISSIONS[role] || []
}

// تسميات الصلاحيات بالعربية
export const PERMISSION_LABELS: Record<Permission, string> = {
  // المرضى
  [Permission.VIEW_PATIENTS]: "عرض المرضى",
  [Permission.ADD_PATIENTS]: "إضافة مرضى",
  [Permission.EDIT_PATIENTS]: "تعديل المرضى",
  [Permission.DELETE_PATIENTS]: "حذف المرضى",

  // المواعيد
  [Permission.VIEW_APPOINTMENTS]: "عرض المواعيد",
  [Permission.ADD_APPOINTMENTS]: "إضافة مواعيد",
  [Permission.EDIT_APPOINTMENTS]: "تعديل المواعيد",
  [Permission.DELETE_APPOINTMENTS]: "حذف المواعيد",

  // الخطط العلاجية
  [Permission.VIEW_TREATMENTS]: "عرض الخطط العلاجية",
  [Permission.ADD_TREATMENTS]: "إضافة خطط علاجية",
  [Permission.EDIT_TREATMENTS]: "تعديل الخطط العلاجية",
  [Permission.DELETE_TREATMENTS]: "حذف الخطط العلاجية",

  // المالية
  [Permission.VIEW_FINANCES]: "عرض المالية",
  [Permission.ADD_FINANCES]: "إضافة معاملات مالية",
  [Permission.EDIT_FINANCES]: "تعديل المعاملات المالية",
  [Permission.DELETE_FINANCES]: "حذف المعاملات المالية",

  // المخزون
  [Permission.VIEW_INVENTORY]: "عرض المخزون",
  [Permission.ADD_INVENTORY]: "إضافة مواد للمخزون",
  [Permission.EDIT_INVENTORY]: "تعديل المخزون",
  [Permission.DELETE_INVENTORY]: "حذف من المخزون",

  // المختبر
  [Permission.VIEW_LAB_ORDERS]: "عرض طلبات المختبر",
  [Permission.ADD_LAB_ORDERS]: "إضافة طلبات مختبر",
  [Permission.EDIT_LAB_ORDERS]: "تعديل طلبات المختبر",
  [Permission.DELETE_LAB_ORDERS]: "حذف طلبات المختبر",

  // الطاقم
  [Permission.VIEW_STAFF]: "عرض الطاقم",
  [Permission.ADD_STAFF]: "إضافة موظفين",
  [Permission.EDIT_STAFF]: "تعديل بيانات الطاقم",
  [Permission.DELETE_STAFF]: "حذف موظفين",

  // الإعدادات
  [Permission.VIEW_SETTINGS]: "عرض الإعدادات",
  [Permission.EDIT_SETTINGS]: "تعديل الإعدادات",

  // التقارير
  [Permission.VIEW_REPORTS]: "عرض التقارير",
  [Permission.EXPORT_REPORTS]: "تصدير التقارير",
}

// تسميات الأدوار بالعربية
export const ROLE_LABELS: Record<ClinicStaffRole, string> = {
  OWNER: "المالك",
  DENTIST: "طبيب أسنان",
  ASSISTANT: "مساعد",
  RECEPTIONIST: "موظف استقبال",
  NURSE: "ممرض/ممرضة",
}

// مجموعات الصلاحيات للعرض المنظم
export const PERMISSION_GROUPS = {
  patients: {
    label: "إدارة المرضى",
    permissions: [
      Permission.VIEW_PATIENTS,
      Permission.ADD_PATIENTS,
      Permission.EDIT_PATIENTS,
      Permission.DELETE_PATIENTS,
    ],
  },
  appointments: {
    label: "إدارة المواعيد",
    permissions: [
      Permission.VIEW_APPOINTMENTS,
      Permission.ADD_APPOINTMENTS,
      Permission.EDIT_APPOINTMENTS,
      Permission.DELETE_APPOINTMENTS,
    ],
  },
  treatments: {
    label: "إدارة الخطط العلاجية",
    permissions: [
      Permission.VIEW_TREATMENTS,
      Permission.ADD_TREATMENTS,
      Permission.EDIT_TREATMENTS,
      Permission.DELETE_TREATMENTS,
    ],
  },
  finances: {
    label: "إدارة المالية",
    permissions: [
      Permission.VIEW_FINANCES,
      Permission.ADD_FINANCES,
      Permission.EDIT_FINANCES,
      Permission.DELETE_FINANCES,
    ],
  },
  inventory: {
    label: "إدارة المخزون",
    permissions: [
      Permission.VIEW_INVENTORY,
      Permission.ADD_INVENTORY,
      Permission.EDIT_INVENTORY,
      Permission.DELETE_INVENTORY,
    ],
  },
  lab: {
    label: "إدارة المختبر",
    permissions: [
      Permission.VIEW_LAB_ORDERS,
      Permission.ADD_LAB_ORDERS,
      Permission.EDIT_LAB_ORDERS,
      Permission.DELETE_LAB_ORDERS,
    ],
  },
  staff: {
    label: "إدارة الطاقم",
    permissions: [
      Permission.VIEW_STAFF,
      Permission.ADD_STAFF,
      Permission.EDIT_STAFF,
      Permission.DELETE_STAFF,
    ],
  },
  settings: {
    label: "الإعدادات",
    permissions: [Permission.VIEW_SETTINGS, Permission.EDIT_SETTINGS],
  },
  reports: {
    label: "التقارير",
    permissions: [Permission.VIEW_REPORTS, Permission.EXPORT_REPORTS],
  },
}
