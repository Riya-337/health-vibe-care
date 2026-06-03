import { useEffect, useRef, useState } from "react";
import { fetchMotorReadings, type MotorReading } from "@/services/thingspeak";

export interface UseMotorDataState {
  readings: MotorReading[];
  latest: MotorReading | null;
  loading: boolean;
  error: string | null;
  lastUpdatedAt: Date | null;
}

export function useMotorData(intervalMs = 20_000): UseMotorDataState {
  const [readings, setReadings] = useState<MotorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        if (!mounted.current) return;
        setReadings(data);
        setError(null);
        setLastUpdatedAt(new Date());
      } catch (err) {
        if (!mounted.current) return;
        if ((err as Error).name === "AbortError") return;
        setError((err as Error).message || "Failed to load data");
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    load();
    const id = setInterval(load, intervalMs);

    return () => {
      mounted.current = false;
      controller.abort();
      clearInterval(id);
    };
  }, [intervalMs]);

  return {
    readings,
    latest: readings.length > 0 ? readings[readings.length - 1] : null,
    loading,
    error,
    lastUpdatedAt,
  };
}
