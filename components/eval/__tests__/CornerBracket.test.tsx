import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CornerBracket } from "../CornerBracket";

describe("CornerBracket", () => {
  it("renders an SVG with the correct corner orientation", () => {
    const { container } = render(<CornerBracket corner="tl" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("data-corner", "tl");
  });

  it("supports all four corners", () => {
    for (const c of ["tl", "tr", "bl", "br"] as const) {
      const { container } = render(<CornerBracket corner={c} />);
      expect(container.querySelector(`[data-corner="${c}"]`)).toBeInTheDocument();
    }
  });
});
