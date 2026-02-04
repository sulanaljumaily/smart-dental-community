# الملفات والمسارات الهامة في المشروع

## الملفات الأساسية

### Configuration Files:
1. **package.json**
   - المسار: `/home/user/smart-dental-community/package.json`
   - الوصف: إعدادات المشروع والمكتبات
   - الإصدار: 0.1.0
   - Scripts: dev, build, start, db:migrate, socket

2. **prisma/schema.prisma**
   - المسار: `/home/user/smart-dental-community/prisma/schema.prisma`
   - الوصف: تعريف جميع جداول قاعدة البيانات
   - الحجم: 965 سطر
   - النماذج: 30 نموذج

3. **tsconfig.json**
   - المسار: `/home/user/smart-dental-community/tsconfig.json`
   - الوصف: إعدادات TypeScript

4. **next.config.js**
   - المسار: `/home/user/smart-dental-community/next.config.js`
   - الوصف: إعدادات Next.js

5. **tailwind.config.ts**
   - المسار: `/home/user/smart-dental-community/tailwind.config.ts`
   - الوصف: إعدادات Tailwind CSS

---

## المكتبات والمساعدات الأساسية

### Authentication & Security:
1. **lib/auth.ts**
   - المسار: `/home/user/smart-dental-community/lib/auth.ts`
   - الوصف: إعدادات NextAuth.js الكاملة
   - الميزات:
     - Credentials Provider
     - Prisma Adapter
     - JWT Strategy
     - Session Management
     - User Roles

2. **src/middleware.ts**
   - المسار: `/home/user/smart-dental-community/src/middleware.ts`
   - الوصف: حماية الطرق حسب الأدوار
   - الحماية:
     - /dentist → DENTIST role
     - /vendor → VENDOR role
     - /lab → LAB role
     - /platform-admin → ADMIN role
     - /clinic → DENTIST role

### Database & ORM:
3. **lib/prisma.ts**
   - المسار: `/home/user/smart-dental-community/lib/prisma.ts`
   - الوصف: عميل Prisma المشترك

### Permissions & Authorization:
4. **lib/permissions.ts**
   - المسار: `/home/user/smart-dental-community/lib/permissions.ts`
   - الوصف: نظام الصلاحيات الكامل
   - الميزات:
     - ROLE_PERMISSIONS: صلاحيات كل دور
     - hasPermission(): التحقق من الصلاحية
     - getRolePermissions(): الحصول على صلاحيات الدور
     - PERMISSION_LABELS: تسميات عربية
     - ROLE_LABELS: أسماء الأدوار
     - PERMISSION_GROUPS: تجميع الصلاحيات

### State Management:
5. **lib/stores/auth-store.ts**
   - المسار: `/home/user/smart-dental-community/lib/stores/auth-store.ts`
   - الوصف: إدارة حالة المصادقة بـ Zustand
   - الميزات:
     - Login/Logout
     - Quick Demo Users
     - User Management

6. **lib/stores/notification-store.ts**
   - المسار: `/home/user/smart-dental-community/lib/stores/notification-store.ts`

7. **lib/stores/booking-store.ts**
   - المسار: `/home/user/smart-dental-community/lib/stores/booking-store.ts`

8. **lib/stores/cart-store.ts**
   - المسار: `/home/user/smart-dental-community/lib/stores/cart-store.ts`

### Utilities:
9. **lib/utils.ts**
   - المسار: `/home/user/smart-dental-community/lib/utils.ts`
   - الوصف: دوال مساعدة عامة

---

## API Routes

### المجموعات الرئيسية:

#### Authentication:
```
/src/app/api/auth/
├── register/ → تسجيل حساب جديد
├── staff-login/ → تسجيل دخول الطاقم
└── [...nextauth]/ → مسارات NextAuth

Files:
- /home/user/smart-dental-community/src/app/api/auth/register/route.ts
- /home/user/smart-dental-community/src/app/api/auth/staff-login/route.ts
- /home/user/smart-dental-community/src/app/api/auth/[...nextauth]/route.ts
```

