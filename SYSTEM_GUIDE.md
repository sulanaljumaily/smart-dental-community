# 📘 دليل النظام الشامل - Smart Dental Community

## 🎯 نظرة عامة

هذا دليل شامل يشرح كيفية عمل النظام من منظور كل مستخدم مع الربط الحقيقي بين جميع الأطراف.

---

## 👥 الأدوار في النظام

### 1. 🏥 **مالك العيادة (Clinic Owner)**
- دور: `DENTIST` (مع ملكية عيادة واحدة أو أكثر)
- الصلاحيات:
  - إنشاء وإدارة عياداته
  - إضافة وإدارة الطاقم
  - منح الصلاحيات للطاقم
  - عرض إحصائيات جميع عياداته
  - إدارة المرضى والمواعيد
  - إدارة المخزون والمالية

### 2. 👨‍⚕️ **طاقم العيادة (Staff)**
- الأدوار:
  - `DENTIST` - طبيب
  - `ASSISTANT` - مساعد
  - `RECEPTIONIST` - استقبال
  - `NURSE` - ممرض
- الصلاحيات:
  - تعتمد على ما يمنحه مالك العيادة
  - يرى عيادة واحدة فقط (التي يعمل بها)
  - الإحصائيات محدودة بعيادته فقط

### 3. 🏪 **المورد (Vendor)**
- دور: `VENDOR`
- الصلاحيات:
  - إضافة وإدارة المنتجات
  - استقبال وإدارة الطلبات
  - التواصل مع العيادات
  - عرض الإحصائيات والمبيعات

### 4. 🧪 **المختبر (Lab)**
- دور: `LAB`
- الصلاحيات:
  - استقبال طلبات المختبر من العيادات
  - إدارة حالة الطلبات
  - إدارة الممثلين والتوصيل
  - التواصل مع العيادات

### 5. 🎯 **إدارة المنصة (Platform Admin)**
- دور: `ADMIN`
- الصلاحيات:
  - إدارة جميع المستخدمين
  - قبول أو رفض الموردين والمختبرات
  - عرض إحصائيات شاملة
  - إدارة الاشتراكات والباقات
  - إرسال الإشعارات

---

## 🔄 سير العمل (Workflow)

### 📋 سيناريو 1: إنشاء عيادة وإضافة طاقم

#### الخطوة 1: مالك العيادة يُسجل في المنصة
```http
POST /api/auth/register
{
  "email": "owner@clinic.com",
  "password": "password123",
  "name": "د. أحمد محمد",
  "role": "DENTIST",
  "specialization": "تقويم الأسنان"
}
```

#### الخطوة 2: إنشاء العيادة
```http
POST /api/clinics
{
  "name": "عيادة الأسنان المتقدمة",
  "address": "بغداد - الكرادة",
  "phone": "+9647xxxxxxxxx"
}
```

#### الخطوة 3: إضافة طاقم للعيادة
```http
POST /api/clinics/{clinicId}/staff
{
  "name": "د. فاطمة علي",
  "email": "fatima@clinic.com",
  "phone": "+9647xxxxxxxxx",
  "role": "DENTIST",
  "specialty": "حشوات تجميلية",
  "permissions": [
    "VIEW_PATIENTS",
    "ADD_PATIENTS",
    "VIEW_APPOINTMENTS",
    "ADD_APPOINTMENTS",
    "VIEW_TREATMENTS"
  ],
  "password": "dentist123"
}
```

#### الخطوة 4: الطاقم يسجل الدخول
```http
POST /api/auth/staff-login
{
  "email": "fatima@clinic.com",
  "password": "dentist123",
  "clinicId": "clinic_id"
}
```

**النتيجة:**
- الطاقم يدخل إلى "مركز الأطباء"
- يرى إحصائيات عيادة واحدة فقط
- في قسم "إدارة العيادات" يرى عيادة واحدة
- الإشعارات والمهام مربوطة باسم العيادة

---

### 📋 سيناريو 2: مالك يدير عدة عيادات

#### عند دخول مالك العيادة لـ "مركز الأطباء":

