import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TraceTree } from "../TraceTree";
import type { TraceNode } from "@/app/data/types";

const sample: TraceNode = {
  label: "investigation",
  children: [
    { label: "L1", metric: "Sharpe 0.74", outcome: "PROMISING" },
    { label: "L2", metric: "0/72", outcome: "RED FLAG",
      children: [{ label: "drop decision" }] },
    { label: "L3", outcome: "COLLAPSE" },
  ],
};

describe("TraceTree", () => {
  it("renders all node labels", () => {
    render(<TraceTree node={sample} />);
    expect(screen.getByText(/investigation/)).toBeInTheDocument();
    expect(screen.getByText(/L1/)).toBeInTheDocument();
    expect(screen.getByText(/L2/)).toBeInTheDocument();
    expect(screen.getByText(/L3/)).toBeInTheDocument();
    expect(screen.getByText(/drop decision/)).toBeInTheDocument();
  });

  it("renders metric values", () => {
    render(<TraceTree node={sample} />);
    expect(screen.getByText(/Sharpe 0\.74/)).toBeInTheDocument();
  });

  it("renders outcome chips with color coding", () => {
    const { container } = render(<TraceTree node={sample} />);
    expect(container.innerHTML).toMatch(/confidence|warn|critical/);
  });

  it("renders branch glyphs (├ or └)", () => {
    const { container } = render(<TraceTree node={sample} />);
    expect(container.textContent).toMatch(/├|└/);
  });
});
