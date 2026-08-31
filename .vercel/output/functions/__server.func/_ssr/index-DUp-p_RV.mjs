import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, b as CardHeader, d as CardTitle, a as CardContent, f as fetchMotorReadings, c as cn } from "./router-BSLZVQA-.mjs";
import { T as TrendChart } from "./TrendChart-DIArWiGW.mjs";
import { A as AlertPanel } from "./AlertPanel-CuaW-KBp.mjs";
import { G as Gauge$1, V as Volume2, f as ShieldCheck, d as TriangleAlert, C as Cpu, g as Wifi, h as Cloud, R as Radio } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/recharts.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const TONE_CLASS = {
  healthy: {
    ring: "ring-healthy/20",
    text: "text-healthy",
    bg: "bg-healthy/10",
    border: "border-healthy/30"
  },
  warning: {
    ring: "ring-warning/20",
    text: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30"
  },
  critical: {
    ring: "ring-critical/20",
    text: "text-critical",
    bg: "bg-critical/10",
    border: "border-critical/30"
  },
  info: {
    ring: "ring-primary/20",
    text: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30"
  }
};
function KpiCard({ title, value, unit, icon: Icon, tone, hint }) {
  const t = TONE_CLASS[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: cn("overflow-hidden border bg-card transition-all hover:shadow-md", t.border), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-3xl font-bold tabular-nums", t.text), children: value }),
        unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: unit })
      ] }),
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: hint })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("rounded-xl p-3 ring-4", t.bg, t.ring), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-6 w-6", t.text) }) })
  ] }) }) });
}
const SIZE = 220;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CX = SIZE / 2;
const CY = SIZE / 2;
function polar(angleDeg) {
  const rad = Math.PI / 180 * angleDeg;
  return { x: CX + RADIUS * Math.cos(rad), y: CY + RADIUS * Math.sin(rad) };
}
function arcPath(startAngle, endAngle) {
  const s = polar(startAngle);
  const e = polar(endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}
function valueToAngle(value, min, max) {
  const clamped = Math.max(min, Math.min(max, value));
  const ratio = (clamped - min) / (max - min);
  return 180 + ratio * 180;
}
function zoneColor(value, zones, fallback) {
  const z = zones.find((z2) => value >= z2.from && value <= z2.to);
  return z?.color ?? fallback;
}
function Gauge({ title, value, min, max, unit, zones, decimals = 2 }) {
  const needleAngle = valueToAngle(value, min, max);
  const current = zoneColor(value, zones, "var(--color-primary)");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: SIZE, height: SIZE / 2 + STROKE, viewBox: `0 ${CY - RADIUS - STROKE / 2} ${SIZE} ${RADIUS + STROKE}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: arcPath(180, 360),
          stroke: "var(--color-muted)",
          strokeWidth: STROKE,
          fill: "none",
          strokeLinecap: "round"
        }
      ),
      zones.map((z, idx) => {
        const a1 = valueToAngle(z.from, min, max);
        const a2 = valueToAngle(z.to, min, max);
        if (a2 - a1 < 0.5) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: arcPath(a1, a2),
            stroke: z.color,
            strokeWidth: STROKE,
            fill: "none",
            strokeLinecap: "butt",
            opacity: 0.85
          },
          idx
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "g",
        {
          style: {
            transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            transformOrigin: `${CX}px ${CY}px`,
            transform: `rotate(${needleAngle - 270}deg)`
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: CX,
              y1: CY,
              x2: CX,
              y2: CY - RADIUS + 6,
              stroke: "var(--color-foreground)",
              strokeWidth: 3,
              strokeLinecap: "round"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: CX, cy: CY, r: 8, fill: "var(--color-foreground)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: CX, cy: CY, r: 3, fill: "var(--color-background)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mt-2 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-bold tabular-nums", style: { color: current }, children: [
        value.toFixed(decimals),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-sm font-medium text-muted-foreground", children: unit })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex w-full justify-between px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: min }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: max })
      ] })
    ] })
  ] });
}
function formatAgo(date) {
  if (!date) return "—";
  const sec = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1e3));
  if (sec < 60) return `${sec} sec ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  return `${h} h ago`;
}
function Row$1({
  icon: Icon,
  label,
  status,
  ok
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md bg-muted p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `inline-block h-2 w-2 rounded-full ${ok ? "bg-healthy shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-healthy)_20%,transparent)]" : "bg-critical"}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: ok ? "text-healthy" : "text-critical", children: status })
    ] })
  ] });
}
function DeviceStatusPanel({ online, lastUpdatedAt }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Device Status" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row$1, { icon: Cpu, label: "ESP32", status: online ? "Connected" : "Offline", ok: online }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row$1, { icon: Wifi, label: "WiFi", status: online ? "Connected" : "Disconnected", ok: online }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row$1, { icon: Cloud, label: "ThingSpeak", status: online ? "Online" : "Unreachable", ok: online }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row$1, { icon: Radio, label: "Sensors", status: "Active", ok: online }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Last Upload" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatAgo(lastUpdatedAt) })
      ] })
    ] })
  ] });
}
function formatUptime(ms) {
  const totalSec = Math.floor(ms / 1e3);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor(totalSec % 3600 / 60);
  const s = totalSec % 60;
  return `${h}h ${m}m ${s}s`;
}
function Row({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 py-2 last:border-b-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold tabular-nums text-foreground", children: value })
  ] });
}
function SystemInfoPanel() {
  const [start] = reactExports.useState(() => Date.now() - 2 * 3600 * 1e3 - 15 * 60 * 1e3 - 36 * 1e3);
  const [now, setNow] = reactExports.useState(Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "System Information" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Device ID", value: "ESP32-MOTOR-001" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "IP Address", value: "10.255.143.57" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Uptime", value: formatUptime(now - start) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Upload Interval", value: "20 sec" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Cloud Platform", value: "ThingSpeak" })
    ] })
  ] });
}
const FALLBACK = {
  timestamp: (/* @__PURE__ */ new Date()).toISOString(),
  vibration: 0.97,
  noise: 34,
  healthIndex: 35,
  status: "WARNING"
};
function statusTone(status) {
  if (status === "HEALTHY") return "healthy";
  if (status === "WARNING") return "warning";
  return "critical";
}
function vibrationTone(v) {
  if (v < 0.5) return "healthy";
  if (v < 1.2) return "warning";
  return "critical";
}
function healthTone(h) {
  if (h >= 70) return "healthy";
  if (h >= 40) return "warning";
  return "critical";
}
function DashboardPage() {
  const [readings, setReadings] = reactExports.useState([]);
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [lastUpdatedAt, setLastUpdatedAt] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data2 = await fetchMotorReadings(controller.signal);
        setReadings(data2);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 2e4);
    return () => {
      controller.abort();
      clearInterval(id);
    };
  }, []);
  const data = readings;
  const current = readings.length > 0 ? readings[readings.length - 1] : FALLBACK;
  const online = !error;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1600px] flex-col gap-6", children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning", children: [
      "Couldn't reach ThingSpeak (",
      error,
      "). Showing the last known state."
    ] }),
    loading && readings.length === 0 && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary", children: "Connecting to ThingSpeak channel…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { title: "Vibration (RMS)", value: current.vibration.toFixed(2), unit: "g", icon: Gauge$1, tone: vibrationTone(current.vibration), hint: "Field 1 · ThingSpeak" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { title: "Noise Level", value: current.noise.toFixed(0), unit: "dB", icon: Volume2, tone: "info", hint: "Field 2 · ThingSpeak" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { title: "Health Index", value: `${current.healthIndex.toFixed(0)}`, unit: "%", icon: ShieldCheck, tone: healthTone(current.healthIndex), hint: "Field 3 · ThingSpeak" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { title: "Status", value: current.status, icon: TriangleAlert, tone: statusTone(current.status), hint: "Field 4 · ThingSpeak" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Live Gauges" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 items-end gap-6 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { title: "Vibration Level (g)", value: current.vibration, min: 0, max: 2, unit: "g", decimals: 2, zones: [{
          from: 0,
          to: 0.5,
          color: "var(--color-healthy)"
        }, {
          from: 0.5,
          to: 1.2,
          color: "var(--color-warning)"
        }, {
          from: 1.2,
          to: 2,
          color: "var(--color-critical)"
        }] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { title: "Health Index (%)", value: current.healthIndex, min: 0, max: 100, unit: "%", decimals: 0, zones: [{
          from: 0,
          to: 40,
          color: "var(--color-critical)"
        }, {
          from: 40,
          to: 70,
          color: "var(--color-warning)"
        }, {
          from: 70,
          to: 100,
          color: "var(--color-healthy)"
        }] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { title: "Noise Level (dB)", value: current.noise, min: 30, max: 90, unit: "dB", decimals: 0, zones: [{
          from: 30,
          to: 60,
          color: "var(--color-healthy)"
        }, {
          from: 60,
          to: 75,
          color: "var(--color-warning)"
        }, {
          from: 75,
          to: 90,
          color: "var(--color-critical)"
        }] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Vibration Trend (RMS)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendChart, { data, dataKey: "vibration", color: "var(--color-healthy)", yLabel: "g", domain: [0, 2] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Noise Level Trend (dB)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendChart, { data, dataKey: "noise", color: "var(--color-info)", yLabel: "dB", domain: [30, 90] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertPanel, { status: current.status }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceStatusPanel, { online, lastUpdatedAt }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SystemInfoPanel, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Latest Readings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            const headers = "Time,Vibration (g),Noise (dB),Health Index (%),Status";
            const rows = data.map((r) => `${r.time},${r.vibration.toFixed(2)},${r.noise.toFixed(0)},${r.healthIndex.toFixed(0)},${r.status}`);
            const csv = [headers, ...rows].join("\n");
            const blob = new Blob([csv], {
              type: "text/csv"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `motor-health-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }, className: "rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors", children: "Export CSV" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left font-medium", children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Vib (g)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Noise" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Health" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            [...data].reverse().slice(0, 10).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-foreground", children: r.time }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums", children: r.vibration.toFixed(2) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums", children: r.noise.toFixed(0) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1.5 text-right tabular-nums", children: [
                r.healthIndex.toFixed(0),
                "%"
              ] })
            ] }, i)),
            data.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "py-6 text-center text-muted-foreground", children: "No readings yet." }) })
          ] })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
