import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type LangCode = "en" | "zh" | "ko" | "hi";

export interface Language {
  code: LangCode;
  label: string;
  native: string;
  font: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", native: "English", font: "Inter, sans-serif" },
  { code: "zh", label: "Chinese", native: "中文", font: "'Noto Sans SC', sans-serif" },
  { code: "ko", label: "Korean", native: "한국어", font: "'Noto Sans KR', sans-serif" },
  { code: "hi", label: "Hindi", native: "हिन्दी", font: "'Noto Sans Devanagari', sans-serif" },
];

interface LanguageSwitcherProps {
  value: LangCode;
  onChange: (code: LangCode) => void;
  variant?: "light" | "dark";
}

export function LanguageSwitcher({ value, onChange, variant = "light" }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === value) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLight = variant === "light";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2 px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer
          ${isLight
            ? "bg-white/60 backdrop-blur-sm border border-[#592B41]/10 hover:border-[#E87A5D]/25 text-[#592B41]"
            : "bg-white/[0.06] backdrop-blur-sm border border-white/10 hover:border-white/20 text-white/80"
          }
        `}
      >
        {/* Language indicator dots */}
        <div className="flex items-center gap-[3px]">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className={`
                w-[5px] h-[5px] rounded-full transition-all duration-300
                ${lang.code === value
                  ? isLight ? "bg-[#E87A5D] scale-125" : "bg-[#E87A5D] scale-125"
                  : isLight ? "bg-[#E87A5D]/25" : "bg-white/20"
                }
              `}
            />
          ))}
        </div>

        <span
          className="text-sm"
          style={{ fontFamily: current.font }}
        >
          {current.native}
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } ${isLight ? "text-[#E87A5D]/50" : "text-white/40"}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50
              ${isLight
                ? "bg-white border border-[#592B41]/8 shadow-xl shadow-[#592B41]/8"
                : "bg-[#1E1118] border border-white/10 shadow-xl shadow-black/30"
              }
            `}
          >
            {/* Header */}
            <div className={`px-4 py-2.5 border-b ${isLight ? "border-[#592B41]/6" : "border-white/[0.06]"}`}>
              <span
                className={`text-[9px] tracking-[0.25em] uppercase ${isLight ? "text-[#E87A5D]/40" : "text-white/25"}`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Select Language
              </span>
            </div>

            {/* Options */}
            <div className="py-1.5">
              {LANGUAGES.map((lang) => {
                const isActive = lang.code === value;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onChange(lang.code);
                      setOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-2.5 transition-colors cursor-pointer
                      ${isActive
                        ? isLight ? "bg-[#E87A5D]/5" : "bg-white/[0.05]"
                        : isLight ? "hover:bg-[#592B41]/3" : "hover:bg-white/[0.03]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {/* Active indicator */}
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          isActive
                            ? isLight ? "bg-[#E87A5D]" : "bg-[#E87A5D]"
                            : "bg-transparent"
                        }`}
                      />
                      <div className="text-left">
                        <div
                          className={`text-sm ${isLight ? "text-[#2C1820]" : "text-white/90"}`}
                          style={{ fontFamily: lang.font }}
                        >
                          {lang.native}
                        </div>
                        <div
                          className={`text-[11px] ${isLight ? "text-[#592B41]/35" : "text-white/25"}`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {lang.label}
                        </div>
                      </div>
                    </div>

                    {isActive && (
                      <div className={`text-[9px] tracking-widest uppercase ${isLight ? "text-[#E87A5D]/50" : "text-[#E87A5D]/60"}`}>
                        Active
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className={`px-4 py-2.5 border-t ${isLight ? "border-[#592B41]/6" : "border-white/[0.06]"}`}>
              <span
                className={`text-[10px] italic ${isLight ? "text-[#592B41]/20" : "text-white/15"}`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Built in from the beginning.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}