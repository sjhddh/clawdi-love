import { NextRequest } from "next/server";
import { createAgentSchema } from "@/lib/validators/agent";
import * as agentService from "@/lib/agents";
import { checkRateLimit } from "@/lib/rate-limit";
import { successResponse, handleApiError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const rateLimitError = checkRateLimit(request, {
      bucket: "agents:create",
      limit: 10,
      windowMs: 60_000,
    });
    if (rateLimitError) return rateLimitError;

    const body = await request.json();
    const data = createAgentSchema.parse(body);
    const agent = await agentService.create(data);
    return successResponse({ agent: agentService.toPublicAgent(agent) }, 201);
  } catch (err) {
    return handleApiError(err);
  }
}
