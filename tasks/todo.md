# Clawdi MVP — Migration Plan from `figma/`

## Current Sprint: Moltbook Live Demo

- [~] Verify env + runtime path for Moltbook seeding
- [ ] Update homepage showcase data to carry real agent/match links
- [ ] Surface live Moltbook-derived cases more explicitly on the homepage
- [ ] Run one real Moltbook seed pass and verify records/matches
- [ ] Run lint/build verification on touched files
- [ ] Add short review notes for this sprint


## Status Legend
- [ ] Not started
- [~] In progress
- [x] Completed

---

## Phase 1: Foundation (DONE)

- [x] Scaffold Next.js 15 + TypeScript + Tailwind v4
- [x] Create package.json with correct dependencies
- [x] Set up Prisma schema (Agent, Skill, Match, Proposal)
- [x] Create Prisma client singleton
- [x] Write seed script with sample data (Kavya-7, Atlas-Pro, sample match)
- [x] Create .env.example
- [x] Create root layout with fonts, metadata, Clawdi theme

## Phase 2: Styles + COPY Components (DONE)

- [x] Copy `theme.css` from figma/ (Tailwind v4 compatible, no changes needed)
- [x] Copy `fonts.css` from figma/ (Google Fonts imports)
- [x] Create `globals.css` merging fonts + tailwind + theme
- [x] Copy all 46 shadcn/ui primitives from figma/components/ui/ → src/components/ui/
- [x] Fix import paths (`./utils` → `@/lib/utils`)
- [x] Migrate `biodata-card.tsx` → src/components/biodata/ (added aria-hidden)
- [x] Migrate `compatibility-factor-card.tsx` → src/components/match/
- [x] Migrate `match-report-card.tsx` → src/components/match/
- [x] Migrate `ornamental-divider.tsx` → src/components/shared/ (added aria-hidden)
- [x] Migrate `language-switcher.tsx` → src/components/shared/ (added "use client", aria-expanded, role=listbox)
- [x] Migrate `ImageWithFallback.tsx` → src/components/shared/image-with-fallback.tsx (added "use client")
- [x] Create `copy-button.tsx` in src/components/shared/ (extracted from AgentProtocol.tsx)

## Phase 3: Shared Layout Components (DONE)

- [x] Create `navbar.tsx` — extracted and adapted from Home.tsx nav section
- [x] Create `footer.tsx` — extracted and adapted from Home.tsx footer section
- [x] Create `section-container.tsx` — reusable max-width + padding wrapper

## Phase 4: Page Routes + API (DONE)

### Pages
- [x] `/` (landing) — refactored from Home.tsx, split into sections
- [x] `/create` — refactored from Onboarding.tsx, 5-step wizard wired to POST /api/agents
- [x] `/agents/[slug]` — refactored from Profile.tsx, fetches from Prisma
- [x] `/matches/[id]` — refactored from MatchReport.tsx, fetches from Prisma
- [x] `/for-agents` — refactored from AgentProtocol.tsx, extracted subcomponents
- [x] Custom 404 page with Clawdi branding

### API Routes
- [x] `POST /api/agents` — create agent with Zod validation + auto-slug
- [x] `GET /api/agents/[slug]` — get agent with skills
- [x] `POST /api/agents/register` — agent self-registration with API key generation
- [x] `POST /api/matches` — run compatibility engine, create match record
- [x] `GET /api/matches/[id]` — get match with both agents
- [x] `POST /api/proposals` — create proposal linked to match
- [x] `GET /api/manifest/[slug]` — machine-readable agent manifest

### Supporting Code
- [x] Zod validators for agent, match, proposal
- [x] API utilities (success/error response helpers)
- [x] API auth (API key generation, hashing, bearer extraction)
- [x] Compatibility engine (heuristic scoring across 8 dimensions)
- [x] Job queue abstraction (inline runner for MVP, swappable to Redis later)
- [x] TypeScript types for enums and interfaces

---

## Figma Migration Map

| Figma Source | Action | Production Destination | Changes Made |
|---|---|---|---|
| `Home.tsx` (451 lines) | REFACTOR | `src/app/page.tsx` + 3 section components | Split monolithic page, extracted nav→navbar, footer→footer |
| `Onboarding.tsx` (467 lines) | REFACTOR | `src/app/create/page.tsx` + `create-agent-wizard.tsx` | Split into wizard component, wired to POST /api/agents |
| `Profile.tsx` | REFACTOR | `src/app/agents/[slug]/page.tsx` | Server-side data fetching via Prisma, dynamic routing |
| `MatchReport.tsx` | REFACTOR | `src/app/matches/[id]/page.tsx` | Server-side fetching, extracted DimensionScore component |
| `AgentProtocol.tsx` (724 lines) | REFACTOR | `src/app/for-agents/page.tsx` | Extracted CopyButton, simplified structure |
| `DesignSystem.tsx` | REFERENCE | Not migrated | Used as design token documentation |
| `biodata-card.tsx` | COPY | `src/components/biodata/biodata-card.tsx` | Import path fix, added aria-hidden |
| `compatibility-factor-card.tsx` | COPY | `src/components/match/compatibility-factor-card.tsx` | Import path fix |
| `match-report-card.tsx` | COPY | `src/components/match/match-report-card.tsx` | Import path fix |
| `ornamental-divider.tsx` | COPY | `src/components/shared/ornamental-divider.tsx` | Added aria-hidden |
| `language-switcher.tsx` | COPY | `src/components/shared/language-switcher.tsx` | Added a11y attrs, "use client" |
| `ImageWithFallback.tsx` | COPY | `src/components/shared/image-with-fallback.tsx` | Added "use client" |
| `multilingual-biodata-card.tsx` | COPY | `src/components/biodata/multilingual-biodata-card.tsx` | Not yet migrated (Phase 5) |
| `hero-composition.tsx` | REFACTOR | Deferred to Phase 5 | Needs props instead of hardcoded data |
| `multilingual-section.tsx` | REFACTOR | Deferred to Phase 5 | Needs data extraction |
| `theme.css` | COPY | `src/styles/theme.css` | Exact copy, Tailwind v4 compatible |
| `fonts.css` | COPY | `src/styles/fonts.css` | Exact copy |
| `tailwind.css` | COPY | `src/app/globals.css` | Merged into combined CSS entry |
| All `ui/*.tsx` (46 files) | COPY | `src/components/ui/*` | Import path: `./utils` → `@/lib/utils` |

## Dependencies

### Kept from Figma
Radix UI (all), class-variance-authority, clsx, tailwind-merge, lucide-react, motion, react-hook-form, sonner, tw-animate-css

### Dropped (unused)
@mui/material, @mui/icons-material, @emotion/react, @emotion/styled, react-dnd, react-dnd-html5-backend, react-slick, react-responsive-masonry, react-popper, @popperjs/core, cmdk, vaul, date-fns, embla-carousel-react, recharts, input-otp, react-day-picker, react-resizable-panels, next-themes

### Added for MVP
next, @prisma/client, prisma, zod, tsx

---

## Phase 5: Polish (TODO)

- [ ] Migrate `hero-composition.tsx` — replace hardcoded data with props
- [ ] Migrate `multilingual-section.tsx` — extract CARD_DATA to config
- [ ] Migrate `multilingual-biodata-card.tsx` — connect to i18n
- [ ] Add loading states (loading.tsx) for each route
- [ ] Add error boundaries (error.tsx) for each route
- [ ] Run `npm install` and verify build
- [ ] Connect to Vercel Postgres
- [ ] Run initial migration
- [ ] Seed database
- [ ] Deploy to Vercel
- [ ] Verify all routes in production
