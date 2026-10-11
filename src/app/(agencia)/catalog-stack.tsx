"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Native scrolling keeps every card reachable; the next card reveals the stack. */
export function CatalogStack({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".stack-card"));
    const panels = cards.map(card => card.querySelector<HTMLElement>(".stack-panel")!);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active = false;
    let top = 0;
    let stickyTops: number[] = [];

    const paint = () => {
      frame = 0;
      if (!active) return;
      const positions = cards.map(card => card.getBoundingClientRect());
      panels.forEach((panel, index) => {
        const range = Math.max(positions[index].height, 1);
        let depth = 0;
        for (let next = index + 1; next <= Math.min(index + 2, cards.length - 1); next++) {
          depth += Math.max(0, Math.min(1, (stickyTops[index] + range - positions[next].top) / range));
        }
        panel.style.transform = `translateY(${-8 * depth}px) scale(${1 - depth * .024})`;
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const measure = () => {
      top = parseFloat(getComputedStyle(root).getPropertyValue("--stack-top"));
      const contactHeight = document.querySelector(".whatsapp-bar")?.getBoundingClientRect().height || 64;
      // A tall card scrolls until its actions are visible, then joins the stack.
      stickyTops = panels.map(panel => Math.min(top, window.innerHeight - contactHeight - 16 - panel.offsetHeight));
      cards.forEach((card, index) => card.style.setProperty("--card-stack-top", `${stickyTops[index]}px`));
      active = !reducedMotion.matches;
      root.dataset.stackActive = String(active);
      if (!active) panels.forEach(panel => panel.style.removeProperty("transform"));
      schedule();
    };
    const revealFocusedCard = (event: FocusEvent) => {
      const target = event.target;
      if (!active || !(target instanceof HTMLElement) || !target.matches(":focus-visible")) return;
      const card = target.closest<HTMLElement>(".stack-card");
      const index = cards.indexOf(card!);
      const next = cards[index + 1];
      if (!card || !next) return;
      const targetBox = target.getBoundingClientRect();
      const nextBox = next.getBoundingClientRect();
      if (nextBox.top < targetBox.bottom && nextBox.bottom > targetBox.top) {
        const anchor = card.previousElementSibling;
        if (anchor) {
          const offset = target.closest(".stack-media") ? top : stickyTops[index];
          window.scrollTo({ top: window.scrollY + anchor.getBoundingClientRect().top - offset, behavior: "instant" });
        }
      }
    };
    const observer = new ResizeObserver(measure);
    panels.forEach(panel => observer.observe(panel));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", measure);
    root.addEventListener("focusin", revealFocusedCard);
    measure();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", measure);
      root.removeEventListener("focusin", revealFocusedCard);
    };
  }, []);

  return <div ref={ref} className="catalog-stack" aria-label={label}>{children}</div>;
}
