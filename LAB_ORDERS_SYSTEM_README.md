# نظام إدارة طلبات المختبر - دليل الاستخدام الشامل
# Lab Orders Management System - Comprehensive Guide

## 📖 المحتويات | Table of Contents

1. [نظرة عامة](#overview)
2. [الميزات الرئيسية](#features)
3. [البنية التقنية](#architecture)
4. [دليل الاستخدام](#usage-guide)
5. [API Documentation](#api-docs)
6. [قاعدة البيانات](#database)
7. [التكامل المالي](#financial-integration)
8. [الصلاحيات](#permissions)
9. [استكشاف الأخطاء](#troubleshooting)

---

## <a name="overview"></a>📋 نظرة عامة | Overview

نظام شامل ومتكامل لإدارة طلبات المختبر في منصة المجتمع الطبي للأسنان، مع تكامل مالي تلقائي ثنائي الاتجاه.

### المكونات الرئيسية:
- ✅ إدارة طلبات المختبر (للعيادات والمختبرات)
- ✅ إدارة المختبرات المحفوظة
- ✅ تكامل مالي تلقائي
- ✅ نظام إشعارات ومهام
- ✅ تتبع شامل للتغييرات

---

## <a name="features"></a>🎯 الميزات الرئيسية | Key Features

### للعيادات:

#### 1. إنشاء طلبات المختبر
- ✓ من داخل الخطة العلاجية مباشرة
- ✓ اسم المريض محدد تلقائياً
- ✓ اختيار من المختبرات المحفوظة
- ✓ إضافة مختبر جديد (مخصص) مباشرة
- ✓ إدخال المواصفات الفنية
- ✓ تحديد تاريخ الاستلام
- ✓ اختيار إنشاء مهمة تذكير تلقائية

#### 2. إدارة الطلبات
- ✓ عرض جميع الطلبات مع إحصائيات شاملة
- ✓ بحث متقدم (مريض، مختبر، نوع الطلب)
- ✓ فلترة حسب الحالة
- ✓ تحديث الطلبات
- ✓ حذف الطلبات (مع حذف السجل المالي تلقائياً)

#### 3. المختبرات المحفوظة
- ✓ إضافة مختبرات جديدة
- ✓ إدارة القائمة المفضلة
- ✓ دعم المختبرات المسجلة والمخصصة

### للمختبرات:

#### 1. استقبال الطلبات
- ✓ إشعارات فورية بالطلبات الجديدة
- ✓ عرض تفاصيل كل طلب
- ✓ قبول أو رفض الطلبات

#### 2. إدارة الطلبات
- ✓ تحديث حالة الطلبات
- ✓ إحصائيات شاملة
- ✓ متابعة الطلبات حسب الحالة

### التكامل المالي:

#### تسجيل تلقائي:
- ✓ كل طلب يُسجل تلقائياً في المالية كمصروف
- ✓ ربط ثنائي الاتجاه بين الطلب والسجل المالي
- ✓ تحديث تلقائي عند تعديل المبلغ
- ✓ حذف تلقائي عند حذف الطلب

#### التتبع:
- ✓ تسجيل من قام بإنشاء الطلب
- ✓ تسجيل من قام بالتعديل
- ✓ تسجيل الدور (طبيب، مساعد، استقبال)

---

## <a name="architecture"></a>🏗️ البنية التقنية | Technical Architecture

### Frontend (Next.js 14 + TypeScript)

```
app/
├── clinic/[id]/
│   ├── lab-orders/              # صفحة إدارة الطلبات
│   │   └── page.tsx
│   ├── patients/[patientId]/    # ملف المريض (يحتوي على زر طلب مختبر)
│   │   └── page.tsx
│   └── settings/labs/           # إدارة المختبرات المحفوظة
│       └── page.tsx
│
├── lab/[id]/
│   └── orders/                  # صفحة الطلبات للمختبر
│       └── page.tsx
│
└── api/
    ├── treatment-plans/[planId]/
    │   └── lab-order/           # إنشاء طلب جديد
    │       └── route.ts
    ├── lab-orders/              # إدارة الطلبات
    │   ├── route.ts
    │   └── [orderId]/
    │       └── route.ts
    └── saved-labs/              # إدارة المختبرات المحفوظة
        └── route.ts

components/features/
├── lab-order-dialog.tsx         # نافذة طلب المختبر
└── treatment-plan-view.tsx      # عرض الخطة العلاجية (يحتوي على الزر)
```

### Backend (Prisma + PostgreSQL)

```prisma
model LabOrder {
  - دعم المختبرات المسجلة والمخصصة
  - التكامل المالي
  - تتبع المنشئ/المعدّل
  - حساب نسبة المنصة
}

model Finance {
  - التكامل ثنائي الاتجاه
  - نظام الصلاحيات
  - تتبع شامل
}

model SavedLab {
  - قائمة المختبرات المفضلة
}
```

---

## <a name="usage-guide"></a>📚 دليل الاستخدام | Usage Guide

### 1. إعداد المختبرات المحفوظة

#### الخطوات:
1. انتقل إلى **الإعدادات** → **المختبرات**
   ```
   /clinic/[clinicId]/settings/labs
   ```

2. اضغط **"إضافة مختبر جديد"**

3. أدخل البيانات:
   - اسم المختبر (مطلوب)
   - رقم الهاتف (مطلوب)
   - العنوان (اختياري)

4. اضغط **"إضافة"**

✅ سيتم إضافة المختبر إلى قائمتك المفضلة

---

### 2. إنشاء طلب مختبر

#### من الخطة العلاجية:

##### الخطوات:
1. افتح ملف المريض
   ```
   /clinic/[clinicId]/patients/[patientId]
   ```

2. اذهب إلى تبويب **"الخطة العلاجية"**

3. ابحث عن الخطة التي تحتاج طلب مختبر
   - سيظهر تنبيه: "هذا العلاج يتطلب طلب مختبر"
   - سيظهر زر **"طلب مختبر"**

4. اضغط زر **"طلب مختبر"**

5. في النافذة المنبثقة:
   - ✅ اسم المريض محدد تلقائياً
   - اختر المختبر من القائمة المحفوظة أو أضف مختبر جديد
   - أدخل نوع الطلب (مثال: تاج خزفي، جسر أسنان)
   - أدخل الوصف والمواصفات الفنية
   - أدخل المبلغ
   - حدد تاريخ الاستلام المتوقع
   - ✓ إنشاء مهمة تذكير تلقائياً (اختياري)
   - ✓ إرسال إشعار للمختبر (للمختبرات المسجلة)

6. اضغط **"إرسال الطلب"**

#### ماذا يحدث تلقائياً؟

```mermaid
النظام →
  1. ✓ ينشئ طلب المختبر
  2. ✓ يسجل في المالية (EXPENSE - LAB_ORDER)
  3. ✓ يربط الطلب بالسجل المالي
  4. ✓ يرسل إشعار للمختبر (إذا كان مسجلاً)
  5. ✓ ينشئ مهمة تذكير (إذا طُلب)
  6. ✓ يحدث حالة الخطة العلاجية
  7. ✓ يسجل من قام بإنشاء الطلب
```

---

### 3. متابعة الطلبات (للعيادة)

#### الوصول:
```
/clinic/[clinicId]/lab-orders
```

#### الميزات:
- 📊 **إحصائيات شاملة**:
  - قيد الانتظار
  - جاري التحضير
  - جاهز
  - مكتمل

- 🔍 **بحث وفلترة**:
  - البحث بالمريض، المختبر، أو نوع الطلب
  - فلترة حسب الحالة

- 👁️ **عرض التفاصيل**:
  - معلومات كاملة عن كل طلب
  - حالة الدفع
  - تاريخ الإنشاء والاستلام

- ✏️ **التحديث والحذف**:
  - تحديث الطلبات
  - حذف الطلبات (مع حذف السجل المالي تلقائياً)

---

### 4. إدارة الطلبات (للمختبر)

#### الوصول:
```
/lab/[labId]/orders
```

#### سير العمل:

##### 1. استقبال طلب جديد:
- ✓ تستلم إشعار فوري
- ✓ الطلب يظهر في قسم "طلبات جديدة"
- ✓ يمكنك قبول أو رفض الطلب

##### 2. قبول الطلب:
- اضغط **✓ قبول**
- الحالة تتغير إلى: **ACCEPTED**
- يتم إرسال إشعار للعيادة

##### 3. تحديث الحالة:
```
PENDING (قيد الانتظار)
  ↓
ACCEPTED (مقبول)
  ↓
IN_PROGRESS (جاري التحضير)
  ↓
READY (جاهز)
  ↓
IN_TRANSIT (في الطريق)
  ↓
DELIVERED (تم التسليم)
```

##### 4. كل تحديث:
- ✓ يرسل إشعار للعيادة
- ✓ يُسجل في سجل التغييرات
- ✓ يظهر في الوقت الفعلي للعيادة

---

## <a name="api-docs"></a>🔌 API Documentation

### 1. إنشاء طلب مختبر

**Endpoint**: `POST /api/treatment-plans/[planId]/lab-order`

**Request Body**:
```json
{
  "labId": "lab_123",              // اختياري (للمختبرات المسجلة)
  "customLabName": "مختبر الأسنان", // اختياري (للمختبرات المخصصة)
  "customLabPhone": "07701234567",  // اختياري
  "orderType": "تاج خزفي",
  "description": "تاج زيركون للسن 16",
  "specifications": {
    "color": "A2",
    "type": "Zirconia"
  },
  "amount": 150000,
  "dueDate": "2024-02-01",
  "createTask": true,
  "sendNotification": true
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "order": {
    "id": "order_123",
    "patientName": "أحمد علي",
    "orderType": "تاج خزفي",
    "amount": 150000,
    "platformFee": 7500,
    "status": "PENDING",
    "financeRecordId": "finance_456"
  },
  "message": "تم إنشاء طلب المختبر بنجاح"
}
```

---

### 2. الحصول على قائمة الطلبات

**Endpoint**: `GET /api/lab-orders`

**Query Parameters**:
```
?clinicId=clinic_123
&status=PENDING
&patientId=patient_456
```

**Response** (200 OK):
```json
{
  "success": true,
  "orders": [...],
  "count": 10
}
```

---

### 3. تحديث طلب مختبر

**Endpoint**: `PATCH /api/lab-orders/[orderId]`

**Request Body**:
```json
{
  "status": "IN_PROGRESS",
  "amount": 160000
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "order": {...},
  "message": "تم تحديث طلب المختبر بنجاح"
}
```

---

### 4. حذف طلب مختبر

**Endpoint**: `DELETE /api/lab-orders/[orderId]`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "تم حذف طلب المختبر بنجاح"
}
```

---

### 5. إدارة المختبرات المحفوظة

**GET /api/saved-labs**:
```
?clinicId=clinic_123
```

**POST /api/saved-labs**:
```json
{
  "clinicId": "clinic_123",
  "customName": "مختبر النجوم",
  "customPhone": "07702222222",
  "customAddress": "بغداد - الكرادة"
}
```

**DELETE /api/saved-labs**:
```
?id=saved_lab_123
```

---

## <a name="database"></a>🗄️ قاعدة البيانات | Database

### نموذج LabOrder

```prisma
model LabOrder {
  id       String @id @default(cuid())
  clinicId String
  clinic   Clinic @relation(...)

  labId String?                    // اختياري للمختبرات المسجلة
  lab   LabProfile? @relation(...) // أو null

  planId String?
  plan   TreatmentPlan? @relation(...)

  // معلومات المريض
  patientId   String?
  patientName String // اسم المريض محفوظ

  orderType      String  // نوع الطلب
  description    String? @db.Text
  specifications Json?   // المواصفات الفنية

  status        LabOrderStatus @default(PENDING)
  paymentStatus PaymentStatus  @default(UNPAID)

  amount      Float
  platformFee Float @default(0) // 5% للمختبرات المسجلة

  // Lab details
  labIsInPlatform Boolean @default(false)
  customLabName   String? // للمختبرات المخصصة
  customLabPhone  String?

  dueDate       DateTime
  deliveredDate DateTime?

  // Financial Integration
  financeRecordId     String? @unique
  isRecordedInFinance Boolean @default(false)

  // Tracking
  createdBy     String?
  createdByName String?
  updatedBy     String?
  updatedByName String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### نموذج Finance

```prisma
model Finance {
  id       String @id @default(cuid())
  clinicId String

  type     FinanceType     // REVENUE | EXPENSE
  category FinanceCategory // LAB_ORDER | ...

  amount      Float
  description String? @db.Text

  // التكامل ثنائي الاتجاه
  sourceType String? // "Lab" | "Patient" | "Inventory" | ...
  sourceId   String? // معرّف الطلب/المصدر
  sourceName String? // اسم المصدر للعرض

  // معلومات إضافية
  paymentMethod String?
  reference     String?

  // تتبع
  createdBy     String?
  createdByName String?
  createdByRole String?

  updatedBy     String?
  updatedByName String?

  // صلاحيات
  isEditable Boolean @default(true)
  isLocked   Boolean @default(false)

  date      DateTime @default(now())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## <a name="financial-integration"></a>💰 التكامل المالي | Financial Integration

### تدفق البيانات:

```
1. إنشاء طلب مختبر
   ↓
2. إنشاء سجل مالي تلقائياً
   - Type: EXPENSE
   - Category: LAB_ORDER
   - Amount: المبلغ المدخل
   - SourceType: "Lab"
   - SourceId: معرّف الطلب

3. ربط الطلب بالسجل المالي
   - LabOrder.financeRecordId = Finance.id
   - LabOrder.isRecordedInFinance = true

4. عند تحديث المبلغ:
   - تحديث LabOrder.amount
   - تحديث Finance.amount تلقائياً

5. عند حذف الطلب:
   - حذف LabOrder
   - حذف Finance تلقائياً
```

### مثال عملي:

```typescript
// إنشاء طلب مختبر بمبلغ 150,000 د.ع
POST /api/treatment-plans/plan_123/lab-order
{
  "amount": 150000,
  ...
}

// ✓ يتم إنشاء:
// 1. LabOrder {id: "order_456", amount: 150000}
// 2. Finance {
//      id: "finance_789",
//      type: "EXPENSE",
//      category: "LAB_ORDER",
//      amount: 150000,
//      sourceType: "Lab",
//      sourceId: "order_456"
//    }
// 3. ربط: LabOrder.financeRecordId = "finance_789"

// تحديث المبلغ إلى 160,000 د.ع
PATCH /api/lab-orders/order_456
{
  "amount": 160000
}

// ✓ يتم تحديث:
// 1. LabOrder.amount = 160000
// 2. Finance.amount = 160000 (تلقائياً)

// حذف الطلب
DELETE /api/lab-orders/order_456

// ✓ يتم حذف:
// 1. LabOrder (order_456)
// 2. Finance (finance_789) تلقائياً
```

---

## <a name="permissions"></a>🔐 الصلاحيات | Permissions

### للعيادة:

```typescript
enum Permission {
  VIEW_LAB_ORDERS   // عرض الطلبات
  ADD_LAB_ORDERS    // إنشاء طلبات جديدة
  EDIT_LAB_ORDERS   // تحديث الطلبات
  DELETE_LAB_ORDERS // حذف الطلبات
}
```

### للمختبر:

```typescript
enum Permission {
  VIEW_LAB_ORDERS   // عرض الطلبات الواردة
  EDIT_LAB_ORDERS   // تحديث حالة الطلبات (قبول/رفض/تحديث)
}
```

### للمالية:

```typescript
enum Permission {
  VIEW_FINANCES     // عرض السجلات المالية
  EDIT_FINANCES     // تعديل السجلات (حسب isEditable)
}

// السجلات المالية المرتبطة بطلبات المختبر:
- isEditable: true (قابل للتعديل بالصلاحيات)
- isLocked: false (غير مقفل)
- يمكن تعديلها من خلال تحديث الطلب نفسه
```

---

## <a name="troubleshooting"></a>🔧 استكشاف الأخطاء | Troubleshooting

### المشكلة: لا يظهر زر "طلب مختبر"

**الحل**:
1. تأكد من أن `plan.needsLab = true`
2. تأكد من عدم وجود `plan.labOrderId` (لم يتم الطلب بعد)
3. تأكد من تمرير `onCreateLabOrder` prop

---

### المشكلة: لا يتم تسجيل الطلب في المالية

**الحل**:
1. تحقق من transaction في API
2. تأكد من إنشاء Finance قبل ربطه
3. تحقق من logs في server

---

### المشكلة: لا تظهر المختبرات في القائمة

**الحل**:
1. تحقق من إضافة مختبرات في `/clinic/[id]/settings/labs`
2. تحقق من API `/api/saved-labs?clinicId=xxx`
3. تحقق من أن `clinicId` صحيح

---

### المشكلة: خطأ في حساب نسبة المنصة

**الحل**:
1. تأكد من أن `labIsInPlatform = true` للمختبرات المسجلة
2. تأكد من `platformFee = amount * 0.05`
3. للمختبرات المخصصة: `platformFee = 0`

---

## 📞 الدعم | Support

للحصول على المساعدة:
- راجع تقرير الاختبار: `TESTING_REPORT.md`
- افحص logs في console
- تحقق من البيانات في database

---

## 🎉 الخلاصة | Summary

نظام شامل ومتكامل لإدارة طلبات المختبر مع:
- ✅ واجهات سهلة الاستخدام
- ✅ تكامل مالي تلقائي
- ✅ دعم المختبرات المسجلة والمخصصة
- ✅ نظام إشعارات ومهام
- ✅ تتبع شامل للتغييرات
- ✅ نظام صلاحيات مرن

---

**تم التحديث**: 2025-01-26
**الإصدار**: 1.0.0
