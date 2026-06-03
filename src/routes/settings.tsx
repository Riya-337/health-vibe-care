import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { CHANNEL_ID } from "@/services/thingspeak";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings | Motor Health Monitor" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <PageShell title="Settings" description="Configuration of the connected ThingSpeak channel." icon={SettingsIcon}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            ThingSpeak Channel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between border-b border-border/60 py-2">
            <span className="text-muted-foreground">Channel ID</span>
            <span className="font-semibold tabular-nums">{CHANNEL_ID}</span>
          </div>
          <div className="flex justify-between border-b border-border/60 py-2">
            <span className="text-muted-foreground">Poll Interval</span>
            <span className="font-semibold">20 seconds</span>
          </div>
          <div className="flex justify-between border-b border-border/60 py-2">
            <span className="text-muted-foreground">Fields</span>
            <span className="font-semibold">vibration · noise · health · status</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Mode</span>
            <span className="font-semibold">Read-only</span>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
