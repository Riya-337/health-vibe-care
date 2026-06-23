/**
 * mlEngine.ts
 * Client-side ML / prognostics engine for Motor Health Monitor.
 *
 * Algorithms (all run in-browser — no server needed):
 *  1. Linear Regression on health-index trend  →  RUL estimate (readings until failure)
 *  2. Z-score anomaly detection on vibration + noise
 *  3. Weighted Condition Index  →  degradation stage
 *  4. Simple exponential smoothing forecast (next N points)
 *  5. Feature extraction: mean, std-dev, peak-to-peak, crest factor
 */

import type { MotorReading } from "@/services/thingspeak";
import { classifyFault, type FaultClassificationResult } from "@/services/referenceDataset";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DegradationStage = "NORMAL" | "EARLY_WEAR" | "MODERATE" | "SEVERE";

export interface MLFeatures {
  mean: number;
  stdDev: number;
  peakToPeak: number;
  crestFactor: number;
  rmsNoise: number;
  trendSlope: number; // health index slope per reading
}

export interface AnomalyPoint {
  time: string;
  timestamp: string;
  vibration: number;
  noise: number;
  healthIndex: number;
  anomalyScore: number;   // 0‒100 normalised
  isAnomaly: boolean;
}

export interface RULResult {
  rulReadings: number;       // readings until health index hits 0
  rulMinutes: number;        // assumes 20-second poll → minutes
  rulHours: number;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  rSquared: number;
  trendSlope: number;        // negative = degrading
  forecastPoints: { reading: number; predicted: number }[];
}

export interface PrognosticsResult {
  features: MLFeatures;
  anomalyPoints: AnomalyPoint[];
  anomalyRate: number;          // % of readings flagged
  rulResult: RULResult | null;  // null if not enough data
  degradationStage: DegradationStage;
  degradationScore: number;     // 0‒100  (0 = perfect, 100 = failed)
  maintenanceUrgency: "NONE" | "SCHEDULE" | "SOON" | "IMMEDIATE";
  recommendation: string;
  faultClassification: FaultClassificationResult; // CWRU nearest-neighbor result
}

// ─── Math helpers ─────────────────────────────────────────────────────────────

