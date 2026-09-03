import type { Metadata } from "next";
import { Camera } from "lucide-react";

import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { prisma } from "@/lib/prisma";
import { BASE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the image gallery of Acropolis The Mall, Chantidih, Bilaspur, Chhattisgarh — project views and architectural floor plans.",
  openGraph: {
    title: "Gallery | Acropolis The Mall, Bilaspur",
    description:
      "Browse the image gallery of Acropolis The Mall, Chantidih, Bilaspur, Chhattisgarh — project views and architectural floor plans.",
    url: `${BASE_URL}/gallery`,
  },
};

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="text-gold">Gallery</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              A visual look at the Acropolis The Mall project and its
              architectural floor plans.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {images.length > 0 ? (
            <GalleryGrid images={images} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex size-16 items-center justify-center rounded-full border border-gold/30 bg-gold-subtle text-gold">
                <Camera className="size-8" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Images coming soon
              </h2>
              <p className="max-w-md text-muted-foreground">
                We are compiling a gallery of the project. Check back shortly
                for project views and floor plans.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
