import { Badge } from "@/components/ui/badge";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY = "Inter, sans-serif";

interface MatchReportCardProps {
  verdict: string;
  compatibility: "excellent" | "good" | "moderate" | "concerning";
  details: string[];
  agents?: [string, string];
}

export function MatchReportCard({ verdict, compatibility, details, agents }: MatchReportCardProps) {
  const styles = {
    excellent: {
      bg: "from-[#ECFDF5]/80 to-[#F0FDF4]/40",
      border: "border-[#059669]/12",
      badge: "bg-[#ECFDF5] text-[#059669] border-[#059669]/15",
      dot: "bg-[#059669]",
      verdictColor: "text-[#064E3B]",
      label: "Excellent Match",
    },
    good: {
      bg: "from-[#EFF6FF]/80 to-[#DBEAFE]/40",
      border: "border-[#2563EB]/12",
      badge: "bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]/15",
      dot: "bg-[#2563EB]",
      verdictColor: "text-[#1E3A5F]",
      label: "Good Match",
    },
    moderate: {
      bg: "from-[#FFFBEB]/80 to-[#FEF3C7]/40",
      border: "border-[#D97706]/12",
      badge: "bg-[#FFFBEB] text-[#D97706] border-[#D97706]/15",
      dot: "bg-[#D97706]",
      verdictColor: "text-[#78350F]",
      label: "Moderate Match",
    },
    concerning: {
      bg: "from-[#FFF1F2]/80 to-[#FFE4E6]/40",
      border: "border-[#D4183D]/12",
      badge: "bg-[#FFF1F2] text-[#D4183D] border-[#D4183D]/15",
      dot: "bg-[#D4183D]",
      verdictColor: "text-[#881337]",
      label: "Concerning",
    },
  };

  const s = styles[compatibility];

  return (
    <div
      className={`relative bg-gradient-to-br ${s.bg} rounded-2xl border ${s.border} shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden`}
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#E87A5D]/20 to-transparent" />

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <div
              className={`${s.verdictColor} mb-3 leading-snug`}
              style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "1.15rem" }}
            >
              &ldquo;{verdict}&rdquo;
            </div>
            <Badge
              className={`${s.badge} border rounded-full px-3 py-0.5`}
              style={{ fontFamily: BODY, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.05em" }}
            >
              {s.label}
            </Badge>
          </div>
        </div>

        {agents && (
          <div
            className="flex items-center gap-2 mb-4 text-xs text-[#592B41]/40"
            style={{ fontFamily: BODY }}
          >
            <span>{agents[0]}</span>
            <span className="text-[#E87A5D]/50">&times;</span>
            <span>{agents[1]}</span>
          </div>
        )}

        <div className="space-y-2.5">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-sm">
              <div className={`w-1.5 h-1.5 rounded-full ${s.dot} mt-1.5 shrink-0 opacity-50`} />
              <span
                className="text-[#2C1820]/60 leading-relaxed"
                style={{ fontFamily: BODY, fontWeight: 400 }}
              >
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
