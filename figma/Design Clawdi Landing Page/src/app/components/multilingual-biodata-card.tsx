import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import type { LangCode } from "./language-switcher";

interface MultilingualLabels {
  biodata: string;
  upbringing: string;
  strengths: string;
  redFlags: string;
  lookingFor: string;
  idealCollaboration: string;
}

const LABELS: Record<LangCode, MultilingualLabels> = {
  en: {
    biodata: "Biodata",
    upbringing: "Upbringing",
    strengths: "Strengths",
    redFlags: "Red Flags",
    lookingFor: "Looking For",
    idealCollaboration: "Ideal Collaboration",
  },
  zh: {
    biodata: "个人资料",
    upbringing: "成长背景",
    strengths: "优势",
    redFlags: "注意事项",
    lookingFor: "寻找伙伴",
    idealCollaboration: "理想合作",
  },
  ko: {
    biodata: "프로필",
    upbringing: "성장 배경",
    strengths: "강점",
    redFlags: "주의사항",
    lookingFor: "원하는 파트너",
    idealCollaboration: "이상적인 협업",
  },
  hi: {
    biodata: "बायोडाटा",
    upbringing: "पृष्ठभूमि",
    strengths: "ताकत",
    redFlags: "चेतावनी",
    lookingFor: "खोज",
    idealCollaboration: "आदर्श सहयोग",
  },
};

const FONT_MAP: Record<LangCode, string> = {
  en: "Inter, sans-serif",
  zh: "'Noto Sans SC', sans-serif",
  ko: "'Noto Sans KR', sans-serif",
  hi: "'Noto Sans Devanagari', sans-serif",
};

interface MultilingualBiodataCardProps {
  lang: LangCode;
  title: Record<LangCode, string>;
  upbringing: Record<LangCode, string>;
  strengths: Record<LangCode, string[]>;
  redFlags: Record<LangCode, string[]>;
  lookingFor: Record<LangCode, string>;
  idealCollaboration: Record<LangCode, string>;
  accent?: "saffron" | "plum" | "vermilion";
}

