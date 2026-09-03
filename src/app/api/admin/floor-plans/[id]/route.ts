import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const UPDATABLE_FIELDS = ["floorName", "title", "description", "image"] as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const floorPlan = await prisma.floorPlan.findUnique({ where: { id } });
    if (!floorPlan) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(floorPlan);
  } catch (error) {
    console.error("Failed to fetch floor plan:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

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
  const updateData: Record<string, unknown> = {};

  for (const field of UPDATABLE_FIELDS) {
    if (field in data) {
      const val = data[field];
      if (val === null || val === undefined) {
        if (field === "floorName" || field === "title" || field === "image") {
          return NextResponse.json({ error: `${field} cannot be empty` }, { status: 400 });
        }
        updateData[field] = null;
      } else if (typeof val === "string") {
        if ((field === "floorName" || field === "title" || field === "image") && !val.trim()) {
          return NextResponse.json({ error: `${field} cannot be empty` }, { status: 400 });
        }
        updateData[field] = field === "description" ? (val.trim() || null) : val.trim();
      } else {
        return NextResponse.json({ error: `Invalid value for ${field}` }, { status: 400 });
      }
    }
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const floorPlan = await prisma.floorPlan.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(floorPlan);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("Failed to update floor plan:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const floorPlan = await prisma.floorPlan.findUnique({ where: { id } });
    if (!floorPlan) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.floorPlan.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("Failed to delete floor plan:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
