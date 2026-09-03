import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const UPDATABLE_FIELDS = ["status", "adminNotes", "interestedIn", "email", "phone", "name"] as const;

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
    const enquiry = await prisma.enquiry.findUnique({ where: { id } });
    if (!enquiry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(enquiry);
  } catch (error) {
    console.error("Failed to fetch enquiry:", error);
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
    if (!(field in data)) continue;

    const val = data[field];

    if (val === null || val === undefined) {
      if (field === "name" || field === "phone") {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
      updateData[field] = null;
    } else if (typeof val === "string") {
      const trimmed = val.trim();
      if (field === "name" || field === "phone") {
        if (!trimmed) {
          return NextResponse.json(
            { error: `${field} is required` },
            { status: 400 }
          );
        }
        updateData[field] = trimmed;
      } else {
        updateData[field] = trimmed || null;
      }
    } else {
      return NextResponse.json({ error: `Invalid value for ${field}` }, { status: 400 });
    }
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(enquiry);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("Failed to update enquiry:", error);
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
    await prisma.enquiry.delete({ where: { id } });
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
    console.error("Failed to delete enquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
