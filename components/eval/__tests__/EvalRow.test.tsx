import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EvalRow } from "../EvalRow";

describe("EvalRow", () => {
  it("renders label uppercase and value", () => {
    render(<EvalRow label="last_eval" value="2026-05-27" />);
    expect(screen.getByText(/last_eval/i)).toBeInTheDocument();
    expect(screen.getByText("2026-05-27")).toBeInTheDocument();
  });

  it("accepts React node as value", () => {
    render(<EvalRow label="status" value={<span data-testid="custom">live</span>} />);
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });
});
