"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
      mql.addEventListener("change", cb)
      return () => mql.removeEventListener("change", cb)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  )
}

export function AnimatedSection({
  children,
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        reducedMotion
          ? "opacity-100 translate-y-0"
          : visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4",
        className,
      )}
      style={visible || reducedMotion ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
