import { NextResponse } from "next/server";
import { unlinkSync } from "fs";
import { join } from "path";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

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
    const item = await prisma.portfolioItem.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ item });
  } catch (error) {
    console.error("Failed to fetch portfolio item:", error);
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

  if ("name" in data) {
    const val = typeof data.name === "string" ? data.name.trim() : "";
    if (!val) {
      return NextResponse.json({ error: "name cannot be empty" }, { status: 400 });
    }
    updateData.name = val;
  }

  if ("category" in data) {
    const val = typeof data.category === "string" ? data.category.trim() : "";
    if (!val) {
      return NextResponse.json({ error: "category cannot be empty" }, { status: 400 });
    }
    updateData.category = val;
  }

  if ("location" in data) {
    const val = typeof data.location === "string" ? data.location.trim() : "";
    if (!val) {
      return NextResponse.json({ error: "location cannot be empty" }, { status: 400 });
    }
    updateData.location = val;
  }

  if ("description" in data) {
    const val = data.description;
    if (val === null || val === undefined) {
      updateData.description = null;
    } else if (typeof val === "string") {
      updateData.description = val.trim() || null;
    } else {
      return NextResponse.json({ error: "Invalid value for description" }, { status: 400 });
    }
  }

  if ("imageUrl" in data) {
    const val = data.imageUrl;
    if (val === null || val === undefined) {
      updateData.imageUrl = null;
    } else if (typeof val === "string") {
      updateData.imageUrl = val.trim() || null;
    } else {
      return NextResponse.json({ error: "Invalid value for imageUrl" }, { status: 400 });
    }
  }

  if ("websiteUrl" in data) {
    const val = data.websiteUrl;
    if (val === null || val === undefined) {
      updateData.websiteUrl = null;
    } else if (typeof val === "string") {
      updateData.websiteUrl = val.trim() || null;
    } else {
      return NextResponse.json({ error: "Invalid value for websiteUrl" }, { status: 400 });
    }
  }

  if ("status" in data) {
    if (data.status !== "active" && data.status !== "inactive") {
      return NextResponse.json(
        { error: "status must be 'active' or 'inactive'" },
        { status: 400 }
      );
    }
    updateData.status = data.status;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const item = await prisma.portfolioItem.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json({ item });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("Failed to update portfolio item:", error);
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
    const item = await prisma.portfolioItem.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.portfolioItem.delete({ where: { id } });

    if (item.imageUrl && item.imageUrl.startsWith("/uploads/portfolio/")) {
      try {
        const filePath = join(process.cwd(), "public", item.imageUrl);
        unlinkSync(filePath);
      } catch {
        // File may not exist — ignore
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
    console.error("Failed to delete portfolio item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
