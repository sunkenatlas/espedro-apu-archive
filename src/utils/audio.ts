/**
 * Zero-dependency Web Audio API synthesizer for the APU Archive Terminal.
 * Strictly muted by default; starts AudioContext only upon explicit user opt-in.
 */

class ApuAudioEngine {
  private ctx: AudioContext | null = null;
  private enabled = false;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  public isEnabled(): boolean {
    return this.enabled;
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public setEnabled(next: boolean): boolean {
    this.enabled = next;
    if (next) {
      const ctx = this.ensureContext();
      if (ctx) {
        this.startAmbientDrone(ctx);
        this.playToggleOn();
      }
    } else {
      this.stopAmbientDrone();
    }
    return this.enabled;
  }

  private startAmbientDrone(ctx: AudioContext): void {
    if (this.droneGain) return;
    const now = ctx.currentTime;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);
    filter.Q.setValueAtTime(1.2, now);

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.022, now + 1.8);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(52, now);

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(78.3, now);

    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.35, now);

    osc1.connect(filter);
    osc2.connect(g2);
    g2.connect(filter);
    filter.connect(master);
    master.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);

    this.droneOsc1 = osc1;
    this.droneOsc2 = osc2;
    this.droneGain = master;
  }

  private stopAmbientDrone(): void {
    if (!this.ctx || !this.droneGain) return;
    const now = this.ctx.currentTime;
    try {
      this.droneGain.gain.cancelScheduledValues(now);
      this.droneGain.gain.setValueAtTime(Math.max(this.droneGain.gain.value, 0.0001), now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      const o1 = this.droneOsc1;
      const o2 = this.droneOsc2;
      setTimeout(() => {
        try {
          o1?.stop();
          o2?.stop();
        } catch {
          // ignore
        }
      }, 420);
    } catch {
      // ignore
    }
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;
  }

  private playToggleOn(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.09);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.035, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  /** Crisp analog relay click for UI buttons & filter chips */
  public playTick(): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(980, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.028);
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.035);
  }

  /** Subtle mechanical micro-tick on card hover */
  public playHover(): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.018);
    gain.gain.setValueAtTime(0.011, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.022);
  }

  /** Dossier open / file retrieval confirmation */
  public playOpenDossier(): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [220, 330];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.055);
      gain.gain.setValueAtTime(0.0001, now + idx * 0.055);
      gain.gain.linearRampToValueAtTime(0.028, now + idx * 0.055 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.055);
      osc.stop(now + idx * 0.055 + 0.17);
    });
  }

  /** Restrained low warning tone when Cognitive Hazard Intercept triggers */
  public playHazardWarning(): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.22].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, now + offset);
      osc.frequency.setValueAtTime(148, now + offset);
      osc.frequency.linearRampToValueAtTime(132, now + offset + 0.16);
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.linearRampToValueAtTime(0.032, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.18);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.19);
    });
  }
}

export const apuAudio = new ApuAudioEngine();
