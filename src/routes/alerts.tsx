import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BellRing } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import type { MotorReading, MotorStatus } from "@/services/thingspeak";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts | Motor Health Monitor" }] }),
  component: AlertsPage,
});

function AlertsPage() {
  const [readings, setReadings] = useState<MotorReading[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("https://api.thingspeak.com/channels/3399470/feeds.json?api_key=VQL5EX22KNVGXLA4&results=20")}`);
        const raw = await res.json();
        const json = JSON.parse(raw.contents);
        setReadings(json.feeds.map((f: any) => ({
          timestamp: f.created_at,
          time: new Date(f.created_at).toLocaleTimeString(),
          vibration: parseFloat(f.field1) || 0,
          noise: parseFloat(f.field2) || 0,
          healthIndex: parseFloat(f.field3) || 0,
          status: (f.field4?.trim().toUpperCase() || "WARNING") as MotorStatus,
        })));
      } catch (e) { console.error(e); }
    };
    load();
    const id = setInterval(load, 20000);
    return () => clearInterval(id);
  }, []);

  const latest = readings.length > 0 ? readings[readings.length - 1] : null;
  const alerts = readings.filter((r) => r.status !== "HEALTHY").reverse();

  return (
    <PageShell title="Alerts" description="Maintenance recommendations and recent abnormal events." icon={BellRing}>
      <AlertPanel status={latest?.status ?? "WARNING"} />
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Non-Healthy Events ({alerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No abnormal events in the last 20 readings.</p>
          ) : (
            <ul className="divide-y divide-border">
              {alerts.map((r, i) => (
                <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-muted-foreground">{new Date(r.timestamp).toLocaleString()}</span>
                  <span className={`font-semibold ${r.status === "CRITICAL" ? "text-critical" : "text-warning"}`}>
                    {r.status} · {r.healthIndex.toFixed(0)}% health
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}