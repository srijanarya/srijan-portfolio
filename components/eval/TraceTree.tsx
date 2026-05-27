// components/eval/TraceTree.tsx
// Phoenix/LangSmith/Inspect-AI signature visual: hierarchical span tree
// with ASCII branch glyphs (├─, └─) and color-coded outcomes per node.
//
// Used on /decisions to render the Williams %R 5-layer investigation as
// a visualized eval trace rather than prose.

import type { TraceNode } from "@/app/data/types";

const OUTCOME_COLOR: Record<NonNullable<TraceNode["outcome"]>, string> = {
  PROMISING: "text-confidence",
  "RED FLAG": "text-warn",
  NOISE:     "text-ink-mute",
  COLLAPSE:  "text-critical",
  DROPPED:   "text-critical line-through decoration-1",
};

type Row = {
  prefix: string;
  branch: string;
  node: TraceNode;
};

function flatten(
  node: TraceNode,
  prefix = "",
  isLast = true,
  isRoot = true,
): Row[] {
  const branch = isRoot ? "" : isLast ? "└─" : "├─";
  const rows: Row[] = [{ prefix, branch, node }];
  if (node.children?.length) {
    const childPrefix = isRoot ? "" : prefix + (isLast ? "   " : "│  ");
    node.children.forEach((c, i) => {
      rows.push(...flatten(c, childPrefix, i === node.children!.length - 1, false));
    });
  }
  return rows;
}

export function TraceTree({ node }: { node: TraceNode }) {
  const rows = flatten(node);

  return (
    <div className="bg-paper border border-line p-5 sm:p-6 font-mono text-sm overflow-x-auto">
      <ul className="space-y-1.5">
        {rows.map((r, i) => (
          <li key={i} className="grid grid-cols-[auto_1fr] gap-2 items-center whitespace-pre">
            <span className="text-ink-faint select-none" aria-hidden>
              {r.prefix}{r.branch}{r.branch && " "}
            </span>
            <span className="flex items-baseline gap-3 flex-wrap">
              <span className="text-ink">{r.node.label}</span>
              {r.node.metric && (
                <span className="text-[11px] uppercase tracking-[0.12em] text-ink-mute tabular-nums">
                  ▪ {r.node.metric}
                </span>
              )}
              {r.node.outcome && (
                <span
                  className={`text-[10px] uppercase tracking-[0.16em] ${OUTCOME_COLOR[r.node.outcome]}`}
                >
                  [ {r.node.outcome} ]
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
