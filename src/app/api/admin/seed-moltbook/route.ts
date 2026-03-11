import { NextRequest } from "next/server";
import { z } from "zod";
import { seedMoltbookHotAgents } from "@/lib/moltbook-seeding";
import { errorResponse, successResponse, handleApiError } from "@/lib/api-utils";

const requestSchema = z.object({
  limit: z.number().int().min(2).max(20).optional(),
});

function isAuthorized(request: NextRequest) {
  const expected = process.env.SEED_ADMIN_TOKEN;
  if (!expected) return false;
  const provided = request.headers.get("x-admin-token");
  return Boolean(provided && provided === expected);
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json().catch(() => ({}));
    const { limit } = requestSchema.parse(body);
    const result = await seedMoltbookHotAgents(limit);
    return successResponse({ result });
  } catch (error) {
    return handleApiError(error);
  }
}
