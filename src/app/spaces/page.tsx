import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShopGrid } from "@/components/spaces/shop-grid";
import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Commercial Spaces",
  description:
    "Explore the commercial shop configurations at Acropolis The Mall, Chantidih, Bilaspur, Chhattisgarh, across the ground, first and second floors.",
  openGraph: {
    title: "Commercial Spaces | Acropolis The Mall, Bilaspur",
    description:
      "Explore the commercial shop configurations at Acropolis The Mall, Chantidih, Bilaspur, Chhattisgarh, across the ground, first and second floors.",    url: `${BASE_URL}/spaces`,
  },
};

const groundFloorDimensions = [
  "14'3\" × 38'0\"",
  "14'3\" × 38'0\"",
  "14'3\" × 38'0\"",
  "44'3\" × 13'0\"",
  "44'3\" × 13'0\"",
  "44'3\" × 13'0\"",
  "44'3\" × 13'0\"",
  "37'0\" × 13'0\"",
  "37'0\" × 13'0\"",
  "34'3\" × 13'0\"",
  "34'3\" × 13'0\"",
  "34'3\" × 13'0\"",
  "34'3\" × 13'0\"",
  "34'3\" × 13'0\"",
  "34'3\" × 13'0\"",
  "34'3\" × 14'0\"",
  "34'3\" × 17'3\"",
  "30'9\" × 13'0\"",
  "28'0\" × 13'0\"",
  "23'0\" × 13'0\"",
  "34'3\" × 13'0\"",
  "34'3\" × 13'0\"",
  "34'3\" × 14'0\"",
  "34'3\" × 21'0\"",
];

const upperFloorDimensions = [
  "36'3\" × 13'0\"",
  "33'3\" × 13'0\"",
  "29'0\" × 13'0\"",
  "26'3\" × 13'0\"",
  "26'3\" × 13'0\"",
  "30'3\" × 13'0\"",
  "30'3\" × 13'0\"",
  "26'3\" × 14'0\"",
  "26'3\" × 17'3\"",
  "24'9\" × 13'0\"",
  "20'0\" × 13'0\"",
  "20'0\" × 13'0\"",
  "30'3\" × 13'0\"",
  "30'3\" × 13'0\"",
  "30'3\" × 14'0\"",
  "30'3\" × 21'0\"",
  "36'3\" × 14'0\"",
  "44'3\" × 14'0\"",
  "36'3\" × 14'3\"",
  "36'3\" × 13'0\"",
  "36'3\" × 13'0\"",
  "36'3\" × 13'0\"",
  "30'3\" × 13'0\"",
  "30'3\" × 13'0\"",
];

export default function SpacesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface-card px-4 py-1.5 text-sm font-medium text-gold">
              <MapPin className="size-4" aria-hidden="true" />
              Chantidih, Bilaspur, Chhattisgarh
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Commercial <span className="text-gold">Spaces</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              Multiple shop configurations across the floors.
            </p>
          </div>
        </div>
      </section>

      {/* Ground Floor */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Ground Floor
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ground Floor Shop Configurations
            </h2>
          </div>

          <div className="mt-14">
            <ShopGrid dimensions={groundFloorDimensions} />
          </div>

          <p className="mt-10 text-sm text-muted-foreground">
            Illustrative shop configurations shown in the architectural plan.
          </p>
        </div>
      </section>

      {/* First Floor */}
      <section className="bg-surface-dark py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              First Floor
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              First Floor Shop Configurations
            </h2>
          </div>

          <div className="mt-14">
            <ShopGrid dimensions={upperFloorDimensions} variant="dark" />
          </div>

          <p className="mt-10 text-sm text-white/60">
            Illustrative shop configurations shown in the architectural plan.
          </p>
        </div>
      </section>

      {/* Second Floor */}
      <section className="bg-background py-20 text-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Second Floor
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Second Floor Shop Configurations
            </h2>
          </div>

          <div className="mt-14">
            <ShopGrid dimensions={upperFloorDimensions} />
          </div>

          <p className="mt-10 text-sm text-muted-foreground">
            Illustrative shop configurations shown in the architectural plan.
          </p>
        </div>
      </section>

      {/* Broader disclaimer */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm italic text-muted-foreground">
            Floor plans and dimensions are based on the architectural drawings
            provided for the project. For final specifications, availability and
            commercial terms, please contact the project team.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-darker">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-gold/25 bg-gradient-to-r from-surface-dark via-surface-card to-surface-dark p-10 text-center shadow-premium-lg sm:p-14 lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Interested in a Configuration?
              </h2>
              <p className="mt-3 max-w-xl text-white/70">
                Speak with our team about the commercial spaces at Acropolis The
                Mall and review the detailed floor plans.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-gold text-gold-foreground hover:bg-gold/90"
              >
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
    </>
  );
}
