interface GaugeZone {
  from: number;
  to: number;
  color: string; // CSS color
}

interface GaugeProps {
  title: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  zones: GaugeZone[];
  decimals?: number;
}

const SIZE = 220;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CX = SIZE / 2;
const CY = SIZE / 2;
const CIRCUM = Math.PI * RADIUS; // semicircle length

function polar(angleDeg: number) {
  const rad = (Math.PI / 180) * angleDeg;
  return { x: CX + RADIUS * Math.cos(rad), y: CY + RADIUS * Math.sin(rad) };
}

function arcPath(startAngle: number, endAngle: number) {
  const s = polar(startAngle);
  const e = polar(endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}

function valueToAngle(value: number, min: number, max: number) {
  const clamped = Math.max(min, Math.min(max, value));
  const ratio = (clamped - min) / (max - min);
  return 180 + ratio * 180; // 180deg -> 360deg (left to right semicircle)
}

function zoneColor(value: number, zones: GaugeZone[], fallback: string) {
  const z = zones.find((z) => value >= z.from && value <= z.to);
  return z?.color ?? fallback;
}

export function Gauge({ title, value, min, max, unit, zones, decimals = 2 }: GaugeProps) {
  const needleAngle = valueToAngle(value, min, max);
  const current = zoneColor(value, zones, "var(--color-primary)");

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <svg width={SIZE} height={SIZE / 2 + STROKE} viewBox={`0 ${CY - RADIUS - STROKE / 2} ${SIZE} ${RADIUS + STROKE}`}>
        {/* track */}
        <path
          d={arcPath(180, 360)}
          stroke="var(--color-muted)"
          strokeWidth={STROKE}
          fill="none"
          strokeLinecap="round"
        />
        {/* zones */}
        {zones.map((z, idx) => {
          const a1 = valueToAngle(z.from, min, max);
          const a2 = valueToAngle(z.to, min, max);
          if (a2 - a1 < 0.5) return null;
          return (
            <path
              key={idx}
              d={arcPath(a1, a2)}
              stroke={z.color}
              strokeWidth={STROKE}
              fill="none"
              strokeLinecap="butt"
              opacity={0.85}
            />
          );
        })}
        {/* needle */}
        <g
          style={{
            transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            transformOrigin: `${CX}px ${CY}px`,
            transform: `rotate(${needleAngle - 270}deg)`,
          }}
        >
          <line
            x1={CX}
            y1={CY}
            x2={CX}
            y2={CY - RADIUS + 6}
            stroke="var(--color-foreground)"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
        <circle cx={CX} cy={CY} r={8} fill="var(--color-foreground)" />
        <circle cx={CX} cy={CY} r={3} fill="var(--color-background)" />
      </svg>
      <div className="-mt-2 flex flex-col items-center">
        <span className="text-3xl font-bold tabular-nums" style={{ color: current }}>
          {value.toFixed(decimals)}
          <span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span>
        </span>
        <div className="mt-1 flex w-full justify-between px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
}
