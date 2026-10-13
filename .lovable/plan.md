

## Homepage Hero Polish — Matching Reference Design

### Current vs Reference Analysis

The reference screenshot shows a **white background** hero (not cream), with the text on the left and **three large, square-cropped attorney headshots** arranged in an asymmetric 2+1 grid on the right. Each photo has a bold **solid color background** (yellow/amber, teal/dark, blue) — not natural bokeh. The photos are large, roughly equal-sized rectangles with **no rounded corners, no shadows, no name overlays**. The layout feels bold and editorial.

Key differences from our current hero:
1. **Background**: Reference uses plain white, not `bg-cream`
2. **Heading**: "Injured?" is large italic serif, rest is bold sans-serif (not all serif). No coral-colored text — all black/navy
3. **Checkmarks**: Darker, bolder checkmarks (filled dark circles or bold checks), text is darker/larger
4. **CTA button**: Coral/orange pill button labeled just "Need help?" — no arrow, no "Get in touch"
5. **Attorney photos**: Three large photos in a **2-column staggered grid** (top-left, top-right offset down, bottom-center). No rounded corners — **square/rectangular with sharp edges**. No gradient overlay, no name labels. Much larger than current (roughly 250–300px wide each)
6. **Photo arrangement**: Top row has 2 photos side by side (left one starts higher, right one starts lower). Bottom row has 1 photo centered between them. Creates an asymmetric mosaic

### Plan (file: `src/pages/Index.tsx`, hero section only)

1. **Change hero background** from `bg-cream` to `bg-background` (white)
2. **Update heading typography**: Keep "Injured?" as `font-display italic`, but make the rest (`We protect your rights and future!`) non-italic, bold, `font-display`. Remove coral color from "and future" — all text navy-900. Add exclamation mark to match reference energy
3. **Increase checklist text weight**: Change from `text-muted-foreground` to `text-foreground` with `text-base` or `text-lg` size. Swap `CheckCircle` (outline) for a filled check icon or use a custom navy filled checkmark
4. **Restyle CTA button**: Change from `bg-navy-900` to `bg-coral-500 hover:bg-coral-600`. Shorten text to just "Need help?". Remove arrow
5. **Redesign attorney photo grid**: Remove all `rounded-2xl`, `shadow-xl`, gradient overlays, and name labels. Make photos **sharp-cornered rectangles** (~280px wide, ~350px tall). Arrange in 2+1 asymmetric grid: top-left and top-right (offset ~80px lower), bottom-center spanning between them. No decorative elements — just clean large photos
6. **Mobile layout**: Keep horizontal row but remove rounded corners, increase photo sizes slightly

### No changes to other sections or files.

