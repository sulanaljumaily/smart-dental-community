# تقرير شامل عن منصة Smart Dental Community

## 1. نظام المصادقة والأدوار

### الأدوار في النظام (UserRole):
1. **DENTIST** (طبيب أسنان) - مالك العيادة
   - إنشاء وإدارة العيادات
   - إدارة الطاقم والصلاحيات
   - عرض جميع الإحصائيات

2. **VENDOR** (مورد)
   - إضافة وإدارة المنتجات
   - استقبال وإدارة الطلبات
   - التواصل مع العيادات

3. **LAB** (معمل أسنان)
   - استقبال طلبات المختبر
   - إدارة حالة الطلبات
   - إدارة الممثلين والتوصيل

4. **ADMIN** (إدارة المنصة)
   - إدارة المستخدمين
   - قبول/رفض الموردين والمختبرات
   - إحصائيات شاملة

5. **STAFF** (طاقم العيادة) - دعم في النظام
   - تم إضافته لدعم أعضاء الطاقم

6. **PATIENT** (مريض) - للاستخدام المستقبلي
   - حالياً معرّف لكن لم يتم تفعيله بالكامل

### أدوار طاقم العيادة (ClinicStaffRole):
1. **OWNER** - مالك العيادة (صلاحيات كاملة)
2. **DENTIST** - طبيب (صلاحيات طبية كاملة)
3. **ASSISTANT** - مساعد (صلاحيات مساعدة)
4. **RECEPTIONIST** - موظف استقبال (صلاحيات إدارية)
5. **NURSE** - ممرض (صلاحيات تمريضية)

### نظام المصادقة:
- **Provider**: NextAuth.js (v5.0.0-beta.15)
- **Strategy**: JWT Tokens
- **Session Duration**: 30 days
- **Database Adapter**: Prisma Adapter
- **Password Hashing**: bcryptjs (v3.0.3)
- **Login Methods**:
  - تسجيل دخول عام (credentials)
  - تسجيل دخول خاص للطاقم (staff-login)

---

## 2. Schema قاعدة البيانات

### Enums الرئيسية:
```
UserRole: DENTIST, VENDOR, LAB, ADMIN, STAFF, PATIENT
ClinicStaffRole: OWNER, DENTIST, ASSISTANT, RECEPTIONIST, NURSE
Permission: 28 صلاحية (مرضى، مواعيد، علاجات، مالية، مخزون، مختبر، طاقم، إعدادات، تقارير)
AppointmentStatus: PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW
TreatmentType: 10 أنواع (حشوة، علاج عصب، خلع، تاج، جسر، زراعة، تقويم، تنظيف، تبييض، طقم)
MessageType: STAFF, VENDOR, LAB, ADMIN, COMMUNITY, SYSTEM
NotificationType: APPOINTMENT, INVENTORY, ORDER, LAB_DELIVERY, TASK, MESSAGE, SYSTEM
```

### النماذج الرئيسية (30 نموذج):

#### 1. إدارة المستخدمين:
- **User**: المستخدم الأساسي
  - id, email, phone, password, name, avatar, role, isVerified, isActive
  
- **DentistProfile**: ملف الطبيب
  - specialization, licenseNumber, yearsOfExperience, subscriptionTier
  
- **VendorProfile**: ملف المورد
  - companyName, licenseNumber, logo, commissionRate, isApproved
  
- **LabProfile**: ملف المختبر
  - labName, specializations, isApproved

#### 2. إدارة العيادات:
- **Clinic**: معلومات العيادة
  - name, address, phone, workingHours, bookingLink, ownerId
  
- **ClinicStaff**: أعضاء فريق العيادة
  - name, email, role, specialty, permissions, salary, joinedAt

#### 3. إدارة المرضى:
- **Patient**: معلومات المريض
  - name, phone, dateOfBirth, gender, medicalHistory, allergies
  
- **Tooth**: حالة الأسنان
  - toothNumber (1-32), condition, previousTreatment
  
- **PatientDocument**: الملفات الطبية
  - title, type, fileUrl (X-Ray, Report, Image)

#### 4. المواعيد والعلاجات:
- **Appointment**: الحجوزات
  - date, duration, status, type, notes
  
- **Treatment**: الخدمات العلاجية
  - name, type, price, defaultSessions
  
