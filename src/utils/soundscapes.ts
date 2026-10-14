// Web Audio API pure synthesized ambient soundscapes (100% offline, zero network requests)

class SoundscapeManager {
  private ctx: AudioContext | null = null;
  private currentType: string | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: { stop?: () => void; disconnect: () => void }[] = [];
  private lfoTimer: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public stop() {
    if (this.lfoTimer) {
      window.clearInterval(this.lfoTimer);
      this.lfoTimer = null;
    }
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
    this.currentType = null;
  }

  public isPlaying(type?: string): boolean {
    if (!this.currentType) return false;
    if (type) return this.currentType === type;
    return true;
  }

  public getCurrentType(): string | null {
    return this.currentType;
  }

  public playRain() {
    this.stop();
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    this.currentType = "rain";
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink noise generation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    whiteNoise.start();
    this.activeNodes.push(whiteNoise, filter, rainGain);
  }

  public playWaves() {
    this.stop();
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    this.currentType = "waves";
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pinkish noise for surf
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.25;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.masterGain);

    noise.start();
    this.activeNodes.push(noise, filter, waveGain);

    // Rhythmic ocean swelling LFO
    let t = 0;
    this.lfoTimer = window.setInterval(() => {
      if (!this.ctx || this.currentType !== "waves") return;
      t += 0.08;
      // 6 second wave cycle
      const swell = (Math.sin(t * 0.8) + 1) / 2;
      const gainVal = 0.15 + swell * 0.65;
      const freqVal = 300 + swell * 450;
      waveGain.gain.setTargetAtTime(gainVal, this.ctx.currentTime, 0.1);
      filter.frequency.setTargetAtTime(freqVal, this.ctx.currentTime, 0.1);
    }, 100);
  }

  public playTibetanChime() {
    this.stop();
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    this.currentType = "chime";
    const strike = () => {
      if (!this.ctx || !this.masterGain || this.currentType !== "chime") return;
      const now = this.ctx.currentTime;
      // 432 Hz root tone + peaceful harmonics
      const freqs = [432, 864, 1296, 2160];
      const gains = [0.4, 0.15, 0.08, 0.03];

      freqs.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(gains[i], now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        osc.connect(g);
        g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 6);
      });
    };

    strike();
    this.lfoTimer = window.setInterval(() => {
      if (this.currentType === "chime") {
        strike();
      }
    }, 7000);
  }

  public playBreeze() {
    this.stop();
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    this.currentType = "breeze";
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.18;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    const breezeGain = this.ctx.createGain();
    breezeGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(breezeGain);
    breezeGain.connect(this.masterGain);

    noise.start();
    this.activeNodes.push(noise, filter, breezeGain);

    let t = 0;
    this.lfoTimer = window.setInterval(() => {
      if (!this.ctx || this.currentType !== "breeze") return;
      t += 0.05;
      const gust = (Math.sin(t * 0.4) + Math.cos(t * 0.7) + 2) / 4;
      breezeGain.gain.setTargetAtTime(0.18 + gust * 0.35, this.ctx.currentTime, 0.2);
      filter.frequency.setTargetAtTime(320 + gust * 280, this.ctx.currentTime, 0.2);
    }, 150);
  }
}

export const soundscapes = new SoundscapeManager();
