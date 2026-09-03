import { NextResponse } from "next/server";
import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_FOLDERS = ["floor-plans", "gallery", "portfolio", "general"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const folder = url.searchParams.get("folder") || "floor-plans";
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: `Invalid folder: ${folder}` }, { status: 400 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_MIME.includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_MIME.join(", ")}` },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum: 10MB` },
      { status: 400 }
    );
  }

  const originalName = file.name || "upload";
  const ext = originalName.includes(".")
    ? originalName.split(".").pop()
    : "bin";
  const slug = originalName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const filename = `${slug}-${Date.now()}.${ext}`;

  const uploadDir = join(process.cwd(), "public", "uploads", folder);
  mkdirSync(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(uploadDir, filename), buffer);

  return NextResponse.json(
    { url: `/uploads/${folder}/${filename}` },
    { status: 201 }
  );
}
