// app/data/projects.ts
// Single source-of-truth for portfolio content.
// Every metric cites cv.md (canonical) — verified numbers only.

import type { Project, Decision } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "aksh",
    name: "AKSH",
    subtitle: "Live algorithmic trading on the NSE",
    status: "shipped",
    confidence: 0.974,
    confidenceLabel: "HIGH",
    metrics: [
      { value: "377",   count: 377,    label: "broker-feed failovers in one trading session — zero downtime, zero missed trades", source: "cv.md:18" },
      { value: "400K+", count: 400000, suffix: "+", label: "lines of production code shipped solo since 2023", source: "cv.md:17" },
      { value: "2023",  label: "running live on NSE since", source: "cv.md:28" },
    ],
    blurb:
      "Live NSE options platform built solo over three years. During one full session where the primary data feed went down all day, the reliability layer auto-switched to a backup 377 times with no downtime and no missed trades.",
    stack: ["Python", "FastAPI", "PostgreSQL", "React", "Zerodha Kite", "AWS"],
    links: [
      { label: "Public architecture walkthrough", href: "https://github.com/srijanarya/aksh-trading-systems" },
      { label: "Product page", href: "https://treumalgotech.in" },
    ],
    hero: true,
  },
  {
    id: "earningsiq",
    name: "EarningsIQ",
    subtitle: "AI that reads financial filings — and knows when it's wrong",
    status: "shipped",
    confidence: 0.94,
    confidenceLabel: "HIGH",
    metrics: [
      { value: "20K+",   count: 20000, suffix: "+", label: "filings processed across 3,604 BSE companies", source: "cv.md:19" },
      { value: "99.7%",  count: 99.7, suffix: "%", precision: 1, label: "classifier accuracy (verified independently vs Screener.in)", source: "cv.md:20" },
      { value: "17ms",   count: 17, suffix: "ms", label: "p50 API latency", source: "cv.md:20" },
    ],
    blurb:
      "Two-layer eval pipeline. A classifier decides which filings matter (99.7% accuracy at 17ms p50). An LLM extractor pulls the structured numbers. Every extraction passes through an LLM-as-judge that scores it and gates low-confidence outputs.",
    stack: ["Python", "Claude + GPT", "NSE/BSE XBRL", "FastAPI", "PostgreSQL", "LLM-as-judge"],
    hero: true,
    hallucination: {
      caught: true,
      story:
        "Previously reported 100% extraction accuracy. The validation methodology was circular — checking the LLM's output against the same source it had extracted from. Caught it, rebuilt validation against Screener.in independent ground truth, found real accuracy was 22.5% revenue / 15.4% PAT / 0% EPS. Wrote systematic error analysis. Rearchitected the system.",
      decisionLink: "/decisions#honest-accuracy",
    },
  },
  {
    id: "bmad-leadgen",
    name: "bmad-leadgen",
    subtitle: "Multi-agent lead generation with explicit inter-agent contracts",
    status: "shipped",
    confidence: 0.86,
    confidenceLabel: "MED",
    metrics: [
      { value: "53K+", count: 53000, suffix: "+", label: "lines of TypeScript multi-agent system", source: "cv.md:22" },
      { value: "BMAD", label: "implements BMAD-method (48K+ stars) with inter-agent contracts", source: "github.com/bmadcode/BMAD-METHOD" },
    ],
    blurb:
      "Most multi-agent demos are a single prompt with three personas. This one has contracts between agents — each one knows what it owes the next and what it can rely on receiving. That's the difference between a demo and a system that survives production.",
    stack: ["TypeScript", "Claude API", "multi-agent orchestration"],
    links: [{ label: "BMAD-method on GitHub", href: "https://github.com/bmadcode/BMAD-METHOD" }],
    hero: true,
  },
  {
    id: "brain-iqc-2026",
    name: "WorldQuant BRAIN IQC 2026",
    subtitle: "Top 5% of 286,757 — 12-alpha portfolio in Stage 1",
    status: "active",
    confidence: 0.92,
    confidenceLabel: "HIGH",
    metrics: [
      { value: "Top 5%", count: 5, suffix: "%", label: "of 286,757 participants globally", source: "cv.md:16" },
      { value: "2.08",   count: 2.08, precision: 2, label: "best alpha Sharpe ratio", source: "cv.md:16" },
      { value: "12",     count: 12, label: "alphas in active portfolio across 5 datasets", source: "cv.md:21" },
    ],
    blurb:
      "Active alpha-research credential. Twelve alphas across five datasets currently submitted in IQC 2026 Stage 1 — Sharpe-scored, dataset-diversified, actively running. The artifact of distrust-your-own-positive-results applied to live quant research.",
    links: [{ label: "IQC 2026 platform", href: "https://platform.worldquantbrain.com/competition/IQC2026" }],
    hero: false,
  },
];

