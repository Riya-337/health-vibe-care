import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, d as Line } from "../_libs/recharts.mjs";
function TrendChart({ data, dataKey, color, yLabel, domain }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data, margin: { top: 10, right: 16, left: 0, bottom: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "time",
        tick: { fontSize: 11, fill: "var(--color-muted-foreground)" },
        stroke: "var(--color-border)",
        minTickGap: 24
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YAxis,
      {
        tick: { fontSize: 11, fill: "var(--color-muted-foreground)" },
        stroke: "var(--color-border)",
        domain: domain ?? ["auto", "auto"],
        label: {
          value: yLabel,
          angle: -90,
          position: "insideLeft",
          offset: 12,
          style: { fontSize: 11, fill: "var(--color-muted-foreground)" }
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          background: "var(--color-popover)",
          border: "1px solid var(--color-border)",
          borderRadius: 8,
          fontSize: 12
        },
        labelStyle: { color: "var(--color-muted-foreground)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Line,
      {
        type: "monotone",
        dataKey,
        stroke: color,
        strokeWidth: 2.5,
        dot: { r: 2, fill: color },
        activeDot: { r: 5 },
        isAnimationActive: true
      }
    )
  ] }) }) });
}
export {
  TrendChart as T
};
