import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function StatsCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  accent?: string;
}) {
  return (
    <Card className="flex flex-row items-center gap-4 p-5">
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl border",
          accent
        )}
      >
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-semibold tabular-nums">{value}</div>
      </div>
    </Card>
  );
}
