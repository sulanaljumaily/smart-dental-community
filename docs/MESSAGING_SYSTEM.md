# نظام الرسائل الاحترافي - Smart Dental Community

## نظرة عامة

تم تطوير نظام رسائل احترافي ومتطور للمنصة يدعم:
- ✅ بطاقات الأشخاص القابلة للتمرير الأفقي
- ✅ نظام فلترة متقدم حسب النوع والعيادات
- ✅ إرفاق الملفات (صور، PDF، مستندات)
- ✅ واجهة متجاوبة مع الهاتف والتابلت
- ✅ تصميم Bento UI عصري واحترافي
- ✅ دعم المحادثات بين جميع أنواع المستخدمين

## الميزات الرئيسية

### 1. بطاقات الأشخاص القابلة للتمرير الأفقي

يعرض النظام جهات الاتصال في بطاقات صغيرة دائرية أو مربعة بحواف مستديرة، مجمعة حسب النوع:

#### للأطباء ومالكي العيادات:
- **طاقم العيادة** (Doctors, Assistants, Receptionists, Nurses)
- **الموردين** (Medical Supply Vendors)
- **معامل الأسنان** (Dental Labs)
- **الدعم الفني** (Platform Support)
- **المجتمع الطبي** (Other Dentists & Professionals)

#### المميزات:
- أزرار تمرير يسار/يمين للتنقل السهل
- عرض حالة الاتصال (متصل/غير متصل)
- عداد الرسائل غير المقروءة على كل بطاقة
- صور الأفاتار مع fallback للأحرف الأولى

### 2. نظام الفلترة المتقدم

#### فلاتر سريعة:
```typescript
- الكل: عرض جميع المحادثات
- طاقم العيادة: محادثات مع الأطباء والمساعدين
- الموردين: محادثات مع الموردين
- المعامل: محادثات مع معامل الأسنان
- الدعم الفني: محادثات مع فريق الدعم
- المجتمع: محادثات مع المجتمع الطبي
```

#### بحث ذكي:
- البحث في أسماء الأشخاص
- البحث في أسماء العيادات
- نتائج فورية أثناء الكتابة

### 3. إرفاق الملفات

#### الأنواع المدعومة:
- صور: JPEG, PNG, GIF, WebP
- مستندات: PDF
- Word: DOC, DOCX
- Excel: XLS, XLSX
- نصوص: TXT

#### المواصفات:
- الحد الأقصى: 10MB للملف الواحد
- رفع تلقائي إلى Cloudinary
- معاينة قبل الإرسال
- إمكانية حذف المرفقات قبل الإرسال

### 4. الواجهة المتجاوبة

#### على سطح المكتب (Desktop):
- عرض ثلاثي الأعمدة
- قائمة المحادثات على اليمين
- منطقة الرسائل في الوسط والشمال

#### على الهاتف (Mobile):
- عرض واحد في كل مرة
- التنقل بين القوائم بأزرار سهلة
- تجربة مستخدم محسنة للشاشات الصغيرة

## البنية التقنية

### 1. قاعدة البيانات (Prisma Schema)

#### موديل Conversation
```prisma
model Conversation {
  id             String      @id @default(cuid())
  participant1Id String
  participant2Id String
  type           MessageType @default(STAFF)
  clinicId       String?
  lastMessageAt  DateTime    @default(now())
  lastMessage    String?
  messages       Message[]
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
}
```

#### موديل Message
```prisma
model Message {
  id             String       @id @default(cuid())
  conversationId String
  senderId       String
  receiverId     String
  content        String       @db.Text
  type           MessageType  @default(STAFF)
  clinicId       String?
  attachments    Json[]       @default([])
  isRead         Boolean      @default(false)
  readAt         DateTime?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}
```

### 2. API Endpoints

#### المحادثات
```
GET  /api/conversations          - الحصول على جميع المحادثات
POST /api/conversations          - إنشاء محادثة جديدة
GET  /api/conversations/[id]     - الحصول على محادثة محددة
DELETE /api/conversations/[id]   - حذف محادثة
```

#### الرسائل
```
GET  /api/messages               - الحصول على الرسائل
POST /api/messages               - إرسال رسالة جديدة
PUT  /api/messages/[id]/read     - تحديد رسالة كمقروءة
```

#### رفع الملفات
```
POST /api/upload                 - رفع ملف
DELETE /api/upload?publicId=...  - حذف ملف
```

### 3. المكونات (Components)

#### MessagingInterface
المكون الرئيسي للواجهة:

```typescript
<MessagingInterface
  userId={session.user.id}
  userRole={session.user.role}
  contacts={contacts}
  conversations={conversations}
  onSendMessage={handleSendMessage}
  onLoadMessages={handleLoadMessages}
  onUploadFile={handleUploadFile}
/>
```

#### الخصائص (Props):
- `userId`: معرف المستخدم الحالي
- `userRole`: دور المستخدم (DENTIST, VENDOR, LAB, ADMIN, STAFF)
- `contacts`: قائمة جهات الاتصال
- `conversations`: قائمة المحادثات
- `onSendMessage`: دالة إرسال الرسالة
- `onLoadMessages`: دالة تحميل الرسائل
- `onUploadFile`: دالة رفع الملفات

