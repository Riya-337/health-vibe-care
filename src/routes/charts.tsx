import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LineChart as LineChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { TrendChart } from "@/components/dashboard/TrendChart";
import type { MotorReading, MotorStatus } from "@/services/thingspeak";

export const Route = createFileRoute("/charts")({
  head: () => ({ meta: [{ title: "Charts | Motor Health Monitor" }] }),
  component: ChartsPage,
});

function ChartsPage() {
  const [readings, setReadings] = useState<MotorReading[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            "https://api.thingspeak.com/channels/3399470/feeds.json?api_key=VQL5EX22KNVGXLA4&results=20"
          )}`
        );
        const raw = await res.json();
        const json = JSON.parse(raw.contents);
        const mapped: MotorReading[] = json.feeds.map((f: any) => ({
          timestamp: f.created_at,
          time: new Date(f.created_at).toLocaleTimeString(),
          vibration: parseFloat(f.field1) || 0,
          noise: parseFloat(f.field2) || 0,
          healthIndex: parseFloat(f.field3) || 0,
          status: (f.field4?.trim().toUpperCase() || "WARNING") as MotorStatus,
        }));
        setReadings(mapped);
      } catch (e) {
        console.error("Fetch failed", e);
      }
    };
    load();
    const id = setInterval(load, 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <PageShell title="Charts" description="Historical trends across the last 20 readings." icon={LineChartIcon}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vibration (g)</CardTitle></CardHeader>
          <CardContent><TrendChart data={readings} dataKey="vibration" color="var(--color-healthy)" yLabel="g" domain={[0, 2]} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Noise (dB)</CardTitle></CardHeader>
          <CardContent><TrendChart data={readings} dataKey="noise" color="var(--color-info)" yLabel="dB" domain={[30, 90]} /></CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Health Index (%)</CardTitle></CardHeader>
          <CardContent><TrendChart data={readings} dataKey="healthIndex" color="var(--color-warning)" yLabel="%" domain={[0, 100]} /></CardContent>
        </Card>
      </div>
    </PageShell>
  );
}