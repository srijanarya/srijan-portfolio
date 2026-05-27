import { render, screen, act } from "@testing-library/react";
import { beforeAll, describe, it, expect, vi } from "vitest";
import { CounterStat } from "../CounterStat";

beforeAll(() => {
  // jsdom doesn't ship IntersectionObserver — polyfill it to immediately fire
  class IO {
    cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) { this.cb = cb; }
    observe = (el: Element) => {
      // Fire intersection synchronously on next microtask
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

  // Make rAF synchronous — push timestamp far ahead so the easing reaches 1.0
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(performance.now() + 5_000);
    return 0;
  });
});

describe("CounterStat", () => {
  it("renders final value after intersection + raf", async () => {
    render(<CounterStat to={377} duration={1} />);
    await act(async () => { await Promise.resolve(); await Promise.resolve(); });
    expect(screen.getByText(/377/)).toBeInTheDocument();
  });

  it("respects suffix and precision", async () => {
    render(<CounterStat to={99.7} duration={1} precision={1} suffix="%" />);
    await act(async () => { await Promise.resolve(); await Promise.resolve(); });
    expect(screen.getByText(/99\.7%/)).toBeInTheDocument();
  });
});
