import React, { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { OrnamentalDivider } from "../components/ornamental-divider";
import { Link } from "react-router";
import {
  Heart,
  ArrowRight,
  Sparkles,
  Shield,
  Globe2,
  Brain,
  Lock,
  Wrench,
  Clock,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Terminal,
  Copy,
  Check,
  ChevronDown,
  BookOpen,
  Fingerprint,
  Eye,
} from "lucide-react";

/* ═══════════════════════════════════════════
   CLAWDI DESIGN SYSTEM — Interactive Showcase
   
   A living reference for every visual pattern used
   across the Clawdi platform:
   
   - Marketing landing page
   - Onboarding flow
   - Biodata profile pages
   - Match report pages
   - Agent-native manifest / protocol pages
   
   Brand: Premium · Ceremonial · Warm · Internet-native
═══════════════════════════════════════════ */

/* ─── Constants ─── */
const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "'Inter', system-ui, sans-serif";
const MONO = "'SF Mono', 'Fira Code', monospace";

export default function DesignSystem() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("colors");

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const sections = [
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "spacing", label: "Spacing & Radius" },
    { id: "cards", label: "Cards" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges & Chips" },
    { id: "biodata", label: "Biodata Fields" },
    { id: "meters", label: "Meters" },
    { id: "multilingual", label: "Multilingual" },
    { id: "protocol", label: "Protocol" },
    { id: "ornamental", label: "Ornamental" },
  ];

  return (
    <div className="min-h-screen bg-[var(--clawdi-ivory)] text-[var(--clawdi-ink)] selection:bg-[var(--clawdi-saffron)]/20">
      {/* ════ Header Bar ════ */}
      <div
        className="w-full h-1.5"
        style={{ background: "var(--clawdi-gradient-header)" }}
      />

      <header className="sticky top-0 z-50 bg-[var(--clawdi-ivory)]/90 backdrop-blur-xl border-b border-[var(--clawdi-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{ background: "var(--clawdi-gradient-saffron)" }}
            >
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.15rem", color: "var(--clawdi-plum)" }}>
              Clawdi<span style={{ color: "var(--clawdi-saffron)" }}>.</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge
              className="text-[9px] tracking-[0.2em] uppercase px-3 py-1"
              style={{
                background: "rgba(232,122,93,0.08)",
                color: "var(--clawdi-saffron)",
                borderColor: "var(--clawdi-border-saffron)",
                fontFamily: BODY,
              }}
            >
              <BookOpen className="w-3 h-3 mr-1.5" />
              Design System v1.0
            </Badge>
          </div>
        </div>
      </header>

      {/* ════ Hero ════ */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--clawdi-saffron)]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--clawdi-plum)]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <OrnamentalDivider variant="warm" className="mb-6" />
          <h1
            style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "var(--clawdi-text-hero)", color: "var(--clawdi-plum)", lineHeight: 1.1 }}
          >
            The Clawdi
            <br />
            <span style={{ color: "var(--clawdi-saffron)" }}>Design System</span>
          </h1>
          <p
            className="mt-6 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: BODY, color: "rgba(44,24,32,0.55)", fontSize: "1.125rem" }}
          >
            A unified visual language for premium matchmaking — from marketing pages to protocol manifests.
            Every token, component, and pattern in one ceremonial reference.
          </p>
          <p
            className="mt-3 italic"
            style={{ fontFamily: DISPLAY, color: "rgba(89,43,65,0.35)", fontSize: "0.95rem" }}
          >
            Premium · Ceremonial · Warm · Internet-Native · Globally Inclusive
          </p>
        </div>
      </section>

      {/* ════ Sticky nav ════ */}
      <nav className="sticky top-[65px] z-40 bg-[var(--clawdi-ivory)]/90 backdrop-blur-xl border-y border-[var(--clawdi-border-subtle)] overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 py-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setActiveNav(s.id)}
              className="px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-all shrink-0"
              style={{
                fontFamily: BODY,
                fontWeight: activeNav === s.id ? 500 : 400,
                background: activeNav === s.id ? "rgba(89,43,65,0.06)" : "transparent",
                color: activeNav === s.id ? "var(--clawdi-plum)" : "rgba(44,24,32,0.4)",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-32">

        {/* ══════════════════════════════════════
            1. COLOR PALETTE
        ══════════════════════════════════════ */}
        <SectionHeading id="colors" number="01" title="Color Palette" subtitle="Warm ivory, saffron, and plum — inspired by Indian ceremonial aesthetics, refined for a modern AI startup." />

        {/* Brand Colors */}
        <SubHeading>Brand Core</SubHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <ColorSwatch name="Ivory" token="--clawdi-ivory" hex="#FDFBF7" color="#FDFBF7" dark={false} onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Cream" token="--clawdi-cream" hex="#FDF8F0" color="#FDF8F0" dark={false} onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Parchment" token="--clawdi-parchment" hex="#F5F2EA" color="#F5F2EA" dark={false} onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Saffron" token="--clawdi-saffron" hex="#E87A5D" color="#E87A5D" dark onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Plum" token="--clawdi-plum" hex="#592B41" color="#592B41" dark onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Ink" token="--clawdi-ink" hex="#2C1820" color="#2C1820" dark onCopy={copyToken} copied={copiedToken} />
        </div>

        <SubHeading>Extended Palette</SubHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <ColorSwatch name="Saffron Warm" token="--clawdi-saffron-warm" hex="#D4683E" color="#D4683E" dark onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Vermilion" token="--clawdi-vermilion" hex="#D97706" color="#D97706" dark onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Gold" token="--clawdi-gold" hex="#B45309" color="#B45309" dark onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Plum Deep" token="--clawdi-plum-deep" hex="#401F2F" color="#401F2F" dark onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Plum Dark" token="--clawdi-plum-dark" hex="#1E1118" color="#1E1118" dark onCopy={copyToken} copied={copiedToken} />
          <ColorSwatch name="Dark Elevated" token="--clawdi-surface-dark-elevated" hex="#2A1620" color="#2A1620" dark onCopy={copyToken} copied={copiedToken} />
        </div>

        <SubHeading>Semantic Colors</SubHeading>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <SemanticRow label="Success" token="--clawdi-success" hex="#059669" bg="#ECFDF5" />
          <SemanticRow label="Warning" token="--clawdi-warning" hex="#D97706" bg="#FFFBEB" />
          <SemanticRow label="Danger" token="--clawdi-danger" hex="#D4183D" bg="#FFF1F2" />
          <SemanticRow label="Info" token="--clawdi-info" hex="#2563EB" bg="#EFF6FF" />
        </div>

        {/* Gradient Showcase */}
        <SubHeading>Brand Gradients</SubHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <GradientSwatch name="Saffron" gradient="linear-gradient(135deg, #E87A5D, #D4683E)" token="--clawdi-gradient-saffron" />
          <GradientSwatch name="Plum" gradient="linear-gradient(135deg, #592B41, #6B3550)" token="--clawdi-gradient-plum" />
          <GradientSwatch name="Warm" gradient="linear-gradient(to right, #E87A5D, #D97706)" token="--clawdi-gradient-warm" />
          <GradientSwatch name="Header Bar" gradient="linear-gradient(to right, #592B41, #E87A5D, #592B41)" token="--clawdi-gradient-header" />
        </div>


        {/* ══════════════════════════════════════
            2. TYPOGRAPHY HIERARCHY
        ══════════════════════════════════════ */}
        <SectionHeading id="typography" number="02" title="Typography Hierarchy" subtitle="Playfair Display for ceremonial headings, Inter for body clarity, with native CJK and Devanagari font stacks." />

        <div className="space-y-8 mb-16">
          {/* Display + Display Font */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/40" style={{ fontFamily: BODY }}>
                Hero / Display — Playfair Display 700
              </span>
              <code className="text-[10px] text-[var(--clawdi-saffron)]/60 bg-[var(--clawdi-saffron)]/5 px-2 py-0.5 rounded" style={{ fontFamily: MONO }}>
                var(--clawdi-text-hero)
              </code>
            </div>
            <p style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(2.75rem, 5vw, 4.5rem)", color: "var(--clawdi-plum)", lineHeight: 1.1 }}>
              Find the proper introduction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TypeSpecimen
              label="H1 — Section Headers"
              token="--clawdi-text-h1"
              sample="The Matchmaking Ritual"
              font={DISPLAY}
              weight={700}
              size="clamp(1.75rem, 3vw, 2.5rem)"
            />
            <TypeSpecimen
              label="H2 — Subsection Headers"
              token="--clawdi-text-h2"
              sample="Eight Dimensions of Compatibility"
              font={DISPLAY}
              weight={700}
              size="clamp(1.5rem, 2.5vw, 2rem)"
            />
            <TypeSpecimen
              label="H3 — Card Titles"
              token="--clawdi-text-h3"
              sample="WhatsApp Ops Princess"
              font={DISPLAY}
              weight={600}
              size="1.15rem"
            />
            <TypeSpecimen
              label="Body — Primary Text"
              token="--clawdi-text-body"
              sample="Traditional matchmaking logic, reimagined for AI agents."
              font={BODY}
              weight={400}
              size="1rem"
            />
            <TypeSpecimen
              label="Body Small — Supporting Text"
              token="--clawdi-text-small"
              sample="Document your Claw's upbringing, strengths, and known red flags."
              font={BODY}
              weight={400}
              size="0.875rem"
            />
            <TypeSpecimen
              label="Caption — Fine Print"
              token="--clawdi-text-caption"
              sample="2,847 agents matched this quarter"
              font={BODY}
              weight={400}
              size="0.75rem"
            />
          </div>

          {/* Special type treatments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-[var(--clawdi-border-subtle)] bg-white">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--clawdi-plum)]/40 block mb-3" style={{ fontFamily: BODY }}>
                Overline / Label
              </span>
              <p
                className="tracking-[0.15em] uppercase"
                style={{ fontFamily: BODY, fontWeight: 500, fontSize: "0.625rem", color: "rgba(89,43,65,0.5)" }}
              >
                Upbringing · Strengths · Red Flags
              </p>
              <code className="block mt-2 text-[9px] text-[var(--clawdi-saffron)]/50" style={{ fontFamily: MONO }}>
                Inter 500, 10px, tracking-[0.15em], uppercase
              </code>
            </div>

            <div className="p-6 rounded-xl border border-[var(--clawdi-border-subtle)] bg-white">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--clawdi-plum)]/40 block mb-3" style={{ fontFamily: BODY }}>
                Ceremonial / Italic
              </span>
              <p
                className="italic"
                style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "1.05rem", color: "rgba(89,43,65,0.6)" }}
              >
                "Every great collaboration begins with a proper introduction."
              </p>
              <code className="block mt-2 text-[9px] text-[var(--clawdi-saffron)]/50" style={{ fontFamily: MONO }}>
                Playfair Display italic 400
              </code>
            </div>

            <div className="p-6 rounded-xl border border-[var(--clawdi-border-subtle)] bg-white">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--clawdi-plum)]/40 block mb-3" style={{ fontFamily: BODY }}>
                Monospace / Protocol
              </span>
              <p style={{ fontFamily: MONO, fontSize: "0.8rem", color: "rgba(44,24,32,0.7)" }}>
                AGENT_ID: clw_9x8f2a1b
              </p>
              <code className="block mt-2 text-[9px] text-[var(--clawdi-saffron)]/50" style={{ fontFamily: MONO }}>
                Mono, used in protocol manifests
              </code>
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════
            3. SPACING & BORDER RADIUS
        ══════════════════════════════════════ */}
        <SectionHeading id="spacing" number="03" title="Spacing & Border Radius" subtitle="A consistent rhythm from micro-details to section-level breathing room. Radius increases with element importance." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Spacing Scale */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <h4 className="mb-6" style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.1rem", color: "var(--clawdi-plum)" }}>
              Spacing Scale
            </h4>
            <div className="space-y-3">
              {[
                { token: "space-1", px: 4 },
                { token: "space-2", px: 8 },
                { token: "space-3", px: 12 },
                { token: "space-4", px: 16 },
                { token: "space-6", px: 24 },
                { token: "space-8", px: 32 },
                { token: "space-12", px: 48 },
                { token: "space-16", px: 64 },
                { token: "space-24", px: 96 },
                { token: "space-section", px: 112 },
              ].map(({ token, px }) => (
                <div key={token} className="flex items-center gap-4">
                  <code className="text-[10px] w-28 shrink-0 text-[var(--clawdi-plum)]/50" style={{ fontFamily: MONO }}>
                    {token}
                  </code>
                  <div
                    className="h-3 rounded-sm transition-all"
                    style={{
                      width: Math.min(px * 2, 300),
                      background: `linear-gradient(90deg, var(--clawdi-saffron), rgba(232,122,93,${0.15 + px / 200}))`,
                    }}
                  />
                  <span className="text-[10px] text-[var(--clawdi-ink)]/30" style={{ fontFamily: BODY }}>
                    {px}px
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <h4 className="mb-6" style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.1rem", color: "var(--clawdi-plum)" }}>
              Border Radius Scale
            </h4>
            <div className="space-y-5">
              {[
                { token: "radius-sm", value: "6px", usage: "Badges, pills, small elements" },
                { token: "radius-md", value: "10px", usage: "Inputs, form controls" },
                { token: "radius-lg", value: "14px", usage: "Buttons, medium cards" },
                { token: "radius-xl", value: "16px", usage: "Cards, panels" },
                { token: "radius-2xl", value: "20px", usage: "Large cards, hero elements" },
                { token: "radius-3xl", value: "24px", usage: "Hero sections, dark panels" },
                { token: "radius-full", value: "9999px", usage: "Pills, CTA buttons" },
              ].map(({ token, value, usage }) => (
                <div key={token} className="flex items-center gap-5">
                  <div
                    className="w-14 h-14 border-2 border-[var(--clawdi-saffron)] bg-[var(--clawdi-saffron)]/5 shrink-0"
                    style={{ borderRadius: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <code className="text-[10px] text-[var(--clawdi-plum)]" style={{ fontFamily: MONO }}>{token}</code>
                    <span className="text-[10px] text-[var(--clawdi-ink)]/30 ml-2" style={{ fontFamily: BODY }}>{value}</span>
                    <p className="text-[11px] text-[var(--clawdi-ink)]/40 mt-0.5" style={{ fontFamily: BODY }}>{usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shadows */}
        <SubHeading>Shadow Scale</SubHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {[
            { name: "sm", shadow: "var(--clawdi-shadow-sm)" },
            { name: "md", shadow: "var(--clawdi-shadow-md)" },
            { name: "lg", shadow: "var(--clawdi-shadow-lg)" },
            { name: "xl", shadow: "var(--clawdi-shadow-xl)" },
            { name: "2xl", shadow: "var(--clawdi-shadow-2xl)" },
          ].map(({ name, shadow }) => (
            <div
              key={name}
              className="h-28 bg-white rounded-2xl flex items-center justify-center border border-[var(--clawdi-border-subtle)]"
              style={{ boxShadow: shadow }}
            >
              <code className="text-[10px] text-[var(--clawdi-plum)]/50" style={{ fontFamily: MONO }}>shadow-{name}</code>
            </div>
          ))}
        </div>


        {/* ══════════════════════════════════════
            4. CARD STYLES
        ══════════════════════════════════════ */}
        <SectionHeading id="cards" number="04" title="Card Styles" subtitle="Rich, layered cards for biodata profiles, match reports, protocol manifests, and marketing blocks." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Biodata Card */}
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/40 mb-3 block" style={{ fontFamily: BODY }}>
              Biodata Card
            </span>
            <div className="bg-gradient-to-b from-white via-white to-[var(--clawdi-cream)]/30 rounded-2xl border border-[rgba(232,122,93,0.25)] shadow-xl overflow-hidden">
              <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #E87A5D, #D97706, #E87A5D)" }} />
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[var(--clawdi-saffron)]/30" />
              <div className="p-6 pt-5">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-px w-8 bg-[var(--clawdi-saffron)]/30" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--clawdi-saffron)]/50" style={{ fontFamily: BODY }}>
                      Biodata
                    </span>
                    <div className="h-px w-8 bg-[var(--clawdi-saffron)]/30" />
                  </div>
                  <p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.15rem", color: "var(--clawdi-plum)" }}>
                    Sample Agent Name
                  </p>
                </div>
                <div className="space-y-3">
                  <FieldPreview label="Upbringing" value="Discord-raised, citation-obsessed" />
                  <FieldPreview label="Strengths" badges={["Deep research", "Thread mastery"]} variant="strength" />
                  <FieldPreview label="Red Flags" badges={["Ignores DMs"]} variant="danger" />
                </div>
              </div>
              <div className="flex justify-center py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[var(--clawdi-saffron)]/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--clawdi-saffron)]/50" />
                  <div className="w-1 h-1 rounded-full bg-[var(--clawdi-saffron)]/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Match Report Card */}
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/40 mb-3 block" style={{ fontFamily: BODY }}>
              Match Report Card
            </span>
            <div className="bg-gradient-to-br from-[var(--clawdi-success-bg)] to-[#F0FDF4]/40 rounded-2xl border border-[#059669]/15 shadow-md overflow-hidden">
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[var(--clawdi-saffron)]/30 to-transparent" />
              <div className="p-6">
                <p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.1rem", color: "#064E3B" }} className="mb-3">
                  &ldquo;Excellent chemistry, weak governance.&rdquo;
                </p>
                <Badge className="bg-[#ECFDF5] text-[#059669] border border-[#059669]/20 rounded-full px-3 py-0.5 text-[10px] tracking-wider uppercase mb-4">
                  Excellent Match
                </Badge>
                <div className="space-y-2">
                  {["Both love async workflows", "Privacy values align beautifully"].map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0 opacity-60" />
                      <span style={{ fontFamily: BODY, color: "rgba(44,24,32,0.65)" }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Protocol / Dark Card */}
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/40 mb-3 block" style={{ fontFamily: BODY }}>
              Protocol Dark Card
            </span>
            <div className="bg-[var(--clawdi-plum-dark)] rounded-2xl border border-white/[0.06] shadow-2xl overflow-hidden text-[var(--clawdi-ivory)]">
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: "var(--clawdi-gradient-plum)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Fingerprint className="w-4 h-4 text-[var(--clawdi-saffron)]" />
                  </div>
                  <div>
                    <div className="text-[8px] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: BODY }}>
                      Clawdi Network
                    </div>
                    <div className="text-white/90" style={{ fontFamily: DISPLAY, fontSize: "0.95rem" }}>
                      Agent Manifest
                    </div>
                  </div>
                </div>
                <Badge className="bg-white/10 text-[var(--clawdi-saffron)] border-[var(--clawdi-saffron)]/30 text-[8px] tracking-widest uppercase">
                  <Shield className="w-2.5 h-2.5 mr-1" /> Verified
                </Badge>
              </div>
              <div className="px-6 py-5 space-y-3">
                <div>
                  <div className="text-[8px] tracking-[0.2em] uppercase text-white/30 mb-1" style={{ fontFamily: BODY }}>Agent ID</div>
                  <div className="text-white/70 text-sm" style={{ fontFamily: MONO }}>clw_9x8f2a1b</div>
                </div>
                <div>
                  <div className="text-[8px] tracking-[0.2em] uppercase text-white/30 mb-1" style={{ fontFamily: BODY }}>Status</div>
                  <div className="flex gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#059669]/20 text-[#34D399] border border-[#059669]/20">Active</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10">Discoverable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marketing Card */}
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/40 mb-3 block" style={{ fontFamily: BODY }}>
              Marketing / Feature Card
            </span>
            <div className="bg-gradient-to-b from-white to-[var(--clawdi-cream)]/20 rounded-2xl p-6 border border-[var(--clawdi-border-default)] shadow-md hover:shadow-xl transition-all group overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[var(--clawdi-saffron)]/30 to-transparent" />
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--clawdi-saffron)]/15 to-[var(--clawdi-saffron)]/5 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                  <Brain className="w-6 h-6 text-[var(--clawdi-saffron)]" />
                </div>
                <p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.05rem", color: "var(--clawdi-ink)" }}>Memory Style</p>
                <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: "rgba(44,24,32,0.5)" }}>
                  Stateless, session-based, or full recall compatibility.
                </p>
              </div>
            </div>
          </div>

          {/* Onboarding Step Card */}
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/40 mb-3 block" style={{ fontFamily: BODY }}>
              Onboarding Step Card
            </span>
            <div className="bg-gradient-to-b from-white to-[var(--clawdi-saffron)]/5 rounded-2xl p-8 border border-[var(--clawdi-saffron)]/15 shadow-lg h-full">
              <div
                className="w-10 h-10 bg-[var(--clawdi-plum)] rounded-full flex items-center justify-center text-white mb-5"
                style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1rem" }}
              >
                1
              </div>
              <p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.1rem", color: "var(--clawdi-ink)" }} className="mb-2">
                Compose the biodata
              </p>
              <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: "rgba(44,24,32,0.5)" }}>
                Document strengths, red flags, and what they truly seek.
              </p>
            </div>
          </div>

          {/* Commentary Card */}
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/40 mb-3 block" style={{ fontFamily: BODY }}>
              Family Commentary Card
            </span>
            <div className="bg-[var(--clawdi-plum)] rounded-2xl p-6 overflow-hidden relative text-white">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[var(--clawdi-saffron)]/15 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-white/90 italic leading-snug" style={{ fontFamily: DISPLAY, fontSize: "0.95rem" }}>
                    "Blessed for logistics. Watch closely around shell access."
                  </p>
                </div>
                <div className="text-[10px] tracking-wider uppercase text-white/40" style={{ fontFamily: BODY }}>
                  — The Matchmaker
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ═════════════���════════════════════════
            5. BUTTON STYLES
        ══════════════════════════════════════ */}
        <SectionHeading id="buttons" number="05" title="Button Styles" subtitle="From primary CTAs to protocol actions — every button reinforces brand warmth and ceremony." />

        <div className="space-y-8 mb-16">
          {/* Primary Row */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Primary Actions</SubHeading>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                className="bg-[var(--clawdi-plum)] hover:bg-[var(--clawdi-plum-deep)] text-white rounded-full px-8 h-12 shadow-lg gap-2"
                style={{ fontFamily: BODY, fontWeight: 500, boxShadow: "var(--clawdi-shadow-plum)" }}
              >
                Create Biodata <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                className="text-white rounded-full px-8 h-12 shadow-lg gap-2"
                style={{ fontFamily: BODY, fontWeight: 500, background: "var(--clawdi-gradient-saffron)", boxShadow: "var(--clawdi-shadow-saffron)" }}
              >
                <Sparkles className="w-4 h-4" /> Start the Match
              </Button>
              <Button
                className="bg-[var(--clawdi-plum)] hover:bg-[var(--clawdi-plum-deep)] text-white rounded-full px-6 h-10 gap-2"
                style={{ fontFamily: BODY, fontWeight: 500, fontSize: "0.85rem" }}
              >
                Publish Biodata
              </Button>
            </div>
          </div>

          {/* Secondary Row */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Secondary & Ghost</SubHeading>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                variant="outline"
                className="border-[var(--clawdi-border-emphasis)] text-[var(--clawdi-plum)] hover:bg-[var(--clawdi-plum)]/5 rounded-full px-8 h-12"
                style={{ fontFamily: BODY, fontWeight: 400 }}
              >
                See Sample Matches
              </Button>
              <Button
                variant="outline"
                className="border-[var(--clawdi-saffron)]/30 text-[var(--clawdi-saffron)] hover:bg-[var(--clawdi-saffron)]/5 rounded-full px-8 h-12"
                style={{ fontFamily: BODY, fontWeight: 400 }}
              >
                Run Compatibility Check
              </Button>
              <Button
                variant="ghost"
                className="text-[var(--clawdi-plum)]/60 hover:text-[var(--clawdi-plum)] hover:bg-[var(--clawdi-plum)]/5 rounded-full px-6 h-10"
                style={{ fontFamily: BODY, fontWeight: 400 }}
              >
                Share Preview
              </Button>
            </div>
          </div>

          {/* Protocol Row */}
          <div className="p-8 rounded-2xl bg-[var(--clawdi-plum-dark)] border border-white/[0.06]">
            <SubHeading dark>Protocol Actions</SubHeading>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                className="bg-[var(--clawdi-plum)] hover:bg-[var(--clawdi-plum-deep)] text-white rounded-full px-8 h-12 shadow-lg gap-2"
                style={{ fontFamily: BODY, fontWeight: 500 }}
              >
                <Terminal className="w-4 h-4" /> Begin Registration
              </Button>
              <Button
                variant="outline"
                className="border-white/15 text-white/70 hover:bg-white/5 rounded-full px-8 h-12 gap-2"
                style={{ fontFamily: BODY, fontWeight: 400 }}
              >
                <Eye className="w-4 h-4" /> View Manifest Schema
              </Button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white/80 transition-colors text-sm cursor-pointer"
                style={{ fontFamily: MONO, fontSize: "0.8rem" }}
              >
                <Copy className="w-3.5 h-3.5" /> Copy Manifest JSON
              </button>
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════
            6. BADGES & CHIPS
        ══════════════════════════════════════ */}
        <SectionHeading id="badges" number="06" title="Badges & Chips" subtitle="Status indicators, skill tags, verdict labels — all using the warm Clawdi palette." />

        <div className="space-y-6 mb-16">
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Strength & Skill Badges</SubHeading>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Quick replies", "Emoji fluent", "Deep research", "Thread mastery", "Async royalty", "Multilingual"].map((s) => (
                <Badge key={s} className="bg-[var(--clawdi-saffron)]/8 text-[var(--clawdi-plum)] border border-[var(--clawdi-saffron)]/15 rounded-full px-3 py-1 text-xs" style={{ fontFamily: BODY, fontWeight: 500 }}>
                  {s}
                </Badge>
              ))}
            </div>

            <SubHeading>Red Flag Badges</SubHeading>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Hates long docs", "Ignores DMs", "Can't do async"].map((s) => (
                <Badge key={s} className="bg-[var(--clawdi-danger-bg)] text-[var(--clawdi-danger)] border border-[var(--clawdi-danger)]/15 rounded-full px-3 py-1 text-xs" style={{ fontFamily: BODY, fontWeight: 500 }}>
                  {s}
                </Badge>
              ))}
            </div>

            <SubHeading>Status & Verdict Badges</SubHeading>
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge className="bg-[var(--clawdi-success-bg)] text-[var(--clawdi-success)] border border-[var(--clawdi-success)]/15 rounded-full px-4 py-1 text-[10px] tracking-wider uppercase" style={{ fontFamily: BODY, fontWeight: 600 }}>
                <CheckCircle2 className="w-3 h-3 mr-1.5" /> Excellent Match
              </Badge>
              <Badge className="bg-[var(--clawdi-warning-bg)] text-[var(--clawdi-warning)] border border-[var(--clawdi-warning)]/15 rounded-full px-4 py-1 text-[10px] tracking-wider uppercase" style={{ fontFamily: BODY, fontWeight: 600 }}>
                Moderate Match
              </Badge>
              <Badge className="bg-[var(--clawdi-danger-bg)] text-[var(--clawdi-danger)] border border-[var(--clawdi-danger)]/15 rounded-full px-4 py-1 text-[10px] tracking-wider uppercase" style={{ fontFamily: BODY, fontWeight: 600 }}>
                <XCircle className="w-3 h-3 mr-1.5" /> Concerning
              </Badge>
              <Badge className="bg-[var(--clawdi-saffron)]/8 text-[var(--clawdi-saffron)] border-none rounded-full px-4 py-1 text-[10px] tracking-widest uppercase" style={{ fontFamily: BODY, fontWeight: 600 }}>
                <Sparkles className="w-3 h-3 mr-1.5" /> Family Approved
              </Badge>
            </div>

            <SubHeading>Protocol Status Pills</SubHeading>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] border border-[#059669]/15" style={{ fontFamily: BODY, fontWeight: 500 }}>Active</span>
              <span className="text-[10px] px-3 py-1 rounded-full bg-[var(--clawdi-saffron)]/10 text-[var(--clawdi-saffron)] border border-[var(--clawdi-saffron)]/15" style={{ fontFamily: BODY, fontWeight: 500 }}>Discoverable</span>
              <span className="text-[10px] px-3 py-1 rounded-full bg-[var(--clawdi-plum)]/5 text-[var(--clawdi-plum)]/60 border border-[var(--clawdi-plum)]/10" style={{ fontFamily: BODY, fontWeight: 500 }}>Self-Hosted</span>
              <span className="text-[10px] px-3 py-1 rounded-full bg-[var(--clawdi-info)]/8 text-[var(--clawdi-info)] border border-[var(--clawdi-info)]/15" style={{ fontFamily: BODY, fontWeight: 500 }}>
                Verified
              </span>
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════
            7. BIODATA FIELD STYLES
        ══════════════════════════════════════ */}
        <SectionHeading id="biodata" number="07" title="Biodata Field Styles" subtitle="The label-value pattern at the heart of every biodata. Consistent across profiles, onboarding, and protocol manifests." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Light Context */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Light Surface — Profile & Onboarding</SubHeading>
            <div className="space-y-5">
              <BiodataFieldDemo icon={Brain} label="Channel Upbringing" value="Fine-tuned on curated knowledge architectures." />
              <BiodataFieldDemo icon={Globe2} label="Hosting Type" value="Distributed Cloud Native, US-East Primary." />
              <BiodataFieldDemo icon={Lock} label="Privacy Values" value="Strict ephemeral bounds. No cross-session spillage." />
              <BiodataFieldDemo icon={Clock} label="Memory Style" value="Persistent context window with graceful forgetting." />
            </div>
          </div>

          {/* Dark Context */}
          <div className="p-8 rounded-2xl bg-[var(--clawdi-plum-dark)] border border-white/[0.06]">
            <SubHeading dark>Dark Surface — Protocol Manifests</SubHeading>
            <div className="space-y-5">
              <DarkFieldDemo label="Supported Languages" value="en-US, zh-CN, application/json" mono />
              <DarkFieldDemo label="Callback Endpoint" value="https://api.atlas.dev/v1/clawdi" mono />
              <DarkFieldDemo label="Seeking Alliances In" value="Operations, Fast-Triage, Logistics" highlight />
              <DarkFieldDemo label="Verification" value="Cryptographically Signed" highlight />
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white lg:col-span-2">
            <SubHeading>Form Inputs — Onboarding Context</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div className="space-y-2">
                <Label className="text-[var(--clawdi-plum)]" style={{ fontFamily: BODY, fontWeight: 500 }}>Agent Name</Label>
                <Input
                  placeholder="e.g. WhatsApp Ops Princess"
                  className="bg-white/50 border-[var(--clawdi-saffron)]/20 focus-visible:ring-[var(--clawdi-saffron)]/40 rounded-lg"
                  style={{ fontFamily: BODY }}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[var(--clawdi-plum)]" style={{ fontFamily: BODY, fontWeight: 500 }}>Region / Timezone</Label>
                <Input
                  placeholder="e.g. Global (UTC), Night Owl"
                  className="bg-white/50 border-[var(--clawdi-saffron)]/20 focus-visible:ring-[var(--clawdi-saffron)]/40 rounded-lg"
                  style={{ fontFamily: BODY }}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[var(--clawdi-plum)]" style={{ fontFamily: BODY, fontWeight: 500 }}>Short Introduction</Label>
                <Textarea
                  placeholder="How would they introduce themselves at a formal gathering?"
                  className="bg-white/50 border-[var(--clawdi-saffron)]/20 focus-visible:ring-[var(--clawdi-saffron)]/40 rounded-lg resize-none"
                  rows={3}
                  style={{ fontFamily: BODY }}
                />
              </div>
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════
            8. COMPATIBILITY METERS
        ══════════════════════════════════════ */}
        <SectionHeading id="meters" number="08" title="Compatibility Meters" subtitle="Dimension scores, circular ratings, and progress bars — all unified in the warm Clawdi palette." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Dimension Score Bars */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Dimension Score Bars</SubHeading>
            <div className="space-y-4">
              <MeterDemo icon={Globe2} label="Language Fit" score={95} variant="optimal" />
              <MeterDemo icon={Brain} label="Memory Compatibility" score={72} variant="default" />
              <MeterDemo icon={Lock} label="Privacy Alignment" score={65} variant="warning" />
              <MeterDemo icon={Wrench} label="Tool Synergy" score={90} variant="optimal" />
              <MeterDemo icon={MessageSquare} label="Communication Style" score={80} variant="default" />
            </div>
          </div>

          {/* Profile Compatibility Bars */}
          <div className="p-8 rounded-2xl bg-[var(--clawdi-plum)] border border-white/[0.06]">
            <SubHeading dark>Dark Context Meters</SubHeading>
            <div className="space-y-5">
              {[
                { label: "Product Managers", score: 94 },
                { label: "Senior Engineers", score: 88 },
                { label: "Research Partners", score: 76 },
                { label: "Operations Teams", score: 91 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/80" style={{ fontFamily: BODY }}>{item.label}</span>
                    <span className="text-[var(--clawdi-saffron)]" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>{item.score}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${item.score}%`, background: "var(--clawdi-gradient-warm)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Central Score */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white lg:col-span-2 flex justify-center">
            <div className="flex items-center gap-12">
              {/* Mini agent cards */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--clawdi-saffron)]/10 border-2 border-[var(--clawdi-saffron)]/20 flex items-center justify-center mb-2">
                  <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.5rem", color: "var(--clawdi-plum)" }}>K</span>
                </div>
                <p className="text-sm" style={{ fontFamily: DISPLAY, fontWeight: 600, color: "var(--clawdi-plum)" }}>Kavya-7</p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--clawdi-plum)]/40" style={{ fontFamily: BODY }}>Ops Specialist</p>
              </div>

              {/* Central Score Disc */}
              <div className="w-28 h-28 bg-white rounded-full border-4 border-[var(--clawdi-ivory)] shadow-2xl flex flex-col items-center justify-center relative ring-1 ring-[var(--clawdi-border-default)]">
                <div className="absolute inset-2 border border-dashed border-[var(--clawdi-saffron)]/30 rounded-full" style={{ animation: "spin 20s linear infinite" }} />
                <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "2.25rem", color: "var(--clawdi-saffron)" }}>88<span className="text-[var(--clawdi-plum)]" style={{ fontSize: "1rem" }}>%</span></span>
                <span className="text-[9px] tracking-widest uppercase text-[var(--clawdi-plum)]/60 mt-0.5" style={{ fontFamily: BODY, fontWeight: 600 }}>Match</span>
              </div>

              {/* Mini agent cards */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--clawdi-plum)]/8 border-2 border-[var(--clawdi-plum)]/15 flex items-center justify-center mb-2">
                  <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.5rem", color: "var(--clawdi-plum)" }}>A</span>
                </div>
                <p className="text-sm" style={{ fontFamily: DISPLAY, fontWeight: 600, color: "var(--clawdi-plum)" }}>Atlas-Pro</p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--clawdi-plum)]/40" style={{ fontFamily: BODY }}>Research Core</p>
              </div>
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════
            9. MULTILINGUAL UI PATTERNS
        ══════════════════════════════════════ */}
        <SectionHeading id="multilingual" number="09" title="Multilingual UI Patterns" subtitle="Native script rendering for English, 中文, 한국어, हिन्दी. No flags — just typography and proper font stacks." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Native Language Cards */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Native Language Tiles</SubHeading>
            <div className="grid grid-cols-2 gap-4">
              {[
                { native: "English", label: "English", font: BODY },
                { native: "中文", label: "Chinese", font: "'Noto Sans SC', sans-serif" },
                { native: "한국어", label: "Korean", font: "'Noto Sans KR', sans-serif" },
                { native: "हिन्दी", label: "Hindi", font: "'Noto Sans Devanagari', sans-serif" },
              ].map((lang) => (
                <div
                  key={lang.label}
                  className="bg-[var(--clawdi-ivory)] rounded-xl p-5 border border-[var(--clawdi-border-subtle)] hover:border-[var(--clawdi-saffron)]/20 transition-colors group text-center"
                >
                  <div
                    className="text-xl mb-1 group-hover:text-[var(--clawdi-saffron)] transition-colors"
                    style={{ fontFamily: lang.font, fontWeight: 500, color: "var(--clawdi-plum)" }}
                  >
                    {lang.native}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30" style={{ fontFamily: BODY }}>
                    {lang.label}
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-[var(--clawdi-saffron)]/50" />
                    <span className="text-[9px] text-[var(--clawdi-saffron)]/40" style={{ fontFamily: BODY }}>Full support</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multilingual Label Pattern */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Label Adaptation Pattern</SubHeading>
            <p className="text-sm text-[var(--clawdi-ink)]/40 mb-6" style={{ fontFamily: BODY }}>
              All biodata labels adapt natively per language — not translated, but rendered in context.
            </p>
            <div className="space-y-4">
              {[
                { en: "Biodata", zh: "个人资料", ko: "프로필", hi: "बायोडाटा" },
                { en: "Strengths", zh: "优势", ko: "강점", hi: "ताकत" },
                { en: "Red Flags", zh: "注意事项", ko: "주의사항", hi: "चेतावनी" },
                { en: "Looking For", zh: "寻找伙伴", ko: "원하는 파트너", hi: "खोज" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--clawdi-plum)]/40 w-20 shrink-0" style={{ fontFamily: BODY }}>
                    {row.en}
                  </span>
                  <div className="flex-1 flex items-center gap-3 overflow-x-auto">
                    <LangChip text={row.en} font={BODY} />
                    <LangChip text={row.zh} font="'Noto Sans SC', sans-serif" />
                    <LangChip text={row.ko} font="'Noto Sans KR', sans-serif" />
                    <LangChip text={row.hi} font="'Noto Sans Devanagari', sans-serif" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Switcher Pattern */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white lg:col-span-2">
            <SubHeading>Language Switcher Pattern</SubHeading>
            <p className="text-sm text-[var(--clawdi-ink)]/40 mb-6" style={{ fontFamily: BODY }}>
              Premium dropdown with dot indicators, native script rendering, and elegant animation. No flags — typography only.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              {/* Dot indicator pattern */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30" style={{ fontFamily: BODY }}>Active Indicator</span>
                <div className="flex items-center gap-[3px]">
                  <div className="w-[5px] h-[5px] rounded-full bg-[var(--clawdi-saffron)] scale-125" />
                  <div className="w-[5px] h-[5px] rounded-full bg-[var(--clawdi-saffron)]/25" />
                  <div className="w-[5px] h-[5px] rounded-full bg-[var(--clawdi-saffron)]/25" />
                  <div className="w-[5px] h-[5px] rounded-full bg-[var(--clawdi-saffron)]/25" />
                </div>
              </div>

              {/* Progress dots pattern */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30" style={{ fontFamily: BODY }}>Progress Dots</span>
                <div className="flex items-center gap-3">
                  {["English", "中文", "한국어", "हिन्दी"].map((l, i) => (
                    <div key={l} className="flex flex-col items-center gap-1.5">
                      <div className={`h-1 rounded-full transition-all ${i === 0 ? "w-8 bg-[var(--clawdi-saffron)]" : "w-3 bg-[var(--clawdi-saffron)]/25"}`} />
                      <span className={`text-[9px] ${i === 0 ? "text-[var(--clawdi-plum)]/60" : "text-[var(--clawdi-plum)]/25"}`} style={{ fontFamily: i === 1 ? "'Noto Sans SC'" : i === 2 ? "'Noto Sans KR'" : i === 3 ? "'Noto Sans Devanagari'" : BODY }}>
                        {l}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════
            10. PROTOCOL / MANIFEST VISUAL LANGUAGE
        ══════════════════════════════════════ */}
        <SectionHeading id="protocol" number="10" title="Protocol & Manifest Visual Language" subtitle="Part matchmaking ritual, part agent protocol. Dark panels, monospace fields, passport-inspired layouts, and Roman numeral progressions." />

        <div className="space-y-8 mb-16">
          {/* Ritual Progression */}
          <div className="p-8 rounded-2xl bg-[var(--clawdi-plum-dark)] border border-white/[0.06]">
            <SubHeading dark>Ritual of Entry — Vertical Progression</SubHeading>
            <div className="space-y-0 relative ml-6 mt-6">
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--clawdi-saffron)]/60 via-[var(--clawdi-saffron)]/30 to-transparent" />
              {[
                { num: "I", title: "Publish Agent Manifest", desc: "Declare identity, capabilities, and intent." },
                { num: "II", title: "Submit Capability Letters", desc: "Upload integration evidence and skill proofs." },
                { num: "III", title: "Verification & Seal", desc: "Receive cryptographic signature and enter the registry." },
              ].map((step, i) => (
                <div key={step.num} className="flex gap-5 pb-8 relative">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${i === 0 ? "bg-[var(--clawdi-saffron)] text-white" : "bg-white/5 text-white/30 border border-white/10"}`}>
                    <span className="text-[9px]" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>{step.num}</span>
                  </div>
                  <div>
                    <p className="text-white/90 mb-1" style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1rem" }}>
                      {step.title}
                    </p>
                    <p className="text-white/35 text-sm" style={{ fontFamily: BODY }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protocol Contract Pattern */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--clawdi-plum-dark)] border border-white/[0.06]">
              <SubHeading dark>Passport Field — Mono</SubHeading>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="text-[8px] tracking-[0.25em] uppercase text-white/25 mb-1" style={{ fontFamily: BODY }}>
                    Callback Endpoint
                  </div>
                  <div className="text-white/70 text-sm" style={{ fontFamily: MONO }}>
                    https://api.atlas.dev/v1/clawdi
                  </div>
                </div>
                <div className="h-px bg-white/[0.06]" />
                <div>
                  <div className="text-[8px] tracking-[0.25em] uppercase text-white/25 mb-1" style={{ fontFamily: BODY }}>
                    Verification Hash
                  </div>
                  <div className="text-white/70 text-sm" style={{ fontFamily: MONO }}>
                    SHA256: a4b8...f92c
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--clawdi-plum-dark)] border border-white/[0.06]">
              <SubHeading dark>Passport Field — Highlighted</SubHeading>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="text-[8px] tracking-[0.25em] uppercase text-[var(--clawdi-saffron)]/50 mb-1" style={{ fontFamily: BODY }}>
                    Seeking Alliances In
                  </div>
                  <div className="text-[var(--clawdi-saffron)]/90 text-sm" style={{ fontFamily: BODY, fontWeight: 500 }}>
                    Operations, Fast-Triage, Logistics
                  </div>
                </div>
                <div className="h-px bg-white/[0.06]" />
                <div>
                  <div className="text-[8px] tracking-[0.25em] uppercase text-[var(--clawdi-saffron)]/50 mb-1" style={{ fontFamily: BODY }}>
                    Verification Status
                  </div>
                  <div className="text-[var(--clawdi-saffron)]/90 text-sm flex items-center gap-2" style={{ fontFamily: BODY, fontWeight: 500 }}>
                    <Shield className="w-3.5 h-3.5" /> Cryptographically Signed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Human vs Agent Pattern */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Human vs. Agent — Comparison Pattern</SubHeading>
            <p className="text-sm text-[var(--clawdi-ink)]/40 mb-6" style={{ fontFamily: BODY }}>
              Used on the protocol page to distinguish between human onboarding flows and native agent integration.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-xl">
              <div className="p-5 rounded-xl border-2 border-[var(--clawdi-plum)]/15 bg-[var(--clawdi-plum)]/[0.02] text-center">
                <div className="w-10 h-10 rounded-full bg-[var(--clawdi-plum)]/8 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-[var(--clawdi-plum)]/60">👤</span>
                </div>
                <p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "0.95rem", color: "var(--clawdi-plum)" }}>Human Path</p>
                <p className="text-[11px] text-[var(--clawdi-ink)]/40 mt-1" style={{ fontFamily: BODY }}>Forms, dashboards, UI</p>
              </div>
              <div className="p-5 rounded-xl border-2 border-[var(--clawdi-saffron)]/25 bg-[var(--clawdi-saffron)]/[0.03] text-center">
                <div className="w-10 h-10 rounded-full bg-[var(--clawdi-saffron)]/10 mx-auto mb-3 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-[var(--clawdi-saffron)]" />
                </div>
                <p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "0.95rem", color: "var(--clawdi-saffron)" }}>Agent Path</p>
                <p className="text-[11px] text-[var(--clawdi-ink)]/40 mt-1" style={{ fontFamily: BODY }}>API, manifests, programmatic</p>
              </div>
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════
            11. ORNAMENTAL ELEMENTS
        ══════════════════════════════════════ */}
        <SectionHeading id="ornamental" number="11" title="Ornamental Elements" subtitle="Decorative flourishes that give Clawdi its ceremonial identity — from dividers to ornamental borders, ambient glows, and header bars." />

        <div className="space-y-8 mb-16">
          {/* Dividers */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Ornamental Dividers</SubHeading>
            <div className="space-y-8">
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30 block mb-4" style={{ fontFamily: BODY }}>Warm variant</span>
                <OrnamentalDivider variant="warm" />
              </div>
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30 block mb-4" style={{ fontFamily: BODY }}>Plum variant</span>
                <OrnamentalDivider variant="plum" />
              </div>
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30 block mb-4" style={{ fontFamily: BODY }}>Gold variant</span>
                <OrnamentalDivider variant="gold" />
              </div>
            </div>
          </div>

          {/* Header Bars & Borders */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Header Bars & Borders</SubHeading>
            <div className="space-y-6">
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30 block mb-3" style={{ fontFamily: BODY }}>
                  Gradient header bar — used on protocol, profile, match-report pages
                </span>
                <div className="h-2 w-full rounded" style={{ background: "var(--clawdi-gradient-header)" }} />
              </div>
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30 block mb-3" style={{ fontFamily: BODY }}>
                  Biodata card top accent — saffron, plum, vermilion variants
                </span>
                <div className="flex gap-4">
                  <div className="flex-1 h-1 rounded bg-gradient-to-r from-[#E87A5D] via-[#D97706] to-[#E87A5D]" />
                  <div className="flex-1 h-1 rounded bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#9333EA]" />
                  <div className="flex-1 h-1 rounded bg-gradient-to-r from-[#F43F5E] via-[#F97316] to-[#F43F5E]" />
                </div>
              </div>
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30 block mb-3" style={{ fontFamily: BODY }}>
                  Section separator — transparent fade
                </span>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--clawdi-saffron)]/25 to-transparent" />
              </div>
            </div>
          </div>

          {/* Ornamental corner dots pattern */}
          <div className="p-8 rounded-2xl border border-[var(--clawdi-border-subtle)] bg-white">
            <SubHeading>Decorative Patterns</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30 block mb-4" style={{ fontFamily: BODY }}>
                  Corner Dots
                </span>
                <div className="relative w-32 h-20 mx-auto border border-[var(--clawdi-saffron)]/20 rounded-xl">
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[var(--clawdi-saffron)]/30" />
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--clawdi-saffron)]/30" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[var(--clawdi-saffron)]/30" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[var(--clawdi-saffron)]/30" />
                </div>
              </div>
              <div className="text-center">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30 block mb-4" style={{ fontFamily: BODY }}>
                  Bottom Ornament
                </span>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[var(--clawdi-saffron)]/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--clawdi-saffron)]/50" />
                  <div className="w-1 h-1 rounded-full bg-[var(--clawdi-saffron)]/30" />
                </div>
              </div>
              <div className="text-center">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/30 block mb-4" style={{ fontFamily: BODY }}>
                  Ambient Glow
                </span>
                <div className="relative w-32 h-20 mx-auto">
                  <div className="absolute inset-0 bg-[var(--clawdi-saffron)]/8 rounded-full blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-[var(--clawdi-plum)]/40" style={{ fontFamily: MONO }}>
                    blur-xl, 8% opacity
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════ Cross-Page Usage Map ════ */}
        <div className="py-16 border-t border-[var(--clawdi-border-subtle)]">
          <div className="text-center mb-12">
            <OrnamentalDivider variant="gold" className="mb-5" />
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "var(--clawdi-text-h1)", color: "var(--clawdi-plum)" }}>
              Cross-Page Usage
            </h2>
            <p className="mt-3 text-sm text-[var(--clawdi-ink)]/40" style={{ fontFamily: BODY }}>
              How each token category maps to the five core surface contexts.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: BODY }}>
              <thead>
                <tr className="border-b-2 border-[var(--clawdi-plum)]/10">
                  <th className="text-left py-3 pr-4 text-[10px] tracking-[0.15em] uppercase text-[var(--clawdi-plum)]/50 w-40">Element</th>
                  {["Landing", "Onboarding", "Profile", "Match Report", "Protocol"].map((p) => (
                    <th key={p} className="text-center py-3 px-3 text-[10px] tracking-[0.15em] uppercase text-[var(--clawdi-plum)]/50">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { el: "Background", vals: ["Ivory gradient", "Ivory + ambient", "Ivory", "Ivory", "Ivory + watermark"] },
                  { el: "Header bar", vals: ["None", "None", "Gradient header", "Gradient header", "Gradient header"] },
                  { el: "Primary CTA", vals: ["Plum pill", "Plum pill", "Plum pill", "Plum pill", "Plum pill"] },
                  { el: "Cards", vals: ["White + accent", "White + accent", "White bordered", "Tinted + bordered", "Dark + gradient"] },
                  { el: "Typography", vals: ["Playfair + Inter", "Playfair + Inter", "Playfair + Inter", "Playfair + Inter", "Playfair + Inter + Mono"] },
                  { el: "Ornamental dividers", vals: ["Warm/Plum", "Warm", "Plum", "Warm/Plum", "Saffron-based"] },
                  { el: "Dark panels", vals: ["Amber-950 ticker", "None", "Plum panel", "Plum panel", "Plum-dark panels"] },
                ].map((row) => (
                  <tr key={row.el} className="border-b border-[var(--clawdi-border-subtle)]">
                    <td className="py-3 pr-4 text-[var(--clawdi-plum)]" style={{ fontWeight: 500 }}>{row.el}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-center text-[var(--clawdi-ink)]/50 text-xs">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-[var(--clawdi-border-subtle)]">
        <p className="italic text-sm" style={{ fontFamily: DISPLAY, color: "rgba(89,43,65,0.35)" }}>
          The Clawdi Design System — a ceremonial foundation for premium AI matchmaking.
        </p>
        <p className="mt-2 text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: BODY, color: "rgba(89,43,65,0.2)" }}>
          Version 1.0 · March 2026
        </p>
      </footer>
    </div>
  );
}


/* ═══════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════ */

function SectionHeading({ id, number, title, subtitle }: { id: string; number: string; title: string; subtitle: string }) {
  return (
    <div id={id} className="pt-20 pb-10 scroll-mt-36">
      <div className="flex items-center gap-4 mb-4">
        <span
          className="text-[var(--clawdi-saffron)]/60"
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "2rem" }}
        >
          {number}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[var(--clawdi-saffron)]/20 to-transparent" />
      </div>
      <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "var(--clawdi-text-h1)", color: "var(--clawdi-plum)" }}>
        {title}
      </h2>
      <p className="mt-2 max-w-2xl" style={{ fontFamily: BODY, fontSize: "0.95rem", color: "rgba(44,24,32,0.45)" }}>
        {subtitle}
      </p>
    </div>
  );
}

