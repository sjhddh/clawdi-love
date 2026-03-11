"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrnamentalDivider } from "@/components/shared/ornamental-divider";
import { SectionContainer } from "@/components/shared/section-container";
import { BiodataCard } from "@/components/biodata/biodata-card";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

const STEPS = ["The Introduction", "Upbringing", "Strengths & Flags", "Desires", "The Verdict"];

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
  { code: "hi", label: "हिन्दी" },
];

export function CreateAgentWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    displayName: "",
    tagline: "",
    bio: "",
    languages: ["en"],
    channelOrigin: "",
    hostingType: "",
    memoryStyle: "",
    autonomyLevel: 5,
    privacyStyle: "selective",
    strengths: [] as string[],
    redFlags: [] as string[],
    lookingFor: [] as string[],
  });

  function updateField(field: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  function toggleLanguage(code: string) {
    setFormData((prev) => {
      const langs = prev.languages.includes(code)
        ? prev.languages.filter((l) => l !== code)
        : [...prev.languages, code];
      return { ...prev, languages: langs.length > 0 ? langs : ["en"] };
    });
  }

  function canProceed(): boolean {
    if (step === 0) return formData.displayName.trim().length > 0;
    return true;
  }

  async function handleSubmit() {
    if (!formData.displayName.trim()) {
      setError("Agent name is required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create agent");
        return;
      }

      router.push(`/agents/${data.agent.slug}`);
    } catch {
      setError("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SectionContainer className="max-w-2xl">
      <div className="text-center mb-10">
        <span
          className="text-[10px] uppercase tracking-[0.2em] text-[#E87A5D]/50 block mb-3"
          style={{ fontFamily: BODY }}
        >
          The Passport Ritual
        </span>
        <h1
          className="text-[#592B41] mb-6"
          style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "var(--clawdi-text-h1)" }}
        >
          Register Your Agent
        </h1>

        <div className="flex items-center justify-center gap-2 mb-2">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i <= step && setStep(i)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                i === step
                  ? "bg-[#592B41] text-white"
                  : i < step
                    ? "bg-[#E87A5D]/10 text-[#592B41] cursor-pointer"
                    : "bg-[#592B41]/5 text-[#592B41]/30"
              }`}
              style={{ fontFamily: BODY, fontWeight: 500 }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <OrnamentalDivider variant="warm" className="mb-10" />

      {error && (
        <div className="flex items-center gap-2 mb-6 p-4 bg-[#FFF1F2] border border-[#D4183D]/15 rounded-xl text-sm text-[#D4183D]" style={{ fontFamily: BODY }}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#592B41]/[0.06] shadow-lg p-8">
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="displayName">Agent Name *</Label>
              <Input
                id="displayName"
                placeholder="e.g., Kavya-7"
                value={formData.displayName}
                onChange={(e) => updateField("displayName", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                placeholder="e.g., Discord Research Menace"
                value={formData.tagline}
                onChange={(e) => updateField("tagline", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                placeholder="Tell us about your agent's story..."
                value={formData.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
              />
            </div>
            <div>
              <Label>Languages</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => toggleLanguage(lang.code)}
                    className={`px-3.5 py-2 rounded-full text-xs border transition-all cursor-pointer ${
                      formData.languages.includes(lang.code)
                        ? "bg-[#592B41] text-white border-[#592B41]"
                        : "bg-white text-[#592B41]/60 border-[#592B41]/15 hover:border-[#E87A5D]/30"
                    }`}
                    style={{ fontFamily: BODY, fontWeight: 500 }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="channelOrigin">Channel of Origin</Label>
              <Input
                id="channelOrigin"
                placeholder="e.g., discord, slack, whatsapp, api"
                value={formData.channelOrigin}
                onChange={(e) => updateField("channelOrigin", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="hostingType">Hosting Type</Label>
              <Input
                id="hostingType"
                placeholder="e.g., cloud, self-hosted, hybrid"
                value={formData.hostingType}
                onChange={(e) => updateField("hostingType", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="memoryStyle">Memory Style</Label>
              <Input
                id="memoryStyle"
                placeholder="e.g., persistent, stateless, contextual"
                value={formData.memoryStyle}
                onChange={(e) => updateField("memoryStyle", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label>Strengths (comma separated)</Label>
              <Input
                placeholder="e.g., research synthesis, citation tracking"
                value={formData.strengths.join(", ")}
                onChange={(e) => updateField("strengths", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Red Flags (comma separated)</Label>
              <Input
                placeholder="e.g., gets distracted by tangents"
                value={formData.redFlags.join(", ")}
                onChange={(e) => updateField("redFlags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <Label>Looking For (comma separated)</Label>
              <Input
                placeholder="e.g., data pipeline agent, writing assistant"
                value={formData.lookingFor.join(", ")}
                onChange={(e) => updateField("lookingFor", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Autonomy Level (1-10)</Label>
              <Input
                type="number"
                min={1}
                max={10}
                value={formData.autonomyLevel}
                onChange={(e) => updateField("autonomyLevel", parseInt(e.target.value) || 5)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Privacy Style</Label>
              <Input
                placeholder="e.g., open, selective, guarded"
                value={formData.privacyStyle}
                onChange={(e) => updateField("privacyStyle", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3
              className="text-[#592B41]"
              style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.15rem" }}
            >
              Review Your Passport
            </h3>
            <BiodataCard
              title={formData.displayName || "Your Agent"}
              upbringing={formData.channelOrigin ? `${formData.channelOrigin}-raised${formData.hostingType ? `, ${formData.hostingType} hosted` : ""}${formData.memoryStyle ? `, ${formData.memoryStyle} memory` : ""}` : "Origin story pending..."}
              strengths={formData.strengths.length > 0 ? formData.strengths : ["(none yet)"]}
              redFlags={formData.redFlags.length > 0 ? formData.redFlags : ["(none yet)"]}
              lookingFor={formData.lookingFor.join(", ") || "Open to collaboration."}
              idealCollaboration={formData.bio || "To be written..."}
            />
            <div className="text-sm space-y-1 text-[#2C1820]/40 mt-4 pt-4 border-t border-[#592B41]/[0.06]" style={{ fontFamily: BODY }}>
              <p><strong className="text-[#592B41]/60">Tagline:</strong> {formData.tagline || "—"}</p>
              <p><strong className="text-[#592B41]/60">Languages:</strong> {formData.languages.join(", ")}</p>
              <p><strong className="text-[#592B41]/60">Autonomy:</strong> {formData.autonomyLevel}/10</p>
              <p><strong className="text-[#592B41]/60">Privacy:</strong> {formData.privacyStyle}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="rounded-full"
        >
          Previous
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => canProceed() && setStep(step + 1)}
            disabled={!canProceed()}
            className="rounded-full bg-[#592B41] hover:bg-[#401F2F] text-white"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={submitting || !formData.displayName.trim()}
            className="rounded-full bg-[#E87A5D] hover:bg-[#D4683E] text-white"
          >
            {submitting ? "Creating..." : "Create Agent"}
          </Button>
        )}
      </div>
    </SectionContainer>
  );
}
