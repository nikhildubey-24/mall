import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-surface-darker">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-gold/25 bg-gradient-to-r from-surface-dark via-surface-card to-surface-dark p-10 text-center shadow-premium-lg sm:p-14 lg:flex-row lg:text-left">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Interested in Commercial Spaces?
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Speak with our team about availability, configurations and pricing
              for your next commercial venture.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link href="/enquiry">
                Enquire Now
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            >
              <Link href="/floor-plans">View Floor Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
