# دليل فهم مشروع CINMAPRO لأي مساعد AI

هذا الملف يشرح بنية مشروع CINMAPRO وطريقة عمله وطريقة إضافة الأعمال والصور والسيرفرات والتريلرات. الغرض منه أن يستطيع أي مساعد AI فهم المشروع بسرعة قبل التعديل عليه.

## معلومات عامة

- اسم الموقع: `CINMAPRO`
- الدومين الأساسي: `https://cinmapro.site`
- الإطار المستخدم: `Astro`
- نظام التصميم: `Tailwind CSS` مع ملفات ومكوّنات Astro
- لغة الواجهة: العربية باتجاه RTL
- نوع البناء: موقع ثابت `static`
- مجلد المشروع: `C:\Users\tometo.man\Desktop\cinmapro-update\cinmapro`

## أوامر العمل المهمة

يُفضّل تشغيل الأوامر من داخل جذر المشروع:

```bash
cd C:\Users\tometo.man\Desktop\cinmapro-update\cinmapro
```

على Windows قد يمنع PowerShell تشغيل `npm.ps1`، لذلك استخدم:

```bash
cmd /c npm run data
cmd /c npm run dev
cmd /c npm run build
cmd /c npm run preview
```

الأوامر في `package.json`:

- `npm run data`: يولد ملفات الفهرسة داخل `src/data/generated`.
- `npm run dev`: يشغل `prebuild` ثم خادم التطوير.
- `npm run build`: يشغل `prebuild` ثم يبني الموقع داخل `dist`.
- `npm run preview`: يعاين النسخة المبنية.

مهم: قبل أي بناء بعد تعديل ملفات الموقع يجب إنشاء نسخة مضغوطة احتياطية للكود قبل البناء.

## بنية المجلدات

```txt
src/
  components/        مكوّنات الواجهة المشتركة
  data/
    titles/          ملفات JSON لكل فيلم أو مسلسل أو أنمي
    generated/       ملفات مولدة آليًا من scripts/build-data.mjs
  layouts/           القالب الأساسي للصفحات
  lib/               دوال الموقع والفلاتر والروابط والمحتوى
  pages/             مسارات Astro
  styles/            CSS عام

public/
  images/            صور البوسترات حسب النوع
  favicon files      ملفات الأيقونة
  robots.txt         ملف robots

scripts/
  build-data.mjs                 توليد بيانات الفهرسة
  import-witanime.mjs            استيراد أنميات من CSV
  tmdb-enrich-new-anime.mjs      إثراء الأنميات الجديدة من TMDB
  tmdb-enrich-movies-series.mjs  إثراء الأفلام والمسلسلات من TMDB
  download-posters.mjs           تنزيل البوسترات
  fetch-youtube-trailers.mjs     جلب أو تحديث التريلرات
```

## الصفحات والمسارات

الصفحات الرئيسية:

- `/` الصفحة الرئيسية
- `/movies` صفحات الأفلام مع ترقيم
- `/series` صفحات المسلسلات مع ترقيم
- `/anime` صفحات الأنمي مع ترقيم
- `/search` البحث

صفحات التفاصيل:

- `/movie/[slug]`
- `/series/[slug]`
- `/anime/[slug]`

صفحات المواسم:

- `/series/[slug]/season/[season]`
- `/anime/[slug]/season/[season]`

صفحات الحلقات:

- `/series/[slug]/season/[season]/episode/[episode]`
- `/anime/[slug]/season/[season]/episode/[episode]`

صفحات المشاهدة:

- `/watch/[slug]`

مهم: صفحات `watch` مقصود أن تبقى مختلفة عن صفحات التفاصيل. خريطة الموقع تستبعد صفحات `watch`.

## أهم الملفات