#### Messaging:
```
/src/app/api/messages/
├── GET - جلب الرسائل
├── POST - إرسال رسالة
└── [id]/read/ → وضع علامة مقروء

Files:
- /home/user/smart-dental-community/src/app/api/messages/route.ts
- /home/user/smart-dental-community/src/app/api/messages/[id]/read/route.ts
```

#### Notifications:
```
/src/app/api/notifications/
├── GET - جلب الإشعارات
├── POST - إنشاء إشعار
├── [id]/read/ → وضع علامة مقروء
└── read-all/ → تحديد الكل كمقروء

Files:
- /home/user/smart-dental-community/src/app/api/notifications/route.ts
- /home/user/smart-dental-community/src/app/api/notifications/[id]/read/route.ts
- /home/user/smart-dental-community/src/app/api/notifications/read-all/route.ts
```

#### Appointments:
```
/src/app/api/appointments/
├── GET - جلب المواعيد
├── POST - إنشاء موعد
└── [id]/ → تحديث/حذف موعد

Files:
- /home/user/smart-dental-community/src/app/api/appointments/route.ts
- /home/user/smart-dental-community/src/app/api/appointments/[id]/route.ts
```

#### Patients:
```
/src/app/api/patients/
├── GET - جلب المرضى
├── POST - إضافة مريض
├── [id]/ → تفاصيل المريض
└── [id]/teeth/ → حالة الأسنان

Files:
- /home/user/smart-dental-community/src/app/api/patients/route.ts
- /home/user/smart-dental-community/src/app/api/patients/[id]/route.ts
- /home/user/smart-dental-community/src/app/api/patients/[id]/teeth/route.ts
```

#### Treatment Plans:
```
/src/app/api/treatment-plans/
├── GET - جلب الخطط
├── POST - إنشاء خطة
└── [id]/ → تفاصيل الخطة

Files:
- /home/user/smart-dental-community/src/app/api/treatment-plans/route.ts
- /home/user/smart-dental-community/src/app/api/treatment-plans/[id]/route.ts
```

#### Clinics:
```
/src/app/api/clinics/
├── GET - جلب العيادات
├── POST - إنشاء عيادة
├── [id]/ → تفاصيل العيادة
├── [id]/staff/ → إدارة الطاقم
├── [id]/staff/[staffId]/ → تفاصيل الطاقم
└── [id]/stats/ → إحصائيات العيادة

Files:
- /home/user/smart-dental-community/src/app/api/clinics/route.ts
- /home/user/smart-dental-community/src/app/api/clinics/[id]/route.ts
- /home/user/smart-dental-community/src/app/api/clinics/[id]/staff/route.ts
- /home/user/smart-dental-community/src/app/api/clinics/[id]/staff/[staffId]/route.ts
- /home/user/smart-dental-community/src/app/api/clinics/[id]/stats/route.ts
```

#### Lab Orders:
```
/src/app/api/lab-orders/
├── GET - جلب طلبات المختبر
├── POST - إنشاء طلب
└── [id]/ → تحديث الطلب

Files:
- /home/user/smart-dental-community/src/app/api/lab-orders/route.ts
- /home/user/smart-dental-community/src/app/api/lab-orders/[id]/route.ts
```

#### Inventory:
```
/src/app/api/inventory/
├── GET - جلب المخزون
├── POST - إضافة مادة
└── [id]/ → تحديث المادة

Files:
- /home/user/smart-dental-community/src/app/api/inventory/route.ts
- /home/user/smart-dental-community/src/app/api/inventory/[id]/route.ts
```

#### Dashboard APIs:
```
/src/app/api/dentist/dashboard/ → لوحة تحكم الطبيب
/src/app/api/vendor/dashboard/ → لوحة تحكم المورد
/src/app/api/lab/dashboard/ → لوحة تحكم المختبر
/src/app/api/platform-admin/dashboard/ → لوحة تحكم الإدارة
/src/app/api/platform-admin/approve-vendor/ → قبول المورد
/src/app/api/platform-admin/approve-lab/ → قبول المختبر
/src/app/api/platform-admin/users/ → إدارة المستخدمين

Files:
- /home/user/smart-dental-community/src/app/api/dentist/dashboard/route.ts
- /home/user/smart-dental-community/src/app/api/vendor/dashboard/route.ts
- /home/user/smart-dental-community/src/app/api/lab/dashboard/route.ts
- /home/user/smart-dental-community/src/app/api/platform-admin/dashboard/route.ts
- /home/user/smart-dental-community/src/app/api/platform-admin/approve-vendor/route.ts
- /home/user/smart-dental-community/src/app/api/platform-admin/approve-lab/route.ts
- /home/user/smart-dental-community/src/app/api/platform-admin/users/route.ts
```

