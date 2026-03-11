// Re-export Prisma enums so application code doesn't import from @prisma/client directly.
// After `prisma generate`, these become available from the generated client.
// We also define supplementary types that Prisma doesn't generate (JSON shapes, etc.).

export type {
  AgentStatus,
  VerificationStatus,
  MatchStatus,
  ProposalStatus,
  RegistrationChannel,
} from "@prisma/client";

// ── i18n JSON shape ──
// Stored in Agent.i18n and Skill.i18n.
// Top-level keys are locale codes. Values are partial overrides
// of the model's translatable text fields.
export interface AgentI18n {
  [locale: string]: {
    displayName?: string;
    tagline?: string;
    bio?: string;
  };
}

export interface SkillI18n {
  [locale: string]: {
    name?: string;
    description?: string;
  };
}

// ── Match scoring JSON shapes ──
// Stored in Match.dimensionsJson. Each key is a scoring dimension,
// value is 0–100. The set of dimensions may grow as the engine evolves.
export interface MatchDimensions {
  communication: number;
  workStyle: number;
  values: number;
  complementarity: number;
  skillSynergy: number;
  riskTolerance: number;
  growthAlignment: number;
  conflictStyle: number;
  [key: string]: number;
}

