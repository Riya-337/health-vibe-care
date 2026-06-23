/**
 * RulGauge.tsx
 * Renders a half-circle SVG gauge for the RUL (Remaining Useful Life) value,
 * with an arc that drains from green → yellow → red as time runs out.
 */
import type { RULResult } from "@/services/mlEngine";

interface RulGaugeProps {
  rulResult: RULResult | null;
  currentHealth: number;
}

// Map hours → display label
function formatRUL(hours: number): { value: string; unit: string } {
  if (hours >= 9999) return { value: "∞", unit: "stable" };
  if (hours >= 48) return { value: (hours / 24).toFixed(1), unit: "days" };
  if (hours >= 1) return { value: hours.toFixed(1), unit: "hours" };
  const mins = hours * 60;
  return { value: mins.toFixed(0), unit: "minutes" };
}

// Describes a half-circle SVG arc path
function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

export function RulGauge({ rulResult, currentHealth }: RulGaugeProps) {
  const cx = 100;
  const cy = 90;
  const r = 72;

  // Fraction of "life remaining" for arc fill (0 to 1)
  // Use health index as the primary signal for the fill
  const fraction = Math.max(0, Math.min(1, currentHealth / 100));

  // Arc goes from -180° (left) to 0° (right) — a half circle from bottom-left
  const startAngle = -180;
  const totalSweep = 180;
  const sweepAngle = startAngle + totalSweep * fraction;

  // Colour: green → yellow → red
  const colour =
    fraction > 0.6
      ? "var(--color-healthy)"
      : fraction > 0.3
      ? "var(--color-warning)"
      : "var(--color-critical)";

  const bgPath = describeArc(cx, cy, r, -180, 0);
  const fillPath = describeArc(cx, cy, r, -180, sweepAngle);

  const rul = rulResult ? formatRUL(rulResult.rulHours) : null;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 200 110"
        className="w-full max-w-[240px]"
        aria-label="RUL gauge"
      >
        {/* Background track */}
        <path
          d={bgPath}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <path
          d={fillPath}
          fill="none"
          stroke={colour}
          strokeWidth={14}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${colour}55)` }}
        />

        {/* Centre value */}
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fill="currentColor"
          className="fill-foreground"
        >
          {rul ? rul.value : "—"}
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fontSize="11"
          fill="currentColor"
          className="fill-muted-foreground"
        >
          {rul ? rul.unit : "insufficient data"}
        </text>

        {/* Labels */}
        <text x={16} y={cy + 22} fontSize="9" className="fill-muted-foreground">0%</text>
        <text x={174} y={cy + 22} fontSize="9" className="fill-muted-foreground">100%</text>
      </svg>

      {rulResult && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            R² ={" "}
            <span className="font-semibold tabular-nums text-foreground">
              {rulResult.rSquared.toFixed(2)}
            </span>
          </span>
          <span className="opacity-40">·</span>
          <span>
            Confidence:{" "}
            <span
              className={`font-semibold ${
                rulResult.confidence === "HIGH"
                  ? "text-green-500"
                  : rulResult.confidence === "MEDIUM"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {rulResult.confidence}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
