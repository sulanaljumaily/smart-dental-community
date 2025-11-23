# 🦷 Smart Dental Community Platform
## منصة المجتمع الطبي الذكية للأسنان

<div dir="rtl">

منصة متكاملة لإدارة عيادات الأسنان، تربط الأطباء بالموردين والمختبرات، وتوفر أدوات ذكية لإدارة المرضى والخطط العلاجية - **مع Backend و APIs كاملة وجاهزة للعمل!** ✅

</div>

## 🚀 المميزات الرئيسية

### 1. مركز الأطباء (Doctors Hub)
- **نظرة عامة**: إحصائيات شاملة لجميع العيادات
- **إدارة العيادات**: إدارة متعددة للعيادات مع إعدادات مخصصة
- **المهام والتذكيرات**: نظام ذكي لإدارة المهام
- **الرسائل**: تواصل فوري بين الأطراف
- **الإشعارات**: تنبيهات في الوقت الفعلي

### 2. لوحة تحكم العيادة (Clinic Dashboard)
#### الأقسام الثمانية:
1. **النظرة العامة**: إحصائيات مالية ونشاط العيادة
2. **الحجوزات**: تقويم تفاعلي أفقي لإدارة المواعيد
3. **المرضى**:
   - ملف طبي شامل لكل مريض
   - مخطط أسنان تفاعلي (32 سن)
   - نظام الخطة العلاجية المتقدم
   - خدمات ذكية بالذكاء الاصطناعي
   - أرشيف طبي رقمي
4. **الطاقم**: إدارة الصلاحيات والأدوار
5. **المختبر**:
   - طلبات المختبر مع تتبع الحالة
   - مختبرات محفوظة
   - دليل مختبرات المنصة
6. **المالية**: إيرادات ومصروفات مفصلة
7. **الأصول المادية**: مخزون وأجهزة
8. **التقارير**: تقارير تفصيلية قابلة للتصدير

### 3. نظام الخطة العلاجية (Treatment Plan System)
- مخطط أسنان تفاعلي 32 سن
- 10 أنواع علاج أساسية قابلة للتخصيص
- جلسات متعددة مع تفاصيل دقيقة
- تتبع التقدم والمدفوعات
- ربط مباشر مع المختبرات

### 4. المتجر الطبي (B2B Marketplace)
- تعدد الموردين والبراندات
- نظام طلبات ذكي
- تكامل مع مخزون العيادة
- عمولات تلقائية للمنصة

### 5. المجتمع الطبي (Medical Community)
- شبكة تواصل احترافية (Twitter/Facebook style)
- دورات وندوات تعليمية
- مكتبة 3D تعليمية
- مجموعات تخصصية

### 6. منصة الوظائف (Jobs Platform)
- نشر فرص عمل للعيادات
- سير ذاتية للأطباء
- تصفية حسب المحافظة والاختصاص

### 7. الخدمات الطبية للمرضى (Public Services)
- خريطة تفاعلية للعيادات القريبة
- نظام حجز بدون تسجيل
- تشخيص ذكي بالـ AI
- دليل طوارئ الأسنان
- مقالات توعوية

### 8. مركز إدارة المنصة (Admin Hub)
- إدارة المستخدمين والموافقات
- نظام الاشتراكات والباقات
- إدارة العمولات
- طرق الدفع العراقية (زين كاش)
- إحصائيات شاملة

## 🛠 التقنيات المستخدمة

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Bento UI Design)
- **Framer Motion** (Animations)
- **Zustand** (State Management)

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**

### Features
- **NextAuth.js** - المصادقة
- **Socket.io** - الرسائل الفورية
- **OpenAI API** - الخدمات الذكية
- **Google Maps API** - الخريطة التفاعلية
- **Cloudinary** - تخزين الصور

## 📱 التصميم

- **Mobile-First**: تصميم يدعم الهاتف أولاً
- **Bento UI**: تصميم بطاقات احترافي
- **RTL Support**: دعم كامل للغة العربية
- **PWA Ready**: جاهز كتطبيق ويب تقدمي

