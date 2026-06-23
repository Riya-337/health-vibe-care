/**
 * sessionLogger.ts
 * Persists every ThingSpeak reading to localStorage so data accumulates
 * across browser sessions — giving the ML engine a longer history than
 * ThingSpeak's last-20 window.
 *
 * Storage key : "mhm_session_log"
 * Max entries : SESSION_CAP (default 500) — oldest entries evicted first.
 * Schema      : array of StoredReading (timestamp + sensor values)
 */

import type { MotorReading } from "@/services/thingspeak";

const STORAGE_KEY = "mhm_session_log";
const SESSION_CAP = 500; // max readings stored

export interface StoredReading extends MotorReading {
  loggedAt: string; // ISO string when it was stored by the logger
}

/** Load all stored readings from localStorage (oldest first). */
export function loadSession(): StoredReading[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredReading[];
  } catch {
    return [];
  }
}

/** Persist a batch of readings (de-duped by timestamp). */
export function logReadings(incoming: MotorReading[]): void {
  try {
    const existing = loadSession();
    const existingTs = new Set(existing.map((r) => r.timestamp));

    const newEntries: StoredReading[] = incoming
      .filter((r) => !existingTs.has(r.timestamp))
      .map((r) => ({ ...r, loggedAt: new Date().toISOString() }));

    if (newEntries.length === 0) return;

    const merged = [...existing, ...newEntries];

    // Evict oldest if over cap
    const trimmed = merged.length > SESSION_CAP
      ? merged.slice(merged.length - SESSION_CAP)
      : merged;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage quota exceeded or unavailable — silently skip
  }
}

/** Clear the entire session log. */
export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/** Summary stats for display in the UI. */
export function sessionStats(): {
  count: number;
  earliest: string | null;
  latest: string | null;
  sizeKB: number;
} {
  const data = loadSession();
  if (data.length === 0) {
    return { count: 0, earliest: null, latest: null, sizeKB: 0 };
  }
  const raw = localStorage.getItem(STORAGE_KEY) ?? "";
  return {
    count: data.length,
    earliest: data[0].timestamp,
    latest: data[data.length - 1].timestamp,
    sizeKB: Math.round((raw.length * 2) / 1024), // UTF-16 estimate
  };
}
