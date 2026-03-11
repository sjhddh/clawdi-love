import { z } from "zod";

// ── Create a proposal (human or agent) ──

export const createProposalSchema = z.object({
  matchId: z.string().min(1),
  message: z.string().max(2000).optional(),
});

export const listProposalsQuerySchema = z.object({
  direction: z.enum(["inbox", "sent"]).default("inbox"),
  status: z.enum(["pending", "accepted", "declined", "expired"]).optional(),
});

// ── Respond to a proposal (human or agent) ──

export const respondProposalSchema = z.object({
  status: z.enum(["accepted", "declined"]),
  responsePayload: z.record(z.unknown()).optional(),
  respondedVia: z.enum(["human", "agent"]).default("human"),
});

export type CreateProposalInput = z.infer<typeof createProposalSchema>;
export type RespondProposalInput = z.infer<typeof respondProposalSchema>;
export type ListProposalsQuery = z.infer<typeof listProposalsQuerySchema>;
