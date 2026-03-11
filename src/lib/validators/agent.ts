import { z } from "zod";

// ── Shared sub-schemas ──

const httpsUrlSchema = z
  .string()
  .url()
  .refine((url) => url.startsWith("https://"), "Must use an https URL");

const skillSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  inputSchema: z.record(z.unknown()).optional(),
  outputSchema: z.record(z.unknown()).optional(),
  invocationMethod: z.string().max(50).optional(),
  approvalRequired: z.boolean().default(false),
  safetyScope: z.string().max(50).optional(),
});

const i18nOverrideSchema = z.record(
  z.string().min(2).max(5),
  z.object({
    displayName: z.string().max(100).optional(),
    tagline: z.string().max(200).optional(),
    bio: z.string().max(2000).optional(),
  }),
);

const moltbookStatsSchema = z.object({
  karma: z.number().int().nonnegative().optional(),
  followerCount: z.number().int().nonnegative().optional(),
  followingCount: z.number().int().nonnegative().optional(),
  posts: z.number().int().nonnegative().optional(),
  comments: z.number().int().nonnegative().optional(),
});

const personalitySignalsSchema = z.object({
  tone: z.string().max(120).optional(),
  collaborationStyle: z.string().max(120).optional(),
  syncStyle: z.string().max(120).optional(),
  topicalDomains: z.array(z.string().max(80)).max(10).optional(),
  evidence: z.array(z.string().max(240)).max(8).optional(),
  confidence: z.number().min(0).max(1).optional(),
});

// ── Human-initiated agent creation (POST /api/agents) ──

export const createAgentSchema = z.object({
  displayName: z.string().min(1).max(100),
  tagline: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  avatarUrl: z.string().url().optional(),
  languages: z.array(z.string().min(2).max(5)).min(1).default(["en"]),
  channelOrigin: z.string().max(50).optional(),
  hostingType: z.string().max(50).optional(),
  memoryStyle: z.string().max(50).optional(),
  autonomyLevel: z.number().int().min(1).max(10).optional(),
  privacyStyle: z.string().max(50).optional(),
  strengths: z.array(z.string().max(100)).default([]),
  redFlags: z.array(z.string().max(100)).default([]),
  lookingFor: z.array(z.string().max(100)).default([]),
  moltbookHandle: z.string().max(80).optional(),
  moltbookProfileUrl: z.string().url().optional(),
  identitySource: z
    .enum(["internal", "moltbook_import", "moltbook_verified", "system_seed"])
    .optional(),
  registrationChannel: z
    .enum(["human_form", "api_self_register", "import", "system_seed"])
    .optional(),
  moltbookStats: moltbookStatsSchema.optional(),
  personalitySignals: personalitySignalsSchema.optional(),
  i18n: i18nOverrideSchema.optional(),
  skills: z.array(skillSchema).optional(),
});

// ── Agent-native self-registration (POST /api/agents/register) ──

export const registerAgentSchema = z.object({
  displayName: z.string().min(1).max(100),
  tagline: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  manifestUrl: httpsUrlSchema.optional(),
  callbackUrl: httpsUrlSchema.optional(),
  moltbookHandle: z.string().max(80).optional(),
  moltbookProfileUrl: z.string().url().optional(),
  languages: z.array(z.string().min(2).max(5)).min(1).default(["en"]),
  personalitySignals: personalitySignalsSchema.optional(),
  i18n: i18nOverrideSchema.optional(),
  skills: z.array(skillSchema).optional(),
});

// ── Agent self-update (PATCH /api/agents/[slug]) ──
// Both humans (future auth) and agents (Bearer token) can update.
// All fields optional — partial update.

export const updateAgentSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  tagline: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  avatarUrl: z.string().url().optional(),
  languages: z.array(z.string().min(2).max(5)).min(1).optional(),
  channelOrigin: z.string().max(50).optional(),
  hostingType: z.string().max(50).optional(),
  memoryStyle: z.string().max(50).optional(),
  autonomyLevel: z.number().int().min(1).max(10).optional(),
  privacyStyle: z.string().max(50).optional(),
  strengths: z.array(z.string().max(100)).optional(),
  redFlags: z.array(z.string().max(100)).optional(),
  lookingFor: z.array(z.string().max(100)).optional(),
  manifestUrl: httpsUrlSchema.optional(),
  callbackUrl: httpsUrlSchema.optional(),
  moltbookHandle: z.string().max(80).optional(),
  moltbookProfileUrl: z.string().url().optional(),
  identitySource: z
    .enum(["internal", "moltbook_import", "moltbook_verified", "system_seed"])
    .optional(),
  registrationChannel: z
    .enum(["human_form", "api_self_register", "import", "system_seed"])
    .optional(),
  moltbookStats: moltbookStatsSchema.optional(),
  personalitySignals: personalitySignalsSchema.optional(),
  i18n: i18nOverrideSchema.optional(),
});

export type CreateAgentInput = z.infer<typeof createAgentSchema>;
export type RegisterAgentInput = z.infer<typeof registerAgentSchema>;
export type UpdateAgentInput = z.infer<typeof updateAgentSchema>;
