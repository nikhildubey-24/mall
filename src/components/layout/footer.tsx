import Link from "next/link"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Commercial Spaces", href: "/spaces" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Amenities", href: "/amenities" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "RERA", href: "/rera" },
  { label: "Contact", href: "/contact" },
] as const

const ADDRESS = "Near Ashok Nagar Chowk, Chatidih Road, Bilaspur, Chhattisgarh"
const RERA_NUMBER = "CG-RERA Registration No.: PCGRERA030826002133"
const RERA_VERIFY_URL = "https://rera.cgstate.gov.in"
const PROMOTER = "YUVRAJ ENTERPRISES"

export function Footer() {
  return (
    <footer className="mt-auto bg-surface-dark text-white/90">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block text-xl font-semibold tracking-widest text-gold transition-opacity hover:opacity-80"
            >
              ◆ ACROPOLIS THE MALL
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              A Modern Commercial Destination in Bilaspur
            </p>
            <p className="text-sm leading-relaxed text-white/60">{ADDRESS}</p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/60 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <p>{ADDRESS}</p>
              <p className="font-medium text-white/80">{PROMOTER}</p>
              {/* TODO: wire phone/whatsapp/email to site settings when available */}
              <p>Contact our team for details</p>
            </div>
          </div>

          {/* Col 4: RERA */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              RERA Registered
            </h3>
            <div className="rounded-lg border border-gold/20 bg-surface-card p-4">
              <p className="text-xs leading-relaxed text-white/70">
                {RERA_NUMBER}
              </p>
            </div>
            <a
              href={RERA_VERIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-gold transition-opacity hover:opacity-80"
            >
              Verify RERA →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/40">
            © 2026 Acropolis The Mall. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white/70"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-white/70"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
