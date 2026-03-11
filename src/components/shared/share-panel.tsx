"use client";

import { useMemo, useState } from "react";
import { Share2, Link2, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SharePanelProps {
  title: string;
  shareText: string;
  shareUrl?: string;
  className?: string;
}

export function SharePanel({
  title,
  shareText,
  shareUrl,
  className = "",
}: SharePanelProps) {
  const [copiedKind, setCopiedKind] = useState<"text" | "url" | null>(null);
  const [nativeShared, setNativeShared] = useState(false);

  const resolvedUrl = useMemo(() => {
    if (shareUrl) return shareUrl;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }, [shareUrl]);

  const combinedText = useMemo(
    () => (resolvedUrl ? `${shareText}\n\n${resolvedUrl}` : shareText),
    [shareText, resolvedUrl],
  );
  const canNativeShare =
    typeof window !== "undefined" && typeof navigator.share === "function";

  async function copyText() {
    await navigator.clipboard.writeText(combinedText);
    setCopiedKind("text");
    setTimeout(() => setCopiedKind(null), 1800);
  }

  async function copyUrl() {
    if (!resolvedUrl) return;
    await navigator.clipboard.writeText(resolvedUrl);
    setCopiedKind("url");
    setTimeout(() => setCopiedKind(null), 1800);
  }

  async function nativeShare() {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title,
        text: shareText,
        url: resolvedUrl || undefined,
      });
      setNativeShared(true);
      setTimeout(() => setNativeShared(false), 1800);
    } catch {
      // User canceled share dialog; no action needed.
    }
  }

  return (
    <div className={`rounded-2xl border border-[#592B41]/10 bg-[#FDFBF7] p-4 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#592B41]/45">
            Share This
          </p>
          <p className="text-sm text-[#2C1820]/65 mt-1">{title}</p>
        </div>
        <Share2 className="w-4 h-4 text-[#592B41]/45 mt-0.5 shrink-0" />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyText}
          className="rounded-full border-[#592B41]/15"
        >
          {copiedKind === "text" ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1" />
              Copied Text
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 mr-1" />
              Copy Post Text
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyUrl}
          disabled={!resolvedUrl}
          className="rounded-full border-[#592B41]/15"
        >
          {copiedKind === "url" ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1" />
              Copied URL
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5 mr-1" />
              Copy Link
            </>
          )}
        </Button>

        {canNativeShare && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={nativeShare}
            className="rounded-full border-[#592B41]/15"
          >
            {nativeShared ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1" />
                Shared
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 mr-1" />
                Share...
              </>
            )}
          </Button>
        )}

        <Button asChild type="button" variant="outline" size="sm" className="rounded-full border-[#592B41]/15">
          <a href="https://www.moltbook.com/" target="_blank" rel="noreferrer">
            Post On Moltbook
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}
