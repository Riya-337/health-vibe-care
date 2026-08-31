import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, C as Card, b as CardHeader, d as CardTitle, a as CardContent, f as fetchMotorReadings } from "./router-BSLZVQA-.mjs";
import { A as AlertPanel } from "./AlertPanel-CuaW-KBp.mjs";
import { B as BellRing } from "../_libs/lucide-react.mjs";
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
function AlertsPage() {
  const [readings, setReadings] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setReadings(data);
      } catch {
      }
    };
    load();
    const id = setInterval(load, 2e4);
    return () => {
      controller.abort();
      clearInterval(id);
    };
  }, []);
  const latest = readings.length > 0 ? readings[readings.length - 1] : null;
  const alerts = readings.filter((r) => r.status !== "HEALTHY").reverse();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { title: "Alerts", description: "Maintenance recommendations and recent abnormal events.", icon: BellRing, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertPanel, { status: latest?.status ?? "WARNING" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: [
        "Recent Non-Healthy Events (",
        alerts.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "No abnormal events in the last 20 readings." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: alerts.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between py-2.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: new Date(r.timestamp).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-semibold ${r.status === "CRITICAL" ? "text-red-500" : "text-yellow-500"}`, children: [
          r.status,
          " · ",
          r.healthIndex.toFixed(0),
          "% health"
        ] })
      ] }, i)) }) })
    ] })
  ] });
}
export {
  AlertsPage as component
};
