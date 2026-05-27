// components/eval/ConfidenceBar.tsx
// Animated fill bar — drives the page-load confidence-climb moment.
// Server component (animation is pure CSS via --fill-pct variable).

export function ConfidenceBar({
  value,
  label,
  variant = "confidence",
}: {
  value: number;
  label?: string;
  variant?: "confidence" | "warn" | "critical";
}) {
  const clamped = Math.max(0, Math.min(1, value));
  const fillColor =
    variant === "confidence" ? "bg-confidence"
    : variant === "warn"     ? "bg-warn"
                              : "bg-critical";

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.16em] text-ink-mute mb-2">
          <span>{label}</span>
          <span className="tabular-nums">{(clamped * 100).toFixed(1)}%</span>
        </div>
      )}
      <div className="relative h-[6px] w-full overflow-hidden bg-paper border border-line">
        <div
          data-role="fill"
          className={`animate-fill-bar absolute inset-y-0 left-0 w-full ${fillColor}`}
          style={{
            ["--fill-pct" as string]: clamped,
            transform: `scaleX(${clamped})`,
            transformOrigin: "left center",
          }}
        />
      </div>
    </div>
  );
}
