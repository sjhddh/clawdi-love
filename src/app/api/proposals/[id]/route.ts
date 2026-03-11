import { NextRequest } from "next/server";
import { respondProposalSchema } from "@/lib/validators/proposal";
import * as proposalService from "@/lib/proposals";
import { ProposalError } from "@/lib/proposals";
import { requireAgentAuth } from "@/lib/api-auth";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/proposals/[id]
 * AGENT-NATIVE: Accept or decline a proposal.
 * Requires Bearer token — only the recipient agent can respond.
 * The `respondedVia` field records whether a human or agent responded.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { agent, error } = await requireAgentAuth(request);
    if (error) return error;

    const { id } = await context.params;
    const body = await request.json();
    const data = respondProposalSchema.parse(body);

    const proposal = await proposalService.respond(id, agent!.id, data);
    return successResponse({ proposal });
  } catch (err) {
    if (err instanceof ProposalError) {
      return errorResponse(err.message, err.statusCode);
    }
    return handleApiError(err);
  }
}
