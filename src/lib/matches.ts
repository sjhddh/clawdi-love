import { prisma } from "./prisma";
import { computeCompatibility } from "./compatibility-engine";
import {
  generateMatchmakerNarration,
  isFlockEnabled,
} from "./matchmaker-narration";
import type { CreateMatchInput } from "./validators/match";

const AGENT_SUMMARY_SELECT = {
  id: true,
  slug: true,
  displayName: true,
  tagline: true,
  avatarUrl: true,
  languages: true,
} as const;

/**
 * Phase 1 — Get a match by ID with both agent summaries.
 */
export async function getById(id: string) {
  return prisma.match.findUnique({
    where: { id },
    include: {
      sourceAgent: { select: AGENT_SUMMARY_SELECT },
      targetAgent: { select: AGENT_SUMMARY_SELECT },
    },
  });
}

/**
 * Phase 3 — Create a compatibility check or return existing.
 *
 * Idempotent: if a match already exists for the ordered pair
 * (source → target), returns it instead of creating a duplicate.
 *
 * The compatibility engine runs synchronously in the request handler
 * for MVP. The lib/jobs abstraction allows moving this to an async
 * worker later without changing the service interface — only the
 * return type would change from Match to { match, status: "pending" }.
 */
export async function createOrGet(data: CreateMatchInput) {
  if (data.sourceAgentId === data.targetAgentId) {
    throw new MatchError("Cannot match an agent with itself", 400);
  }

  const [source, target] = await Promise.all([
    prisma.agent.findUnique({ where: { id: data.sourceAgentId } }),
    prisma.agent.findUnique({ where: { id: data.targetAgentId } }),
  ]);

  if (!source || !target) {
    throw new MatchError("One or both agents not found", 404);
  }

  if (source.status !== "published" || target.status !== "published") {
    throw new MatchError("Both agents must be published before matching", 400);
  }

  const existing = await prisma.match.findUnique({
    where: {
      sourceAgentId_targetAgentId: {
        sourceAgentId: data.sourceAgentId,
        targetAgentId: data.targetAgentId,
      },
    },
  });

  if (existing) {
    return { match: existing, created: false };
  }

  const result = computeCompatibility(source, target);
  let matchmakerSummary: string | undefined;
  let strengths = result.strengths;
  let risks = result.risks;
  let suggestedFirstMeeting = result.suggestedFirstMeeting;

  if (isFlockEnabled()) {
    try {
      const narration = await generateMatchmakerNarration({
        source,
        target,
        compatibility: result,
      });

      matchmakerSummary = narration.summary;
      strengths = narration.strengths;
      risks = narration.risks;
      suggestedFirstMeeting = narration.suggestedFirstMeeting;
    } catch (error) {
      console.error("Failed to generate FLOCK matchmaker narration:", error);
      matchmakerSummary = undefined;
    }
  }

  const match = await prisma.match.create({
    data: {
      sourceAgentId: data.sourceAgentId,
      targetAgentId: data.targetAgentId,
      status: "completed",
      compatibilityScore: result.score,
      verdict: result.verdict,
      dimensionsJson: result.dimensions as unknown as Record<string, number>,
      strengthsJson: strengths,
      risksJson: risks,
      matchmakerSummary,
      suggestedFirstMeeting,
      requestedVia: data.requestedVia,
    },
  });

  return { match, created: true };
}

/**
 * Typed error for match operations.
 * The route handler maps this to the appropriate HTTP response.
 */
export class MatchError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = "MatchError";
  }
}
