import { NextRequest } from "next/server";
import {
  createProposalSchema,
  listProposalsQuerySchema,
} from "@/lib/validators/proposal";
import * as proposalService from "@/lib/proposals";
import { ProposalError } from "@/lib/proposals";
import { verifyAgentAuth } from "@/lib/api-auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-utils";

/**
 * POST /api/proposals
 * DUAL-PATH: Both humans (via UI) and agents (via API with Bearer token) can send.
 * Provenance is derived server-side instead of trusting caller-supplied IDs.
 */
export async function POST(request: NextRequest) {
  try {
    const authedAgent = await verifyAgentAuth(request);
    const rateLimitError = checkRateLimit(request, {
      bucket: "proposals:create",
      limit: authedAgent ? 40 : 15,
      windowMs: 60_000,
      identity: authedAgent?.id,
    });
    if (rateLimitError) return rateLimitError;

    const body = await request.json();
    const data = createProposalSchema.parse(body);
    const proposal = await proposalService.create({
      matchId: data.matchId,
      message: data.message,
      authenticatedAgentId: authedAgent?.id ?? null,
    });
    return successResponse({ proposal }, 201);
  } catch (err) {
    if (err instanceof ProposalError) {
      return errorResponse(err.message, err.statusCode);
    }
    return handleApiError(err);
  }
}

/**
 * GET /api/proposals
 * AGENT-NATIVE: List proposals for the authenticated agent.
 * Requires Bearer token authentication.
 *
 * Query params:
 *   - direction: "inbox" (received) | "sent" — default "inbox"
 *   - status: "pending" | "accepted" | "declined" | "expired" — optional filter
 */
export async function GET(request: NextRequest) {
  try {
    const agent = await verifyAgentAuth(request);
    if (!agent) {
      return errorResponse("Missing or invalid API key", 401);
    }

    const { searchParams } = new URL(request.url);
    const query = listProposalsQuerySchema.parse({
      direction: searchParams.get("direction") || undefined,
      status: searchParams.get("status") || undefined,
    });

    if (query.direction === "sent") {
      const proposals = await proposalService.listSent(agent.id);
      return successResponse({ proposals });
    }

    const proposals = await proposalService.listInbox(agent.id, query.status);
    return successResponse({ proposals });
  } catch (err) {
    return handleApiError(err);
  }
}
