import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  let locale: Locale = defaultLocale;

  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    locale = cookieLocale as Locale;
  } else {
    const acceptLang = headerStore.get("accept-language") || "";
    const preferred = acceptLang.split(",")[0]?.split("-")[0]?.trim();
    if (preferred && locales.includes(preferred as Locale)) {
      locale = preferred as Locale;
    }
  }

  const messages = (await import(`./messages/${locale}.json`)).default;
  return { locale, messages };
});
