import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MetricBar } from "../MetricBar";

describe("MetricBar", () => {
  it("renders value and label", () => {
    render(<MetricBar value="377" label="failovers in one trading session" />);
    expect(screen.getByText("377")).toBeInTheDocument();
    expect(screen.getByText(/failovers/)).toBeInTheDocument();
  });

  it("includes ❯ chevron marker", () => {
    const { container } = render(<MetricBar value="377" label="failovers" />);
    expect(container.textContent).toMatch(/❯/);
  });

  it("emphasis prop adds confidence color", () => {
    const { container } = render(<MetricBar value="X" label="y" emphasis />);
    expect(container.innerHTML).toMatch(/confidence/);
  });
});
