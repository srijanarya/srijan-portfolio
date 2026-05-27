// components/eval/HallucinationFlag.tsx
// Pulsing red dot + count + link to /decisions anchor.
// Server component (animation is CSS).

import Link from "next/link";

export function HallucinationFlag({
  count,
  href,
  inline = false,
}: {
  count: number;
  href: string;
  inline?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-critical hover:underline underline-offset-4 ${
        inline ? "text-sm" : ""
      }`}
    >
      <span className="size-1.5 rounded-full bg-critical animate-flag" aria-hidden />
      <span className="tabular-nums font-semibold">{count}</span>
      <span className="text-ink-mute text-[11px] uppercase tracking-[0.16em]">
        flagged
      </span>
      <span className="text-ink-faint" aria-hidden>→</span>
    </Link>
  );
}
