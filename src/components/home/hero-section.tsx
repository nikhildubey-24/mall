import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/ui/animated-section"
import { MapPin, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero_section.png"
        alt="Acropolis The Mall — commercial destination in Bilaspur"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Location badge */}
          <AnimatedSection delay={100}>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/30 px-4 py-1.5 text-sm font-medium text-gold backdrop-blur-sm">
              <MapPin className="size-4" aria-hidden="true" />
              Chantidih Road, Bilaspur, Chhattisgarh
            </div>
          </AnimatedSection>

          <AnimatedSection delay={250}>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              ACROPOLIS{" "}
              <span className="text-gold">THE MALL</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl md:text-2xl">
              A Modern Commercial Destination in Bilaspur
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection delay={550}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link href="/spaces">
                  Explore Commercial Spaces
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
              >
                <Link href="/enquiry">Enquire Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/location">View Location</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
