import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { fetchMotorReadings } from "@/services/thingspeak";
import type { MotorReading } from "@/services/thingspeak";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports | Motor Health Monitor" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const [readings, setReadings] = useState<MotorReading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setReadings(data);
      } catch { /* silently fail */ } finally {
        setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 20000);
    return () => { controller.abort(); clearInterval(id); };
  }, []);

  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  const max = (arr: number[]) => arr.length ? Math.max(...arr) : 0;
  const min = (arr: number[]) => arr.length ? Math.min(...arr) : 0;

  const vibs = readings.map(r => r.vibration);
  const noises = readings.map(r => r.noise);
  const healths = readings.map(r => r.healthIndex);
  const healthy = readings.filter(r => r.status === "HEALTHY").length;
  const warning = readings.filter(r => r.status === "WARNING").length;
  const critical = readings.filter(r => r.status === "CRITICAL").length;
  const latest = readings.length > 0 ? readings[readings.length - 1] : null;
  const overallHealth = avg(healths);
  const overallStatus = overallHealth >= 70 ? "HEALTHY" : overallHealth >= 40 ? "WARNING" : "CRITICAL";
  const statusColor = overallStatus === "HEALTHY" ? "text-green-600" : overallStatus === "WARNING" ? "text-yellow-500" : "text-red-500";

  const downloadReport = () => {
    const lines = [
      "MOTOR HEALTH MONITOR — SESSION REPORT",
      `Generated: ${new Date().toLocaleString()}`,
      `Channel: 3399470 | Device: ESP32-MOTOR-001`,
      "", "=== SUMMARY ===",
      `Total Readings: ${readings.length}`,
      `Overall Status: ${overallStatus}`,
      `Average Health Index: ${avg(healths).toFixed(1)}%`,
      "", "=== VIBRATION (g) ===",
      `Average: ${avg(vibs).toFixed(3)}g`, `Maximum: ${max(vibs).toFixed(3)}g`, `Minimum: ${min(vibs).toFixed(3)}g`,
      "", "=== NOISE (dB) ===",
      `Average: ${avg(noises).toFixed(1)} dB`, `Maximum: ${max(noises).toFixed(1)} dB`, `Minimum: ${min(noises).toFixed(1)} dB`,
      "", "=== STATUS DISTRIBUTION ===",
      `HEALTHY: ${healthy}`, `WARNING: ${warning}`, `CRITICAL: ${critical}`,
      "", "=== RAW READINGS ===",
      "timestamp,vibration_g,noise_db,health_index,status",
      ...readings.map(r => `${r.timestamp},${r.vibration},${r.noise},${r.healthIndex},${r.status}`)
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `motor-report-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell title="Reports" description="Session summary and motor health analytics." icon={FileText}>
      {loading ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Loading report data…</p>
      ) : (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Session Summary</CardTitle>
              <Button size="sm" variant="outline" onClick={downloadReport} disabled={readings.length === 0}>
                <Download className="mr-2 h-4 w-4" /> Download Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["Total Readings", readings.length],
                  ["Avg Health", `${avg(healths).toFixed(0)}%`],
                  ["Overall Status", <span className={statusColor}>{overallStatus}</span>],
                  ["Last Reading", latest ? latest.time : "—"],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-lg border border-border p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { title: "Vibration Statistics (g)", rows: [["Average", `${avg(vibs).toFixed(3)} g`], ["Maximum", `${max(vibs).toFixed(3)} g`], ["Minimum", `${min(vibs).toFixed(3)} g`], ["Warning threshold", "0.5 g"], ["Critical threshold", "1.2 g"]] },
              { title: "Noise Statistics (dB)", rows: [["Average", `${avg(noises).toFixed(1)} dB`], ["Maximum", `${max(noises).toFixed(1)} dB`], ["Minimum", `${min(noises).toFixed(1)} dB`], ["Warning threshold", "60 dB"], ["Critical threshold", "75 dB"]] },
            ].map(({ title, rows }) => (
              <Card key={title}>
                <CardHeader><CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</CardTitle></CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <tbody>
                      {rows.map(([label, value]) => (
                        <tr key={label} className="border-t border-border/60">
                          <td className="py-2 text-muted-foreground">{label}</td>
                          <td className="py-2 text-right font-medium tabular-nums">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Status Distribution</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Healthy</p>
                  <p className="text-3xl font-bold text-green-600">{healthy}</p>
                  <p className="text-xs text-muted-foreground mt-1">{readings.length ? ((healthy/readings.length)*100).toFixed(0) : 0}%</p>
                </div>
                <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Warning</p>
                  <p className="text-3xl font-bold text-yellow-500">{warning}</p>
                  <p className="text-xs text-muted-foreground mt-1">{readings.length ? ((warning/readings.length)*100).toFixed(0) : 0}%</p>
                </div>
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Critical</p>
                  <p className="text-3xl font-bold text-red-500">{critical}</p>
                  <p className="text-xs text-muted-foreground mt-1">{readings.length ? ((critical/readings.length)*100).toFixed(0) : 0}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageShell>
  );
}