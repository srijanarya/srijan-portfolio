import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ConfidenceBadge } from "../ConfidenceBadge";

describe("ConfidenceBadge", () => {
  it("renders label and score", () => {
    render(<ConfidenceBadge label="HIGH" score={0.974} />);
    expect(screen.getByText("HIGH")).toBeInTheDocument();
    expect(screen.getByText(/97\.4%/)).toBeInTheDocument();
  });

  it("HIGH uses confidence color token", () => {
    const { container } = render(<ConfidenceBadge label="HIGH" score={0.96} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/confidence/);
  });

  it("MED uses warn color token", () => {
    const { container } = render(<ConfidenceBadge label="MED" score={0.78} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/warn/);
  });

  it("FLAGGED uses critical color token", () => {
    const { container } = render(<ConfidenceBadge label="FLAGGED" score={0.22} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/critical/);
  });

  it("supports showScore=false", () => {
    render(<ConfidenceBadge label="DROPPED" showScore={false} />);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});
