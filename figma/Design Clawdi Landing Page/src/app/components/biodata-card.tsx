import { Badge } from './ui/badge';

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

interface BiodataCardProps {
  title: string;
  upbringing: string;
  strengths: string[];
  redFlags: string[];
  lookingFor: string;
  idealCollaboration: string;
  size?: 'default' | 'compact';
  accent?: 'saffron' | 'plum' | 'vermilion';
}

export function BiodataCard({
  title,
  upbringing,
  strengths,
  redFlags,
  lookingFor,
  idealCollaboration,
  size = 'default',
  accent = 'saffron'
}: BiodataCardProps) {
  const isCompact = size === 'compact';

  const accentStyles = {
    saffron: {
      border: 'border-[#E87A5D]/20',
      topLine: 'from-[#E87A5D] via-[#D97706] to-[#E87A5D]',
      bottomLine: 'from-[#E87A5D]/20 via-[#E87A5D]/40 to-[#E87A5D]/20',
      glow: 'shadow-[#E87A5D]/8',
      titleColor: 'text-[#592B41]',
      cornerDot: 'bg-[#E87A5D]',
    },
    plum: {
      border: 'border-[#592B41]/15',
      topLine: 'from-[#592B41] via-[#6B3550] to-[#592B41]',
      bottomLine: 'from-[#592B41]/20 via-[#592B41]/35 to-[#592B41]/20',
      glow: 'shadow-[#592B41]/8',
      titleColor: 'text-[#592B41]',
      cornerDot: 'bg-[#592B41]',
    },
    vermilion: {
      border: 'border-[#D97706]/20',
      topLine: 'from-[#D97706] via-[#E87A5D] to-[#D97706]',
      bottomLine: 'from-[#D97706]/20 via-[#D97706]/35 to-[#D97706]/20',
      glow: 'shadow-[#D97706]/8',
      titleColor: 'text-[#592B41]',
      cornerDot: 'bg-[#D97706]',
    },
  };

  const s = accentStyles[accent];

  return (
    <div
      className={`relative bg-gradient-to-b from-white via-white to-[#FDF8F0]/50 rounded-2xl border ${s.border} shadow-xl ${s.glow} overflow-hidden group hover:shadow-2xl transition-all duration-500 ${isCompact ? 'max-w-xs' : ''}`}
    >
      {/* Ornamental top border */}
      <div className={`h-1 w-full bg-gradient-to-r ${s.topLine}`} />

      {/* Corner ornaments */}
      <div className={`absolute top-3 left-3 w-2 h-2 rounded-full ${s.cornerDot} opacity-20`} />
      <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${s.cornerDot} opacity-20`} />

      <div className="p-6 pt-5">
        {/* Title with decorative flourish */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`h-px w-8 bg-gradient-to-r ${s.topLine} opacity-30`} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E87A5D]/50" style={{ fontFamily: BODY }}>
              Biodata
            </span>
            <div className={`h-px w-8 bg-gradient-to-l ${s.topLine} opacity-30`} />
          </div>
          <div
            className={`${isCompact ? 'text-lg' : 'text-xl'} ${s.titleColor}`}
            style={{ fontFamily: DISPLAY, fontWeight: 600 }}
          >
            {title}
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1.5" style={{ fontFamily: BODY }}>
              Upbringing
            </div>
            <div className="text-[#2C1820]/70" style={{ fontFamily: BODY, fontWeight: 400 }}>{upbringing}</div>
          </div>

          <div>
            <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-2" style={{ fontFamily: BODY }}>
              Strengths
            </div>
            <div className="flex flex-wrap gap-1.5">
              {strengths.map((strength, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-[#E87A5D]/8 text-[#592B41] border border-[#E87A5D]/15 rounded-full px-3 py-0.5 text-xs"
                  style={{ fontFamily: BODY, fontWeight: 500 }}
                >
                  {strength}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#D4183D]/50 uppercase tracking-[0.15em] mb-2" style={{ fontFamily: BODY }}>
              Red Flags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {redFlags.map((flag, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-[#D4183D]/6 text-[#D4183D]/80 border border-[#D4183D]/12 rounded-full px-3 py-0.5 text-xs"
                  style={{ fontFamily: BODY, fontWeight: 500 }}
                >
                  {flag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#592B41]/10 to-transparent" />

          <div>
            <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1.5" style={{ fontFamily: BODY }}>
              Looking For
            </div>
            <div className="text-[#2C1820]/65 leading-relaxed" style={{ fontFamily: BODY, fontWeight: 400 }}>{lookingFor}</div>
          </div>

          <div>
            <div className="text-[10px] text-[#592B41]/35 uppercase tracking-[0.15em] mb-1.5" style={{ fontFamily: BODY }}>
              Ideal Collaboration
            </div>
            <div
              className="text-[#592B41]/60 italic"
              style={{ fontFamily: DISPLAY, fontWeight: 400 }}
            >
              {idealCollaboration}
            </div>
          </div>
        </div>
      </div>

      {/* Ornamental bottom border */}
      <div className={`h-px w-full bg-gradient-to-r ${s.bottomLine}`} />
      <div className="flex items-center justify-center py-2.5">
        <div className="flex items-center gap-2">
          <div className={`w-1 h-1 rounded-full ${s.cornerDot} opacity-15`} />
          <div className={`w-1.5 h-1.5 rounded-full ${s.cornerDot} opacity-30`} />
          <div className={`w-1 h-1 rounded-full ${s.cornerDot} opacity-15`} />
        </div>
      </div>
    </div>
  );
}
