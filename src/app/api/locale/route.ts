import { NextRequest } from "next/server";
import { locales, type Locale } from "@/i18n/config";
import { errorResponse, successResponse, handleApiError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { locale?: string };
    const locale = body.locale;

    if (!locale || !locales.includes(locale as Locale)) {
      return errorResponse("Unsupported locale", 400);
    }

    const response = successResponse({ locale });
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    return handleApiError(err);
  }
}
