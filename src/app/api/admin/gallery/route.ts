import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  try {
    const images = await prisma.galleryImage.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
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
  const category = typeof data.category === "string" ? data.category.trim() : "";
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const imageUrl = typeof data.imageUrl === "string" ? data.imageUrl.trim() : "";
  const altText = typeof data.altText === "string" ? data.altText.trim() : "";

  if (!category || !title || !imageUrl || !altText) {
    return NextResponse.json(
      { error: "category, title, imageUrl, and altText are required" },
      { status: 400 }
    );
  }

  let sortOrder = 0;
  if (data.sortOrder !== undefined && data.sortOrder !== null) {
    if (
      typeof data.sortOrder !== "number" ||
      !Number.isInteger(data.sortOrder)
    ) {
      return NextResponse.json({ error: "sortOrder must be an integer" }, { status: 400 });
    }
    sortOrder = data.sortOrder;
  }

  try {
    const image = await prisma.galleryImage.create({
      data: { category, title, imageUrl, altText, sortOrder },
    });
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Failed to create gallery image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
