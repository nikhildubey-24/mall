import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");

    const where =
      status === "active" || status === "inactive" ? { status } : undefined;

    const items = await prisma.portfolioItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Failed to fetch portfolio items:", error);
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
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const category = typeof data.category === "string" ? data.category.trim() : "";
  const location = typeof data.location === "string" ? data.location.trim() : "";

  if (!name || !category || !location) {
    return NextResponse.json(
      { error: "name, category, and location are required" },
      { status: 400 }
    );
  }

  const status =
    data.status === "inactive" ? "inactive" : "active";

  try {
    const item = await prisma.portfolioItem.create({
      data: {
        name,
        category,
        location,
        description:
          typeof data.description === "string" && data.description.trim()
            ? data.description.trim()
            : null,
        imageUrl:
          typeof data.imageUrl === "string" && data.imageUrl.trim()
            ? data.imageUrl.trim()
            : null,
        websiteUrl:
          typeof data.websiteUrl === "string" && data.websiteUrl.trim()
            ? data.websiteUrl.trim()
            : null,
        status,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Failed to create portfolio item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
