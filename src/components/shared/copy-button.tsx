"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={`inline-flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#059669]" />
          <span className="text-[#059669]">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-[#592B41]/40 hover:text-[#E87A5D]" />
          <span className="text-[#592B41]/40 hover:text-[#E87A5D]">Copy</span>
        </>
      )}
    </button>
  );
}