- `astro.config.mjs`: إعداد Astro، الدومين، sitemap، واستبعاد `/watch/` من خريطة الموقع.
- `src/lib/site.ts`: اسم الموقع والدومين والروابط العامة.
- `src/lib/types.ts`: شكل بيانات العمل والحلقات والسيرفرات.
- `src/lib/titles.ts`: قراءة بيانات الأعمال وفلاتر التصنيف والأعمال المشابهة.
- `src/lib/detailContent.ts`: توليد عناوين SEO، الوصف، النصوص، الأسئلة، والعرض النصي.
- `src/lib/episodeRoutes.ts`: توليد روابط المواسم والحلقات والتنقل بين الحلقة السابقة والقادمة.
- `src/layouts/Base.astro`: القالب الأساسي الذي يضع head وSEO وJSON-LD.
- `src/components/TitleDetailContent.astro`: جسم صفحة الفيلم/المسلسل/الأنمي.
- `src/components/TrailerEmbed.astro`: تريلر YouTube بتحميل كسول؛ لا ينشئ iframe إلا بعد الضغط.
- `src/components/SeasonPage.astro`: قالب صفحة الموسم.
- `src/components/EpisodePage.astro`: قالب صفحة الحلقة.
- `src/components/EpisodicSeasonsList.astro`: قائمة المواسم والحلقات.
- `src/components/RelatedAnimeSeasons.astro`: ربط مواسم الأنميات الجديدة التي تم استيرادها كأعمال منفصلة.

## شكل ملف العمل داخل `src/data/titles`

كل عمل هو ملف JSON مستقل. اسم الملف غالبًا هو `slug.json`.

مثال مختصر:

```json
{
  "slug": "example-title",
  "clean_title": "Example Title",
  "raw_name": "فيلم Example Title مترجم اون لاين",
  "category": "movie",
  "category_label": "فيلم",
  "poster": "/images/movie/example-title.jpg",
  "matched_poster": true,
  "seasons_count": 1,
  "episodes_count": 1,
  "seasons": [
    {
      "season": 1,
      "episodes_count": 1,
      "episodes": [
        {
          "episode": 1,
          "title": "الفيلم",
          "servers": [
            {
              "id": 1,
              "label": "سيرفر 1",
              "url": "https://example.com/embed/abc"
            }
          ]
        }
      ]
    }
  ],
  "description": "وصف مختصر للعمل.",
  "url": "/movie/example-title",
  "story": "قصة العمل.",
  "year": "2024",
  "quality": "1080p WEB-DL",
  "duration": "100 دقيقة",
  "language": "الإنجليزية",
  "country": "الولايات المتحدة",
  "director": "اسم المخرج",
  "stars": "ممثل 1، ممثل 2",
  "genre": "أكشن، إثارة",
  "trailerId": "YouTubeVideoId",
  "rating": 6.5
}
```

## التصنيفات المسموحة

قيمة `category` يجب أن تكون واحدة من:

- `movie`
- `series`
- `anime`

ويجب أن يطابق `url` النوع:

- الفيلم: `/movie/slug`
- المسلسل: `/series/slug`
- الأنمي: `/anime/slug`

## إضافة فيلم جديد

1. أنشئ ملف JSON داخل `src/data/titles`.
2. اجعل `category` = `movie`.
3. اجعل `seasons_count` = `1` و`episodes_count` = `1`.
4. ضع السيرفرات داخل:

```txt
seasons[0].episodes[0].servers
```

5. ضع الصورة في:

```txt
public/images/movie/slug.jpg
```

6. اجعل `poster`:

```json
"/images/movie/slug.jpg"
```

7. أضف `trailerId` إذا توفر.
8. استخدم TMDB لجلب أو التحقق من القصة، السنة، الدولة، اللغة، التصنيفات، التقييم، المخرج، النجوم، والتريلر إن توفر.
9. إذا لم تكن البيانات موجودة يدويًا، شغّل سكربت TMDB للأفلام والمسلسلات بعد إضافة العمل.
10. شغل:

```bash
cmd /c npm run data
cmd /c npm run build
```

## إضافة مسلسل جديد

1. أنشئ ملف JSON داخل `src/data/titles`.
2. اجعل `category` = `series`.
3. أضف المواسم داخل `seasons`.
4. كل موسم يحتوي على `season` و`episodes_count` و`episodes`.
5. كل حلقة تحتوي على رقمها وعنوانها وسيرفراتها.
6. ضع الصورة في:

```txt
public/images/series/slug.jpg
```

7. اجعل `poster`:

