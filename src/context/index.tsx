import { useLocale } from "next-intl";

export const useI18n = (data: any) => {
  const locale = useLocale();
  return data[locale];
};
