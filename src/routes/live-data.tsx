import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { fetchMotorReadings } from "@/services/thingspeak";
import type { MotorReading } from "@/services/thingspeak";

export const Route = createFileRoute("/live-data")({
  head: () => ({ meta: [{ title: "Live Data | Motor Health Monitor" }] }),
  component: LiveDataPage,
});

function LiveDataPage() {
  const [readings, setReadings] = useState<MotorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setReadings(data);
        setError(null);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 20000);
    return () => { controller.abort(); clearInterval(id); };
  }, []);

  return (
    <PageShell title="Live Data" description="Raw telemetry stream from the ESP32 sensor module." icon={Activity}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Feeds ({readings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && readings.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">Loading…</p>}
          {error && <p className="py-3 text-sm text-yellow-500">Connection issue: {error}</p>}
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-2 text-left font-medium">Timestamp</th>
                  <th className="py-2 text-right font-medium">Vibration (g)</th>
                  <th className="py-2 text-right font-medium">Noise (dB)</th>
                  <th className="py-2 text-right font-medium">Health (%)</th>
                  <th className="py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[...readings].reverse().map((r, i) => (
                  <tr key={i} className="border-t border-border/60">
                    <td className="py-1.5 text-foreground">{new Date(r.timestamp).toLocaleString()}</td>
                    <td className="py-1.5 text-right tabular-nums">{r.vibration.toFixed(2)}</td>
                    <td className="py-1.5 text-right tabular-nums">{r.noise.toFixed(0)}</td>
                    <td className="py-1.5 text-right tabular-nums">{r.healthIndex.toFixed(0)}</td>
                    <td className="py-1.5 text-right font-semibold">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}