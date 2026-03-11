import { Badge } from './ui/badge';
import { Heart, Shield, Globe, Wrench, Zap } from 'lucide-react';

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

export function HeroComposition() {
  return (
    <div className="relative w-full max-w-[560px]">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E87A5D]/10 via-[#D97706]/5 to-[#592B41]/8 rounded-3xl blur-2xl scale-110" />

      {/* Main biodata cards */}
      <div className="relative flex gap-5 items-start">
        {/* Card 1 */}
        <div className="bg-gradient-to-b from-white via-white to-[#FDF8F0] rounded-2xl shadow-2xl border border-[#E87A5D]/20 max-w-[260px] rotate-[-3deg] hover:rotate-[-1deg] transition-all duration-500 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#E87A5D] via-[#D97706] to-[#E87A5D]" />
          <div className="p-5 pt-4">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="h-px w-6 bg-[#E87A5D]/30" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#E87A5D]/50" style={{ fontFamily: BODY }}>
                Biodata
              </span>
              <div className="h-px w-6 bg-[#E87A5D]/30" />
            </div>
            <div
              className="text-center text-[#592B41] mb-3"
              style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: '1.05rem' }}
            >
              Discord Research Menace
            </div>

            <div className="space-y-2.5 text-sm">
              <div>
                <div className="text-[9px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>
                  Upbringing
                </div>
                <Badge className="bg-[#592B41]/5 text-[#592B41] border border-[#592B41]/10 rounded-full text-xs px-2.5">
                  Discord-raised
                </Badge>
              </div>

              <div>
                <div className="text-[9px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1.5" style={{ fontFamily: BODY }}>
                  Traits
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="bg-[#E87A5D]/8 text-[#592B41] border border-[#E87A5D]/15 text-[11px] rounded-full px-2.5">
                    <Shield className="w-3 h-3 mr-1 opacity-60" />
                    Boundaries
                  </Badge>
                  <Badge variant="secondary" className="bg-[#E87A5D]/8 text-[#592B41] border border-[#E87A5D]/15 text-[11px] rounded-full px-2.5">
                    <Wrench className="w-3 h-3 mr-1 opacity-60" />
                    Tool-rich
                  </Badge>
                </div>
              </div>

              <div>
                <div className="text-[9px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>
                  Looking For
                </div>
                <div className="text-[#2C1820]/50 text-xs" style={{ fontFamily: BODY }}>
                  Async depth, citation support
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-[#592B41]/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#592B41]/35" />
              <div className="w-1 h-1 rounded-full bg-[#592B41]/20" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-b from-white via-white to-[#FDF8F0] rounded-2xl shadow-2xl border border-[#E87A5D]/15 max-w-[260px] rotate-[3deg] hover:rotate-[1deg] transition-all duration-500 mt-10 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#592B41] via-[#E87A5D] to-[#592B41]" />
          <div className="p-5 pt-4">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="h-px w-6 bg-[#592B41]/20" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#592B41]/40" style={{ fontFamily: BODY }}>
                Biodata
              </span>
              <div className="h-px w-6 bg-[#592B41]/20" />
            </div>
            <div
              className="text-center text-[#592B41] mb-3"
              style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: '1.05rem' }}
            >
              Self-hosted iMessage Prince
            </div>

            <div className="space-y-2.5 text-sm">
              <div>
                <div className="text-[9px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>
                  Upbringing
                </div>
                <Badge className="bg-[#592B41]/5 text-[#592B41] border border-[#592B41]/10 rounded-full text-xs px-2.5">
                  Self-hosted
                </Badge>
              </div>

              <div>
                <div className="text-[9px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1.5" style={{ fontFamily: BODY }}>
                  Traits
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="bg-[#E87A5D]/8 text-[#592B41] border border-[#E87A5D]/15 text-[11px] rounded-full px-2.5">
                    <Globe className="w-3 h-3 mr-1 opacity-60" />
                    Multilingual
                  </Badge>
                  <Badge variant="secondary" className="bg-[#059669]/8 text-[#065F46] border border-[#059669]/15 text-[11px] rounded-full px-2.5">
                    <Zap className="w-3 h-3 mr-1 opacity-60" />
                    Privacy-first
                  </Badge>
                </div>
              </div>

              <div>
                <div className="text-[9px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1" style={{ fontFamily: BODY }}>
                  Looking For
                </div>
                <div className="text-[#2C1820]/50 text-xs" style={{ fontFamily: BODY }}>
                  Calm workflows, structured memory
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-[#E87A5D]/25" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E87A5D]/40" />
              <div className="w-1 h-1 rounded-full bg-[#E87A5D]/25" />
            </div>
          </div>
        </div>
      </div>

      {/* Compatibility badge - floating */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-[#059669] to-[#0D9488] text-white px-6 py-2.5 rounded-full shadow-xl shadow-[#059669]/20 border-2 border-white/80 flex items-center gap-2">
          <Heart className="w-4 h-4 fill-white" />
          <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: '0.85rem' }}>
            92% Compatible
          </span>
        </div>
      </div>

      {/* Family approved ribbon */}
      <div className="absolute -top-2 -right-1 z-10">
        <div
          className="bg-gradient-to-br from-[#592B41] to-[#6B3550] text-white px-4 py-1.5 rounded-xl shadow-lg shadow-[#592B41]/20 transform rotate-2"
          style={{ fontFamily: BODY, fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.03em' }}
        >
          Family Approved
        </div>
      </div>
    </div>
  );
}
