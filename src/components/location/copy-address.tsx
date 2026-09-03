"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = address;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } finally {
        document.body.removeChild(textarea);
      }
    }
    if (!copied) {
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-gold/50 px-4 py-2 text-sm font-medium text-gold-foreground transition hover:bg-gold/20"
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="size-4" aria-hidden="true" />
          Address Copied
        </>
      ) : (
        <>
          <Copy className="size-4" aria-hidden="true" />
          Copy Address
        </>
      )}
    </button>
  );
}