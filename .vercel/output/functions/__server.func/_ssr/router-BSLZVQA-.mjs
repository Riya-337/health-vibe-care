import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { X, M as Menu, C as Cpu, L as LayoutDashboard, A as Activity, a as ChartLine, B as BellRing, F as FileText, b as BrainCircuit, W as Waves, c as FileDown, D as Download, S as Settings, I as Info, P as Printer, T as TrendingDown, d as TriangleAlert, e as Database, Z as Zap } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as ReferenceLine, b as Bar, c as Cell, L as LineChart, d as Line, e as ComposedChart, f as Legend } from "../_libs/recharts.mjs";
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
import "../_libs/radix-ui__react-compose-refs.mjs";
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
const appCss = "/assets/styles-BtcOCeYN.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/live-data", label: "Live Data", icon: Activity },
  { to: "/charts", label: "Charts", icon: ChartLine },
  { to: "/alerts", label: "Alerts", icon: BellRing },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/ml", label: "ML Prognostics", icon: BrainCircuit },
  { to: "/spectrum", label: "Freq. Spectrum", icon: Waves },
  { to: "/pdf-report", label: "PDF Report", icon: FileDown },
  { to: "/export", label: "Data Export", icon: Download },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/about", label: "About", icon: Info }
];
function AppSidebar({ open, collapsed, onToggleCollapsed, onClose }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isMobile, setIsMobile] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const width = collapsed && !isMobile ? "w-16" : "w-64";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isMobile && open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm md:hidden",
        onClick: onClose,
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          width,
          isMobile ? open ? "translate-x-0 shadow-2xl" : "-translate-x-full" : "translate-x-0"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between border-b border-sidebar-border px-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: isMobile ? onClose : onToggleCollapsed,
                className: "inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-sidebar-accent",
                "aria-label": "Toggle sidebar",
                children: isMobile ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
              }
            ),
            (!collapsed || isMobile) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pr-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold tracking-tight", children: "MOTOR HEALTH" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.to,
                onClick: () => isMobile && onClose(),
                className: cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-primary text-primary-foreground shadow-sm" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                ),
                title: collapsed && !isMobile ? item.label : void 0,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 shrink-0" }),
                  (!collapsed || isMobile) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
                ]
              }
            ) }, item.to);
          }) }) }),
          (!collapsed || isMobile) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-sidebar-border p-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sidebar-foreground", children: "RVCE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Predictive Maintenance Lab" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 opacity-70", children: "v1.0.0" })
          ] })
        ]
      }
    )
  ] });
}
function SidebarOpenButton({ onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick,
      className: "md:hidden",
      "aria-label": "Open menu",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
    }
  );
}
const rvLogo = "/rv-logo-new.png";
function AppHeader({ online, onOpenSidebar }) {
  const [now, setNow] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(id);
  }, []);
  const dateStr = now.toLocaleDateString(void 0, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-20 items-center justify-between gap-4 px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarOpenButton, { onClick: onOpenSidebar }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: rvLogo,
          alt: "RV Institutions — Rashtreeya Sikshana Samithi Trust",
          className: "h-12 w-12 shrink-0 rounded-full object-contain ring-1 ring-border",
          width: 48,
          height: 48
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-base font-bold tracking-tight text-foreground sm:text-lg", children: "MOTOR HEALTH MONITOR" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground sm:text-sm", children: "IoT Enabled Predictive Maintenance System" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden text-right md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: timeStr }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: dateStr }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] font-medium text-primary", children: "RV College of Engineering, Bengaluru" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${online ? "border-healthy/30 bg-healthy/10 text-healthy" : "border-critical/30 bg-critical/10 text-critical"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
              online && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-healthy opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `relative inline-flex h-2.5 w-2.5 rounded-full ${online ? "bg-healthy" : "bg-critical"}`
                }
              )
            ] }),
            online ? "ONLINE" : "OFFLINE"
          ]
        }
      )
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go to dashboard"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. You can try refreshing or head back to the dashboard." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Dashboard"
        }
      )
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Motor Health Monitor — RVCE" },
      {
        name: "description",
        content: "IoT enabled predictive maintenance dashboard for rotating machinery — RV College of Engineering, Bengaluru."
      },
      { property: "og:title", content: "Motor Health Monitor — RVCE" },
      {
        property: "og:description",
        content: "Real-time vibration, noise and health-index monitoring for industrial motors."
      },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  const [collapsed, setCollapsed] = reactExports.useState(false);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppSidebar,
      {
        open: mobileOpen,
        collapsed,
        onToggleCollapsed: () => setCollapsed((c) => !c),
        onClose: () => setMobileOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex min-h-screen flex-col transition-[margin] duration-300 ${collapsed ? "md:ml-16" : "md:ml-64"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { online: true, onOpenSidebar: () => setMobileOpen(true) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
        ]
      }
    )
  ] }) });
}
const $$splitComponentImporter$7 = () => import("./index-DUp-p_RV.mjs");
const Route$a = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Dashboard | Motor Health Monitor"
    }, {
      name: "description",
      content: "Live vibration, noise, and health-index telemetry from the ESP32 motor sensor — Motor Health Monitor."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./about-CrQQq9V-.mjs");
const Route$9 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "About | Motor Health Monitor"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./alerts-Bn4waajR.mjs");
const Route$8 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Alerts | Motor Health Monitor"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./charts-EHKjJ-ZO.mjs");
const Route$7 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Charts | Motor Health Monitor"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./export-D6rwNrnp.mjs");
const Route$6 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Data Export | Motor Health Monitor"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./live-data-BqsUYX9t.mjs");
const Route$5 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Live Data | Motor Health Monitor"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
function PageShell({ title, description, icon: Icon, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1600px] flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-primary/10 p-3 ring-4 ring-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
      ] })
    ] }),
    children ?? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Coming soon" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-sm text-muted-foreground", children: "This module is part of the Motor Health Monitor roadmap and will be available in an upcoming release. The live dashboard already streams data from the ThingSpeak channel every 20 seconds." })
    ] })
  ] });
}
const STORAGE_KEY = "mhm_session_log";
const SESSION_CAP = 500;
function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function logReadings(incoming) {
  try {
    const existing = loadSession();
    const existingTs = new Set(existing.map((r) => r.timestamp));
    const newEntries = incoming.filter((r) => !existingTs.has(r.timestamp)).map((r) => ({ ...r, loggedAt: (/* @__PURE__ */ new Date()).toISOString() }));
    if (newEntries.length === 0) return;
    const merged = [...existing, ...newEntries];
    const trimmed = merged.length > SESSION_CAP ? merged.slice(merged.length - SESSION_CAP) : merged;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
  }
}
function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}
function sessionStats() {
  const data = loadSession();
  if (data.length === 0) {
    return { count: 0, earliest: null, latest: null, sizeKB: 0 };
  }
  const raw = localStorage.getItem(STORAGE_KEY) ?? "";
  return {
    count: data.length,
    earliest: data[0].timestamp,
    latest: data[data.length - 1].timestamp,
    sizeKB: Math.round(raw.length * 2 / 1024)
    // UTF-16 estimate
  };
}
const CHANNEL_ID = "3399470";
const READ_API_KEY = "VQL5EX22KNVGXLA4";
const DIRECT = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=50`;
const PROXIES = [
  // Direct (works in deployed/SSR context)
  { url: DIRECT, unwrap: (d) => d },
  // corsproxy.io
  { url: `https://corsproxy.io/?${encodeURIComponent(DIRECT)}`, unwrap: (d) => d },
  // allorigins
  {
    url: `https://api.allorigins.win/get?url=${encodeURIComponent(DIRECT)}`,
    unwrap: (d) => typeof d.contents === "string" ? JSON.parse(d.contents) : d
  },
  // thingproxy
  { url: `https://thingproxy.freeboard.io/fetch/${DIRECT}`, unwrap: (d) => d }
];
function parseStatus(raw, healthIndex) {
  if (raw) {
    const v = raw.trim().toUpperCase();
    if (v === "HEALTHY" || v === "WARNING" || v === "CRITICAL") return v;
    if (v === "0") return "HEALTHY";
    if (v === "1") return "WARNING";
    if (v === "2") return "CRITICAL";
  }
  if (healthIndex >= 70) return "HEALTHY";
  if (healthIndex >= 40) return "WARNING";
  return "CRITICAL";
}
function safeNumber(v, fallback = 0) {
  if (v === null || v === void 0 || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch {
    return "--:--:--";
  }
}
function mapFeeds(feeds) {
  return feeds.map((f) => {
    const vibration = safeNumber(f.field1);
    const noise = safeNumber(f.field2);
    const healthIndex = safeNumber(f.field3);
    const status = parseStatus(f.field4, healthIndex);
    return {
      timestamp: f.created_at,
      time: formatTime(f.created_at),
      vibration,
      noise,
      healthIndex,
      status
    };
  });
}
async function fetchMotorReadings(signal) {
  for (const proxy of PROXIES) {
    try {
      const res = await fetch(proxy.url, { signal, cache: "no-store" });
      if (!res.ok) continue;
      const raw = await res.json();
      const data = proxy.unwrap(raw);
      if (!data?.feeds || !Array.isArray(data.feeds) || data.feeds.length === 0) continue;
      const readings = mapFeeds(data.feeds);
      logReadings(readings);
      return readings;
    } catch {
      continue;
    }
  }
  throw new Error("All proxies failed — check network connection");
}
const CWRU_PROFILES = [
  {
    label: "NORMAL",
    displayName: "Normal",
    description: "No fault detected. Vibration is consistent with healthy bearing operation.",
    mechanismNote: "Healthy bearings produce broadband low-amplitude noise. No characteristic impact frequencies present.",
    crestFactor: { min: 2.5, max: 4.2, mean: 3.2 },
    cv: { min: 0.08, max: 0.28, mean: 0.16 },
    peakRatio: { min: 0.4, max: 1.6, mean: 0.85 }
  },
  {
    label: "INNER_RACE",
    displayName: "Inner Race Fault",
    description: "Inner race defect detected. Characteristic impacts occur at the Ball Pass Frequency Inner (BPFI = n/2 · (1 + d/D · cosα) · RPM/60).",
    mechanismNote: "Inner race faults produce amplitude-modulated impacts at BPFI, sidebanded by shaft speed. High crest factor is the primary indicator.",
    crestFactor: { min: 4.2, max: 9.5, mean: 6.1 },
    cv: { min: 0.3, max: 0.68, mean: 0.47 },
    peakRatio: { min: 1.5, max: 4.5, mean: 2.6 }
  },
  {
    label: "OUTER_RACE",
    displayName: "Outer Race Fault",
    description: "Outer race defect detected. Periodic impacts at Ball Pass Frequency Outer (BPFO = n/2 · (1 − d/D · cosα) · RPM/60).",
    mechanismNote: "Outer race faults produce stationary (non-modulated) periodic impacts at BPFO. Moderately elevated crest factor.",
    crestFactor: { min: 3.6, max: 7.8, mean: 5.3 },
    cv: { min: 0.22, max: 0.56, mean: 0.37 },
    peakRatio: { min: 1.1, max: 3.8, mean: 2.1 }
  },
  {
    label: "BALL_FAULT",
    displayName: "Ball (Rolling Element) Fault",
    description: "Rolling element defect detected. Impacts at Ball Spin Frequency (BSF = D/(2d) · (1 − (d/D · cosα)²) · RPM/60), amplitude-modulated at cage frequency.",
    mechanismNote: "Ball faults produce modulated impacts. Lower crest factor than race faults because impacts alternate between inner and outer race contact.",
    crestFactor: { min: 3, max: 6.2, mean: 4.4 },
    cv: { min: 0.18, max: 0.46, mean: 0.3 },
    peakRatio: { min: 0.9, max: 3, mean: 1.75 }
  }
];
function classifyFault(features) {
  const { crestFactor, stdDev: stdDev2, mean: mean2, peakToPeak } = features;
  const UNKNOWN_RESULT = {
    faultType: "UNKNOWN",
    displayName: "Unknown",
    description: "Insufficient data for fault classification.",
    mechanismNote: "Accumulate more readings for meaningful classification.",
    confidence: 0,
    distances: [],
    liveFeatures: { crestFactor: 0, cv: 0, peakRatio: 0 },
    citation: "CWRU Bearing Data Center — Loparo, K.A. (2012). Case Western Reserve University.",
    limitationNote: "Classification is based on scale-invariant statistical features. It provides a qualitative indication, not a definitive diagnosis."
  };
  if (!mean2 || Math.abs(mean2) < 1e-6) return UNKNOWN_RESULT;
  const cv = stdDev2 / Math.abs(mean2);
  const peakRatio = peakToPeak / Math.abs(mean2);
  const W_CF = 0.5;
  const W_CV = 0.3;
  const W_PR = 0.2;
  const rawDistances = CWRU_PROFILES.map((p) => {
    const rangeCF = p.crestFactor.max - p.crestFactor.min || 1;
    const rangeCV = p.cv.max - p.cv.min || 1;
    const rangePR = p.peakRatio.max - p.peakRatio.min || 1;
    const dCF = (crestFactor - p.crestFactor.mean) / rangeCF;
    const dCV = (cv - p.cv.mean) / rangeCV;
    const dPR = (peakRatio - p.peakRatio.mean) / rangePR;
    const dist = Math.sqrt(W_CF * dCF ** 2 + W_CV * dCV ** 2 + W_PR * dPR ** 2);
    return { label: p.label, displayName: p.displayName, distance: dist };
  });
  rawDistances.sort((a, b) => a.distance - b.distance);
  const maxDist = Math.max(...rawDistances.map((d) => d.distance), 1e-9);
  const normDistances = rawDistances.map((d) => ({
    ...d,
    normalised: Math.max(0, 1 - d.distance / maxDist) * 100
  }));
  const best = rawDistances[0];
  const second = rawDistances[1];
  const margin = second.distance - best.distance;
  const confidence = Math.min(
    95,
    Math.max(5, margin / (best.distance + 1e-9) * 80)
  );
  const bestProfile = CWRU_PROFILES.find((p) => p.label === best.label);
  return {
    faultType: best.label,
    displayName: bestProfile.displayName,
    description: bestProfile.description,
    mechanismNote: bestProfile.mechanismNote,
    confidence,
    distances: normDistances,
    liveFeatures: { crestFactor, cv, peakRatio },
    citation: "CWRU Bearing Data Center — Loparo, K.A. (2012). Case Western Reserve University. https://engineering.case.edu/bearingdatacenter",
    limitationNote: "At 15 s IoT poll rate, only slow envelope trends are captured — not impact frequencies. Classification is a qualitative indication using scale-invariant features (crest factor, CV, peak ratio) matched against CWRU statistical profiles. For conclusive diagnosis, on-device kHz-rate FFT is required."
  };
}
function mean(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function stdDev(arr, mu) {
  if (arr.length < 2) return 0;
  const m = mu ?? mean(arr);
  const variance = arr.reduce((s, v) => s + (v - m) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}
function rms(arr) {
  if (arr.length === 0) return 0;
  return Math.sqrt(arr.reduce((s, v) => s + v * v, 0) / arr.length);
}
function linearRegression(y) {
  const n = y.length;
  if (n < 2) return { slope: 0, intercept: y[0] ?? 0, rSquared: 0 };
  const x = Array.from({ length: n }, (_, i) => i);
  const mx = mean(x);
  const my = mean(y);
  let ssXX = 0, ssXY = 0, ssYY = 0;
  for (let i = 0; i < n; i++) {
    ssXX += (x[i] - mx) ** 2;
    ssXY += (x[i] - mx) * (y[i] - my);
    ssYY += (y[i] - my) ** 2;
  }
  if (ssXX === 0) return { slope: 0, intercept: my, rSquared: 0 };
  const slope = ssXY / ssXX;
  const intercept = my - slope * mx;
  const rSquared = ssYY === 0 ? 1 : ssXY * ssXY / (ssXX * ssYY);
  return { slope, intercept, rSquared: Math.min(1, Math.max(0, rSquared)) };
}
function extractFeatures(readings) {
  if (readings.length === 0) {
    return { mean: 0, stdDev: 0, peakToPeak: 0, crestFactor: 0, rmsNoise: 0, trendSlope: 0 };
  }
  const vibs = readings.map((r) => r.vibration);
  const noises = readings.map((r) => r.noise);
  const healths = readings.map((r) => r.healthIndex);
  const mu = mean(vibs);
  const sigma = stdDev(vibs, mu);
  const peak = Math.max(...vibs);
  const minV = Math.min(...vibs);
  const crest = sigma > 0 ? peak / (rms(vibs) || 1) : 0;
  const reg = linearRegression(healths);
  return {
    mean: mu,
    stdDev: sigma,
    peakToPeak: peak - minV,
    crestFactor: crest,
    rmsNoise: rms(noises),
    trendSlope: reg.slope
  };
}
const ANOMALY_THRESHOLD = 2;
function detectAnomalies(readings) {
  if (readings.length < 3) {
    return readings.map((r) => ({
      ...r,
      anomalyScore: 0,
      isAnomaly: false
    }));
  }
  const vibs = readings.map((r) => r.vibration);
  const noises = readings.map((r) => r.noise);
  const vibMu = mean(vibs);
  const vibSigma = stdDev(vibs, vibMu) || 1;
  const noiseMu = mean(noises);
  const noiseSigma = stdDev(noises, noiseMu) || 1;
  return readings.map((r) => {
    const zVib = Math.abs((r.vibration - vibMu) / vibSigma);
    const zNoise = Math.abs((r.noise - noiseMu) / noiseSigma);
    const zFused = 0.6 * zVib + 0.4 * zNoise;
    const anomalyScore = Math.min(100, zFused / 4 * 100);
    return {
      time: r.time,
      timestamp: r.timestamp,
      vibration: r.vibration,
      noise: r.noise,
      healthIndex: r.healthIndex,
      anomalyScore,
      isAnomaly: zFused >= ANOMALY_THRESHOLD
    };
  });
}
const FAILURE_THRESHOLD = 0;
const POLL_INTERVAL_SEC = 15;
function estimateRUL(readings) {
  if (readings.length < 4) return null;
  const healths = readings.map((r) => r.healthIndex);
  const { slope, intercept, rSquared } = linearRegression(healths);
  const currentIdx = healths.length - 1;
  let rulReadings;
  if (slope >= 0) {
    rulReadings = 9999;
  } else {
    const failureIdx = (FAILURE_THRESHOLD - intercept) / slope;
    rulReadings = Math.max(0, Math.round(failureIdx - currentIdx));
  }
  const rulSeconds = rulReadings * POLL_INTERVAL_SEC;
  const rulMinutes = rulSeconds / 60;
  const rulHours = rulMinutes / 60;
  const confidence = rSquared > 0.8 ? "HIGH" : rSquared > 0.5 ? "MEDIUM" : "LOW";
  const forecastPoints = Array.from({ length: 10 }, (_, i) => {
    const idx = currentIdx + i + 1;
    return {
      reading: i + 1,
      predicted: Math.max(0, Math.min(100, slope * idx + intercept))
    };
  });
  return {
    rulReadings: Math.min(rulReadings, 9999),
    rulMinutes,
    rulHours,
    confidence,
    rSquared,
    trendSlope: slope,
    forecastPoints
  };
}
function classifyDegradation(health, anomalyRate, slope) {
  const healthScore = (1 - health / 100) * 60;
  const anomalyScore = Math.min(anomalyRate, 100) * 0.25;
  const trendScore = Math.min(Math.abs(Math.min(slope, 0)) * 500, 15);
  const score = Math.min(100, healthScore + anomalyScore + trendScore);
  let stage;
  if (score < 20) stage = "NORMAL";
  else if (score < 45) stage = "EARLY_WEAR";
  else if (score < 70) stage = "MODERATE";
  else stage = "SEVERE";
  return { stage, score };
}
function getMaintenanceUrgency(stage, rulHours) {
  if (stage === "NORMAL") {
    return {
      urgency: "NONE",
      recommendation: "Motor is operating within normal parameters. Continue scheduled inspection cycle. No immediate action required."
    };
  }
  if (stage === "EARLY_WEAR") {
    return {
      urgency: "SCHEDULE",
      recommendation: "Early-stage wear signatures detected. Schedule a lubrication check and bearing inspection during the next planned maintenance window."
    };
  }
  if (stage === "MODERATE") {
    return {
      urgency: "SOON",
      recommendation: "Moderate degradation detected. Inspect bearing races, check alignment, and verify coupling integrity within the next 24-48 hours."
    };
  }
  return {
    urgency: "IMMEDIATE",
    recommendation: "Severe degradation — risk of imminent failure. Stop motor if operationally feasible, perform full inspection of bearings, stator windings, and mechanical couplings immediately."
  };
}
function runPrognostics(readings) {
  if (readings.length === 0) {
    return {
      features: extractFeatures([]),
      anomalyPoints: [],
      anomalyRate: 0,
      rulResult: null,
      degradationStage: "NORMAL",
      degradationScore: 0,
      maintenanceUrgency: "NONE",
      recommendation: "No data available. Connect to ThingSpeak to begin analysis.",
      faultClassification: classifyFault({ crestFactor: 0, stdDev: 0, mean: 0, peakToPeak: 0 })
    };
  }
  const features = extractFeatures(readings);
  const anomalyPoints = detectAnomalies(readings);
  const anomalyCount = anomalyPoints.filter((p) => p.isAnomaly).length;
  const anomalyRate = anomalyCount / readings.length * 100;
  const rulResult = estimateRUL(readings);
  const latestHealth = readings[readings.length - 1].healthIndex;
  const { stage, score } = classifyDegradation(
    latestHealth,
    anomalyRate,
    features.trendSlope
  );
  const { urgency, recommendation } = getMaintenanceUrgency(
    stage,
    rulResult?.rulHours ?? 9999
  );
  const faultClassification = classifyFault({
    crestFactor: features.crestFactor,
    stdDev: features.stdDev,
    mean: features.mean,
    peakToPeak: features.peakToPeak
  });
  return {
    features,
    anomalyPoints,
    anomalyRate,
    rulResult,
    degradationStage: stage,
    degradationScore: score,
    maintenanceUrgency: urgency,
    recommendation,
    faultClassification
  };
}
function formatRUL(hours) {
  if (hours >= 9999) return { value: "Stable", unit: "no degradation trend" };
  if (hours >= 48) return { value: (hours / 24).toFixed(1), unit: "days" };
  if (hours >= 1) return { value: hours.toFixed(1), unit: "hours" };
  const mins = hours * 60;
  return { value: mins.toFixed(0), unit: "minutes" };
}
function describeArc(cx, cy, r, startDeg, endDeg) {
  const toRad = (deg) => (deg - 90) * Math.PI / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}
function RulGauge({ rulResult, currentHealth }) {
  const cx = 100;
  const cy = 90;
  const r = 72;
  const fraction = Math.max(0, Math.min(1, currentHealth / 100));
  const startAngle = -180;
  const totalSweep = 180;
  const sweepAngle = startAngle + totalSweep * fraction;
  const colour = fraction > 0.6 ? "var(--color-healthy)" : fraction > 0.3 ? "var(--color-warning)" : "var(--color-critical)";
  const bgPath = describeArc(cx, cy, r, -180, 0);
  const fillPath = describeArc(cx, cy, r, -180, sweepAngle);
  const rul = rulResult ? formatRUL(rulResult.rulHours) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 200 110",
        className: "w-full max-w-[240px]",
        "aria-label": "RUL gauge",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: bgPath,
              fill: "none",
              stroke: "var(--color-border)",
              strokeWidth: 14,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: fillPath,
              fill: "none",
              stroke: colour,
              strokeWidth: 14,
              strokeLinecap: "round",
              style: { filter: `drop-shadow(0 0 4px ${colour}55)` }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: cx,
              y: cy - 10,
              textAnchor: "middle",
              fontSize: "26",
              fontWeight: "700",
              fill: "currentColor",
              className: "fill-foreground",
              children: rul ? rul.value : "—"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: cx,
              y: cy + 12,
              textAnchor: "middle",
              fontSize: "11",
              fill: "currentColor",
              className: "fill-muted-foreground",
              children: rul ? rul.unit : "insufficient data"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 16, y: cy + 22, fontSize: "9", className: "fill-muted-foreground", children: "0%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 174, y: cy + 22, fontSize: "9", className: "fill-muted-foreground", children: "100%" })
        ]
      }
    ),
    rulResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "R² =",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums text-foreground", children: rulResult.rSquared.toFixed(2) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Confidence:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-semibold ${rulResult.confidence === "HIGH" ? "text-green-500" : rulResult.confidence === "MEDIUM" ? "text-yellow-500" : "text-red-500"}`,
            children: rulResult.confidence
          }
        )
      ] })
    ] })
  ] });
}
function AnomalyDot(props) {
  const { cx, cy, payload } = props;
  if (!payload?.isAnomaly) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "circle",
    {
      cx,
      cy,
      r: 6,
      fill: "var(--color-critical)",
      stroke: "white",
      strokeWidth: 1.5,
      opacity: 0.9
    }
  );
}
function AnomalyChart({ data }) {
  if (data.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-12 text-center text-sm text-muted-foreground", children: "No data available for anomaly analysis." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ComposedChart, { data, margin: { top: 10, right: 20, left: 0, bottom: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "time",
        tick: { fontSize: 10, fill: "var(--color-muted-foreground)" },
        stroke: "var(--color-border)",
        minTickGap: 24
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YAxis,
      {
        yAxisId: "vib",
        orientation: "left",
        domain: [0, 2],
        tick: { fontSize: 10, fill: "var(--color-muted-foreground)" },
        stroke: "var(--color-border)",
        label: {
          value: "Vibration (g)",
          angle: -90,
          position: "insideLeft",
          offset: 12,
          style: { fontSize: 10, fill: "var(--color-muted-foreground)" }
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YAxis,
      {
        yAxisId: "score",
        orientation: "right",
        domain: [0, 100],
        tick: { fontSize: 10, fill: "var(--color-muted-foreground)" },
        stroke: "var(--color-border)",
        label: {
          value: "Anomaly %",
          angle: 90,
          position: "insideRight",
          offset: 12,
          style: { fontSize: 10, fill: "var(--color-muted-foreground)" }
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
        formatter: (value, name) => [
          name === "anomalyScore" ? `${value.toFixed(1)}%` : `${value.toFixed(3)} g`,
          name === "anomalyScore" ? "Anomaly Score" : "Vibration"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Legend,
      {
        formatter: (value) => value === "anomalyScore" ? "Anomaly Score" : "Vibration (g)",
        wrapperStyle: { fontSize: 11 }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Bar,
      {
        yAxisId: "score",
        dataKey: "anomalyScore",
        fill: "var(--color-critical)",
        opacity: 0.25,
        radius: [2, 2, 0, 0],
        name: "anomalyScore"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Line,
      {
        yAxisId: "vib",
        type: "monotone",
        dataKey: "vibration",
        stroke: "var(--color-healthy)",
        strokeWidth: 2,
        dot: /* @__PURE__ */ jsxRuntimeExports.jsx(AnomalyDot, {}),
        activeDot: { r: 5 },
        name: "vibration"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReferenceLine,
      {
        yAxisId: "score",
        y: 50,
        stroke: "var(--color-warning)",
        strokeDasharray: "4 3",
        label: {
          value: "Alert",
          position: "right",
          fontSize: 10,
          fill: "var(--color-warning)"
        }
      }
    )
  ] }) }) });
}
const Route$4 = createFileRoute()({
  head: () => ({
    meta: [
      { title: "ML Prognostics | Motor Health Monitor" },
      {
        name: "description",
        content: "Machine-learning prognostics: RUL estimation, anomaly detection, and degradation staging for rotating machinery."
      }
    ]
  }),
  component: MLPrognosticsPage
});
const URGENCY_STYLE = {
  NONE: "border-green-500/30 bg-green-500/10 text-green-500",
  SCHEDULE: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  SOON: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  IMMEDIATE: "border-red-500/30 bg-red-500/10 text-red-500"
};
const STAGE_STYLE = {
  NORMAL: "text-green-500",
  EARLY_WEAR: "text-blue-400",
  MODERATE: "text-yellow-500",
  SEVERE: "text-red-500"
};
const STAGE_LABEL = {
  NORMAL: "Normal",
  EARLY_WEAR: "Early Wear",
  MODERATE: "Moderate",
  SEVERE: "Severe"
};
function MLPrognosticsPage() {
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
  const result = reactExports.useMemo(() => runPrognostics(readings), [readings]);
  const current = readings.length > 0 ? readings[readings.length - 1] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    PageShell,
    {
      title: "ML Prognostics",
      description: "Remaining Useful Life estimation, anomaly detection, and degradation staging — computed from live ThingSpeak data.",
      icon: BrainCircuit,
      children: [
        loading && readings.length === 0 && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary", children: "Connecting to ThingSpeak — fetching data for ML analysis…" }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning", children: [
          "⚠ Couldn't reach ThingSpeak (",
          error,
          "). Analysis based on last known data."
        ] }),
        readings.length > 0 && readings.length < 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-info/20 bg-info/5 px-4 py-3 text-sm text-info", children: [
          "ℹ Only ",
          readings.length,
          " reading",
          readings.length > 1 ? "s" : "",
          " received. RUL estimation requires at least 4 — accumulating data…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Degradation Stage" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${STAGE_STYLE[result.degradationStage]}`, children: STAGE_LABEL[result.degradationStage] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                "Score ",
                result.degradationScore.toFixed(0),
                " / 100"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Anomaly Rate" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-2xl font-bold ${result.anomalyRate > 25 ? "text-red-500" : result.anomalyRate > 10 ? "text-yellow-500" : "text-green-500"}`, children: [
                result.anomalyRate.toFixed(1),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                result.anomalyPoints.filter((p) => p.isAnomaly).length,
                " / ",
                readings.length,
                " flagged"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Health Trend" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-2xl font-bold ${result.features.trendSlope < -0.5 ? "text-red-500" : result.features.trendSlope < 0 ? "text-yellow-500" : "text-green-500"}`, children: [
                result.features.trendSlope >= 0 ? "+" : "",
                result.features.trendSlope.toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "% / reading (slope)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Maintenance" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-block rounded-full border px-3 py-1 text-sm font-semibold ${URGENCY_STYLE[result.maintenanceUrgency]}`,
                children: result.maintenanceUrgency
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4" }),
              "Remaining Useful Life (RUL)"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RulGauge,
                {
                  rulResult: result.rulResult,
                  currentHealth: current?.healthIndex ?? 0
                }
              ),
              result.rulResult && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Readings Left" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold tabular-nums", children: result.rulResult.rulReadings >= 9999 ? "∞" : result.rulResult.rulReadings })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Est. Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold tabular-nums", children: result.rulResult.rulHours >= 9999 ? "∞" : result.rulResult.rulHours >= 48 ? `${(result.rulResult.rulHours / 24).toFixed(1)} d` : `${result.rulResult.rulHours.toFixed(1)} h` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "R²" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold tabular-nums", children: result.rulResult.rSquared.toFixed(3) })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "w-full text-xs text-muted-foreground leading-relaxed border border-border/50 rounded-lg px-3 py-2 bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Note: " }),
                "RUL is estimated from linear regression on the recent health-index trend. A temporary disturbance (e.g. fan test) causes a transient drop — RUL recovers automatically once readings stabilise. Slope and R² reflect the current window only."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
              "Maintenance Recommendation"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg border p-3 ${URGENCY_STYLE[result.maintenanceUrgency]}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider opacity-80 mb-1", children: result.maintenanceUrgency === "NONE" ? "No Action Required" : result.maintenanceUrgency === "SCHEDULE" ? "Schedule Inspection" : result.maintenanceUrgency === "SOON" ? "Inspect Soon" : "⚠ Immediate Action Required" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: result.recommendation })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
                ["Mean Vibration", `${result.features.mean.toFixed(3)} g`],
                ["Std Dev Vibration", `${result.features.stdDev.toFixed(3)} g`],
                ["Peak-to-Peak", `${result.features.peakToPeak.toFixed(3)} g`],
                ["Crest Factor", result.features.crestFactor.toFixed(2)],
                ["RMS Noise", `${result.features.rmsNoise.toFixed(1)} dB`],
                ["Readings analysed", readings.length]
              ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rounded border border-border/60 px-2 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tabular-nums", children: value })
              ] }, String(label))) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4" }),
              "CWRU Bearing Dataset Fault Classification"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Real-time classification against reference centroids from the Case Western Reserve University (CWRU) Bearing Data Center using a scale-invariant nearest-neighbor classifier." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/80 bg-card p-5 relative overflow-hidden shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1", children: "Matched Signature" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `text-xl font-bold ${result.faultClassification.faultType === "NORMAL" ? "text-green-500" : result.faultClassification.faultType === "UNKNOWN" ? "text-muted-foreground" : "text-red-500"}`, children: result.faultClassification.displayName })
                  ] }),
                  result.faultClassification.faultType !== "UNKNOWN" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1", children: "Confidence" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-foreground tabular-nums", children: [
                      result.faultClassification.confidence.toFixed(0),
                      "%"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground mb-4", children: result.faultClassification.description }),
                result.faultClassification.faultType !== "UNKNOWN" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2 mb-4 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-2 rounded-full transition-all duration-500 ${result.faultClassification.faultType === "NORMAL" ? "bg-green-500" : "bg-red-500"}`,
                    style: { width: `${result.faultClassification.confidence}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-border/50 px-3 py-2 text-xs leading-relaxed", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Physical Mechanism: " }),
                  result.faultClassification.mechanismNote
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
                {
                  name: "Crest Factor",
                  val: result.faultClassification.liveFeatures.crestFactor.toFixed(2),
                  desc: "Peak / RMS (impulsivity)"
                },
                {
                  name: "CV (Coeff Var)",
                  val: result.faultClassification.liveFeatures.cv.toFixed(3),
                  desc: "std-dev / |mean| (spread)"
                },
                {
                  name: "Peak Ratio",
                  val: result.faultClassification.liveFeatures.peakRatio.toFixed(2),
                  desc: "peak-to-peak / |mean|"
                }
              ].map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border/60 rounded-lg p-2.5 bg-muted/10 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground block font-medium uppercase tracking-wider mb-1", children: feat.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground tabular-nums block", children: feat.val }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground block mt-0.5 leading-tight", children: feat.desc })
              ] }, feat.name)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 flex flex-col justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border/60 rounded-xl overflow-hidden shadow-sm bg-muted/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Reference Profile Match Matrix" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground border-b border-border/50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left font-semibold", children: "Profile Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-semibold", children: "Match Similarity" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: result.faultClassification.distances.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/30 last:border-b-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 font-medium text-foreground", children: d.displayName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right font-semibold tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        d.normalised.toFixed(0),
                        "%"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 bg-muted rounded-full h-1.5 overflow-hidden hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `h-1.5 rounded-full ${d.label === "NORMAL" ? "bg-green-500" : "bg-red-500"}`,
                          style: { width: `${d.normalised}%` }
                        }
                      ) })
                    ] }) })
                  ] }, d.label)) })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground leading-relaxed flex flex-col gap-2 bg-muted/20 border border-border/50 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Academic Citation: " }),
                  result.faultClassification.citation
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Methodology Note: " }),
                  result.faultClassification.limitationNote
                ] })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
              "Anomaly Detection — Vibration Signal + Fused Anomaly Score"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Red bars indicate high anomaly scores. Highlighted dots mark Z-score anomalies (fused vibration + noise)." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnomalyChart, { data: result.anomalyPoints }) })
        ] }),
        result.rulResult && result.rulResult.forecastPoints.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }),
            "Health Index — Historical + Linear Regression Forecast (next 10 readings)"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: (() => {
            const historical = readings.map((r, i) => ({
              label: r.time,
              actual: r.healthIndex,
              forecast: null
            }));
            readings.length > 0 ? readings[readings.length - 1].time : "—";
            const forecast = result.rulResult.forecastPoints.map((fp, i) => ({
              label: `+${fp.reading}`,
              actual: null,
              forecast: fp.predicted
            }));
            const combined = [...historical, ...forecast];
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: combined, margin: { top: 10, right: 16, left: 0, bottom: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "label",
                  tick: { fontSize: 10, fill: "var(--color-muted-foreground)" },
                  stroke: "var(--color-border)",
                  minTickGap: 20
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  domain: [0, 100],
                  tick: { fontSize: 10, fill: "var(--color-muted-foreground)" },
                  stroke: "var(--color-border)",
                  label: {
                    value: "%",
                    angle: -90,
                    position: "insideLeft",
                    offset: 12,
                    style: { fontSize: 10, fill: "var(--color-muted-foreground)" }
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
                  formatter: (v, name) => [
                    `${v?.toFixed(1)}%`,
                    name === "actual" ? "Health Index" : "Forecast"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ReferenceLine,
                {
                  y: 40,
                  stroke: "var(--color-warning)",
                  strokeDasharray: "4 3",
                  label: { value: "Warning", position: "right", fontSize: 9, fill: "var(--color-warning)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ReferenceLine,
                {
                  y: 0,
                  stroke: "var(--color-critical)",
                  strokeDasharray: "4 3",
                  label: { value: "Failure", position: "right", fontSize: 9, fill: "var(--color-critical)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "actual",
                  stroke: "var(--color-healthy)",
                  strokeWidth: 2.5,
                  dot: { r: 2, fill: "var(--color-healthy)" },
                  activeDot: { r: 5 },
                  connectNulls: false,
                  name: "actual"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "forecast",
                  stroke: "var(--color-warning)",
                  strokeWidth: 2,
                  strokeDasharray: "6 4",
                  dot: { r: 3, fill: "var(--color-warning)" },
                  connectNulls: false,
                  name: "forecast"
                }
              )
            ] }) }) });
          })() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: [
            "Flagged Anomaly Events (",
            result.anomalyPoints.filter((p) => p.isAnomaly).length,
            ")"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: result.anomalyPoints.filter((p) => p.isAnomaly).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "No anomalies detected in the current window. ✓" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto max-h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left font-medium", children: "Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Vibration (g)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Noise (dB)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Health (%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Anomaly Score" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: result.anomalyPoints.filter((p) => p.isAnomaly).reverse().map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-foreground", children: new Date(p.timestamp).toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums text-red-400", children: p.vibration.toFixed(3) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums", children: p.noise.toFixed(0) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1.5 text-right tabular-nums", children: [
                p.healthIndex.toFixed(0),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1.5 text-right tabular-nums font-semibold text-red-500", children: [
                p.anomalyScore.toFixed(1),
                "%"
              ] })
            ] }, i)) })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "ML Algorithm Reference" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3", children: [
            {
              title: "RUL — Linear Regression",
              body: "Ordinary Least Squares is fitted to the health-index time series. The x-intercept of the regression line (where predicted health = 0) gives the Remaining Useful Life in readings, converted to minutes/hours at the 20-second poll rate."
            },
            {
              title: "Anomaly Detection — Z-score Fusion",
              body: "Per-reading Z-scores are computed for vibration and noise independently (μ, σ over the session window). A fused score (0.6 × Z_vib + 0.4 × Z_noise) exceeding 2.0 σ flags the reading as anomalous."
            },
            {
              title: "Degradation Stage Classification",
              body: "A weighted degradation score (health index 60 %, anomaly rate 25 %, trend slope 15 %) maps to four stages: Normal, Early Wear, Moderate, and Severe — driving the maintenance urgency output."
            },
            {
              title: "Feature Extraction",
              body: "Statistical features extracted from the vibration window: mean, standard deviation, peak-to-peak amplitude, crest factor (peak / RMS), and RMS noise. These proxy traditional vibration analysis metrics."
            },
            {
              title: "Health Index Forecast",
              body: "The fitted OLS regression line is extrapolated 10 readings into the future, giving a visual preview of the expected health trajectory and confirming the time-to-failure estimate."
            },
            {
              title: "Confidence Metric (R²)",
              body: "The coefficient of determination (R²) of the OLS fit quantifies how well the linear degradation model explains the variance in the health index. R² > 0.8 → HIGH, > 0.5 → MEDIUM, else LOW."
            }
          ].map(({ title, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 font-semibold text-foreground", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-muted-foreground", children: body })
          ] }, title)) }) })
        ] })
      ]
    }
  );
}
const Route$3 = createFileRoute()({
  head: () => ({
    meta: [
      { title: "PDF Report | Motor Health Monitor" },
      {
        name: "description",
        content: "Print or save a complete Motor Health Monitor prognostics report as PDF."
      }
    ]
  }),
  component: PdfReportPage
});
const avg = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
const maxArr = (arr) => arr.length ? Math.max(...arr) : 0;
const minArr = (arr) => arr.length ? Math.min(...arr) : 0;
function fmt(n, dp = 2) {
  return n.toFixed(dp);
}
const STATUS_COLOR = {
  HEALTHY: "#16a34a",
  WARNING: "#ca8a04",
  CRITICAL: "#dc2626"
};
function PdfReportPage() {
  const [liveReadings, setLiveReadings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [useSession, setUseSession] = reactExports.useState(true);
  const printRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setLiveReadings(data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, []);
  const stats = sessionStats();
  const readings = reactExports.useMemo(() => {
    if (useSession) {
      const s = loadSession();
      return s.length > 0 ? s : liveReadings;
    }
    return liveReadings;
  }, [useSession, liveReadings]);
  const result = reactExports.useMemo(() => runPrognostics(readings), [readings]);
  const vibs = readings.map((r) => r.vibration);
  const noises = readings.map((r) => r.noise);
  const healths = readings.map((r) => r.healthIndex);
  const healthy = readings.filter((r) => r.status === "HEALTHY").length;
  const warning = readings.filter((r) => r.status === "WARNING").length;
  const critical = readings.filter((r) => r.status === "CRITICAL").length;
  const latest = readings.length > 0 ? readings[readings.length - 1] : null;
  const generatedAt = (/* @__PURE__ */ new Date()).toLocaleString();
  const handlePrint = () => window.print();
  const handleClearSession = () => {
    if (window.confirm("Clear all stored session data? This cannot be undone.")) {
      clearSession();
      setUseSession(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    PageShell,
    {
      title: "PDF Report",
      description: "Complete motor health and ML prognostics report — click Print to save as PDF.",
      icon: FileDown,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-print flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handlePrint, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
            "Print / Save as PDF"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Data source:" }),
            ["session", "live"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setUseSession(s === "session"),
                className: `rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${(useSession ? "session" : "live") === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
                children: s === "session" ? `Session Log (${stats.count} pts)` : `Live Only (${liveReadings.length} pts)`
              },
              s
            ))
          ] }),
          stats.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleClearSession,
              className: "text-xs text-red-400 hover:text-red-500 underline",
              children: "Clear session log"
            }
          )
        ] }),
        loading && readings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "no-print py-3 text-center text-sm text-muted-foreground", children: "Loading data…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: printRef, id: "printable-report", className: "print-report", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; color: black !important; }
            #printable-report { padding: 0 !important; }
            .print-report { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #111; }
            .report-page-break { page-break-before: always; }
            .print-card {
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 16px;
              break-inside: avoid;
            }
            .print-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .print-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
            .print-grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; }
            th, td { padding: 5px 8px; border-bottom: 1px solid #eee; text-align: left; }
            th { font-weight: 600; text-transform: uppercase; font-size: 10px; color: #555; }
          }
          @media screen {
            .print-report { display: flex; flex-direction: column; gap: 16px; }
            .print-card {
              border: 1px solid hsl(var(--border));
              border-radius: 8px;
              padding: 16px;
              background: hsl(var(--card));
            }
            .print-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .print-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
            .print-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
          }
        ` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print-card", style: { borderLeft: "4px solid #2563eb" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: 20, fontWeight: 700, margin: 0 }, children: "Motor Health Monitor — Prognostics Report" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "4px 0 0", color: "#555", fontSize: 12 }, children: "IoT-Enabled Predictive Maintenance System · RV College of Engineering, Bengaluru" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right", fontSize: 11, color: "#555" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Generated:" }),
                " ",
                generatedAt
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Channel:" }),
                " 3399470 · ESP32-MOTOR-001"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Readings:" }),
                " ",
                readings.length,
                " (",
                useSession ? "session log" : "live window",
                ")"
              ] }),
              stats.earliest && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Period:" }),
                " ",
                new Date(stats.earliest).toLocaleDateString(),
                " – ",
                new Date(stats.latest).toLocaleDateString()
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 12px" }, children: "Executive Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print-grid-4", children: [
              { label: "Overall Status", value: latest?.status ?? "—", color: STATUS_COLOR[latest?.status ?? ""] ?? "#555" },
              { label: "Avg Health Index", value: `${fmt(avg(healths), 1)}%`, color: "#111" },
              { label: "Degradation Stage", value: result.degradationStage.replace("_", " "), color: "#111" },
              { label: "Maintenance Urgency", value: result.maintenanceUrgency, color: result.maintenanceUrgency === "IMMEDIATE" ? "#dc2626" : result.maintenanceUrgency === "SOON" ? "#ca8a04" : "#111" }
            ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { border: "1px solid #e5e7eb", borderRadius: 6, padding: "10px 12px", textAlign: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, textTransform: "uppercase", color: "#777", marginBottom: 4 }, children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 18, fontWeight: 700, color }, children: value })
            ] }, label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 12, padding: "10px 14px", borderRadius: 6, background: result.maintenanceUrgency === "IMMEDIATE" ? "#fef2f2" : result.maintenanceUrgency === "SOON" ? "#fefce8" : "#f0fdf4", border: `1px solid ${result.maintenanceUrgency === "IMMEDIATE" ? "#fca5a5" : result.maintenanceUrgency === "SOON" ? "#fde047" : "#86efac"}` }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Recommendation:" }),
              " ",
              result.recommendation
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print-grid-2", children: [
            {
              title: "Vibration Statistics (g)",
              rows: [
                ["Average", `${fmt(avg(vibs), 3)} g`],
                ["Maximum", `${fmt(maxArr(vibs), 3)} g`],
                ["Minimum", `${fmt(minArr(vibs), 3)} g`],
                ["Std Deviation", `${fmt(result.features.stdDev, 3)} g`],
                ["Peak-to-Peak", `${fmt(result.features.peakToPeak, 3)} g`],
                ["Crest Factor", fmt(result.features.crestFactor, 2)],
                ["Warning threshold", "0.5 g"],
                ["Critical threshold", "1.2 g"]
              ]
            },
            {
              title: "Noise Statistics (dB)",
              rows: [
                ["Average", `${fmt(avg(noises), 1)} dB`],
                ["Maximum", `${fmt(maxArr(noises), 1)} dB`],
                ["Minimum", `${fmt(minArr(noises), 1)} dB`],
                ["RMS Noise", `${fmt(result.features.rmsNoise, 1)} dB`],
                ["Warning threshold", "60 dB"],
                ["Critical threshold", "75 dB"]
              ]
            }
          ].map(({ title, rows }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 8px" }, children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("table", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map(([l, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "#555" }, children: l }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" }, children: v })
            ] }, l)) }) })
          ] }, title)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 12px" }, children: "ML Prognostics — Remaining Useful Life" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print-grid-3", style: { marginBottom: 12 }, children: [
              ["Model", "OLS Linear Regression"],
              ["R² (Goodness of fit)", result.rulResult ? fmt(result.rulResult.rSquared, 3) : "—"],
              ["Confidence", result.rulResult?.confidence ?? "—"],
              ["Trend Slope", `${result.features.trendSlope >= 0 ? "+" : ""}${fmt(result.features.trendSlope, 4)} %/reading`],
              ["Anomaly Rate", `${fmt(result.anomalyRate, 1)}% (${result.anomalyPoints.filter((p) => p.isAnomaly).length} events)`],
              ["Degradation Score", `${fmt(result.degradationScore, 1)} / 100`]
            ].map(([l, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 12px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, textTransform: "uppercase", color: "#777", marginBottom: 2 }, children: l }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: 13 }, children: v })
            ] }, l)) }),
            result.rulResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "10px 14px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "RUL Estimate:" }),
              " ",
              result.rulResult.rulReadings >= 9999 ? "No degradation trend detected — motor appears stable." : `${result.rulResult.rulReadings} readings (≈ ${result.rulResult.rulHours >= 48 ? `${(result.rulResult.rulHours / 24).toFixed(1)} days` : `${result.rulResult.rulHours.toFixed(1)} hours`}) until predicted failure threshold.`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 12px" }, children: [
              "Status Distribution (",
              readings.length,
              " readings)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print-grid-3", children: [
              { label: "HEALTHY", count: healthy, color: "#16a34a", bg: "#f0fdf4" },
              { label: "WARNING", count: warning, color: "#ca8a04", bg: "#fefce8" },
              { label: "CRITICAL", count: critical, color: "#dc2626", bg: "#fef2f2" }
            ].map(({ label, count, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: bg, border: `1px solid ${color}55`, borderRadius: 8, padding: "12px 16px", textAlign: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, textTransform: "uppercase", color: "#555", marginBottom: 4 }, children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 28, fontWeight: 700, color }, children: count }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#555" }, children: readings.length ? `${(count / readings.length * 100).toFixed(0)}%` : "0%" })
            ] }, label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print-card report-page-break", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#555", margin: "0 0 12px" }, children: "Raw Readings (last 50)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { background: "#f8fafc" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Timestamp" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right" }, children: "Vibration (g)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right" }, children: "Noise (dB)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right" }, children: "Health (%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right" }, children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [...readings].reverse().slice(0, 50).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { background: i % 2 === 0 ? "white" : "#fafafa" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: new Date(r.timestamp).toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right", fontVariantNumeric: "tabular-nums" }, children: r.vibration.toFixed(3) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right", fontVariantNumeric: "tabular-nums" }, children: r.noise.toFixed(0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { textAlign: "right", fontVariantNumeric: "tabular-nums" }, children: [
                  r.healthIndex.toFixed(0),
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right", fontWeight: 600, color: STATUS_COLOR[r.status] ?? "#111" }, children: r.status })
              ] }, i)) })
            ] }),
            readings.length > 50 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { marginTop: 8, fontSize: 11, color: "#555" }, children: [
              "Showing 50 of ",
              readings.length,
              " readings. Export full CSV from the Dashboard page."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", fontSize: 10, color: "#888", marginTop: 8, paddingTop: 8, borderTop: "1px solid #e5e7eb" }, children: [
            "Motor Health Monitor · IoT-Enabled Predictive Maintenance · RVCE Bengaluru · Report generated ",
            generatedAt
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "no-print", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Session Log Info" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 text-sm sm:grid-cols-4", children: [
              ["Stored readings", stats.count],
              ["Earliest reading", stats.earliest ? new Date(stats.earliest).toLocaleString() : "—"],
              ["Latest reading", stats.latest ? new Date(stats.latest).toLocaleString() : "—"],
              ["Storage used", `${stats.sizeKB} KB`]
            ].map(([l, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: l }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: v })
            ] }, String(l))) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
              "The session log persists readings to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "localStorage" }),
              " automatically on every 20-second poll. Data survives browser refreshes. Maximum 500 readings stored (oldest evicted first)."
            ] })
          ] })
        ] })
      ]
    }
  );
}
const $$splitComponentImporter$1 = () => import("./reports-CQhZYLvN.mjs");
const Route$2 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Reports | Motor Health Monitor"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./settings-DXjmRbM2.mjs");
const Route$1 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Settings | Motor Health Monitor"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
function removeDC(signal) {
  const mu = signal.reduce((a, b) => a + b, 0) / signal.length;
  return signal.map((v) => v - mu);
}
function hannWindow(signal) {
  const N = signal.length;
  return signal.map((v, n) => v * (0.5 - 0.5 * Math.cos(2 * Math.PI * n / (N - 1))));
}
function computeSpectrum(signal, fs) {
  if (signal.length < 2) return [];
  const windowed = hannWindow(removeDC(signal));
  const N = windowed.length;
  const half = Math.floor(N / 2) + 1;
  const bins = [];
  for (let k = 0; k < half; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const angle = 2 * Math.PI * k * n / N;
      re += windowed[n] * Math.cos(angle);
      im -= windowed[n] * Math.sin(angle);
    }
    const mag = k === 0 || k === N / 2 ? Math.sqrt(re * re + im * im) / N : 2 * Math.sqrt(re * re + im * im) / N;
    const phase = Math.atan2(im, re);
    const frequency = k * fs / N;
    bins.push({ frequency, magnitude: mag, phase, raw: mag });
  }
  const maxMag = Math.max(...bins.map((b) => b.raw), 1e-9);
  return bins.map((b) => ({
    ...b,
    magnitude: b.raw / maxMag * 100
  }));
}
function findPeaks(bins, topN = 3, thresholdPct = 20) {
  const peaks = [];
  for (let i = 1; i < bins.length - 1; i++) {
    if (bins[i].magnitude > thresholdPct && bins[i].magnitude > bins[i - 1].magnitude && bins[i].magnitude > bins[i + 1].magnitude) {
      peaks.push(bins[i]);
    }
  }
  return peaks.sort((a, b) => b.magnitude - a.magnitude).slice(0, topN);
}
function classifySpectrum(bins, peaks, fs) {
  if (bins.length === 0 || peaks.length === 0) return "Insufficient data";
  const dominant = peaks[0];
  const nyquist = fs / 2;
  const relFreq = dominant.frequency / nyquist;
  if (dominant.magnitude < 30) return "Low spectral energy — readings are steady with no dominant trend";
  if (relFreq < 0.15) return "Low-frequency variation — slow drift or gradual change in readings over time";
  if (relFreq < 0.45) return "Mid-frequency variation — periodic pattern detected in the reading sequence";
  if (relFreq < 0.75) return "High-frequency variation — rapid fluctuation between consecutive readings";
  return "Very high-frequency variation — near Nyquist limit; likely measurement noise";
}
const Route = createFileRoute()({
  head: () => ({
    meta: [
      { title: "Frequency Spectrum | Motor Health Monitor" },
      {
        name: "description",
        content: "Vibration frequency spectrum analysis using Discrete Fourier Transform — Motor Health Monitor."
      }
    ]
  }),
  component: SpectrumPage
});
const FS_HZ = 1 / 15;
function SpectrumPage() {
  const [liveReadings, setLiveReadings] = reactExports.useState([]);
  const [sessionReadings, setSessionReadings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [source, setSource] = reactExports.useState("session");
  reactExports.useEffect(() => {
    setSessionReadings(loadSession());
  }, []);
  reactExports.useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setLiveReadings(data);
        setSessionReadings(loadSession());
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
  const activeReadings = source === "session" ? sessionReadings : liveReadings;
  const { bins, peaks, classification } = reactExports.useMemo(() => {
    const signal = activeReadings.map((r) => r.vibration);
    const b = computeSpectrum(signal, FS_HZ);
    const p = findPeaks(b, 3, 20);
    const c = classifySpectrum(b, p, FS_HZ);
    return { bins: b, peaks: p, classification: c };
  }, [activeReadings]);
  const fmtHz = (hz) => hz < 1e-3 ? `${(hz * 1e3).toFixed(2)} mHz` : `${hz.toFixed(4)} Hz`;
  const peakFreqs = new Set(peaks.map((p) => p.frequency));
  const chartData = bins.map((b) => ({
    freq: fmtHz(b.frequency),
    magnitude: parseFloat(b.magnitude.toFixed(2)),
    isPeak: peakFreqs.has(b.frequency)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    PageShell,
    {
      title: "Frequency Spectrum",
      description: "Vibration signal decomposed into frequency components via Discrete Fourier Transform (Hann-windowed, DC-removed).",
      icon: Waves,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Data source:" }),
          ["session", "live"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSource(s),
              className: `rounded-full px-4 py-1.5 text-xs font-semibold transition-colors border ${source === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
              children: s === "session" ? `Session Log (${sessionReadings.length} pts)` : `Live Window (${liveReadings.length} pts)`
            },
            s
          ))
        ] }),
        activeReadings.length < 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-info/20 bg-info/5 px-4 py-3 text-sm text-info", children: "ℹ Need at least 4 readings for a meaningful spectrum. Keep the dashboard open — data accumulates automatically." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: [
              "Vibration Magnitude Spectrum — DFT (",
              activeReadings.length,
              " samples, fs = ",
              FS_HZ.toFixed(4),
              " Hz)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Dominant peaks highlighted in amber. Frequency resolution = ",
              bins.length > 1 ? fmtHz(bins[1]?.frequency ?? 0) : "—",
              " per bin."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading && activeReadings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-12 text-center text-sm text-muted-foreground", children: "Loading data…" }) : bins.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-12 text-center text-sm text-muted-foreground", children: "No spectrum data available." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, margin: { top: 10, right: 16, left: 0, bottom: 40 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "freq",
                tick: { fontSize: 9, fill: "var(--color-muted-foreground)" },
                stroke: "var(--color-border)",
                angle: -45,
                textAnchor: "end",
                interval: 0,
                label: {
                  value: "Frequency",
                  position: "insideBottom",
                  offset: -30,
                  style: { fontSize: 11, fill: "var(--color-muted-foreground)" }
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                domain: [0, 100],
                tick: { fontSize: 10, fill: "var(--color-muted-foreground)" },
                stroke: "var(--color-border)",
                label: {
                  value: "Magnitude (%)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 12,
                  style: { fontSize: 10, fill: "var(--color-muted-foreground)" }
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
                formatter: (v, _, props) => [
                  `${v.toFixed(1)}%${props.payload?.isPeak ? " ⭐ Peak" : ""}`,
                  "Magnitude"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReferenceLine, { y: 20, stroke: "var(--color-warning)", strokeDasharray: "4 3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "magnitude", radius: [3, 3, 0, 0], children: chartData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Cell,
              {
                fill: entry.isPeak ? "var(--color-warning)" : "var(--color-healthy)",
                opacity: entry.isPeak ? 1 : 0.6
              },
              index
            )) })
          ] }) }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Spectral Classification" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 px-4 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: classification }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed", children: [
                  "Based on dominant frequency band relative to Nyquist (f_N = ",
                  fmtHz(FS_HZ / 2),
                  "). ISO 10816 energy-band heuristics applied."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 gap-2 text-sm", children: [
                ["Samples (N)", activeReadings.length],
                ["Sample Rate (fs)", `${FS_HZ.toFixed(4)} Hz`],
                ["Nyquist (fs/2)", fmtHz(FS_HZ / 2)],
                ["Freq. Resolution", bins.length > 1 ? fmtHz(bins[1]?.frequency ?? 0) : "—"],
                ["DFT Bins", bins.length],
                ["Window", "Hann"]
              ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rounded border border-border/60 px-2 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tabular-nums", children: value })
              ] }, String(label))) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Dominant Frequency Peaks" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              peaks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "No significant peaks detected above 20% threshold." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left font-medium", children: "Rank" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Frequency" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Period" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-medium", children: "Magnitude" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: peaks.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 font-semibold text-warning", children: [
                    "#",
                    i + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums", children: fmtHz(p.frequency) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-muted-foreground", children: p.frequency > 0 ? `${(1 / p.frequency / 60).toFixed(1)} min` : "∞" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right tabular-nums font-semibold", children: [
                    p.magnitude.toFixed(1),
                    "%"
                  ] })
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-border/60 p-3 text-xs text-muted-foreground leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Note:" }),
                " At the 20-second poll rate (fs = ",
                FS_HZ.toFixed(4),
                " Hz), the Nyquist limit is ",
                fmtHz(FS_HZ / 2),
                ", meaning only very-slow cyclic variations can be resolved. For bearing-frequency resolution, increase the ESP32 upload rate."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "DFT Theory Reference" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 text-sm sm:grid-cols-3", children: [
            {
              title: "Discrete Fourier Transform",
              body: "X[k] = Σ x[n] · e^(−j2πkn/N). Each bin k represents the complex amplitude at frequency k·fs/N. Magnitude = |X[k]|, normalised to the window energy."
            },
            {
              title: "Hann Window",
              body: "w[n] = 0.5 – 0.5·cos(2πn/(N–1)). Applied before the DFT to taper edge discontinuities and reduce spectral leakage — essential for short data records."
            },
            {
              title: "One-sided Spectrum",
              body: "For real-valued signals, the DFT is conjugate symmetric. Only bins 0…N/2 are unique. Non-DC bins are doubled to preserve total signal energy in the one-sided view."
            }
          ].map(({ title, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 font-semibold text-foreground", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-muted-foreground", children: body })
          ] }, title)) }) })
        ] })
      ]
    }
  );
}
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const AboutRoute = Route$9.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$b
});
const AlertsRoute = Route$8.update({
  id: "/alerts",
  path: "/alerts",
  getParentRoute: () => Route$b
});
const ChartsRoute = Route$7.update({
  id: "/charts",
  path: "/charts",
  getParentRoute: () => Route$b
});
const ExportRoute = Route$6.update({
  id: "/export",
  path: "/export",
  getParentRoute: () => Route$b
});
const LiveDataRoute = Route$5.update({
  id: "/live-data",
  path: "/live-data",
  getParentRoute: () => Route$b
});
const MlRoute = Route$4.update({
  id: "/ml",
  path: "/ml",
  getParentRoute: () => Route$b
});
const PdfReportRoute = Route$3.update({
  id: "/pdf-report",
  path: "/pdf-report",
  getParentRoute: () => Route$b
});
const ReportsRoute = Route$2.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$b
});
const SettingsRoute = Route$1.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$b
});
const SpectrumRoute = Route.update({
  id: "/spectrum",
  path: "/spectrum",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AlertsRoute,
  ChartsRoute,
  ExportRoute,
  LiveDataRoute,
  MlRoute,
  PdfReportRoute,
  ReportsRoute,
  SettingsRoute,
  SpectrumRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Card as C,
  PageShell as P,
  CardContent as a,
  CardHeader as b,
  cn as c,
  CardTitle as d,
  CHANNEL_ID as e,
  fetchMotorReadings as f,
  router as r
};
