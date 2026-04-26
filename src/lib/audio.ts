/**
 * Audio Service for Suspect X Interactive Reader
 * Synthesizes UI sounds using Web Audio API for immersive mystery experience.
 */

// Audio context singleton
let audioCtx: AudioContext | null = null;

const getAudioCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// ============ Basic UI Sounds ============

/**
 * Hover effect - subtle high frequency sweep
 */
export const playHoverSound = () => {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
};

/**
 * Click/tap feedback - short click
 */
export const playClickSound = () => {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.1);
};

/**
 * Panel/modal open - upward sweep
 */
export const playOpenSound = () => {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.4);
};

/**
 * Panel/modal close - downward sweep
 */
export const playCloseSound = () => {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.25);
};

// ============ Reading Experience Sounds ============

/**
 * Text reveal / page turn - soft paper rustle feel
 */
export const playRevealSound = () => {
  const ctx = getAudioCtx();
  
  // Create noise buffer for texture
  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }
  
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  // Filter for softer sound
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2000;
  filter.Q.value = 1;
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  noise.start();
  noise.stop(ctx.currentTime + 0.08);
};

/**
 * Clue discovered - mysterious chime chord
 */
export const playClueFoundSound = () => {
  const ctx = getAudioCtx();
  
  // Chord frequencies (mysterious minor feel)
  const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  
  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    const startTime = ctx.currentTime + i * 0.05;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.06, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + 0.8);
  });
};

/**
 * Critical clue discovered - dramatic reveal
 */
export const playCriticalClueSound = () => {
  const ctx = getAudioCtx();
  
  // Dramatic bass buildup
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  
  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(80, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.3);
  
  gain1.gain.setValueAtTime(0, ctx.currentTime);
  gain1.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
  gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
  
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  
  osc1.start();
  osc1.stop(ctx.currentTime + 0.6);
  
  // High shimmer
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  
  osc2.type = 'sine';
  osc2.frequency.value = 2093; // C7
  
  gain2.gain.setValueAtTime(0, ctx.currentTime + 0.15);
  gain2.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.25);
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
  
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  
  osc2.start(ctx.currentTime + 0.15);
  osc2.stop(ctx.currentTime + 1);
};

/**
 * Chapter complete - satisfying resolution
 */
export const playChapterCompleteSound = () => {
  const ctx = getAudioCtx();
  
  // Rising arpeggio
  const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    const startTime = ctx.currentTime + i * 0.12;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + 0.5);
  });
};

/**
 * Chapter unlocked - hopeful ascending
 */
export const playChapterUnlockedSound = () => {
  const ctx = getAudioCtx();
  
  // Bright ascending phrase
  const notes = [392.00, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    const startTime = ctx.currentTime + i * 0.08;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.08, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + 0.4);
  });
};

/**
 * Locked chapter click - denial feedback
 */
export const playLockedClickSound = () => {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
  
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
};

/**
 * Error/denied - short buzz
 */
export const playErrorSound = () => {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
};
