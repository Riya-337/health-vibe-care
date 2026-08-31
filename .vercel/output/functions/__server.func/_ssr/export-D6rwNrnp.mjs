import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, C as Card, b as CardHeader, d as CardTitle, a as CardContent, B as Button, f as fetchMotorReadings } from "./router-BSLZVQA-.mjs";
import { D as Download } from "../_libs/lucide-react.mjs";
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
function ExportPage() {
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
  const downloadCsv = () => {
    const header = "timestamp,vibration_g,noise_db,health_index,status\n";
    const rows = readings.map((r) => `${r.timestamp},${r.vibration},${r.noise},${r.healthIndex},${r.status}`).join("\n");
    const blob = new Blob([header + rows], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `motor-readings-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { title: "Data Export", description: "Download the most recent telemetry as CSV for offline analysis.", icon: Download, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Export CSV" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        readings.length,
        " readings ready to export."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: downloadCsv, disabled: readings.length === 0, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
        "Download CSV"
      ] })
    ] })
  ] }) });
}
export {
  ExportPage as component
};