```http
GET /api/dentist/dashboard
```

**الاستجابة:**
```json
{
  "dashboard": {
    "clinics": [
      {
        "id": "clinic1",
        "name": "عيادة الكرادة",
        "patients": 150,
        "appointments": 500
      },
      {
        "id": "clinic2",
        "name": "عيادة المنصور",
        "patients": 100,
        "appointments": 300
      }
    ],
    "statistics": {
      "totalClinics": 2,
      "totalPatients": 250,
      "todayAppointments": 15,
      "pendingTasks": 5
    },
    "recentNotifications": [
      {
        "title": "نقص مخزون",
        "message": "نقص في مادة القفازات الطبية",
        "clinicName": "عيادة الكرادة",
        "staffName": "د. فاطمة",
        "staffRole": "DENTIST"
      },
      {
        "title": "مريض جديد",
        "message": "تم إضافة مريض جديد",
        "clinicName": "عيادة المنصور",
        "staffName": "استقبال أحمد",
        "staffRole": "RECEPTIONIST"
      }
    ],
    "recentTasks": [
      {
        "title": "مراجعة حالة مريض",
        "clinic": {
          "name": "عيادة الكرادة"
        },
        "assignedToName": "د. فاطمة",
        "assignedToRole": "DENTIST"
      }
    ]
  }
}
```

#### عند دخول الطاقم لـ "مركز الأطباء":

```http
GET /api/dentist/dashboard
```

**الاستجابة:**
```json
{
  "dashboard": {
    "clinics": [
      {
        "id": "clinic1",
        "name": "عيادة الكرادة"
      }
    ],
    "statistics": {
      "totalClinics": 1,
      "totalPatients": 150,
      "todayAppointments": 8
    },
    "isStaff": true,
    "staffClinicId": "clinic1"
  }
}
```

---

### 📋 سيناريو 3: إدارة الصلاحيات

#### المالك يحدث صلاحيات الطاقم:

```http
PATCH /api/clinics/{clinicId}/staff/{staffId}
{
  "permissions": [
    "VIEW_PATIENTS",
    "ADD_PATIENTS",
    "EDIT_PATIENTS",
    "VIEW_APPOINTMENTS",
    "ADD_APPOINTMENTS",
    "EDIT_APPOINTMENTS",
    "VIEW_TREATMENTS",
    "ADD_TREATMENTS"
  ]
}
```

#### الصلاحيات المتاحة:
```typescript
enum Permission {
  // المرضى
  VIEW_PATIENTS,
  ADD_PATIENTS,
  EDIT_PATIENTS,
  DELETE_PATIENTS,

  // المواعيد
  VIEW_APPOINTMENTS,
  ADD_APPOINTMENTS,
  EDIT_APPOINTMENTS,
  DELETE_APPOINTMENTS,

  // العلاجات
  VIEW_TREATMENTS,
  ADD_TREATMENTS,
  EDIT_TREATMENTS,
  DELETE_TREATMENTS,

  // المالية
  VIEW_FINANCES,
  ADD_FINANCES,
  EDIT_FINANCES,
  DELETE_FINANCES,

  // المخزون
  VIEW_INVENTORY,
  ADD_INVENTORY,
  EDIT_INVENTORY,
  DELETE_INVENTORY,

  // المختبر
  VIEW_LAB_ORDERS,
  ADD_LAB_ORDERS,
  EDIT_LAB_ORDERS,
  DELETE_LAB_ORDERS,

  // الطاقم
  VIEW_STAFF,
  ADD_STAFF,
  EDIT_STAFF,
  DELETE_STAFF,

  // الإعدادات
  VIEW_SETTINGS,
  EDIT_SETTINGS,

  // التقارير
  VIEW_REPORTS,
  EXPORT_REPORTS
}
```

---

### 📋 سيناريو 4: المورد يضيف منتج

#### المورد يسجل:
```http
POST /api/auth/register
{
  "email": "vendor@supply.com",
  "password": "password123",
  "name": "شركة المستلزمات الطبية",
  "role": "VENDOR",
  "companyName": "Medical Supplies Co."
}
```

