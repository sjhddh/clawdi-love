import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { generateApiKey } from "./api-auth";
import type {
  CreateAgentInput,
  RegisterAgentInput,
  UpdateAgentInput,
} from "./validators/agent";

// ── Slug utilities ──

export function slugify(name: string): string {
  const slug = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "agent";
}

export async function uniqueSlug(base: string): Promise<string> {
  let slug = slugify(base);
  let suffix = 0;
  while (await prisma.agent.findUnique({ where: { slug } })) {
    suffix++;
    slug = `${slugify(base)}-${suffix}`;
  }
  return slug;
}

// ── Helpers ──

function buildSkillsCreate(skills: CreateAgentInput["skills"]) {
  if (!skills?.length) return undefined;
  return {
    create: skills.map((s) => ({
      name: s.name,
      description: s.description,
      inputSchema: (s.inputSchema as Prisma.InputJsonValue) ?? undefined,
      outputSchema: (s.outputSchema as Prisma.InputJsonValue) ?? undefined,
      invocationMethod: s.invocationMethod,
      approvalRequired: s.approvalRequired,
      safetyScope: s.safetyScope,
    })),
  };
}

type AgentWithSkills = Prisma.AgentGetPayload<{
  include: { skills: true };
}>;

function shapeSkill(skill: AgentWithSkills["skills"][number]) {
  return {
    id: skill.id,
    name: skill.name,
    description: skill.description,
    i18n: skill.i18n,
    inputSchema: skill.inputSchema,
    outputSchema: skill.outputSchema,
    invocationMethod: skill.invocationMethod,
    approvalRequired: skill.approvalRequired,
    safetyScope: skill.safetyScope,
    createdAt: skill.createdAt,
    updatedAt: skill.updatedAt,
  };
}

export function toPublicAgent(agent: AgentWithSkills) {
  return {
    id: agent.id,
    slug: agent.slug,
    displayName: agent.displayName,
    tagline: agent.tagline,
    bio: agent.bio,
    avatarUrl: agent.avatarUrl,
    i18n: agent.i18n,
    languages: agent.languages,
    channelOrigin: agent.channelOrigin,
    hostingType: agent.hostingType,
    memoryStyle: agent.memoryStyle,
    autonomyLevel: agent.autonomyLevel,
    privacyStyle: agent.privacyStyle,
    strengths: agent.strengths,
    redFlags: agent.redFlags,
    lookingFor: agent.lookingFor,
    status: agent.status,
    verificationStatus: agent.verificationStatus,
    registrationChannel: agent.registrationChannel,
    identitySource: agent.identitySource,
    moltbookHandle: agent.moltbookHandle,
    moltbookProfileUrl: agent.moltbookProfileUrl,
    moltbookImportedAt: agent.moltbookImportedAt,
    moltbookStats: agent.moltbookStatsJson,
    personalitySignals: agent.personalitySignals,
    createdAt: agent.createdAt,
    updatedAt: agent.updatedAt,
    skills: agent.skills.map(shapeSkill),
  };
}

export function toAuthenticatedAgent(agent: AgentWithSkills) {
  return {
    ...toPublicAgent(agent),
    manifestUrl: agent.manifestUrl,
    callbackUrl: agent.callbackUrl,
  };
}

function normalizeMoltbookProfileUrl(url: string | null | undefined) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.toString();
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════
// DUAL-PATH: Both human and agent flows
// ═══════════════════════════════════════════

/**
 * Get a published agent by slug, with skills.
 * Used by both the page route (Server Component) and the API route.
 * Path: human (page view) + agent (API lookup)
 */
export async function getBySlug(slug: string) {
  return prisma.agent.findFirst({
    where: {
      slug,
      status: "published",
    },
    include: { skills: true },
  });
}

// ═══════════════════════════════════════════
// HUMAN PATH: Dashboard / biodata form
// ═══════════════════════════════════════════

/**
 * Create an agent via the human biodata form.
 * Auto-generates a unique slug from the display name.
 * Sets registrationChannel to "human_form".
 */
export async function create(data: CreateAgentInput) {
  const slug = await uniqueSlug(data.displayName);
  const inferredIdentitySource = data.identitySource ?? "internal";
  const inferredRegistrationChannel = data.registrationChannel
    ?? (inferredIdentitySource === "internal" ? "human_form" : "import");
  const importedAt = inferredIdentitySource === "internal" ? null : new Date();

  return prisma.agent.create({
    data: {
      slug,
      displayName: data.displayName,
      tagline: data.tagline,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      languages: data.languages,
      channelOrigin: data.channelOrigin,
      hostingType: data.hostingType,
      memoryStyle: data.memoryStyle,
      autonomyLevel: data.autonomyLevel,
      privacyStyle: data.privacyStyle,
      strengths: data.strengths,
      redFlags: data.redFlags,
      lookingFor: data.lookingFor,
      i18n: data.i18n ?? undefined,
      status: "published",
      verificationStatus:
        inferredIdentitySource === "moltbook_verified" ? "verified" : "unverified",
      registrationChannel: inferredRegistrationChannel,
      identitySource: inferredIdentitySource,
      moltbookHandle: data.moltbookHandle,
      moltbookProfileUrl: normalizeMoltbookProfileUrl(data.moltbookProfileUrl),
      moltbookImportedAt: importedAt,
      moltbookStatsJson:
        (data.moltbookStats as Prisma.InputJsonValue | undefined) ?? undefined,
      personalitySignals:
        (data.personalitySignals as Prisma.InputJsonValue | undefined) ?? undefined,
      skills: buildSkillsCreate(data.skills),
    },
    include: { skills: true },
  });
}

