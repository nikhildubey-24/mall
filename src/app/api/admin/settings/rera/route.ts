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
    const rera = await prisma.reraRegistration.findFirst({
      include: { project: true },
    });

    return NextResponse.json({ rera: rera ?? null });
  } catch (error) {
    console.error("Failed to fetch RERA:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
