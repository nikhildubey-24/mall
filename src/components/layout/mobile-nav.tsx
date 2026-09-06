"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Project", href: "/about" },
  { label: "Spaces", href: "/spaces" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Features", href: "/amenities" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "RERA", href: "/rera" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const

// NOTE: Phone / WhatsApp numbers are not configured yet. These will be wired
// to site settings in a later task. Until then, use safe placeholders.
const CONTACT_DETAILS = {
  phone: "#", // TODO: wire to settings
  whatsapp: "#", // TODO: wire to settings
}

function NavLink({
  href,
  label,
  onNavigate,
  className,
}: {
  href: string
  label: string
  onNavigate?: () => void
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "text-sm font-medium transition-colors hover:text-gold",
        className
      )}
    >
      {label}
    </Link>
  )
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="md:hidden"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 sm:max-w-sm border-white/10 bg-background/80 backdrop-blur-xl">
        <SheetHeader>
          <SheetTitle className="text-gold tracking-widest text-lg flex items-center gap-2">
            <span className="text-gold">◆</span>
            ACROPOLIS
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4" aria-label="Mobile primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                onNavigate={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5",
                  active
                    ? "bg-gold-subtle text-gold"
                    : "hover:bg-accent"
                )}
              />
            )
          })}
        </nav>

        <SheetFooter className="border-t pt-4">
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="justify-start">
              <NavLink href={CONTACT_DETAILS.phone} label="Call Us" />
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <NavLink href={CONTACT_DETAILS.whatsapp} label="WhatsApp" />
            </Button>
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link href="/enquiry" onClick={() => setOpen(false)}>
                Enquire Now
              </Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
