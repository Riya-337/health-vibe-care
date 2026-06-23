import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { BrainCircuit, AlertTriangle, TrendingDown, Zap, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { fetchMotorReadings } from "@/services/thingspeak";
import type { MotorReading } from "@/services/thingspeak";
import { runPrognostics } from "@/services/mlEngine";
import { RulGauge } from "@/components/dashboard/RulGauge";
import { AnomalyChart } from "@/components/dashboard/AnomalyChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export const Route = createFileRoute("/ml")(({
  head: () => ({
    meta: [
      { title: "ML Prognostics | Motor Health Monitor" },
      {
        name: "description",
        content:
          "Machine-learning prognostics: RUL estimation, anomaly detection, and degradation staging for rotating machinery.",
      },
    ],
  }),
  component: MLPrognosticsPage,
} as any));

// ─── Urgency badge styles ─────────────────────────────────────────────────────
const URGENCY_STYLE: Record<string, string> = {
  NONE: "border-green-500/30 bg-green-500/10 text-green-500",
  SCHEDULE: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  SOON: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  IMMEDIATE: "border-red-500/30 bg-red-500/10 text-red-500",
};

const STAGE_STYLE: Record<string, string> = {
  NORMAL: "text-green-500",
  EARLY_WEAR: "text-blue-400",
  MODERATE: "text-yellow-500",
  SEVERE: "text-red-500",
};

