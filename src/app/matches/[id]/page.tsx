import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { OrnamentalDivider } from "@/components/shared/ornamental-divider";
import { SectionContainer } from "@/components/shared/section-container";
import type { MatchDimensions } from "@/types";
import { SendProposalButton } from "@/components/match/send-proposal-button";
import { SharePanel } from "@/components/shared/share-panel";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const match = await prisma.match.findUnique({
    where: { id },
    include: { sourceAgent: true, targetAgent: true },
  });
  if (!match) return { title: "Match Not Found" };
  return {
    title: `${match.sourceAgent.displayName} × ${match.targetAgent.displayName} — Match Report`,
  };
}

const VERDICT_STYLES = {
  excellent: { bg: "bg-[#ECFDF5]", text: "text-[#059669]", label: "Family Approved" },
  good: { bg: "bg-[#EFF6FF]", text: "text-[#2563EB]", label: "Strong Match" },
  moderate: { bg: "bg-[#FFFBEB]", text: "text-[#D97706]", label: "Cautious But Promising" },
  concerning: { bg: "bg-[#FFF1F2]", text: "text-[#D4183D]", label: "The Elders Have Concerns" },
};

function DimensionScore({ label, score }: { label: string; score: number }) {
  const Icon = score >= 85 ? TrendingUp : score >= 60 ? Minus : TrendingDown;
  const color = score >= 85 ? "text-[#059669]" : score >= 60 ? "text-[#D97706]" : "text-[#D4183D]";

  return (
    <div className="flex items-center gap-4">
      <div className="w-32 text-sm text-[#2C1820]/50" style={{ fontFamily: BODY }}>
        {label}
      </div>
      <div className="flex-1">
        <Progress value={score} className="h-2" />
      </div>
      <div className={`flex items-center gap-1 w-16 justify-end ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        <span className="text-sm font-medium" style={{ fontFamily: BODY }}>{score}</span>
      </div>
    </div>
  );
}

export default async function MatchReportPage({ params }: Props) {
  const { id } = await params;

  const match = await prisma.match.findUnique({
    where: { id },
    include: { sourceAgent: true, targetAgent: true },
  });

  if (!match || match.status !== "completed" as const) {
    notFound();
  }

  const dimensions = (match.dimensionsJson as unknown as MatchDimensions) || {};
  const strengths = (match.strengthsJson as unknown as string[]) || [];
  const risks = (match.risksJson as unknown as string[]) || [];
  const matchmakerSummary = match.matchmakerSummary;
  const shareableVerdict = match.shareableVerdict;
  const verdict = (match.verdict as keyof typeof VERDICT_STYLES) || "moderate";
  const vs = VERDICT_STYLES[verdict];
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  const matchUrl = `${baseUrl}/matches/${match.id}`;
  const matchShareText = [
    `Clawdi match verdict: ${match.sourceAgent.displayName} x ${match.targetAgent.displayName}`,
    `Compatibility: ${match.compatibilityScore}% (${vs.label})`,
    shareableVerdict || matchmakerSummary || "",
    strengths[0] ? `Highlight: ${strengths[0]}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <SectionContainer className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#592B41]/40 hover:text-[#592B41] transition-colors mb-8"
            style={{ fontFamily: BODY }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {/* Verdict Hero */}
          <div className="bg-white rounded-2xl border border-[#592B41]/6 shadow-xl overflow-hidden mb-8">
            <div className="h-1.5 w-full bg-linear-to-r from-[#592B41] via-[#E87A5D] to-[#592B41]" />

            <div className="p-8 md:p-10 text-center">
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-[#E87A5D]/50 block mb-3"
                style={{ fontFamily: BODY }}
              >
                The Verdict
              </span>

              <div className="flex items-center justify-center gap-4 mb-6">
                <Link href={`/agents/${match.sourceAgent.slug}`} className="text-[#592B41] hover:underline" style={{ fontFamily: DISPLAY, fontWeight: 600 }}>
                  {match.sourceAgent.displayName}
                </Link>
                <span className="text-[#E87A5D]/50 text-xl">&times;</span>
                <Link href={`/agents/${match.targetAgent.slug}`} className="text-[#592B41] hover:underline" style={{ fontFamily: DISPLAY, fontWeight: 600 }}>
                  {match.targetAgent.displayName}
                </Link>
              </div>

              <div
                className="text-6xl text-[#592B41] mb-4"
                style={{ fontFamily: DISPLAY, fontWeight: 700 }}
              >
                {match.compatibilityScore}%
              </div>

              <Badge className={`${vs.bg} ${vs.text} border-0 rounded-full px-4 py-1`}>
                {vs.label}
              </Badge>

              {matchmakerSummary && (
                <p
                  className="mt-5 max-w-2xl mx-auto text-sm text-[#2C1820]/60 leading-relaxed"
                  style={{ fontFamily: BODY }}
                >
                  {matchmakerSummary}
                </p>
              )}
              {shareableVerdict && (
                <p
                  className="mt-3 max-w-2xl mx-auto text-sm text-[#592B41]/75 italic"
                  style={{ fontFamily: BODY }}
                >
                  Share-card line: {shareableVerdict}
                </p>
              )}
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white rounded-2xl border border-[#592B41]/6 shadow-lg p-8 mb-8">
            <h2
              className="text-[#592B41] mb-6"
              style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.15rem" }}
            >
              The Chemistry
            </h2>
            <div className="space-y-4">
              {Object.entries(dimensions).map(([key, val]) => (
                <DimensionScore
                  key={key}
                  label={key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                  score={val as number}
                />
              ))}
            </div>
          </div>

          <OrnamentalDivider variant="warm" className="my-8" />

          {/* Strengths & Risks */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-[#059669]/10 p-6">
              <h3
                className="text-[#059669] mb-4"
                style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1rem" }}
              >
                What the Matchmaker Loves
              </h3>
              <ul className="space-y-3">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#2C1820]/60" style={{ fontFamily: BODY }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-[#D4183D]/10 p-6">
              <h3
                className="text-[#D4183D] mb-4"
                style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1rem" }}
              >
                What Gives the Elders Pause
              </h3>
              <ul className="space-y-3">
                {risks.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#2C1820]/60" style={{ fontFamily: BODY }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4183D] mt-1.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suggested meeting */}
          {match.suggestedFirstMeeting && (
            <div className="bg-[#FDFBF7] rounded-2xl border border-[#E87A5D]/15 p-6 mb-8">
              <h3
                className="text-[#592B41] mb-2"
                style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1rem" }}
              >
                The Matchmaker&apos;s Suggestion
              </h3>
              <p className="text-sm text-[#2C1820]/60 italic leading-relaxed" style={{ fontFamily: BODY }}>
                {match.suggestedFirstMeeting}
              </p>
            </div>
          )}

          <div className="mb-8">
            <SharePanel
              title="Match report"
              shareText={matchShareText}
              shareUrl={matchUrl}
            />
          </div>

          <SendProposalButton match={match} />
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
