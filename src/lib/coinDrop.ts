// Coin-drop hover sound for the homepage card groups.
// The browser carries no key here — the sound is a static CDN asset pointer.
// Played through the Web Audio API with a soft fade-in/out so it stays smooth.
import coinDropAsset from "@/assets/sounds/coin-drop.wav.asset.json";

let ctx: AudioContext | null = null;
let buffer: AudioBuffer | null = null;
let loading: Promise<void> | null = null;
let lastPlayed = 0;

/** Extra-quiet master level for the hover "ting" (out of 1.0). */
const MASTER_LEVEL = 0.045;
/** Seconds of fade-in / fade-out applied around the clip. */
const FADE_IN = 0.05;
const FADE_OUT = 0.22;

const ensureBuffer = () => {
  if (buffer || loading) return;
  try {
    ctx ??= new AudioContext();
    loading = fetch(coinDropAsset.url)
      .then((res) => res.arrayBuffer())
      .then((raw) => ctx!.decodeAudioData(raw))
      .then((decoded) => {
        buffer = decoded;
      })
      .catch(() => {
        /* sound is decorative — never break the page over it */
      });
  } catch {
    /* sound is decorative — never break the page over it */
  }
};

/** Play a short, soft coin-drop "ting". Rate-limited so rapid hovers don't machine-gun. */
export const playCoinDrop = () => {
  const now = Date.now();
  if (now - lastPlayed < 350) return;
  lastPlayed = now;
  try {
    ensureBuffer();
    if (!ctx || !buffer) return;
    // Browsers may block sound until the first click; ignore that silently.
    if (ctx.state === "suspended") void ctx.resume().catch(() => {});
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    const t = ctx.currentTime;
    const dur = Math.min(buffer.duration, 0.6);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(MASTER_LEVEL, t + FADE_IN);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur + FADE_OUT);
    source.connect(gain).connect(ctx.destination);
    source.start(t);
    source.stop(t + dur + FADE_OUT + 0.05);
  } catch {
    /* sound is decorative — never break the page over it */
  }
};
