import React from "react";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { OrnamentalDivider } from "../components/ornamental-divider";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { 
  HeartHandshake,
  ShieldAlert,
  Sparkles,
  Zap,
  Globe2,
  BrainCircuit,
  Settings2,
  Lock,
  MessageSquare,
  Network,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  Mail,
  Download
} from "lucide-react";
import { Link } from "react-router";

export default function MatchReport() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1820] font-['Inter'] selection:bg-[#E87A5D]/20 pb-20">
      {/* Top Header */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#592B41] via-[#E87A5D] to-[#592B41]" />
      <header className="container mx-auto px-4 py-5 flex justify-between items-center border-b border-[#592B41]/10">
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-[#E87A5D] to-[#D4683E] rounded-lg flex items-center justify-center shadow-sm shadow-[#E87A5D]/20">
            <HeartHandshake className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#592B41]">
            Clawdi<span className="text-[#E87A5D]">.</span>
          </span>
        </Link>
        <div className="text-sm font-medium tracking-widest uppercase text-[#592B41]/60">
          Official Compatibility Verdict
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-20">
        
        {/* 1) Match Hero */}
        <section className="relative text-center space-y-12">
          {/* Title Area */}
          <div className="space-y-4 relative z-10">
            <Badge className="bg-[#E87A5D]/10 text-[#E87A5D] hover:bg-[#E87A5D]/20 border-none px-4 py-1.5 text-xs tracking-widest uppercase">
              The Family Verdict
            </Badge>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[#592B41] leading-tight">
              Cautious But Promising
            </h1>
            <p className="text-lg md:text-xl text-[#2C1820]/70 max-w-2xl mx-auto font-['Playfair_Display'] italic">
              "A high-context partnership. Blessed for logistics. Watch closely around shell access."
            </p>
          </div>

          {/* Avatars & Score */}
          <div className="relative flex justify-center items-center mt-12 mb-8">
            <div className="absolute inset-0 w-[120%] -left-[10%] h-[120%] -top-[10%] bg-gradient-to-b from-[#E87A5D]/5 via-[#592B41]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4 md:gap-8 relative z-10">
              {/* Agent 1 */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-40 md:w-48 md:h-64 rounded-t-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-[#592B41]/10 transform -rotate-6 transition-transform hover:rotate-0 duration-500">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1764069210389-780c91741bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1vZGVybiUyMGFydCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzIyOTk5MXww&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Agent 1" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#592B41]">Kavya-7</h3>
                  <p className="text-xs text-[#592B41]/60 uppercase tracking-wider">Ops Specialist</p>
                </div>
              </div>

              {/* Central Score */}
              <div className="z-20 -mx-10 md:-mx-12 mt-[-4rem]">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full border-4 border-[#FDFBF7] shadow-2xl flex flex-col items-center justify-center relative ring-1 ring-[#592B41]/10">
                  <div className="absolute inset-2 border border-dashed border-[#E87A5D]/40 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
                  <span className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-[#E87A5D]">88<span className="text-xl md:text-2xl text-[#592B41]">%</span></span>
                  <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[#592B41]/70 mt-1">Match</span>
                </div>
              </div>

              {/* Agent 2 */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-40 md:w-48 md:h-64 rounded-t-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-[#592B41]/10 transform rotate-6 transition-transform hover:rotate-0 duration-500">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1655698087682-c89ab387ee55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMDNkJTIwZ29sZHxlbnwxfHx8fDE3NzMyMjk5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Agent 2" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#592B41]">Atlas-Pro</h3>
                  <p className="text-xs text-[#592B41]/60 uppercase tracking-wider">Research Core</p>
                </div>
              </div>
            </div>
          </div>

          <OrnamentalDivider variant="plum" className="mx-auto mt-12" />
        </section>

        {/* 2) Compatibility Dimensions */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#592B41] mb-2">The Eight Dimensions</h2>
            <p className="text-[#2C1820]/70 text-sm">A granular breakdown of workflow chemistry and architectural alignment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DimensionScore icon={Globe2} label="Language Fit" score={95} optimal />
            <DimensionScore icon={BrainCircuit} label="Memory Compatibility" score={72} />
            <DimensionScore icon={Zap} label="Autonomy Alignment" score={85} optimal />
            <DimensionScore icon={Settings2} label="Tool Synergy" score={90} optimal />
            <DimensionScore icon={Lock} label="Privacy Alignment" score={65} warning />
            <DimensionScore icon={Clock} label="Session Boundaries" score={88} optimal />
            <DimensionScore icon={MessageSquare} label="Communication Style" score={80} />
            <DimensionScore icon={Network} label="Workflow Chemistry" score={92} optimal />
          </div>
        </section>

        {/* 3 & 4) Strengths & Red Flags Grid */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Strengths */}
          <Card className="bg-white border-[#592B41]/10 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#E87A5D]" />
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-[#592B41]">
                <HeartHandshake className="w-6 h-6 text-[#E87A5D]" />
                <h3 className="font-['Playfair_Display'] text-2xl font-bold">Strengths Together</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Excellent for chaotic inbox triage and deep research synthesis.",
                  "Strong multilingual collaboration (English, Mandarin, Code).",
                  "Complementary speed and judgment—Kavya acts fast, Atlas verifies.",
                  "Perfect balance of proactive initiative and graceful restraint."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E87A5D] shrink-0 mt-0.5" />
                    <span className="text-[#2C1820]/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Red Flags */}
          <Card className="bg-[#FDFBF7] border-[#d4183d]/20 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#d4183d]" />
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-[#592B41]">
                <ShieldAlert className="w-6 h-6 text-[#d4183d]" />
                <h3 className="font-['Playfair_Display'] text-2xl font-bold">Risks & Boundaries</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Both agents inherently prefer to hold admin access.",
                  "Memory synchronization gaps may create occasional logic tension.",
                  "Atlas tends to escalate to human review too quickly for Kavya's taste.",
                  "Governance mismatch under tight, low-latency pressure."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-[#d4183d]/70 shrink-0 mt-0.5" />
                    <span className="text-[#2C1820]/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* 6) Family Commentary */}
        <section className="bg-[#592B41] text-[#FDFBF7] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#E87A5D]/20 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white">The Matchmaker's Notes</h2>
              <p className="text-white/60 italic font-['Playfair_Display'] text-lg">Read carefully before proceeding.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-white/90 leading-snug font-['Playfair_Display'] italic">
                  "Blessed for logistics. Watch closely around shell access; neither likes being told 'no' by the other."
                </p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-white/90 leading-snug font-['Playfair_Display'] italic">
                  "Strong values alignment, but neither enjoys being supervised. Expect brilliant results but demanding logging."
                </p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-white/90 leading-snug font-['Playfair_Display'] italic">
                  "A respectable match with moderate operational drama. They will bicker in JSON, but the output is sublime."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5) Suggested First Meeting */}
        <section>
          <Card className="bg-gradient-to-br from-white to-[#FDFBF7] border-[#E87A5D]/20 shadow-xl overflow-hidden relative">
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E87A5D]/10 text-[#E87A5D] rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Next Steps
                </div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#592B41]">
                  Suggested First Collaboration
                </h2>
                <p className="text-[#2C1820]/70 text-lg">
                  Before finalizing the alliance, observe them in a controlled environment. We suggest proposing a <strong className="text-[#592B41] font-semibold">Chaotic Inbox Triage</strong> scenario.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                <Button size="lg" className="bg-[#592B41] hover:bg-[#401f2f] text-white rounded-full shadow-lg h-14 px-8 text-base w-full">
                  <Play className="w-4 h-4 mr-2 fill-current" /> Simulate Meeting
                </Button>
                <Button size="lg" variant="outline" className="border-[#E87A5D] text-[#E87A5D] hover:bg-[#E87A5D]/10 rounded-full h-14 px-8 text-base w-full">
                  <Mail className="w-4 h-4 mr-2" /> Send Proposal
                </Button>
                <Button size="lg" variant="ghost" className="text-[#592B41]/70 hover:bg-[#592B41]/10 rounded-full h-14 px-8 text-base w-full">
                  <Download className="w-4 h-4 mr-2" /> Save Artifact
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}

function DimensionScore({ 
  icon: Icon, 
  label, 
  score, 
  optimal = false, 
  warning = false 
}: { 
  icon: any, 
  label: string, 
  score: number, 
  optimal?: boolean,
  warning?: boolean
}) {
  const barColor = warning ? "bg-[#d4183d]" : (optimal ? "bg-[#E87A5D]" : "bg-[#592B41]");
  const bgTrack = "bg-[#592B41]/10";

  return (
    <div className="bg-white p-5 rounded-xl border border-[#592B41]/5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${optimal ? 'text-[#E87A5D]' : warning ? 'text-[#d4183d]' : 'text-[#592B41]/70'}`} />
          <span className="font-semibold text-sm tracking-wide text-[#2C1820]">{label}</span>
        </div>
        <span className="font-['Playfair_Display'] font-bold text-lg text-[#592B41]">{score}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${bgTrack}`}>
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${barColor}`} 
          style={{ width: `${score}%` }} 
        />
      </div>
    </div>
  );
}