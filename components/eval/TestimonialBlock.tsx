// components/eval/TestimonialBlock.tsx
// External validation block — renders only "received" testimonials.
// "pending" ones stay invisible (tracked separately in data/testimonial-pipeline.md
// so we never over-claim social proof we don't have yet).

import type { Testimonial } from "@/app/data/types";
import { SectionMarker } from "./SectionMarker";

export function TestimonialBlock({ testimonials }: { testimonials?: Testimonial[] }) {
  const received = (testimonials ?? []).filter((t) => t.status === "received" && t.quote);
  if (received.length === 0) return null;

  return (
    <div className="mb-8">
      <SectionMarker label="external validation" className="mb-4" />
      <ul className="space-y-5">
        {received.map((t, i) => (
          <li
            key={i}
            className="relative border-l-2 border-confidence pl-5 sm:pl-6 py-1 max-w-[64ch]"
          >
            <p className="font-serif-italic text-lg sm:text-xl text-ink leading-snug mb-3">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="text-[11px] uppercase tracking-[0.16em] text-ink-mute flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-ink">— {t.author}</span>
              {t.role && (
                <>
                  <span className="text-ink-faint">·</span>
                  <span>{t.role}</span>
                </>
              )}
              {t.company && (
                <>
                  <span className="text-ink-faint">@</span>
                  <span>{t.company}</span>
                </>
              )}
              {t.link && (
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-confidence hover:underline underline-offset-4 ml-2"
                  aria-label="View testimonial source"
                >
                  ↗
                </a>
              )}
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}
