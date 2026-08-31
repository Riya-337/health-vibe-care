import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, C as Card, b as CardHeader, d as CardTitle, a as CardContent, f as fetchMotorReadings } from "./router-BSLZVQA-.mjs";
import { A as Activity } from "../_libs/lucide-react.mjs";
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
function LiveDataPage() {
  const [readings, setReadings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setReadings(data);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { title: "Live Data", description: "Raw telemetry stream from the ESP32 sensor module.", icon: Activity, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: [
      "Recent Feeds (",
      readings.length,
      ")"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      loading && readings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "Loading…" }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "py-3 text-sm text-yellow-500", children: [
        "Connection issue: ",
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left font-medium", children: "Timestamp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Vibration (g)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Noise (dB)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Health (%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [...readings].reverse().map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-foreground", children: new Date(r.timestamp).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums", children: r.vibration.toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums", children: r.noise.toFixed(0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums", children: r.healthIndex.toFixed(0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right font-semibold", children: r.status })
        ] }, i)) })
      ] }) })
    ] })
  ] }) });
}
export {
  LiveDataPage as component
};
