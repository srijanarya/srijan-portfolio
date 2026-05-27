// components/eval/EvalLogTable.tsx
// Inspect-AI-style results table — reused for /decisions failure-mode matrix
// AND /how-i-work code-review log. Same component, two data shapes.

import type { EvalLogRow } from "@/app/data/types";

const SEVERITY_COLOR: Record<NonNullable<EvalLogRow["severity"]>, string> = {
  HIGH: "text-critical",
  MED:  "text-warn",
  LOW:  "text-ink-mute",
};

export function EvalLogTable({
  columns,
  rows,
  headerLabel,
}: {
  columns: string[];
  rows: EvalLogRow[];
  /** Optional label rendered above the table, e.g. "review #2026-05-15-mcp-corp-actions" */
  headerLabel?: string;
}) {
  return (
    <div className="bg-paper border border-line overflow-x-auto">
      {headerLabel && (
        <div className="px-4 sm:px-5 py-3 border-b border-line text-[11px] uppercase tracking-[0.16em] text-ink-faint font-mono">
          {headerLabel}
        </div>
      )}

      <table className="w-full font-mono text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-[0.16em] text-ink-faint border-b border-line">
            <th className="px-3 sm:px-4 py-2.5 text-left w-12">#</th>
            {rows.some((r) => r.severity) && (
              <th className="px-3 sm:px-4 py-2.5 text-left w-20">severity</th>
            )}
            {columns.map((c) => (
              <th key={c} className="px-3 sm:px-4 py-2.5 text-left">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.num}
              className="border-b border-line last:border-b-0 hover:bg-canvas/40 transition-colors"
            >
              <td className="px-3 sm:px-4 py-3 text-ink-faint tabular-nums">{r.num}</td>
              {rows.some((row) => row.severity) && (
                <td className="px-3 sm:px-4 py-3">
                  {r.severity && (
                    <span
                      className={`text-[10px] uppercase tracking-[0.16em] ${SEVERITY_COLOR[r.severity]}`}
                    >
                      {r.severity}
                    </span>
                  )}
                </td>
              )}
              {columns.map((c) => (
                <td key={c} className="px-3 sm:px-4 py-3 text-ink">
                  {r.cells[c] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