- **TreatmentPlan**: خطة العلاج
  - totalCost, amountPaid, progress (0-100%)
  
- **TreatmentSession**: جلسات العلاج
  - sessionNumber, scheduledDate, completedDate, status

#### 5. إدارة المختبرات:
- **LabOrder**: طلبات المختبر
  - orderType, description, status, paymentStatus, dueDate
  
- **LabDeliveryStaff**: ممثلو المختبر
  - name, phone, latitude, longitude
  
- **SavedLab**: المختبرات المحفوظة

#### 6. المالية:
- **Finance**: معاملات العيادة المالية
  - type (Revenue/Expense), category, amount, date
  
- **PatientFinance**: المدفوعات الخاصة بالمريض

#### 7. المخزون والأصول:
- **InventoryItem**: المخزون
  - name, category, quantity, minQuantity, unit, expiryDate
  
- **Asset**: الأجهزة والأصول
  - name, type, serialNumber, purchaseDate, warrantyEnds

#### 8. المهام والتنبيهات:
- **Task**: المهام والتذكيرات
  - title, type, status, priority, dueDate
  
- **Notification**: التنبيهات
  - type, title, message, clinicId, clinicName, staffName

#### 9. المتجر الإلكتروني:
- **Product**: المنتجات
  - name, price, salePrice, stock, isFeatured
  
- **Order**: الطلبات
  - status, paymentStatus, subtotal, platformFee, total
  
- **OrderItem**: عناصر الطلب

#### 10. المجتمع والوظائف:
- **Post**: المنشورات
  - content, visibility, likes, shares
  
- **Comment**: التعليقات
  
- **Job**: الوظائف
  - title, type, status, city, specialization, salary

#### 11. الرسائل والإشعارات:
- **Message**: الرسائل الخاصة
  - senderId, receiverId, content, type, attachments, isRead
  
- **Notification**: الإشعارات النظامية

---

## 3. الصفحات والمكونات

### صفحات الديسكتوب:

#### مركز الأطباء (Dentist Hub):
```
/dentist/
  - page.tsx (لوحة التحكم الرئيسية)
  - /clinics/ (إدارة العيادات)
  - /messages/ (الرسائل)
  - /notifications/ (الإشعارات)
  - /tasks/ (المهام)
  - /profile/ (الملف الشخصي)
```

#### لوحة تحكم العيادة:
```
/clinic/[id]/
  - page.tsx (النظرة العامة)
  - /appointments/ (الحجوزات)
  - /patients/ (المرضى)
    - /[patientId]/ (ملف المريض)
  - /treatments/ (الخدمات العلاجية)
    - /[treatmentId]/
  - /treatment-plans/ (الخطط العلاجية)
    - /[planId]/
  - /staff/ (إدارة الطاقم)
  - /lab/ (المختبر)
  - /finance/ (المالية)
  - /assets/ (الأصول)
  - /reports/ (التقارير)
  - /settings/ (الإعدادات)
```

#### المورد (Vendor Hub):
```
/vendor/
  - page.tsx (لوحة التحكم)
  - /products/ (إدارة المنتجات)
  - /orders/ (الطلبات)
  - /messages/ (الرسائل)
  - /finance/ (المالية)
  - /inventory/ (المخزون)
  - /analytics/ (التحليلات)
  - /profile/ (الملف الشخصي)
```

#### المختبر (Lab Hub):
```
/lab/
  - page.tsx (لوحة التحكم)
  - /orders/ (الطلبات)
  - /delivery/ (إدارة التوصيل)
  - /representatives/ (الممثلون)
  - /gallery/ (المعرض)
  - /messages/ (الرسائل)
  - /finance/ (المالية)
  - /analytics/ (التحليلات)
  - /profile/ (الملف الشخصي)
```

#### إدارة المنصة (Admin Hub):
```
/platform-admin/
  - page.tsx (لوحة التحكم)
  - /marketplace/ (إدارة المتجر)
  - /community/ (المجتمع)
  - /jobs/ (الوظائف)
  - /notifications/ (الإشعارات)
  - /subscriptions/ (الاشتراكات)
  - /platform-settings/ (إعدادات المنصة)
  - /support/ (الدعم)
```