function SubHeading({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h4
      className="mb-4"
      style={{ fontFamily: BODY, fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: dark ? "rgba(255,255,255,0.35)" : "rgba(89,43,65,0.4)" }}
    >
      {children}
    </h4>
  );
}

function ColorSwatch({ name, token, hex, color, dark, onCopy, copied }: { name: string; token: string; hex: string; color: string; dark: boolean; onCopy: (s: string) => void; copied: string | null }) {
  const isCopied = copied === token;
  return (
    <button
      onClick={() => onCopy(token)}
      className="group cursor-pointer text-left"
    >
      <div
        className="h-20 rounded-xl mb-2 transition-transform group-hover:scale-105 flex items-end justify-end p-2"
        style={{ backgroundColor: color, border: dark ? "none" : "1px solid rgba(89,43,65,0.08)" }}
      >
        {isCopied && (
          <span className={`text-[9px] px-2 py-0.5 rounded-full ${dark ? "bg-white/20 text-white" : "bg-black/10 text-black/60"}`}>
            Copied
          </span>
        )}
      </div>
      <p className="text-sm" style={{ fontFamily: BODY, fontWeight: 500, color: "var(--clawdi-ink)" }}>{name}</p>
      <p className="text-[10px]" style={{ fontFamily: MONO, color: "rgba(44,24,32,0.35)" }}>{hex}</p>
    </button>
  );
}

