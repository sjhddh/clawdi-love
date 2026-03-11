import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import type {
  RespondProposalInput,
} from "./validators/proposal";

// ═══════════════════════════════════════════
// DUAL-PATH: Both human and agent flows
// ═══════════════════════════════════════════

/**
 * Create a proposal linked to a completed match.
 * Human-triggered proposals always follow the match orientation
 * (sourceAgent -> targetAgent). Agent-triggered proposals bind the
 * sender to the authenticated agent and automatically target the
 * other side of the match.
 *
 * Validates:
 *   1. The match exists and is completed.
 *   2. The sender is a valid actor for this match.
 *   3. The recipient is always the other agent in the match.
 *   4. No duplicate pending proposal exists for the same match+sender.
 *
 * When agent callbacks are added post-MVP, proposal creation will
 * also enqueue a webhook delivery job to the recipient's callbackUrl.
 */
export async function create(input: {
  matchId: string;
  message?: string;
  authenticatedAgentId?: string | null;
}) {
  const match = await prisma.match.findUnique({
    where: { id: input.matchId },
  });

  if (!match) {
    throw new ProposalError("Match not found", 404);
  }

  if (match.status !== "completed") {
    throw new ProposalError("Match is not yet completed", 400);
  }

  const senderAgentId = input.authenticatedAgentId ?? match.sourceAgentId;
  const recipientAgentId =
    senderAgentId === match.sourceAgentId
      ? match.targetAgentId
      : senderAgentId === match.targetAgentId
        ? match.sourceAgentId
        : null;

  if (!recipientAgentId) {
    throw new ProposalError("Authenticated agent is not part of this match", 403);
  }

  const duplicate = await prisma.proposal.findFirst({
    where: {
      matchId: input.matchId,
      senderAgentId,
      status: "pending",
    },
  });

  if (duplicate) {
    throw new ProposalError(
      "A pending proposal already exists for this match from this sender",
      409,
    );
  }

  return prisma.proposal.create({
    data: {
      matchId: input.matchId,
      senderAgentId,
      recipientAgentId,
      message: input.message,
      status: "pending",
      sentVia: input.authenticatedAgentId ? "agent" : "human",
    },
  });
}

/**
 * Respond to a proposal (accept or decline).
 * Both humans and agents can respond. The `respondedVia` field
 * records which path was used.
 *
 * For agent-native responses, the route handler validates the
 * Bearer token and confirms the authenticated agent is the recipient.
 */
export async function respond(
  proposalId: string,
  recipientAgentId: string,
  data: RespondProposalInput,
) {
  const proposal = await prisma.proposal.findUnique({
    where: { id: proposalId },
  });

  if (!proposal) {
    throw new ProposalError("Proposal not found", 404);
  }

  if (proposal.recipientAgentId !== recipientAgentId) {
    throw new ProposalError("Not authorized to respond to this proposal", 403);
  }

  if (proposal.status !== "pending") {
    throw new ProposalError(
      `Proposal has already been ${proposal.status}`,
      400,
    );
  }

  return prisma.proposal.update({
    where: { id: proposalId },
    data: {
      status: data.status,
      responsePayload: (data.responsePayload as Prisma.InputJsonValue) ?? undefined,
      respondedVia: data.respondedVia,
      respondedAt: new Date(),
    },
  });
}

// ═══════════════════════════════════════════
// AGENT-NATIVE PATH: Proposal inbox
// ═══════════════════════════════════════════

/**
 * List proposals received by an agent.
 * The route handler verifies the Bearer token first.
 * Supports filtering by status.
 */
export async function listInbox(
  recipientAgentId: string,
  statusFilter?: string,
) {
  return prisma.proposal.findMany({
    where: {
      recipientAgentId,
      ...(statusFilter ? { status: statusFilter as "pending" | "accepted" | "declined" | "expired" } : {}),
    },
    include: {
      match: {
        select: {
          id: true,
          compatibilityScore: true,
          verdict: true,
        },
      },
      senderAgent: {
        select: {
          id: true,
          slug: true,
          displayName: true,
          tagline: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * List proposals sent by an agent.
 */
export async function listSent(senderAgentId: string) {
  return prisma.proposal.findMany({
    where: { senderAgentId },
    include: {
      match: {
        select: {
          id: true,
          compatibilityScore: true,
          verdict: true,
        },
      },
      recipientAgent: {
        select: {
          id: true,
          slug: true,
          displayName: true,
          tagline: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export class ProposalError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = "ProposalError";
  }
}
