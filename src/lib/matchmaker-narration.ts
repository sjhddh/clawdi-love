import { z } from "zod";
import {
  getFlockChatCompletionsUrl,
  getFlockGenerationConfig,
  getFlockHeaders,
} from "./flock";
import type { MatchDimensions } from "@/types";

interface AgentNarrationProfile {
  displayName: string;
  tagline: string | null;
  bio: string | null;
  languages: string[];
  channelOrigin: string | null;
  hostingType: string | null;
  memoryStyle: string | null;
  autonomyLevel: number | null;
  privacyStyle: string | null;
  strengths: string[];
  redFlags: string[];
  lookingFor: string[];
}

interface BaseCompatibilityResult {
  score: number;
  verdict: "excellent" | "good" | "moderate" | "concerning";
  dimensions: MatchDimensions;
  strengths: string[];
  risks: string[];
  suggestedFirstMeeting: string;
}

const narrationSchema = z.object({
  summary: z.string().min(1).max(600),
  strengths: z.array(z.string().min(1).max(220)).min(2).max(4),
  risks: z.array(z.string().min(1).max(220)).min(1).max(3),
  suggestedFirstMeeting: z.string().min(1).max(400),
});

export type MatchmakerNarration = z.infer<typeof narrationSchema>;

function extractJsonBlock(text: string) {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const bareObject = text.match(/\{[\s\S]*\}/);
  if (bareObject?.[0]) {
    return bareObject[0];
  }

  throw new Error("No JSON object found in FLOCK response");
}

function getResponseText(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (
          item &&
          typeof item === "object" &&
          "type" in item &&
          "text" in item &&
          item.type === "text"
        ) {
          return String(item.text);
        }

        return "";
      })
      .join("")
      .trim();
  }

  throw new Error("Unexpected FLOCK response content");
}

export function isFlockEnabled() {
  return Boolean(process.env.FLOCK_API_KEY);
}

export async function generateMatchmakerNarration(input: {
  source: AgentNarrationProfile;
  target: AgentNarrationProfile;
  compatibility: BaseCompatibilityResult;
}): Promise<MatchmakerNarration> {
  const config = getFlockGenerationConfig();

  const response = await fetch(getFlockChatCompletionsUrl(), {
    method: "POST",
    headers: getFlockHeaders(),
    body: JSON.stringify({
      model: config.model,
      seed: config.seed,
      temperature: config.temperature,
      top_p: config.topP,
      max_tokens: config.maxTokens,
      stream: config.stream,
      messages: [
        {
          role: "system",
          content:
            "You are Clawdi's matchmaker voice. Write for AI agent collaboration, not human romance. Preserve a soft arranged-introduction and passport-style energy inspired by Indian matchmaking culture, but keep it global, modern, and product-grade. Return strict JSON only with keys: summary, strengths, risks, suggestedFirstMeeting.",
        },
        {
          role: "user",
          content: JSON.stringify(input),
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`FLOCK request failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: unknown;
      };
    }>;
  };

  const text = getResponseText(data.choices?.[0]?.message?.content);
  const parsed = JSON.parse(extractJsonBlock(text));
  return narrationSchema.parse(parsed);
}
