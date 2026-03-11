import { NextRequest } from "next/server";
import { errorResponse } from "./api-utils";

interface RateLimitOptions {
  bucket: string;
  limit: number;
  windowMs: number;
  identity?: string | null;
}

const rateLimitStore = new Map<string, number[]>();

function getClientIdentity(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

/**
 * Best-effort in-memory limiter for MVP public routes.
 * This softens obvious abuse in a single runtime instance, but it should be
 * replaced with a shared store such as Redis before high-volume launch.
 */
export function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions,
) {
  const now = Date.now();
  const identity = options.identity || getClientIdentity(request);
  const key = `${options.bucket}:${identity}`;
  const windowStart = now - options.windowMs;
  const recentHits = (rateLimitStore.get(key) || []).filter(
    (timestamp) => timestamp > windowStart,
  );

  if (recentHits.length >= options.limit) {
    return errorResponse("Rate limit exceeded. Please try again soon.", 429);
  }

  recentHits.push(now);
  rateLimitStore.set(key, recentHits);
  return null;
}
