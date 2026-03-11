import { LucideIcon } from 'lucide-react';

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

interface CompatibilityFactorCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor?: string;
}

export function CompatibilityFactorCard({
  icon: Icon,
  title,
  description,
  accentColor = 'saffron'
}: CompatibilityFactorCardProps) {
  const colorMap: Record<string, { iconBg: string; iconHover: string; iconColor: string; borderHover: string; glowColor: string }> = {
    amber: {
      iconBg: 'bg-gradient-to-br from-[#E87A5D]/12 to-[#D97706]/8',
      iconHover: 'group-hover:from-[#E87A5D]/20 group-hover:to-[#D97706]/15',
      iconColor: 'text-[#E87A5D]',
      borderHover: 'hover:border-[#E87A5D]/25',
      glowColor: 'group-hover:shadow-[#E87A5D]/8',
    },
    purple: {
      iconBg: 'bg-gradient-to-br from-[#592B41]/10 to-[#6B3550]/8',
      iconHover: 'group-hover:from-[#592B41]/18 group-hover:to-[#6B3550]/14',
      iconColor: 'text-[#592B41]',
      borderHover: 'hover:border-[#592B41]/20',
      glowColor: 'group-hover:shadow-[#592B41]/6',
    },
    rose: {
      iconBg: 'bg-gradient-to-br from-[#D4183D]/8 to-[#E87A5D]/8',
      iconHover: 'group-hover:from-[#D4183D]/14 group-hover:to-[#E87A5D]/12',
      iconColor: 'text-[#D4183D]/80',
      borderHover: 'hover:border-[#D4183D]/15',
      glowColor: 'group-hover:shadow-[#D4183D]/6',
    },
    teal: {
      iconBg: 'bg-gradient-to-br from-[#059669]/10 to-[#0D9488]/8',
      iconHover: 'group-hover:from-[#059669]/16 group-hover:to-[#0D9488]/14',
      iconColor: 'text-[#059669]',
      borderHover: 'hover:border-[#059669]/20',
      glowColor: 'group-hover:shadow-[#059669]/6',
    },
  };

  const c = colorMap[accentColor] || colorMap.amber;

  return (
    <div
      className={`relative bg-gradient-to-b from-white to-[#FDF8F0]/30 rounded-2xl p-6 border border-[#592B41]/[0.06] shadow-md hover:shadow-xl ${c.borderHover} ${c.glowColor} transition-all duration-400 group overflow-hidden`}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#E87A5D]/25 to-transparent" />

      <div className="flex flex-col items-center text-center space-y-3.5">
        <div
          className={`w-14 h-14 rounded-2xl ${c.iconBg} ${c.iconHover} flex items-center justify-center transition-all duration-400 rotate-3 group-hover:rotate-0`}
        >
          <Icon className={`w-6 h-6 ${c.iconColor}`} />
        </div>
        <div>
          <div
            className="text-[#2C1820] mb-1.5"
            style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: '1.05rem' }}
          >
            {title}
          </div>
          <div
            className="text-sm text-[#2C1820]/45 leading-relaxed"
            style={{ fontFamily: BODY, fontWeight: 400 }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
