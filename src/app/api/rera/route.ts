import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rera = await prisma.reraRegistration.findMany({
      orderBy: { registrationDate: "asc" },
    });

    return NextResponse.json({ rera });
  } catch (error) {
    console.error("Failed to fetch rera registrations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