```json
"/images/series/slug.jpg"
```

8. رابط أول حلقة يتولد من:

```txt
/series/slug/season/1/episode/1
```

9. استخدم TMDB لجلب أو التحقق من القصة، سنة البداية، الدولة، اللغة، التصنيفات، التقييم، المنشئ أو أهم الأسماء، التريلر، ومعلومات الحلقات مثل تاريخ العرض ومدة الحلقة عند توفرها.
10. إذا أضفت مسلسلًا جديدًا أو مواسم جديدة، شغّل سكربت TMDB للأفلام والمسلسلات بعد التعديل.

## إضافة أنمي جديد

1. أنشئ ملف JSON داخل `src/data/titles`.
2. اجعل `category` = `anime`.
3. ضع الصورة في:

```txt
public/images/anime/slug.jpg
```

4. اجعل `poster`:

```json
"/images/anime/slug.jpg"
```

5. إذا كان الأنمي له أكثر من موسم، الأفضل وضعها في ملف واحد داخل `seasons`.
6. إذا كانت المواسم موجودة كملفات منفصلة، يمكن استخدام `relatedAnimeSeasons` لربطها في الواجهة.
7. استخدم TMDB للأنمي أيضًا عند توفره، خصوصًا للقصة وتفاصيل الحلقات وربط المواسم.

## إضافة أو تعديل السيرفرات

السيرفرات موجودة داخل كل حلقة:

```json
"servers": [
  {
    "id": 1,
    "label": "سيرفر 1",
    "url": "https://example.com/embed/video"
  }
]
```

قواعد مهمة:

- لا تستخدم `yonaplay` لأن روابطه كانت تالفة وتم استبعاده سابقًا.
- إذا كان الرابط غير صالح لا تضعه.
- لا تترك `about:blank` إلا كقيمة مؤقتة يجب إصلاحها لاحقًا.
- اجعل السيرفر الأفضل أولًا لأن المشغل يبدأ به غالبًا.

## إضافة الصور

المسارات المتوقعة:

```txt
public/images/movie/
public/images/series/
public/images/anime/
```

الأفضل:

- اسم الصورة يساوي `slug`.
- الامتداد غالبًا `.jpg`.
- حقل `poster` يبدأ دائمًا من `/images/...` وليس من `public`.

مثال:

```json
"poster": "/images/anime/one-punch-man.jpg"
```

إذا لم توجد الصورة، لا تكسر الصفحة؛ القالب يعرض بديلًا نصيًا.

## إضافة التريلر

التريلر يعتمد على YouTube ID فقط، وليس الرابط الكامل.

مثال:

```json
"trailerId": "YLE85olJjp8"
```

المكوّن `TrailerEmbed.astro`:

- يعرض صورة مصغرة من YouTube.
- لا يحمل iframe عند فتح الصفحة.
- ينشئ iframe فقط بعد الضغط على زر مشاهدة التريلر.
- إذا لم يوجد `trailerId` لا يظهر قسم التريلر.

## SEO وJSON-LD

العناوين والوصف تولد من `src/lib/detailContent.ts`.

القواعد الحالية:

- الأفلام تستخدم JSON-LD نوع `Movie`.
- المسلسلات والأنمي تستخدم JSON-LD نوع `TVSeries`.
- صفحات `movie` و`series` و`anime` قابلة للفهرسة.
- صفحات `watch` لا تدخل خريطة الموقع.
- لا تغيّر canonical أو slug بلا سبب قوي.
- الدومين الرسمي في كل مكان يجب أن يبقى `https://cinmapro.site`.

## خريطة الموقع

الإعداد في `astro.config.mjs` يستخدم `@astrojs/sitemap`.

تم ضبط `entryLimit: 1000` حتى تقسم خريطة الموقع إلى عدة ملفات عند كثرة الصفحات.

الدالة `shouldIncludeInSitemap` تستبعد:

- `/watch/*`
- `/404`

لذلك لا تضف صفحات المشاهدة إلى sitemap إلا إذا طلب صاحب الموقع ذلك صراحة.

## الحلقات والمواسم

المسلسلات والأنمي التي لديها أكثر من حلقة تحصل على:

