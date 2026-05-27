import { render, screen } from "@testing-library/react";
import { beforeAll, describe, it, expect, vi } from "vitest";
import { EvalCard } from "../EvalCard";
import { PROJECTS } from "@/app/data/projects";

beforeAll(() => {
  // CounterStat uses IntersectionObserver — polyfill for these tests too
  class IO {
    cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) { this.cb = cb; }
    observe = (el: Element) => {
      queueMicrotask(() =>
        this.cb(
          [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        ),
      );
    };
    disconnect = () => {};
    unobserve = () => {};
    takeRecords = (): IntersectionObserverEntry[] => [];
    root = null;
    rootMargin = "";
    thresholds: number[] = [];
  }
  // @ts-expect-error jsdom polyfill
  globalThis.IntersectionObserver = IO;
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(performance.now() + 5_000);
    return 0;
  });
});

const aksh = PROJECTS.find((p) => p.id === "aksh")!;
const earningsiq = PROJECTS.find((p) => p.id === "earningsiq")!;

describe("EvalCard", () => {
  it("renders name and subtitle", () => {
    render(<EvalCard project={aksh} />);
    expect(screen.getByText("AKSH")).toBeInTheDocument();
    expect(screen.getByText(/Live algorithmic trading/)).toBeInTheDocument();
  });

  it("renders status pill", () => {
    const { container } = render(<EvalCard project={aksh} />);
    expect(container.textContent).toMatch(/shipped/i);
  });

  it("renders four corner brackets", () => {
    const { container } = render(<EvalCard project={aksh} />);
    expect(container.querySelectorAll("[data-corner]").length).toBe(4);
  });

  it("links inspect to /work#<id>", () => {
    render(<EvalCard project={aksh} />);
    const inspect = screen.getByRole("link", { name: /inspect/i });
    expect(inspect).toHaveAttribute("href", "/work#aksh");
  });

  it("shows hallucination flag when caught", () => {
    render(<EvalCard project={earningsiq} />);
    expect(screen.getAllByText(/flagged/i).length).toBeGreaterThan(0);
  });
});
