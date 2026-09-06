"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobileNav, NAV_ITEMS } from "@/components/layout/mobile-nav"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-widest transition-opacity hover:opacity-80"
        >
          <span className="text-gold">◆</span>
          <span className="bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">
            ACROPOLIS
          </span>
        </Link>

        {/* Desktop nav - center */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  active
                    ? "text-gold bg-gold/10"
                    : "text-foreground/70 hover:text-gold hover:bg-white/5"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-1 -bottom-[1px] h-0.5 rounded-full bg-gold" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA - right */}
        <div className="hidden md:block">
          <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-[0_0_12px_rgba(212,175,55,0.25)]">
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
