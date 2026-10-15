// Coin-drop hover sound for the homepage card groups.
// The browser carries no key here — the sound is a static CDN asset pointer.
import coinDropAsset from "@/assets/sounds/coin-drop.wav.asset.json";

let audio: HTMLAudioElement | null = null;
let lastPlayed = 0;

/** Play a short coin-drop "ting". Rate-limited so rapid hovers don't machine-gun. */
export const playCoinDrop = () => {
  const now = Date.now();
  if (now - lastPlayed < 300) return;
  lastPlayed = now;
  try {
    audio ??= new Audio(coinDropAsset.url);
    audio.volume = 0.3;
    audio.currentTime = 0;
    // Browsers may block sound until the first click; ignore that silently.
    void audio.play().catch(() => {});
  } catch {
    /* sound is decorative — never break the page over it */
  }
};
