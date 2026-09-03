import { Download } from "lucide-react";

import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EnquiryTable } from "@/components/admin/enquiry-table";

export const metadata = {
  title: "Enquiries | Acropolis Admin",
};

export default async function EnquiriesPage() {
  await auth();

  const [total, statusCounts, firstPage] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  const counts: Record<string, number> = {};
  statusCounts.forEach((s) => {
    counts[s.status] = s._count._all;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Enquiries</h1>
          <p className="text-sm text-muted-foreground">
            Manage and respond to customer enquiries.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <a href="/api/admin/enquiries/export.csv">
            <Download className="mr-2 size-4" />
            Export CSV
          </a>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total" value={total} />
        <StatCard label="New" value={counts["new"] ?? 0} accent="text-blue-600" />
        <StatCard label="Contacted" value={counts["contacted"] ?? 0} accent="text-amber-600" />
        <StatCard label="Follow-up" value={counts["follow_up"] ?? 0} accent="text-purple-600" />
        <StatCard label="Interested" value={counts["interested"] ?? 0} accent="text-emerald-600" />
        <StatCard label="Closed" value={counts["closed"] ?? 0} accent="text-gray-500" />
      </div>

      <Separator />

      <EnquiryTable
        initialData={JSON.parse(JSON.stringify(firstPage))}
        initialTotal={total}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={cn("text-2xl font-bold", accent)}>{value}</p>
      </CardContent>
    </Card>
  );
}