function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stdDev(arr: number[], mu?: number): number {
  if (arr.length < 2) return 0;
  const m = mu ?? mean(arr);
  const variance = arr.reduce((s, v) => s + (v - m) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

function rms(arr: number[]): number {
  if (arr.length === 0) return 0;
  return Math.sqrt(arr.reduce((s, v) => s + v * v, 0) / arr.length);
}

/**
 * Ordinary Least Squares regression: y = m*x + b
 * Returns { slope, intercept, rSquared }
 */
function linearRegression(y: number[]): { slope: number; intercept: number; rSquared: number } {
  const n = y.length;
  if (n < 2) return { slope: 0, intercept: y[0] ?? 0, rSquared: 0 };

  const x = Array.from({ length: n }, (_, i) => i);
  const mx = mean(x);
  const my = mean(y);

  let ssXX = 0, ssXY = 0, ssYY = 0;
  for (let i = 0; i < n; i++) {
    ssXX += (x[i] - mx) ** 2;
    ssXY += (x[i] - mx) * (y[i] - my);
    ssYY += (y[i] - my) ** 2;
  }

  if (ssXX === 0) return { slope: 0, intercept: my, rSquared: 0 };
  const slope = ssXY / ssXX;
  const intercept = my - slope * mx;
  const rSquared = ssYY === 0 ? 1 : (ssXY * ssXY) / (ssXX * ssYY);

  return { slope, intercept, rSquared: Math.min(1, Math.max(0, rSquared)) };
}

// ─── Feature Extraction ───────────────────────────────────────────────────────

export function extractFeatures(readings: MotorReading[]): MLFeatures {
  if (readings.length === 0) {
    return { mean: 0, stdDev: 0, peakToPeak: 0, crestFactor: 0, rmsNoise: 0, trendSlope: 0 };
  }

  const vibs = readings.map((r) => r.vibration);
  const noises = readings.map((r) => r.noise);
  const healths = readings.map((r) => r.healthIndex);

  const mu = mean(vibs);
  const sigma = stdDev(vibs, mu);
  const peak = Math.max(...vibs);
  const minV = Math.min(...vibs);
  const crest = sigma > 0 ? peak / (rms(vibs) || 1) : 0;
  const reg = linearRegression(healths);

  return {
    mean: mu,
    stdDev: sigma,
    peakToPeak: peak - minV,
    crestFactor: crest,
    rmsNoise: rms(noises),
    trendSlope: reg.slope,
  };
}

// ─── Anomaly Detection (Z-score fusion) ──────────────────────────────────────

const ANOMALY_THRESHOLD = 2.0; // z-score cut-off

export function detectAnomalies(readings: MotorReading[]): AnomalyPoint[] {
  if (readings.length < 3) {
    return readings.map((r) => ({
      ...r,
      anomalyScore: 0,
      isAnomaly: false,
    }));
  }

  const vibs = readings.map((r) => r.vibration);
  const noises = readings.map((r) => r.noise);

  const vibMu = mean(vibs);
  const vibSigma = stdDev(vibs, vibMu) || 1;
  const noiseMu = mean(noises);
  const noiseSigma = stdDev(noises, noiseMu) || 1;

  return readings.map((r) => {
    const zVib = Math.abs((r.vibration - vibMu) / vibSigma);
    const zNoise = Math.abs((r.noise - noiseMu) / noiseSigma);

    // Fused z-score (weighted: vibration 60 %, noise 40 %)
    const zFused = 0.6 * zVib + 0.4 * zNoise;

    // Normalise to 0-100 so UI can render it as a percentage
    const anomalyScore = Math.min(100, (zFused / 4) * 100);

    return {
      time: r.time,
      timestamp: r.timestamp,
      vibration: r.vibration,
      noise: r.noise,
      healthIndex: r.healthIndex,
      anomalyScore,
      isAnomaly: zFused >= ANOMALY_THRESHOLD,
    };
  });
}

// ─── RUL Estimation ──────────────────────────────────────────────────────────

const FAILURE_THRESHOLD = 0;   // health index at "failure"
const POLL_INTERVAL_SEC = 15;  // ESP32 upload interval (updated from 20s)

export function estimateRUL(readings: MotorReading[]): RULResult | null {
  if (readings.length < 4) return null;

  const healths = readings.map((r) => r.healthIndex);
  const { slope, intercept, rSquared } = linearRegression(healths);

  // If trend is flat or improving, RUL = very large
  const currentIdx = healths.length - 1;
  const currentPredicted = slope * currentIdx + intercept;

  let rulReadings: number;

  if (slope >= 0) {
    // No degradation trend detected
    rulReadings = 9999;
  } else {
    // x when y = FAILURE_THRESHOLD: x = (threshold - intercept) / slope
    const failureIdx = (FAILURE_THRESHOLD - intercept) / slope;
    rulReadings = Math.max(0, Math.round(failureIdx - currentIdx));
  }

  const rulSeconds = rulReadings * POLL_INTERVAL_SEC;
  const rulMinutes = rulSeconds / 60;
  const rulHours = rulMinutes / 60;

  // Confidence based on R²
  const confidence: RULResult["confidence"] =
    rSquared > 0.8 ? "HIGH" : rSquared > 0.5 ? "MEDIUM" : "LOW";

  // Forecast next 10 readings
  const forecastPoints = Array.from({ length: 10 }, (_, i) => {
    const idx = currentIdx + i + 1;
    return {
      reading: i + 1,
      predicted: Math.max(0, Math.min(100, slope * idx + intercept)),
    };
  });

  return {
    rulReadings: Math.min(rulReadings, 9999),
    rulMinutes,
    rulHours,
    confidence,
    rSquared,
    trendSlope: slope,
    forecastPoints,
  };
}

// ─── Degradation Stage Classification ────────────────────────────────────────

export function classifyDegradation(
  health: number,
  anomalyRate: number,
  slope: number,
): { stage: DegradationStage; score: number } {
  // Weighted degradation score (0 = perfect, 100 = failed)
  const healthScore = (1 - health / 100) * 60;               // 60 % weight
  const anomalyScore = Math.min(anomalyRate, 100) * 0.25;    // 25 % weight
  const trendScore = Math.min(Math.abs(Math.min(slope, 0)) * 500, 15); // 15 % weight

  const score = Math.min(100, healthScore + anomalyScore + trendScore);

  let stage: DegradationStage;
  if (score < 20) stage = "NORMAL";
  else if (score < 45) stage = "EARLY_WEAR";
  else if (score < 70) stage = "MODERATE";
  else stage = "SEVERE";

  return { stage, score };
}

// ─── Maintenance Urgency ─────────────────────────────────────────────────────

export function getMaintenanceUrgency(
  stage: DegradationStage,
  rulHours: number,
): { urgency: PrognosticsResult["maintenanceUrgency"]; recommendation: string } {
  if (stage === "NORMAL") {
    return {
      urgency: "NONE",
      recommendation:
        "Motor is operating within normal parameters. Continue scheduled inspection cycle. No immediate action required.",
    };
  }
  if (stage === "EARLY_WEAR") {
    return {
      urgency: "SCHEDULE",
      recommendation:
        "Early-stage wear signatures detected. Schedule a lubrication check and bearing inspection during the next planned maintenance window.",
    };
  }
  if (stage === "MODERATE") {
    return {
      urgency: "SOON",
      recommendation:
        "Moderate degradation detected. Inspect bearing races, check alignment, and verify coupling integrity within the next 24-48 hours.",
    };
  }
  // SEVERE
  return {
    urgency: "IMMEDIATE",
    recommendation:
      "Severe degradation — risk of imminent failure. Stop motor if operationally feasible, perform full inspection of bearings, stator windings, and mechanical couplings immediately.",
  };
}

// ─── Main Entry Point ─────────────────────────────────────────────────────────

export function runPrognostics(readings: MotorReading[]): PrognosticsResult {
  if (readings.length === 0) {
    return {
      features: extractFeatures([]),
      anomalyPoints: [],
      anomalyRate: 0,
      rulResult: null,
      degradationStage: "NORMAL",
      degradationScore: 0,
      maintenanceUrgency: "NONE",
      recommendation: "No data available. Connect to ThingSpeak to begin analysis.",
      faultClassification: classifyFault({ crestFactor: 0, stdDev: 0, mean: 0, peakToPeak: 0 }),
    };
  }

  const features = extractFeatures(readings);
  const anomalyPoints = detectAnomalies(readings);
  const anomalyCount = anomalyPoints.filter((p) => p.isAnomaly).length;
  const anomalyRate = (anomalyCount / readings.length) * 100;

  const rulResult = estimateRUL(readings);
  const latestHealth = readings[readings.length - 1].healthIndex;

  const { stage, score } = classifyDegradation(
    latestHealth,
    anomalyRate,
    features.trendSlope,
  );

  const { urgency, recommendation } = getMaintenanceUrgency(
    stage,
    rulResult?.rulHours ?? 9999,
  );

  const faultClassification = classifyFault({
    crestFactor: features.crestFactor,
    stdDev: features.stdDev,
    mean: features.mean,
    peakToPeak: features.peakToPeak,
  });

  return {
    features,
    anomalyPoints,
    anomalyRate,
    rulResult,
    degradationStage: stage,
    degradationScore: score,
    maintenanceUrgency: urgency,
    recommendation,
    faultClassification,
  };
}
