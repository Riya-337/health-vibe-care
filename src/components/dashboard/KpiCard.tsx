import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type KpiTone = "healthy" | "warning" | "critical" | "info";

interface KpiCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  tone: KpiTone;
  hint?: string;
}

const TONE_CLASS: Record<KpiTone, { ring: string; text: string; bg: string; border: string }> = {
  healthy: {
    ring: "ring-healthy/20",
    text: "text-healthy",
    bg: "bg-healthy/10",
    border: "border-healthy/30",
  },
  warning: {
    ring: "ring-warning/20",
    text: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
  },
  critical: {
    ring: "ring-critical/20",
    text: "text-critical",
    bg: "bg-critical/10",
    border: "border-critical/30",
  },
  info: {
    ring: "ring-primary/20",
    text: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
};

export function KpiCard({ title, value, unit, icon: Icon, tone, hint }: KpiCardProps) {
  const t = TONE_CLASS[tone];
  return (
    <Card className={cn("overflow-hidden border bg-card transition-all hover:shadow-md", t.border)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className={cn("text-3xl font-bold tabular-nums", t.text)}>{value}</span>
              {unit && (
                <span className="text-sm font-medium text-muted-foreground">{unit}</span>
              )}
            </div>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
          </div>
          <div className={cn("rounded-xl p-3 ring-4", t.bg, t.ring)}>
            <Icon className={cn("h-6 w-6", t.text)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
