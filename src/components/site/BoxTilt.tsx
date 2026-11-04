import { useEffect } from "react";

/** Site-wide pointer tilt: any card-like box gently tilts toward the cursor and lifts forward. */
const SELECTOR = [
  '[class*="card"]', '[class*="-tile"]', '[class*="-item"]', '[class*="story"]',
  '.rounded-xl.border', '.rounded-2xl.border', '.rounded-lg.border',
  '.svu-outcome', '.ibm-steps li', '.ibm-choice li', '.svu-career-table-wrap', '.svu-step', '.svu-area', '.svu-champion', '.svu-internship-update',
].join(",");
const EXCLUDE = "[class*='svu-story-'], .cap-card, .education-arm, header *, footer *, nav *, input, textarea, select, [role=dialog] *";
/** Wider panels that still lift gently; the width guard otherwise protects page-wide layout shells. */
const FULL_WIDTH = ".svu-champion, .svu-internship-update, .svu-career-table-wrap";

/** Nearest card-like ancestor allowed to move. Excluded inner parts (a story card's text panel,
 *  for example) are stepped over, so the whole block lifts wherever the pointer touches it
 *  rather than only over its artwork. (client, 4 November 2026) */
const liftTarget = (from: Element | null) => {
  let el = from as HTMLElement | null;
  while (el) {
    const allowed = el.matches(SELECTOR) && !el.matches(EXCLUDE) && !!el.closest("main");
    if (allowed && (el.matches(FULL_WIDTH) || el.offsetWidth <= 900)) return el;
    el = el.parentElement;
  }
  return null;
};

export function BoxTilt() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isHome = () => !!document.querySelector(".homepage-static");
    if (!window.matchMedia("(hover: hover)").matches) return;
    let current: HTMLElement | null = null;
    const reset = (el: HTMLElement) => { el.style.transform = ""; el.classList.remove("box-tilt-active"); };
    const onMove = (e: PointerEvent) => {
      let el = liftTarget(e.target as Element | null);
      if (el && isHome()) el = null;
      if (current && current !== el) reset(current);
      current = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add("box-tilt-active");
      el.style.transform = `perspective(800px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) translateZ(6px) scale(1.008)`;
    };
    const onLeave = () => { if (current) reset(current); current = null; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => { window.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave); };
  }, []);
  return null;
}
