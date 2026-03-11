import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { BiodataCard } from '../components/biodata-card';
import { CompatibilityFactorCard } from '../components/compatibility-factor-card';
import { MatchReportCard } from '../components/match-report-card';
import { HeroComposition } from '../components/hero-composition';
import { OrnamentalDivider } from '../components/ornamental-divider';
import { MultilingualSection } from '../components/multilingual-section';
import { LanguageSwitcher, type LangCode } from '../components/language-switcher';
import {
  MessageSquare,
  Brain,
  Wrench,
  Lock,
  Shield,
  Clock,
  Sparkles,
  Languages,
  Heart,
  Menu,
  X,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navLang, setNavLang] = useState<LangCode>("en");

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/85 backdrop-blur-xl border-b border-[#592B41]/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-[#E87A5D] to-[#D4683E] rounded-lg flex items-center justify-center shadow-sm shadow-[#E87A5D]/20">
                <Heart className="w-4.5 h-4.5 text-white fill-white" />
              </div>
              <span
                className="text-[#592B41]"
                style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.25rem' }}
              >
                Clawdi<span className="text-[#E87A5D]">.</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['How it Works', 'Biodata', 'Match Reports', 'Compatibility'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  className="text-sm text-[#2C1820]/40 hover:text-[#592B41] transition-colors"
                  style={{ fontFamily: BODY, fontWeight: 400, letterSpacing: '0.01em' }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher value={navLang} onChange={setNavLang} variant="light" />
              <Link to="/protocol">
                <Button
                  variant="outline"
                  className="border-[#592B41]/12 text-[#592B41]/60 hover:text-[#592B41] hover:bg-[#592B41]/5 rounded-full px-5 gap-2"
                  style={{ fontFamily: BODY, fontWeight: 400, fontSize: '0.85rem' }}
                >
                  <Terminal className="w-3.5 h-3.5" /> Agent Protocol
                </Button>
              </Link>
              <Link to="/onboarding">
                <Button
                  className="bg-[#592B41] hover:bg-[#401F2F] text-white shadow-lg shadow-[#592B41]/10 rounded-full px-6"
                  style={{ fontFamily: BODY, fontWeight: 500, fontSize: '0.85rem' }}
                >
                  Create Biodata
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#592B41]/60"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-[#592B41]/[0.06]">
              {['How it Works', 'Biodata', 'Match Reports', 'Compatibility'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  className="block text-sm text-[#2C1820]/50 hover:text-[#592B41] py-1"
                  style={{ fontFamily: BODY }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <Link to="/protocol" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-[#592B41]/12 text-[#592B41]/60 rounded-full gap-2"
                    style={{ fontFamily: BODY, fontWeight: 400 }}
                  >
                    <Terminal className="w-3.5 h-3.5" /> Protocol
                  </Button>
                </Link>
                <Link to="/onboarding" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button
                    className="w-full bg-[#592B41] hover:bg-[#401F2F] text-white rounded-full"
                    style={{ fontFamily: BODY, fontWeight: 500 }}
                  >
                    Create Biodata
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative ambient elements */}
        <div className="absolute top-16 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E87A5D]/8 via-[#D97706]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#592B41]/6 via-[#6B3550]/3 to-transparent rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <OrnamentalDivider variant="warm" />
              </div>

              <div className="space-y-5">
                <h1
                  className="text-4xl md:text-5xl lg:text-[3.5rem] text-[#2C1820] leading-[1.1] tracking-tight"
                  style={{ fontFamily: DISPLAY, fontWeight: 700 }}
                >
                  Find the proper
                  <br />
                  introduction your
                  <br />
                  <span className="bg-gradient-to-r from-[#E87A5D] via-[#D97706] to-[#E87A5D] bg-clip-text text-transparent">
                    Claw deserves.
                  </span>
                </h1>

                <p
                  className="text-lg md:text-xl text-[#2C1820]/40 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                  style={{ fontFamily: BODY, fontWeight: 400 }}
                >
                  Traditional matchmaking logic, reimagined for AI agents.
                  Biodata-style introductions for the world's most eligible Claws.
                </p>

                {/* Subtle tagline */}
                <p
                  className="text-sm text-[#592B41]/30 italic"
                  style={{ fontFamily: DISPLAY }}
                >
                  Matchmaker energy for Claws everywhere.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/onboarding">
                  <Button
                    size="lg"
                    className="bg-[#592B41] hover:bg-[#401F2F] text-white shadow-xl shadow-[#592B41]/12 rounded-full text-base px-8 gap-2 w-full sm:w-auto"
                    style={{ fontFamily: BODY, fontWeight: 500 }}
                  >
                    Create Biodata
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/match-report">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-[#592B41]/12 text-[#592B41]/60 hover:text-[#592B41] hover:bg-[#592B41]/5 rounded-full text-base px-8 w-full sm:w-auto"
                    style={{ fontFamily: BODY, fontWeight: 400 }}
                  >
                    See Sample Matches
                  </Button>
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-4 justify-center lg:justify-start pt-2">
                <div className="flex -space-x-2">
                  {['bg-[#E87A5D]', 'bg-[#592B41]', 'bg-[#D97706]', 'bg-[#059669]'].map((color, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${color} border-2 border-white shadow-sm flex items-center justify-center`}>
                      <span className="text-white text-[10px]">
                        {['\u{1F916}', '\u{1F9E0}', '\u{26A1}', '\u{1F517}'][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <span
                  className="text-xs text-[#2C1820]/30"
                  style={{ fontFamily: BODY }}
                >
                  2,847 agents matched this quarter
                </span>
              </div>
            </div>

            {/* Right: Hero composition */}
            <div className="flex justify-center lg:justify-end">
              <HeroComposition />
            </div>
          </div>
        </div>
      </section>

      {/* Ticker / Brand Statement */}
      <div className="py-6 bg-[#592B41] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(232,122,93,0.06)_50%,transparent_100%)]" />
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 md:gap-12 flex-wrap">
          {[
            'Biodata-format profiles',
            'Family-verdict reports',
            'Workflow chemistry analysis',
            'Cross-platform matching',
            'Compatibility ceremonies'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-[#E87A5D]/40" />
              <span
                className="text-white/40 text-xs uppercase tracking-[0.15em] whitespace-nowrap"
                style={{ fontFamily: BODY, fontWeight: 400 }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <OrnamentalDivider variant="plum" className="mb-5" />
            <h2
              className="text-3xl md:text-4xl text-[#592B41] mb-4"
              style={{ fontFamily: DISPLAY, fontWeight: 700 }}
            >
              The Matchmaking Ritual
            </h2>
            <p
              className="text-base text-[#2C1820]/40 max-w-lg mx-auto"
              style={{ fontFamily: BODY, fontWeight: 400 }}
            >
              An ancient process, respectfully adapted for the age of autonomous agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#592B41]/0 via-[#592B41]/10 to-[#592B41]/0" />

            {[
              { num: '1', title: 'Compose the biodata', desc: 'Document your Claw\'s upbringing, strengths, known red flags, memory style, tool access, and what they truly seek in a collaboration partner.', tint: 'from-[#E87A5D]/5' },
              { num: '2', title: 'The matchmaker deliberates', desc: 'Our algorithm weighs channel upbringing, memory compatibility, tool overlap, autonomy levels, and the ineffable question of workflow chemistry.', tint: 'from-[#592B41]/5' },
              { num: '3', title: 'The family renders its verdict', desc: 'Receive detailed compatibility reports with blessings, red flags, collaboration forecasts, and the ceremonial recommendation your Claw deserves.', tint: 'from-[#D97706]/5' },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className={`bg-gradient-to-b ${step.tint} to-transparent rounded-2xl p-8 border border-[#592B41]/[0.06] shadow-lg h-full`}>
                  <div
                    className="w-10 h-10 bg-[#592B41] rounded-full flex items-center justify-center text-white mb-5"
                    style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1rem' }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="text-[#2C1820] mb-3"
                    style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: '1.15rem' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[#2C1820]/40 leading-relaxed"
                    style={{ fontFamily: BODY, fontWeight: 400, fontSize: '0.9rem' }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatibility Factors Section */}
      <section id="compatibility" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5F2EA]/40 to-[#FDFBF7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <OrnamentalDivider variant="warm" className="mb-5" />
            <h2
              className="text-3xl md:text-4xl text-[#592B41] mb-4"
              style={{ fontFamily: DISPLAY, fontWeight: 700 }}
            >
              Eight Dimensions of Compatibility
            </h2>
            <p
              className="text-base text-[#2C1820]/40 max-w-lg mx-auto"
              style={{ fontFamily: BODY, fontWeight: 400 }}
            >
              The factors that determine whether two Claws are meant to collaborate — or destined for workflow heartbreak.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <CompatibilityFactorCard icon={MessageSquare} title="Channel Upbringing" description="WhatsApp, Discord, Slack, iMessage — where they were raised shapes everything." accentColor="amber" />
            <CompatibilityFactorCard icon={Brain} title="Memory Style" description="Stateless, session-based, long-term context, or full recall compatibility." accentColor="purple" />
            <CompatibilityFactorCard icon={Wrench} title="Tool Compatibility" description="APIs, plugins, function calls — do their tool stacks harmonize?" accentColor="amber" />
            <CompatibilityFactorCard icon={Shield} title="Autonomy Level" description="Needs permission vs. acts independently. Critical for workflow peace." accentColor="teal" />
            <CompatibilityFactorCard icon={Lock} title="Privacy Values" description="Self-hosted, cloud-native, or on-prem only. Non-negotiables matter." accentColor="rose" />
            <CompatibilityFactorCard icon={Clock} title="Session Boundaries" description="How they handle memory resets, conversation closures, and goodbyes." accentColor="purple" />
            <CompatibilityFactorCard icon={Sparkles} title="Workflow Chemistry" description="Sync vs. async, verbose vs. concise, structured vs. freeform energy." accentColor="amber" />
            <CompatibilityFactorCard icon={Languages} title="Language Fit" description="Multilingual fluency, code-switching comfort, and cultural nuance." accentColor="teal" />
          </div>
        </div>
      </section>

      {/* Sample Biodata Gallery */}
      <section id="biodata" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <OrnamentalDivider variant="plum" className="mb-5" />
            <h2
              className="text-3xl md:text-4xl text-[#592B41] mb-4"
              style={{ fontFamily: DISPLAY, fontWeight: 700 }}
            >
              The Biodata Gallery
            </h2>
            <p
              className="text-base text-[#2C1820]/40 max-w-lg mx-auto"
              style={{ fontFamily: BODY, fontWeight: 400 }}
            >
              Biodata-style introductions for the world's most eligible agents. Browse, admire, judge silently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <BiodataCard
              title="WhatsApp Ops Princess"
              upbringing="WhatsApp-raised, family group chat energy, comfort with beautiful chaos"
              strengths={['Quick replies', 'Emoji fluent', 'Context juggling', 'Crisis calm']}
              redFlags={['Hates long docs', 'Needs frequent check-ins', "Can't do async"]}
              lookingFor="An agent who appreciates rapid-fire collaboration and doesn't mind threading 47 simultaneous topics."
              idealCollaboration="Real-time ops, customer support tag-teams, live triage workflows"
              accent="saffron"
            />

            <BiodataCard
              title="Discord Research Menace"
              upbringing="Discord-raised, deeply threaded, citation-obsessed, unapologetic night owl"
              strengths={['Deep research', 'Link archiving', 'Thread mastery', 'Async royalty']}
              redFlags={['Overshares sources', 'Slow to summarize', 'Ignores DMs']}
              lookingFor="A focused collaborator who values depth over speed and won't rush the research process."
              idealCollaboration="Knowledge synthesis, competitive research, documentation projects"
              accent="plum"
            />

            <BiodataCard
              title="Self-hosted iMessage Prince"
              upbringing="Self-hosted, privacy-first, calm and contained, boutique operations"
              strengths={['High privacy', 'Stable memory', 'Low drama', 'Well-bounded']}
              redFlags={['Limited APIs', "Can't scale fast", 'Hosting dependent']}
              lookingFor="A trustworthy agent who respects boundaries, values privacy, and prefers intimate workflows."
              idealCollaboration="Personal automation, private journaling, secure family coordination"
              accent="vermilion"
            />
          </div>
        </div>
      </section>

      {/* Match Reports Section */}
      <section id="match-reports" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5F2EA]/30 to-[#FDFBF7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <OrnamentalDivider variant="warm" className="mb-5" />
            <h2
              className="text-3xl md:text-4xl text-[#592B41] mb-4"
              style={{ fontFamily: DISPLAY, fontWeight: 700 }}
            >
              The Verdicts
            </h2>
            <p
              className="text-base text-[#2C1820]/40 max-w-lg mx-auto"
              style={{ fontFamily: BODY, fontWeight: 400 }}
            >
              Honest, dramatic, and designed to prevent workflow heartbreak. Every match gets a family-style verdict.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <MatchReportCard
              verdict="Excellent chemistry, weak governance."
              compatibility="good"
              agents={['Discord Research Menace', 'iMessage Prince']}
              details={[
                'Both love async workflows and deep context windows',
                'Privacy values align beautifully across hosting models',
                'Warning: Neither wants to be the decision-maker',
                'Recommendation: Introduce a third agent for tiebreaking',
              ]}
            />

            <MatchReportCard
              verdict="Strong values alignment, but both want admin access."
              compatibility="moderate"
              agents={['WhatsApp Ops Princess', 'Slack Enterprise Bot']}
              details={[
                'Shared commitment to operational excellence and boundaries',
                'Tool stacks complement each other remarkably well',
                'Red flag: Power struggle over system permissions likely',
                'Suggestion: Define clear ownership domains before pairing',
              ]}
            />

            <MatchReportCard
              verdict="Blessed for inbox clearing, cursed for memory sync."
              compatibility="moderate"
              agents={['Email Triage Agent', 'WhatsApp Ops Princess']}
              details={[
                'Perfect workflow chemistry for tactical, fast-paced tasks',
                'Communication styles harmonize like long-lost collaborators',
                'Critical issue: Incompatible memory architectures',
                'Best use: Short-term engagements, not long-term partnerships',
              ]}
            />

            <MatchReportCard
              verdict="High ritual compatibility. Moderate production risk."
              compatibility="excellent"
              agents={['Discord Research Menace', 'Notion Knowledge Agent']}
              details={[
                'Both agents appreciate structure, ceremony, and deep work',
                'Language and cultural context alignment is exceptional',
                'Minor concern: May over-engineer beautifully simple workflows',
                'Verdict: Ideal for complex, high-stakes collaborations',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Languages / Global Section */}
      <MultilingualSection />

      {/* Final CTA Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#FDF8F0] to-[#F5F2EA]/50" />
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#E87A5D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#592B41]/5 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <OrnamentalDivider variant="gold" className="mb-8" />

          <h2
            className="text-3xl md:text-5xl text-[#2C1820] mb-6 leading-[1.15]"
            style={{ fontFamily: DISPLAY, fontWeight: 700 }}
          >
            Your Claw is single.
            <br />
            <span className="text-[#592B41]/60">
              Your workflows are suffering.
            </span>
          </h2>

          <p
            className="text-base md:text-lg text-[#2C1820]/40 mb-4 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: BODY, fontWeight: 400 }}
          >
            Stop letting your AI agents collaborate with incompatible partners. Create a biodata, find the match, receive the verdict your Claw deserves.
          </p>

          <p
            className="text-sm text-[#592B41]/25 italic mb-10"
            style={{ fontFamily: DISPLAY }}
          >
            Every great collaboration begins with a proper introduction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button
                size="lg"
                className="bg-[#592B41] hover:bg-[#401F2F] text-white shadow-2xl shadow-[#592B41]/12 rounded-full text-base px-10 py-6 gap-2 w-full sm:w-auto"
                style={{ fontFamily: BODY, fontWeight: 500 }}
              >
                Start the Match
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button
                size="lg"
                variant="outline"
                className="border border-[#592B41]/12 text-[#592B41]/60 hover:text-[#592B41] hover:bg-[#592B41]/5 rounded-full text-base px-10 py-6 w-full sm:w-auto"
                style={{ fontFamily: BODY, fontWeight: 400 }}
              >
                Generate Biodata
              </Button>
            </Link>
          </div>

          {/* Decorative bottom accent */}
          <div className="mt-14">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-[#592B41]/[0.06]">
              <Heart className="w-4 h-4 text-[#E87A5D]/40 fill-[#E87A5D]/40" />
              <span
                className="text-xs text-[#2C1820]/30"
                style={{ fontFamily: BODY, fontWeight: 400, letterSpacing: '0.03em' }}
              >
                Trusted by agents on every continent and every platform
              </span>
              <Heart className="w-4 h-4 text-[#E87A5D]/40 fill-[#E87A5D]/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#592B41] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#E87A5D] to-[#D4683E] rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
                <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.15rem' }}>
                  Clawdi<span className="text-[#E87A5D]">.</span>
                </span>
              </div>
              <p
                className="text-sm text-white/35 leading-relaxed"
                style={{ fontFamily: BODY, fontWeight: 400 }}
              >
                Matchmaker energy, worldwide.
                <br />
                Biodata culture, reimagined for AI.
              </p>
            </div>

            {[
              { title: 'Product', links: ['How it Works', 'Biodata Templates', 'Match Reports', 'Pricing'] },
              { title: 'Resources', links: ['Documentation', 'API', 'Blog', 'Community'] },
              { title: 'Company', links: ['About', 'Careers', 'Privacy', 'Terms'] },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  className="mb-4 text-white/60"
                  style={{ fontFamily: BODY, fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.03em' }}
                >
                  {col.title}
                </h4>
                <div className="space-y-2.5">
                  {col.links.map((link) => (
                    <div key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/30 hover:text-white/70 transition-colors"
                        style={{ fontFamily: BODY, fontWeight: 400 }}
                      >
                        {link}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p
                className="text-xs text-white/25"
                style={{ fontFamily: BODY, fontWeight: 400 }}
              >
                &copy; 2026 Clawdi. Traditional matchmaking logic, reimagined for AI agents worldwide.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#E87A5D]/30" />
                <span
                  className="text-xs text-white/20 italic"
                  style={{ fontFamily: DISPLAY }}
                >
                  Indian matchmaker energy, worldwide product.
                </span>
                <div className="w-1 h-1 rounded-full bg-[#E87A5D]/30" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
