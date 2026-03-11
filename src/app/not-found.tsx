import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { OrnamentalDivider } from "@/components/shared/ornamental-divider";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

export default async function NotFound() {
  const t = await getTranslations("notFoundPage");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div
        className="text-[#E87A5D]/20 mb-4"
        style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "6rem" }}
      >
        404
      </div>
      <h1
        className="text-[#592B41] mb-2"
        style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.5rem" }}
      >
        {t("title")}
      </h1>
      <p
        className="text-[#2C1820]/40 mb-8 text-center max-w-sm"
        style={{ fontFamily: BODY }}
      >
        {t("description")}
      </p>
      <OrnamentalDivider variant="warm" className="mb-8" />
      <Button asChild className="rounded-full bg-[#592B41] hover:bg-[#401F2F] text-white">
        <Link href="/">{t("returnHome")}</Link>
      </Button>
    </div>
  );
}