#### إدارة المنصة توافق:
```http
POST /api/platform-admin/approve-vendor
{
  "vendorId": "vendor_id",
  "approved": true
}
```

#### المورد يضيف منتج:
```http
POST /api/products
{
  "name": "قفازات طبية",
  "category": "مستلزمات",
  "price": 50000,
  "stock": 1000,
  "images": ["url1", "url2"]
}
```

#### لوحة تحكم المورد:
```http
GET /api/vendor/dashboard
```

**الاستجابة:**
```json
{
  "dashboard": {
    "vendor": {
      "companyName": "Medical Supplies Co.",
      "isApproved": true
    },
    "statistics": {
      "totalProducts": 50,
      "activeProducts": 45,
      "totalOrders": 200,
      "pendingOrders": 15,
      "totalRevenue": 10000000
    },
    "recentOrders": [...],
    "lowStockProducts": [...]
  }
}
```

---

### 📋 سيناريو 5: المختبر يستقبل طلب

#### المختبر يسجل:
```http
POST /api/auth/register
{
  "email": "lab@dental.com",
  "password": "password123",
  "name": "مختبر الأسنان المتقدم",
  "role": "LAB",
  "labName": "Advanced Dental Lab"
}
```

#### العيادة تُنشئ طلب:
```http
POST /api/lab-orders
{
  "clinicId": "clinic_id",
  "labId": "lab_id",
  "orderType": "تاج خزف",
  "amount": 200000,
  "dueDate": "2024-02-01"
}
```

#### المختبر يحدث حالة الطلب:
```http
PATCH /api/lab-orders/{orderId}
{
  "status": "IN_PROGRESS"
}
```

#### لوحة تحكم المختبر:
```http
GET /api/lab/dashboard
```

**الاستجابة:**
```json
{
  "dashboard": {
    "lab": {
      "labName": "Advanced Dental Lab",
      "isApproved": true
    },
    "statistics": {
      "totalOrders": 500,
      "pendingOrders": 20,
      "inProgressOrders": 15,
      "readyOrders": 5,
      "totalRevenue": 50000000
    },
    "recentOrders": [
      {
        "id": "order_id",
        "clinic": {
          "name": "عيادة الكرادة"
        },
        "orderType": "تاج خزف",
        "status": "IN_PROGRESS"
      }
    ]
  }
}
```

---

### 📋 سيناريو 6: إدارة المنصة

#### لوحة تحكم الإدارة:
```http
GET /api/platform-admin/dashboard
```

**الاستجابة:**
```json
{
  "dashboard": {
    "statistics": {
      "users": {
        "total": 5000,
        "dentists": 1000,
        "vendors": 50,
        "labs": 30
      },
      "clinics": 800,
      "patients": 50000,
      "marketplace": {
        "totalOrders": 10000,
        "totalRevenue": 500000000,
        "platformRevenue": 25000000
      },
      "labs": {
        "totalOrders": 5000,
        "totalRevenue": 300000000
      },
      "pending": {
        "vendors": 5,
        "labs": 3
      }
    },
    "pendingApprovals": {
      "vendors": [...],
      "labs": [...]
    }
  }
}
```

---

## 🔐 نظام المصادقة والأدوار

### 1. تسجيل الدخول العادي (للأطباء، موردين، مختبرات، إدارة)
```http
POST /api/auth/signin
{
  "email": "user@example.com",
  "password": "password"
}
```

### 2. تسجيل دخول الطاقم
```http
POST /api/auth/staff-login
{
  "email": "staff@clinic.com",
  "password": "password",
  "clinicId": "clinic_id"
}
```

### 3. Session Data للطاقم:
```typescript
{
  id: "staff_id",
  email: "staff@clinic.com",
  name: "د. فاطمة",
  role: "STAFF",
  isStaff: true,
  clinicId: "clinic_id",
  clinicName: "عيادة الكرادة",
  staffRole: "DENTIST",
  permissions: ["VIEW_PATIENTS", "ADD_PATIENTS", ...]
}
```

---

