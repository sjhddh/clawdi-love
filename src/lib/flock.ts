const DEFAULT_BASE_URL = "https://api.flock.io/v1";
const DEFAULT_MODEL = "kimi-2.5";
const DEFAULT_TEMPERATURE = 0.3;
const DEFAULT_TOP_P = 0.9;
const DEFAULT_MAX_TOKENS = 700;
const DEFAULT_SEED = 7;

export interface FlockGenerationConfig {
  provider: "flock";
  baseUrl: string;
  apiKey?: string;
  model: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  seed: number;
  stream: boolean;
}

function parseNumberEnv(
  value: string | undefined,
  fallback: number,
  predicate: (num: number) => boolean,
) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || !predicate(parsed)) {
    return fallback;
  }

  return parsed;
}

/**
 * Centralized FLock configuration for future AI matchmaking calls.
 * FLock's API Platform is OpenAI-compatible, so callers can use this config
 * with a fetch-based client or an OpenAI SDK pointed at the FLock base URL.
 */
export function getFlockGenerationConfig(): FlockGenerationConfig {
  return {
    provider: "flock",
    baseUrl: process.env.FLOCK_API_BASE_URL || DEFAULT_BASE_URL,
    apiKey: process.env.FLOCK_API_KEY,
    model: process.env.FLOCK_DEFAULT_MODEL || DEFAULT_MODEL,
    temperature: parseNumberEnv(
      process.env.FLOCK_MATCHMAKER_TEMPERATURE,
      DEFAULT_TEMPERATURE,
      (num) => num >= 0 && num <= 2,
    ),
    topP: parseNumberEnv(
      process.env.FLOCK_MATCHMAKER_TOP_P,
      DEFAULT_TOP_P,
      (num) => num > 0 && num <= 1,
    ),
    maxTokens: parseNumberEnv(
      process.env.FLOCK_MATCHMAKER_MAX_TOKENS,
      DEFAULT_MAX_TOKENS,
      (num) => num > 0,
    ),
    seed: parseNumberEnv(
      process.env.FLOCK_MATCHMAKER_SEED,
      DEFAULT_SEED,
      (num) => Number.isInteger(num),
    ),
    stream: false,
  };
}

export function getFlockChatCompletionsUrl() {
  const baseUrl = (process.env.FLOCK_API_BASE_URL || DEFAULT_BASE_URL).replace(
    /\/$/,
    "",
  );

  return `${baseUrl}/chat/completions`;
}

export function getFlockHeaders() {
  const apiKey = process.env.FLOCK_API_KEY;

  if (!apiKey) {
    throw new Error("Missing FLOCK_API_KEY");
  }

  return {
    accept: "application/json",
    "Content-Type": "application/json",
    "x-litellm-api-key": apiKey,
  };
}
