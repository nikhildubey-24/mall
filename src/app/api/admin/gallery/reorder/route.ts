import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PUT(request: Request) {
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
  const items = data.items;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "items must be a non-empty array" }, { status: 400 });
  }

  for (const item of items) {
    if (!item || typeof item !== "object") {
      return NextResponse.json({ error: "Each item must be an object" }, { status: 400 });
    }
    const { id, sortOrder } = item as Record<string, unknown>;
    if (
      typeof id !== "string" ||
      !id ||
      typeof sortOrder !== "number" ||
      !Number.isInteger(sortOrder)
    ) {
      return NextResponse.json(
        { error: "Each item must have an id and an integer sortOrder" },
        { status: 400 }
      );
    }
  }

  try {
    for (const item of items as { id: string; sortOrder: number }[]) {
      await prisma.galleryImage.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      const meta = (error as { meta?: { target?: unknown[] } }).meta;
      const target = Array.isArray(meta?.target) ? meta.target[0] : undefined;
      return NextResponse.json(
        { error: `Gallery image not found${target ? ` (id: ${target})` : ""}` },
        { status: 404 }
      );
    }
    console.error("Failed to reorder gallery images:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
