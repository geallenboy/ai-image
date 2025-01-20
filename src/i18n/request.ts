import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/lib/locale'

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  console.log("locale:", locale)
  return {
    locale,
    messages: (await import(`../../src/messages/${locale}.json`)).default
  };
});
