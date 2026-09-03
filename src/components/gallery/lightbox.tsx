"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface GalleryImage {
  id: string
  category: string
  title: string
  imageUrl: string
  altText: string
  sortOrder: number
}

interface LightboxProps {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const touchStartRef = useRef<number | null>(null)

  useEffect(() => {
    if (index === null) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [index !== null]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (index === null) return
    const currentIndex = index

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft")
        onNavigate((currentIndex - 1 + images.length) % images.length)
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [index, images.length, onClose, onNavigate])

  const goPrev = useCallback(
    () => onNavigate((index! - 1 + images.length) % images.length),
    [index, images.length, onNavigate]
  )
  const goNext = useCallback(
    () => onNavigate((index! + 1) % images.length),
    [index, images.length, onNavigate]
  )

  if (index === null || images.length === 0) return null

  const image = images[index]
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-sm font-medium text-white/70">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 sm:px-16"
        onTouchStart={(e) => {
          touchStartRef.current = e.touches[0].clientX
          setTouchStart(e.touches[0].clientX)
        }}
        onTouchEnd={(e) => {
          const start = touchStartRef.current
          if (start === null) return
          const delta = e.changedTouches[0].clientX - start
          if (Math.abs(delta) > 50) {
            if (delta > 0) goPrev()
            else goNext()
          }
          touchStartRef.current = null
          setTouchStart(null)
        }}
      >
        <div
          className={cn(
            "relative h-full w-full max-w-5xl",
            !prefersReducedMotion && touchStart === null && "animate-scale-in"
          )}
        >
          <Image
            src={image.imageUrl}
            alt={image.altText}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-contain"
          />
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white/80 transition-colors hover:bg-black/60 hover:text-white sm:left-4"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white/80 transition-colors hover:bg-black/60 hover:text-white sm:right-4"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>

      {/* Caption */}
      <div className="px-6 pb-5 text-center">
        <p className="text-sm font-medium text-white">{image.title}</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-gold">
          {image.category}
        </p>
      </div>
    </div>
  )
}
