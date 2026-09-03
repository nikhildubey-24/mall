import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const floorPlans = await prisma.floorPlan.findMany({
      orderBy: { floorName: "asc" },
    });
    return NextResponse.json({ floorPlans });
  } catch (error) {
    console.error("Failed to fetch floor plans:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const floorName = typeof data.floorName === "string" ? data.floorName.trim() : "";
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const image = typeof data.image === "string" ? data.image.trim() : "";

  if (!floorName || !title || !image) {
    return NextResponse.json(
      { error: "floorName, title, and image are required" },
      { status: 400 }
    );
  }

  try {
    const floorPlan = await prisma.floorPlan.create({
      data: {
        projectId: "project-1",
        floorName,
        title,
        description:
          typeof data.description === "string" && data.description.trim()
            ? data.description.trim()
            : null,
        image,
      },
    });
    return NextResponse.json(floorPlan, { status: 201 });
  } catch (error) {
    console.error("Failed to create floor plan:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
