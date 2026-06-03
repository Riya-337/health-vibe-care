import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface PageShellProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children?: React.ReactNode;
}

export function PageShell({ title, description, icon: Icon, children }: PageShellProps) {
  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-primary/10 p-3 ring-4 ring-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children ?? (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Coming soon
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This module is part of the Motor Health Monitor roadmap and will be available in an
            upcoming release. The live dashboard already streams data from the ThingSpeak channel
            every 20 seconds.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
