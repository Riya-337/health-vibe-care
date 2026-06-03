import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { useMotorData } from "@/hooks/useMotorData";

export const Route = createFileRoute("/live-data")({
  head: () => ({
    meta: [{ title: "Live Data | Motor Health Monitor" }],
  }),
  component: LiveDataPage,
});

function LiveDataPage() {
  const { readings, loading, error } = useMotorData(20_000);
  return (
    <PageShell title="Live Data" description="Raw telemetry stream from the ESP32 sensor module." icon={Activity}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Feeds ({readings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && readings.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">Loading…</p>
          )}
          {error && (
            <p className="py-3 text-sm text-warning">Connection issue: {error}</p>
          )}
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
                    <td className="py-1.5 text-foreground">
                      {new Date(r.timestamp).toLocaleString()}
                    </td>
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