#### Other APIs:
```
/src/app/api/finances/ → المعاملات المالية
/src/app/api/ai/diagnosis/ → التشخيص الذكي
/src/app/api/upload/ → رفع الملفات
/src/app/api/payment/init/ → بدء الدفع
/src/app/api/payment/verify/ → التحقق من الدفع

Files:
- /home/user/smart-dental-community/src/app/api/finances/route.ts
- /home/user/smart-dental-community/src/app/api/ai/diagnosis/route.ts
- /home/user/smart-dental-community/src/app/api/upload/route.ts
- /home/user/smart-dental-community/src/app/api/payment/init/route.ts
- /home/user/smart-dental-community/src/app/api/payment/verify/route.ts
```

---

## صفحات التطبيق

### الصفحات الرئيسية:

#### Dentist Hub:
```
/app/dentist/
├── page.tsx - لوحة التحكم الرئيسية
├── layout.tsx - تخطيط الصفحة
├── /clinics/page.tsx - إدارة العيادات
├── /messages/page.tsx - الرسائل
├── /notifications/page.tsx - الإشعارات
├── /tasks/page.tsx - المهام
└── /profile/page.tsx - الملف الشخصي
```

#### Clinic Dashboard:
```
/app/clinic/[id]/
├── page.tsx - النظرة العامة
├── layout.tsx - التخطيط
├── /appointments/page.tsx - الحجوزات
├── /patients/page.tsx - المرضى
├── /patients/[patientId]/page.tsx - ملف المريض
├── /treatments/page.tsx - الخدمات
├── /treatments/[treatmentId]/page.tsx
├── /treatment-plans/page.tsx - الخطط العلاجية
├── /treatment-plans/[planId]/page.tsx
├── /staff/page.tsx - إدارة الطاقم
├── /lab/page.tsx - المختبر
├── /finance/page.tsx - المالية
├── /assets/page.tsx - الأصول
├── /reports/page.tsx - التقارير
└── /settings/page.tsx - الإعدادات
```

#### Vendor Hub:
```
/app/vendor/
├── page.tsx - لوحة التحكم
├── layout.tsx
├── /products/page.tsx - إدارة المنتجات
├── /orders/page.tsx - الطلبات
├── /messages/page.tsx - الرسائل
├── /finance/page.tsx - المالية
├── /inventory/page.tsx - المخزون
├── /analytics/page.tsx - التحليلات
└── /profile/page.tsx - الملف الشخصي
```

#### Lab Hub:
```
/app/lab/
├── page.tsx - لوحة التحكم
├── layout.tsx
├── /orders/page.tsx - الطلبات
├── /delivery/page.tsx - التوصيل
├── /representatives/page.tsx - الممثلون
├── /gallery/page.tsx - المعرض
├── /messages/page.tsx - الرسائل
├── /finance/page.tsx - المالية
├── /analytics/page.tsx - التحليلات
└── /profile/page.tsx - الملف الشخصي
```

#### Admin Hub:
```
/app/platform-admin/
├── page.tsx - لوحة التحكم
├── layout.tsx
├── /marketplace/page.tsx - إدارة المتجر
├── /community/page.tsx - المجتمع
├── /jobs/page.tsx - الوظائف
├── /notifications/page.tsx - الإشعارات
├── /subscriptions/page.tsx - الاشتراكات
├── /platform-settings/page.tsx - الإعدادات
└── /support/page.tsx - الدعم
```

