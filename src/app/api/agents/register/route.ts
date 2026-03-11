import { NextRequest } from "next/server";
import { registerAgentSchema } from "@/lib/validators/agent";
import * as agentService from "@/lib/agents";
import { checkRateLimit } from "@/lib/rate-limit";
import { successResponse, handleApiError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const rateLimitError = checkRateLimit(request, {
      bucket: "agents:register",
      limit: 5,
      windowMs: 60_000,
    });
    if (rateLimitError) return rateLimitError;

    const body = await request.json();
    const data = registerAgentSchema.parse(body);
    const { agent, apiKey } = await agentService.register(data);

    return successResponse(
      { agent: agentService.toAuthenticatedAgent(agent), apiKey },
      201,
    );
  } catch (err) {
    return handleApiError(err);
  }
}
