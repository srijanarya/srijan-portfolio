import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EvalHeader } from "../EvalHeader";

describe("EvalHeader", () => {
  it("renders run id and subject", () => {
    render(<EvalHeader runId="001" subject="SRIJAN" />);
    expect(screen.getByText(/eval_run #001/i)).toBeInTheDocument();
    expect(screen.getByText(/SRIJAN/)).toBeInTheDocument();
  });

  it("renders nav links to /work, /decisions, /how-i-work", () => {
    render(<EvalHeader runId="001" subject="X" />);
    expect(screen.getByRole("link", { name: /\.\/work/i })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: /\.\/decisions/i })).toHaveAttribute("href", "/decisions");
    expect(screen.getByRole("link", { name: /\.\/how-i-work/i })).toHaveAttribute("href", "/how-i-work");
  });
});
