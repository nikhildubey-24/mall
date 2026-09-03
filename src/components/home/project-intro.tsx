import Image from "next/image"
import { AnimatedSection } from "@/components/ui/animated-section"

export function ProjectIntro() {
  return (
    <section className="bg-surface-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text (left) */}
          <AnimatedSection>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                About the Project
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                A New Address for Commercial Possibilities
              </h2>

              <div className="mt-6 space-y-4 text-white/75">
                <p>
                  Acropolis The Mall is a planned commercial development near
                  Chantidih Road, Bilaspur, designed with multiple commercial
                  spaces and supporting facilities.
                </p>
                <p>
                  The architectural plans include commercial shops, entrance
                  foyer space, basement ramp access, recreational/play area, open
                  restaurant area, lifts, toilets and open terrace sitting space.
                </p>
                <p>
                  The ground-floor plan identifies a 24 m wide front road,
                  entrance foyer space, basement ramp access, open restaurant
                  area and recreational/play area.
                </p>
              </div>

              {/* RERA trust badge */}
              <div className="mt-8 inline-flex items-start gap-3 rounded-xl border border-gold/30 bg-surface-card p-4">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold text-gold-foreground">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                    aria-hidden="true"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-gold">RERA Registered</p>
                  <p className="mt-1 text-sm text-white/70">
                    CG-RERA Registration No. PCGRERA030826002133
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Image (right) */}
          <AnimatedSection delay={150}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-premium-xl">
                <Image
                  src="/images/hero_section.png"
                  alt="Acropolis The Mall architectural plan"
                  width={951}
                  height={535}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Gold accent frame */}
              <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-40 w-40 rounded-2xl border-2 border-gold/40 lg:block" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
