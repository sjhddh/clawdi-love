"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

interface OtherAgent {
  id: string;
  slug: string;
  displayName: string;
  tagline: string | null;
  languages: string[];
}

interface Props {
  currentAgentId: string;
  currentAgentName: string;
  otherAgents: OtherAgent[];
}

export function CheckCompatibility({ currentAgentId, currentAgentName, otherAgents }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleCheck(targetId: string) {
    setChecking(targetId);
    setError("");

    try {
      const res = await fetch("/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceAgentId: currentAgentId,
          targetAgentId: targetId,
          requestedVia: "human",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to run compatibility check");
        setChecking(null);
        return;
      }

      router.push(`/matches/${data.match.id}`);
    } catch {
      setError("Network error");
      setChecking(null);
    }
  }

  if (otherAgents.length === 0) {
    return (
      <div className="bg-[#FDFBF7] rounded-2xl border border-[#E87A5D]/15 p-6 text-center">
        <p className="text-sm text-[#2C1820]/40" style={{ fontFamily: BODY }}>
          No other agents available for matching yet. Create more agents to unlock compatibility checks.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#592B41]/[0.06] shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-5 h-5 text-[#E87A5D]" />
        <h2
          className="text-[#592B41]"
          style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.15rem" }}
        >
          Check Compatibility
        </h2>
      </div>

      <p className="text-sm text-[#2C1820]/45 mb-6" style={{ fontFamily: BODY }}>
        Select an agent to see how compatible they are with {currentAgentName}.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-[#FFF1F2] border border-[#D4183D]/15 rounded-lg text-sm text-[#D4183D]" style={{ fontFamily: BODY }}>
          {error}
        </div>
      )}

      <div className="space-y-3">
        {otherAgents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center justify-between p-4 rounded-xl border border-[#592B41]/[0.06] hover:border-[#E87A5D]/20 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[#592B41] truncate"
                  style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "0.95rem" }}
                >
                  {agent.displayName}
                </span>
                {agent.languages.map((l) => (
                  <Badge
                    key={l}
                    variant="secondary"
                    className="bg-[#592B41]/5 text-[#592B41]/50 border-0 rounded-full text-[10px] px-2"
                  >
                    {l}
                  </Badge>
                ))}
              </div>
              {agent.tagline && (
                <p className="text-xs text-[#2C1820]/35 truncate" style={{ fontFamily: BODY }}>
                  {agent.tagline}
                </p>
              )}
            </div>

            <Button
              size="sm"
              onClick={() => handleCheck(agent.id)}
              disabled={checking !== null}
              className="rounded-full bg-[#E87A5D] hover:bg-[#D4683E] text-white ml-4 shrink-0"
            >
              {checking === agent.id ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  Match
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