- صفحة رئيسية للعمل.
- صفحة لكل موسم.
- صفحة لكل حلقة.
- زر الحلقة السابقة.
- زر الحلقة القادمة.
- زر مشاهدة الحلقة داخل صفحة الحلقة.
- قائمة مواسم وحلقات.

الدوال المهمة في `src/lib/episodeRoutes.ts`:

- `getTitleRoute`
- `getSeasonRouteForTitle`
- `getEpisodeRouteForTitle`
- `getFirstEpisodeRoute`
- `getEpisodeNeighbors`

## بيانات TMDB للأنميات الجديدة

تمت إضافة سكربت:

```txt
scripts/tmdb-enrich-new-anime.mjs
```

وظيفته:

- يطبق على الأنميات الجديدة فقط مقارنة بنسخة احتياطية قديمة.
- يبحث في TMDB عن بيانات الأنمي.
- يضيف `tmdb_id` و`tmdb_url` و`original_title`.
- يحسن القصة والتصنيفات والدولة واللغة والتقييم.
- يضيف تفاصيل حلقات إن توفرت: `overview`, `air_date`, `runtime`, `tmdb_episode_id`, `tmdb_still_path`.
- يربط المواسم المنفصلة عبر `relatedAnimeSeasons`.

لا تضع مفاتيح API داخل الكود. استخدم متغيرات بيئة عند التشغيل.

## بيانات TMDB للأفلام والمسلسلات

تمت إضافة سكربت:

```txt
scripts/tmdb-enrich-movies-series.mjs
```

وظيفته:

- يطبق على ملفات `movie` و`series`.
- يبحث في TMDB عن العمل بالاسم والسنة إن وجدت.
- يضيف أو يحدّث `tmdb_id`, `tmdb_url`, `original_title`.
- يحسن `story`, `description`, `year`, `rating`, `country`, `language`, `genre`.
- يضيف أو يحسن `director`, `stars`, `duration`, و`trailerId` عند توفرها.
- للمسلسلات يضيف تفاصيل الحلقات عند توفرها: `overview`, `air_date`, `runtime`, `tmdb_episode_id`, `tmdb_still_path`.
- يضع رابط TMDB داخل `seoContent.sources.tmdb`.

طريقة التشغيل على Windows:

```bat
set TMDB_ACCESS_TOKEN=ضع_التوكن_هنا && cmd /c node scripts\tmdb-enrich-movies-series.mjs
```

أو باستخدام API Key:

```bat
set TMDB_API_KEY=ضع_المفتاح_هنا && cmd /c node scripts\tmdb-enrich-movies-series.mjs
```

قواعد مهمة:

- لا تضع توكن TMDB أو API Key داخل ملفات المشروع أو داخل Git أو داخل ملفات JSON.
- عند إضافة عمل جديد، الأفضل تشغيل سكربت TMDB قبل `npm run data`.
- راجع عينة من الأعمال بعد التشغيل لأن تطابق TMDB قد يخطئ عند وجود أسماء متشابهة.
- إذا كان العمل غير موجود في TMDB، اكتب بياناته يدويًا ولا تترك القصة عامة أو مكررة.

## ملفات البيانات المولدة

لا تعدل هذه الملفات يدويًا إلا لسبب واضح:

```txt
src/data/generated/all.json
src/data/generated/index.json
src/data/generated/search-index.json
src/data/generated/stats.json
```

هذه الملفات تتولد من:

```bash
cmd /c npm run data
```

## ملخص ما تم سابقًا في المشروع

