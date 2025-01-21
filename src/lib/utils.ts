import { clsx, type ClassValue } from "clsx"
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const useFormSchea = (name: string) => {
  return useTranslations(name);
}