## 📊 نظام الإشعارات المحسّن

### الإشعارات مع بيانات العيادة:
```typescript
{
  id: "notif_id",
  type: "INVENTORY",
  title: "تنبيه مخزون منخفض",
  message: "مادة القفازات الطبية أصبحت في المخزون المنخفض",
  clinicId: "clinic_id",
  clinicName: "عيادة الكرادة",
  staffName: "د. فاطمة",
  staffRole: "DENTIST",
  createdAt: "2024-01-15T10:00:00Z"
}
```

### إنشاء إشعار مع بيانات العيادة:
```http
POST /api/notifications
{
  "userId": "user_id",
  "type": "TASK",
  "title": "مهمة جديدة",
  "message": "مراجعة حالة المريض أحمد",
  "clinicId": "clinic_id",
  "clinicName": "عيادة الكرادة",
  "staffName": "د. فاطمة",
  "staffRole": "DENTIST"
}
```

---

## 🎯 نقاط الربط الرئيسية

### 1. الطاقم ↔ العيادة
- كل عضو طاقم مرتبط بعيادة واحدة
- الصلاحيات محددة من قبل المالك
- الإحصائيات محدودة بعيادته فقط

### 2. المواعيد ↔ الطاقم
- المواعيد مرتبطة بعضو طاقم محدد
- يمكن عرض مواعيد الطاقم فقط

### 3. الإشعارات ↔ العيادة
- كل إشعار يحتوي على:
  - اسم العيادة
  - اسم الطاقم المسؤول
  - دور الطاقم

### 4. المهام ↔ الطاقم والعيادة
- المهام مرتبطة بعيادة ومُنشئ ومُكلّف
- عرض اسم العيادة في كل مهمة

### 5. الرسائل ↔ السياق
- كل رسالة تحتوي على:
  - معرف العيادة
  - دور المرسل
  - دور المستقبل

---

## 📝 أمثلة الاستخدام الكاملة

### مثال 1: إضافة مريض من قبل الطاقم
```http
POST /api/patients
Authorization: Bearer {staff_token}

{
  "clinicId": "clinic_id",
  "name": "أحمد محمد",
  "phone": "+9647xxxxxxxxx"
}
```

**التحقق من الصلاحيات:**
```typescript
// في الـ API
const staff = await prisma.clinicStaff.findFirst({
  where: {
    userId: session.user.id,
    clinicId: validatedData.clinicId,
    permissions: { has: 'ADD_PATIENTS' }
  }
})

if (!staff) {
  return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })
}
```

### مثال 2: عرض الإحصائيات للطاقم
```http
GET /api/dentist/dashboard
Authorization: Bearer {staff_token}
```

**النتيجة:**
- يرى عيادة واحدة فقط
- إحصائيات محدودة بعيادته
- إشعارات ومهام مربوطة بعيادته

### مثال 3: المالك يدير الطاقم
```http
GET /api/clinics/{clinicId}/staff
Authorization: Bearer {owner_token}
```

**النتيجة:**
- قائمة بجميع الطاقم
- صلاحيات كل عضو
- آخر تسجيل دخول

---

## 🚀 الخلاصة

النظام الآن مربوط بشكل كامل:

✅ **نظام الطاقم:**
- إضافة وإدارة الطاقم من قبل المالك
- تسجيل دخول منفصل للطاقم
- صلاحيات قابلة للتخصيص

✅ **نظام الإحصائيات:**
- المالك يرى جميع عياداته
- الطاقم يرى عيادته فقط
- إحصائيات مفصلة لكل عيادة

✅ **نظام الإشعارات:**
- إشعارات مربوطة باسم العيادة
- معلومات الطاقم المسؤول
- الدور والسياق الكامل

✅ **Dashboard لكل دور:**
- طبيب/مالك
- طاقم العيادة
- مورد
- مختبر
- إدارة المنصة

✅ **الربط الكامل:**
- كل شيء مربوط بالعيادة
- الصلاحيات محددة
- السياق واضح في كل عملية

---

**🎉 المشروع جاهز بشكل كامل واحترافي!**