- تحويل صفحات التفاصيل لتصبح غنية بالمعلومات، مثل: Hero، وصف العمل، معلومات العمل، التريلر، طاقم العمل، FAQ، والأعمال المشابهة.
- إضافة `TrailerEmbed.astro` لتحميل تريلرات YouTube عند الضغط فقط.
- تحسين SEO للعناوين والوصف وJSON-LD.
- الحفاظ على اسم `CINMAPRO` واستبدال أي ذكر سابق لأسماء أخرى داخل البيانات عند توليد الملفات.
- عدم تغيير slugs أو canonical بلا ضرورة.
- استبعاد صفحات `watch` من sitemap.
- إضافة صفحات مواسم وحلقات للمسلسلات والأنمي.
- إضافة أزرار الحلقة السابقة والقادمة.
- استيراد عدد كبير من الأنميات الجديدة من ملف CSV، مع استبعاد سيرفر `yonaplay`.
- إثراء الأنميات الجديدة ببيانات TMDB وربط المواسم المتصلة.
- إصلاح `robots.txt` ليشير إلى `https://cinmapro.site`.
- إضافة favicon وملفات الأيقونة داخل `public`.
- إنشاء تقارير CSV للأعمال التي لا تحتوي على سيرفرات أو التي تحتاج مراجعة سيرفرات.

## أرقام حالية تقريبية وقت كتابة هذا الملف

- إجمالي الأعمال: `5814`
- أفلام: `2915`
- مسلسلات: `737`
- أنمي: `2162`
- أعمال فيها تريلر: `4189`
- أعمال فيها سيرفر صالح واحد على الأقل: `5732`
- أعمال بدون سيرفر صالح: `82`
- أعمال متعددة المواسم: `280`
- صفحات حلقات متوقعة للمسلسلات والأنمي: `48174`
- أفلام مرتبطة ببيانات TMDB: `2899`
- مسلسلات مرتبطة ببيانات TMDB: `445`
- أنميات مرتبطة ببيانات TMDB: `1425`
- حلقات مسلسلات لديها تاريخ عرض من TMDB: `14429`

قد تتغير هذه الأرقام بعد أي استيراد جديد.

## قواعد مهمة قبل أي تعديل

- لا تحذف `dist` إلا إذا كان الهدف تنظيف البناء فقط.
- لا ترفع `node_modules` إلى الاستضافة.
- لا ترفع نسخة بلا `public/images` إذا كنت تريد أن تظهر الصور في الموقع المنشور.
- عند إنشاء نسخة مضغوطة للكود فقط يمكن استبعاد `dist`, `node_modules`, `.astro`, و`public/images`.
- قبل أي `npm run build` بعد تعديل ملفات الموقع، أنشئ نسخة مضغوطة احتياطية.
- بعد الانتهاء من إضافة أي عمل جديد أو تعديل أي ملفات في الموقع، يجب تسليم نسختين مضغوطتين:
  - نسخة مصدرية بدون بناء: تستبعد `dist`, `node_modules`, `.astro`, `.netlify` ويمكن استبعاد الصور إذا طُلب ذلك.
  - نسخة مبنية للنشر: بعد تشغيل `cmd /c npm run data` ثم `cmd /c npm run build`، تُضغط ملفات `dist` الجاهزة للرفع.
- يجب تسمية النسختين باسم واضح يحتوي التاريخ والوقت، مثل:

```txt
cinmapro-source-after-change-YYYY-MM-DD-HHMMSS.zip
cinmapro-dist-after-change-YYYY-MM-DD-HHMMSS.zip
```

- عند تسليم العمل، يجب ذكر مسار النسختين وحالة البناء بوضوح.
- لا تضف `noindex` لصفحات `movie`, `series`, `anime`.
- لا تغير إعداد `watch` إذا كان عدم فهرستها مقصودًا.
- لا تستخدم نصوص مكررة أو شابلونية في وصف الأعمال.
- لا تضع روابط تالفة أو سيرفرات غير صالحة في بداية القائمة.

## طريقة سريعة لإضافة عمل ثم بناء الموقع

1. أضف أو عدل ملف JSON في `src/data/titles`.
2. أضف الصورة في `public/images/{movie|series|anime}`.
3. أضف `trailerId` إن وجد.
4. أضف السيرفرات داخل الحلقة المناسبة.
5. شغل:

```bash
cmd /c npm run data
```

6. خذ نسخة مضغوطة احتياطية قبل البناء.
7. شغل:

```bash
cmd /c npm run build
```

8. بعد نجاح البناء، أنشئ نسخة مضغوطة من `dist` للنشر.
9. أنشئ أو حدّث نسخة مصدرية مضغوطة بدون بناء.
10. راجع `dist` ثم ارفعه للاستضافة.
