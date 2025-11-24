# تحديثات نظام العلاجات والمختبرات

## نظرة عامة
تم تحديث النظام بشكل شامل ليشمل إدارة متقدمة للعلاجات متعددة الجلسات، مع دعم كامل لطلبات المختبر والربط بالمهام والإشعارات.

---

## 1. تحديثات قاعدة البيانات (Prisma Schema)

### TreatmentSession - حقول جديدة للجلسات العلاجية

#### حقول علاج العصب (Root Canal)
- `rootCanals` - عدد قنوات العصب
- `canalLength` - طول القناة/العصب (مثال: 21mm)
- `filesUsed` - الملفات المستخدمة (Array)
- `rootFillingType` - نوع حشو العصب (Gutta-percha, MTA, etc)
- `rootFillingLength` - طول حشو العصب
- `finalFillingType` - نوع الحشوة النهائية (عادية، معقدة، تركيبة، post and core)

#### حقول التركيبات والتيجان (Crowns/Bridges)
- `crownType` - نوع التاج (خزفي، معدني، زيركون، E-max)
- `crownColor` - لون التاج/التركيبة (A2, B1, etc)
- `bridgeSpan` - نطاق الجسر (من سن إلى سن)
- `postAndCore` - هل يحتاج post and core
- `needsCrownCoverage` - هل يحتاج تغطية بالتاج

#### حقول التقويم (Orthodontics)
- `bracketType` - نوع التقويم (معدني، شفاف، خزفي، Invisalign)
- `archWireSize` - حجم السلك (0.014, 0.016)
- `elasticType` - نوع المطاط
- `tighteningAmount` - مقدار الشد (خفيف، متوسط، قوي)

#### حقول الزراعة (Implants)
- `implantBrand` - ماركة الزرعة (Straumann, Nobel)
- `implantDiameter` - قطر الزرعة (4.1mm)
- `implantLength` - طول الزرعة (10mm)
- `healingPeriod` - فترة الالتئام (3-6 أشهر)
- `abutmentType` - نوع الدعامة (Titanium, Zirconia)

#### حقول عامة
- `measurements` - قياسات إضافية (Json)
- `materials` - المواد المستخدمة (Array)
- `stage` - المرحلة الحالية

### TreatmentPlan - تحديثات الخطة العلاجية
- `needsLabOrder` - هل يحتاج طلب مختبر
- `labOrderRequested` - تم طلب المختبر
- `status` - حالة الخطة (ACTIVE, COMPLETED, CANCELLED)

### LabOrder - تحسينات طلبات المختبر
- `platformFee` - نسبة المنصة (5% للمختبرات المسجلة)
- `labIsInPlatform` - هل المختبر موجود في المنصة
- `customLabName` - اسم المختبر المخصص (للمختبرات غير المسجلة)
- `customLabPhone` - رقم هاتف المختبر المخصص
- `taskId` - ربط بالمهمة المرتبطة
- `notificationSent` - تم إرسال الإشعار

### PatientFinance - تحديثات المالية
- `paymentMethod` - طريقة الدفع (CASH بشكل افتراضي)
- `planId` - ربط بالخطة العلاجية

### Order (للموردين) - تحديثات المالية
- `paymentMethod` - طريقة الدفع (CASH only للمراكز الطبية ومعامل الأسنان)

---

## 2. API Routes الجديدة

### `/api/treatment-plans/[id]/sessions/[sessionId]`

#### GET - جلب تفاصيل جلسة معينة
```typescript
GET /api/treatment-plans/[planId]/sessions/[sessionId]
Response: { session: TreatmentSession }
```

#### PATCH - تحديث جلسة بالحقول المتقدمة
```typescript
PATCH /api/treatment-plans/[planId]/sessions/[sessionId]
Body: {
  status: "COMPLETED",
  notes: "...",
  // Root canal fields
  rootCanals: 3,
  canalLength: "21mm",
  filesUsed: ["#15", "#20", "#25"],
  rootFillingType: "Gutta-percha",
  // Crown fields
  crownType: "Zirconia",
  crownColor: "A2",
  // Orthodontics fields
  bracketType: "Metal",
  // Implant fields
  implantBrand: "Straumann",
  // General
  materials: ["..."],
  stage: "..."
}
```

