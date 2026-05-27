/**
 * /decisions — the killer page
 *
 * Two case studies of "what I chose not to ship":
 *   • Williams %R alpha — DROPPED (rendered as 5-layer TraceTree)
 *   • Honest Accuracy Report — REARCHITECTED (rendered as DiffPanel + failure-mode EvalLogTable)
 *
 * Content sourced verbatim from interview-prep/portfolio-pages/decisions.md.
 * The harder discipline is killing your own promising ideas.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { EvalHeader } from "@/components/eval/EvalHeader";
import { SectionMarker } from "@/components/eval/SectionMarker";
import { TraceTree } from "@/components/eval/TraceTree";
import { DiffPanel } from "@/components/eval/DiffPanel";
import { EvalLogTable } from "@/components/eval/EvalLogTable";
import { CornerBracket } from "@/components/eval/CornerBracket";
import { DECISIONS } from "@/app/data/projects";

export const metadata: Metadata = {
  title: "Decisions",
  description:
    "Two production AI ideas I distrusted hard enough to kill before deploying. The Williams %R alpha factor and the EarningsIQ Honest Accuracy Report.",
};

const williams = DECISIONS.find((d) => d.id === "williams-r")!;
const honest   = DECISIONS.find((d) => d.id === "honest-accuracy")!;

function DecisionFrame({ children }: { children: React.ReactNode }) {
  return (
    <article className="relative bg-paper border border-line p-8 sm:p-10 scroll-mt-24">
      <CornerBracket corner="tl" className="absolute top-2 left-2 text-ink-faint" />
      <CornerBracket corner="tr" className="absolute top-2 right-2 text-ink-faint" />
      <CornerBracket corner="bl" className="absolute bottom-2 left-2 text-ink-faint" />
      <CornerBracket corner="br" className="absolute bottom-2 right-2 text-ink-faint" />
      {children}
    </article>
  );
}

export default function DecisionsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <EvalHeader runId="001" subject="SRIJAN-3YR-SOLO-FOUNDER-V3" />

      <section className="mx-auto w-full max-w-[1200px] px-6 py-16 md:py-20 lg:py-24">

        {/* Page header */}
        <div className="animate-fade-up mb-14 max-w-[64ch]">
          <SectionMarker label="page · /decisions" className="mb-3" />
          <h1 className="text-4xl sm:text-5xl text-ink leading-[1.05] tracking-tight mb-5">
            Decisions
          </h1>
          <p className="font-serif-italic text-xl sm:text-2xl text-ink-mute leading-snug">
            Most engineering writing is about what people built. This page is about what I didn&apos;t build, and why. The harder discipline is killing your own promising ideas.
          </p>
        </div>

        {/* ─────────── Williams %R ─────────── */}
        <div id="williams-r" className="animate-fade-up mb-14">
          <DecisionFrame>
            <header className="flex items-baseline justify-between gap-4 mb-6">
              <h2 className="text-3xl sm:text-4xl text-ink leading-none">
                The Williams %R alpha I almost shipped
              </h2>
              <span className="text-[10px] uppercase tracking-[0.16em] text-critical shrink-0">
                [ {williams.outcome} ]
              </span>
            </header>

            <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-[64ch]">
                <p className="text-ink-mute mb-5 leading-relaxed">
                  <strong className="text-ink">Where it started.</strong>{" "}
                  I was prototyping mean-reversion alpha factors for the BRAIN IQC 2026 portfolio. Williams %R — a classic momentum-vs-mean-reversion indicator — backtested at <strong className="text-ink">Sharpe 0.74</strong> over one year of NIFTY 200 cross-sectional data. That&apos;s promising. By the rules of most quant-research workflows, you keep going.
                </p>
                <p className="text-ink-mute mb-5 leading-relaxed">
                  <strong className="text-ink">What I did instead.</strong>{" "}
                  I didn&apos;t trust one positive result. Sharpe 0.74 on one timeframe is consistent with both a real signal <em>and</em> a regime-dependent fluke. The way to tell is stress-testing.
                </p>
                <p className="text-ink-mute leading-relaxed">
                  I ran four more validation layers before spending compute on Phase 4. The fifth layer&apos;s year-over-year Sharpe std of <strong className="text-ink">1.61</strong> is what killed it — a signal with that much regime dependence isn&apos;t a signal at all.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <div className="my-10 border-l-2 border-confidence pl-6 max-w-[60ch]">
              <p className="font-serif-italic text-xl sm:text-2xl text-ink leading-snug">
                {williams.pull}
              </p>
            </div>

            {/* The killer visualization */}
            <SectionMarker label="5-layer stress-test trace" className="mb-4" />
            {williams.trace && <TraceTree node={williams.trace} />}

            {/* Closing principle */}
            <div className="mt-10 max-w-[64ch] border-t border-line pt-8">
              <SectionMarker label="principle" className="mb-3" />
              <p className="text-ink leading-relaxed">
                Most quant strategies fail not because the math is wrong but because the methodology is. One promising backtest is the noise floor. Six layers of stress-testing is the floor for <em>decide to ship</em>. The documented investigation lives at <code className="text-ink-mute">WILLIAMS_R_DECISION.md</code> in the AKSH repo.
              </p>
            </div>

            <div className="mt-6 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              source · {williams.source}
            </div>
          </DecisionFrame>
        </div>

        {/* ─────────── Honest Accuracy ─────────── */}
        <div id="honest-accuracy" className="animate-fade-up mb-14">
          <DecisionFrame>
            <header className="flex items-baseline justify-between gap-4 mb-6">
              <h2 className="text-3xl sm:text-4xl text-ink leading-none">
                The 100% accuracy report that was actually 22%
              </h2>
              <span className="text-[10px] uppercase tracking-[0.16em] text-warn shrink-0">
                [ {honest.outcome} ]
              </span>
            </header>

            <div className="max-w-[64ch] mb-10">
              <p className="text-ink-mute mb-5 leading-relaxed">
                <strong className="text-ink">Where it started.</strong>{" "}
                A previous EarningsIQ accuracy report had claimed <strong className="text-ink">100% extraction accuracy</strong> across the validation set. I was about to ship that number into the public-facing product page.
              </p>
              <p className="text-ink-mute mb-5 leading-relaxed">
                <strong className="text-ink">What I caught.</strong>{" "}
                The methodology was circular. The &ldquo;ground truth&rdquo; I was validating against came from the same source the LLM had extracted from. I was, in effect, asking: <em>&ldquo;does the LLM agree with the LLM?&rdquo;</em> Of course it does — that doesn&apos;t measure anything.
              </p>
              <p className="text-ink-mute leading-relaxed">
                <strong className="text-ink">What I did.</strong>{" "}
                Rebuilt validation entirely. Pulled Screener.in&apos;s pre-structured financial data — an independent ground-truth dataset — and cross-referenced 59 overlapping companies. Got real numbers:
              </p>
            </div>

            {/* The killer visualization #1 — diff panel */}
            <SectionMarker label="reported vs actual · screener.in cross-reference" className="mb-4" />
            {honest.diff && (
              <DiffPanel
                left={honest.diff.left}
                right={honest.diff.right}
                rows={honest.diff.rows}
              />
            )}

            {/* Pull quote */}
            <div className="my-10 border-l-2 border-warn pl-6 max-w-[60ch]">
              <p className="font-serif-italic text-xl sm:text-2xl text-ink leading-snug">
                {honest.pull}
              </p>
            </div>

            {/* The killer visualization #2 — failure-mode matrix */}
            <SectionMarker label="systematic failure modes · G-Eval criterion breakdown" className="mb-4" />
            {honest.failureModes && (
              <EvalLogTable
                columns={["mode", "freq", "impact"]}
                rows={honest.failureModes}
              />
            )}

            <div className="mt-10 max-w-[64ch] border-t border-line pt-8">
              <SectionMarker label="rearchitecture" className="mb-3" />
              <p className="text-ink-mute leading-relaxed">
                Wrote a P0–P2 remediation plan. Then rearchitected: the LLM is now used for <em>signal detection</em> (which company filed) and Screener-validated data is used for the <em>actual numbers</em> downstream. Two layers, two precision/recall budgets, both honest about what they can and can&apos;t do.
              </p>
            </div>

            <div className="mt-6 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              source · {honest.source}
            </div>
          </DecisionFrame>
        </div>

        {/* ─────────── Synthesis ─────────── */}
        <div className="animate-fade-up mb-12 max-w-[72ch]">
          <SectionMarker label="what these decisions have in common" className="mb-4" />
          <div className="space-y-5 text-ink leading-relaxed">
            <p>
              Both are examples of <strong>distrusting my own promising results</strong>. Most engineers ship when the first metric looks good. The discipline I&apos;m trying to internalize is: <em>if you can&apos;t independently verify it, you don&apos;t know it.</em>
            </p>
            <p>
              That same logic now sits underneath everything I build. Every system has an explicit answer to: <em>how do we know it&apos;s working, what happens when it fails, and when do we not trust it?</em> Whether the system is AI or not.
            </p>
          </div>
        </div>

        {/* Navigation footer */}
        <div className="mt-16 border-t border-line pt-6 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.16em] text-ink-mute">
          <Link href="/" className="hover:text-ink transition">← back to /run</Link>
          <Link href="/work" className="hover:text-ink transition">← /work</Link>
          <Link href="/how-i-work" className="hover:text-ink transition">/how-i-work →</Link>
        </div>
      </section>
    </main>
  );
}
