import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ALLOWED_KEYS = [
  "phone",
  "whatsapp",
  "email",
  "address",
  "promoter",
  "registered_office",
  "map_url",
] as const;

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await prisma.siteSetting.findMany();
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key] = row.value ?? "";
    }

    const rera = await prisma.reraRegistration.findFirst({
      include: { project: true },
    });

    const project = await prisma.project.findFirst({
      where: { status: "active" },
    });

    return NextResponse.json({ settings, rera: rera ?? null, project: project ?? null });
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

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

  const settings = (body as Record<string, unknown>).settings;
  if (!settings || typeof settings !== "object") {
    return NextResponse.json({ error: "settings is required" }, { status: 400 });
  }

  const entries = Object.entries(settings as Record<string, unknown>).filter(
    ([key]) => (ALLOWED_KEYS as readonly string[]).includes(key)
  );

  try {
    for (const [key, value] of entries) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value: typeof value === "string" ? value : "" },
        update: { value: typeof value === "string" ? value : "" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
