import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import type { MotorReading, MotorStatus } from "@/services/thingspeak";

export const Route = createFileRoute("/export")({
  head: () => ({ meta: [{ title: "Data Export | Motor Health Monitor" }] }),
  component: ExportPage,
});

function ExportPage() {
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

  const downloadCsv = () => {
    const header = "timestamp,vibration_g,noise_db,health_index,status\n";
    const rows = readings.map((r) => `${r.timestamp},${r.vibration},${r.noise},${r.healthIndex},${r.status}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `motor-readings-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell title="Data Export" description="Download the most recent telemetry as CSV for offline analysis." icon={Download}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Export CSV</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{readings.length} readings ready to export.</p>
          <Button onClick={downloadCsv} disabled={readings.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}