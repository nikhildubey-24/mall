"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobileNav, NAV_ITEMS } from "@/components/layout/mobile-nav"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-widest transition-opacity hover:opacity-80"
        >
          <span className="text-gold">◆</span>
          ACROPOLIS
        </Link>

        {/* Desktop nav - center */}
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold",
                  active ? "text-gold" : "text-foreground/80"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA - right */}
        <div className="hidden md:block">
          <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Link href="/enquiry">Enquire Now</Link>
          </Button>
        </div>

        {/* Mobile hamburger - right */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
