import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const gallery = await prisma.galleryImage.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ gallery });
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
