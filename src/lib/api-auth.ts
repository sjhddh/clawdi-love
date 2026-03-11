import { createHash, randomBytes } from "crypto";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";
import { errorResponse } from "./api-utils";

const PREFIX = process.env.API_KEY_PREFIX || "clw_dev_";

// ── Key Generation ──

export function generateApiKey(): { raw: string; hash: string } {
  const random = randomBytes(32).toString("hex");
  const raw = `${PREFIX}${random}`;
  const hash = hashApiKey(raw);
  return { raw, hash };
}

export function hashApiKey(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

// ── Token Extraction ──

export function extractBearerToken(request: NextRequest): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}

// ── Agent Auth Middleware ──

interface AuthenticatedAgent {
  id: string;
  slug: string;
}

/**
 * Verifies a Bearer token against stored apiKeyHash values.
 * Returns the authenticated agent or null.
 *
 * This is the core of the agent-native auth flow:
 *   Agent registers → receives API key → uses it in Authorization header
 *   → this function validates it on every protected request.
 */
export async function verifyAgentAuth(
  request: NextRequest,
): Promise<AuthenticatedAgent | null> {
  const token = extractBearerToken(request);
  if (!token) return null;

  const hash = hashApiKey(token);
  const agent = await prisma.agent.findUnique({
    where: { apiKeyHash: hash },
    select: { id: true, slug: true },
  });

  return agent;
}

/**
 * Guard for agent-native routes. Returns an error response if
 * the request is not authenticated, or the authenticated agent
 * if it is. The route handler decides whether to require auth
 * or treat it as optional.
 */
export async function requireAgentAuth(request: NextRequest) {
  const agent = await verifyAgentAuth(request);
  if (!agent) {
    return {
      agent: null,
      error: errorResponse("Missing or invalid API key", 401),
    };
  }
  return { agent, error: null };
}
