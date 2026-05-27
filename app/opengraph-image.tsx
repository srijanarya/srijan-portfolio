/**
 * Dynamic OpenGraph image for LinkedIn / Twitter / Slack link previews.
 *
 * Rendered at build time via next/og's ImageResponse. The eval-thesis
 * verdict is the single visual hook — when someone pastes the link into
 * a DM, the preview IS the pitch.
 *
 * Output: 1200 × 630 PNG served at /opengraph-image.
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Srijan Arya — AI Run #001";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#e8e8e3",
          fontFamily: "ui-monospace, monospace",
          padding: "60px 72px",
          backgroundImage:
            "linear-gradient(to right, rgba(232,232,227,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,232,227,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        {/* Top status bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 16,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#a3a39c",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#9eff6e",
            }}
          />
          <span style={{ color: "#e8e8e3" }}>eval_run #001</span>
          <span style={{ color: "#6b6b66" }}>·</span>
          <span>SRIJAN-3YR-SOLO-FOUNDER-V3</span>
        </div>

        {/* Middle — name + verdict */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#e8e8e3",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            Srijan Arya
            <span style={{ color: "#9eff6e" }}>_</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a3a39c",
              lineHeight: 1.3,
              maxWidth: 920,
            }}
          >
            AI-Native Senior Engineer · the next-decade differentiator in agentic AI isn&apos;t the prompt — it&apos;s the eval. Every team can ship a demo. Very few can ship a system that knows when it&apos;s wrong.
          </div>
        </div>

        {/* Bottom — eval metadata stats */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 48,
            fontSize: 18,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6b6b66",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 14 }}>confidence</span>
            <span style={{ color: "#9eff6e", fontSize: 28, letterSpacing: "0.04em" }}>96.4%</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 14 }}>hallucinations caught</span>
            <span style={{ color: "#ff5e5e", fontSize: 28, letterSpacing: "0.04em" }}>1 🚩</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 14 }}>verified by</span>
            <span style={{ color: "#a3a39c", fontSize: 28 }}>4 sources ✓</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
