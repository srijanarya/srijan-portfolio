/**
 * AI Eval Dashboard — Home Hero (Block 1 minimum-viable)
 *
 * The meta-joke: this portfolio is rendered as a real Anthropic/Patronus-style
 * eval-tool dashboard. The "AI run" being evaluated IS Srijan.
 *
 * Block 1 ships ONLY the hero. Blocks 2-7 add components, project cards,
 * and the killer /decisions page. This file gets expanded in Block 3.
 */

import Link from "next/link";

// ---- Eval data — single source-of-truth (will move to data/ in Block 2) ----
const RUN = {
  id: "001",
  subject: "SRIJAN-3YR-SOLO-FOUNDER-V3",
  confidence: 0.964,
  confidenceLabel: "HIGH" as const,
  hallucinationsCaught: 1,
  sourcesVerified: 4,
  lastEval: "2026-05-27T18:00:00+05:30",
  verdict:
    "This portfolio is my latest production AI. The system being evaluated is me — three years of solo-shipping production AI for live markets, with 400,000+ LOC and one published hallucination caught in flight. Inspect any card to read the run.",
};

// Format the percentage display with a leading zero discipline
const pct = (n: number) => (n * 100).toFixed(1) + "%";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* ─────────── TOP STATUS BAR ─────────── */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-ink-mute">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-confidence animate-pulse" />
            <span className="text-ink">eval_run #{RUN.id}</span>
            <span className="text-ink-faint">·</span>
            <span>{RUN.subject}</span>
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <Link href="/work"        className="hover:text-ink transition">./work</Link>
            <Link href="/decisions"   className="hover:text-ink transition">./decisions</Link>
            <Link href="/how-i-work"  className="hover:text-ink transition">./how-i-work</Link>
            <a href="mailto:srijanaryacomp@gmail.com"
               className="text-confidence hover:underline underline-offset-4">contact ↗</a>
          </div>
        </div>
      </header>

      {/* ─────────── HERO ─────────── */}
      <section className="relative flex-1">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 md:py-24 lg:py-32">

          {/* CONFIDENCE BAR — the one choreographed animation */}
          <div
            className="animate-fade-up"
            style={{ ["--fill-pct" as string]: RUN.confidence }}
          >
            <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.16em] text-ink-mute mb-2">
              <span>confidence_score</span>
              <span className="text-confidence">
                {pct(RUN.confidence)}
                <span className="ml-3 text-ink-mute">[{RUN.confidenceLabel}]</span>
              </span>
            </div>
            <div className="relative h-[6px] w-full overflow-hidden bg-paper border border-line">
              <div
                className="animate-fill-bar absolute inset-y-0 left-0 w-full bg-confidence"
                style={{ transform: `scaleX(${RUN.confidence})` }}
              />
            </div>
          </div>

          {/* NAME + ROLE */}
          <div className="animate-fade-up stagger-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl text-ink leading-[0.95] tracking-tight">
              Srijan Arya<span className="text-confidence animate-cursor">_</span>
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-ink-mute">
              AI-Native Senior Engineer
              <span className="mx-3 text-ink-faint">·</span>
              <span className="text-ink-mute">Mumbai → remote</span>
            </p>
          </div>

          {/* VERDICT PULL — Instrument Serif italic, the editorial moment */}
          <div className="animate-fade-up stagger-3 max-w-[64ch]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-ink-faint mb-3">
              verdict
            </div>
            <p className="font-serif-italic text-2xl sm:text-3xl text-ink leading-[1.35]">
              {RUN.verdict}
            </p>
          </div>

          {/* EVAL METADATA TABLE — the dashboard-row aesthetic */}
          <div className="animate-fade-up stagger-4 grid gap-px bg-line border border-line text-sm max-w-2xl">
            <MetaRow
              label="hallucinations_caught"
              value={
                <span className="inline-flex items-center gap-2 text-critical">
                  <span className="size-1.5 rounded-full bg-critical animate-flag" />
                  {RUN.hallucinationsCaught}
                  <Link
                    href="/decisions"
                    className="ml-3 text-ink-mute hover:text-ink underline-offset-4 hover:underline"
                  >
                    → see /decisions
                  </Link>
                </span>
              }
            />
            <MetaRow
              label="verified_by"
              value={<span className="text-confidence-dim">{RUN.sourcesVerified} sources ✓</span>}
            />
            <MetaRow
              label="last_eval"
              value={
                <span className="text-ink-mute">
                  {new Date(RUN.lastEval).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })} IST
                </span>
              }
            />
            <MetaRow
              label="status"
              value={<span className="text-confidence">ACCEPTING NEW EVALUATIONS</span>}
            />
          </div>

          {/* STAGE-1 BANNER — honest about what's still being built */}
          <div className="animate-fade-up stagger-5 text-[11px] uppercase tracking-[0.16em] text-ink-faint border-t border-line pt-6">
            ▸ build_block 1/7 deployed ·
            <span className="text-ink-mute"> next: project cards (block 2-3), /decisions (block 5)</span>
          </div>
        </div>
      </section>
    </main>
  );
}

// ───────────────────── helper ─────────────────────
function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[200px_1fr] bg-canvas px-4 py-3 eval-row">
      <span className="text-[11px] uppercase tracking-[0.14em] text-ink-faint self-center">
        {label}
      </span>
      <span className="text-ink">{value}</span>
    </div>
  );
}
