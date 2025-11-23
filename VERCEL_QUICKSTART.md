# النشر السريع على Vercel ⚡

## الخطوات (5 دقائق فقط)

### 1️⃣ احصل على قاعدة بيانات مجانية

اختر واحدة من:

**Supabase** (الأسهل):
1. [supabase.com](https://supabase.com) → Create Project
2. Settings → Database → Copy URI
3. احفظ الرابط

**أو Neon**:
1. [neon.tech](https://neon.tech) → Create Project
2. Copy Connection String

**أو Vercel Postgres**:
- سنضيفها مباشرة في الخطوة التالية

---

### 2️⃣ انشر على Vercel

1. اذهب إلى [vercel.com](https://vercel.com/new)
2. Import مستودع `smart-dental-community`
3. Vercel سيكتشف Next.js تلقائياً
4. **لا تضغط Deploy بعد!**

---

### 3️⃣ أضف متغيرات البيئة (Environment Variables)

في صفحة الإعداد، أضف على الأقل:

```env
# إلزامي - بدونه سيفشل البناء
DATABASE_URL=postgresql://...

# إلزامي للمصادقة
NEXTAUTH_SECRET=any-random-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

💡 **نصيحة**: لتوليد `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

---

### 4️⃣ اضغط Deploy

الآن اضغط **Deploy** وانتظر 2-3 دقائق.

---

### 5️⃣ بعد النشر الناجح

قم بتشغيل migrations:

```bash
# ثبت Vercel CLI
npm i -g vercel

# اسحب متغيرات البيئة
vercel env pull .env.local

# شغل migrations
npx prisma migrate deploy
npx prisma db push
```

---

## إذا فشل البناء ❌

### خطأ: `prisma generate` failed
- ✅ **الحل**: تأكد من إضافة `DATABASE_URL` في Environment Variables
- ثم Deployments → Redeploy

### خطأ: Database connection failed
- ✅ **الحل**: تحقق من صحة `DATABASE_URL`
- تأكد أن قاعدة البيانات تسمح باتصالات خارجية

---

## متغيرات اختيارية (يمكن إضافتها لاحقاً)

```env
# OpenAI للميزات الذكية
OPENAI_API_KEY=sk-...

# خرائط Google
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...

# Cloudinary للصور
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# زين كاش للدفع
ZAINCASH_MERCHANT_ID=...
ZAINCASH_SECRET=...
```

---

## روابط مفيدة

- 📖 [دليل النشر الكامل](./DEPLOYMENT.md)
- 🎯 [Vercel Dashboard](https://vercel.com/dashboard)
- 💬 [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

---

**نصيحة**: احفظ هذا الملف كمرجع سريع! 🚀
