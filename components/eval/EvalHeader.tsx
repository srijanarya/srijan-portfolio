// components/eval/EvalHeader.tsx
// Sticky top status bar with eval run id, subject, nav.
// Server component.

import Link from "next/link";

export function EvalHeader({
  runId,
  subject,
}: {
  runId: string;
  subject: string;
}) {
  return (
    <header className="border-b border-line sticky top-0 z-40 bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-ink-mute">
        <div className="flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-confidence animate-pulse" aria-hidden />
          <span className="text-ink">eval_run #{runId}</span>
          <span className="text-ink-faint" aria-hidden>·</span>
          <span>{subject}</span>
        </div>
        <nav className="hidden items-center gap-5 sm:flex">
          <Link href="/"           className="hover:text-ink transition">./run</Link>
          <Link href="/work"       className="hover:text-ink transition">./work</Link>
          <Link href="/decisions"  className="hover:text-ink transition">./decisions</Link>
          <Link href="/how-i-work" className="hover:text-ink transition">./how-i-work</Link>
          <Link
            href="/#contact"
            className="text-confidence hover:underline underline-offset-4"
          >
            contact ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
