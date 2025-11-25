// نظام مركزي لإدارة أنواع العلاجات
// يتم استخدامه في جميع أنحاء التطبيق لضمان الاتساق

export interface SessionDetail {
  session: number
  name: string
  duration: number
  fields?: string[]
  options?: string[]
  waitPeriod?: string
  note?: string
}

export interface TreatmentType {
  value: string
  label: string
  icon: string
  defaultSessions: number
  needsLab: boolean
  basePrice: number
  description?: string
  sessionDetails: SessionDetail[]
}

// قائمة أنواع العلاجات المتاحة
export const TREATMENT_TYPES: TreatmentType[] = [
  {
    value: "FILLING",
    label: "حشوة تجميلية",
    icon: "🦷",
    defaultSessions: 1,
    needsLab: false,
    basePrice: 150000,
    description: "حشوة مركبة بلون الأسنان",
    sessionDetails: [
      { session: 1, name: "الحشوة", duration: 30, fields: ["نوع المادة", "اللون"] }
    ]
  },
  {
    value: "ROOT_CANAL",
    label: "علاج عصب",
    icon: "⚕️",
    defaultSessions: 3,
    needsLab: false,
    basePrice: 750000,
    description: "علاج عصب كامل",
    sessionDetails: [
      { session: 1, name: "فتح وتنظيف", duration: 60, fields: ["طول الجذور", "الملفات المستخدمة"] },
      { session: 2, name: "حشو مؤقت", duration: 45, fields: ["الملفات", "المادة الحاشية"] },
      { session: 3, name: "الحشوة النهائية", duration: 45, fields: ["نوع الحشوة"] }
    ]
  },
  {
    value: "EXTRACTION",
    label: "خلع",
    icon: "🔧",
    defaultSessions: 1,
    needsLab: false,
    basePrice: 100000,
    description: "خلع سن",
    sessionDetails: [
      { session: 1, name: "الخلع", duration: 20, fields: ["نوع الخلع", "التخدير"] }
    ]
  },
  {
    value: "CROWN",
    label: "تاج خزفي",
    icon: "👑",
    defaultSessions: 4,
    needsLab: true,
    basePrice: 1200000,
    description: "تاج خزفي كامل",
    sessionDetails: [
      {
        session: 1,
        name: "الجلسة الأولى",
        duration: 60,
        fields: ["إجراء الجلسة الأولى"],
        options: ["برد السن", "علاج عصب", "دعامة"]
      },
      {
        session: 2,
        name: "الجلسة الثانية",
        duration: 45,
        fields: ["إجراء الجلسة الثانية"],
        options: ["برد إضافي", "تركيبة مؤقتة", "دعامة"]
      },
      {
        session: 3,
        name: "أخذ الطبعة",
        duration: 30,
        fields: ["نوع التاج", "اللون", "المختبر", "نوع الطبعة"]
      },
      {
        session: 4,
        name: "فحص وتركيب التاج النهائي",
        duration: 30,
        fields: ["نوع التثبيت", "الإطباق"]
      }
    ]
  },
  {
    value: "BRIDGE",
    label: "جسر ثابت",
    icon: "🌉",
    defaultSessions: 4,
    needsLab: true,
    basePrice: 1800000,
    description: "جسر ثابت",
    sessionDetails: [
      {
        session: 1,
        name: "الجلسة الأولى - التحضير",
        duration: 90,
        fields: ["إجراء الجلسة الأولى"],
        options: ["برد الأسنان الداعمة", "علاج عصب", "دعامة"]
      },
      {
        session: 2,
        name: "الجلسة الثانية",
        duration: 60,
        fields: ["إجراء الجلسة الثانية"],
        options: ["برد إضافي", "جسر مؤقت", "دعامة"]
      },
      {
        session: 3,
        name: "أخذ الطبعة النهائية",
        duration: 45,
        fields: ["عدد الوحدات", "المادة", "اللون", "المختبر", "نوع الطبعة"]
      },
      {
        session: 4,
        name: "فحص وتركيب الجسر النهائي",
        duration: 45,
        fields: ["نوع التثبيت", "الإطباق", "فحص المفاصل"]
      }
    ]
  },
  {
    value: "IMPLANT",
    label: "زراعة",
    icon: "🦴",
    defaultSessions: 5,
    needsLab: true,
    basePrice: 2500000,
    description: "زراعة كاملة مع التاج",
    sessionDetails: [
      {
        session: 1,
        name: "الفحص والتخطيط",
        duration: 30,
        fields: ["صورة بانوراما", "CT Scan", "تقييم العظم"]
      },
      {
        session: 2,
        name: "زراعة الجذر (Implant Placement)",
        duration: 90,
        fields: ["نوع الزرعة", "القطر", "الطول", "العمق", "نوع التخدير"],
        waitPeriod: "3-6 أشهر للالتئام"
      },
      {
        session: 3,
        name: "فحص الالتئام والاندماج",
        duration: 20,
        fields: ["صورة أشعة", "فحص الاستقرار"]
      },
      {
        session: 4,
        name: "تركيب Healing Abutment وأخذ الطبعة",
        duration: 45,
        fields: ["نوع Abutment", "الطبعة", "اللون", "المختبر"]
      },
      {
        session: 5,
        name: "تركيب التاج النهائي",
        duration: 30,
        fields: ["نوع التاج", "نوع التثبيت", "الإطباق"]
      }
    ]
  },
  {
    value: "ORTHODONTICS",
    label: "تقويم",
    icon: "🔗",
    defaultSessions: 24,
    needsLab: false,
    basePrice: 3500000,
    description: "تقويم معدني كامل",
    sessionDetails: [
      {
        session: 1,
        name: "الفحص والتشخيص",
        duration: 60,
        fields: ["صور الأشعة", "قوالب الأسنان", "الصور الشخصية", "تحليل الحالة"]
      },
      {
        session: 2,
        name: "شرح خطة العلاج",
        duration: 30,
        fields: ["نوع التقويم", "المدة المتوقعة", "التكلفة"]
      },
      {
        session: 3,
        name: "التركيب الأولي (Bonding)",
        duration: 120,
        fields: ["نوع التقويم", "نوع الأسلاك", "Brackets"]
      },
      {
        session: 4,
        name: "أول متابعة",
        duration: 30,
        fields: ["تغيير السلك", "الملاحظات"],
        waitPeriod: "4-6 أسابيع"
      },
      {
        session: 5,
        name: "متابعة دورية",
        duration: 25,
        fields: ["تعديل السلك", "المطاطات", "التقدم"],
        note: "تتكرر كل 4-6 أسابيع"
      }
    ]
  },
  {
    value: "CLEANING",
    label: "تنظيف",
    icon: "✨",
    defaultSessions: 1,
    needsLab: false,
    basePrice: 50000,
    description: "تنظيف الأسنان",
    sessionDetails: [
      { session: 1, name: "التنظيف", duration: 30, fields: ["نوع التنظيف"] }
    ]
  },
  {
    value: "WHITENING",
    label: "تبييض",
    icon: "💎",
    defaultSessions: 1,
    needsLab: false,
    basePrice: 400000,
    description: "تبييض الأسنان",
    sessionDetails: [
      { session: 1, name: "التبييض", duration: 60, fields: ["نوع التبييض", "الدرجة"] }
    ]
  },
  {
    value: "DENTURE",
    label: "طقم أسنان جزئي متحرك",
    icon: "🦷",
    defaultSessions: 5,
    needsLab: true,
    basePrice: 1500000,
    description: "طقم أسنان جزئي",
    sessionDetails: [
      {
        session: 1,
        name: "الطبعة الأولية",
        duration: 30,
        fields: ["نوع الطقم", "عدد الأسنان المفقودة", "المختبر"]
      },
      {
        session: 2,
        name: "عمل Special Tray",
        duration: 20,
        fields: ["نوع Special Tray", "المادة"]
      },
      {
        session: 3,
        name: "الطبعة النهائية",
        duration: 30,
        fields: ["نوع مادة الطبعة", "اللون"]
      },
      {
        session: 4,
        name: "التجربة الأولية",
        duration: 25,
        fields: ["فحص الإطباق", "اللون"]
      },
      {
        session: 5,
        name: "الاستلام والتسليم النهائي",
        duration: 30,
        fields: ["التعليمات", "المتابعة"]
      }
    ]
  },
  {
    value: "COMPLETE_DENTURE",
    label: "طقم كامل متحرك",
    icon: "🦷",
    defaultSessions: 6,
    needsLab: true,
    basePrice: 2000000,
    description: "طقم كامل متحرك",
    sessionDetails: [
      {
        session: 1,
        name: "الطبعة الأولية",
        duration: 30,
        fields: ["نوع الطقم (علوي/سفلي/كامل)", "المختبر"]
      },
      {
        session: 2,
        name: "عمل Special Tray",
        duration: 25,
        fields: ["نوع Special Tray", "المادة"]
      },
      {
        session: 3,
        name: "الطبعة النهائية وتسجيل العضة",
        duration: 40,
        fields: ["نوع مادة الطبعة", "Bite Registration"]
      },
      {
        session: 4,
        name: "تجربة الشمع (Wax Try-in)",
        duration: 30,
        fields: ["فحص الشكل", "اللون", "الإطباق"]
      },
      {
        session: 5,
        name: "التسليم الأولي",
        duration: 35,
        fields: ["الإطباق النهائي", "التعليمات"]
      },
      {
        session: 6,
        name: "المتابعة والتعديلات",
        duration: 20,
        fields: ["التعديلات المطلوبة", "ملاحظات المريض"]
      }
    ]
  },
]

// دالة للحصول على نوع علاج بناءً على القيمة
export function getTreatmentType(value: string): TreatmentType | undefined {
  return TREATMENT_TYPES.find(t => t.value === value)
}

// دالة للحصول على جميع أنواع العلاجات
export function getAllTreatmentTypes(): TreatmentType[] {
  return TREATMENT_TYPES
}

// دالة للحصول على العلاجات التي تحتاج مختبر
export function getLabRequiredTreatments(): TreatmentType[] {
  return TREATMENT_TYPES.filter(t => t.needsLab)
}
