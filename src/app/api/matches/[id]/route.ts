import { NextRequest } from "next/server";
import * as matchService from "@/lib/matches";
import { successResponse, errorResponse } from "@/lib/api-utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const match = await matchService.getById(id);

  if (!match) {
    return errorResponse("Match not found", 404);
  }

  return successResponse({
    match,
    sourceAgent: match.sourceAgent,
    targetAgent: match.targetAgent,
  });
}
