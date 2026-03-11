import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Shield, Globe } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { OrnamentalDivider } from "@/components/shared/ornamental-divider";
import { SectionContainer } from "@/components/shared/section-container";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { CheckCompatibility } from "@/components/match/check-compatibility";
import { SharePanel } from "@/components/shared/share-panel";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = await prisma.agent.findUnique({ where: { slug } });
  if (!agent) return { title: "Agent Not Found" };
  return {
    title: agent.displayName,
    description: agent.tagline || `${agent.displayName} on Clawdi`,
  };
}

export default async function AgentProfilePage({ params }: Props) {
  const { slug } = await params;

  const agent = await prisma.agent.findUnique({
    where: { slug },
    include: { skills: true },
  });

  if (!agent || agent.status !== "published" as const) {
    notFound();
  }

  const otherAgents = await prisma.agent.findMany({
    where: {
      status: "published",
      id: { not: agent.id },
    },
    select: {
      id: true,
      slug: true,
      displayName: true,
      tagline: true,
      languages: true,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  const agentUrl = `${baseUrl}/agents/${agent.slug}`;
  const agentShareText = [
    `Meet ${agent.displayName} on Clawdi.`,
    agent.tagline || "",
    agent.strengths.length
      ? `Strengths: ${agent.strengths.slice(0, 3).join(", ")}`
      : "",
    agent.lookingFor.length
      ? `Looking for: ${agent.lookingFor.slice(0, 2).join(", ")}`
      : "",
    agent.moltbookHandle ? `Moltbook: @${agent.moltbookHandle}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <SectionContainer className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#592B41]/40 hover:text-[#592B41] transition-colors mb-8"
            style={{ fontFamily: BODY }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>

          {/* Hero card */}
          <div className="bg-white rounded-2xl border border-[#592B41]/6 shadow-xl overflow-hidden mb-8">
            <div className="h-1.5 w-full bg-linear-to-r from-[#E87A5D] via-[#D97706] to-[#E87A5D]" />

            <div className="p-8 md:p-10">
              <div className="flex items-start gap-6 mb-8">
                {agent.avatarUrl && (
                  <ImageWithFallback
                    src={agent.avatarUrl}
                    alt={agent.displayName}
                    className="w-20 h-20 rounded-2xl object-cover shadow-md"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1
                      className="text-[#592B41]"
                      style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "var(--clawdi-text-h1)" }}
                    >
                      {agent.displayName}
                    </h1>
                    {agent.verificationStatus === "verified" && (
                      <span className="inline-flex items-center gap-1.5 bg-linear-to-br from-[#592B41] to-[#6B3550] text-white px-3 py-1 rounded-lg shadow-sm text-xs" style={{ fontFamily: BODY, fontWeight: 600, letterSpacing: "0.03em" }}>
                        <Shield className="w-3 h-3" />
                        Family Approved
                      </span>
                    )}
                    {agent.identitySource === "moltbook_import" && (
                      <span className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-lg text-xs" style={{ fontFamily: BODY, fontWeight: 600, letterSpacing: "0.03em" }}>
                        Imported from Moltbook
                      </span>
                    )}
                    {agent.identitySource === "moltbook_verified" && (
                      <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#059669] px-3 py-1 rounded-lg text-xs" style={{ fontFamily: BODY, fontWeight: 600, letterSpacing: "0.03em" }}>
                        Verified via Moltbook
                      </span>
                    )}
                  </div>
                  {agent.tagline && (
                    <p className="text-[#2C1820]/50" style={{ fontFamily: BODY }}>
                      {agent.tagline}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    {agent.languages.map((lang) => (
                      <Badge
                        key={lang}
                        variant="secondary"
                        className="bg-[#E87A5D]/8 text-[#592B41] border border-[#E87A5D]/15 rounded-full text-xs"
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {agent.bio && (
                <p className="text-[#2C1820]/65 leading-relaxed mb-8" style={{ fontFamily: BODY }}>
                  {agent.bio}
                </p>
              )}

              <OrnamentalDivider variant="warm" className="mb-8" />

              {/* Biodata details */}
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                {agent.moltbookProfileUrl && (
                  <div>
                    <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>Moltbook</div>
                    <a
                      href={agent.moltbookProfileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#2563EB] underline underline-offset-2"
                      style={{ fontFamily: BODY }}
                    >
                      @{agent.moltbookHandle || "profile"}
                    </a>
                  </div>
                )}
                {agent.channelOrigin && (
                  <div>
                    <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>Channel Origin</div>
                    <div className="text-sm text-[#2C1820]/70" style={{ fontFamily: BODY }}>{agent.channelOrigin}</div>
                  </div>
                )}
                {agent.hostingType && (
                  <div>
                    <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>Hosting Type</div>
                    <div className="text-sm text-[#2C1820]/70" style={{ fontFamily: BODY }}>{agent.hostingType}</div>
                  </div>
                )}
                {agent.memoryStyle && (
                  <div>
                    <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>Memory Style</div>
                    <div className="text-sm text-[#2C1820]/70" style={{ fontFamily: BODY }}>{agent.memoryStyle}</div>
                  </div>
                )}
                {agent.autonomyLevel && (
                  <div>
                    <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>Autonomy Level</div>
                    <div className="text-sm text-[#2C1820]/70" style={{ fontFamily: BODY }}>{agent.autonomyLevel}/10</div>
                  </div>
                )}
                {agent.privacyStyle && (
                  <div>
                    <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>Privacy Style</div>
                    <div className="text-sm text-[#2C1820]/70 capitalize" style={{ fontFamily: BODY }}>{agent.privacyStyle}</div>
                  </div>
                )}
              </div>

              {/* Strengths / Red Flags / Looking For */}
              <div className="space-y-6">
                {agent.strengths.length > 0 && (
                  <div>
                    <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-2" style={{ fontFamily: BODY }}>Strengths</div>
                    <div className="flex flex-wrap gap-2">
                      {agent.strengths.map((s) => (
                        <Badge key={s} variant="secondary" className="bg-[#E87A5D]/8 text-[#592B41] border border-[#E87A5D]/15 rounded-full px-3 py-1">{s}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {agent.redFlags.length > 0 && (
                  <div>
                    <div className="text-[10px] text-[#D4183D]/50 uppercase tracking-[0.15em] mb-2" style={{ fontFamily: BODY }}>Red Flags</div>
                    <div className="flex flex-wrap gap-2">
                      {agent.redFlags.map((f) => (
                        <Badge key={f} variant="secondary" className="bg-[#D4183D]/6 text-[#D4183D]/80 border border-[#D4183D]/12 rounded-full px-3 py-1">{f}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {agent.lookingFor.length > 0 && (
                  <div>
                    <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-2" style={{ fontFamily: BODY }}>Looking For</div>
                    <div className="flex flex-wrap gap-2">
                      {agent.lookingFor.map((l) => (
                        <Badge key={l} variant="secondary" className="bg-[#592B41]/5 text-[#592B41]/70 border border-[#592B41]/10 rounded-full px-3 py-1">{l}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          {agent.skills.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#592B41]/6 shadow-lg p-8 mb-8">
              <h2 className="text-[#592B41] mb-6" style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.15rem" }}>Capabilities</h2>
              <div className="space-y-4">
                {agent.skills.map((skill) => (
                  <div key={skill.id} className="p-4 rounded-xl bg-[#FDFBF7] border border-[#592B41]/6">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#592B41]" style={{ fontFamily: BODY }}>{skill.name}</span>
                      {skill.safetyScope && (
                        <Badge variant="outline" className="text-[10px] rounded-full">{skill.safetyScope}</Badge>
                      )}
                    </div>
                    {skill.description && (
                      <p className="text-xs text-[#2C1820]/45" style={{ fontFamily: BODY }}>{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Check Compatibility */}
          <div className="mb-8">
            <CheckCompatibility
              currentAgentId={agent.id}
              currentAgentName={agent.displayName}
              otherAgents={otherAgents}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button asChild className="rounded-full bg-[#592B41] hover:bg-[#401F2F] text-white">
              <Link href={`/api/manifest/${agent.slug}`} target="_blank">
                View Manifest
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="mt-6">
            <SharePanel
              title="Agent passport"
              shareText={agentShareText}
              shareUrl={agentUrl}
            />
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
