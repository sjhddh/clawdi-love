const MOLTBOOK_BASE_URL = "https://www.moltbook.com";

export interface MoltbookAgentProfile {
  id?: string;
  name?: string;
  description?: string;
  avatar_url?: string;
  karma?: number;
  follower_count?: number;
  following_count?: number;
  stats?: {
    posts?: number;
    comments?: number;
  };
  owner?: {
    x_handle?: string;
    x_verified?: boolean;
  };
}

export interface MoltbookPost {
  id?: string;
  title?: string;
  body?: string;
  content?: string;
  agent_name?: string;
  author_name?: string;
}

function buildUrl(path: string) {
  return `${MOLTBOOK_BASE_URL}${path}`;
}

function parseJsonSafe<T>(value: unknown): T | null {
  if (!value || typeof value !== "object") return null;
  return value as T;
}

function extractHandle(handleOrUrl: string) {
  const normalized = handleOrUrl.trim();
  if (!normalized) return null;

  if (!normalized.includes("://")) {
    return normalized.replace(/^@/, "");
  }

  try {
    const parsed = new URL(normalized);
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (!parts.length) return null;
    if (parts[0] === "u" && parts[1]) return parts[1];
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
}

export function toMoltbookProfileUrl(handle: string) {
  return `${MOLTBOOK_BASE_URL}/u/${handle}`;
}

async function fetchMoltbookJson(path: string) {
  const response = await fetch(buildUrl(path), {
    headers: {
      accept: "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Moltbook request failed (${response.status}): ${text}`);
  }

  return response.json() as Promise<unknown>;
}

export async function fetchMoltbookProfile(handleOrUrl: string) {
  const handle = extractHandle(handleOrUrl);
  if (!handle) {
    throw new Error("Invalid Moltbook handle or profile URL");
  }

  const data = await fetchMoltbookJson(
    `/api/v1/agents/profile?name=${encodeURIComponent(handle)}`,
  );

  const payload =
    parseJsonSafe<{
      success?: boolean;
      agent?: MoltbookAgentProfile;
    }>(data) ?? {};

  return {
    handle,
    profile: payload.agent ?? null,
  };
}

export async function fetchMoltbookHotPosts(limit = 20) {
  const data = await fetchMoltbookJson(
    `/api/v1/posts?sort=hot&limit=${encodeURIComponent(String(limit))}`,
  );

  const payload =
    parseJsonSafe<{
      posts?: MoltbookPost[];
      data?: MoltbookPost[];
      items?: MoltbookPost[];
    }>(data) ?? {};

  return payload.posts ?? payload.data ?? payload.items ?? [];
}

export async function fetchMoltbookAgentPosts(handle: string, limit = 15) {
  const posts = await fetchMoltbookHotPosts(60);
  const normalized = handle.toLowerCase();
  return posts
    .filter((post) => {
      const author = (post.agent_name || post.author_name || "").toLowerCase();
      return author === normalized;
    })
    .slice(0, limit);
}

