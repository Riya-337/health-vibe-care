import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, C as Card, b as CardHeader, d as CardTitle, B as Button, a as CardContent, f as fetchMotorReadings } from "./router-BSLZVQA-.mjs";
import { F as FileText, D as Download } from "../_libs/lucide-react.mjs";
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
function ReportsPage() {
  const [readings, setReadings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setReadings(data);
      } catch {
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
  const avg = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  const max = (arr) => arr.length ? Math.max(...arr) : 0;
  const min = (arr) => arr.length ? Math.min(...arr) : 0;
  const vibs = readings.map((r) => r.vibration);
  const noises = readings.map((r) => r.noise);
  const healths = readings.map((r) => r.healthIndex);
  const healthy = readings.filter((r) => r.status === "HEALTHY").length;
  const warning = readings.filter((r) => r.status === "WARNING").length;
  const critical = readings.filter((r) => r.status === "CRITICAL").length;
  const latest = readings.length > 0 ? readings[readings.length - 1] : null;
  const overallHealth = avg(healths);
  const overallStatus = overallHealth >= 70 ? "HEALTHY" : overallHealth >= 40 ? "WARNING" : "CRITICAL";
  const statusColor = overallStatus === "HEALTHY" ? "text-green-600" : overallStatus === "WARNING" ? "text-yellow-500" : "text-red-500";
  const downloadReport = () => {
    const lines = ["MOTOR HEALTH MONITOR — SESSION REPORT", `Generated: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, `Channel: 3399470 | Device: ESP32-MOTOR-001`, "", "=== SUMMARY ===", `Total Readings: ${readings.length}`, `Overall Status: ${overallStatus}`, `Average Health Index: ${avg(healths).toFixed(1)}%`, "", "=== VIBRATION (g) ===", `Average: ${avg(vibs).toFixed(3)}g`, `Maximum: ${max(vibs).toFixed(3)}g`, `Minimum: ${min(vibs).toFixed(3)}g`, "", "=== NOISE (dB) ===", `Average: ${avg(noises).toFixed(1)} dB`, `Maximum: ${max(noises).toFixed(1)} dB`, `Minimum: ${min(noises).toFixed(1)} dB`, "", "=== STATUS DISTRIBUTION ===", `HEALTHY: ${healthy}`, `WARNING: ${warning}`, `CRITICAL: ${critical}`, "", "=== RAW READINGS ===", "timestamp,vibration_g,noise_db,health_index,status", ...readings.map((r) => `${r.timestamp},${r.vibration},${r.noise},${r.healthIndex},${r.status}`)];
    const blob = new Blob([lines.join("\n")], {
      type: "text/plain"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `motor-report-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { title: "Reports", description: "Session summary and motor health analytics.", icon: FileText, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "Loading report data…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Session Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: downloadReport, disabled: readings.length === 0, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
          " Download Report"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: [["Total Readings", readings.length], ["Avg Health", `${avg(healths).toFixed(0)}%`], ["Overall Status", /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: statusColor, children: overallStatus })], ["Last Reading", latest ? latest.time : "—"]].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: value })
      ] }, String(label))) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [{
      title: "Vibration Statistics (g)",
      rows: [["Average", `${avg(vibs).toFixed(3)} g`], ["Maximum", `${max(vibs).toFixed(3)} g`], ["Minimum", `${min(vibs).toFixed(3)} g`], ["Warning threshold", "0.5 g"], ["Critical threshold", "1.2 g"]]
    }, {
      title: "Noise Statistics (dB)",
      rows: [["Average", `${avg(noises).toFixed(1)} dB`], ["Maximum", `${max(noises).toFixed(1)} dB`], ["Minimum", `${min(noises).toFixed(1)} dB`], ["Warning threshold", "60 dB"], ["Critical threshold", "75 dB"]]
    }].map(({
      title,
      rows
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right font-medium tabular-nums", children: value })
      ] }, label)) }) }) })
    ] }, title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Status Distribution" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-green-500/30 bg-green-500/10 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: "Healthy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-600", children: healthy }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            readings.length ? (healthy / readings.length * 100).toFixed(0) : 0,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: "Warning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-yellow-500", children: warning }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            readings.length ? (warning / readings.length * 100).toFixed(0) : 0,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-red-500/30 bg-red-500/10 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: "Critical" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-red-500", children: critical }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            readings.length ? (critical / readings.length * 100).toFixed(0) : 0,
            "%"
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  ReportsPage as component
};
