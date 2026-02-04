# 📚 Smart Dental Community - دليل API الشامل

## 🔐 المصادقة (Authentication)

### تسجيل مستخدم جديد
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "اسم المستخدم",
  "phone": "+9647xxxxxxxxx",
  "role": "DENTIST|VENDOR|LAB|ADMIN",
  "specialization": "تخصص (للأطباء)",
  "licenseNumber": "رقم الرخصة",
  "companyName": "اسم الشركة (للموردين)",
  "labName": "اسم المختبر (للمختبرات)"
}
```

### تسجيل الدخول
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## 🏥 العيادات (Clinics)

### جلب جميع العيادات
```http
GET /api/clinics?ownerId={userId}&showOnMap=true
Authorization: Bearer {token}
```

### إنشاء عيادة جديدة
```http
POST /api/clinics
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "عيادة الأسنان المتقدمة",
  "address": "بغداد - الكرادة",
  "city": "Baghdad",
  "phone": "+9647xxxxxxxxx",
  "email": "clinic@example.com",
  "showOnMap": true,
  "workingHours": {
    "saturday": { "open": "09:00", "close": "17:00" },
    "sunday": { "open": "09:00", "close": "17:00" }
  }
}
```

### تحديث عيادة
```http
PATCH /api/clinics/{clinicId}
Authorization: Bearer {token}
Content-Type: application/json
```

### حذف عيادة
```http
DELETE /api/clinics/{clinicId}
Authorization: Bearer {token}
```

### إحصائيات العيادة
```http
GET /api/clinics/{clinicId}/stats
Authorization: Bearer {token}
```

**Response:**
```json
{
  "stats": {
    "patients": { "total": 150 },
    "appointments": { "total": 500, "today": 10, "pending": 5 },
    "finances": { "revenue": 50000, "expenses": 20000, "profit": 30000 },
    "inventory": { "lowStock": 3 },
    "treatments": { "active": 25 },
    "labOrders": { "pending": 7 }
  }
}
```

---

## 👥 المرضى (Patients)

### جلب المرضى
```http
GET /api/patients?clinicId={clinicId}&search={query}&limit=50&offset=0
Authorization: Bearer {token}
```

### إضافة مريض جديد
```http
POST /api/patients
Authorization: Bearer {token}
Content-Type: application/json

{
  "clinicId": "clinic_id",
  "name": "أحمد محمد",
  "phone": "+9647xxxxxxxxx",
  "email": "patient@example.com",
  "dateOfBirth": "1990-01-01",
  "gender": "male|female",
  "address": "بغداد - الكرادة",
  "medicalHistory": {},
  "allergies": ["Penicillin", "Latex"]
}
```

### تحديث مريض
```http
PATCH /api/patients/{patientId}
Authorization: Bearer {token}
```

### حذف مريض
```http
DELETE /api/patients/{patientId}
Authorization: Bearer {token}
```

### جلب بيانات الأسنان
```http
GET /api/patients/{patientId}/teeth
Authorization: Bearer {token}
```

### تحديث حالة سن
```http
PATCH /api/patients/{patientId}/teeth
Authorization: Bearer {token}
Content-Type: application/json

{
  "toothNumber": 18,
  "condition": "HEALTHY|CAVITY|FILLED|MISSING|CROWNED|ROOT_CANAL_TREATED|EXTRACTED|IMPLANT|DAMAGED",
  "previousTreatment": "حشوة 2023",
  "notes": "ملاحظات"
}
```

---

## 📅 المواعيد (Appointments)

### جلب المواعيد
```http
GET /api/appointments?clinicId={clinicId}&patientId={patientId}&status={status}&date={YYYY-MM-DD}
Authorization: Bearer {token}
```

### إنشاء موعد
```http
POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "clinicId": "clinic_id",
  "patientId": "patient_id",
  "staffId": "staff_id",
  "date": "2024-01-15T10:00:00Z",
  "duration": 30,
  "type": "فحص دوري",
  "status": "PENDING|CONFIRMED|CANCELLED|COMPLETED|NO_SHOW",
  "notes": "ملاحظات"
}
```

### تحديث موعد
```http
PATCH /api/appointments/{appointmentId}
Authorization: Bearer {token}
```

### حذف موعد
```http
DELETE /api/appointments/{appointmentId}
Authorization: Bearer {token}
```

---

## 🦷 الخطط العلاجية (Treatment Plans)

### جلب الخطط العلاجية
```http
GET /api/treatment-plans?patientId={patientId}
Authorization: Bearer {token}
```

### إنشاء خطة علاجية
```http
POST /api/treatment-plans
Authorization: Bearer {token}
Content-Type: application/json

