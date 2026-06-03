import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About | Motor Health Monitor" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell title="About" description="Project background and credits." icon={Info}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Motor Health Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Motor Health Monitor</span> is an IoT
            enabled predictive maintenance system for rotating machinery. An ESP32 microcontroller
            samples vibration and acoustic noise from the motor and uploads the readings to a
            ThingSpeak channel every 20 seconds. This dashboard reads the channel in real time and
            estimates a health index that drives maintenance recommendations.
          </p>
          <p>
            Developed at{" "}
            <span className="font-semibold text-foreground">RV College of Engineering, Bengaluru</span>.
          </p>
          <ul className="grid grid-cols-2 gap-2 pt-2">
            <li><span className="font-semibold text-foreground">Hardware</span><br />ESP32 + accelerometer + microphone</li>
            <li><span className="font-semibold text-foreground">Cloud</span><br />ThingSpeak (read-only API)</li>
            <li><span className="font-semibold text-foreground">Frontend</span><br />React, TypeScript, Tailwind, Recharts</li>
            <li><span className="font-semibold text-foreground">Refresh</span><br />Every 20 seconds</li>
          </ul>
        </CardContent>
      </Card>
    </PageShell>
  );
}
