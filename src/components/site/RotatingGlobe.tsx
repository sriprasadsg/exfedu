import { useEffect, useRef } from "react";
import globeTexture from "@/assets/globe-texture.png";

/** Seconds for one full revolution — a slow, continuous turn. */
export const GLOBE_REVOLUTION_SECONDS = 40;
/** The pole leans by this many radians so the sphere sits at a natural angle. */
const LEAN = 0.2;

const unit = (v: number[]) => {
  const length = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / length, v[1] / length, v[2] / length];
};

/**
 * A rotating globe drawn as an orthographic projection of an equirectangular
 * texture: continents curve and compress at the limbs the way they do on a real
 * sphere, and one revolution takes GLOBE_REVOLUTION_SECONDS. Size, position and
 * the soft shadow (drawn in CSS) stay steady; reduced-motion draws one frame.
 */
export default function RotatingGlobe({ size = 168, className = "", label = "Slowly rotating globe of the Earth" }: {
  size?: number; className?: string; label?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const dim = Math.round(size * ratio);
    canvas.width = dim;
    canvas.height = dim;

    let frame = 0;
    const image = new Image();

    image.onload = () => {
      const surface = document.createElement("canvas");
      surface.width = image.width;
      surface.height = image.height;
      const surfaceCtx = surface.getContext("2d", { willReadFrequently: true });
      if (!surfaceCtx) return;
      surfaceCtx.drawImage(image, 0, 0);
      const texture = surfaceCtx.getImageData(0, 0, surface.width, surface.height).data;
      const width = surface.width;
      const height = surface.height;

      const centre = dim / 2;
      const cosL = Math.cos(LEAN);
      const sinL = Math.sin(LEAN);
      const light = unit([-0.5, 0.62, 0.62]);
      const pixels = dim * dim;

      // Where each screen pixel looks on the sphere: fixed latitude, longitude
      // offset and lighting, so a frame only needs one lookup per pixel.
      const column = new Float32Array(pixels);
      const row = new Int32Array(pixels);
      const cover = new Float32Array(pixels);
      const shade = new Float32Array(pixels);
      const gloss = new Float32Array(pixels);

      for (let y = 0; y < dim; y++) {
        for (let x = 0; x < dim; x++) {
          const i = y * dim + x;
          const sx = (x - centre) / centre;
          const sy = (y - centre) / centre;
          const d = Math.hypot(sx, sy);
          if (d >= 1) continue;
          const z = Math.sqrt(1 - d * d);
          const up = -sy;
          cover[i] = Math.min(1, Math.max(0, (1 - d) * centre + 0.5));
          const lx = sx * cosL + up * sinL;
          const ly = Math.max(-1, Math.min(1, -sx * sinL + up * cosL));
          column[i] = (Math.atan2(lx, z) / (2 * Math.PI) + 0.5) * width;
          row[i] = Math.min(height - 1, Math.max(0, Math.round((0.5 - Math.asin(ly) / Math.PI) * height)));
          const facing = Math.max(0, sx * light[0] + up * light[1] + z * light[2]);
          shade[i] = (0.34 + 0.76 * facing) * (0.66 + 0.34 * z);
          gloss[i] = Math.pow(facing, 26) * 52;
        }
      }

      const picture = ctx.createImageData(dim, dim);
      const out = picture.data;

      const draw = (revolution: number) => {
        const shift = (revolution % 1) * width;
        for (let i = 0; i < pixels; i++) {
          if (!cover[i]) continue;
          let c = (column[i] + shift) % width;
          if (c < 0) c += width;
          const t = (row[i] * width + (c | 0)) * 4;
          const o = i * 4;
          out[o] = Math.min(255, texture[t] * shade[i] + gloss[i]);
          out[o + 1] = Math.min(255, texture[t + 1] * shade[i] + gloss[i]);
          out[o + 2] = Math.min(255, texture[t + 2] * shade[i] + gloss[i]);
          out[o + 3] = cover[i] * 255;
        }
        ctx.putImageData(picture, 0, 0);
      };

      const start = performance.now();
      const step = (now: number) => {
        draw((now - start) / 1000 / GLOBE_REVOLUTION_SECONDS);
        frame = requestAnimationFrame(step);
      };
      if (reduced) draw(0.08);
      else frame = requestAnimationFrame(step);
    };

    image.src = globeTexture;
    return () => cancelAnimationFrame(frame);
  }, [size]);

  return (
    <span className={`globe${className ? ` ${className}` : ""}`} style={{ width: size }} role="img" aria-label={label}>
      <canvas ref={canvasRef} />
    </span>
  );
}
