import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HallucinationFlag } from "../HallucinationFlag";

describe("HallucinationFlag", () => {
  it("renders count and links to the decision target", () => {
    render(<HallucinationFlag count={1} href="/decisions#honest-accuracy" />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/decisions#honest-accuracy",
    );
  });

  it("uses critical color tokens", () => {
    const { container } = render(<HallucinationFlag count={1} href="/decisions" />);
    expect(container.innerHTML).toMatch(/critical/);
  });
});
