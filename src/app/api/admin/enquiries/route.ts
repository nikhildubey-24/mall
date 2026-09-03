import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim() || "";
  const status = searchParams.get("status")?.trim() || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10) || 20));

  try {
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.enquiry.count({ where }),
    ]);

    return NextResponse.json({ enquiries, total, page, pageSize });
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);
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
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const interestedIn = typeof data.interestedIn === "string" ? data.interestedIn.trim() : "";

  if (!name || !phone || !interestedIn) {
    return NextResponse.json(
      { error: "name, phone, and interestedIn are required" },
      { status: 400 }
    );
  }

  const createData: {
    name: string;
    phone: string;
    interestedIn: string;
    contactMethod: string;
    email?: string | null;
    message?: string | null;
  } = {
    name,
    phone,
    interestedIn,
    contactMethod: typeof data.contactMethod === "string" && data.contactMethod.trim()
      ? data.contactMethod.trim()
      : "Phone",
  };
  if (typeof data.email === "string" && data.email.trim()) {
    createData.email = data.email.trim();
  }
  if (typeof data.message === "string" && data.message.trim()) {
    createData.message = data.message.trim();
  }

  try {
    const enquiry = await prisma.enquiry.create({ data: createData });
    return NextResponse.json(enquiry, { status: 201 });
  } catch (error) {
    console.error("Failed to create enquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
