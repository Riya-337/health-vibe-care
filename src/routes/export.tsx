import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/PageShell";
import { useMotorData } from "@/hooks/useMotorData";

export const Route = createFileRoute("/export")({
  head: () => ({ meta: [{ title: "Data Export | Motor Health Monitor" }] }),
  component: ExportPage,
});

function ExportPage() {
  const { readings } = useMotorData(20_000);

  const downloadCsv = () => {
    const header = "timestamp,vibration_g,noise_db,health_index,status\n";
    const rows = readings
      .map((r) => `${r.timestamp},${r.vibration},${r.noise},${r.healthIndex},${r.status}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `motor-readings-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell
      title="Data Export"
      description="Download the most recent telemetry as CSV for offline analysis."
      icon={Download}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Export CSV
          </CardTitle>
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
