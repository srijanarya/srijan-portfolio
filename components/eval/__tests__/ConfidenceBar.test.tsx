import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ConfidenceBar } from "../ConfidenceBar";

describe("ConfidenceBar", () => {
  it("renders with the correct fill percentage CSS variable", () => {
    const { container } = render(<ConfidenceBar value={0.964} />);
    const fill = container.querySelector("[data-role='fill']") as HTMLElement;
    expect(fill).toBeInTheDocument();
    const fillPct = fill.style.getPropertyValue("--fill-pct");
    expect(parseFloat(fillPct)).toBeCloseTo(0.964, 3);
  });

  it("clamps values above 1", () => {
    const { container } = render(<ConfidenceBar value={1.5} />);
    const fill = container.querySelector("[data-role='fill']") as HTMLElement;
    const v = parseFloat(fill.style.getPropertyValue("--fill-pct"));
    expect(v).toBeLessThanOrEqual(1);
  });

  it("clamps negative values to 0", () => {
    const { container } = render(<ConfidenceBar value={-0.5} />);
    const fill = container.querySelector("[data-role='fill']") as HTMLElement;
    const v = parseFloat(fill.style.getPropertyValue("--fill-pct"));
    expect(v).toBeGreaterThanOrEqual(0);
  });
});
