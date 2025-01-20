export type Locale = (typeof locales)[number];
export const locales = ['en', 'zh'] as const;


export const defaultLocale: Locale = 'zh';
