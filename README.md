# CINMAPRO Astro Cloudflare Build

## نظرة عامة
- **الاسم**: CINMAPRO
- **الهدف**: تجهيز موقع الأفلام والمسلسلات والأنمي للبناء والنشر على Cloudflare Pages مع تقليل عدد صفحات البناء.
- **الإطار**: Astro Static Build + Tailwind CSS.

## ما تم إنجازه
- دمج صفحات الحلقات داخل صفحات المواسم بدل إنشاء صفحة مستقلة لكل حلقة.
- حذف مسارات البناء المنفصلة للحلقات:
  - `/series/[slug]/season/[season]/episode/[episode]`
  - `/anime/[slug]/season/[season]/episode/[episode]`
- تحويل روابط الحلقات إلى مرساة داخل صفحة الموسم بصيغة:
  - `/series/{slug}/season/{season}#episode-{episode}`
  - `/anime/{slug}/season/{season}#episode-{episode}`
- إضافة بطاقات حلقات داخل صفحة الموسم مع زر مشاهدة مباشر:
  - `/watch/{slug}?s={season}&e={episode}`
- استبدال روابط الصور المحلية التي تبدأ بـ `/images/` أو `images/` إلى R2:
  - `https://pub-7bd753a4463049929e562aa677ad4251.r2.dev/...`
- إصلاح سكربت البناء ليعمل على Linux/Cloudflare:
  - `ASTRO_TELEMETRY_DISABLED=1 astro build`
- تحسين تحميل البيانات أثناء Build لتجنب فشل الذاكرة بسبب ملف `all.json` الكبير.
- إصلاح قراءة أسماء ملفات JSON العربية/غير UTF-8 داخل `src/data/titles`.
- إضافة ملف `public/_redirects` لقواعد Cloudflare Pages حتى يتم تحويل روابط الحلقات القديمة المفهرسة إلى صفحة الموسم بدل 404.
- دعم تحويل روابط الحلقات القديمة مع الشرطة النهائية `/` وبدونها.
- تشديد فلتر خريطة الموقع في `astro.config.mjs` لاستبعاد أي رابط يحتوي `/episode/` مستقبلاً.
- إضافة نافذة منبثقة RTL على صفحات تفاصيل الأفلام والمسلسلات والأنمي تظهر بعد 3 ثوانٍ وتوجه إلى سينما بلس.
- تنفيذ منطق تحويل روابط سينما بلس:
  - `cinmapro.site/movie/{slug}` ⟵ يفتح `cinemanaplus.site/f/{slug}`
  - `cinmapro.site/series/{slug}` ⟵ يفتح `cinemanaplus.site/d/{slug}`
  - `cinmapro.site/anime/{slug}` ⟵ يفتح `cinemanaplus.site/n/{slug}`

## نتيجة التحقق الحالية
- أمر البناء الناجح: `npm run build`
- تم تشغيل معاينة محلية عبر PM2 على المنفذ `3000` والتحقق من صفحة فيلم بحالة HTTP 200.
- تم التحقق من منطق التحويل إلى سينما بلس بعينات: `/movie → /f` و`/series → /d` و`/anime → /n`.
- عدد ملفات HTML الناتجة بعد البناء: **15083** صفحة.
- صفحات الحلقات المنفصلة الناتجة: **0**.
- روابط الحلقات داخل خرائط الموقع: **0**.
- روابط `/watch/` داخل خرائط الموقع: **0**.
- ملف التحويلات موجود داخل البناء: `dist/_redirects`.
- مراجع الصور القديمة `/images/` في `dist` والبيانات المولدة: **0**.
- العدد أصبح أقل من حد Cloudflare المطلوب **20000** صفحة.

## أهم المسارات الوظيفية
- الصفحة الرئيسية: `/`
- الأفلام: `/movies`
- صفحة فيلم: `/movie/{slug}`
- المسلسلات: `/series`
- صفحة مسلسل: `/series/{slug}`
- صفحة موسم مسلسل: `/series/{slug}/season/{season}`
- تحويل رابط حلقة مسلسل قديم:
  - من: `/series/{slug}/season/{season}/episode/{episode}`
  - إلى: `/series/{slug}/season/{season}`
- الأنمي: `/anime`
- صفحة أنمي: `/anime/{slug}`
- صفحة موسم أنمي: `/anime/{slug}/season/{season}`
- تحويل رابط حلقة أنمي قديم:
  - من: `/anime/{slug}/season/{season}/episode/{episode}`
  - إلى: `/anime/{slug}/season/{season}`
- المشاهدة:
  - فيلم: `/watch/{slug}`
  - حلقة: `/watch/{slug}?s={season}&e={episode}`
- البحث: `/search?q={query}`

## بنية البيانات
- مصدر البيانات الأساسي: `src/data/titles/*.json`
- ملفات البيانات المولدة:
  - `src/data/generated/all.json`
  - `src/data/generated/index.json`
  - `src/data/generated/search-index.json`
  - `src/data/generated/stats.json`
- لا توجد قاعدة بيانات مطلوبة؛ الموقع يبنى كملفات ثابتة.

## أوامر الاستخدام
```bash
npm install
npm run data
npm run build
```

## النشر
- المنصة المستهدفة: Cloudflare Pages.
- مجلد النشر: `dist/`.
- الحالة: جاهز للبناء محلياً، ولم يتم تنفيذ نشر إنتاجي من هذه الجلسة.

## غير منفذ حالياً
- لم يتم ربط مشروع Cloudflare Pages أو نطاق مخصص.
- لم يتم رفع المشروع إلى GitHub خارجي.

## خطوات مقترحة لاحقاً
1. نشر مجلد `dist/` على Cloudflare Pages.
2. اختبار عينات من صفحات المواسم والمشاهدة بعد النشر.
3. التأكد من إعدادات Cache لروابط R2 للصور.
