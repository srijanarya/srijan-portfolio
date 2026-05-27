import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DiffPanel } from "../DiffPanel";

describe("DiffPanel", () => {
  const props = {
    left: "REPORTED",
    right: "ACTUAL",
    rows: [
      { criterion: "Revenue", reported: "100%", actual: "22.5%", delta: "−77.5" },
      { criterion: "PAT",     reported: "100%", actual: "15.4%", delta: "−84.6" },
    ],
  };

  it("renders left and right headers", () => {
    render(<DiffPanel {...props} />);
    expect(screen.getByText(/REPORTED/)).toBeInTheDocument();
    expect(screen.getByText(/ACTUAL/)).toBeInTheDocument();
  });

  it("renders all rows with criterion + values + delta", () => {
    render(<DiffPanel {...props} />);
    // Criterion appears once per side (left + right) — 2 instances each
    expect(screen.getAllByText("Revenue")).toHaveLength(2);
    expect(screen.getAllByText("PAT")).toHaveLength(2);
    expect(screen.getByText("22.5%")).toBeInTheDocument();
    expect(screen.getByText(/−77\.5/)).toBeInTheDocument();
  });

  it("uses critical color for reported and confidence color for actual", () => {
    const { container } = render(<DiffPanel {...props} />);
    expect(container.innerHTML).toMatch(/critical/);
    expect(container.innerHTML).toMatch(/confidence/);
  });
});
