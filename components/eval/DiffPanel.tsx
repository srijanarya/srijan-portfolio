// components/eval/DiffPanel.tsx
// Promptfoo-style side-by-side diff: REPORTED vs ACTUAL, with delta column.
// Used on /decisions for the Honest Accuracy Report's 100% → 22.5% reveal.

import type { DiffRow } from "@/app/data/types";

export function DiffPanel({
  left,
  right,
  rows,
}: {
  left: string;
  right: string;
  rows: DiffRow[];
}) {
  return (
    <div className="bg-paper border border-line overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr] border-b border-line">
        <div className="px-4 sm:px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-critical bg-critical/[0.06] border-r border-line">
          [ {left} ]
        </div>
        <div className="px-4 sm:px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-confidence bg-confidence/[0.04]">
          [ {right} ]
        </div>
      </div>

      {/* Rows */}
      <ul>
        {rows.map((r, i) => (
          <li
            key={i}
            className="grid grid-cols-[1fr_1fr] border-b border-line last:border-b-0"
          >
            <div className="px-4 sm:px-5 py-4 border-r border-line">
              <div className="text-[10px] uppercase tracking-[0.16em] text-ink-faint mb-1">
                {r.criterion}
              </div>
              <div className="text-2xl text-critical tabular-nums font-semibold">
                {r.reported}
              </div>
            </div>
            <div className="px-4 sm:px-5 py-4 flex items-baseline justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-ink-faint mb-1">
                  {r.criterion}
                </div>
                <div className="text-2xl text-confidence tabular-nums font-semibold">
                  {r.actual}
                </div>
              </div>
              <span className="text-xs text-critical uppercase tracking-[0.16em] tabular-nums">
                ▼ {r.delta}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
