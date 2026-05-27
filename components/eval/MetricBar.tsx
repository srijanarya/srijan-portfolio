// components/eval/MetricBar.tsx
// ❯ value label — the project-card stat row.
// Server component.

export function MetricBar({
  value,
  label,
  emphasis = false,
}: {
  value: React.ReactNode;
  label: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-3 text-sm">
      <span className="text-ink-faint shrink-0" aria-hidden>❯</span>
      <span
        className={`shrink-0 tabular-nums ${
          emphasis ? "text-confidence text-base font-semibold" : "text-ink"
        }`}
      >
        {value}
      </span>
      <span className="text-ink-mute">{label}</span>
    </div>
  );
}