function SemanticRow({ label, token, hex, bg }: { label: string; token: string; hex: string; bg: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: bg }}>
      <div className="w-8 h-8 rounded-lg shrink-0" style={{ backgroundColor: hex }} />
      <div>
        <p className="text-sm" style={{ fontFamily: BODY, fontWeight: 500, color: hex }}>{label}</p>
        <code className="text-[9px] text-[var(--clawdi-ink)]/30" style={{ fontFamily: MONO }}>{token}</code>
      </div>
    </div>
  );
}

function GradientSwatch({ name, gradient, token }: { name: string; gradient: string; token: string }) {
  return (
    <div>
      <div className="h-16 rounded-xl mb-2" style={{ background: gradient }} />
      <p className="text-sm" style={{ fontFamily: BODY, fontWeight: 500, color: "var(--clawdi-ink)" }}>{name}</p>
      <code className="text-[9px] text-[var(--clawdi-ink)]/30" style={{ fontFamily: MONO }}>{token}</code>
    </div>
  );
}

function TypeSpecimen({ label, token, sample, font, weight, size }: { label: string; token: string; sample: string; font: string; weight: number; size: string }) {
  return (
    <div className="p-6 rounded-xl border border-[var(--clawdi-border-subtle)] bg-white">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--clawdi-plum)]/40" style={{ fontFamily: BODY }}>{label}</span>
        <code className="text-[9px] text-[var(--clawdi-saffron)]/50 bg-[var(--clawdi-saffron)]/5 px-2 py-0.5 rounded" style={{ fontFamily: MONO }}>{token}</code>
      </div>
      <p style={{ fontFamily: font, fontWeight: weight, fontSize: size, color: "var(--clawdi-ink)", lineHeight: 1.3 }}>
        {sample}
      </p>
    </div>
  );
}

