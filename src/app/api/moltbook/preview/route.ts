import { NextRequest } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { errorResponse, successResponse, handleApiError } from "@/lib/api-utils";
import {
  fetchMoltbookAgentPosts,
  fetchMoltbookProfile,
  toMoltbookProfileUrl,
} from "@/lib/moltbook";
import { inferProfileFromMoltbook } from "@/lib/moltbook-inference";

const previewSchema = z.object({
  handleOrUrl: z.string().min(1).max(240),
});

export async function POST(request: NextRequest) {
  try {
    const rateLimitError = checkRateLimit(request, {
      bucket: "moltbook:preview",
      limit: 20,
      windowMs: 60_000,
    });
    if (rateLimitError) return rateLimitError;

    const body = await request.json();
    const { handleOrUrl } = previewSchema.parse(body);
    const { handle, profile } = await fetchMoltbookProfile(handleOrUrl);

    if (!profile) {
      return errorResponse("Moltbook agent not found", 404);
    }

    const posts = await fetchMoltbookAgentPosts(handle);
    const inferred = inferProfileFromMoltbook(profile, posts);

    return successResponse({
      handle,
      profileUrl: toMoltbookProfileUrl(handle),
      profile,
      postCount: posts.length,
      inferred,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