#### صفحات عامة:
```
/auth/
  - /login/ (تسجيل الدخول)

/ (الصفحة الرئيسية)
/dentist-landing/ (صفحة الأطباء)
/marketplace/ (المتجر)
/community/ (المجتمع)
/jobs/ (الوظائف)
/services/ (الخدمات)
/about/ (عن النظام)
/contact/ (تواصل معنا)
/privacy/ (سياسة الخصوصية)
/terms/ (شروط الاستخدام)
```

### المكونات:

#### مكونات UI (shadcn/ui):
```
- button.tsx
- card.tsx
- input.tsx
- label.tsx
- dialog.tsx
- sheet.tsx
- tabs.tsx
- select.tsx
- avatar.tsx
- badge.tsx
- progress.tsx
- textarea.tsx
- separator.tsx
- switch.tsx
- alert-dialog.tsx
- popover.tsx
- accordion.tsx
- toast.tsx
```

#### مكونات مشتركة:
```
- doctor-hub-nav.tsx (تنقل مركز الأطباء)
- supplier-nav.tsx (تنقل المورد)
- lab-nav.tsx (تنقل المختبر)
- platform-admin-nav.tsx (تنقل الإدارة)
- mobile-nav.tsx (التنقل على الهاتف)
- notification-toast.tsx (إشعارات)
- stat-card.tsx (بطاقات الإحصائيات)
- booking-dialog.tsx (حوار الحجز)
- cart-sidebar.tsx (سلة التسوق)
```

#### مكونات الميزات:
```
- dental-chart.tsx (مخطط الأسنان التفاعلي)
```

---

## 4. نظام الرسائل الحالي

### Architecture:
النظام يدعم **رسالتين مختلفتين**:

#### 1. REST API للرسائل:
```
GET /api/messages - جلب الرسائل
  ?chatWith={userId} - رسائل شخص معين
  ?type={STAFF|VENDOR|LAB|ADMIN|COMMUNITY|SYSTEM}
  ?clinicId={clinicId}

POST /api/messages - إرسال رسالة
  {
    receiverId: string
    content: string
    type: MessageType
    clinicId?: string
    attachments?: string[]
  }

PATCH /api/messages/{id}/read - وضع علامة مقروء
```

#### 2. Socket.IO Server (Real-time):
```javascript
// socket-server.js - خادم منفصل على المنفذ 3001

Connections:
- user:join(userId) - تسجيل المستخدم
- message:typing({ to, from }) - مؤشر الكتابة
- message:send(data) - إرسال الرسالة فوراً
- message:read({ messageId, userId }) - وضع علامة مقروء
- clinic:join(clinicId) - الانضمام لمجموعة العيادة
- clinic:broadcast({ clinicId, event, data }) - بث للعيادة

Features:
- حفظ الرسائل في قاعدة البيانات
- إشعارات فورية
- تتبع المستخدمين النشطين
- مؤشر الكتابة
- تأكيد الاستلام والقراءة
```

### Message Model:
```
id: string
senderId: string (User ID)
receiverId: string (User ID)
content: string
type: MessageType (STAFF, VENDOR, LAB, ADMIN, COMMUNITY, SYSTEM)
clinicId?: string (العيادة المرتبطة)
senderRole?: string (دور المرسل)
receiverRole?: string (دور المستقبل)
attachments: string[] (ملفات مرفقة)
isRead: boolean
createdAt: DateTime
```

### Message Types:
1. **STAFF** - رسائل طاقم العيادة
2. **VENDOR** - رسائل مع الموردين
3. **LAB** - رسائل مع المختبرات
4. **ADMIN** - رسائل مع إدارة المنصة
5. **COMMUNITY** - رسائل مع الأصدقاء في المجتمع
6. **SYSTEM** - رسائل النظام التلقائية

### Pages:
```
/dentist/messages/ - صفحة الرسائل
/vendor/messages/ - رسائل المورد
/lab/messages/ - رسائل المختبر
```

---

## 5. نظام الإشعارات

### Notification Model:
```
id: string
userId: string
type: NotificationType
title: string
message: string
clinicId?: string
clinicName?: string
staffName?: string
staffRole?: string
link?: string
data?: JSON
isRead: boolean
createdAt: DateTime
```

