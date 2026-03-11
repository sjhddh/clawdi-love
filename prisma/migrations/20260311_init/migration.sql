-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "agent_status" AS ENUM ('draft', 'published', 'archived');

-- CreateEnum
CREATE TYPE "verification_status" AS ENUM ('unverified', 'pending', 'verified');

-- CreateEnum
CREATE TYPE "match_status" AS ENUM ('pending', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "proposal_status" AS ENUM ('pending', 'accepted', 'declined', 'expired');

-- CreateEnum
CREATE TYPE "registration_channel" AS ENUM ('human_form', 'api_self_register', 'import', 'system_seed');

-- CreateTable
CREATE TABLE "agents" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "tagline" TEXT,
    "bio" TEXT,
    "avatar_url" TEXT,
    "i18n" JSONB,
    "languages" TEXT[],
    "channel_origin" TEXT,
    "hosting_type" TEXT,
    "memory_style" TEXT,
    "autonomy_level" SMALLINT,
    "privacy_style" TEXT,
    "strengths" TEXT[],
    "red_flags" TEXT[],
    "looking_for" TEXT[],
    "status" "agent_status" NOT NULL DEFAULT 'draft',
    "verification_status" "verification_status" NOT NULL DEFAULT 'unverified',
    "manifest_url" TEXT,
    "callback_url" TEXT,
    "api_key_hash" TEXT,
    "owner_user_id" TEXT,
    "registration_channel" "registration_channel" NOT NULL DEFAULT 'human_form',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "i18n" JSONB,
    "input_schema" JSONB,
    "output_schema" JSONB,
    "invocation_method" TEXT,
    "approval_required" BOOLEAN NOT NULL DEFAULT false,
    "safety_scope" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "source_agent_id" TEXT NOT NULL,
    "target_agent_id" TEXT NOT NULL,
    "status" "match_status" NOT NULL DEFAULT 'pending',
    "compatibility_score" SMALLINT,
    "verdict" TEXT,
    "dimensions_json" JSONB,
    "strengths_json" JSONB,
    "risks_json" JSONB,
    "suggested_first_meeting" TEXT,
    "requested_via" TEXT NOT NULL DEFAULT 'human',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposals" (
    "id" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "sender_agent_id" TEXT NOT NULL,
    "recipient_agent_id" TEXT NOT NULL,
    "message" TEXT,
    "status" "proposal_status" NOT NULL DEFAULT 'pending',
    "response_payload" JSONB,
    "sent_via" TEXT NOT NULL DEFAULT 'human',
    "responded_via" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responded_at" TIMESTAMP(3),

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agents_slug_key" ON "agents"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "agents_api_key_hash_key" ON "agents"("api_key_hash");

-- CreateIndex
CREATE INDEX "agents_status_idx" ON "agents"("status");

-- CreateIndex
CREATE INDEX "idx_agents_verification" ON "agents"("verification_status");

-- CreateIndex
CREATE INDEX "idx_agents_owner" ON "agents"("owner_user_id");

-- CreateIndex
CREATE INDEX "idx_agents_created" ON "agents"("created_at");

-- CreateIndex
CREATE INDEX "idx_skills_agent" ON "skills"("agent_id");

-- CreateIndex
CREATE INDEX "idx_matches_status" ON "matches"("status");

-- CreateIndex
CREATE INDEX "idx_matches_source" ON "matches"("source_agent_id");

-- CreateIndex
CREATE INDEX "idx_matches_target" ON "matches"("target_agent_id");

-- CreateIndex
CREATE INDEX "idx_matches_created" ON "matches"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_match_pair" ON "matches"("source_agent_id", "target_agent_id");

-- CreateIndex
CREATE INDEX "idx_proposals_match" ON "proposals"("match_id");

-- CreateIndex
CREATE INDEX "idx_proposals_sender" ON "proposals"("sender_agent_id");

-- CreateIndex
CREATE INDEX "idx_proposals_recipient" ON "proposals"("recipient_agent_id");

-- CreateIndex
CREATE INDEX "idx_proposals_status" ON "proposals"("status");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_source_agent_id_fkey" FOREIGN KEY ("source_agent_id") REFERENCES "agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_target_agent_id_fkey" FOREIGN KEY ("target_agent_id") REFERENCES "agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_sender_agent_id_fkey" FOREIGN KEY ("sender_agent_id") REFERENCES "agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_recipient_agent_id_fkey" FOREIGN KEY ("recipient_agent_id") REFERENCES "agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

