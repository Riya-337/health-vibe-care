import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import type { MotorReading, MotorStatus } from "@/services/thingspeak";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports | Motor Health Monitor" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const [readings, setReadings] = useState<MotorReading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("https://api.thingspeak.com/channels/3399470/feeds.json?api_key=VQL5EX22KNVGXLA4&results=20")}`);
        const raw = await res.json();
        const json = JSON.parse(raw.contents);
        setReadings(json.feeds.map((f: any) => ({
          timestamp: f.created_at,
          time: new Date(f.created_at).toLocaleTimeString(),
          vibration: parseFloat(f.field1) || 0,
          noise: parseFloat(f.field2) || 0,
          healthIndex: parseFloat(f.field3) || 0,
          status: (f.field4?.trim().toUpperCase() || "WARNING") as MotorStatus,
        })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Computed stats
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

  const overallHealth = healths.length > 0 ? avg(healths) : 0;
  const overallStatus = overallHealth >= 70 ? "HEALTHY" : overallHealth >= 40 ? "WARNING" : "CRITICAL";
  const statusColor = overallStatus === "HEALTHY" ? "text-green-600" : overallStatus === "WARNING" ? "text-yellow-500" : "text-red-500";

  const downloadReport = () => {
    const lines = [
      "MOTOR HEALTH MONITOR — SESSION REPORT",
      `Generated: ${new Date().toLocaleString()}`,
      `Channel: 3399470 | Device: ESP32-MOTOR-001`,
      "",
      "=== SUMMARY ===",
      `Total Readings: ${readings.length}`,
      `Overall Status: ${overallStatus}`,
      `Average Health Index: ${avg(healths).toFixed(1)}%`,
      "",
      "=== VIBRATION (g) ===",
      `Average: ${avg(vibs).toFixed(3)}g`,
      `Maximum: ${max(vibs).toFixed(3)}g`,
      `Minimum: ${min(vibs).toFixed(3)}g`,
      "",
      "=== NOISE (dB) ===",
      `Average: ${avg(noises).toFixed(1)} dB`,
      `Maximum: ${max(noises).toFixed(1)} dB`,
      `Minimum: ${min(noises).toFixed(1)} dB`,
      "",
      "=== STATUS DISTRIBUTION ===",
      `HEALTHY: ${healthy} readings (${readings.length ? ((healthy/readings.length)*100).toFixed(0) : 0}%)`,
      `WARNING: ${warning} readings (${readings.length ? ((warning/readings.length)*100).toFixed(0) : 0}%)`,
      `CRITICAL: ${critical} readings (${readings.length ? ((critical/readings.length)*100).toFixed(0) : 0}%)`,
      "",
      "=== RAW READINGS ===",
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

          {/* Overall status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Session Summary
              </CardTitle>
              <Button size="sm" variant="outline" onClick={downloadReport} disabled={readings.length === 0}>
                <Download className="mr-2 h-4 w-4" /> Download Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border border-border p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total Readings</p>
                  <p className="text-3xl font-bold">{readings.length}</p>
                </div>
                <div className="rounded-lg border border-border p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Avg Health</p>
                  <p className="text-3xl font-bold">{avg(healths).toFixed(0)}%</p>
                </div>
                <div className="rounded-lg border border-border p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Overall Status</p>
                  <p className={`text-2xl font-bold ${statusColor}`}>{overallStatus}</p>
                </div>
                <div className="rounded-lg border border-border p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Last Reading</p>
                  <p className="text-sm font-medium">{latest ? latest.time : "—"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vibration + Noise stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Vibration Statistics (g)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ["Average", `${avg(vibs).toFixed(3)} g`],
                      ["Maximum", `${max(vibs).toFixed(3)} g`],
                      ["Minimum", `${min(vibs).toFixed(3)} g`],
                      ["Threshold (Warning)", "0.5 g"],
                      ["Threshold (Critical)", "1.2 g"],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-t border-border/60">
                        <td className="py-2 text-muted-foreground">{label}</td>
                        <td className="py-2 text-right font-medium tabular-nums">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Noise Statistics (dB)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ["Average", `${avg(noises).toFixed(1)} dB`],
                      ["Maximum", `${max(noises).toFixed(1)} dB`],
                      ["Minimum", `${min(noises).toFixed(1)} dB`],
                      ["Threshold (Warning)", "60 dB"],
                      ["Threshold (Critical)", "75 dB"],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-t border-border/60">
                        <td className="py-2 text-muted-foreground">{label}</td>
                        <td className="py-2 text-right font-medium tabular-nums">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Status distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Healthy</p>
                  <p className="text-3xl font-bold text-green-600">{healthy}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {readings.length ? ((healthy / readings.length) * 100).toFixed(0) : 0}% of readings
                  </p>
                </div>
                <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Warning</p>
                  <p className="text-3xl font-bold text-yellow-500">{warning}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {readings.length ? ((warning / readings.length) * 100).toFixed(0) : 0}% of readings
                  </p>
                </div>
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Critical</p>
                  <p className="text-3xl font-bold text-red-500">{critical}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {readings.length ? ((critical / readings.length) * 100).toFixed(0) : 0}% of readings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Device", "ESP32-MOTOR-001"],
                    ["Cloud Platform", "ThingSpeak"],
                    ["Channel ID", "3399470"],
                    ["Upload Interval", "20 seconds"],
                    ["Institution", "RV College of Engineering, Bengaluru"],
                    ["Course", "CS344AI — IoT & Embedded Computing"],
                    ["Report Generated", new Date().toLocaleString()],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-t border-border/60">
                      <td className="py-2 text-muted-foreground">{label}</td>
                      <td className="py-2 text-right font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

        </div>
      )}
    </PageShell>
  );
}