import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/components/enquiry/enquiry-schema";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_CLEANUP_THRESHOLD = 10_000;

type RateLimitEntry = { count: number; resetAt: number };

const rateLimits = new Map<string, RateLimitEntry>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function pruneExpiredEntries(): void {
  if (rateLimits.size < RATE_LIMIT_CLEANUP_THRESHOLD) return;
  const now = Date.now();
  for (const [ip, entry] of rateLimits) {
    if (now >= entry.resetAt) rateLimits.delete(ip);
  }
}

export async function POST(request: Request) {
  pruneExpiredEntries();

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Too many enquiries from this device. Please try again in an hour.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const result = enquirySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: result.error.issues[0]?.message ?? "Invalid input",
        errors: result.error.issues,
      },
      { status: 400 }
    );
  }

  const data = result.data;

  try {
    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email?.trim() || null,
        interestedIn: data.interestedIn,
        contactMethod: data.contactMethod,
        message: data.message?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create enquiry:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}