**ميزات:**
- تحديث تلقائي لنسبة التقدم في الخطة العلاجية
- تغيير حالة الخطة إلى COMPLETED عند اكتمال جميع الجلسات

#### DELETE - حذف جلسة

### `/api/treatment-plans/[id]/lab-order`

#### POST - إنشاء طلب مختبر للخطة العلاجية
```typescript
POST /api/treatment-plans/[planId]/lab-order
Body: {
  labId?: string,              // المختبر المسجل (اختياري)
  customLabName?: string,      // اسم مختبر مخصص
  customLabPhone?: string,     // رقم المختبر المخصص
  orderType: string,           // نوع الطلب
  description?: string,
  specifications?: any,
  amount: number,
  dueDate: string,
  createTask: boolean,         // إنشاء مهمة تذكير
  sendNotification: boolean    // إرسال إشعار للمختبر
}

Response: {
  message: string,
  labOrder: LabOrder,
  task?: Task
}
```

**ميزات:**
- احتساب تلقائي لنسبة المنصة (5%) للمختبرات المسجلة
- إنشاء مهمة تذكير تلقائياً
- إرسال إشعار للمختبر إذا كان مسجلاً في المنصة
- دعم المختبرات المخصصة (غير المسجلة)
- تحديث حالة الخطة العلاجية

#### GET - جلب طلبات المختبر للخطة العلاجية

---

## 3. مكونات الواجهة الجديدة

### SessionDetailsForm
مكون شامل لإدخال تفاصيل الجلسات حسب نوع العلاج.

**الموقع:** `components/features/session-details-form.tsx`

**الميزات:**
- نماذج ديناميكية حسب نوع العلاج (ROOT_CANAL, CROWN, ORTHODONTICS, IMPLANT)
- حفظ تلقائي لجميع الحقول المتقدمة
- إضافة/حذف الملفات المستخدمة والمواد
- اختيار حالة الجلسة والمرحلة
- دعم جميع أنواع العلاجات

**الاستخدام:**
```tsx
<SessionDetailsForm
  session={session}
  treatmentType="ROOT_CANAL"
  onSave={async (data) => {
    await fetch(`/api/treatment-plans/${planId}/sessions/${sessionId}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    })
  }}
  onCancel={() => setShowDialog(false)}
/>
```

### LabOrderDialog
مكون متكامل لإنشاء طلبات المختبر.

**الموقع:** `components/features/lab-order-dialog.tsx`

**الميزات:**
- اختيار من المختبرات المحفوظة أو إضافة مختبر جديد
- تحديد نوع الطلب والمواصفات
- احتساب تلقائي لنسبة المنصة
- خيارات لإنشاء مهمة وإرسال إشعار
- دعم المختبرات المسجلة وغير المسجلة في المنصة

**الاستخدام:**
```tsx
<LabOrderDialog
  open={showDialog}
  onClose={() => setShowDialog(false)}
  treatmentPlanId={planId}
  treatmentType="CROWN"
  patientName="أحمد علي"
  savedLabs={savedLabs}
