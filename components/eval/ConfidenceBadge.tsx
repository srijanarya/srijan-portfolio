// components/eval/ConfidenceBadge.tsx
// HIGH / MED / FLAGGED / DROPPED chip with bracketed diegetic styling.
// Server component.

import type { ConfidenceLabel } from "@/app/data/types";

const COLOR: Record<ConfidenceLabel, string> = {
  HIGH:    "text-confidence",
  MED:     "text-warn",
  FLAGGED: "text-critical",
  DROPPED: "text-ink-faint line-through",
};

export function ConfidenceBadge({
  label,
  score,
  showScore = true,
}: {
  label: ConfidenceLabel;
  score?: number;
  showScore?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] ${COLOR[label]}`}
    >
      <span className="text-ink-faint" aria-hidden>[</span>
      <span>{label}</span>
      {showScore && score !== undefined && (
        <>
          <span className="text-ink-faint" aria-hidden>·</span>
          <span className="tabular-nums">{(score * 100).toFixed(1)}%</span>
        </>
      )}
      <span className="text-ink-faint" aria-hidden>]</span>
    </span>
  );
}
