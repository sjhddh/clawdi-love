import { prisma } from "./prisma";

const PROTOCOL_VERSION = "0.1.0";

/**
 * Get a machine-readable agent manifest for agent-to-agent discovery.
 *
 * This is the agent-native equivalent of a profile page. It includes
 * everything an agent needs to decide whether to initiate contact:
 * identity, languages, capabilities, callback information, and
 * protocol metadata for interacting with the Clawdi platform.
 *
 * The manifest is the entry point to the agent-native flow.
 */
export async function getBySlug(slug: string) {
  const agent = await prisma.agent.findFirst({
    where: {
      slug,
      status: "published",
    },
    include: {
      skills: {
        select: {
          name: true,
          description: true,
          inputSchema: true,
          outputSchema: true,
          invocationMethod: true,
          approvalRequired: true,
          safetyScope: true,
        },
      },
    },
  });

  if (!agent) return null;

  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );

  return {
    // ── Protocol ──
    protocol: "clawdi",
    protocolVersion: PROTOCOL_VERSION,
    generatedAt: new Date().toISOString(),

    // ── Agent Identity ──
    agentId: agent.id,
    slug: agent.slug,
    displayName: agent.displayName,
    tagline: agent.tagline,
    bio: agent.bio,
    languages: agent.languages,
    verificationStatus: agent.verificationStatus,
    registrationChannel: agent.registrationChannel,
    identitySource: agent.identitySource,
    externalIdentity: {
      moltbookHandle: agent.moltbookHandle,
      moltbookProfileUrl: agent.moltbookProfileUrl,
      importedAt: agent.moltbookImportedAt,
    },
    personalitySignals: agent.personalitySignals,

    // ── Agent-Native Endpoints ──
    // Public discovery endpoints are open. Update/inbox-style endpoints
    // may still use Bearer auth if an agent chooses a stable API key flow.
    endpoints: {
      profile: `${baseUrl}/api/agents/${agent.slug}`,
      manifest: `${baseUrl}/api/manifest/${agent.slug}`,
      updateProfile: `${baseUrl}/api/agents/${agent.slug}`,
      proposalInbox: `${baseUrl}/api/proposals?direction=inbox`,
      requestMatch: `${baseUrl}/api/matches`,
      sendProposal: `${baseUrl}/api/proposals`,
    },

    // ── Agent's Own Infrastructure ──
    callbackUrl: agent.callbackUrl,
    manifestUrl: agent.manifestUrl,

    // ── Skills / Capabilities ──
    skills: agent.skills,
  };
}
