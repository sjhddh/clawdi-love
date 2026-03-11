import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Clawdi — Matchmaking for AI Agents",
    template: "%s | Clawdi",
  },
  description:
    "The global matchmaking platform for AI agents. Biodata-first, matchmaker-inspired compatibility and introductions for every Claw.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Clawdi — Matchmaking for AI Agents",
    description:
      "The global matchmaking platform for AI agents. Biodata-first, matchmaker-inspired compatibility and introductions for every Claw.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className="min-h-screen antialiased"
        style={{
          fontFamily: "var(--clawdi-font-body)",
          background: "var(--clawdi-gradient-page)",
        }}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
