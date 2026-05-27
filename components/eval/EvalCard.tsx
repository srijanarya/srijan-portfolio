// components/eval/EvalCard.tsx
// The full-diegetic project card — composes all eval primitives.
// Server component (CounterStat children handle their own client-side animation).

import Link from "next/link";
import type { Project } from "@/app/data/types";
import { ConfidenceBar } from "./ConfidenceBar";
import { MetricBar } from "./MetricBar";
import { CornerBracket } from "./CornerBracket";
import { HallucinationFlag } from "./HallucinationFlag";
import { CounterStat } from "./CounterStat";

const STATUS_COLOR = {
  shipped:  "text-confidence",
  active:   "text-warn",
  archived: "text-ink-faint",
} as const;

export function EvalCard({
  project: p,
  dense = false,
}: {
  project: Project;
  dense?: boolean;
}) {
  const metricCount = dense ? 2 : 3;

  return (
    <article className="relative bg-paper border border-line p-6 group hover:border-line-strong transition-colors">
      <CornerBracket
        corner="tl"
        className="absolute top-1.5 left-1.5 text-ink-faint group-hover:text-confidence transition-colors"
      />
      <CornerBracket
        corner="tr"
        className="absolute top-1.5 right-1.5 text-ink-faint group-hover:text-confidence transition-colors"
      />
      <CornerBracket
        corner="bl"
        className="absolute bottom-1.5 left-1.5 text-ink-faint group-hover:text-confidence transition-colors"
      />
      <CornerBracket
        corner="br"
        className="absolute bottom-1.5 right-1.5 text-ink-faint group-hover:text-confidence transition-colors"
      />

      <header className="flex items-baseline justify-between gap-4 mb-4">
        <h3 className="text-2xl text-ink leading-none">{p.name}</h3>
        <span
          className={`text-[10px] uppercase tracking-[0.16em] ${STATUS_COLOR[p.status]}`}
        >
          [ {p.status} ]
        </span>
      </header>

      <p className="text-ink-mute text-sm mb-5 leading-relaxed">{p.subtitle}</p>

      <div className="mb-5">
        <ConfidenceBar value={p.confidence} label={`confidence: ${p.confidenceLabel}`} />
      </div>

      <ul className="space-y-1.5 mb-5">
        {p.metrics.slice(0, metricCount).map((m, i) => (
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

      {p.hallucination?.caught && p.hallucination.decisionLink && (
        <div className="mb-5">
          <HallucinationFlag count={1} href={p.hallucination.decisionLink} inline />
        </div>
      )}

      <Link
        href={`/work#${p.id}`}
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-mute hover:text-confidence transition"
      >
        <span aria-hidden>[ </span>
        <span>inspect</span>
        <span aria-hidden> ▸ ]</span>
      </Link>
    </article>
  );
}
