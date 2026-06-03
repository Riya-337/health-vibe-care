import { createFileRoute } from "@tanstack/react-router";
import { BellRing } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import { useMotorData } from "@/hooks/useMotorData";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts | Motor Health Monitor" }] }),
  component: AlertsPage,
});

function AlertsPage() {
  const { readings, latest } = useMotorData(20_000);
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
            <p className="py-6 text-center text-sm text-muted-foreground">
              No abnormal events in the last 20 readings.
            </p>
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
