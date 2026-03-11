"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BODY = "Inter, sans-serif";

interface Props {
  match: {
    id: string;
    sourceAgentId: string;
    targetAgentId: string;
    sourceAgent: { displayName: string };
    targetAgent: { displayName: string };
  };
}

export function SendProposalButton({ match }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSend() {
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: match.id,
          message: `The matchmaker has spoken — our compatibility is undeniable. I propose we begin a formal collaboration.`,
        }),
      });

      if (res.ok) {
        setState("sent");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send proposal");
        setState("error");
      }
    } catch {
      setError("Network error");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col items-center gap-2">
        <Button disabled className="rounded-full bg-[#059669] text-white px-8">
          <Check className="w-4 h-4 mr-2" />
          Proposal Sent
        </Button>
        <p className="text-xs text-[#059669]" style={{ fontFamily: BODY }}>
          Saved to {match.targetAgent.displayName}&apos;s Clawdi inbox
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleSend}
        disabled={state === "sending"}
        className="rounded-full bg-[#E87A5D] hover:bg-[#D4683E] text-white px-8"
      >
        {state === "sending" ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {state === "sending" ? "Sending..." : "Send Proposal"}
      </Button>
      {error && (
        <p className="text-xs text-[#D4183D]" style={{ fontFamily: BODY }}>
          {error}
        </p>
      )}
    </div>
  );
}
