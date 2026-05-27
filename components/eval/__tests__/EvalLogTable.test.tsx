import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EvalLogTable } from "../EvalLogTable";

describe("EvalLogTable", () => {
  const rows = [
    { num: 1, cells: { mode: "unit confusion", impact: "100×" }, severity: "HIGH" as const },
    { num: 2, cells: { mode: "NULL extractions", impact: "29% miss" }, severity: "MED" as const },
  ];

  it("renders header column names", () => {
    render(<EvalLogTable columns={["mode", "impact"]} rows={rows} />);
    expect(screen.getByText(/^mode$/i)).toBeInTheDocument();
    expect(screen.getByText(/^impact$/i)).toBeInTheDocument();
  });

  it("renders row data values", () => {
    render(<EvalLogTable columns={["mode", "impact"]} rows={rows} />);
    expect(screen.getByText("unit confusion")).toBeInTheDocument();
    expect(screen.getByText("100×")).toBeInTheDocument();
    expect(screen.getByText(/29% miss/)).toBeInTheDocument();
  });

  it("color-codes severity", () => {
    const { container } = render(<EvalLogTable columns={["mode"]} rows={rows} />);
    expect(container.innerHTML).toMatch(/critical|warn/);
  });

  it("renders row numbers", () => {
    render(<EvalLogTable columns={["mode"]} rows={rows} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
