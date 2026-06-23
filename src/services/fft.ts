/**
 * fft.ts
 * Client-side Discrete Fourier Transform (DFT) for vibration spectrum analysis.
 *
 * Why DFT instead of FFT?
 *   The vibration array is small (≤ 20 readings from ThingSpeak) so the O(N²)
 *   DFT is perfectly fast in-browser. No external library required.
 *
 * Output:
 *   An array of { frequency, magnitude, phase } bins covering 0 … fs/2 Hz
 *   (the one-sided spectrum, normalised to peak = 100).
 *
 * Usage:
 *   const bins = computeSpectrum(vibrationArray, sampleRateHz);
 */

export interface SpectrumBin {
  frequency: number;  // Hz
  magnitude: number;  // 0-100 normalised
  phase: number;      // radians
  raw: number;        // unnormalised magnitude
}

/**
 * Remove DC offset (mean) before DFT to avoid a large spike at 0 Hz.
 */
function removeDC(signal: number[]): number[] {
  const mu = signal.reduce((a, b) => a + b, 0) / signal.length;
  return signal.map((v) => v - mu);
}

/**
 * Apply a Hann window to reduce spectral leakage.
 */
function hannWindow(signal: number[]): number[] {
  const N = signal.length;
  return signal.map((v, n) => v * (0.5 - 0.5 * Math.cos((2 * Math.PI * n) / (N - 1))));
}

/**
 * Compute the one-sided DFT magnitude spectrum.
 *
 * @param signal   Raw vibration samples (g)
 * @param fs       Effective sample rate in Hz (1 / poll-interval-seconds)
 * @returns        Array of SpectrumBin, length = floor(N/2) + 1
 */
export function computeSpectrum(signal: number[], fs: number): SpectrumBin[] {
  if (signal.length < 2) return [];

  const windowed = hannWindow(removeDC(signal));
  const N = windowed.length;
  const half = Math.floor(N / 2) + 1;

  const bins: SpectrumBin[] = [];

  for (let k = 0; k < half; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N;
      re += windowed[n] * Math.cos(angle);
      im -= windowed[n] * Math.sin(angle);
    }

    // One-sided magnitude: double non-DC bins to preserve energy
    const mag = (k === 0 || k === N / 2)
      ? Math.sqrt(re * re + im * im) / N
      : (2 * Math.sqrt(re * re + im * im)) / N;

    const phase = Math.atan2(im, re);
    const frequency = (k * fs) / N;

    bins.push({ frequency, magnitude: mag, phase, raw: mag });
  }

  // Normalise magnitudes to 0-100
  const maxMag = Math.max(...bins.map((b) => b.raw), 1e-9);
  return bins.map((b) => ({
    ...b,
    magnitude: (b.raw / maxMag) * 100,
  }));
}

/**
 * Find the top N dominant frequency peaks (local maxima above threshold).
 */
export function findPeaks(bins: SpectrumBin[], topN = 3, thresholdPct = 20): SpectrumBin[] {
  const peaks: SpectrumBin[] = [];

  for (let i = 1; i < bins.length - 1; i++) {
    if (
      bins[i].magnitude > thresholdPct &&
      bins[i].magnitude > bins[i - 1].magnitude &&
      bins[i].magnitude > bins[i + 1].magnitude
    ) {
      peaks.push(bins[i]);
    }
  }

  return peaks
    .sort((a, b) => b.magnitude - a.magnitude)
    .slice(0, topN);
}

/**
 * Classify a dominant frequency peak as a known fault signature.
 * Reference: ISO 10816 / bearing characteristic frequency nomenclature.
 *
 * At 1/15 Hz sampling, only variations slower than 7.5 s are resolvable.
 * Labels describe energy-band trends in the reading sequence, NOT mechanical
 * fault frequencies — those require on-device FFT at kHz sample rates.
 */
export function classifySpectrum(
  bins: SpectrumBin[],
  peaks: SpectrumBin[],
  fs: number,
): string {
  if (bins.length === 0 || peaks.length === 0) return "Insufficient data";

  const dominant = peaks[0];
  const nyquist = fs / 2;
  const relFreq = dominant.frequency / nyquist; // 0-1

  if (dominant.magnitude < 30) return "Low spectral energy — readings are steady with no dominant trend";
  if (relFreq < 0.15) return "Low-frequency variation — slow drift or gradual change in readings over time";
  if (relFreq < 0.45) return "Mid-frequency variation — periodic pattern detected in the reading sequence";
  if (relFreq < 0.75) return "High-frequency variation — rapid fluctuation between consecutive readings";
  return "Very high-frequency variation — near Nyquist limit; likely measurement noise";
}