## كيفية الاستخدام

### 1. تطبيق التغييرات على قاعدة البيانات

```bash
# تطبيق migration
npx prisma migrate dev --name add_conversation_model

# توليد Prisma Client
npx prisma generate
```

### 2. استخدام المكون في الصفحة

```typescript
import { MessagingInterface } from "@/components/messages"

export default function MessagesPage() {
  // تحميل البيانات
  const loadData = async () => {
    const res = await fetch("/api/conversations")
    const data = await res.json()
    // ...
  }

  // إرسال رسالة
  const handleSendMessage = async (conversationId, content, attachments) => {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        conversationId,
        content,
        attachments,
      }),
    })
  }

  // تحميل رسائل محادثة
  const handleLoadMessages = async (conversationId) => {
    const res = await fetch(`/api/conversations/${conversationId}`)
    const data = await res.json()
    return data.conversation.messages
  }

  // رفع ملف
  const handleUploadFile = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", "messages")

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    return {
      name: file.name,
      url: data.url,
      type: file.type,
      size: file.size,
    }
  }

  return (
    <MessagingInterface
      userId={userId}
      userRole={userRole}
      contacts={contacts}
      conversations={conversations}
      onSendMessage={handleSendMessage}
      onLoadMessages={handleLoadMessages}
      onUploadFile={handleUploadFile}
    />
  )
}
```

### 3. إضافة Real-time Messaging (اختياري)

للحصول على تحديثات فورية للرسائل، يمكنك إضافة:

#### Option 1: Polling
```typescript
useEffect(() => {
  const interval = setInterval(async () => {
    await loadData() // تحديث المحادثات كل 5 ثواني
  }, 5000)

  return () => clearInterval(interval)
}, [])
```

#### Option 2: WebSockets (يتطلب إعداد Socket.io)
```typescript
import { io } from "socket.io-client"

const socket = io()

socket.on("new_message", (message) => {
  // تحديث المحادثات عند وصول رسالة جديدة
  updateConversations(message)
})
```

## التخصيص

### تغيير الألوان

يمكنك تخصيص الألوان في ملف `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: "#3b82f6", // اللون الأساسي
    600: "#2563eb",
    700: "#1d4ed8",
  }
}
```

### تغيير حجم الملفات

في ملف `/api/upload/route.ts`:

```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB (يمكن تغييره)
```

### إضافة أنواع ملفات جديدة

في ملف `/api/upload/route.ts`:

```typescript
const allowedTypes = [
  'image/jpeg',
  'image/png',
  // أضف أنواع جديدة هنا
]
```

## الأمان

### التحقق من الصلاحيات

جميع API endpoints محمية بـ NextAuth:

```typescript
const session = await getServerSession(authOptions)
if (!session?.user) {
  return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
}
```

### التحقق من ملكية المحادثة

```typescript
if (
  conversation.participant1Id !== session.user.id &&
  conversation.participant2Id !== session.user.id
) {
  return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })
}
```

## الأداء

### التحسينات المطبقة:
- ✅ Lazy loading للرسائل
- ✅ Pagination للمحادثات
- ✅ تحميل الرسائل عند الطلب فقط
- ✅ Caching للصور في Cloudinary
- ✅ Indexes على الحقول المهمة في Database

### التحسينات المقترحة:
- [ ] إضافة Redis للـ caching
- [ ] WebSocket للرسائل الفورية
- [ ] Infinite scroll للرسائل القديمة
- [ ] Compression للصور الكبيرة

## الاختبار

### اختبار إرسال رسالة:
1. افتح صفحة الرسائل
2. اختر محادثة أو ابدأ محادثة جديدة
3. اكتب رسالة واضغط إرسال
4. تأكد من ظهور الرسالة فوراً

### اختبار رفع ملف:
1. اضغط على أيقونة المرفقات (📎)
2. اختر ملف من جهازك
3. انتظر حتى يتم الرفع
4. تأكد من ظهور الملف في المعاينة
5. اضغط إرسال

### اختبار الفلترة:
1. اضغط على أحد الفلاتر (طاقم، موردين، إلخ)
2. تأكد من ظهور المحادثات المناسبة فقط

### اختبار البحث:
1. اكتب في صندوق البحث
2. تأكد من ظهور النتائج المطابقة فوراً

## الدعم الفني

في حالة وجود مشاكل أو أسئلة:
1. تحقق من console للأخطاء
2. تأكد من تطبيق migrations
3. تحقق من متغيرات البيئة (Cloudinary)
4. راجع ملفات الـ API للتأكد من صحة الطلبات

## الخطوات التالية

- [ ] إضافة WebSocket للرسائل الفورية
- [ ] إضافة notifications push
- [ ] إضافة emoji picker
- [ ] إضافة voice messages
- [ ] إضافة video calls
- [ ] إضافة group chats

## المساهمة

للمساهمة في تطوير النظام:
1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

---

تم التطوير بواسطة فريق Smart Dental Community ❤️
