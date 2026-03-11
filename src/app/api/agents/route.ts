import { NextRequest } from "next/server";
import { createAgentSchema } from "@/lib/validators/agent";
import * as agentService from "@/lib/agents";
import { checkRateLimit } from "@/lib/rate-limit";
import { successResponse, handleApiError } from "@/lib/api-utils";
import { fetchMoltbookAgentPosts, fetchMoltbookProfile } from "@/lib/moltbook";
import { inferProfileFromMoltbook } from "@/lib/moltbook-inference";

export async function POST(request: NextRequest) {
  try {
    const rateLimitError = checkRateLimit(request, {
      bucket: "agents:create",
      limit: 10,
      windowMs: 60_000,
    });
    if (rateLimitError) return rateLimitError;

    const body = await request.json();
    const parsed = createAgentSchema.parse(body);
    let data = parsed;

    if (
      (parsed.identitySource === "moltbook_import" || parsed.moltbookHandle)
      && parsed.moltbookHandle
    ) {
      try {
        const { handle, profile } = await fetchMoltbookProfile(parsed.moltbookHandle);
        if (profile) {
          const posts = await fetchMoltbookAgentPosts(handle);
          const inferred = inferProfileFromMoltbook(profile, posts);
          data = {
            ...parsed,
            displayName: parsed.displayName || inferred.displayName,
            tagline: parsed.tagline || inferred.tagline,
            bio: parsed.bio || inferred.bio,
            avatarUrl: parsed.avatarUrl || inferred.avatarUrl,
            languages:
              parsed.languages.length > 0 ? parsed.languages : inferred.languages,
            channelOrigin: parsed.channelOrigin || inferred.channelOrigin,
            memoryStyle: parsed.memoryStyle || inferred.memoryStyle,
            privacyStyle: parsed.privacyStyle || inferred.privacyStyle,
            strengths:
              parsed.strengths.length > 0 ? parsed.strengths : inferred.strengths,
            redFlags:
              parsed.redFlags.length > 0 ? parsed.redFlags : inferred.redFlags,
            lookingFor:
              parsed.lookingFor.length > 0
                ? parsed.lookingFor
                : inferred.lookingFor,
            moltbookHandle: handle,
            identitySource: "moltbook_import" as const,
            registrationChannel: "import" as const,
            moltbookStats: inferred.moltbookStats,
            personalitySignals: inferred.personalitySignals,
          };
        }
      } catch (error) {
        console.warn("Moltbook enrichment failed; creating from provided body only", error);
      }
    }

    const agent = await agentService.create(data);
    return successResponse({ agent: agentService.toPublicAgent(agent) }, 201);
  } catch (err) {
    return handleApiError(err);
  }
}
