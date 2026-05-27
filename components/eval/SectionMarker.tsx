// components/eval/SectionMarker.tsx
// [ section ] editorial divider used to label major sections.
// Server component.

export function SectionMarker({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`text-[11px] uppercase tracking-[0.20em] text-ink-faint ${className}`}
    >
      <span aria-hidden>[ </span>
      <span>{label}</span>
      <span aria-hidden> ]</span>
    </div>
  );
}
