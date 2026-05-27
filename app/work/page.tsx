/**
 * /work — Selected Responses
 *
 * Long-form case studies for each shipped project. Content sourced verbatim
 * from interview-prep/portfolio-pages/work.md (the user's authentic voice).
 *
 * Each project is anchored by id so /work#aksh, /work#earningsiq etc. land
 * at the right section (inbound links from the home page EvalCards).
 */

import type { Metadata } from "next";
import Link from "next/link";
import { EvalHeader } from "@/components/eval/EvalHeader";
import { SectionMarker } from "@/components/eval/SectionMarker";
import { ConfidenceBar } from "@/components/eval/ConfidenceBar";
import { MetricBar } from "@/components/eval/MetricBar";
import { HallucinationFlag } from "@/components/eval/HallucinationFlag";
import { CornerBracket } from "@/components/eval/CornerBracket";
import { CounterStat } from "@/components/eval/CounterStat";
import { PROJECTS } from "@/app/data/projects";
import type { Project } from "@/app/data/types";

export const metadata: Metadata = {
  title: "Selected Responses",
  description:
    "Long-form case studies of production AI systems shipped solo: AKSH, EarningsIQ, bmad-leadgen, WorldQuant BRAIN IQC 2026.",
};

const STATUS_COLOR = {
  shipped:  "text-confidence",
  active:   "text-warn",
  archived: "text-ink-faint",
} as const;

function ProjectCaseStudy({ project: p }: { project: Project }) {
  return (
    <article
      id={p.id}
      className="relative bg-paper border border-line p-8 sm:p-10 scroll-mt-24"
    >
      <CornerBracket corner="tl" className="absolute top-2 left-2 text-ink-faint" />
      <CornerBracket corner="tr" className="absolute top-2 right-2 text-ink-faint" />
      <CornerBracket corner="bl" className="absolute bottom-2 left-2 text-ink-faint" />
      <CornerBracket corner="br" className="absolute bottom-2 right-2 text-ink-faint" />

      {/* Heading */}
      <header className="grid gap-3 mb-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl text-ink leading-none">{p.name}</h2>
          <span
            className={`text-[10px] uppercase tracking-[0.16em] shrink-0 ${STATUS_COLOR[p.status]}`}
          >
            [ {p.status} ]
          </span>
        </div>
        <p className="text-ink-mute text-base sm:text-lg leading-relaxed">
          {p.subtitle}
        </p>
      </header>

      {/* Confidence */}
      <div className="mb-8 max-w-md">
        <ConfidenceBar value={p.confidence} label={`confidence: ${p.confidenceLabel}`} />
      </div>

      {/* Blurb — the editorial pull */}
      <div className="mb-8 max-w-[70ch]">
        <p className="font-serif-italic text-xl sm:text-2xl text-ink leading-snug">
          {p.blurb}
        </p>
      </div>

      {/* Metrics */}
      <div className="mb-8">
        <SectionMarker label="verified metrics" className="mb-4" />
        <ul className="space-y-2.5">
          {p.metrics.map((m, i) => (
            <li key={i}>
              <MetricBar
                value={
                  m.count !== undefined ? (
                    <CounterStat
                      to={m.count}
                      precision={m.precision ?? 0}
                      suffix={m.suffix ?? ""}
                    />
                  ) : (
                    m.value
                  )
                }
                label={m.label}
                emphasis={i === 0}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Stack */}
      {p.stack && p.stack.length > 0 && (
        <div className="mb-8">
          <SectionMarker label="stack" className="mb-3" />
          <div className="flex flex-wrap gap-2 text-xs">
            {p.stack.map((s) => (
              <span
                key={s}
                className="inline-flex items-center px-2.5 py-1 border border-line text-ink-mute"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hallucination flag */}
      {p.hallucination?.caught && p.hallucination.decisionLink && (
        <div className="mb-8 border-l-2 border-critical pl-5 py-3 bg-critical/[0.04]">
          <div className="mb-2">
            <HallucinationFlag count={1} href={p.hallucination.decisionLink} inline />
          </div>
          <p className="text-ink-mute text-sm leading-relaxed">
            {p.hallucination.story}
          </p>
        </div>
      )}

      {/* Links */}
      {p.links && p.links.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.16em] border-t border-line pt-5">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-confidence hover:underline underline-offset-4"
            >
              → {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export default function WorkPage() {
  return (
    <main className="flex flex-1 flex-col">
      <EvalHeader runId="001" subject="SRIJAN-3YR-SOLO-FOUNDER-V3" />

      <section className="mx-auto w-full max-w-[1200px] px-6 py-16 md:py-20 lg:py-24">

        {/* Page header */}
        <div className="animate-fade-up mb-12 max-w-[64ch]">
          <SectionMarker label="page · /work" className="mb-3" />
          <h1 className="text-4xl sm:text-5xl text-ink leading-[1.05] tracking-tight mb-4">
            Selected Responses
          </h1>
          <p className="font-serif-italic text-xl sm:text-2xl text-ink-mute leading-snug">
            Three production AI systems built solo over three years. Each one shipped. Each one with real edge cases handled.
          </p>
        </div>

        {/* Case studies — one per project, anchored by id */}
        <div className="grid gap-12">
          {PROJECTS.map((p) => (
            <div key={p.id} className="animate-fade-up">
              <ProjectCaseStudy project={p} />
            </div>
          ))}
        </div>

        {/* Navigation footer */}
        <div className="mt-16 border-t border-line pt-6 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.16em] text-ink-mute">
          <Link href="/" className="hover:text-ink transition">← back to /run</Link>
          <Link href="/decisions" className="hover:text-ink transition">./decisions →</Link>
          <Link href="/how-i-work" className="hover:text-ink transition">./how-i-work →</Link>
        </div>
      </section>
    </main>
  );
}