export const DECISIONS: Decision[] = [
  {
    id: "williams-r",
    title: "The Williams %R alpha I almost shipped",
    pull:
      "A signal with year-over-year Sharpe std of 1.61 is regime-dependent. It worked in one year because the market happened to favor mean-reversion that year. Not because the indicator captures something real.",
    body: "", // populated in Block 5 from decisions.md
    outcome: "DROPPED",
    source: "BRAIN IQC research · commit 146c9c09 · WILLIAMS_R_DECISION.md",
    trace: {
      label: "Williams %R investigation",
      children: [
        { label: "Layer 1: 1yr cross-sectional",    metric: "Sharpe 0.74",      outcome: "PROMISING",
          children: [{ label: "decision: don't trust one positive result" }] },
        { label: "Layer 2: 72 synthetic params",    metric: "0/72 profitable",  outcome: "RED FLAG" },
        { label: "Layer 3: 10 NSE per-symbol",      metric: "1/10 profitable",  outcome: "NOISE" },
        { label: "Layer 4: 3yr robustness",         metric: "Sharpe +0.02",     outcome: "COLLAPSE" },
        { label: "Layer 5: 5yr robustness",         metric: "Sharpe −0.40",     outcome: "COLLAPSE" },
        { label: "Year-by-year breakdown",          metric: "2/6 yrs, std 1.61",
          children: [
            { label: "verdict: regime-dependent fluke",
              children: [{ label: "DROPPED before Phase 4 compute", outcome: "DROPPED" }],
            },
          ],
        },
      ],
    },
  },
  {
    id: "honest-accuracy",
    title: "The 100% accuracy report that was actually 22%",
    pull:
      "If your ground truth comes from the same source as your prediction, you don't have a measurement — you have a tautology. Validation methodology is the foundation. Everything else is decoration.",
    body: "", // populated in Block 5
    outcome: "REARCHITECTED",
    source: "EarningsIQ Q3FY26_Honest_Accuracy_Report.pdf",
    diff: {
      left: "REPORTED",
      right: "ACTUAL · SCREENER.IN",
      rows: [
        { criterion: "Revenue accuracy", reported: "100%", actual: "22.5%", delta: "−77.5" },
        { criterion: "PAT accuracy",     reported: "100%", actual: "15.4%", delta: "−84.6" },
        { criterion: "EPS accuracy",     reported: "100%", actual: "0.0%",  delta: "−100.0" },
      ],
    },
    failureModes: [
      { num: 1, cells: { mode: "unit confusion",       freq: "—",   impact: "100× errors (lakhs vs crores)" }, severity: "HIGH" },
      { num: 2, cells: { mode: "NULL extractions",     freq: "29%", impact: "full miss when PDF had the data" }, severity: "HIGH" },
      { num: 3, cells: { mode: "near-zero hallucinate", freq: "7%",  impact: "values close to zero invented" }, severity: "MED" },
      { num: 4, cells: { mode: "catastrophic",          freq: "—",   impact: "10,000× magnitude misreads" }, severity: "HIGH" },
      { num: 5, cells: { mode: "cross-field contam",    freq: "—",   impact: "wrong row of the table" }, severity: "MED" },
      { num: 6, cells: { mode: "date mismatches",       freq: "—",   impact: "current qtr data into prior qtr fields" }, severity: "MED" },
    ],
  },
];

// Selectors used by pages
export const heroProjects = () => PROJECTS.filter((p) => p.hero);
export const projectById = (id: string) => PROJECTS.find((p) => p.id === id);
export const decisionById = (id: string) => DECISIONS.find((d) => d.id === id);
