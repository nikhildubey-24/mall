"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Download,
  Expand,
  Minimize,
  RotateCcw,
  Plus,
  Minus,
  Move,
  MessageSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FloorPlan {
  id: string
  name: string
  description: string
  image: string
}

interface PlanViewerProps {
  floor: FloorPlan
}

const MIN_SCALE = 0.5
const MAX_SCALE = 4
const STEP = 0.25

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

export function PlanViewer({ floor }: PlanViewerProps) {
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const originTranslateRef = useRef({ x: 0, y: 0 })
  const pinchRef = useRef<{
    distance: number
    scale: number
    translate: { x: number; y: number }
  } | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReducedMotion(prefersReducedMotion())
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const resetView = useCallback(() => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  const zoomTo = useCallback((next: number) => {
    setScale((prevScale) => {
      const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next))
      setTranslate((prev) => {
        const rect = containerRef.current?.getBoundingClientRect()
        const cx = rect ? rect.width / 2 : 0
        const cy = rect ? rect.height / 2 : 0
        const ratio = clamped / prevScale
        const tx = cx - (cx - prev.x) * ratio
        const ty = cy - (cy - prev.y) * ratio
        return { x: tx, y: ty }
      })
      return clamped
    })
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      wrapperRef.current
        ?.requestFullscreen?.()
        .then(() => setIsFullscreen(true))
        .catch(() => {})
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }, [])

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -STEP : STEP
        setScale((s) => {
          const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta))
          setTranslate((prev) => {
            const rect = containerRef.current?.getBoundingClientRect()
            const cx = e.clientX - (rect ? rect.left : 0)
            const cy = e.clientY - (rect ? rect.top : 0)
            const ratio = next / s
            return {
              x: cx - (cx - prev.x) * ratio,
              y: cy - (cy - prev.y) * ratio,
            }
          })
          return next
        })
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  const getPointerDistance = (pts: Map<number, { x: number; y: number }>) => {
    const values = Array.from(pts.values())
    if (values.length < 2) return 0
    const dx = values[0].x - values[1].x
    const dy = values[0].y - values[1].y
    return Math.sqrt(dx * dx + dy * dy)
  }

  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map())

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointersRef.current.size === 1) {
      dragStartRef.current = { x: e.clientX, y: e.clientY }
      originTranslateRef.current = translate
      setIsDragging(true)
    } else if (pointersRef.current.size === 2) {
      setIsDragging(false)
      dragStartRef.current = null
      pinchRef.current = {
        distance: getPointerDistance(pointersRef.current),
        scale,
        translate,
      }
    }
  }, [translate, scale])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!pointersRef.current.has(e.pointerId)) return
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const distance = getPointerDistance(pointersRef.current)
      const { scale: startScale, translate: startTranslate } = pinchRef.current
      const ratio = distance / (pinchRef.current.distance || 1)
      const next = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, startScale * ratio)
      )
      setScale(next)
      setTranslate(startTranslate)
      return
    }

    if (dragStartRef.current && pointersRef.current.size === 1) {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      setTranslate({
        x: originTranslateRef.current.x + dx,
        y: originTranslateRef.current.y + dy,
      })
    }
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    pointersRef.current.delete(e.pointerId)
    if (pointersRef.current.size < 2) {
      pinchRef.current = null
    }
    if (pointersRef.current.size === 0) {
      dragStartRef.current = null
      setIsDragging(false)
    }
  }, [])

  const transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`

  return (
    <div
      ref={wrapperRef}
      className="overflow-hidden rounded-2xl border border-border bg-surface-darker shadow-premium-lg"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-surface-card px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{floor.name}</span>
          <span className="hidden rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold sm:inline-flex">
            {Math.round(scale * 100)}%
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <ViewerButton
            onClick={() => zoomTo(scale - STEP)}
            label="Zoom out"
            disabled={scale <= MIN_SCALE}
          >
            <Minus className="size-4" aria-hidden="true" />
          </ViewerButton>
          <ViewerButton onClick={resetView} label="Reset view">
            <RotateCcw className="size-4" aria-hidden="true" />
          </ViewerButton>
          <ViewerButton
            onClick={() => zoomTo(scale + STEP)}
            label="Zoom in"
            disabled={scale >= MAX_SCALE}
          >
            <Plus className="size-4" aria-hidden="true" />
          </ViewerButton>
          <ViewerButton onClick={toggleFullscreen} label="Toggle fullscreen">
            {isFullscreen ? (
              <Minimize className="size-4" aria-hidden="true" />
            ) : (
              <Expand className="size-4" aria-hidden="true" />
            )}
          </ViewerButton>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cn(
          "relative h-[60vh] min-h-[28rem] w-full cursor-grab touch-none select-none overflow-hidden",
          isDragging && "cursor-grabbing"
        )}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform,
            transition: reducedMotion
              ? "none"
              : "transform 150ms ease-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={floor.image}
            alt={`${floor.name} architectural plan`}
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
          <Move className="size-3.5" aria-hidden="true" />
          Drag to pan · Scroll to zoom
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-border/60 bg-surface-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/70">{floor.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
          >
            <a
              href={floor.image}
              download
              target="_blank"
              rel="noreferrer"
            >
              <Download className="size-4" aria-hidden="true" />
              View Full Plan
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-gold text-gold-foreground hover:bg-gold/90"
          >
            <Link href="/enquiry">
              <MessageSquare className="size-4" aria-hidden="true" />
              Enquire
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function ViewerButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {children}
    </button>
  )
}
