import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LineChart as LineChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { fetchMotorReadings } from "@/services/thingspeak";
import type { MotorReading } from "@/services/thingspeak";

export const Route = createFileRoute("/charts")({
  head: () => ({ meta: [{ title: "Charts | Motor Health Monitor" }] }),
  component: ChartsPage,
});

function ChartsPage() {
  const [readings, setReadings] = useState<MotorReading[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await fetchMotorReadings(controller.signal);
        setReadings(data);
      } catch {
        // silently fail, charts stay empty
      }
    };
    load();
    const id = setInterval(load, 20000);
    return () => { controller.abort(); clearInterval(id); };
  }, []);

  return (
    <PageShell title="Charts" description="Historical trends across the last 20 readings." icon={LineChartIcon}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Vibration (g)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={readings} dataKey="vibration" color="var(--color-healthy)" yLabel="g" domain={[0, 2]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Noise (dB)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={readings} dataKey="noise" color="var(--color-info)" yLabel="dB" domain={[30, 90]} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Health Index (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={readings} dataKey="healthIndex" color="var(--color-warning)" yLabel="%" domain={[0, 100]} />
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}