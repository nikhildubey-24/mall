import { NextResponse } from "next/server";
import { unlinkSync } from "fs";
import { join } from "path";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const UPDATABLE_FIELDS = ["category", "title", "imageUrl", "altText", "sortOrder"] as const;

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
    const image = await prisma.galleryImage.findUnique({ where: { id } });
    if (!image) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(image);
  } catch (error) {
    console.error("Failed to fetch gallery image:", error);
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
      if (val === null || val === undefined || val === "") {
        return NextResponse.json({ error: `${field} cannot be empty` }, { status: 400 });
      }
      if (field === "sortOrder") {
        if (typeof val !== "number" || !Number.isInteger(val)) {
          return NextResponse.json({ error: "sortOrder must be an integer" }, { status: 400 });
        }
        updateData[field] = val;
      } else if (typeof val === "string") {
        const trimmed = val.trim();
        if (!trimmed) {
          return NextResponse.json({ error: `${field} cannot be empty` }, { status: 400 });
        }
        updateData[field] = trimmed;
      } else {
        return NextResponse.json({ error: `Invalid value for ${field}` }, { status: 400 });
      }
    }
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const image = await prisma.galleryImage.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(image);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("Failed to update gallery image:", error);
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
    const image = await prisma.galleryImage.findUnique({ where: { id } });
    if (!image) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.galleryImage.delete({ where: { id } });

    // Best-effort file cleanup for uploaded gallery images
    if (image.imageUrl && image.imageUrl.startsWith("/uploads/gallery/")) {
      try {
        const filePath = join(process.cwd(), "public", image.imageUrl);
        unlinkSync(filePath);
      } catch {
        // File may not exist or already deleted — ignore
      }
    }

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
    console.error("Failed to delete gallery image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
