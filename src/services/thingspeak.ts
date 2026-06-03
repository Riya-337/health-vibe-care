// ThingSpeak API integration for Motor Health Monitor

export const CHANNEL_ID = "3399470";
export const READ_API_KEY = "VQL5EX22KNVGXLA4";

export type MotorStatus = "HEALTHY" | "WARNING" | "CRITICAL";

export interface MotorReading {
  timestamp: string;
  time: string;
  vibration: number;
  noise: number;
  healthIndex: number;
  status: MotorStatus;
}

export interface ThingSpeakFeed {
  created_at: string;
  entry_id: number;
  field1: string | null;
  field2: string | null;
  field3: string | null;
  field4: string | null;
}

export interface ThingSpeakResponse {
  channel: {
    id: number;
    name: string;
    last_entry_id: number;
  };
  feeds: ThingSpeakFeed[];
}

const ENDPOINT = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=20`;

function parseStatus(raw: string | null, healthIndex: number): MotorStatus {
  if (raw) {
    const v = raw.trim().toUpperCase();
    if (v === "HEALTHY" || v === "WARNING" || v === "CRITICAL") return v;
    if (v === "0") return "HEALTHY";
    if (v === "1") return "WARNING";
    if (v === "2") return "CRITICAL";
  }
  if (healthIndex >= 70) return "HEALTHY";
  if (healthIndex >= 40) return "WARNING";
  return "CRITICAL";
}

function safeNumber(v: string | null, fallback = 0): number {
  if (v === null || v === undefined || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch {
    return "--:--:--";
  }
}

export async function fetchMotorReadings(signal?: AbortSignal): Promise<MotorReading[]> {
  const res = await fetch(ENDPOINT, { signal, cache: "no-store" });
  if (!res.ok) {
    throw new Error(`ThingSpeak request failed: ${res.status}`);
  }
  const data = (await res.json()) as ThingSpeakResponse;
  if (!data?.feeds || !Array.isArray(data.feeds)) return [];

  return data.feeds.map((f) => {
    const vibration = safeNumber(f.field1);
    const noise = safeNumber(f.field2);
    const healthIndex = safeNumber(f.field3);
    const status = parseStatus(f.field4, healthIndex);
    return {
      timestamp: f.created_at,
      time: formatTime(f.created_at),
      vibration,
      noise,
      healthIndex,
      status,
    };
  });
}
