import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatUptime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h}h ${m}m ${s}s`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2 last:border-b-0">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold tabular-nums text-foreground">{value}</span>
    </div>
  );
}

export function SystemInfoPanel() {
  const [start] = useState(() => Date.now() - 2 * 3600 * 1000 - 15 * 60 * 1000 - 36 * 1000);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          System Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <Row label="Device ID" value="ESP32-MOTOR-001" />
        <Row label="IP Address" value="10.255.143.57" />
        <Row label="Uptime" value={formatUptime(now - start)} />
        <Row label="Upload Interval" value="20 sec" />
        <Row label="Cloud Platform" value="ThingSpeak" />
      </CardContent>
    </Card>
  );
}
