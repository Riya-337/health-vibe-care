import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-BSLZVQA-.mjs";
import { i as ShieldAlert, d as TriangleAlert, j as CircleCheck } from "../_libs/lucide-react.mjs";
const MAP = {
  HEALTHY: {
    title: "All systems normal",
    message: "Motor operating normally. No action required.",
    icon: CircleCheck,
    classes: "border-healthy/30 bg-healthy/10 text-healthy"
  },
  WARNING: {
    title: "Maintenance recommended",
    message: "Schedule maintenance soon. Vibration or noise outside optimal range.",
    icon: TriangleAlert,
    classes: "border-warning/30 bg-warning/10 text-warning"
  },
  CRITICAL: {
    title: "Critical condition detected",
    message: "Immediate inspection required. Stop the motor and dispatch maintenance team.",
    icon: ShieldAlert,
    classes: "border-critical/30 bg-critical/10 text-critical"
  }
};
function AlertPanel({ status }) {
  const cfg = MAP[status];
  const Icon = cfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-start gap-4 rounded-xl border p-5", cfg.classes), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-background/60 p-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider", children: status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-current opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-80", children: "Recommendation" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-base font-semibold text-foreground", children: cfg.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: cfg.message })
    ] })
  ] });
}
export {
  AlertPanel as A
};
