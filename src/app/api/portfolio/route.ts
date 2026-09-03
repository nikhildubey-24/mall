import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const portfolio = await prisma.portfolioItem.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("Failed to fetch portfolio items:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