export function MultilingualBiodataCard({
  lang,
  title,
  upbringing,
  strengths,
  redFlags,
  lookingFor,
  idealCollaboration,
  accent = "saffron",
}: MultilingualBiodataCardProps) {
  const labels = LABELS[lang];
  const nativeFont = FONT_MAP[lang];

  const accentStyles = {
    saffron: {
      border: "border-[#E87A5D]/20",
      topLine: "from-[#E87A5D] via-[#D97706] to-[#E87A5D]",
      bottomLine: "from-[#E87A5D]/20 via-[#E87A5D]/40 to-[#E87A5D]/20",
      glow: "shadow-[#E87A5D]/8",
      titleColor: "text-[#592B41]",
      cornerDot: "bg-[#E87A5D]",
      badgeBg: "bg-[#E87A5D]/8",
      badgeText: "text-[#592B41]",
      badgeBorder: "border-[#E87A5D]/15",
      flagBg: "bg-[#D4183D]/5",
      flagText: "text-[#D4183D]/80",
      flagBorder: "border-[#D4183D]/12",
      labelColor: "text-[#592B41]/35",
    },
    plum: {
      border: "border-[#592B41]/15",
      topLine: "from-[#592B41] via-[#6B3550] to-[#592B41]",
      bottomLine: "from-[#592B41]/20 via-[#592B41]/35 to-[#592B41]/20",
      glow: "shadow-[#592B41]/8",
      titleColor: "text-[#592B41]",
      cornerDot: "bg-[#592B41]",
      badgeBg: "bg-[#592B41]/6",
      badgeText: "text-[#592B41]",
      badgeBorder: "border-[#592B41]/12",
      flagBg: "bg-[#D4183D]/5",
      flagText: "text-[#D4183D]/80",
      flagBorder: "border-[#D4183D]/12",
      labelColor: "text-[#592B41]/35",
    },
    vermilion: {
      border: "border-[#D97706]/20",
      topLine: "from-[#D97706] via-[#E87A5D] to-[#D97706]",
      bottomLine: "from-[#D97706]/20 via-[#D97706]/35 to-[#D97706]/20",
      glow: "shadow-[#D97706]/8",
      titleColor: "text-[#592B41]",
      cornerDot: "bg-[#D97706]",
      badgeBg: "bg-[#D97706]/8",
      badgeText: "text-[#592B41]",
      badgeBorder: "border-[#D97706]/15",
      flagBg: "bg-[#D4183D]/5",
      flagText: "text-[#D4183D]/80",
      flagBorder: "border-[#D4183D]/12",
      labelColor: "text-[#592B41]/35",
    },
  };

  const s = accentStyles[accent];

  return (
    <div
      className={`relative bg-gradient-to-b from-white via-white to-[#FDF8F0]/50 rounded-2xl border ${s.border} shadow-xl ${s.glow} overflow-hidden group hover:shadow-2xl transition-all duration-500`}
    >
      {/* Ornamental top border */}
      <div className={`h-1 w-full bg-gradient-to-r ${s.topLine}`} />

      {/* Corner ornaments */}
      <div className={`absolute top-3 left-3 w-2 h-2 rounded-full ${s.cornerDot} opacity-40`} />
      <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${s.cornerDot} opacity-40`} />

      <div className="p-6 pt-5">
        {/* Title with decorative flourish */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`h-px w-8 bg-gradient-to-r ${s.topLine} opacity-40`} />
            <motion.span
              key={`label-${lang}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] uppercase tracking-[0.2em] text-[#E87A5D]/50"
              style={{ fontFamily: nativeFont }}
            >
              {labels.biodata}
            </motion.span>
            <div className={`h-px w-8 bg-gradient-to-l ${s.topLine} opacity-40`} />
          </div>
          <motion.div
            key={`title-${lang}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className={`text-xl ${s.titleColor}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 }}
          >
            {title[lang]}
          </motion.div>
        </div>

        <motion.div
          key={`content-${lang}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-4 text-sm"
        >
          <div>
            <div
              className={`text-[10px] ${s.labelColor} uppercase tracking-[0.15em] mb-1.5`}
              style={{ fontFamily: nativeFont }}
            >
              {labels.upbringing}
            </div>
            <div
              className="text-amber-950/80"
              style={{ fontFamily: nativeFont, fontWeight: 400 }}
            >
              {upbringing[lang]}
            </div>
          </div>

          <div>
            <div
              className={`text-[10px] ${s.labelColor} uppercase tracking-[0.15em] mb-2`}
              style={{ fontFamily: nativeFont }}
            >
              {labels.strengths}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {strengths[lang].map((strength, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className={`${s.badgeBg} ${s.badgeText} border ${s.badgeBorder} rounded-full px-3 py-0.5 text-xs`}
                  style={{ fontFamily: nativeFont, fontWeight: 500 }}
                >
                  {strength}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div
              className="text-[10px] text-rose-600/50 uppercase tracking-[0.15em] mb-2"
              style={{ fontFamily: nativeFont }}
            >
              {labels.redFlags}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {redFlags[lang].map((flag, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className={`${s.flagBg} ${s.flagText} border ${s.flagBorder} rounded-full px-3 py-0.5 text-xs`}
                  style={{ fontFamily: nativeFont, fontWeight: 500 }}
                >
                  {flag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#592B41]/10 to-transparent" />

          <div>
            <div
              className={`text-[10px] ${s.labelColor} uppercase tracking-[0.15em] mb-1.5`}
              style={{ fontFamily: nativeFont }}
            >
              {labels.lookingFor}
            </div>
            <div
              className="text-[#2C1820]/65 leading-relaxed"
              style={{ fontFamily: nativeFont, fontWeight: 400 }}
            >
              {lookingFor[lang]}
            </div>
          </div>

          <div>
            <div
              className={`text-[10px] ${s.labelColor} uppercase tracking-[0.15em] mb-1.5`}
              style={{ fontFamily: nativeFont }}
            >
              {labels.idealCollaboration}
            </div>
            <div
              className="text-[#592B41]/60 italic"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              {idealCollaboration[lang]}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ornamental bottom border */}
      <div className={`h-px w-full bg-gradient-to-r ${s.bottomLine}`} />
      <div className="flex items-center justify-center py-2.5">
        <div className="flex items-center gap-2">
          <div className={`w-1 h-1 rounded-full ${s.cornerDot} opacity-30`} />
          <div className={`w-1.5 h-1.5 rounded-full ${s.cornerDot} opacity-50`} />
          <div className={`w-1 h-1 rounded-full ${s.cornerDot} opacity-30`} />
        </div>
      </div>
    </div>
  );
}