const STAGE_LABEL: Record<string, string> = {
  NORMAL: "Normal",
  EARLY_WEAR: "Early Wear",
  MODERATE: "Moderate",
  SEVERE: "Severe",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

function MLPrognosticsPage() {
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

  // Run ML every time readings change
  const result = useMemo(() => runPrognostics(readings), [readings]);

  const current = readings.length > 0 ? readings[readings.length - 1] : null;

  return (
    <PageShell
      title="ML Prognostics"
      description="Remaining Useful Life estimation, anomaly detection, and degradation staging — computed from live ThingSpeak data."
      icon={BrainCircuit}
    >
      {/* Connection / loading banners */}
      {loading && readings.length === 0 && !error && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          Connecting to ThingSpeak — fetching data for ML analysis…
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">
          ⚠ Couldn't reach ThingSpeak ({error}). Analysis based on last known data.
        </div>
      )}
      {readings.length > 0 && readings.length < 4 && (
        <div className="rounded-lg border border-info/20 bg-info/5 px-4 py-3 text-sm text-info">
          ℹ Only {readings.length} reading{readings.length > 1 ? "s" : ""} received. RUL estimation requires at least 4 — accumulating data…
        </div>
      )}

      {/* ── Row 1: KPI cards ── */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Degradation Stage */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Degradation Stage
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className={`text-2xl font-bold ${STAGE_STYLE[result.degradationStage]}`}>
              {STAGE_LABEL[result.degradationStage]}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Score {result.degradationScore.toFixed(0)} / 100
            </p>
          </CardContent>
        </Card>

        {/* Anomaly Rate */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Anomaly Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className={`text-2xl font-bold ${result.anomalyRate > 25 ? "text-red-500" : result.anomalyRate > 10 ? "text-yellow-500" : "text-green-500"}`}>
              {result.anomalyRate.toFixed(1)}%
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {result.anomalyPoints.filter(p => p.isAnomaly).length} / {readings.length} flagged
            </p>
          </CardContent>
        </Card>

        {/* Trend Slope */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Health Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className={`text-2xl font-bold ${result.features.trendSlope < -0.5 ? "text-red-500" : result.features.trendSlope < 0 ? "text-yellow-500" : "text-green-500"}`}>
              {result.features.trendSlope >= 0 ? "+" : ""}{result.features.trendSlope.toFixed(2)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">% / reading (slope)</p>
          </CardContent>
        </Card>

        {/* Maintenance Urgency */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <span
              className={`inline-block rounded-full border px-3 py-1 text-sm font-semibold ${URGENCY_STYLE[result.maintenanceUrgency]}`}
            >
              {result.maintenanceUrgency}
            </span>
          </CardContent>
        </Card>
      </section>

      {/* ── Row 2: RUL Gauge + Recommendation ── */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Remaining Useful Life (RUL)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <RulGauge
              rulResult={result.rulResult}
              currentHealth={current?.healthIndex ?? 0}
            />
            {result.rulResult && (
              <div className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Readings Left</p>
                    <p className="font-semibold tabular-nums">
                      {result.rulResult.rulReadings >= 9999 ? "∞" : result.rulResult.rulReadings}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Est. Time</p>
                    <p className="font-semibold tabular-nums">
                      {result.rulResult.rulHours >= 9999
                        ? "∞"
                        : result.rulResult.rulHours >= 48
                        ? `${(result.rulResult.rulHours / 24).toFixed(1)} d`
                        : `${result.rulResult.rulHours.toFixed(1)} h`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">R²</p>
                    <p className="font-semibold tabular-nums">
                      {result.rulResult.rSquared.toFixed(3)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Maintenance Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Urgency badge */}
            <div className={`rounded-lg border p-3 ${URGENCY_STYLE[result.maintenanceUrgency]}`}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
                {result.maintenanceUrgency === "NONE"
                  ? "No Action Required"
                  : result.maintenanceUrgency === "SCHEDULE"
                  ? "Schedule Inspection"
                  : result.maintenanceUrgency === "SOON"
                  ? "Inspect Soon"
                  : "⚠ Immediate Action Required"}
              </p>
              <p className="text-sm leading-relaxed">{result.recommendation}</p>
            </div>

            {/* Feature stats */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                ["Mean Vibration", `${result.features.mean.toFixed(3)} g`],
                ["Std Dev Vibration", `${result.features.stdDev.toFixed(3)} g`],
                ["Peak-to-Peak", `${result.features.peakToPeak.toFixed(3)} g`],
                ["Crest Factor", result.features.crestFactor.toFixed(2)],
                ["RMS Noise", `${result.features.rmsNoise.toFixed(1)} dB`],
                ["Readings analysed", readings.length],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex justify-between rounded border border-border/60 px-2 py-1.5">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-xs font-semibold tabular-nums">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Row 3: Anomaly Detection Chart ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Anomaly Detection — Vibration Signal + Fused Anomaly Score
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Red bars indicate high anomaly scores. Highlighted dots mark Z-score anomalies (fused vibration + noise).
          </p>
        </CardHeader>
        <CardContent>
          <AnomalyChart data={result.anomalyPoints} />
        </CardContent>
      </Card>

      {/* ── Row 4: Health Forecast Chart ── */}
      {result.rulResult && result.rulResult.forecastPoints.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Health Index — Historical + Linear Regression Forecast (next 10 readings)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Build combined dataset: historical + forecast */}
            {(() => {
              const historical = readings.map((r, i) => ({
                label: r.time,
                actual: r.healthIndex,
                forecast: null as number | null,
              }));
              const lastTime = readings.length > 0
                ? readings[readings.length - 1].time
                : "—";
              const forecast = result.rulResult!.forecastPoints.map((fp, i) => ({
                label: `+${fp.reading}`,
                actual: null as number | null,
                forecast: fp.predicted,
              }));
              const combined = [...historical, ...forecast];

              return (
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={combined} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                        stroke="var(--color-border)"
                        minTickGap={20}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                        stroke="var(--color-border)"
                        label={{
                          value: "%",
                          angle: -90,
                          position: "insideLeft",
                          offset: 12,
                          style: { fontSize: 10, fill: "var(--color-muted-foreground)" },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "var(--color-popover)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                        formatter={(v: number, name: string) => [
                          `${v?.toFixed(1)}%`,
                          name === "actual" ? "Health Index" : "Forecast",
                        ]}
                      />

                      {/* Failure reference */}
                      <ReferenceLine
                        y={40}
                        stroke="var(--color-warning)"
                        strokeDasharray="4 3"
                        label={{ value: "Warning", position: "right", fontSize: 9, fill: "var(--color-warning)" }}
                      />
                      <ReferenceLine
                        y={0}
                        stroke="var(--color-critical)"
                        strokeDasharray="4 3"
                        label={{ value: "Failure", position: "right", fontSize: 9, fill: "var(--color-critical)" }}
                      />

                      {/* Historical line */}
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="var(--color-healthy)"
                        strokeWidth={2.5}
                        dot={{ r: 2, fill: "var(--color-healthy)" }}
                        activeDot={{ r: 5 }}
                        connectNulls={false}
                        name="actual"
                      />
                      {/* Forecast line (dashed) */}
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="var(--color-warning)"
                        strokeWidth={2}
                        strokeDasharray="6 4"
                        dot={{ r: 3, fill: "var(--color-warning)" }}
                        connectNulls={false}
                        name="forecast"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* ── Row 5: Anomaly Event Table ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Flagged Anomaly Events ({result.anomalyPoints.filter(p => p.isAnomaly).length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result.anomalyPoints.filter(p => p.isAnomaly).length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No anomalies detected in the current window. ✓
            </p>
          ) : (
            <div className="overflow-auto max-h-56">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-2 text-left font-medium">Time</th>
                    <th className="py-2 text-right font-medium">Vibration (g)</th>
                    <th className="py-2 text-right font-medium">Noise (dB)</th>
                    <th className="py-2 text-right font-medium">Health (%)</th>
                    <th className="py-2 text-right font-medium">Anomaly Score</th>
                  </tr>
                </thead>
                <tbody>
                  {result.anomalyPoints
                    .filter(p => p.isAnomaly)
                    .reverse()
                    .map((p, i) => (
                      <tr key={i} className="border-t border-border/60">
                        <td className="py-1.5 text-foreground">{new Date(p.timestamp).toLocaleString()}</td>
                        <td className="py-1.5 text-right tabular-nums text-red-400">{p.vibration.toFixed(3)}</td>
                        <td className="py-1.5 text-right tabular-nums">{p.noise.toFixed(0)}</td>
                        <td className="py-1.5 text-right tabular-nums">{p.healthIndex.toFixed(0)}%</td>
                        <td className="py-1.5 text-right tabular-nums font-semibold text-red-500">
                          {p.anomalyScore.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Row 6: Algorithm Notes (examiner-friendly) ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            ML Algorithm Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "RUL — Linear Regression",
                body:
                  "Ordinary Least Squares is fitted to the health-index time series. The x-intercept of the regression line (where predicted health = 0) gives the Remaining Useful Life in readings, converted to minutes/hours at the 20-second poll rate.",
              },
              {
                title: "Anomaly Detection — Z-score Fusion",
                body:
                  "Per-reading Z-scores are computed for vibration and noise independently (μ, σ over the session window). A fused score (0.6 × Z_vib + 0.4 × Z_noise) exceeding 2.0 σ flags the reading as anomalous.",
              },
              {
                title: "Degradation Stage Classification",
                body:
                  "A weighted degradation score (health index 60 %, anomaly rate 25 %, trend slope 15 %) maps to four stages: Normal, Early Wear, Moderate, and Severe — driving the maintenance urgency output.",
              },
              {
                title: "Feature Extraction",
                body:
                  "Statistical features extracted from the vibration window: mean, standard deviation, peak-to-peak amplitude, crest factor (peak / RMS), and RMS noise. These proxy traditional vibration analysis metrics.",
              },
              {
                title: "Health Index Forecast",
                body:
                  "The fitted OLS regression line is extrapolated 10 readings into the future, giving a visual preview of the expected health trajectory and confirming the time-to-failure estimate.",
              },
              {
                title: "Confidence Metric (R²)",
                body:
                  "The coefficient of determination (R²) of the OLS fit quantifies how well the linear degradation model explains the variance in the health index. R² > 0.8 → HIGH, > 0.5 → MEDIUM, else LOW.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-lg border border-border/60 p-3">
                <p className="mb-1 font-semibold text-foreground">{title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
