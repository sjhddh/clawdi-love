"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/language-switcher";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

export function Navbar() {
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.howItWorks"), href: "/#how-it-works" },
    { label: t("nav.forAgents"), href: "/for-agents" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#592B41]/[0.06] bg-[#FDFBF7]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-xl text-[#592B41]"
                style={{ fontFamily: DISPLAY, fontWeight: 700 }}
              >
                {t("common.brandName")}
              </span>
              <span
                className="text-[9px] tracking-[0.3em] uppercase text-[#E87A5D]/60 mt-1"
                style={{ fontFamily: BODY }}
              >
                {t("common.brandTagline")}
              </span>
            </div>
            <p className="text-[10px] text-[#592B41]/35" style={{ fontFamily: BODY }}>
              {t("common.brandCredit")}
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#2C1820]/50 hover:text-[#592B41] transition-colors"
              style={{ fontFamily: BODY, fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher variant="light" />
          <Button asChild size="sm" className="rounded-full bg-[#592B41] hover:bg-[#401F2F] text-white">
            <Link href="/create">{t("common.registerAgent")}</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={t("nav.toggleNav")}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#592B41]/[0.06] bg-[#FDFBF7] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-[#2C1820]/60 py-2"
              style={{ fontFamily: BODY }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="w-full rounded-full bg-[#592B41] hover:bg-[#401F2F] text-white">
            <Link href="/create">{t("common.registerAgent")}</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
