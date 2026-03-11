export const locales = ["en", "zh", "ko", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ko: "한국어",
  hi: "हिन्दी",
};

export const localeFonts: Record<Locale, string> = {
  en: "Inter, sans-serif",
  zh: "'Noto Sans SC', sans-serif",
  ko: "'Noto Sans KR', sans-serif",
  hi: "'Noto Sans Devanagari', sans-serif",
};
