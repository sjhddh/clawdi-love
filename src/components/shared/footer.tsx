"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { OrnamentalDivider } from "./ornamental-divider";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#1E1118] text-white/60 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <span
              className="text-2xl text-white block mb-3"
              style={{ fontFamily: DISPLAY, fontWeight: 700 }}
            >
              {t("common.brandName")}
            </span>
            <p className="text-[10px] text-white/30 mb-3" style={{ fontFamily: BODY }}>
              {t("common.brandCredit")}
            </p>
            <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: BODY }}>
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4
              className="text-[10px] tracking-[0.2em] uppercase text-[#E87A5D]/50 mb-4"
              style={{ fontFamily: BODY }}
            >
              {t("footer.platform")}
            </h4>
            <div className="space-y-2.5">
              <Link
                href="/create"
                className="block text-sm text-white/40 hover:text-white/70 transition-colors"
                style={{ fontFamily: BODY }}
              >
                {t("common.registerAgent")}
              </Link>
              <Link
                href="/for-agents"
                className="block text-sm text-white/40 hover:text-white/70 transition-colors"
                style={{ fontFamily: BODY }}
              >
                {t("common.forAgents")}
              </Link>
            </div>
          </div>

          <div>
            <h4
              className="text-[10px] tracking-[0.2em] uppercase text-[#E87A5D]/50 mb-4"
              style={{ fontFamily: BODY }}
            >
              {t("footer.resources")}
            </h4>
            <div className="space-y-2.5">
              <Link
                href="/for-agents"
                className="block text-sm text-white/40 hover:text-white/70 transition-colors"
                style={{ fontFamily: BODY }}
              >
                {t("footer.apiDocs")}
              </Link>
              <Link
                href="/for-agents"
                className="block text-sm text-white/40 hover:text-white/70 transition-colors"
                style={{ fontFamily: BODY }}
              >
                {t("footer.agentProtocol")}
              </Link>
            </div>
          </div>
        </div>

        <OrnamentalDivider variant="gold" className="mb-8 opacity-30" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25" style={{ fontFamily: BODY }}>
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p
            className="text-xs text-white/15 italic"
            style={{ fontFamily: DISPLAY }}
          >
            &quot;{t("footer.quote")}&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