#### Public Pages:
```
/app/
├── page.tsx - الرئيسية
├── layout.tsx - التخطيط العام
├── /auth/login/page.tsx - تسجيل الدخول
├── /dentist-landing/page.tsx - صفحة الأطباء
├── /marketplace/page.tsx - المتجر
├── /community/page.tsx - المجتمع
├── /jobs/page.tsx - الوظائف
├── /services/page.tsx - الخدمات
├── /about/page.tsx - عن النظام
├── /contact/page.tsx - تواصل
├── /privacy/page.tsx - الخصوصية
└── /terms/page.tsx - الشروط
```

---

## مكونات العرض

### UI Components (/components/ui/):
```
- button.tsx - أزرار
- card.tsx - بطاقات
- input.tsx - حقول الإدخال
- label.tsx - عناوين
- dialog.tsx - نوافذ الحوار
- sheet.tsx - الأوراق الجانبية
- tabs.tsx - الأتابات
- select.tsx - صناديق الاختيار
- avatar.tsx - الصور الرمزية
- badge.tsx - الشارات
- progress.tsx - أشرطة التقدم
- textarea.tsx - مربعات النصوص الكبيرة
- separator.tsx - الفواصل
- switch.tsx - مفاتيح التبديل
- alert-dialog.tsx - نوافذ التنبيهات
- popover.tsx - النوافذ المنبثقة
- accordion.tsx - الأكورديون
- toast.tsx - الإشعارات المنبثقة

Path: /home/user/smart-dental-community/components/ui/
```

### Shared Components (/components/shared/):
```
- doctor-hub-nav.tsx - تنقل مركز الأطباء
- supplier-nav.tsx - تنقل المورد
- lab-nav.tsx - تنقل المختبر
- platform-admin-nav.tsx - تنقل الإدارة
- mobile-nav.tsx - التنقل على الهاتف
- notification-toast.tsx - الإشعارات
- stat-card.tsx - بطاقات الإحصائيات
- booking-dialog.tsx - حوار الحجز
- cart-sidebar.tsx - سلة التسوق

Path: /home/user/smart-dental-community/components/shared/
```

### Feature Components (/components/features/):
```
- dental-chart.tsx - مخطط الأسنان التفاعلي

Path: /home/user/smart-dental-community/components/features/
```

---

## ملفات مهمة أخرى

### Real-time Messaging:
**socket-server.js**
- المسار: `/home/user/smart-dental-community/socket-server.js`
- الوصف: خادم Socket.io للرسائل الفورية
- الميناء الافتراضي: 3001
- الميزات:
  - user:join - تسجيل المستخدم
  - message:send - إرسال الرسالة
  - message:typing - مؤشر الكتابة
  - message:read - وضع علامة مقروء
  - clinic:join - الانضمام لمجموعة عيادة
  - clinic:broadcast - بث للعيادة

### Documentation:
1. **README.md** - وثائق المشروع الرئيسية
2. **SYSTEM_GUIDE.md** - دليل النظام الشامل
3. **API_DOCUMENTATION.md** - وثائق API
4. **PROJECT_STATUS_REPORT.md** - تقرير حالة المشروع
5. **DEPLOYMENT.md** - إرشادات النشر
6. **VERCEL_QUICKSTART.md** - دليل Vercel السريع

---

## متغيرات البيئة المهمة

تتم إدارتها عبر `.env`:
```
DATABASE_URL - رابط قاعدة البيانات
NEXTAUTH_SECRET - سر المصادقة
NEXTAUTH_URL - رابط التطبيق
OPENAI_API_KEY - مفتاح OpenAI API
CLOUDINARY_URL - رابط Cloudinary
SOCKET_PORT - منفذ Socket.io
```

---

## ملخص الملفات الحرجة

| الملف | المسار | الأهمية | التفاصيل |
|------|--------|---------|----------|
| schema.prisma | prisma/ | حرجة | 30 نموذج، 965 سطر |
| auth.ts | lib/ | حرجة | NextAuth + JWT |
| permissions.ts | lib/ | مهمة | 28 صلاحية |
| middleware.ts | src/ | مهمة | حماية الطرق |
| socket-server.js | root | مهمة | Real-time messaging |
| messages/route.ts | src/app/api/ | مهمة | REST API للرسائل |
| notifications/route.ts | src/app/api/ | مهمة | نظام الإشعارات |
| page.tsx | app/dentist/ | مهمة | لوحة التحكم الرئيسية |

