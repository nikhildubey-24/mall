import { prisma } from "@/lib/prisma";

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  mapUrl: string;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: ["phone", "whatsapp", "email", "map_url"] } },
    });

    const db = Object.fromEntries(rows.map((r) => [r.key, r.value]));

    return {
      phone: db.phone || process.env.NEXT_PUBLIC_PHONE || "",
      whatsapp: db.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
      email: db.email || process.env.NEXT_PUBLIC_EMAIL || "",
      mapUrl: db.map_url || "",
    };
  } catch {
    return {
      phone: process.env.NEXT_PUBLIC_PHONE || "",
      whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
      email: process.env.NEXT_PUBLIC_EMAIL || "",
      mapUrl: "",
    };
  }
}
