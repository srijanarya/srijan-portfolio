// components/eval/EvalRow.tsx
// Name-value metadata row. Used in the hero metadata table on home.
// Server component.

export function EvalRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[180px_1fr] bg-canvas px-4 py-3 eval-row">
      <span className="text-[11px] uppercase tracking-[0.14em] text-ink-faint self-center">
        {label}
      </span>
      <span className="text-ink">{value}</span>
    </div>
  );
}