### API Endpoints:
```
GET /api/notifications - جلب الإشعارات
PATCH /api/notifications/{id}/read - وضع علامة مقروء
PATCH /api/notifications/read-all - تحديد الكل كمقروء
```

---

## 6. البنية العامة للمشروع

### البيئة التقنية:

#### Frontend:
- **Next.js**: 14.2.15 (App Router)
- **TypeScript**: 5.0+
- **React**: 18.3.1
- **Tailwind CSS**: 3.4.1
- **UI Framework**: shadcn/ui (Bento Design)
- **Animations**: Framer Motion 11.0.5
- **State Management**: Zustand 4.5.1
- **Form Handling**: React Hook Form 7.50.1
- **Validation**: Zod 3.22.4
- **Icons**: Lucide React 0.344.0
- **Utilities**: clsx, tailwind-merge

#### Backend:
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: PostgreSQL
- **ORM**: Prisma 5.10.2
- **Authentication**: NextAuth.js 5.0.0-beta.15
- **Password Hashing**: bcryptjs 3.0.3
- **Real-time**: Socket.io 4.8.1
- **AI**: OpenAI API 6.9.1
- **Cloud Storage**: Cloudinary 2.8.0
- **Adapter**: @auth/prisma-adapter 2.11.1
- **Query Client**: TanStack React Query 5.25.0

#### Development:
- **Package Manager**: npm
- **Linting**: ESLint 8
- **PostCSS**: 8.4.35
- **TypeScript Compiler**: tsc

### Structure:
```
/app - الصفحات (بنية Next.js 14)
/components - المكونات
  /ui - مكونات shadcn/ui
  /shared - مكونات مشتركة
  /features - مكونات الميزات
/lib - مساعدات وأدوات
  /stores - Zustand stores
  /auth.ts - إعدادات NextAuth
  /prisma.ts - عميل Prisma
  /permissions.ts - نظام الصلاحيات
  /utils.ts - دوال مساعدة
/prisma - إعدادات قاعدة البيانات
  /schema.prisma - تعريف الجداول
/public - الملفات الثابتة
/src - الكود الأساسي
  /app - API Routes
  /middleware.ts - middleware الأمان
  /types - أنواع TypeScript
socket-server.js - خادم Socket.io
```

### Scripts المتاحة:
```
npm run dev - تطوير محلي
npm run build - بناء الإنتاج
npm start - تشغيل الإنتاج
npm run lint - فحص الأكواد
npm run db:migrate - ترحيل قاعدة البيانات
npm run db:push - دفع التغييرات لقاعدة البيانات
npm run db:studio - فتح Prisma Studio
npm run socket - تشغيل خادم Socket.io
```

---

## 7. نقاط القوة في المشروع

1. ✅ **نظام أدوار شامل** - 6 أدوار رئيسية مع 5 أدوار فرعية
2. ✅ **نظام صلاحيات مرن** - 28 صلاحية قابلة للتخصيص
3. ✅ **30 نموذج بيانات** - تغطية شاملة لجميع العمليات
4. ✅ **Real-time Messaging** - Socket.io + REST API
5. ✅ **Authentication محكمة** - NextAuth + JWT + bcryptjs
6. ✅ **UI محترفة** - shadcn/ui + Bento Design
7. ✅ **Full TypeScript** - نوع آمن
8. ✅ **36 API Endpoint** - تغطية كاملة

---

## 8. المميزات الرئيسية المتكاملة

### لمالك العيادة:
- إنشاء وإدارة عيادات متعددة
- إدارة الطاقم والصلاحيات
- إدارة المرضى والخطط العلاجية
- مخطط أسنان تفاعلي
- جلسات العلاج المتعددة
- إدارة المواعيد
- الإحصائيات المالية
- المخزون والأصول
- طلبات المختبرات
- الرسائل والإشعارات
- المهام والتذكيرات

### للموردين:
- إضافة وإدارة المنتجات
- إدارة الطلبات
- التحليلات والإيرادات
- الرسائل مع العيادات

### للمختبرات:
- استقبال الطلبات
- إدارة حالة الطلبات
- إدارة الممثلين
- التحليلات

### لإدارة المنصة:
- إدارة جميع المستخدمين
- قبول الموردين والمختبرات
- إحصائيات شاملة
- إدارة الاشتراكات

