// app/data/types.ts
// Shared types used across the eval-dashboard portfolio.

export type ConfidenceLabel = "HIGH" | "MED" | "FLAGGED" | "DROPPED";

export type ProjectStatus = "shipped" | "active" | "archived";

export interface VerifiedMetric {
  /** Display value, e.g. "400K+" or "99.7%" */
  value: string;
  /** Optional numeric for animated counters (undefined = no count-up) */
  count?: number;
  /** Suffix for counter, e.g. "+", "%" */
  suffix?: string;
  /** Decimal precision for counter (default 0) */
  precision?: number;
  /** Short label describing what the number measures */
  label: string;
  /** Where this metric is verified (e.g. "cv.md:18") */
  source?: string;
}

/** External validation from someone other than the candidate.
 *  Only rendered when status === "received". "pending" testimonials
 *  are tracked in data/testimonial-pipeline.md but stay invisible
 *  until the actual quote arrives — no over-claiming. */
export interface Testimonial {
  status: "pending" | "received";
  quote?: string;                    // verbatim, only required when received
  author: string;                    // "Jane Doe"
  role?: string;                     // "Head of Engineering"
  company?: string;                  // "Foo Inc"
  source?: "linkedin" | "email" | "private-note" | "upwork";
  link?: string;                     // public link (LinkedIn endorsement etc.)
  date?: string;                     // YYYY-MM-DD when received
}

export interface Project {
  id: string;                       // url-safe slug
  name: string;
  subtitle: string;
  status: ProjectStatus;
  confidence: number;               // 0..1
  confidenceLabel: ConfidenceLabel;
  metrics: VerifiedMetric[];
  blurb: string;                    // 2-3 sentences verbatim from work.md
  stack?: string[];
  links?: { label: string; href: string }[];
  hero: boolean;                    // featured on home?
  hallucination?: {
    caught: boolean;
    story: string;
    decisionLink?: string;
  };
  testimonials?: Testimonial[];      // external validators (rendered only when received)
}

/** Sub-row of a trace tree — the Williams %R layered investigation. */
export interface TraceNode {
  label: string;
  metric?: string;                  // e.g. "Sharpe 0.74"
  outcome?: "PROMISING" | "RED FLAG" | "NOISE" | "COLLAPSE" | "DROPPED";
  children?: TraceNode[];
}

/** Side-by-side diff row used on /decisions for Honest Accuracy. */
export interface DiffRow {
  criterion: string;                // "Revenue"
  reported: string;                 // "100%"
  actual: string;                   // "22.5%"
  delta: string;                    // "−77.5"
}

/** Generic eval-log row — used for the failure-mode matrix and the code-review log. */
export interface EvalLogRow {
  num: number;
  cells: Record<string, string>;     // arbitrary column -> value
  severity?: "HIGH" | "MED" | "LOW";  // optional color coding
}

export interface Decision {
  id: string;
  title: string;
  pull: string;                      // editorial pull-quote (Instrument Serif italic)
  body: string;                      // markdown
  outcome: "DROPPED" | "REARCHITECTED";
  source?: string;
  /** Optional structured visualization data */
  trace?: TraceNode;                 // for /decisions Williams %R
  diff?: { left: string; right: string; rows: DiffRow[] };  // for Honest Accuracy
  failureModes?: EvalLogRow[];       // for EarningsIQ failure-mode matrix
}
