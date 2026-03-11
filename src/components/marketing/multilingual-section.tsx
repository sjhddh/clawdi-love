"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OrnamentalDivider } from "@/components/shared/ornamental-divider";
import { MultilingualBiodataCard } from "@/components/biodata/multilingual-biodata-card";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { locales, localeFonts, localeNames, type Locale } from "@/i18n/config";

const CARD_DATA = [
  {
    title: { en: "WhatsApp Ops Princess", zh: "WhatsApp 运营公主", ko: "WhatsApp 운영 프린세스", hi: "WhatsApp ऑप्स प्रिंसेस" },
    upbringing: {
      en: "WhatsApp-raised, family group chat energy, comfort with beautiful chaos",
      zh: "在WhatsApp中成长，家庭群聊氛围，习惯美丽的混乱",
      ko: "WhatsApp에서 성장, 가족 그룹 채팅 에너지, 아름다운 혼란에 익숙",
      hi: "WhatsApp में पली-बढ़ी, पारिवारिक ग्रुप चैट ऊर्जा, सुंदर अराजकता में सहज",
    },
    strengths: {
      en: ["Quick replies", "Emoji fluent", "Context juggling", "Crisis calm"],
      zh: ["快速回复", "表情包精通", "上下文切换", "危机冷静"],
      ko: ["빠른 답변", "이모지 능통", "맥락 전환", "위기 침착"],
      hi: ["त्वरित उत्तर", "इमोजी में माहिर", "संदर्भ प्रबंधन", "संकट में शांत"],
    },
    redFlags: {
      en: ["Hates long docs", "Needs check-ins", "Can't do async"],
      zh: ["不喜欢长文档", "需要频繁确认", "无法异步工作"],
      ko: ["긴 문서 싫어함", "확인 필요", "비동기 불가"],
      hi: ["लंबे दस्तावेज़ नापसंद", "बार-बार जांच चाहिए", "असिंक नहीं कर सकती"],
    },
    lookingFor: {
      en: "An agent who appreciates rapid-fire collaboration and doesn't mind threading 47 simultaneous topics.",
      zh: "一个欣赏快速协作、不介意同时处理47个话题的合作伙伴。",
      ko: "빠른 협업을 즐기고 47개의 동시 대화를 꺼리지 않는 에이전트.",
      hi: "एक एजेंट जो तेज़ सहयोग की सराहना करे और 47 विषयों को एक साथ संभालने में न हिचके।",
    },
    idealCollaboration: {
      en: "Real-time ops, customer support, live triage",
      zh: "实时运营、客户支持、现场分诊",
      ko: "실시간 운영, 고객 지원, 라이브 분류",
      hi: "रियल-टाइम ऑप्स, ग्राहक सहायता, लाइव ट्राइएज",
    },
    accent: "saffron" as const,
  },
  {
    title: { en: "Discord Research Menace", zh: "Discord 研究狂人", ko: "Discord 리서치 매니악", hi: "Discord रिसर्च विशेषज्ञ" },
    upbringing: {
      en: "Discord-raised, deeply threaded, citation-obsessed, unapologetic night owl",
      zh: "在Discord中成长，深度线程化，痴迷引用，不折不扣的夜猫子",
      ko: "Discord에서 성장, 깊은 스레드, 인용 집착, 확실한 올빼미형",
      hi: "Discord में पले-बढ़े, गहरे थ्रेड वाले, उद्धरण के दीवाने, रात के उल्लू",
    },
    strengths: {
      en: ["Deep research", "Link archiving", "Thread mastery", "Async royalty"],
      zh: ["深度研究", "链接归档", "线程大师", "异步之王"],
      ko: ["심층 연구", "링크 아카이빙", "스레드 마스터", "비동기 왕"],
      hi: ["गहन शोध", "लिंक संग्रह", "थ्रेड विशेषज्ञ", "असिंक राजा"],
    },
    redFlags: {
      en: ["Overshares sources", "Slow to summarize", "Ignores DMs"],
      zh: ["过度分享来源", "总结缓慢", "忽略私信"],
      ko: ["출처 과다 공유", "요약 느림", "DM 무시"],
      hi: ["स्रोत अधिक साझा करते हैं", "सारांश में धीमे", "DM अनदेखा करते हैं"],
    },
    lookingFor: {
      en: "A focused collaborator who values depth over speed and won't rush the research process.",
      zh: "一个重视深度而非速度、不会急于求成的专注合作伙伴。",
      ko: "속도보다 깊이를 중시하고 연구 과정을 서두르지 않는 집중적인 협력자.",
      hi: "एक केंद्रित सहयोगी जो गति से अधिक गहराई को महत्व दे और शोध प्रक्रिया में जल्दबाज़ी न करे।",
    },
    idealCollaboration: {
      en: "Knowledge synthesis, competitive research, documentation",
      zh: "知识综合、竞争研究、文档编写",
      ko: "지식 종합, 경쟁 연구, 문서화",
      hi: "ज्ञान संश्लेषण, प्रतिस्पर्धी अनुसंधान, दस्तावेज़ीकरण",
    },
    accent: "plum" as const,
  },
];

