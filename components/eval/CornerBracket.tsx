// components/eval/CornerBracket.tsx
// Diegetic decoration — corner glyphs that frame EvalCard.
// Server component; pure SVG.

type Corner = "tl" | "tr" | "bl" | "br";

const PATHS: Record<Corner, string> = {
  tl: "M 0 8 L 0 0 L 8 0",
  tr: "M 8 0 L 16 0 L 16 8",
  bl: "M 0 8 L 0 16 L 8 16",
  br: "M 8 16 L 16 16 L 16 8",
};

export function CornerBracket({
  corner,
  className = "",
  size = 12,
}: {
  corner: Corner;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      data-corner={corner}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[corner]} />
    </svg>
  );
}
