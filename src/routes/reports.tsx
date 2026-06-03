import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports | Motor Health Monitor" }] }),
  component: () => <PageShell title="Reports" description="Daily and weekly motor health reports." icon={FileText} />,
});
