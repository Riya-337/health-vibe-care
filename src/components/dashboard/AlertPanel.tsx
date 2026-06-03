import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import type { MotorStatus } from "@/services/thingspeak";
import { cn } from "@/lib/utils";

interface AlertPanelProps {
  status: MotorStatus;
}

const MAP = {
  HEALTHY: {
    title: "All systems normal",
    message: "Motor operating normally. No action required.",
    icon: CheckCircle2,
    classes: "border-healthy/30 bg-healthy/10 text-healthy",
  },
  WARNING: {
    title: "Maintenance recommended",
    message: "Schedule maintenance soon. Vibration or noise outside optimal range.",
    icon: AlertTriangle,
    classes: "border-warning/30 bg-warning/10 text-warning",
  },
  CRITICAL: {
    title: "Critical condition detected",
    message: "Immediate inspection required. Stop the motor and dispatch maintenance team.",
    icon: ShieldAlert,
    classes: "border-critical/30 bg-critical/10 text-critical",
  },
} as const;

export function AlertPanel({ status }: AlertPanelProps) {
  const cfg = MAP[status];
  const Icon = cfg.icon;
  return (
    <div className={cn("flex items-start gap-4 rounded-xl border p-5", cfg.classes)}>
      <div className="rounded-lg bg-background/60 p-2.5">
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider">{status}</span>
          <span className="h-1 w-1 rounded-full bg-current opacity-40" />
          <span className="text-xs opacity-80">Recommendation</span>
        </div>
        <p className="mt-1 text-base font-semibold text-foreground">{cfg.title}</p>
        <p className="text-sm text-muted-foreground">{cfg.message}</p>
      </div>
    </div>
  );
}