/>
```

---

## 4. صفحة ملف المريض المحسّنة

**الموقع:** `app/clinic/[id]/patients/[patientId]/page.tsx`

**التحسينات:**
- عرض تفاصيل الجلسات بشكل تفاعلي
- إمكانية النقر على أي جلسة لتحديث تفاصيلها
- زر "طلب مختبر" للخطط التي تحتاج ذلك
- عرض الحقول المتقدمة (عدد القنوات، نوع التاج، إلخ)
- تكامل كامل مع المكونات الجديدة
- نظام مالية محدث (الدفع نقداً فقط)

**الميزات الجديدة:**
1. **عرض تفاصيل الجلسات المتقدمة** - يظهر عدد القنوات، نوع التاج، إلخ كـ Badges
2. **تحديث الجلسات** - النقر على أي جلسة يفتح نموذج التفاصيل
3. **طلب مختبر** - زر مباشر لإنشاء طلب مختبر للخطط التي تحتاج ذلك
4. **ربط حقيقي** - جميع الأزرار مربوطة بـ API calls

---

## 5. نظام المالية

### التحديثات الرئيسية:
1. **الدفع نقداً فقط** - جميع معاملات المراكز الطبية ومعامل الأسنان نقدية
2. **نسبة المنصة** - احتساب 5% من قيمة طلبات المختبر للمختبرات المسجلة في المنصة
3. **لا توجد نسبة** - للمختبرات غير المسجلة في المنصة
4. **ربط بالخطط العلاجية** - كل دفعة مربوطة بخطة علاجية محددة

---

## 6. نظام المهام والإشعارات

### المهام (Tasks)
- يتم إنشاء مهمة تلقائياً عند طلب مختبر (اختياري)
- المهمة مربوطة بـ LabOrder عبر `taskId`
- تاريخ الاستحقاق يطابق تاريخ استلام الطلب

### الإشعارات
- إرسال إشعار تلقائي للمختبر عند إنشاء الطلب (للمختبرات المسجلة فقط)
- الإشعار يحتوي على رابط مباشر لصفحة الطلب
- تتبع حالة الإشعار عبر `notificationSent`

---

## 7. Migration

**ملاحظة:** يجب تشغيل migration لتطبيق التغييرات على قاعدة البيانات:

```bash
npx prisma migrate dev --name add_detailed_treatment_fields
npx prisma generate
```

---

## 8. التوافق مع الأنواع المختلفة

### علاج العصب (ROOT_CANAL)
- **الجلسة 1:** تحديد عدد القنوات، الملفات المستخدمة
- **الجلسة 2:** طول القناة، نوع حشو العصب، طول الحشو
- **الجلسة 3+:** نوع الحشوة النهائية (عادية، معقدة، تركيبة، post and core)

### التركيبات (CROWN, BRIDGE)
- **الجلسة 1:** نوع التاج، اللون، تحديد الحاجة لـ post and core
- **الجلسة 2:** التركيب النهائي
- **طلب مختبر:** يتم إنشاؤه تلقائياً بعد الجلسة الأولى

### التقويم (ORTHODONTICS)
- **الجلسة 1:** التركيب الأولي، نوع التقويم
- **الجلسات الشهرية:** حجم السلك، نوع المطاط، مقدار الشد

### الزراعة (IMPLANT)
- **الجلسة 1:** زراعة الجذر (الماركة، القطر، الطول)
- **الجلسة 2:** فحص الالتئام (بعد 3-6 أشهر)
- **الجلسة 3:** التاج النهائي (نوع الدعامة، نوع التاج)
- **طلب مختبر:** للتاج النهائي

---

## 9. أفضل الممارسات

### للأطباء:
1. تحديث تفاصيل كل جلسة فور الانتهاء منها
2. استخدام المصطلحات الطبية الدقيقة
3. توثيق جميع القياسات والمواد المستخدمة
4. إنشاء طلب مختبر فوراً عند الحاجة

### للمختبرات:
1. التسجيل في المنصة للحصول على الإشعارات الفورية
2. تحديث حالة الطلب بانتظام
3. التواصل مع العيادة عند أي استفسار

### للإدارة:
1. مراجعة طلبات المختبر المعلقة يومياً
2. متابعة المهام المرتبطة بالطلبات
3. التأكد من دقة احتساب نسبة المنصة

---

## 10. الخطوات القادمة

### مقترحات للتحسين:
1. إضافة تقارير تفصيلية للعلاجات
2. نظام تذكيرات تلقائي للجلسات القادمة
3. تكامل مع أنظمة الأشعة
4. نظام تقييم للمختبرات
5. إحصائيات متقدمة للعلاجات

---

## 11. الدعم والمساعدة

للحصول على المساعدة أو الإبلاغ عن المشاكل:
- راجع التوثيق في `/docs`
- تواصل مع فريق التطوير

---

**تاريخ التحديث:** 2024-11-24
**الإصدار:** 2.0.0
**المطور:** Smart Dental Community Team
