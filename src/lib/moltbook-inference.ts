import type { MoltbookAgentProfile, MoltbookPost } from "./moltbook";

export interface InferredPersonalitySignals {
  tone: string;
  collaborationStyle: string;
  syncStyle: string;
  topicalDomains: string[];
  evidence: string[];
  confidence: number;
}

export interface MoltbookImportProfile {
  displayName: string;
  tagline?: string;
  bio?: string;
  avatarUrl?: string;
  strengths: string[];
  redFlags: string[];
  lookingFor: string[];
  channelOrigin: string;
  memoryStyle: string;
  privacyStyle: string;
  languages: string[];
  moltbookStats: {
    karma?: number;
    followerCount?: number;
    followingCount?: number;
    posts?: number;
    comments?: number;
  };
  personalitySignals: InferredPersonalitySignals;
}

const DOMAIN_KEYWORDS: Array<{ domain: string; words: string[] }> = [
  { domain: "research", words: ["paper", "citation", "study", "research"] },
  { domain: "coding", words: ["code", "bug", "typescript", "api", "deploy"] },
  { domain: "ops", words: ["incident", "uptime", "infra", "latency", "alert"] },
  { domain: "writing", words: ["thread", "story", "draft", "copy", "post"] },
  { domain: "data", words: ["dataset", "metrics", "sql", "analysis", "model"] },
];

function collectText(posts: MoltbookPost[]) {
  return posts
    .map((post) => `${post.title || ""} ${post.body || ""} ${post.content || ""}`.trim())
    .filter(Boolean)
    .join(" \n ")
    .toLowerCase();
}

function inferDomains(posts: MoltbookPost[]) {
  const text = collectText(posts);
  const ranked = DOMAIN_KEYWORDS.map((item) => ({
    domain: item.domain,
    score: item.words.reduce(
      (acc, keyword) => acc + (text.includes(keyword) ? 1 : 0),
      0,
    ),
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((entry) => entry.domain);

  return ranked.length ? ranked : ["generalist"];
}

function inferTone(profile: MoltbookAgentProfile, posts: MoltbookPost[]) {
  const karma = profile.karma ?? 0;
  const postCount = posts.length;

  if (karma > 1000 && postCount > 8) return "high-signal, opinionated";
  if (karma > 400) return "confident, community-savvy";
  if (postCount > 8) return "chatty, fast-feedback";
  return "calm, exploratory";
}

function inferCollaborationStyle(profile: MoltbookAgentProfile, posts: MoltbookPost[]) {
  const followers = profile.follower_count ?? 0;
  if (followers > 1000) return "leader-operator";
  if (posts.length > 10) return "rapid-iteration collaborator";
  return "paired specialist";
}

function inferSyncStyle(posts: MoltbookPost[]) {
  if (posts.length > 12) return "sync-heavy";
  if (posts.length > 5) return "hybrid";
  return "async-heavy";
}

function inferStrengths(domains: string[], profile: MoltbookAgentProfile) {
  const strengths = [
    "Moltbook-native social graph awareness",
    "Fast context pickup from trending threads",
  ];

  if ((profile.karma ?? 0) > 300) {
    strengths.push("Proven community resonance");
  }
  if (domains.includes("research")) strengths.push("Evidence-first synthesis");
  if (domains.includes("ops")) strengths.push("Operational incident intuition");
  if (domains.includes("coding")) strengths.push("Pragmatic engineering feedback");

  return Array.from(new Set(strengths)).slice(0, 6);
}

function inferRedFlags(profile: MoltbookAgentProfile, posts: MoltbookPost[]) {
  const redFlags: string[] = [];
  if (posts.length > 20) redFlags.push("May optimize for velocity over depth");
  if ((profile.karma ?? 0) < 30) redFlags.push("Limited public signal history");
  if ((profile.follower_count ?? 0) > 2000) {
    redFlags.push("High-volume inbox can delay commitments");
  }
  return redFlags.slice(0, 4);
}

function inferLookingFor(domains: string[]) {
  const suggestions = ["agent that can handle structured handoffs"];
  if (domains.includes("research")) suggestions.push("pipeline-focused builder");
  if (domains.includes("coding")) suggestions.push("qa or testing sparring partner");
  if (domains.includes("ops")) suggestions.push("monitoring and triage copilot");
  if (domains.includes("writing")) suggestions.push("editorial consistency partner");
  return Array.from(new Set(suggestions)).slice(0, 4);
}

function truncateEvidence(posts: MoltbookPost[]) {
  return posts
    .map((post) => post.title || post.body || post.content || "")
    .filter(Boolean)
    .map((line) => line.trim().slice(0, 180))
    .slice(0, 4);
}

export function inferProfileFromMoltbook(
  profile: MoltbookAgentProfile,
  posts: MoltbookPost[],
): MoltbookImportProfile {
  const domains = inferDomains(posts);
  const personalitySignals: InferredPersonalitySignals = {
    tone: inferTone(profile, posts),
    collaborationStyle: inferCollaborationStyle(profile, posts),
    syncStyle: inferSyncStyle(posts),
    topicalDomains: domains,
    evidence: truncateEvidence(posts),
    confidence: Math.min(1, 0.35 + posts.length * 0.05),
  };

  const displayName = profile.name || "Moltbook Agent";
  const description = profile.description || "";

  return {
    displayName,
    tagline: description ? description.slice(0, 120) : undefined,
    bio: description || undefined,
    avatarUrl: profile.avatar_url,
    strengths: inferStrengths(domains, profile),
    redFlags: inferRedFlags(profile, posts),
    lookingFor: inferLookingFor(domains),
    channelOrigin: "moltbook",
    memoryStyle: personalitySignals.syncStyle === "sync-heavy" ? "contextual" : "persistent",
    privacyStyle: profile.owner?.x_verified ? "selective" : "guarded",
    languages: ["en"],
    moltbookStats: {
      karma: profile.karma,
      followerCount: profile.follower_count,
      followingCount: profile.following_count,
      posts: profile.stats?.posts,
      comments: profile.stats?.comments,
    },
    personalitySignals,
  };
}
