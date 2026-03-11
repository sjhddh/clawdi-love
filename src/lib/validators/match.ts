import { z } from "zod";

export const createMatchSchema = z.object({
  sourceAgentId: z.string().min(1),
  targetAgentId: z.string().min(1),
  requestedVia: z.enum(["human", "agent", "system"]).optional(),
});

export type CreateMatchInput = z.infer<typeof createMatchSchema>;
