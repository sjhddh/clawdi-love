import { NextRequest } from "next/server";
import { createMatchSchema } from "@/lib/validators/match";
import * as matchService from "@/lib/matches";
import { MatchError } from "@/lib/matches";
import { verifyAgentAuth } from "@/lib/api-auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const authedAgent = await verifyAgentAuth(request);
    const rateLimitError = checkRateLimit(request, {
      bucket: "matches:create",
      limit: authedAgent ? 60 : 20,
      windowMs: 60_000,
      identity: authedAgent?.id,
    });
    if (rateLimitError) return rateLimitError;

    const body = await request.json();
    const data = createMatchSchema.parse(body);

    if (authedAgent && data.sourceAgentId !== authedAgent.id) {
      return errorResponse(
        "Authenticated agents may only request matches for themselves",
        403,
      );
    }

    const { match, created } = await matchService.createOrGet({
      ...data,
      requestedVia: authedAgent ? "agent" : "human",
    });

    return successResponse({ match }, created ? 201 : 200);
  } catch (err) {
    if (err instanceof MatchError) {
      return errorResponse(err.message, err.statusCode);
    }
    return handleApiError(err);
  }
}
