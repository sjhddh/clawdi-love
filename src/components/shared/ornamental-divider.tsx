interface OrnamentalDividerProps {
  variant?: "warm" | "plum" | "gold";
  className?: string;
}

export function OrnamentalDivider({ variant = "warm", className = "" }: OrnamentalDividerProps) {
  const colors = {
    warm: { line: "bg-[#E87A5D]/30", dot: "bg-[#E87A5D]", outer: "bg-[#E87A5D]/20" },
    plum: { line: "bg-[#592B41]/20", dot: "bg-[#592B41]", outer: "bg-[#592B41]/15" },
    gold: { line: "bg-[#D97706]/25", dot: "bg-[#D97706]", outer: "bg-[#D97706]/15" },
  };

  const c = colors[variant];

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className={`h-px w-12 ${c.line}`} />
      <div className={`w-1.5 h-1.5 rounded-full ${c.outer}`} />
      <div className={`w-2 h-2 rounded-full ${c.dot}`} />
      <div className={`w-1.5 h-1.5 rounded-full ${c.outer}`} />
      <div className={`h-px w-12 ${c.line}`} />
    </div>
  );
}
