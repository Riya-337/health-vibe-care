import { Cloud, Cpu, Radio, Wifi } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceStatusPanelProps {
  online: boolean;
  lastUpdatedAt: Date | null;
}

function formatAgo(date: Date | null) {
  if (!date) return "—";
  const sec = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (sec < 60) return `${sec} sec ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  return `${h} h ago`;
}

function Row({
  icon: Icon,
  label,
  status,
  ok,
}: {
  icon: typeof Cpu;
  label: string;
  status: string;
  ok: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2.5">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-muted p-2">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            ok ? "bg-healthy shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-healthy)_20%,transparent)]" : "bg-critical"
          }`}
        />
        <span className={ok ? "text-healthy" : "text-critical"}>{status}</span>
      </div>
    </div>
  );
}

export function DeviceStatusPanel({ online, lastUpdatedAt }: DeviceStatusPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Device Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Row icon={Cpu} label="ESP32" status={online ? "Connected" : "Offline"} ok={online} />
        <Row icon={Wifi} label="WiFi" status={online ? "Connected" : "Disconnected"} ok={online} />
        <Row icon={Cloud} label="ThingSpeak" status={online ? "Online" : "Unreachable"} ok={online} />
        <Row icon={Radio} label="Sensors" status="Active" ok={online} />
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>Last Upload</span>
          <span className="font-semibold text-foreground">{formatAgo(lastUpdatedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
