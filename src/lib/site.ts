// Site-wide constants — CINMAPRO brand
export const SITE = {
  name: 'CINMAPRO',
  nameEn: 'CINMAPRO',
  tagline: 'وجهتك السينمائية الفاخرة لأفضل 100 عمل عالمي',
  description:
    'CINMAPRO منصة عربية مختارة بعناية تقدّم أفضل 100 عمل عالمي — أفلام، مسلسلات، وأنمي بجودة عالية ومعلومات واضحة قبل المشاهدة.',
  url: 'https://cinmapro.site',
  locale: 'ar-SA',
  themeColor: '#0ea5b7',
  defaultOgImage: '/og-default.png',
} as const;

export const NAV = [
  { label: 'الرئيسية', href: '/' },
  { label: 'أفلام', href: '/movies' },
  { label: 'مسلسلات', href: '/series' },
  { label: 'أنمي', href: '/anime' },
  { label: 'بحث', href: '/search' },
] as const;

export const CATEGORY_SLUG = {
  movie: 'movie',
  series: 'series',
  anime: 'anime',
} as const;

export const CATEGORY_LABEL = {
  movie: 'فيلم',
  series: 'مسلسل',
  anime: 'أنمي',
} as const;

export const CATEGORY_LABEL_PLURAL = {
  movie: 'أفلام',
  series: 'مسلسلات',
  anime: 'أنمي',
} as const;

export const CATEGORY_TYPE_KEY = 'category' as const;
