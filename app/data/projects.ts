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
      { label: "Public architecture walkthrough", href: "https://github.com/srijanarya/aksh-backtesting-trading" },
      { label: "Product page", href: "https://treumalgotech.in" },
    ],
    hero: true,
    testimonials: [
      {
        status: "received",
        quote:
          "Srijan was professional throughout the project and delivered the work according to the brief. They followed instructions well.",
        author: "Upwork client",
        role: "Stock Market Visualizations & API Integration project",
        source: "upwork",
        link: "https://www.upwork.com/freelancers/~013744500dd78c9569",
        date: "2026-02-05",
      },
    ],
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
  {
    id: "comedy-metrics",
    name: "Comedy Metrics",
    subtitle: "AI laugh-detection analytics for live stand-up + Happyverse open mic event platform",
    status: "shipped",
    confidence: 0.88,
    confidenceLabel: "HIGH",
    metrics: [
      { value: "LIVE",          label: "happyverseopenmic.netlify.app — performer registration with WhatsApp confirmation (English / Hindi / Hinglish / Marathi)" },
      { value: "9 performers",  count: 9, label: "analyzed in production Oct 27 2025 — Rishi 3.18 LPM (Headliner), Ashlyn 3.08 LPM (Professional)" },
      { value: "0.027%",        count: 0.027, precision: 3, suffix: "%", label: "variance on same-file repeat tests — 99.97% deterministic via COMEDY_DETERMINISTIC_MODE + CPU fallback" },
      { value: "LPM + ALD",     label: "novel metrics: Laughs Per Minute + Average Laugh Duration → maps performers to Headliner / Professional / Beginner tiers" },
    ],
    blurb:
      "AI laugh-detection analytics for live stand-up comedy + a working open mic event platform. The Whisper-based pipeline analyzes recordings to produce LPM (Laughs Per Minute) and ALD (Average Laugh Duration) — novel metrics for comedy performance. Determinism was the original ship-blocker: caught a 'system is inconsistent' bug, proved it was actually user comparing different audio files, then locked in CPU fallback + seeded RNG → 0.027% variance on repeat. Multi-agent architecture using BMAD-method expansion pack. Front-end LIVE on Netlify; backend API was on Railway (sun-set for cost).",
    stack: ["Python", "Whisper", "FastAPI", "Multi-agent", "Railway", "Netlify", "BMAD-method", "WhatsApp API"],
    links: [
      { label: "Live event platform", href: "https://happyverseopenmic.netlify.app" },
    ],
    hero: false,
    testimonials: [
      // Pending — performers Rishi (Headliner, 3.18 LPM) and Ashlyn (Professional, 3.08 LPM, 28 laughs detected) are strong named-user candidates.
      // Tracked in data/testimonial-pipeline.md
      { status: "pending", author: "Rishi (Headliner — Oct 27 2025 set)", source: "linkedin" },
    ],
  },
  {
    id: "growth-gap-fund",
    name: "Growth Gap Fund",
    subtitle: "Live fintech dashboard — authentication, real-time investment scoring",
    status: "shipped",
    confidence: 0.82,
    confidenceLabel: "MED",
    metrics: [
      { value: "Live",   label: "fintech dashboard with authentication + real-time investment scoring" },
      { value: "PRD-driven", label: "structured Product Requirements Document foundation, then implementation" },
      { value: "Public",     label: "open-source repo at github.com/srijanarya/growth-gap-fund" },
    ],
    blurb:
      "Live fintech dashboard for investment scoring. Built with proper PRD-first workflow — wrote the spec, then implemented. Authentication flow, real-time scoring, public repo. Part of the AKSH / Treum AlgoTech ecosystem (treumalgotech.in).",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
    links: [
      { label: "Public repo", href: "https://github.com/srijanarya/growth-gap-fund" },
      { label: "Product page", href: "https://treumalgotech.in" },
    ],
    hero: false,
    testimonials: [
      { status: "pending", author: "Growth Gap Fund stakeholder", source: "linkedin" },
    ],
  },
  {
    id: "treum-finance-content",
    name: "TREUM Finance",
    subtitle: "AI content generation platform for Indian Mutual Fund Distributors",
    status: "archived",
    confidence: 0.86,
    confidenceLabel: "HIGH",
    metrics: [
      { value: "15,874", count: 15874, label: "lines of Python across 155 files (src/)", source: "wc -l on src/*.py" },
      { value: "4 LLMs",  label: "OpenAI GPT-4-turbo (primary) + Claude + Gemini + Ollama (local fallback)" },
      { value: "Hindi",   label: "MFD-specific templates with Indian currency formatting (lakh/crore), bilingual delivery" },
      { value: "Multi-deploy", label: "Vercel + Render + Railway + macOS desktop installer (.app + DMG)" },
    ],
    blurb:
      "AI content generation platform purpose-built for Indian Mutual Fund Distributors (MFDs). Multi-LLM routing across GPT-4-turbo, Claude, Gemini, and Ollama. Hindi templates with lakh/crore formatting. Leonardo + Flux for visual generation. Razorpay payments + 3-tier license system (30-day trial). Shipped to demo (Mary, Dec 2024) — currently sun-set to manage hosting costs but full codebase intact.",
    stack: ["Python", "Flask", "OpenAI", "Anthropic", "Gemini", "Ollama", "Leonardo", "Flux", "Razorpay", "BMAD-method"],
    hero: false,
  },
  {
    id: "p2p-tracker",
    name: "P2P Crypto Arbitrage Scanner",
    subtitle: "Enterprise-grade scanner across 8 exchanges with ML prediction + real-time execution",
    status: "shipped",
    confidence: 0.85,
    confidenceLabel: "HIGH",
    metrics: [
      { value: "8 exchanges",  label: "real-time WebSocket connections + order routing across CEX/P2P venues" },
      { value: "85%+",         count: 85, suffix: "%", label: "ML prediction accuracy — Random Forest + XGBoost + LSTM ensemble" },
      { value: "<1ms",         label: "real-time inference latency · 10,000+ orders/sec throughput" },
      { value: "Kelly",        label: "Kelly-criterion-based risk-adjusted position sizing" },
    ],
    blurb:
      "Production-ready P2P cryptocurrency arbitrage system. ML ensemble (RF + XGBoost + LSTM) predicts arbitrage windows; real-time execution engine places orders across 8 exchanges; Kelly Criterion sizes positions risk-adjusted. Repo ships with a SECURITY_AUDIT.md and a SETUP_GUIDE.md — no real keys committed (verified by gitleaks-style scanning).",
    stack: ["Python", "Random Forest", "XGBoost", "LSTM", "WebSocket", "Kelly Criterion", "8-exchange APIs"],
    links: [
      { label: "Public repo", href: "https://github.com/srijanarya/p2p-tracker" },
    ],
    hero: false,
  },
  {
    id: "usdt-arbitrage-bot",
    name: "USDT Arbitrage Bot",
    subtitle: "Real-time USDT/USDC arbitrage across 5 exchanges with Indian TDS handling",
    status: "shipped",
    confidence: 0.82,
    confidenceLabel: "MED",
    metrics: [
      { value: "5 exchanges", label: "CoinDCX · ZebPay · Binance · KuCoin · CoinSwitch — WebSocket price monitoring" },
      { value: "TDS-aware",   label: "1% Indian-exchange TDS factored into profit calculation (most bots miss this)" },
      { value: "Live UI",     label: "auto-refreshing web dashboard + REST API + PostgreSQL historical store" },
    ],
    blurb:
      "Real-time cryptocurrency arbitrage bot monitoring USDT/USDC price differences across 5 exchanges. Indian-exchange-aware: factors the 1% TDS most arbitrage bots forget about. WebSocket price feeds, live dashboard, PostgreSQL historical store, REST API. TypeScript on Node 18+.",
    stack: ["TypeScript", "Node.js 18", "WebSocket", "PostgreSQL", "REST API"],
    links: [
      { label: "Public repo (MIT)", href: "https://github.com/srijanarya/usdt-arbitrage-bot" },
    ],
    hero: false,
  },
  {
    id: "musicians-atelier",
    name: "The Musicians' Atelier",
    subtitle: "Studio management SaaS for independent music teachers in India",
    status: "shipped",
    confidence: 0.83,
    confidenceLabel: "MED",
    metrics: [
      { value: "v1 LIVE",   label: "client-side PWA on Netlify — students + cycles + scheduling + fees + WhatsApp" },
      { value: "3,200+",    count: 3200, suffix: "+", label: "lines of React + zustand (5 pages, IndexedDB-backed)" },
      { value: "6-table",   label: "multi-tenant schema (teachers / students / cycles / sessions / payments / instrument_rentals) with Row-Level Security" },
    ],
    blurb:
      "Studio management platform purpose-built for independent music teachers in India. v1 live on Netlify — pure client-side PWA managing students, lesson cycles, scheduling, fees, and WhatsApp communications via IndexedDB (zero cloud cost). v2 in PRD: Supabase cloud sync + Row-Level Security, automated WhatsApp notifications, instrument rentals, churn analytics. Target: 10–100 students per teacher, Hindi/English bilingual.",
    stack: ["React 19", "Vite", "zustand", "Supabase", "IndexedDB (idb)", "date-fns", "react-router 7"],
    hero: false,
    testimonials: [
      { status: "pending", author: "Music teacher user (v1 Netlify deployment)", source: "linkedin" },
    ],
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
  {
    id: "aksh-ml-lookahead",
    title: "The 3-month ML system invalidated by 1 day of look-ahead",
    pull:
      "The bug produced plausible results — prices existed, just from the wrong date. No warnings, no errors. Only discovered when comparing with Yahoo Finance. Silent failures compound: by the time you notice, you're months into wrong outputs.",
    body: "",
    outcome: "REARCHITECTED",
    source: "AKSH ML system (Aug–Nov 2025) · LOOK_AHEAD_BIAS_POSTMORTEM.md · 2025-11-20",
    trace: {
      label: "Look-ahead bias — 3-layer failure cascade",
      children: [
        { label: "Layer 1: API behavior assumption",
          metric: "Angel One end-date inclusive",
          outcome: "RED FLAG",
          children: [{ label: "set end_date=\"2024-11-01\" assuming exclusive — actually inclusive" }] },
        { label: "Layer 2: No date validation in signal generation",
          metric: "data['close'].iloc[-1]",
          outcome: "RED FLAG",
          children: [{ label: "always grabbed last close in the data — sometimes a future date" }] },
        { label: "Layer 3: Silent failure",
          metric: "plausible prices, no errors",
          outcome: "COLLAPSE",
          children: [
            { label: "NECCLTD entry ₹33.93 (Nov 1) vs ₹30.85 (Oct 31)" },
            { label: "PRUDENT entry ₹3520.50 (Nov 1) vs ₹3110.02 (Oct 31)" },
          ],
        },
        { label: "Verdict: 3 months of backtests invalidated",
          children: [
            { label: "Caught via independent Yahoo Finance cross-reference" },
            { label: "Built BacktestValidator class — look-ahead detection + signal timing checks + price sanity", outcome: "DROPPED" },
          ],
        },
      ],
    },
    failureModes: [
      { num: 1, cells: { mode: "look-ahead bias",            freq: "100% of backtest", impact: "future close prices as entry signals" }, severity: "HIGH" },
      { num: 2, cells: { mode: "wrong stock universe",        freq: "68.7%",            impact: "824/1200 stocks were dead listings (Yahoo 404)" }, severity: "HIGH" },
      { num: 3, cells: { mode: "bond/debt contamination",     freq: "7.8%",             impact: "436/5,575 symbols were non-equity (cleaned out)" }, severity: "MED" },
      { num: 4, cells: { mode: "no temporal validation",      freq: "—",                impact: "system blindly used data['close'].iloc[-1]" }, severity: "HIGH" },
    ],
  },
];

// Selectors used by pages
export const heroProjects = () => PROJECTS.filter((p) => p.hero);
export const projectById = (id: string) => PROJECTS.find((p) => p.id === id);
export const decisionById = (id: string) => DECISIONS.find((d) => d.id === id);