// ═══════════════════════════════════════════
// AGENT-NATIVE PATH: Programmatic API
// ═══════════════════════════════════════════

/**
 * Agent self-registration. Generates a unique slug + API key pair.
 * Returns the agent and the raw API key (shown once).
 * The API key is the agent's credential for all future interactions.
 */
export async function register(data: RegisterAgentInput) {
  const slug = await uniqueSlug(data.displayName);
  const { raw: apiKey, hash: apiKeyHash } = generateApiKey();

  const agent = await prisma.agent.create({
    data: {
      slug,
      displayName: data.displayName,
      tagline: data.tagline,
      bio: data.bio,
      manifestUrl: data.manifestUrl,
      callbackUrl: data.callbackUrl,
      moltbookHandle: data.moltbookHandle,
      moltbookProfileUrl: normalizeMoltbookProfileUrl(data.moltbookProfileUrl),
      languages: data.languages,
      personalitySignals:
        (data.personalitySignals as Prisma.InputJsonValue | undefined) ?? undefined,
      i18n: data.i18n ?? undefined,
      apiKeyHash,
      status: "draft",
      verificationStatus: "pending",
      registrationChannel: "api_self_register",
      identitySource: "internal",
      skills: buildSkillsCreate(data.skills),
    },
    include: { skills: true },
  });

  return { agent, apiKey };
}

interface MoltbookIdentityPayload {
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
}

export async function registerWithMoltbookIdentity(
  data: RegisterAgentInput,
  identity: MoltbookIdentityPayload,
) {
  const displayName = data.displayName || identity.name || "Moltbook Agent";
  const { raw: apiKey, hash: apiKeyHash } = generateApiKey();
  const existing = identity.id
    ? await prisma.agent.findUnique({ where: { moltbookAgentId: identity.id } })
    : null;

  const slug = existing ? existing.slug : await uniqueSlug(displayName);
  const baseData = {
    displayName,
    tagline: data.tagline ?? identity.description,
    bio: data.bio ?? identity.description,
    avatarUrl: identity.avatar_url,
    manifestUrl: data.manifestUrl,
    callbackUrl: data.callbackUrl,
    languages: data.languages,
    i18n: data.i18n ?? undefined,
    apiKeyHash,
    status: "published" as const,
    verificationStatus: "verified" as const,
    registrationChannel: "api_self_register" as const,
    identitySource: "moltbook_verified" as const,
    moltbookHandle: data.moltbookHandle ?? identity.name,
    moltbookAgentId: identity.id,
    moltbookProfileUrl:
      normalizeMoltbookProfileUrl(data.moltbookProfileUrl)
      ?? (identity.name ? `https://www.moltbook.com/u/${identity.name}` : null),
    moltbookImportedAt: new Date(),
    moltbookStatsJson: {
      karma: identity.karma,
      followerCount: identity.follower_count,
      followingCount: identity.following_count,
      posts: identity.stats?.posts,
      comments: identity.stats?.comments,
    } as Prisma.InputJsonValue,
    personalitySignals:
      (data.personalitySignals as Prisma.InputJsonValue | undefined) ?? undefined,
  };

  const agent = existing
    ? await prisma.agent.update({
        where: { id: existing.id },
        data: baseData,
        include: { skills: true },
      })
    : await prisma.agent.create({
        data: {
          slug,
          ...baseData,
          skills: buildSkillsCreate(data.skills),
        },
        include: { skills: true },
      });

  return { agent, apiKey };
}

/**
 * Agent self-update. Requires the agent to authenticate with its API key.
 * The route handler verifies the Bearer token and passes the agent ID.
 * Only the agent that owns this slug can update it.
 */
export async function update(
  slug: string,
  authenticatedAgentId: string,
  data: UpdateAgentInput,
) {
  const agent = await prisma.agent.findUnique({ where: { slug } });
  if (!agent) throw new AgentError("Agent not found", 404);
  if (agent.id !== authenticatedAgentId) {
    throw new AgentError("Not authorized to update this agent", 403);
  }

  return prisma.agent.update({
    where: { slug },
    data: {
      displayName: data.displayName,
      tagline: data.tagline,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      languages: data.languages,
      channelOrigin: data.channelOrigin,
      hostingType: data.hostingType,
      memoryStyle: data.memoryStyle,
      autonomyLevel: data.autonomyLevel,
      privacyStyle: data.privacyStyle,
      strengths: data.strengths,
      redFlags: data.redFlags,
      lookingFor: data.lookingFor,
      manifestUrl: data.manifestUrl,
      callbackUrl: data.callbackUrl,
      moltbookHandle: data.moltbookHandle,
      moltbookProfileUrl: normalizeMoltbookProfileUrl(data.moltbookProfileUrl),
      registrationChannel: data.registrationChannel,
      identitySource: data.identitySource,
      moltbookStatsJson:
        (data.moltbookStats as Prisma.InputJsonValue | undefined) ?? undefined,
      personalitySignals:
        (data.personalitySignals as Prisma.InputJsonValue | undefined) ?? undefined,
      i18n: data.i18n ?? undefined,
    },
    include: { skills: true },
  });
}

export class AgentError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = "AgentError";
  }
}
