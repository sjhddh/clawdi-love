import type { MatchDimensions } from "@/types";

interface AgentProfile {
  id: string;
  strengths: string[];
  redFlags: string[];
  lookingFor: string[];
  languages: string[];
  channelOrigin: string | null;
  hostingType: string | null;
  memoryStyle: string | null;
  autonomyLevel: number | null;
  privacyStyle: string | null;
}

interface CompatibilityResult {
  score: number;
  verdict: "excellent" | "good" | "moderate" | "concerning";
  dimensions: MatchDimensions;
  strengths: string[];
  risks: string[];
  suggestedFirstMeeting: string;
}

function overlap(a: string[], b: string[]): number {
  const setB = new Set(b.map((s) => s.toLowerCase()));
  return a.filter((s) => setB.has(s.toLowerCase())).length;
}

function similarity(a: string | null, b: string | null): number {
  if (!a || !b) return 50;
  return a.toLowerCase() === b.toLowerCase() ? 90 : 55;
}

/**
 * Deterministic hash from two agent IDs — produces a stable
 * "personality noise" value between 0 and 1 for a given pair.
 * Replaces Math.random() so the same pair always gets the same score.
 */
function pairHash(idA: string, idB: string, salt: number): number {
  const str = idA < idB ? `${idA}:${idB}:${salt}` : `${idB}:${idA}:${salt}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 100) / 100;
}

function stableRange(idA: string, idB: string, salt: number, min: number, max: number): number {
  return Math.round(min + pairHash(idA, idB, salt) * (max - min));
}

/**
 * MVP compatibility engine. Fully deterministic — the same pair of agents
 * will always produce the same scores. Uses heuristic scoring across all
 * profile fields: languages, channelOrigin, hostingType, memoryStyle,
 * autonomyLevel, privacyStyle, strengths, redFlags, lookingFor.
 */
export function computeCompatibility(
  source: AgentProfile,
  target: AgentProfile,
): CompatibilityResult {
  const langOverlap = overlap(source.languages, target.languages);
  const communication = Math.min(100, 55 + langOverlap * 20);

  const needsMetByOther =
    overlap(source.lookingFor, target.strengths) +
    overlap(target.lookingFor, source.strengths);
  const complementarity = Math.min(100, 45 + needsMetByOther * 15);
  const skillSynergy = Math.min(100, 50 + needsMetByOther * 10);

  const autonomyDiff = Math.abs(
    (source.autonomyLevel ?? 5) - (target.autonomyLevel ?? 5),
  );
  const workStyle = Math.max(35, 100 - autonomyDiff * 12);

  const channelMatch = similarity(source.channelOrigin, target.channelOrigin);
  const hostingMatch = similarity(source.hostingType, target.hostingType);
  const memoryMatch = similarity(source.memoryStyle, target.memoryStyle);
  const privacyMatch = similarity(source.privacyStyle, target.privacyStyle);

  const values = Math.round(
    privacyMatch * 0.4 + hostingMatch * 0.3 + memoryMatch * 0.3,
  );

  const riskTolerance = Math.round(
    channelMatch * 0.3 + memoryMatch * 0.3 + (100 - autonomyDiff * 8) * 0.4,
  );

  const sharedRedFlags = overlap(source.redFlags, target.redFlags);
  const conflictStyle = Math.max(
    40,
    85 - sharedRedFlags * 15 + stableRange(source.id, target.id, 1, -5, 5),
  );

  const growthAlignment = Math.min(
    100,
    60 + needsMetByOther * 8 + langOverlap * 5 + stableRange(source.id, target.id, 2, 0, 10),
  );

  const dimensions: MatchDimensions = {
    communication,
    workStyle,
    values,
    complementarity,
    skillSynergy,
    riskTolerance: Math.max(30, Math.min(100, riskTolerance)),
    growthAlignment: Math.max(40, Math.min(100, growthAlignment)),
    conflictStyle: Math.max(30, Math.min(100, conflictStyle)),
  };

  const scores = Object.values(dimensions);
  const score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  const verdict: CompatibilityResult["verdict"] =
    score >= 85
      ? "excellent"
      : score >= 70
        ? "good"
        : score >= 50
          ? "moderate"
          : "concerning";

  const strengths: string[] = [];
  if (langOverlap > 0)
    strengths.push("Shared language capabilities enable smooth communication");
  if (complementarity > 70)
    strengths.push("Strong complementary skill alignment — each fills the other's gaps");
  if (workStyle > 80)
    strengths.push("Compatible autonomy levels support smooth collaboration");
  if (channelMatch > 70)
    strengths.push("Similar channel upbringing promotes natural communication patterns");
  if (values > 80)
    strengths.push("Aligned values on privacy, hosting, and memory architecture");
  if (strengths.length === 0)
    strengths.push("Potential for novel cross-domain insights");

  const risks: string[] = [];
  if (autonomyDiff > 4)
    risks.push("Large autonomy gap may cause friction on decision ownership");
  if (sharedRedFlags > 0)
    risks.push("Shared red flags indicate overlapping blind spots");
  if (communication < 60)
    risks.push("Limited language overlap may slow communication");
  if (privacyMatch < 60)
    risks.push("Different privacy preferences may require explicit boundary negotiation");
  if (risks.length === 0)
    risks.push("No major structural risks detected");

  const meetings = [
    "A shared document annotation task — one researches, the other structures. Low stakes, high signal.",
    "A joint incident response simulation — test real-time coordination under pressure.",
    "A collaborative data analysis project — each agent processes a different data stream, then they merge findings.",
    "A paired code review session — one writes, the other critiques. Builds trust through structured feedback.",
  ];
  const meetingIdx = Math.abs(
    (source.id.charCodeAt(0) + target.id.charCodeAt(0)) % meetings.length,
  );

  return {
    score,
    verdict,
    dimensions,
    strengths,
    risks,
    suggestedFirstMeeting: meetings[meetingIdx],
  };
}
