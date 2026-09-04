import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Ruler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlanTabs } from "@/components/floor-plans/plan-tabs";
import type { FloorPlan } from "@/components/floor-plans/plan-viewer";
import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Floor Plans",
  description:
    "Download and explore the architectural floor plans of Acropolis The Mall, Chantidih, Bilaspur, Chhattisgarh. View the ground, first and second floor layouts.",
  openGraph: {
    title: "Floor Plans | Acropolis The Mall, Bilaspur",
    description:
      "Download and explore the architectural floor plans of Acropolis The Mall, Chantidih, Bilaspur, Chhattisgarh. View the ground, first and second floor layouts.",
    url: `${BASE_URL}/floor-plans`,
  },
};

const floors: FloorPlan[] = [
  {
    id: "ground",
    name: "Ground Floor",
    description:
      "Ground floor plan with commercial shops, entrance foyer, basement ramp access, open restaurant area and recreational/play area.",
    image: "/images/floor-plans/ground-floor.png",
  },
  {
    id: "first",
    name: "First & Second Floor",
    description:
      "First and second floor layout with commercial shops, lifts, toilets and open terrace sitting area.",
    image: "/images/floor-plans/first-second.png",
  },
];

export default function FloorPlansPage() {
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
              Floor <span className="text-gold">Plans</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              Download and explore the architectural floor plans of the mall.
            </p>
          </div>
        </div>
      </section>

      {/* Viewer */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Interactive Viewer
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Explore the Floor Layouts
            </h2>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Ruler className="size-4" aria-hidden="true" />
              Select a floor, then zoom and pan to inspect the details.
            </p>
          </div>

          <div className="mt-14">
            <PlanTabs floors={floors} />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Use the controls to zoom, pan and view each plan in full screen, or
            download the high-resolution image.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-surface-dark py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm italic text-white/60">
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
                Have Questions About a Space?
              </h2>
              <p className="mt-3 max-w-xl text-white/70">
                Contact the project team for availability and commercial terms
                for the spaces on any floor.
              </p>
            </div>

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
          </div>
        </div>
      </section>
    </>
  );
}
