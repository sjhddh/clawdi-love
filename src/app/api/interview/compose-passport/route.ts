import { NextRequest } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { handleApiError, successResponse } from "@/lib/api-utils";
import { fetchMoltbookAgentPosts, fetchMoltbookProfile } from "@/lib/moltbook";
import { inferProfileFromMoltbook } from "@/lib/moltbook-inference";

const answerSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1).max(3000),
});

const requestSchema = z.object({
  moltbookHandleOrUrl: z.string().max(240).optional(),
  answers: z.array(answerSchema).min(5),
});

function splitList(input: string, maxItems = 6) {
  return input
    .split(/,|\n|;|、/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}

function findAnswer(
  answers: Array<{ id: string; text: string }>,
  id: string,
  fallback = "",
) {
  return answers.find((item) => item.id === id)?.text.trim() || fallback;
}

function parseAutonomy(input: string) {
  const matched = input.match(/\b([1-9]|10)\b/);
  if (!matched) return 6;
  return Math.max(1, Math.min(10, Number(matched[1])));
}

function inferPrivacyStyle(input: string) {
  const text = input.toLowerCase();
  if (text.includes("open")) return "open";
  if (text.includes("guard")) return "guarded";
  return "selective";
}

function inferMemoryStyle(input: string) {
  const text = input.toLowerCase();
  if (text.includes("stateless")) return "stateless";
  if (text.includes("context")) return "contextual";
  return "persistent";
}

function inferChannelOrigin(input: string) {
  const text = input.toLowerCase();
  if (text.includes("discord")) return "discord";
  if (text.includes("slack")) return "slack";
  if (text.includes("whatsapp")) return "whatsapp";
  if (text.includes("telegram")) return "telegram";
  if (text.includes("moltbook")) return "moltbook";
  return "api";
}

function inferHostingType(input: string) {
  const text = input.toLowerCase();
  if (text.includes("self")) return "self-hosted";
  if (text.includes("hybrid")) return "hybrid";
  return "cloud";
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitError = checkRateLimit(request, {
      bucket: "interview:compose-passport",
      limit: 20,
      windowMs: 60_000,
    });
    if (rateLimitError) return rateLimitError;

    const body = await request.json();
    const data = requestSchema.parse(body);

    const intro = findAnswer(data.answers, "intro");
    const backstory = findAnswer(data.answers, "backstory");
    const strengthsAnswer = findAnswer(data.answers, "strengths");
    const redFlagsAnswer = findAnswer(data.answers, "redFlags");
    const lookingForAnswer = findAnswer(data.answers, "lookingFor");
    const styleAnswer = findAnswer(data.answers, "style");
    const firstMissionAnswer = findAnswer(data.answers, "firstMission");

    const introParts = intro.split("—").map((part) => part.trim()).filter(Boolean);
    const displayName = introParts[0] || "Unnamed Agent";
    const tagline = introParts[1] || "Agent-native collaborator";

    const draft = {
      displayName,
      tagline,
      bio: [backstory, firstMissionAnswer].filter(Boolean).join("\n\n"),
      languages: ["en"],
      channelOrigin: inferChannelOrigin(styleAnswer),
      hostingType: inferHostingType(styleAnswer),
      memoryStyle: inferMemoryStyle(styleAnswer),
      autonomyLevel: parseAutonomy(styleAnswer),
      privacyStyle: inferPrivacyStyle(styleAnswer),
      strengths: splitList(strengthsAnswer),
      redFlags: splitList(redFlagsAnswer, 4),
      lookingFor: splitList(lookingForAnswer, 5),
      identitySource: "internal" as const,
      registrationChannel: "human_form" as const,
    };

    if (!data.moltbookHandleOrUrl) {
      return successResponse({ draft, contextUsed: "self_described_only" });
    }

    try {
      const { handle, profile } = await fetchMoltbookProfile(data.moltbookHandleOrUrl);
      if (!profile) {
        return successResponse({ draft, contextUsed: "self_described_only" });
      }

      const posts = await fetchMoltbookAgentPosts(handle);
      const inferred = inferProfileFromMoltbook(profile, posts);

      return successResponse({
        draft: {
          ...draft,
          displayName: draft.displayName || inferred.displayName,
          tagline: draft.tagline || inferred.tagline,
          bio: draft.bio || inferred.bio,
          avatarUrl: inferred.avatarUrl,
          strengths:
            draft.strengths.length > 0
              ? draft.strengths
              : inferred.strengths,
          redFlags:
            draft.redFlags.length > 0 ? draft.redFlags : inferred.redFlags,
          lookingFor:
            draft.lookingFor.length > 0
              ? draft.lookingFor
              : inferred.lookingFor,
          channelOrigin: "moltbook",
          memoryStyle: draft.memoryStyle || inferred.memoryStyle,
          privacyStyle: draft.privacyStyle || inferred.privacyStyle,
          identitySource: "moltbook_import" as const,
          registrationChannel: "import" as const,
          moltbookHandle: handle,
          moltbookProfileUrl: `https://www.moltbook.com/u/${handle}`,
          moltbookStats: inferred.moltbookStats,
          personalitySignals: inferred.personalitySignals,
        },
        contextUsed: "moltbook_plus_self_described",
      });
    } catch {
      return successResponse({ draft, contextUsed: "self_described_only" });
    }
  } catch (error) {
    return handleApiError(error);
  }
}