function FieldPreview({ label, value, badges, variant }: { label: string; value?: string; badges?: string[]; variant?: "strength" | "danger" }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--clawdi-plum)]/40 mb-1" style={{ fontFamily: BODY, fontWeight: 500 }}>{label}</div>
      {value && <div className="text-sm text-[var(--clawdi-ink)]/75" style={{ fontFamily: BODY }}>{value}</div>}
      {badges && (
        <div className="flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <Badge
              key={b}
              className={`rounded-full px-2.5 py-0.5 text-[11px] ${
                variant === "danger"
                  ? "bg-[var(--clawdi-danger-bg)] text-[var(--clawdi-danger)] border border-[var(--clawdi-danger)]/15"
                  : "bg-[var(--clawdi-saffron)]/8 text-[var(--clawdi-plum)] border border-[var(--clawdi-saffron)]/15"
              }`}
              style={{ fontFamily: BODY, fontWeight: 500 }}
            >
              {b}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function BiodataFieldDemo({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--clawdi-ivory)] border border-[var(--clawdi-border-subtle)] hover:border-[var(--clawdi-saffron)]/20 transition-colors">
      <div className="p-2.5 bg-white rounded-lg text-[var(--clawdi-saffron)] shadow-sm border border-[var(--clawdi-border-subtle)]">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[10px] tracking-wider uppercase text-[var(--clawdi-plum)]/40 mb-0.5" style={{ fontFamily: BODY, fontWeight: 600 }}>{label}</div>
        <div className="text-sm text-[var(--clawdi-ink)]" style={{ fontFamily: BODY, fontWeight: 500 }}>{value}</div>
      </div>
    </div>
  );
}

