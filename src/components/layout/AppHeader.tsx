import { useEffect, useState } from "react";
import rvLogo from "@/assets/rv-logo.png";
import motorImg from "@/assets/motor.png";
import { SidebarOpenButton } from "./AppSidebar";

interface AppHeaderProps {
  online: boolean;
  onOpenSidebar: () => void;
}

export function AppHeader({ online, onOpenSidebar }: AppHeaderProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-20 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarOpenButton onClick={onOpenSidebar} />
          <img
            src={rvLogo}
            alt="RV College of Engineering logo"
            className="h-12 w-12 shrink-0 rounded-full object-contain ring-1 ring-border"
            width={48}
            height={48}
          />
          <img
            src={motorImg}
            alt="Electric motor"
            className="hidden h-12 w-12 shrink-0 object-contain sm:block"
            width={48}
            height={48}
          />
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg">
              MOTOR HEALTH MONITOR
            </h1>
            <p className="truncate text-xs text-muted-foreground sm:text-sm">
              IoT Enabled Predictive Maintenance System
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-foreground">{timeStr}</p>
            <p className="text-xs text-muted-foreground">{dateStr}</p>
            <p className="mt-0.5 text-[11px] font-medium text-primary">
              RV College of Engineering, Bengaluru
            </p>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
              online
                ? "border-healthy/30 bg-healthy/10 text-healthy"
                : "border-critical/30 bg-critical/10 text-critical"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              {online && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-healthy opacity-75" />
              )}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  online ? "bg-healthy" : "bg-critical"
                }`}
              />
            </span>
            {online ? "ONLINE" : "OFFLINE"}
          </div>
        </div>
      </div>
    </header>
  );
}
