import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionMarker } from "../SectionMarker";

describe("SectionMarker", () => {
  it("renders bracketed section label uppercase", () => {
    render(<SectionMarker label="verdict" />);
    expect(screen.getByText(/verdict/i)).toBeInTheDocument();
    expect(screen.getByText(/\[/)).toBeInTheDocument();
    expect(screen.getByText(/\]/)).toBeInTheDocument();
  });
});