## 🗄 قاعدة البيانات

### الجداول الرئيسية:
- `User` - المستخدمون
- `Clinic` - العيادات
- `Patient` - المرضى
- `Appointment` - المواعيد
- `Treatment` - العلاجات
- `TreatmentPlan` - الخطط العلاجية
- `LabOrder` - طلبات المختبر
- `Product` - المنتجات
- `Order` - الطلبات
- `Post` - المنشورات
- `Job` - الوظائف
- `Message` - الرسائل
- `Notification` - الإشعارات

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- PostgreSQL 14+
- npm أو yarn

### 1. استنساخ المشروع
```bash
git clone https://github.com/your-repo/smart-dental-community.git
cd smart-dental-community
```

### 2. تثبيت الحزم
```bash
npm install
```

### 3. إعداد البيئة
انسخ ملف `.env.example` إلى `.env` وأضف المتغيرات:
```bash
cp .env.example .env
```

### 4. إعداد قاعدة البيانات
```bash
# إنشاء قاعدة البيانات
createdb smart_dental

# تشغيل Migrations
npx prisma migrate dev

# توليد Prisma Client
npx prisma generate
```

### 5. تشغيل المشروع

#### تطوير (Development)
```bash
# تشغيل Next.js
npm run dev

# تشغيل Socket.io server (في terminal آخر)
node socket-server.js
```

#### إنتاج (Production)
```bash
# بناء المشروع
npm run build

# تشغيل
npm start

# تشغيل Socket.io server
NODE_ENV=production node socket-server.js
```

المشروع سيعمل على:
- Frontend: http://localhost:3000
- Socket.io: http://localhost:3001

---

## 🔧 الإعدادات

### متغيرات البيئة (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/smart_dental"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI (للخدمات الذكية)
OPENAI_API_KEY="sk-..."

# Google Maps (للخريطة التفاعلية)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza..."

# Cloudinary (لتخزين الصور)
CLOUDINARY_CLOUD_NAME="your-cloud"
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="..."

# Payment (زين كاش)
ZAINCASH_MERCHANT_ID="..."
ZAINCASH_SECRET="..."
ZAINCASH_MSISDN="..."
ZAINCASH_REDIRECT_URL="http://localhost:3000/api/payment/callback"

# Socket.io Server
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"

# App Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## 🌐 APIs المتاحة

### ✅ تم تطبيق Backend كامل!

المشروع يحتوي الآن على:
- ✅ **نظام المصادقة الكامل** مع NextAuth.js
- ✅ **APIs للمواعيد** (CRUD كامل)
- ✅ **APIs للمرضى** مع مخطط الأسنان
- ✅ **APIs للخطط العلاجية** مع الجلسات
- ✅ **نظام الرسائل الفورية** مع Socket.io
- ✅ **نظام الإشعارات** الحية
- ✅ **تكامل Cloudinary** لرفع الصور
- ✅ **تكامل ZainCash** للدفع الإلكتروني
- ✅ **تكامل Google Maps** للخرائط
- ✅ **تكامل OpenAI** للخدمات الذكية
- ✅ **APIs المخزون** مع التنبيهات
- ✅ **APIs طلبات المختبرات**
- ✅ **نظام الشؤون المالية**
- ✅ **APIs العيادات** مع الإحصائيات

للاطلاع على التوثيق الكامل للـ APIs، راجع **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

## 📂 بنية المشروع

```
smart-dental-community/
├── app/                    # Next.js App Router
│   ├── auth/              # صفحات المصادقة
│   ├── dentist/           # مركز الأطباء
│   ├── clinic/            # لوحة تحكم العيادة
│   ├── vendor/            # مركز الموردين
│   ├── lab/               # مركز المختبرات
│   ├── admin/             # مركز الإدارة
│   ├── community/         # المجتمع الطبي
│   ├── marketplace/       # المتجر
│   ├── jobs/              # الوظائف
│   └── services/          # الخدمات الطبية
├── components/            # المكونات
│   ├── ui/               # مكونات UI الأساسية
│   └── features/         # مكونات الميزات
├── lib/                   # المكتبات المساعدة
├── prisma/               # Prisma Schema
└── public/               # الملفات العامة
```

