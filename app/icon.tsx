/**
 * Dynamic favicon — a 32×32 PNG generated via next/og.
 * Electric-lime "S_" cursor on near-black, matches the eval-tool aesthetic.
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#9eff6e",
          fontSize: 22,
          fontFamily: "ui-monospace, monospace",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.04em",
          border: "1px solid #262626",
        }}
      >
        S_
      </div>
    ),
    { ...size },
  );
}