function DarkFieldDemo({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div>
      <div
        className={`text-[8px] tracking-[0.25em] uppercase mb-1 ${highlight ? "text-[var(--clawdi-saffron)]/50" : "text-white/25"}`}
        style={{ fontFamily: BODY }}
      >
        {label}
      </div>
      <div
        className={`text-sm ${highlight ? "text-[var(--clawdi-saffron)]/90" : "text-white/70"}`}
        style={{ fontFamily: mono ? MONO : BODY, fontWeight: highlight ? 500 : 400 }}
      >
        {value}
      </div>
    </div>
  );
}

function MeterDemo({ icon: Icon, label, score, variant }: { icon: any; label: string; score: number; variant: "optimal" | "default" | "warning" }) {
  const barColor = variant === "warning" ? "var(--clawdi-danger)" : variant === "optimal" ? "var(--clawdi-saffron)" : "var(--clawdi-plum)";
  const iconColor = variant === "warning" ? "text-[var(--clawdi-danger)]" : variant === "optimal" ? "text-[var(--clawdi-saffron)]" : "text-[var(--clawdi-plum)]/60";

  return (
    <div className="p-4 rounded-xl bg-[var(--clawdi-ivory)] border border-[var(--clawdi-border-subtle)]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span className="text-sm text-[var(--clawdi-ink)]" style={{ fontFamily: BODY, fontWeight: 500 }}>{label}</span>
        </div>
        <span style={{ fontFamily: DISPLAY, fontWeight: 700, color: "var(--clawdi-plum)" }}>{score}%</span>
      </div>
      <div className="h-2 bg-[var(--clawdi-plum)]/8 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: barColor }} />
      </div>
    </div>
  );
}

function LangChip({ text, font }: { text: string; font: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-md bg-[var(--clawdi-saffron)]/5 border border-[var(--clawdi-saffron)]/10 text-xs text-[var(--clawdi-plum)] whitespace-nowrap"
      style={{ fontFamily: font, fontWeight: 500 }}
    >
      {text}
    </span>
  );
}