## 🎨 نظام الألوان

- **Primary**: Blue (#2563eb)
- **Secondary**: Purple (#9333ea)
- **Accent**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)

## 🔐 الأدوار والصلاحيات

1. **DENTIST** - طبيب أسنان (مالك/طاقم)
2. **VENDOR** - مورد
3. **LAB** - معمل أسنان
4. **ADMIN** - إدارة المنصة
5. **STAFF** - طاقم العيادة

## 💳 طرق الدفع المدعومة

- زين كاش (ZainCash)
- التحويل المحلي عبر وكلاء المنصة

## 📊 الاشتراكات

### الباقات:
1. **FREE** - مجاني (محدود)
2. **BASIC** - أساسي
3. **PROFESSIONAL** - احترافي
4. **ENTERPRISE** - مؤسسي

### المميزات حسب الباقة:
- عدد المرضى المسموح
- تعدد العيادات
- الخدمات الذكية (AI)
- الدعم الفني

## 🌍 الدعم الجغرافي

المنصة مصممة خصيصاً للسوق العراقي مع دعم:
- جميع المحافظات العراقية
- العملة العراقية (IQD)
- اللغة العربية بالكامل
- طرق الدفع المحلية

## 📝 الترخيص

© 2024 Smart Dental Community. جميع الحقوق محفوظة.

## 🤝 المساهمة

هذا المشروع تحت التطوير النشط. للمساهمة أو الاستفسارات، يرجى التواصل مع فريق التطوير.

## 📞 الدعم الفني

للدعم الفني أو الاستفسارات:
- البريد الإلكتروني: support@smartdental.iq
- الهاتف: +964 XXX XXX XXXX

---

---

## 📁 هيكل المشروع الكامل

```
smart-dental-community/
├── prisma/
│   └── schema.prisma          # نموذج قاعدة البيانات الكامل
├── src/
│   ├── app/
│   │   ├── api/               # ✅ API Routes (مكتمل)
│   │   │   ├── auth/          # المصادقة
│   │   │   ├── appointments/  # المواعيد
│   │   │   ├── patients/      # المرضى
│   │   │   ├── treatment-plans/ # الخطط العلاجية
│   │   │   ├── messages/      # الرسائل
│   │   │   ├── notifications/ # الإشعارات
│   │   │   ├── inventory/     # المخزون
│   │   │   ├── lab-orders/    # طلبات المختبرات
│   │   │   ├── finances/      # المالية
│   │   │   ├── clinics/       # العيادات
│   │   │   ├── upload/        # رفع الملفات
│   │   │   ├── payment/       # الدفع
│   │   │   └── ai/            # الذكاء الاصطناعي
│   │   ├── dentist/           # لوحة تحكم الطبيب
│   │   ├── clinic/            # لوحة تحكم العيادة
│   │   ├── vendor/            # لوحة تحكم المورد
│   │   ├── lab/               # لوحة تحكم المختبر
│   │   └── platform-admin/    # لوحة إدارة المنصة
│   ├── components/
│   │   ├── ui/                # مكونات shadcn/ui
│   │   └── shared/            # مكونات مشتركة
│   ├── lib/                   # ✅ المكتبات (مكتملة)
│   │   ├── prisma.ts          # Prisma client
│   │   ├── auth.ts            # NextAuth config
│   │   ├── cloudinary.ts      # Cloudinary integration
│   │   ├── zaincash.ts        # ZainCash integration
│   │   ├── openai.ts          # OpenAI services
│   │   └── google-maps.ts     # Google Maps helper
│   ├── types/                 # TypeScript types
│   └── middleware.ts          # Route protection
├── socket-server.js           # ✅ Socket.io server (مكتمل)
├── API_DOCUMENTATION.md       # ✅ توثيق APIs الكامل
├── .env                       # متغيرات البيئة
├── package.json
└── README.md
```

---

## 🔐 نظام المصادقة المكتمل

المشروع يستخدم **NextAuth.js v5** مع Prisma Adapter:

```typescript
// تسجيل مستخدم جديد
POST /api/auth/register

// تسجيل الدخول
POST /api/auth/signin

// تسجيل الخروج
POST /api/auth/signout
```

### الأدوار (Roles)
- **DENTIST**: طبيب أسنان
- **VENDOR**: مورد
- **LAB**: مختبر أسنان
- **ADMIN**: إدارة المنصة
- **STAFF**: طاقم العيادة
- **PATIENT**: مريض (للاستخدام المستقبلي)

---

## 💬 Socket.io (الرسائل الفورية)

### تشغيل الخادم
```bash
node socket-server.js
```

### الميزات المدعومة
- ✅ الرسائل الفورية
- ✅ حالة المستخدم (Online/Offline)
- ✅ مؤشر الكتابة (Typing indicator)
- ✅ إشعارات فورية
- ✅ غرف العيادات (Clinic rooms)
- ✅ قراءة الرسائل

---

## 📊 قاعدة البيانات Prisma

### أوامر مفيدة
```bash
# تشغيل migrations
npx prisma migrate dev

# فتح Prisma Studio (GUI)
npx prisma studio

# إعادة توليد Client
npx prisma generate

# إعادة تعيين قاعدة البيانات
npx prisma migrate reset

# Push schema بدون migrations
npx prisma db push
```

### الجداول الرئيسية (15+ جدول)
- `User`, `DentistProfile`, `VendorProfile`, `LabProfile`
- `Clinic`, `ClinicStaff`, `Patient`, `Tooth`
- `Appointment`, `Treatment`, `TreatmentPlan`, `TreatmentSession`
- `LabOrder`, `LabDeliveryStaff`, `SavedLab`
- `Finance`, `PatientFinance`, `InventoryItem`, `Asset`
- `Task`, `Product`, `Order`, `OrderItem`
- `Post`, `Comment`, `Job`
- `Message`, `Notification`, `PatientDocument`

---

## 📦 النشر (Deployment)

### Vercel (موصى به للـ Next.js)
```bash
npm install -g vercel
vercel
```

### ملاحظات مهمة للنشر:
1. أضف متغيرات البيئة في Vercel Dashboard
2. قم بنشر Socket.io server بشكل منفصل
3. استخدم PostgreSQL من Vercel أو خدمة خارجية
4. قم بتشغيل `prisma generate` في build command

---

## 🎯 حالة المشروع

### ✅ مكتمل 100%
- [x] نظام المصادقة الكامل
- [x] إدارة العيادات والمرضى
- [x] المواعيد والخطط العلاجية
- [x] مخطط الأسنان التفاعلي (32 سن)
- [x] الرسائل الفورية (Socket.io)
- [x] الإشعارات الحية
- [x] المخزون والمختبرات
- [x] الشؤون المالية
- [x] تكامل الذكاء الاصطناعي (OpenAI)
- [x] نظام الدفع (ZainCash)
- [x] رفع الملفات (Cloudinary)
- [x] الخرائط (Google Maps)
- [x] APIs كاملة ومُوثّقة
- [x] Socket.io Server
- [x] Middleware للحماية
- [x] TypeScript Types كاملة

### 🚀 المشروع جاهز للاستخدام!

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add AmazingFeature'`)
4. Push للـ branch (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

---

## 📄 الترخيص

© 2024 Smart Dental Community. جميع الحقوق محفوظة.

---

## 📞 التواصل والدعم

للدعم والاستفسارات:
- Email: support@smartdental.iq
- Website: https://smartdental.iq

---

## 🙏 شكر خاص

- **shadcn/ui** للمكونات الرائعة
- **Prisma** لـ ORM المميز
- **Next.js** للفريم وورك الرائع
- **OpenAI** لخدمات الذكاء الاصطناعي
- **Socket.io** للرسائل الفورية

---

**صُنع بـ ❤️ في العراق 🇮🇶 | Built with ❤️ for the Iraqi Dental Community**