{
  "patientId": "patient_id",
  "treatmentId": "treatment_id",
  "toothId": "tooth_id",
  "dentistId": "dentist_id",
  "totalCost": 500000,
  "notes": "ملاحظات",
  "sessions": [
    {
      "sessionNumber": 1,
      "scheduledDate": "2024-01-15T10:00:00Z",
      "notes": "الجلسة الأولى",
      "details": {}
    }
  ]
}
```

### تحديث خطة علاجية
```http
PATCH /api/treatment-plans/{planId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "progress": 50,
  "amountPaid": 250000,
  "notes": "تحديث"
}
```

---

## 💬 الرسائل (Messages)

### جلب الرسائل
```http
GET /api/messages?chatWith={userId}&type={type}&clinicId={clinicId}
Authorization: Bearer {token}
```

### إرسال رسالة
```http
POST /api/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "receiverId": "user_id",
  "content": "نص الرسالة",
  "type": "STAFF|VENDOR|LAB|ADMIN|COMMUNITY|SYSTEM",
  "clinicId": "clinic_id",
  "attachments": ["url1", "url2"]
}
```

### وضع علامة مقروءة
```http
PATCH /api/messages/{messageId}/read
Authorization: Bearer {token}
```

---

## 🔔 الإشعارات (Notifications)

### جلب الإشعارات
```http
GET /api/notifications?isRead=false&type={type}&limit=50
Authorization: Bearer {token}
```

### إنشاء إشعار (Admin فقط)
```http
POST /api/notifications
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user_id",
  "type": "APPOINTMENT|INVENTORY|ORDER|LAB_DELIVERY|TASK|MESSAGE|SYSTEM",
  "title": "عنوان الإشعار",
  "message": "نص الإشعار",
  "link": "/path/to/page",
  "data": {}
}
```

### وضع علامة مقروءة
```http
PATCH /api/notifications/{notificationId}/read
Authorization: Bearer {token}
```

### وضع علامة مقروءة على الكل
```http
PATCH /api/notifications/read-all
Authorization: Bearer {token}
```

---

## 📦 المخزون (Inventory)

### جلب المخزون
```http
GET /api/inventory?clinicId={clinicId}&lowStock=true
Authorization: Bearer {token}
```

### إضافة مادة
```http
POST /api/inventory
Authorization: Bearer {token}
Content-Type: application/json

{
  "clinicId": "clinic_id",
  "name": "قفازات طبية",
  "category": "مستلزمات طبية",
  "quantity": 100,
  "minQuantity": 20,
  "unit": "box",
  "expiryDate": "2025-12-31",
  "cost": 50000
}
```

### تحديث مادة
```http
PATCH /api/inventory/{itemId}
Authorization: Bearer {token}
```

### حذف مادة
```http
DELETE /api/inventory/{itemId}
Authorization: Bearer {token}
```

---

## 🧪 طلبات المختبرات (Lab Orders)

### جلب الطلبات
```http
GET /api/lab-orders?clinicId={clinicId}&labId={labId}&status={status}
Authorization: Bearer {token}
```

### إنشاء طلب
```http
POST /api/lab-orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "clinicId": "clinic_id",
  "labId": "lab_id",
  "planId": "plan_id",
  "orderType": "تاج خزف",
  "description": "تفاصيل الطلب",
  "specifications": {},
  "amount": 200000,
  "dueDate": "2024-01-20"
}
```

### تحديث طلب
```http
PATCH /api/lab-orders/{orderId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "PENDING|ACCEPTED|IN_PROGRESS|READY|IN_TRANSIT|DELIVERED|RETURNED",
  "paymentStatus": "PAID|UNPAID|PARTIAL",
  "deliveryStaffId": "staff_id",
  "deliveredDate": "2024-01-20"
}
```

---

## 💰 الشؤون المالية (Finances)

### جلب السجلات المالية
```http
GET /api/finances?clinicId={clinicId}&type={Revenue|Expense}&startDate={date}&endDate={date}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "finances": [...],
  "statistics": {
    "totalRevenue": 1000000,
    "totalExpense": 400000,
    "netProfit": 600000
  }
}
```

### إضافة سجل مالي
```http
POST /api/finances
Authorization: Bearer {token}
Content-Type: application/json

