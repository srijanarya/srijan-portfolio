/**
 * AI Eval Dashboard — Home (Block 2/7 deployed)
 *
 * The meta-joke: this portfolio is rendered as a real Anthropic/Patronus-style
 * eval-tool dashboard. The "AI run" being evaluated IS Srijan.
 *
 * Block 2 refactor: every inline JSX block from Block 1 is now a typed
 * component imported from `components/eval/*`. Three EvalCards (AKSH,
 * EarningsIQ, bmad-leadgen) replace the old "next: project cards" placeholder.
 */

import { EvalHeader } from "@/components/eval/EvalHeader";
import { EvalRow } from "@/components/eval/EvalRow";
import { ConfidenceBar } from "@/components/eval/ConfidenceBar";
import { EvalCard } from "@/components/eval/EvalCard";
import { HallucinationFlag } from "@/components/eval/HallucinationFlag";
import { SectionMarker } from "@/components/eval/SectionMarker";
import { heroProjects } from "@/app/data/projects";

const RUN = {
  id: "001",
  subject: "SRIJAN-3YR-SOLO-FOUNDER-V3",
  confidence: 0.964,
  confidenceLabel: "HIGH" as const,
  hallucinationsCaught: 1,
  sourcesVerified: 4,
  lastEval: "2026-05-27T18:00:00+05:30",
  // The locked verdict line — from the canonical STAR+R pitch in the
  // AI-Native Engineer identity memory file. This is the eval thesis.
  verdict:
    "My core thesis is that the next-decade differentiator in agentic AI isn't the prompt — it's the eval. Every team can ship a demo. Very few can ship a system that knows when it's wrong.",
};

export default function Home() {
  const projects = heroProjects();

  return (
    <main className="flex flex-1 flex-col">
      <EvalHeader runId={RUN.id} subject={RUN.subject} />

      <section className="relative">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-6 py-16 md:py-24 lg:py-28">

          {/* CONFIDENCE BAR — the one choreographed page-load animation */}
          <div className="animate-fade-up">
            <ConfidenceBar
              value={RUN.confidence}
              label={`confidence_score · ${RUN.confidenceLabel}`}
            />
          </div>

          {/* IDENTITY */}
          <div className="animate-fade-up stagger-2">
            <SectionMarker label="identity" className="mb-3" />
            <h1 className="text-5xl sm:text-6xl md:text-7xl text-ink leading-[0.95] tracking-tight">
              Srijan Arya<span className="text-confidence animate-cursor">_</span>
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-ink-mute">
              AI-Native Senior Engineer
              <span className="mx-3 text-ink-faint" aria-hidden>·</span>
              <span>Mumbai → remote</span>
            </p>
          </div>

          {/* VERDICT — Instrument Serif italic editorial pull */}
          <div className="animate-fade-up stagger-3 max-w-[72ch]">
            <SectionMarker label="verdict" className="mb-3" />
            <p className="font-serif-italic text-2xl sm:text-3xl text-ink leading-[1.35]">
              {RUN.verdict}
            </p>
          </div>

          {/* EVAL METADATA TABLE */}
          <div className="animate-fade-up stagger-4 grid gap-px bg-line border border-line text-sm max-w-2xl">
            <EvalRow
              label="hallucinations_caught"
              value={
                <HallucinationFlag
                  count={RUN.hallucinationsCaught}
                  href="/decisions#honest-accuracy"
                  inline
                />
              }
            />
            <EvalRow
              label="verified_by"
              value={
                <span className="text-confidence-dim">
                  {RUN.sourcesVerified} sources ✓
                </span>
              }
            />
            <EvalRow
              label="last_eval"
              value={
                <span className="text-ink-mute">
                  {new Date(RUN.lastEval).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })} IST
                </span>
              }
            />
            <EvalRow
              label="status"
              value={
                <span className="text-confidence">ACCEPTING NEW EVALUATIONS</span>
              }
            />
          </div>

          {/* SELECTED RESPONSES — 3 hero project cards */}
          <div className="animate-fade-up stagger-5">
            <SectionMarker label="selected responses" className="mb-6" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <EvalCard key={p.id} project={p} />
              ))}
            </div>
          </div>

          {/* EXTERNAL INPUTS — all the public surfaces (anchored at #contact) */}
          <div id="contact" className="animate-fade-up stagger-6 scroll-mt-24">
            <SectionMarker label="external inputs" className="mb-3" />
            <p className="text-ink-mute text-sm mb-4 max-w-[60ch]">
              Reach me directly. All four channels read.
            </p>
            <div className="grid gap-px bg-line border border-line text-sm max-w-2xl">
              <EvalRow
                label="email"
                value={
                  <a
                    href="mailto:srijanaryay@gmail.com"
                    className="text-confidence hover:underline underline-offset-4 break-all"
                  >
                    srijanaryay@gmail.com
                  </a>
                }
              />
              <EvalRow
                label="github"
                value={
                  <a
                    href="https://github.com/srijanarya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-confidence hover:underline underline-offset-4 break-all"
                  >
                    github.com/srijanarya ↗
                  </a>
                }
              />
              <EvalRow
                label="linkedin"
                value={
                  <a
                    href="https://linkedin.com/in/srijan-arya-a0a50693"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-confidence hover:underline underline-offset-4 break-all"
                  >
                    linkedin.com/in/srijan-arya-a0a50693 ↗
                  </a>
                }
              />
              <EvalRow
                label="upwork"
                value={
                  <a
                    href="https://www.upwork.com/freelancers/~013744500dd78c9569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-confidence hover:underline underline-offset-4 break-all"
                  >
                    upwork.com/freelancers/~013744500dd78c9569 ↗
                  </a>
                }
              />
              <EvalRow
                label="aksh repo"
                value={
                  <a
                    href="https://github.com/srijanarya/aksh-backtesting-trading"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-confidence hover:underline underline-offset-4 break-all"
                  >
                    github.com/srijanarya/aksh-backtesting-trading ↗
                  </a>
                }
              />
              <EvalRow
                label="brain iqc 2026"
                value={
                  <a
                    href="https://platform.worldquantbrain.com/competition/IQC2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-confidence hover:underline underline-offset-4 break-all"
                  >
                    platform.worldquantbrain.com/competition/IQC2026 ↗
                  </a>
                }
              />
            </div>
          </div>

          {/* BUILD PROVENANCE — eval-tool genre signal */}
          <footer className="border-t border-line pt-6 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>eval_run #{RUN.id}</span>
              <span className="text-ink-mute">
                · srijan-portfolio · IST 2026-05-27 · provenance: github/srijanarya
              </span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
