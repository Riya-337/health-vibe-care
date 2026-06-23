import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { FileDown, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { fetchMotorReadings } from "@/services/thingspeak";
import { loadSession, sessionStats, clearSession } from "@/services/sessionLogger";
import { runPrognostics } from "@/services/mlEngine";
import type { MotorReading } from "@/services/thingspeak";

export const Route = createFileRoute("/pdf-report")(({
  head: () => ({
    meta: [
      { title: "PDF Report | Motor Health Monitor" },
      {
        name: "description",
        content:
          "Print or save a complete Motor Health Monitor prognostics report as PDF.",
      },
    ],
  }),
  component: PdfReportPage,
} as any));

// ── helpers ──────────────────────────────────────────────────────────────────

const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
const maxArr = (arr: number[]) => arr.length ? Math.max(...arr) : 0;
const minArr = (arr: number[]) => arr.length ? Math.min(...arr) : 0;

function fmt(n: number, dp = 2) { return n.toFixed(dp); }

const STATUS_COLOR: Record<string, string> = {
  HEALTHY: "#16a34a",
  WARNING: "#ca8a04",
  CRITICAL: "#dc2626",
};

// ── Page ─────────────────────────────────────────────────────────────────────

function PdfReportPage() {
  const [liveReadings, setLiveReadings] = useState<MotorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [useSession, setUseSession] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setLiveReadings(data);
      } catch { /* silent */ } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const stats = sessionStats();

  const readings: MotorReading[] = useMemo(() => {
    if (useSession) {
      const s = loadSession();
      return s.length > 0 ? s : liveReadings;
    }
    return liveReadings;
  }, [useSession, liveReadings]);

  const result = useMemo(() => runPrognostics(readings), [readings]);

  const vibs = readings.map((r) => r.vibration);
  const noises = readings.map((r) => r.noise);
  const healths = readings.map((r) => r.healthIndex);
  const healthy = readings.filter((r) => r.status === "HEALTHY").length;
  const warning = readings.filter((r) => r.status === "WARNING").length;
  const critical = readings.filter((r) => r.status === "CRITICAL").length;
  const latest = readings.length > 0 ? readings[readings.length - 1] : null;
  const generatedAt = new Date().toLocaleString();

  const handlePrint = () => window.print();

  const handleClearSession = () => {
    if (window.confirm("Clear all stored session data? This cannot be undone.")) {
      clearSession();
      setUseSession(false);
    }
  };

  return (
    <PageShell
      title="PDF Report"
      description="Complete motor health and ML prognostics report — click Print to save as PDF."
      icon={FileDown}
    >
      {/* Controls (hidden when printing) */}
      <div className="no-print flex flex-wrap items-center gap-3">
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" />
          Print / Save as PDF
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Data source:</span>
          {(["session", "live"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setUseSession(s === "session")}
              className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
                (useSession ? "session" : "live") === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {s === "session"
                ? `Session Log (${stats.count} pts)`
                : `Live Only (${liveReadings.length} pts)`}
            </button>
          ))}
        </div>

        {stats.count > 0 && (
          <button
            onClick={handleClearSession}
            className="text-xs text-red-400 hover:text-red-500 underline"
          >
            Clear session log
          </button>
        )}
      </div>

      {loading && readings.length === 0 && (
        <p className="no-print py-3 text-center text-sm text-muted-foreground">Loading data…</p>
      )}

      {/* ══════════════════ PRINTABLE REPORT ══════════════════ */}
      <div ref={printRef} id="printable-report" className="print-report">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; color: black !important; }
            #printable-report { padding: 0 !important; }
            .print-report { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #111; }
            .report-page-break { page-break-before: always; }
            .print-card {
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 16px;
              break-inside: avoid;
            }
            .print-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .print-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
            .print-grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; }
            th, td { padding: 5px 8px; border-bottom: 1px solid #eee; text-align: left; }
            th { font-weight: 600; text-transform: uppercase; font-size: 10px; color: #555; }
          }
          @media screen {
            .print-report { display: flex; flex-direction: column; gap: 16px; }
            .print-card {
              border: 1px solid hsl(var(--border));
              border-radius: 8px;
              padding: 16px;
              background: hsl(var(--card));
            }
            .print-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .print-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
            .print-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
          }
        `}</style>

        {/* ── Cover Header ── */}
        <div className="print-card" style={{ borderLeft: "4px solid #2563eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
                Motor Health Monitor — Prognostics Report
              </h1>
              <p style={{ margin: "4px 0 0", color: "#555", fontSize: 12 }}>
                IoT-Enabled Predictive Maintenance System · RV College of Engineering, Bengaluru
              </p>
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: "#555" }}>
              <div><strong>Generated:</strong> {generatedAt}</div>
              <div><strong>Channel:</strong> 3399470 · ESP32-MOTOR-001</div>
              <div><strong>Readings:</strong> {readings.length} ({useSession ? "session log" : "live window"})</div>
              {stats.earliest && (
                <div><strong>Period:</strong> {new Date(stats.earliest).toLocaleDateString()} – {new Date(stats.latest!).toLocaleDateString()}</div>
              )}
            </div>
          </div>
        </div>

        {/* ── Executive Summary ── */}
        <div className="print-card">
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 12px" }}>
            Executive Summary
          </h2>
          <div className="print-grid-4">
            {[
              { label: "Overall Status", value: latest?.status ?? "—", color: STATUS_COLOR[latest?.status ?? ""] ?? "#555" },
              { label: "Avg Health Index", value: `${fmt(avg(healths), 1)}%`, color: "#111" },
              { label: "Degradation Stage", value: result.degradationStage.replace("_", " "), color: "#111" },
              { label: "Maintenance Urgency", value: result.maintenanceUrgency, color: result.maintenanceUrgency === "IMMEDIATE" ? "#dc2626" : result.maintenanceUrgency === "SOON" ? "#ca8a04" : "#111" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "10px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", color: "#777", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 6, background: result.maintenanceUrgency === "IMMEDIATE" ? "#fef2f2" : result.maintenanceUrgency === "SOON" ? "#fefce8" : "#f0fdf4", border: `1px solid ${result.maintenanceUrgency === "IMMEDIATE" ? "#fca5a5" : result.maintenanceUrgency === "SOON" ? "#fde047" : "#86efac"}` }}>
            <strong>Recommendation:</strong> {result.recommendation}
          </div>
        </div>

        {/* ── Vibration + Noise Statistics ── */}
        <div className="print-grid-2">
          {[
            {
              title: "Vibration Statistics (g)",
              rows: [
                ["Average", `${fmt(avg(vibs), 3)} g`],
                ["Maximum", `${fmt(maxArr(vibs), 3)} g`],
                ["Minimum", `${fmt(minArr(vibs), 3)} g`],
                ["Std Deviation", `${fmt(result.features.stdDev, 3)} g`],
                ["Peak-to-Peak", `${fmt(result.features.peakToPeak, 3)} g`],
                ["Crest Factor", fmt(result.features.crestFactor, 2)],
                ["Warning threshold", "0.5 g"],
                ["Critical threshold", "1.2 g"],
              ],
            },
            {
              title: "Noise Statistics (dB)",
              rows: [
                ["Average", `${fmt(avg(noises), 1)} dB`],
                ["Maximum", `${fmt(maxArr(noises), 1)} dB`],
                ["Minimum", `${fmt(minArr(noises), 1)} dB`],
                ["RMS Noise", `${fmt(result.features.rmsNoise, 1)} dB`],
                ["Warning threshold", "60 dB"],
                ["Critical threshold", "75 dB"],
              ],
            },
          ].map(({ title, rows }) => (
            <div key={title} className="print-card">
              <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 8px" }}>{title}</h2>
              <table>
                <tbody>
                  {rows.map(([l, v]) => (
                    <tr key={l}>
                      <td style={{ color: "#555" }}>{l}</td>
                      <td style={{ textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* ── ML Prognostics ── */}
        <div className="print-card">
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 12px" }}>
            ML Prognostics — Remaining Useful Life
          </h2>
          <div className="print-grid-3" style={{ marginBottom: 12 }}>
            {[
              ["Model", "OLS Linear Regression"],
              ["R² (Goodness of fit)", result.rulResult ? fmt(result.rulResult.rSquared, 3) : "—"],
              ["Confidence", result.rulResult?.confidence ?? "—"],
              ["Trend Slope", `${result.features.trendSlope >= 0 ? "+" : ""}${fmt(result.features.trendSlope, 4)} %/reading`],
              ["Anomaly Rate", `${fmt(result.anomalyRate, 1)}% (${result.anomalyPoints.filter(p => p.isAnomaly).length} events)`],
              ["Degradation Score", `${fmt(result.degradationScore, 1)} / 100`],
            ].map(([l, v]) => (
              <div key={l} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 12px" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", color: "#777", marginBottom: 2 }}>{l}</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </div>

          {result.rulResult && (
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "10px 14px" }}>
              <strong>RUL Estimate:</strong>{" "}
              {result.rulResult.rulReadings >= 9999
                ? "No degradation trend detected — motor appears stable."
                : `${result.rulResult.rulReadings} readings (≈ ${result.rulResult.rulHours >= 48 ? `${(result.rulResult.rulHours / 24).toFixed(1)} days` : `${result.rulResult.rulHours.toFixed(1)} hours`}) until predicted failure threshold.`}
            </div>
          )}
        </div>

        {/* ── Status Distribution ── */}
        <div className="print-card">
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 12px" }}>
            Status Distribution ({readings.length} readings)
          </h2>
          <div className="print-grid-3">
            {[
              { label: "HEALTHY", count: healthy, color: "#16a34a", bg: "#f0fdf4" },
              { label: "WARNING", count: warning, color: "#ca8a04", bg: "#fefce8" },
              { label: "CRITICAL", count: critical, color: "#dc2626", bg: "#fef2f2" },
            ].map(({ label, count, color, bg }) => (
              <div key={label} style={{ background: bg, border: `1px solid ${color}55`, borderRadius: 8, padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", color: "#555", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color }}>{count}</div>
                <div style={{ fontSize: 11, color: "#555" }}>
                  {readings.length ? `${((count / readings.length) * 100).toFixed(0)}%` : "0%"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Raw Readings Table ── */}
        <div className="print-card report-page-break">
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 12px" }}>
            Raw Readings (last 50)
          </h2>
          <table>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th>Timestamp</th>
                <th style={{ textAlign: "right" }}>Vibration (g)</th>
                <th style={{ textAlign: "right" }}>Noise (dB)</th>
                <th style={{ textAlign: "right" }}>Health (%)</th>
                <th style={{ textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...readings].reverse().slice(0, 50).map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td>{new Date(r.timestamp).toLocaleString()}</td>
                  <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.vibration.toFixed(3)}</td>
                  <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.noise.toFixed(0)}</td>
                  <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.healthIndex.toFixed(0)}%</td>
                  <td style={{ textAlign: "right", fontWeight: 600, color: STATUS_COLOR[r.status] ?? "#111" }}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {readings.length > 50 && (
            <p style={{ marginTop: 8, fontSize: 11, color: "#555" }}>
              Showing 50 of {readings.length} readings. Export full CSV from the Dashboard page.
            </p>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{ textAlign: "center", fontSize: 10, color: "#888", marginTop: 8, paddingTop: 8, borderTop: "1px solid #e5e7eb" }}>
          Motor Health Monitor · IoT-Enabled Predictive Maintenance · RVCE Bengaluru · Report generated {generatedAt}
        </div>
      </div>

      {/* Preview info (screen only) */}
      <Card className="no-print">
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Session Log Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {[
              ["Stored readings", stats.count],
              ["Earliest reading", stats.earliest ? new Date(stats.earliest).toLocaleString() : "—"],
              ["Latest reading", stats.latest ? new Date(stats.latest).toLocaleString() : "—"],
              ["Storage used", `${stats.sizeKB} KB`],
            ].map(([l, v]) => (
              <div key={String(l)} className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{l}</p>
                <p className="font-semibold">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            The session log persists readings to <code>localStorage</code> automatically on every 20-second poll.
            Data survives browser refreshes. Maximum 500 readings stored (oldest evicted first).
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
