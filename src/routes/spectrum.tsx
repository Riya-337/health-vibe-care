import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { fetchMotorReadings } from "@/services/thingspeak";
import { loadSession } from "@/services/sessionLogger";
import { computeSpectrum, findPeaks, classifySpectrum } from "@/services/fft";
import type { MotorReading } from "@/services/thingspeak";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

export const Route = createFileRoute("/spectrum")(({
  head: () => ({
    meta: [
      { title: "Frequency Spectrum | Motor Health Monitor" },
      {
        name: "description",
        content:
          "Vibration frequency spectrum analysis using Discrete Fourier Transform — Motor Health Monitor.",
      },
    ],
  }),
  component: SpectrumPage,
} as any));

// ESP32 uploads every 15 s → effective sample rate = 1/15 Hz
const FS_HZ = 1 / 15;

type DataSource = "live" | "session";

function SpectrumPage() {
  const [liveReadings, setLiveReadings] = useState<MotorReading[]>([]);
  const [sessionReadings, setSessionReadings] = useState<MotorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<DataSource>("session");

  // Load session from localStorage on mount
  useEffect(() => {
    setSessionReadings(loadSession());
  }, []);

  // Live fetch
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setLiveReadings(data);
        // refresh session after each fetch
        setSessionReadings(loadSession());
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 20000);
    return () => { controller.abort(); clearInterval(id); };
  }, []);

  const activeReadings = source === "session" ? sessionReadings : liveReadings;

  // DFT
  const { bins, peaks, classification } = useMemo(() => {
    const signal = activeReadings.map((r) => r.vibration);
    const b = computeSpectrum(signal, FS_HZ);
    const p = findPeaks(b, 3, 20);
    const c = classifySpectrum(b, p, FS_HZ);
    return { bins: b, peaks: p, classification: c };
  }, [activeReadings]);

  // Format Hz with mHz for tiny values
  const fmtHz = (hz: number) =>
    hz < 0.001
      ? `${(hz * 1000).toFixed(2)} mHz`
      : `${hz.toFixed(4)} Hz`;

  const peakFreqs = new Set(peaks.map((p) => p.frequency));

  const chartData = bins.map((b) => ({
    freq: fmtHz(b.frequency),
    magnitude: parseFloat(b.magnitude.toFixed(2)),
    isPeak: peakFreqs.has(b.frequency),
  }));

  return (
    <PageShell
      title="Frequency Spectrum"
      description="Vibration signal decomposed into frequency components via Discrete Fourier Transform (Hann-windowed, DC-removed)."
      icon={Waves}
    >
      {/* Source selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Data source:</span>
        {(["session", "live"] as DataSource[]).map((s) => (
          <button
            key={s}
            onClick={() => setSource(s)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors border ${
              source === s
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {s === "session"
              ? `Session Log (${sessionReadings.length} pts)`
              : `Live Window (${liveReadings.length} pts)`}
          </button>
        ))}
      </div>

      {/* Info banner */}
      {activeReadings.length < 4 && (
        <div className="rounded-lg border border-info/20 bg-info/5 px-4 py-3 text-sm text-info">
          ℹ Need at least 4 readings for a meaningful spectrum. Keep the dashboard open — data accumulates automatically.
        </div>
      )}

      {/* ── Spectrum Chart ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Vibration Magnitude Spectrum — DFT ({activeReadings.length} samples, fs = {FS_HZ.toFixed(4)} Hz)
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Dominant peaks highlighted in amber. Frequency resolution = {bins.length > 1 ? fmtHz(bins[1]?.frequency ?? 0) : "—"} per bin.
          </p>
        </CardHeader>
        <CardContent>
          {loading && activeReadings.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">Loading data…</p>
          ) : bins.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">No spectrum data available.</p>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="freq"
                    tick={{ fontSize: 9, fill: "var(--color-muted-foreground)" }}
                    stroke="var(--color-border)"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    label={{
                      value: "Frequency",
                      position: "insideBottom",
                      offset: -30,
                      style: { fontSize: 11, fill: "var(--color-muted-foreground)" },
                    }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                    stroke="var(--color-border)"
                    label={{
                      value: "Magnitude (%)",
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
                    formatter={(v: number, _: string, props: any) => [
                      `${v.toFixed(1)}%${props.payload?.isPeak ? " ⭐ Peak" : ""}`,
                      "Magnitude",
                    ]}
                  />
                  <ReferenceLine y={20} stroke="var(--color-warning)" strokeDasharray="4 3" />
                  <Bar dataKey="magnitude" radius={[3, 3, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.isPeak ? "var(--color-warning)" : "var(--color-healthy)"}
                        opacity={entry.isPeak ? 1 : 0.6}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Classification + Peaks ── */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Spectral Classification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-muted/30 px-4 py-4">
              <p className="text-base font-semibold text-foreground">{classification}</p>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Based on dominant frequency band relative to Nyquist (f_N = {fmtHz(FS_HZ / 2)}).
                ISO 10816 energy-band heuristics applied.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {[
                ["Samples (N)", activeReadings.length],
                ["Sample Rate (fs)", `${FS_HZ.toFixed(4)} Hz`],
                ["Nyquist (fs/2)", fmtHz(FS_HZ / 2)],
                ["Freq. Resolution", bins.length > 1 ? fmtHz(bins[1]?.frequency ?? 0) : "—"],
                ["DFT Bins", bins.length],
                ["Window", "Hann"],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex justify-between rounded border border-border/60 px-2 py-1.5">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-xs font-semibold tabular-nums">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Dominant Frequency Peaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {peaks.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No significant peaks detected above 20% threshold.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-2 text-left font-medium">Rank</th>
                    <th className="py-2 text-right font-medium">Frequency</th>
                    <th className="py-2 text-right font-medium">Period</th>
                    <th className="py-2 text-right font-medium">Magnitude</th>
                  </tr>
                </thead>
                <tbody>
                  {peaks.map((p, i) => (
                    <tr key={i} className="border-t border-border/60">
                      <td className="py-2 font-semibold text-warning">#{i + 1}</td>
                      <td className="py-2 text-right tabular-nums">{fmtHz(p.frequency)}</td>
                      <td className="py-2 text-right tabular-nums text-muted-foreground">
                        {p.frequency > 0 ? `${(1 / p.frequency / 60).toFixed(1)} min` : "∞"}
                      </td>
                      <td className="py-2 text-right tabular-nums font-semibold">
                        {p.magnitude.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="mt-4 rounded-lg border border-border/60 p-3 text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Note:</span> At the 20-second poll
              rate (fs = {FS_HZ.toFixed(4)} Hz), the Nyquist limit is {fmtHz(FS_HZ / 2)}, meaning
              only very-slow cyclic variations can be resolved. For bearing-frequency resolution,
              increase the ESP32 upload rate.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Theory card ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            DFT Theory Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            {[
              {
                title: "Discrete Fourier Transform",
                body: "X[k] = Σ x[n] · e^(−j2πkn/N). Each bin k represents the complex amplitude at frequency k·fs/N. Magnitude = |X[k]|, normalised to the window energy.",
              },
              {
                title: "Hann Window",
                body: "w[n] = 0.5 – 0.5·cos(2πn/(N–1)). Applied before the DFT to taper edge discontinuities and reduce spectral leakage — essential for short data records.",
              },
              {
                title: "One-sided Spectrum",
                body: "For real-valued signals, the DFT is conjugate symmetric. Only bins 0…N/2 are unique. Non-DC bins are doubled to preserve total signal energy in the one-sided view.",
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
