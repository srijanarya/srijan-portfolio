/**
 * /how-i-work
 *
 * The AI-Native workflow as a publicly-readable artifact. Content sourced
 * verbatim from interview-prep/portfolio-pages/how-i-work.md.
 *
 * The 7-issue May 2026 AKSH code review renders as an EvalLogTable
 * (Inspect-AI-style results table) — the borrowed eval-framework pattern.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { EvalHeader } from "@/components/eval/EvalHeader";
import { SectionMarker } from "@/components/eval/SectionMarker";
import { EvalLogTable } from "@/components/eval/EvalLogTable";
import { CornerBracket } from "@/components/eval/CornerBracket";

export const metadata: Metadata = {
  title: "How I Work",
  description:
    "Plan → Decompose → Dispatch AI → Review → Ship. The AI-Native workflow that produced 400K+ LOC solo across two production AI systems.",
};

const codeReviewLog = [
  { num: 1, severity: "MED"  as const, cells: { category: "performance",     caught: "fresh requests.Session() per call instead of module-level pool" } },
  { num: 2, severity: "LOW"  as const, cells: { category: "error-quality",   caught: "opaque strptime traceback returned on bad date input" } },
  { num: 3, severity: "LOW"  as const, cells: { category: "api-consistency", caught: "one response missing hint field that sibling functions had" } },
  { num: 4, severity: "MED"  as const, cells: { category: "type-safety",     caught: "numeric params crash on string → number cast" } },
  { num: 5, severity: "HIGH" as const, cells: { category: "silent-failure",  caught: "scraper errors dropped to DEBUG log, not in response payload" } },
  { num: 6, severity: "LOW"  as const, cells: { category: "dep-hygiene",     caught: "requests declared as direct dep, only transitive" } },
  { num: 7, severity: "LOW"  as const, cells: { category: "unused-imports",  caught: "cleanup" } },
];

export default function HowIWorkPage() {
  return (
    <main className="flex flex-1 flex-col">
      <EvalHeader runId="001" subject="SRIJAN-3YR-SOLO-FOUNDER-V3" />

      <section className="mx-auto w-full max-w-[1200px] px-6 py-16 md:py-20 lg:py-24">

        {/* Page header */}
        <div className="animate-fade-up mb-12 max-w-[64ch]">
          <SectionMarker label="page · /how-i-work" className="mb-3" />
          <h1 className="text-4xl sm:text-5xl text-ink leading-[1.05] tracking-tight mb-5">
            How I Work
          </h1>
          <p className="font-serif-italic text-xl sm:text-2xl text-ink-mute leading-snug">
            I&apos;m a solo builder. Three years, three production AI systems, no team. The discipline that makes this possible isn&apos;t speed — it&apos;s what gets done before any code is written.
          </p>
        </div>

        {/* ─────────── The shape of a week ─────────── */}
        <div className="animate-fade-up mb-12 max-w-[72ch]">
          <SectionMarker label="the shape of a week" className="mb-4" />
          <div className="space-y-5 text-ink leading-relaxed">
            <p>
              I plan in writing first, then I build. Concretely: each piece of work gets decomposed into <strong>Week → Phase → Task</strong> issues before any agent touches a keyboard. That structure is mostly for me — to keep multi-week projects from collapsing into &ldquo;what should I do today&rdquo; — but it also means anyone (or any AI tool) joining mid-stream can pick up exactly where things are.
            </p>
            <p>
              I use AI tools heavily — Cursor, Claude Code — for the implementation step. Most of my visible output (lines of code per week) is generated. The work that&apos;s <em>mine</em> is upstream of that: deciding what to build, deciding what NOT to build, designing the architecture, and reviewing every change before it ships.
            </p>
            <p>
              In git terms, this shows up as a pattern: a <code className="text-confidence">feat</code> commit (here&apos;s the new feature, AI-generated against my spec) followed by a <code className="text-confidence">fix</code> commit (here&apos;s what I caught when I reviewed it). <strong>The second commit is where the real work is.</strong>
            </p>
          </div>
        </div>

        {/* ─────────── The killer eval-log table ─────────── */}
        <div className="animate-fade-up mb-12">
          <div className="max-w-[72ch] mb-6">
            <SectionMarker label="what i catch in review · a real example" className="mb-3" />
            <p className="text-ink-mute leading-relaxed">
              A real review from the AKSH project, May 2026. I&apos;d asked the AI to add an MCP server for NSE corporate actions. The first pass shipped a clean implementation that worked. The review pass caught seven things:
            </p>
          </div>

          <div className="relative bg-paper border border-line p-2 sm:p-3">
            <CornerBracket corner="tl" className="absolute top-1 left-1 text-ink-faint" />
            <CornerBracket corner="tr" className="absolute top-1 right-1 text-ink-faint" />
            <CornerBracket corner="bl" className="absolute bottom-1 left-1 text-ink-faint" />
            <CornerBracket corner="br" className="absolute bottom-1 right-1 text-ink-faint" />
            <EvalLogTable
              headerLabel="review #2026-05-15-mcp-corp-actions"
              columns={["category", "caught"]}
              rows={codeReviewLog}
            />
          </div>

          <div className="max-w-[72ch] mt-6">
            <p className="text-ink leading-relaxed">
              None of those are about the AI being wrong. The AI shipped plausible code. What it didn&apos;t ship was the <em>judgment</em> that turns plausible code into production-grade code. <strong>That&apos;s the layer that lives with the human.</strong>
            </p>
          </div>
        </div>

        {/* ─────────── Three rules ─────────── */}
        <div className="animate-fade-up mb-12 max-w-[72ch]">
          <SectionMarker label="three rules i enforce" className="mb-4" />
          <p className="text-ink-mute mb-6 leading-relaxed">
            Every system I build has explicit answers to three questions. If I can&apos;t answer them, the system isn&apos;t ready.
          </p>

          <div className="space-y-6">
            <div className="border-l-2 border-confidence pl-5">
              <div className="text-[11px] uppercase tracking-[0.16em] text-confidence mb-2">
                rule 1
              </div>
              <h3 className="text-ink text-xl mb-3">How do we know it&apos;s working?</h3>
              <p className="text-ink-mute leading-relaxed">
                Telemetry has to be honest. If the metric says &ldquo;99.7% accurate&rdquo; but the methodology that produced that number is circular, the metric is worse than no metric — it&apos;s actively misleading. The full story lives at{" "}
                <Link href="/decisions#honest-accuracy" className="text-confidence hover:underline underline-offset-4">
                  /decisions
                </Link>
                .
              </p>
            </div>

            <div className="border-l-2 border-warn pl-5">
              <div className="text-[11px] uppercase tracking-[0.16em] text-warn mb-2">
                rule 2
              </div>
              <h3 className="text-ink text-xl mb-3">What happens when it fails?</h3>
              <p className="text-ink-mute leading-relaxed">
                Errors have to surface, not vanish. Silent failures compound — by the time you notice, you&apos;re three weeks into wrong outputs and can&apos;t tell when it started. Every error has a payload-level surfaceable response, even if the system can keep running.
              </p>
            </div>

            <div className="border-l-2 border-critical pl-5">
              <div className="text-[11px] uppercase tracking-[0.16em] text-critical mb-2">
                rule 3
              </div>
              <h3 className="text-ink text-xl mb-3">When do we <em>not</em> use the AI?</h3>
              <p className="text-ink-mute leading-relaxed">
                The biggest mistake in agentic systems is using the LLM for things it&apos;s bad at. LLM extraction of structured financial numbers, for example, is <strong className="text-ink">22% accurate</strong> in my measurement — useless for the actual numbers, but useful for <em>which filing is significant</em>. Different layer, different tool, different precision budget.
              </p>
            </div>
          </div>
        </div>

        {/* ─────────── Closing ─────────── */}
        <div className="animate-fade-up mb-12 max-w-[72ch]">
          <SectionMarker label="what i'm trying to internalize" className="mb-4" />
          <p className="text-ink leading-relaxed">
            Three years solo, two production systems running, one BRAIN top-5% ranking. The thing I&apos;m still working on is the <em>human</em> side — moving from &ldquo;every architectural call is mine&rdquo; to &ldquo;every architectural call is the team&apos;s, and mine to defend or revise.&rdquo; That&apos;s the next stretch.
          </p>
        </div>

        {/* Navigation footer */}
        <div className="mt-16 border-t border-line pt-6 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.16em] text-ink-mute">
          <Link href="/" className="hover:text-ink transition">← back to /run</Link>
          <Link href="/work" className="hover:text-ink transition">← /work</Link>
          <Link href="/decisions" className="hover:text-ink transition">← /decisions</Link>
          <a
            href="https://github.com/srijanarya/aksh-trading-systems"
            target="_blank"
            rel="noopener noreferrer"
            className="text-confidence hover:underline underline-offset-4 ml-auto"
          >
            aksh public repo ↗
          </a>
        </div>
      </section>
    </main>
  );
}
