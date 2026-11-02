import { useEffect } from "react";

/** Site-wide pointer tilt: any card-like box gently tilts toward the cursor and lifts forward. */
const SELECTOR = [
  '[class*="card"]', '[class*="-tile"]', '[class*="-item"]', '[class*="story"]',
  '.rounded-xl.border', '.rounded-2xl.border', '.rounded-lg.border',
  '.svu-outcome', '.svu-career-table-wrap', '.svu-step', '.svu-area', '.svu-champion',
].join(",");
const EXCLUDE = ".cap-card, .education-arm, header *, footer *, nav *, input, textarea, select, [role=dialog] *";

export function BoxTilt() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isHome = () => !!document.querySelector(".homepage-static");
    if (!window.matchMedia("(hover: hover)").matches) return;
    let current: HTMLElement | null = null;
    const reset = (el: HTMLElement) => { el.style.transform = ""; el.classList.remove("box-tilt-active"); };
    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      let el = target?.closest?.(SELECTOR) as HTMLElement | null;
      if (el && (el.matches(EXCLUDE) || !el.closest("main") || el.offsetWidth > 900)) el = null;
      if (el && isHome()) el = null;
      if (current && current !== el) reset(current);
      current = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add("box-tilt-active");
      el.style.transform = `perspective(800px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateZ(14px) scale(1.02)`;
    };
    const onLeave = () => { if (current) reset(current); current = null; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => { window.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave); };
  }, []);
  return null;
}
