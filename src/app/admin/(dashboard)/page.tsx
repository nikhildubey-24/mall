import Link from "next/link";
import {
  ArrowRight,
  Clock4,
  HeartHandshake,
  Inbox,
  MessageSquareText,
  Building2,
  GalleryHorizontalEnd,
  Settings,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatsCard } from "@/components/admin/stats-card";

const STATUS_STYLE: Record<string, string> = {
  new: "bg-gold/15 text-gold-foreground",
  contacted: "bg-blue-100 text-blue-700",
  interested: "bg-emerald-100 text-emerald-700",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function AdminDashboardPage() {
  const session = await auth();

  const [total, byStatus, recent] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const statusCounts: Record<string, number> = {};
  byStatus.forEach((s) => {
    statusCounts[s.status] = s._count._all;
  });

  const newCount = statusCounts["new"] ?? 0;
  const contactedCount = statusCounts["contacted"] ?? 0;
  const interestedCount = statusCounts["interested"] ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of enquiries and quick access to management tools.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={Inbox}
          label="Total Enquiries"
          value={total}
          accent="bg-gold/15 text-gold-foreground"
        />
        <StatsCard
          icon={Clock4}
          label="New Enquiries"
          value={newCount}
          accent="bg-gold-muted text-gold-muted-foreground"
        />
        <StatsCard
          icon={MessageSquareText}
          label="Contacted"
          value={contactedCount}
          accent="bg-blue-100 text-blue-700"
        />
        <StatsCard
          icon={HeartHandshake}
          label="Interested"
          value={interestedCount}
          accent="bg-emerald-100 text-emerald-700"
        />
      </div>

      {/* Recent enquiries */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Enquiries</CardTitle>
            <CardDescription>Latest 5 enquiries</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/enquiries">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No enquiries yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Interested In</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.phone}</TableCell>
                    <TableCell>{e.interestedIn}</TableCell>
                    <TableCell>{formatDate(e.createdAt)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "capitalize",
                          STATUS_STYLE[e.status] ?? ""
                        )}
                      >
                        {e.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            href="/admin/enquiries"
            icon={MessageSquareText}
            title="View Enquiries"
            description="Review and manage enquiries"
          />
          <QuickAction
            href="/admin/floor-plans"
            icon={Building2}
            title="Manage Floor Plans"
            description="Add or edit floor plans"
          />
          <QuickAction
            href="/admin/gallery"
            icon={GalleryHorizontalEnd}
            title="Gallery"
            description="Manage gallery images"
          />
          <QuickAction
            href="/admin/settings"
            icon={Settings}
            title="Settings"
            description="Configure site settings"
          />
        </div>
      </div>

      <div className="rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">
        Logged in as{" "}
        <span className="font-medium text-foreground">
          {session?.user?.email}
        </span>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: typeof MessageSquareText;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-gold/40"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-gold/15 text-gold-foreground">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="flex items-center gap-1 font-semibold">
          {title}
          <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
        <span className="mt-0.5 block text-sm text-muted-foreground">
          {description}
        </span>
      </span>
    </Link>
  );
}
