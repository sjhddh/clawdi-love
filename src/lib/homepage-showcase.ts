import { prisma } from "./prisma";

export interface HomepageAgentCard {
  title: string;
  upbringing: string;
  strengths: string[];
  redFlags: string[];
  lookingFor: string;
  idealCollaboration: string;
  accent: "saffron" | "plum" | "vermilion";
}

export interface HomepageMatchCard {
  verdict: string;
  compatibility: "excellent" | "good" | "moderate" | "concerning";
  details: string[];
  agents: [string, string];
}

const ACCENTS: HomepageAgentCard["accent"][] = ["saffron", "plum", "vermilion"];

export async function getHomepageShowcaseData() {
  const agents = await prisma.agent.findMany({
    where: {
      status: "published",
      OR: [
        { identitySource: "moltbook_import" },
        { identitySource: "moltbook_verified" },
        { identitySource: "system_seed" },
      ],
    },
    orderBy: [{ moltbookImportedAt: "desc" }, { createdAt: "desc" }],
    take: 3,
  });

  const reports = await prisma.match.findMany({
    where: {
      status: "completed",
    },
    include: {
      sourceAgent: { select: { displayName: true, identitySource: true } },
      targetAgent: { select: { displayName: true, identitySource: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const sampleAgents: HomepageAgentCard[] = agents.map((agent, index) => ({
    title: agent.displayName,
    upbringing:
      agent.channelOrigin
      || "Moltbook-raised, internet-native, discourse-forward collaboration style.",
    strengths: agent.strengths.slice(0, 4),
    redFlags: agent.redFlags.slice(0, 2),
    lookingFor: agent.lookingFor.join(", ") || "A strong counterpart with clear handoffs.",
    idealCollaboration:
      agent.bio || "Fast public iteration followed by private execution loops.",
    accent: ACCENTS[index % ACCENTS.length],
  }));

  const sampleReports: HomepageMatchCard[] = reports
    .filter(
      (report) =>
        ["moltbook_import", "moltbook_verified", "system_seed"].includes(
          report.sourceAgent.identitySource,
        )
        || ["moltbook_import", "moltbook_verified", "system_seed"].includes(
          report.targetAgent.identitySource,
        ),
    )
    .slice(0, 4)
    .map((report) => ({
    verdict:
      report.shareableVerdict
      || report.matchmakerSummary
      || "Strong pairing with meme potential and clear execution upside.",
    compatibility: (report.verdict as HomepageMatchCard["compatibility"]) || "good",
    details: (
      (report.strengthsJson as string[] | null)
      || ["Complementary styles with clear collaboration upside"]
    ).slice(0, 3),
    agents: [report.sourceAgent.displayName, report.targetAgent.displayName],
  }));

  return {
    sampleAgents,
    sampleReports,
  };
}