{
  "clinicId": "clinic_id",
  "type": "Revenue|Expense",
  "category": "Treatment|Inventory|Lab|Salary",
  "amount": 500000,
  "description": "وصف العملية",
  "date": "2024-01-15"
}
```

---

## 📤 رفع الملفات (Upload)

### رفع ملف إلى Cloudinary
```http
POST /api/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "file": [binary],
  "folder": "patients|treatments|documents"
}
```

**Response:**
```json
{
  "message": "تم رفع الملف بنجاح",
  "url": "https://cloudinary.com/...",
  "publicId": "smart-dental/..."
}
```

---

## 💳 الدفع (Payment)

### بدء عملية دفع
```http
POST /api/payment/init
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 500000,
  "orderId": "order_id",
  "serviceType": "Dental Services",
  "redirectUrl": "https://yoursite.com/callback"
}
```

**Response:**
```json
{
  "message": "تم إنشاء عملية الدفع بنجاح",
  "transactionId": "txn_123456",
  "paymentUrl": "https://zaincash.iq/pay/..."
}
```

### التحقق من الدفع
```http
POST /api/payment/verify
Authorization: Bearer {token}
Content-Type: application/json

{
  "transactionId": "txn_123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "الدفع صحيح"
}
```

---

## 🤖 الذكاء الاصطناعي (AI)

### الحصول على تشخيص ذكي
```http
POST /api/ai/diagnosis
Authorization: Bearer {token}
Content-Type: application/json

{
  "symptoms": "ألم شديد في الضرس العلوي الأيمن",
  "patientId": "patient_id",
  "patientHistory": "تاريخ طبي",
  "teethConditions": [...]
}
```

**Response:**
```json
{
  "message": "تم الحصول على التشخيص الذكي بنجاح",
  "diagnosis": {
    "diagnosis": "التهاب اللثة الحاد",
    "recommendedTreatments": ["تنظيف عميق", "مضاد حيوي"],
    "urgency": "high",
    "estimatedCost": "300000 - 500000 IQD",
    "notes": "ملاحظات إضافية"
  },
  "creditsRemaining": 9
}
```

---

## 🔌 WebSocket Events (Socket.io)

### الاتصال
```javascript
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)

// Join as user
socket.emit('user:join', userId)

// Listen for messages
socket.on('message:receive', (message) => {
  console.log('New message:', message)
})

// Send message
socket.emit('message:send', {
  senderId: 'user_id',
  receiverId: 'receiver_id',
  content: 'Message content',
  type: 'STAFF',
  clinicId: 'clinic_id'
})

// Typing indicator
socket.emit('message:typing', {
  to: 'receiver_id',
  from: 'user_id'
})

// Mark as read
socket.emit('message:read', {
  messageId: 'message_id',
  userId: 'user_id'
})

// Join clinic room
socket.emit('clinic:join', clinicId)

// Leave clinic room
socket.emit('clinic:leave', clinicId)

// Listen for notifications
socket.on('notification:new', ({ unreadCount }) => {
  console.log('Unread notifications:', unreadCount)
})

// Listen for online/offline status
socket.on('user:online', (userId) => {
  console.log('User online:', userId)
})

socket.on('user:offline', (userId) => {
  console.log('User offline:', userId)
})
```

---

## 📊 رموز الحالة (Status Codes)

- `200` - نجحت العملية
- `201` - تم الإنشاء بنجاح
- `400` - بيانات غير صالحة
- `401` - غير مصرح
- `403` - ممنوع
- `404` - غير موجود
- `500` - خطأ في الخادم

---

## 🔒 التفويض (Authorization)

جميع الطلبات تتطلب header التالي:
```
Authorization: Bearer {access_token}
```

يمكن الحصول على الـ token من خلال تسجيل الدخول.

---

## 🌍 البيئة (Environment Variables)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/smart_dental"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI
OPENAI_API_KEY="sk-..."

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud"
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# ZainCash
ZAINCASH_MERCHANT_ID="..."
ZAINCASH_SECRET="..."
ZAINCASH_MSISDN="..."
ZAINCASH_REDIRECT_URL="http://localhost:3000/api/payment/callback"

# Socket.io
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
```

---

## 📝 ملاحظات

- جميع التواريخ بصيغة ISO 8601
- جميع المبالغ بالدينار العراقي (IQD)
- جميع الاستجابات بصيغة JSON
- يدعم النظام اللغة العربية بشكل كامل (RTL)
