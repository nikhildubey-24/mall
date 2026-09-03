import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const floorPlans = await prisma.floorPlan.findMany({
      orderBy: { floorName: "asc" },
    });

    return NextResponse.json({ floorPlans });
  } catch (error) {
    console.error("Failed to fetch floor plans:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
