import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Activity,
  LineChart,
  BellRing,
  FileText,
  Download,
  Settings,
  Info,
  Menu,
  X,
  Cpu,
  BrainCircuit,
  Waves,
  FileDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/live-data", label: "Live Data", icon: Activity },
  { to: "/charts", label: "Charts", icon: LineChart },
  { to: "/alerts", label: "Alerts", icon: BellRing },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/ml", label: "ML Prognostics", icon: BrainCircuit },
  { to: "/spectrum", label: "Freq. Spectrum", icon: Waves },
  { to: "/pdf-report", label: "PDF Report", icon: FileDown },
  { to: "/export", label: "Data Export", icon: Download },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/about", label: "About", icon: Info },
] as const;

interface AppSidebarProps {
  open: boolean;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onClose: () => void;
}

export function AppSidebar({ open, collapsed, onToggleCollapsed, onClose }: AppSidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const width = collapsed && !isMobile ? "w-16" : "w-64";

  return (
    <>
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          width,
          isMobile
            ? open
              ? "translate-x-0 shadow-2xl"
              : "-translate-x-full"
            : "translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
          <button
            onClick={isMobile ? onClose : onToggleCollapsed}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-sidebar-accent"
            aria-label="Toggle sidebar"
          >
            {isMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          {(!collapsed || isMobile) && (
            <div className="flex items-center gap-2 pr-2">
              <Cpu className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold tracking-tight">MOTOR HEALTH</span>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => isMobile && onClose()}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                    title={collapsed && !isMobile ? item.label : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {(!collapsed || isMobile) && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {(!collapsed || isMobile) && (
          <div className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">
            <div className="font-semibold text-sidebar-foreground">RVCE</div>
            <div>Predictive Maintenance Lab</div>
            <div className="mt-1 opacity-70">v1.0.0</div>
          </div>
        )}
      </aside>
    </>
  );
}

export function SidebarOpenButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="md:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
