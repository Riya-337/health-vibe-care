/**
 * AnomalyChart.tsx
 * Dual-axis chart showing the vibration signal alongside the fused anomaly
 * score, with flagged anomaly points highlighted as red dots.
 */
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { AnomalyPoint } from "@/services/mlEngine";

interface AnomalyChartProps {
  data: AnomalyPoint[];
}

// Custom dot: red for anomalies, transparent otherwise
function AnomalyDot(props: any) {
  const { cx, cy, payload } = props;
  if (!payload?.isAnomaly) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="var(--color-critical)"
      stroke="white"
      strokeWidth={1.5}
      opacity={0.9}
    />
  );
}

export function AnomalyChart({ data }: AnomalyChartProps) {
  if (data.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No data available for anomaly analysis.
      </p>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

          {/* X axis */}
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
            stroke="var(--color-border)"
            minTickGap={24}
          />

          {/* Left Y axis — vibration */}
          <YAxis
            yAxisId="vib"
            orientation="left"
            domain={[0, 2]}
            tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
            stroke="var(--color-border)"
            label={{
              value: "Vibration (g)",
              angle: -90,
              position: "insideLeft",
              offset: 12,
              style: { fontSize: 10, fill: "var(--color-muted-foreground)" },
            }}
          />

          {/* Right Y axis — anomaly score */}
          <YAxis
            yAxisId="score"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
            stroke="var(--color-border)"
            label={{
              value: "Anomaly %",
              angle: 90,
              position: "insideRight",
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
            formatter={(value: number, name: string) => [
              name === "anomalyScore"
                ? `${value.toFixed(1)}%`
                : `${value.toFixed(3)} g`,
              name === "anomalyScore" ? "Anomaly Score" : "Vibration",
            ]}
          />

          <Legend
            formatter={(value) =>
              value === "anomalyScore" ? "Anomaly Score" : "Vibration (g)"
            }
            wrapperStyle={{ fontSize: 11 }}
          />

          {/* Anomaly score as bars */}
          <Bar
            yAxisId="score"
            dataKey="anomalyScore"
            fill="var(--color-critical)"
            opacity={0.25}
            radius={[2, 2, 0, 0]}
            name="anomalyScore"
          />

          {/* Vibration line */}
          <Line
            yAxisId="vib"
            type="monotone"
            dataKey="vibration"
            stroke="var(--color-healthy)"
            strokeWidth={2}
            dot={<AnomalyDot />}
            activeDot={{ r: 5 }}
            name="vibration"
          />

          {/* 50 % score reference line */}
          <ReferenceLine
            yAxisId="score"
            y={50}
            stroke="var(--color-warning)"
            strokeDasharray="4 3"
            label={{
              value: "Alert",
              position: "right",
              fontSize: 10,
              fill: "var(--color-warning)",
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
