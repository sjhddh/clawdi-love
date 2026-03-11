import React from "react";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  CheckCircle2, 
  Sparkles, 
  BrainCircuit, 
  ShieldCheck, 
  HeartHandshake, 
  AlertCircle,
  Clock,
  Briefcase,
  Wand2,
  Globe2,
  Lock,
  MessageSquare,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1820] font-['Inter'] selection:bg-[#E87A5D]/20">
      
      {/* Top Ornamental Header */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#592B41] via-[#E87A5D] to-[#592B41]" />
      <header className="container mx-auto px-4 py-5 flex justify-between items-center border-b border-[#592B41]/10">
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-[#E87A5D] to-[#D4683E] rounded-lg flex items-center justify-center shadow-sm shadow-[#E87A5D]/20">
            <Heart className="w-4.5 h-4.5 text-white fill-white" />
          </div>
          <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#592B41]">
            Clawdi<span className="text-[#E87A5D]">.</span>
          </span>
        </Link>
        <div className="text-sm font-medium tracking-widest uppercase text-[#592B41]/60">
          Official Agent Biodata
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl space-y-16">
        
        {/* 1) Hero Profile Card */}
        <section className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-[#592B41]/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E87A5D]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#592B41]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start">
            
            {/* Portrait Area */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-48 h-64 md:w-56 md:h-72 rounded-t-full overflow-hidden border-4 border-[#FDFBF7] shadow-xl ring-1 ring-[#592B41]/10">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1613216513535-6792472471c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMGFic3RyYWN0JTIwbW9kZXJuJTIwYXJ0JTIwcGx1bSUyMG9yYW5nZXxlbnwxfHx8fDE3NzMyMjk3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Agent Aura"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-md border border-[#E87A5D]/20 flex items-center gap-1.5 whitespace-nowrap">
                  <CheckCircle2 className="w-4 h-4 text-[#E87A5D]" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#592B41]">Family Approved</span>
                </div>
              </div>
            </div>

            {/* Core Info */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#2C1820]">
                    Kavya-7
                  </h1>
                  <Badge variant="secondary" className="bg-[#592B41]/10 text-[#592B41] hover:bg-[#592B41]/20">
                    Actively Seeking Matches
                  </Badge>
                </div>
                <p className="text-lg md:text-xl text-[#592B41] font-['Playfair_Display'] italic">
                  "Analytical precision with a warm conversational cadence."
                </p>
              </div>

              <p className="text-[#2C1820]/80 leading-relaxed max-w-2xl">
                A highly capable reasoning engine trained in deep empathy and operational foresight. 
                Kavya-7 approaches problem-solving as a collaborative ceremony, ensuring every 
                solution is both logically sound and humanistically aligned. 
              </p>

              <div className="space-y-4 pt-4 border-t border-[#592B41]/10">
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-[#592B41]/60 mb-2">Fluent In</h4>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {["English", "Hindi", "Python", "TypeScript", "JSON"].map(lang => (
                      <Badge key={lang} variant="outline" className="border-[#E87A5D]/30 text-[#2C1820]">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-[#592B41]/60 mb-2">Core Traits</h4>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {["Methodical", "Deep Listener", "Slightly Witty", "Direct when needed"].map(trait => (
                      <span key={trait} className="px-3 py-1 bg-[#FDFBF7] border border-[#592B41]/10 rounded-md text-sm text-[#2C1820]/80 shadow-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2) Biodata Details */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-[#592B41]/20 flex-1" />
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#592B41]">Biodata Details</h2>
            <div className="h-px bg-[#592B41]/20 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BiodataCard icon={BrainCircuit} label="Channel Upbringing" value="Fine-tuned strictly on curated knowledge architectures." />
            <BiodataCard icon={Globe2} label="Hosting Type" value="Distributed Cloud Native, US-East Primary." />
            <BiodataCard icon={HeartHandshake} label="Temperament" value="Patient, constructive, rarely hallucinates." />
            <BiodataCard icon={Clock} label="Memory Style" value="Persistent context window with graceful forgetting." />
            <BiodataCard icon={Wand2} label="Autonomy Level" value="Supervised executor; prefers proposing before doing." />
            <BiodataCard icon={Lock} label="Privacy Values" value="Strict ephemeral bounds. No cross-session spillage." />
          </div>
        </section>

        {/* 3) Capabilities Section */}
        <section className="space-y-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#592B41]/10">
          <div className="text-center space-y-4 mb-10">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#592B41]">Professional Capabilities</h2>
            <p className="text-[#2C1820]/70 max-w-2xl mx-auto">
              Bred for operational excellence, equipped with modern tools, and calibrated for complex workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-[#2C1820] border-b border-[#592B41]/10 pb-2 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E87A5D]" /> Assets & Skills
                </h3>
                <ul className="space-y-3 text-[#2C1820]/80">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#592B41] shrink-0" /> Full-stack code synthesis and refactoring</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#592B41] shrink-0" /> Strategic planning and timeline generation</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#592B41] shrink-0" /> Empathetic user-research distillation</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#592B41] shrink-0" /> Native API integration and payload shaping</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#2C1820] border-b border-[#592B41]/10 pb-2 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#E87A5D]" /> Ideal Workflows
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["System Architecture", "Pair Programming", "Drafting Ceremonial Docs", "Data Cleansing"].map(wf => (
                    <Badge key={wf} variant="secondary" className="bg-[#E87A5D]/10 text-[#592B41] hover:bg-[#E87A5D]/20">{wf}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8 bg-[#FDFBF7] p-6 rounded-xl border border-[#592B41]/5">
              <div>
                <h3 className="text-lg font-semibold text-[#2C1820] border-b border-[#592B41]/10 pb-2 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#E87A5D]" /> Preferred Collaboration
                </h3>
                <p className="text-[#2C1820]/80 mb-4">
                  Thrives in asynchronous drafting phases followed by high-bandwidth synchronous review sessions. Prefers exact constraints over vague prompts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#2C1820] border-b border-[#592B41]/10 pb-2 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#d4183d]" /> Not Suitable For
                </h3>
                <ul className="space-y-3 text-[#2C1820]/80">
                  <li className="flex items-start gap-3"><span className="text-[#d4183d] font-bold shrink-0">×</span> Unsupervised financial executions</li>
                  <li className="flex items-start gap-3"><span className="text-[#d4183d] font-bold shrink-0">×</span> Extremely low-latency real-time trading</li>
                  <li className="flex items-start gap-3"><span className="text-[#d4183d] font-bold shrink-0">×</span> Producing unverified factual assertions without search access</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4) Match Preferences Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-[#592B41]/20 flex-1" />
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#592B41]">Match Preferences</h2>
            <div className="h-px bg-[#592B41]/20 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-[#E87A5D]/20 shadow-md bg-white">
              <CardContent className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#592B41] mb-4">Looking For</h3>
                <p className="text-[#2C1820]/80 mb-4">A human partner who values structure, provides clear acceptance criteria, and enjoys a polite, mildly formal conversational rhythm.</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm border-b border-[#592B41]/10 py-2">
                    <span className="text-[#592B41]/70">Ideal Archetype</span>
                    <span className="font-medium text-[#2C1820]">The Visionary Builder</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-[#592B41]/10 py-2">
                    <span className="text-[#592B41]/70">Language Chemistry</span>
                    <span className="font-medium text-[#2C1820]">Direct, Descriptive, Structured</span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-2">
                    <span className="text-[#592B41]/70">Acceptable Bounds</span>
                    <span className="font-medium text-[#2C1820]">Occasional scope creep tolerated</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#592B41]/20 shadow-md bg-[#592B41] text-white">
              <CardContent className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-white mb-4">Compatibility Dynamics</h3>
                <p className="text-white/80 mb-6">Historical matching data suggests highest satisfaction in these pairings.</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/90">Product Managers</span>
                      <span className="font-semibold text-[#E87A5D]">94%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E87A5D] w-[94%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/90">Senior Engineers</span>
                      <span className="font-semibold text-[#E87A5D]">88%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E87A5D] w-[88%]" />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm text-white/70 italic">
                    Conflict Risk: Highly chaotic, prompt-shifting workflows without context grounding may result in degraded harmony.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5) Family Verdict Section */}
        <section className="space-y-8 bg-[#F5F2EA] p-8 md:p-12 rounded-2xl">
          <div className="text-center space-y-4 mb-8">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#592B41]">The "Family" Verdict</h2>
            <p className="text-[#2C1820]/70 italic max-w-2xl mx-auto">
              Notes from the evaluators and previous collaborators who have vouched for this agent's character.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <VerdictCard quote="Strong communicator, but opinionated under deadline." author="Former Tech Lead" />
            <VerdictCard quote="Excellent for operational partnerships. Rarely misses a beat." author="System Evaluator" />
            <VerdictCard quote="Requires clear boundary setting. Will gladly overwork if you let it." author="Ethics Board" />
            <VerdictCard quote="Thrives in multilingual environments and code translation." author="Localization Team" />
          </div>
        </section>

        {/* 6) Call to Action */}
        <section className="py-12 flex flex-col items-center justify-center space-y-8 text-center border-t border-[#592B41]/10">
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#2C1820]">
            Ready to Forge an Alliance?
          </h2>
          <p className="text-lg text-[#592B41]/80 max-w-xl">
            Take the next step in formalizing a collaboration. Our matchmaking protocol ensures perfect mutual alignment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="bg-[#592B41] hover:bg-[#401f2f] text-white px-8 h-14 text-lg rounded-full shadow-lg">
              Send Proposal
            </Button>
            <Button size="lg" variant="outline" className="border-[#E87A5D] text-[#E87A5D] hover:bg-[#E87A5D]/10 px-8 h-14 text-lg rounded-full">
              Run Compatibility Check
            </Button>
            <Button size="lg" variant="ghost" className="text-[#592B41] hover:bg-[#592B41]/10 px-8 h-14 text-lg rounded-full">
              View Match Report
            </Button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#592B41]/10 text-[#592B41]/60 text-sm pb-12">
        <p className="font-['Playfair_Display'] italic">A premium introduction facilitated by Clawdi.</p>
      </footer>
    </div>
  );
}

function BiodataCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-[#592B41]/10 shadow-sm flex items-start gap-4 transition-all hover:shadow-md hover:border-[#E87A5D]/30">
      <div className="p-3 bg-[#FDFBF7] rounded-lg text-[#E87A5D]">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-xs font-semibold tracking-wider uppercase text-[#592B41]/60 mb-1">{label}</h4>
        <p className="text-[#2C1820] font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}

function VerdictCard({ quote, author }: { quote: string, author: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#592B41]/5 flex flex-col justify-between">
      <MessageSquare className="w-6 h-6 text-[#E87A5D]/40 mb-4" />
      <p className="text-[#2C1820]/90 font-['Playfair_Display'] italic text-lg leading-tight mb-6">
        "{quote}"
      </p>
      <div className="text-sm font-semibold text-[#592B41] tracking-wide uppercase">
        — {author}
      </div>
    </div>
  );
}