"use client"

import { useMemo, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Lightbox } from "@/components/gallery/lightbox"
import type { GalleryImage } from "@/components/gallery/lightbox"

interface GalleryGridProps {
  images: GalleryImage[]
}

const CATEGORIES = [
  "Project",
  "Architecture",
  "Floor Plans",
  "Commercial Spaces",
  "Location",
  "Portfolio",
]

export function GalleryGrid({ images }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const availableCategories = useMemo(
    () =>
      CATEGORIES.filter((category) =>
        images.some((image) => image.category === category)
      ),
    [images]
  )

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? images
        : images.filter((image) => image.category === activeCategory),
    [images, activeCategory]
  )

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {["All", ...availableCategories].map((category) => {
          const active = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-gold bg-gold text-gold-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-gold/40 hover:text-gold"
              )}
            >
              {category}
            </button>
          )
        })}
      </div>

      {/* Masonry grid */}
      {filtered.length > 0 ? (
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((image, gridIndex) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setLightboxIndex(gridIndex)}
              className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card text-left shadow-premium-sm transition-all duration-300 hover:shadow-premium-lg hover:border-gold/30"
            >
              <div className="relative w-full bg-surface-card">
                <Image
                  src={image.imageUrl}
                  alt={image.altText}
                  width={800}
                  height={600}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold-subtle px-3 py-1 text-xs font-semibold text-gold">
                  {image.category}
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">
                  {image.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">
          No images in this category yet.
        </p>
      )}

      {/* Lightbox */}
      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  )
}
