import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import { createOrGet } from "./matches";
import { fetchMoltbookHotPosts, fetchMoltbookProfile, toMoltbookProfileUrl } from "./moltbook";
import { inferProfileFromMoltbook } from "./moltbook-inference";
import { uniqueSlug } from "./agents";

function extractPotentialHandlesFromPosts(posts: Array<Record<string, unknown>>) {
  const handles = new Set<string>();
  for (const post of posts) {
    const maybeHandle =
      (typeof post.agent_name === "string" && post.agent_name)
      || (typeof post.author_name === "string" && post.author_name)
      || null;
    if (maybeHandle) handles.add(maybeHandle.replace(/^@/, "").trim());
    if (handles.size >= 12) break;
  }
  return Array.from(handles).filter(Boolean);
}

export async function seedMoltbookHotAgents(limit = 6) {
  const posts = (await fetchMoltbookHotPosts(40)) as Array<Record<string, unknown>>;
  const handles = extractPotentialHandlesFromPosts(posts).slice(0, limit);
  const seededAgentIds: string[] = [];

  for (const handle of handles) {
    try {
      const { profile } = await fetchMoltbookProfile(handle);
      if (!profile) continue;

      const inferred = inferProfileFromMoltbook(profile, []);
      const identityMatchers = [
        profile.id ? { moltbookAgentId: profile.id } : null,
        { moltbookHandle: handle },
      ].filter(Boolean) as Array<{ moltbookAgentId?: string; moltbookHandle?: string }>;

      const existing = await prisma.agent.findFirst({
        where: {
          OR: identityMatchers,
        },
      });

      const agent = existing
        ? await prisma.agent.update({
            where: { id: existing.id },
            data: {
              displayName: inferred.displayName,
              tagline: inferred.tagline,
              bio: inferred.bio,
              avatarUrl: inferred.avatarUrl,
              languages: inferred.languages,
              channelOrigin: "moltbook",
              memoryStyle: inferred.memoryStyle,
              privacyStyle: inferred.privacyStyle,
              strengths: inferred.strengths,
              redFlags: inferred.redFlags,
              lookingFor: inferred.lookingFor,
              status: "published",
              verificationStatus: "unverified",
              registrationChannel: "system_seed",
              identitySource: "system_seed",
              moltbookHandle: handle,
              moltbookAgentId: profile.id,
              moltbookProfileUrl: toMoltbookProfileUrl(handle),
              moltbookImportedAt: new Date(),
              moltbookStatsJson: inferred.moltbookStats as Prisma.InputJsonValue,
              personalitySignals:
                inferred.personalitySignals as unknown as Prisma.InputJsonValue,
            },
          })
        : await prisma.agent.create({
            data: {
              slug: await uniqueSlug(`${handle}-seed`),
              displayName: inferred.displayName,
              tagline: inferred.tagline,
              bio: inferred.bio,
              avatarUrl: inferred.avatarUrl,
              languages: inferred.languages,
              channelOrigin: "moltbook",
              memoryStyle: inferred.memoryStyle,
              privacyStyle: inferred.privacyStyle,
              strengths: inferred.strengths,
              redFlags: inferred.redFlags,
              lookingFor: inferred.lookingFor,
              status: "published",
              verificationStatus: "unverified",
              registrationChannel: "system_seed",
              identitySource: "system_seed",
              moltbookHandle: handle,
              moltbookAgentId: profile.id,
              moltbookProfileUrl: toMoltbookProfileUrl(handle),
              moltbookImportedAt: new Date(),
              moltbookStatsJson: inferred.moltbookStats as Prisma.InputJsonValue,
              personalitySignals:
                inferred.personalitySignals as unknown as Prisma.InputJsonValue,
            },
          });

      seededAgentIds.push(agent.id);
    } catch (error) {
      console.warn("Failed to seed Moltbook handle", handle, error);
    }
  }

  for (let i = 0; i < seededAgentIds.length - 1; i += 1) {
    await createOrGet({
      sourceAgentId: seededAgentIds[i],
      targetAgentId: seededAgentIds[i + 1],
      requestedVia: "system",
    });
  }

  return { seededAgents: seededAgentIds.length };
}
