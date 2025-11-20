# دليل النشر على Vercel

## المتطلبات الأساسية

1. حساب على [Vercel](https://vercel.com)
2. قاعدة بيانات PostgreSQL (يمكن استخدام [Supabase](https://supabase.com) أو [Neon](https://neon.tech))
3. جميع مفاتيح API المطلوبة

## خطوات النشر

### 1. ربط المشروع مع Vercel

```bash
# تثبيت Vercel CLI (اختياري)
npm install -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel
```

### 2. إعداد متغيرات البيئة (Environment Variables)

في لوحة تحكم Vercel، انتقل إلى Settings > Environment Variables وأضف المتغيرات التالية:

#### قاعدة البيانات
```
DATABASE_URL=postgresql://user:password@host:5432/database
```

#### المصادقة
```
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

#### OpenAI (للخدمات الذكية)
```
OPENAI_API_KEY=your-openai-api-key
```

#### Google Maps (للخريطة التفاعلية)
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

#### Cloudinary (لتخزين الصور)
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### الدفع (زين كاش)
```
ZAINCASH_MERCHANT_ID=your-merchant-id
ZAINCASH_SECRET=your-secret
```

### 3. إعداد قاعدة البيانات

بعد إعداد متغيرات البيئة، قم بتشغيل migrations:

```bash
# من خلال Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy
npx prisma generate
```

### 4. النشر التلقائي

- كل push إلى الفرع الرئيسي سيقوم بنشر تلقائي
- يمكنك معاينة التغييرات في الفروع الأخرى قبل الدمج

## ملاحظات مهمة

1. **قاعدة البيانات**: تأكد من استخدام قاعدة بيانات production مع Prisma
2. **الصور**: Vercel يدعم الصور بشكل افتراضي، لكن يُفضل استخدام Cloudinary للملفات الكبيرة
3. **الحدود**: انتبه لحدود Vercel المجانية:
   - 100 GB Bandwidth
   - 100 GB-Hrs Serverless Function Execution
   - Unlimited Deployments

## استكشاف الأخطاء

### خطأ في البناء (Build Error)
- تحقق من logs في Vercel Dashboard
- تأكد من أن جميع المتغيرات مضافة بشكل صحيح

### خطأ في قاعدة البيانات
- تحقق من صحة DATABASE_URL
- تأكد من تشغيل migrations

### خطأ في الصور
- تحقق من إعدادات Cloudinary
- تأكد من صحة المفاتيح

## الدعم

للمزيد من المعلومات:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
