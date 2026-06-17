// Site-wide constants — Cinema Pro brand
export const SITE = {
  name: 'سينما برو',
  nameEn: 'Cinema Pro',
  tagline: 'وجهتك السينمائية العربية بتصميم سينمائي حديث',
  description:
    'سينما برو منصة عربية مختارة بعناية تقدّم الأفلام والمسلسلات والأنمي بجودة عالية ومعلومات واضحة قبل المشاهدة.',
  url: 'https://cinmapro.site',
  locale: 'ar-SA',
  themeColor: '#0B0F19',
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
