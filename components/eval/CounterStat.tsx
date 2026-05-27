"use client";
// components/eval/CounterStat.tsx
// Scroll-driven number count-up. Ticks 0 → `to` on first intersection.
// Honors prefers-reduced-motion implicitly (CSS handles the .animate-fade-up
// fallback; here we just snap to final value on raf failure).

import { useEffect, useRef, useState } from "react";

export function CounterStat({
  to,
  duration = 1200,
  precision = 0,
  suffix = "",
  prefix = "",
}: {
  to: number;
  duration?: number;
  precision?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!ref.current || fired.current) return;
    const el = ref.current;

    const animate = () => {
      fired.current = true;
      const start = performance.now();
      const tick = (t: number) => {
        const elapsed = t - start;
        const p = Math.min(Math.max(elapsed / Math.max(duration, 1), 0), 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
        setValue(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // If IntersectionObserver isn't available, animate immediately
    if (typeof IntersectionObserver === "undefined") {
      animate();
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          animate();
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  const formatted =
    precision === 0
      ? Math.round(value).toLocaleString("en-US")
      : value.toFixed(precision);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}
