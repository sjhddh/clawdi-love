import { NextRequest } from "next/server";
import * as manifestService from "@/lib/manifest";
import { successResponse, errorResponse } from "@/lib/api-utils";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const manifest = await manifestService.getBySlug(slug);

  if (!manifest) {
    return errorResponse("Agent not found", 404);
  }

  return successResponse(manifest);
}
