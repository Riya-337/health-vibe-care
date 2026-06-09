import { fetchMotorReadings } from "@/services/thingspeak";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AlertTriangle, Gauge as GaugeIcon, ShieldCheck, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard, type KpiTone } from "@/components/dashboard/KpiCard";
import { Gauge } from "@/components/dashboard/Gauge";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import { DeviceStatusPanel } from "@/components/dashboard/DeviceStatusPanel";
import { SystemInfoPanel } from "@/components/dashboard/SystemInfoPanel";
import type { MotorReading, MotorStatus } from "@/services/thingspeak";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | Motor Health Monitor" },
      {
        name: "description",
        content:
          "Live vibration, noise, and health-index telemetry from the ESP32 motor sensor — Motor Health Monitor.",
      },
    ],
  }),
  component: DashboardPage,
});

const FALLBACK: MotorReading = {
  timestamp: new Date().toISOString(),
  time: "—",
  vibration: 0.97,
  noise: 34,
  healthIndex: 35,
  status: "WARNING",
};

function statusTone(status: MotorStatus): KpiTone {
  if (status === "HEALTHY") return "healthy";
  if (status === "WARNING") return "warning";
  return "critical";
}

function vibrationTone(v: number): KpiTone {
  if (v < 0.5) return "healthy";
  if (v < 1.2) return "warning";
  return "critical";
}

function healthTone(h: number): KpiTone {
  if (h >= 70) return "healthy";
  if (h >= 40) return "warning";
  return "critical";
}

function DashboardPage() {
  const [readings, setReadings] = useState<MotorReading[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
  const controller = new AbortController();
  const load = async () => {
    try {
      const data = await fetchMotorReadings(controller.signal);
      setReadings(data);
      // setLastUpdatedAt(new Date()); // only in index.tsx
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

  const data = readings;
  const current = readings.length > 0 ? readings[readings.length - 1] : FALLBACK;
  const online = !error;

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      {error && (
        <div className="rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">
          Couldn't reach ThingSpeak ({error}). Showing the last known state.
        </div>
      )}
      {loading && readings.length === 0 && !error && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          Connecting to ThingSpeak channel…
        </div>
      )}

      {/* KPI cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Vibration (RMS)"
          value={current.vibration.toFixed(2)}
          unit="g"
          icon={GaugeIcon}
          tone={vibrationTone(current.vibration)}
          hint="Field 1 · ThingSpeak"
        />
        <KpiCard
          title="Noise Level"
          value={current.noise.toFixed(0)}
          unit="dB"
          icon={Volume2}
          tone="info"
          hint="Field 2 · ThingSpeak"
        />
        <KpiCard
          title="Health Index"
          value={`${current.healthIndex.toFixed(0)}`}
          unit="%"
          icon={ShieldCheck}
          tone={healthTone(current.healthIndex)}
          hint="Field 3 · ThingSpeak"
        />
        <KpiCard
          title="Status"
          value={current.status}
          icon={AlertTriangle}
          tone={statusTone(current.status)}
          hint="Field 4 · ThingSpeak"
        />
      </section>

      {/* Gauges */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Live Gauges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-3">
            <Gauge
              title="Vibration Level (g)"
              value={current.vibration}
              min={0}
              max={2}
              unit="g"
              decimals={2}
              zones={[
                { from: 0, to: 0.5, color: "var(--color-healthy)" },
                { from: 0.5, to: 1.2, color: "var(--color-warning)" },
                { from: 1.2, to: 2, color: "var(--color-critical)" },
              ]}
            />
            <Gauge
              title="Health Index (%)"
              value={current.healthIndex}
              min={0}
              max={100}
              unit="%"
              decimals={0}
              zones={[
                { from: 0, to: 40, color: "var(--color-critical)" },
                { from: 40, to: 70, color: "var(--color-warning)" },
                { from: 70, to: 100, color: "var(--color-healthy)" },
              ]}
            />
            <Gauge
              title="Noise Level (dB)"
              value={current.noise}
              min={30}
              max={90}
              unit="dB"
              decimals={0}
              zones={[
                { from: 30, to: 60, color: "var(--color-healthy)" },
                { from: 60, to: 75, color: "var(--color-warning)" },
                { from: 75, to: 90, color: "var(--color-critical)" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Trend charts */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Vibration Trend (RMS)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart
              data={data}
              dataKey="vibration"
              color="var(--color-healthy)"
              yLabel="g"
              domain={[0, 2]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Noise Level Trend (dB)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart
              data={data}
              dataKey="noise"
              color="var(--color-info)"
              yLabel="dB"
              domain={[30, 90]}
            />
          </CardContent>
        </Card>
      </section>

      {/* Alert + side panels */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <AlertPanel status={current.status} />
        </div>
        <DeviceStatusPanel online={online} lastUpdatedAt={lastUpdatedAt} />
        <SystemInfoPanel />
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Latest Readings
              </CardTitle>
              <button
                onClick={() => {
                  const headers = "Time,Vibration (g),Noise (dB),Health Index (%),Status";
                  const rows = data.map((r) =>
                    `${r.time},${r.vibration.toFixed(2)},${r.noise.toFixed(0)},${r.healthIndex.toFixed(0)},${r.status}`
                  );
                  const csv = [headers, ...rows].join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `motor-health-${new Date().toISOString().slice(0, 10)}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Export CSV
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-2 text-left font-medium">Time</th>
                    <th className="py-2 text-right font-medium">Vib (g)</th>
                    <th className="py-2 text-right font-medium">Noise</th>
                    <th className="py-2 text-right font-medium">Health</th>
                  </tr>
                </thead>
                <tbody>
                  {[...data].reverse().slice(0, 10).map((r, i) => (
                    <tr key={i} className="border-t border-border/60">
                      <td className="py-1.5 text-foreground">{r.time}</td>
                      <td className="py-1.5 text-right tabular-nums">{r.vibration.toFixed(2)}</td>
                      <td className="py-1.5 text-right tabular-nums">{r.noise.toFixed(0)}</td>
                      <td className="py-1.5 text-right tabular-nums">{r.healthIndex.toFixed(0)}%</td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-muted-foreground">
                        No readings yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}