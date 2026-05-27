import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestimonialBlock } from "../TestimonialBlock";

describe("TestimonialBlock", () => {
  it("renders nothing when testimonials is undefined", () => {
    const { container } = render(<TestimonialBlock />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when all testimonials are pending", () => {
    const { container } = render(
      <TestimonialBlock
        testimonials={[
          { status: "pending", author: "Jane" },
          { status: "pending", author: "John" },
        ]}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders only received testimonials with quote", () => {
    render(
      <TestimonialBlock
        testimonials={[
          { status: "pending", author: "Jane" },
          { status: "received", quote: "Outstanding work.", author: "John Doe", role: "CTO" },
        ]}
      />,
    );
    expect(screen.getByText(/Outstanding work/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/CTO/)).toBeInTheDocument();
    expect(screen.queryByText(/Jane/)).not.toBeInTheDocument();
  });

  it("renders link as accessible arrow", () => {
    render(
      <TestimonialBlock
        testimonials={[
          { status: "received", quote: "Great.", author: "A", link: "https://linkedin.com/x" },
        ]}
      />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://linkedin.com/x");
  });
});
