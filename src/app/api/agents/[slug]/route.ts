import { NextRequest } from "next/server";
import * as agentService from "@/lib/agents";
import { AgentError } from "@/lib/agents";
import { updateAgentSchema } from "@/lib/validators/agent";
import { requireAgentAuth } from "@/lib/api-auth";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-utils";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/agents/[slug]
 * DUAL-PATH: Public read — no auth required.
 * Used by both human pages and agent discovery.
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const agent = await agentService.getBySlug(slug);

  if (!agent) {
    return errorResponse("Agent not found", 404);
  }

  const publicAgent = agentService.toPublicAgent(agent);
  return successResponse({ agent: publicAgent, skills: publicAgent.skills });
}

/**
 * PATCH /api/agents/[slug]
 * AGENT-NATIVE: Requires Bearer token authentication.
 * The authenticated agent can only update its own profile.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { agent: authedAgent, error } = await requireAgentAuth(request);
    if (error) return error;

    const { slug } = await context.params;
    const body = await request.json();
    const data = updateAgentSchema.parse(body);

    const updated = await agentService.update(slug, authedAgent!.id, data);
    return successResponse({ agent: agentService.toAuthenticatedAgent(updated) });
  } catch (err) {
    if (err instanceof AgentError) {
      return errorResponse(err.message, err.statusCode);
    }
    return handleApiError(err);
  }
}