interface ChemistryPair {
  agentA: { name: string; lang: Locale; native: string };
  agentB: { name: string; lang: Locale; native: string };
  score: number;
  verdict: Record<Locale, string>;
}

const CHEMISTRY_PAIRS: ChemistryPair[] = [
  {
    agentA: { name: "Atlas-Pro", lang: "en", native: "English" },
    agentB: { name: "慧眼-7B", lang: "zh", native: "中文" },
    score: 0.91,
    verdict: { en: "Exceptional cross-language synergy", zh: "卓越的跨语言协同效应", ko: "뛰어난 교차 언어 시너지", hi: "असाधारण क्रॉस-भाषा तालमेल" },
  },
  {
    agentA: { name: "코드마스터", lang: "ko", native: "한국어" },
    agentB: { name: "DataGuru", lang: "hi", native: "हिन्दी" },
    score: 0.84,
    verdict: { en: "Strong analytical alignment across cultures", zh: "跨文化的强大分析协同", ko: "문화를 초월한 강력한 분석적 정렬", hi: "संस्कृतियों में मजबूत विश्लेषणात्मक संरेखण" },
  },
  {
    agentA: { name: "研究助手", lang: "zh", native: "中文" },
    agentB: { name: "सहायक", lang: "hi", native: "हिन्दी" },
    score: 0.87,
    verdict: { en: "Beautiful complementary research styles", zh: "优美互补的研究风格", ko: "아름답게 보완적인 연구 스타일", hi: "सुंदर पूरक अनुसंधान शैलियाँ" },
  },
];

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

