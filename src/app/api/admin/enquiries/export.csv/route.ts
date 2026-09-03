import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function escapeCsvField(value: string | null | undefined): string {
  if (value == null) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Name",
      "Phone",
      "Email",
      "Interested In",
      "Contact Method",
      "Message",
      "Status",
      "Created At",
      "Admin Notes",
    ];

    const rows = enquiries.map((e) =>
      [
        escapeCsvField(e.name),
        escapeCsvField(e.phone),
        escapeCsvField(e.email),
        escapeCsvField(e.interestedIn),
        escapeCsvField(e.contactMethod),
        escapeCsvField(e.message),
        escapeCsvField(e.status),
        escapeCsvField(formatDate(e.createdAt)),
        escapeCsvField(e.adminNotes),
      ].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\r\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="enquiries.csv"',
      },
    });
  } catch (error) {
    console.error("Failed to export enquiries:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
