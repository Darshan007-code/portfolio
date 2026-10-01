// Web Audio API Sound Generator for UI Interactions
// Generates high-fidelity, futuristic micro-sounds with zero external asset lag.

let audioCtx: AudioContext | null = null;
let muted: boolean = false;

// Check localStorage for mute preference if available
if (typeof window !== "undefined") {
  try {
    muted = localStorage.getItem("portfolio_audio_muted") === "true";
  } catch {
    muted = false;
  }
}

export function isAudioMuted(): boolean {
  return muted;
}

export function setAudioMuted(val: boolean): boolean {
  muted = val;
  try {
    localStorage.setItem("portfolio_audio_muted", String(val));
  } catch {
    // ignore
  }
  return muted;
}

export function toggleAudioMute(): boolean {
  return setAudioMuted(!muted);
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtxClass) return null;

    if (!audioCtx) {
      audioCtx = new AudioCtxClass();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Subtle micro-haptic tick for hover feedback
 */
export function playResumeHover(): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.025);

    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Crisp, futuristic glass-synth chime for opening / clicking Resume
 */
export function playResumeClick(): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Harmonic arpeggio: C5 -> E5 -> G5 -> C6
    const notes = [
      { freq: 523.25, time: 0.00, dur: 0.22, vol: 0.12 }, // C5
      { freq: 659.25, time: 0.04, dur: 0.26, vol: 0.13 }, // E5
      { freq: 783.99, time: 0.08, dur: 0.30, vol: 0.14 }, // G5
      { freq: 1046.5, time: 0.13, dur: 0.45, vol: 0.15 }, // C6
    ];

    notes.forEach(({ freq, time, dur, vol }) => {
      const startTime = now + time;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(vol, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + dur + 0.02);
    });
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Sci-fi countdown tick for the 3-second resume download timer
 */
export function playCountdownTick(secondsRemaining: number = 3): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Ascend pitch with countdown urgency: 3 -> 650Hz, 2 -> 780Hz, 1 -> 980Hz
    const pitch =
      secondsRemaining === 1 ? 980 : secondsRemaining === 2 ? 780 : 650;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(pitch, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.095);
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Celebratory, rich chord when resume finishes countdown and downloads
 */
export function playDownloadSuccess(): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Resonant Major chord shimmer: C5, E5, G5, B5, C6
    const chord = [
      { freq: 523.25, time: 0.00, dur: 0.60, vol: 0.10 },
      { freq: 659.25, time: 0.03, dur: 0.65, vol: 0.11 },
      { freq: 783.99, time: 0.06, dur: 0.70, vol: 0.12 },
      { freq: 987.77, time: 0.09, dur: 0.80, vol: 0.12 },
      { freq: 1046.5, time: 0.12, dur: 1.00, vol: 0.14 },
    ];

    chord.forEach(({ freq, time, dur, vol }) => {
      const startTime = now + time;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(vol, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + dur + 0.02);
    });
  } catch {
    // Ignore audio errors gracefully
  }
}