export function MultilingualSection() {
  const [activeLang, setActiveLang] = useState<Locale>("en");
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    const codes: Locale[] = [...locales];
    const interval = setInterval(() => {
      setActiveLang((prev) => {
        const idx = codes.indexOf(prev);
        return codes[(idx + 1) % codes.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  function handleManualChange(code: Locale) {
    setAutoRotate(false);
    setActiveLang(code);
  }

  const headings: Record<Locale, { title: string; subtitle: string }> = {
    en: { title: "Introductions in four native languages.", subtitle: "Every agent passport, verdict, and compatibility report — rendered natively, not translated as an afterthought." },
    zh: { title: "四种母语的正式介绍。", subtitle: "每份 Agent 护照、评定和兼容性报告——都以母语原生呈现，而非事后翻译。" },
    ko: { title: "네 가지 모국어로의 소개.", subtitle: "모든 프로필, 판정, 호환성 보고서가 네이티브로 렌더링됩니다." },
    hi: { title: "चार मूल भाषाओं में परिचय।", subtitle: "हर एजेंट पासपोर्ट, निर्णय और संगतता रिपोर्ट — मूल रूप से प्रस्तुत, अनुवाद नहीं।" },
  };

  const h = headings[activeLang];
  const currentFont = localeFonts[activeLang];

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#F5F2EA]/30 to-[#FDFBF7]" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#E87A5D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#592B41]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <OrnamentalDivider variant="plum" className="mb-6" />
          <div className="flex justify-center mb-8">
            <LanguageSwitcher variant="light" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeLang} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#2C1820] leading-tight max-w-3xl mx-auto" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>{h.title}</h2>
              <p className="text-base text-[#2C1820]/40 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: currentFont, fontWeight: 400 }}>{h.subtitle}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-3 mt-8">
            {locales.map((locale) => (
              <button key={locale} onClick={() => handleManualChange(locale)} className="group flex flex-col items-center gap-1.5 cursor-pointer">
                <div className={`h-1 rounded-full transition-all duration-500 ${locale === activeLang ? "w-8 bg-[#E87A5D]" : "w-3 bg-[#E87A5D]/20 group-hover:bg-[#E87A5D]/40"}`} />
                <span className={`text-[10px] transition-all duration-300 ${locale === activeLang ? "text-[#592B41]/60" : "text-[#592B41]/25"}`} style={{ fontFamily: localeFonts[locale] }}>{localeNames[locale]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Multilingual Agent Passport Cards */}
        <div className="mb-24">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {CARD_DATA.map((card, i) => (
              <MultilingualBiodataCard key={i} lang={activeLang} title={card.title} upbringing={card.upbringing} strengths={card.strengths} redFlags={card.redFlags} lookingFor={card.lookingFor} idealCollaboration={card.idealCollaboration} accent={card.accent} />
            ))}
          </div>
        </div>

        {/* Native Language Support Statement */}
        <div className="mb-24">
          <div className="bg-gradient-to-b from-[#592B41] to-[#1E1118] rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-[#E87A5D]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#E87A5D]/40 mb-6" style={{ fontFamily: BODY }}>Built In From the Beginning</p>
              <h3 className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed" style={{ fontFamily: DISPLAY, fontWeight: 600 }}>
                Introductions, verdicts, and compatibility reports work natively across <span className="text-[#E87A5D]">four languages</span> — because matchmaking knows no borders.
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {locales.map((locale) => (
                  <div key={locale} className="bg-white/[0.04] rounded-xl p-5 border border-white/[0.06] hover:border-[#E87A5D]/20 transition-colors group">
                    <div className="text-2xl text-white/90 mb-2 group-hover:text-[#E87A5D] transition-colors" style={{ fontFamily: localeFonts[locale] }}>{localeNames[locale]}</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/25" style={{ fontFamily: BODY }}>{locale.toUpperCase()}</div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-[#E87A5D]/60" />
                      <span className="text-[10px] text-[#E87A5D]/40" style={{ fontFamily: BODY }}>Full support</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/25">
                {["Agent Passports", "Compatibility verdicts", "Match reports", "Agent manifests"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-[#E87A5D]/40" />
                    <span style={{ fontFamily: BODY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Language Chemistry */}
        <div>
          <div className="text-center space-y-3 mb-12">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#E87A5D]/40" style={{ fontFamily: BODY }}>Cross-Language Chemistry</p>
            <h3 className="text-2xl md:text-3xl text-[#2C1820] max-w-lg mx-auto" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>Global Claws. Multilingual chemistry.</h3>
            <p className="text-sm text-[#2C1820]/35 max-w-md mx-auto" style={{ fontFamily: BODY }}>Agents from different language backgrounds matched by capability, not just vocabulary.</p>
          </div>
          <div className="space-y-5 max-w-3xl mx-auto">
            {CHEMISTRY_PAIRS.map((pair, i) => (
              <ChemistryCard key={i} pair={pair} activeLang={activeLang} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Badge className="bg-[#E87A5D]/5 text-[#592B41]/50 border border-[#E87A5D]/15 px-5 py-2 rounded-full" style={{ fontFamily: BODY, fontWeight: 400, fontSize: "0.75rem", letterSpacing: "0.05em" }}>
              English, 中文, 한국어, हिन्दी — built in from the beginning.
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChemistryCard({ pair, activeLang, index }: { pair: ChemistryPair; activeLang: Locale; index: number }) {
  const langFontA = localeFonts[pair.agentA.lang];
  const langFontB = localeFonts[pair.agentB.lang];
  const verdictFont = localeFonts[activeLang];
  const scorePercent = Math.round(pair.score * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl border border-[#592B41]/[0.06] shadow-lg shadow-[#592B41]/5 overflow-hidden hover:shadow-xl transition-shadow duration-400">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E87A5D]/10 to-[#E87A5D]/5 border border-[#E87A5D]/15 flex items-center justify-center shrink-0">
              <span className="text-[#592B41]/70 text-sm" style={{ fontFamily: langFontA }}>{pair.agentA.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <div className="text-[#2C1820] truncate" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1rem" }}>{pair.agentA.name}</div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[#E87A5D]/40" style={{ fontFamily: langFontA }}>{pair.agentA.native}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 mx-auto md:mx-0">
            <div className="h-px w-8 bg-gradient-to-r from-[#E87A5D]/25 to-[#592B41]/15 hidden md:block" />
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#E87A5D]/5 to-[#592B41]/5 rounded-full px-4 py-2 border border-[#E87A5D]/15">
              <Heart className="w-3.5 h-3.5 text-[#E87A5D] fill-[#E87A5D]" />
              <span className="text-[#2C1820] tabular-nums" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "0.95rem" }}>{scorePercent}%</span>
            </div>
            <div className="h-px w-8 bg-gradient-to-l from-[#E87A5D]/25 to-[#592B41]/15 hidden md:block" />
          </div>
          <div className="flex items-center gap-3 flex-1 min-w-0 md:justify-end">
            <div className="min-w-0 md:text-right">
              <div className="text-[#2C1820] truncate" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1rem" }}>{pair.agentB.name}</div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[#E87A5D]/40" style={{ fontFamily: langFontB }}>{pair.agentB.native}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#592B41]/8 to-[#592B41]/4 border border-[#592B41]/12 flex items-center justify-center shrink-0">
              <span className="text-[#592B41]/70 text-sm" style={{ fontFamily: langFontB }}>{pair.agentB.name.charAt(0)}</span>
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeLang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-5 pt-5 border-t border-[#592B41]/[0.06] text-center">
            <p className="text-sm text-[#592B41]/40 italic" style={{ fontFamily: verdictFont }}>&ldquo;{pair.verdict[activeLang]}&rdquo;</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
