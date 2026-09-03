import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const PUBLIC_SETTING_KEYS = new Set([
  "phone",
  "whatsapp",
  "email",
  "map_url",
  "address",
  "promoter",
  "registered_office",
  "logo",
  "favicon",
]);

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: [...PUBLIC_SETTING_KEYS] } },
    });

    const result: Record<string, string> = {};
    for (const setting of settings) {
      if (setting.value?.trim()) {
        result[setting.key] = setting.value;
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
