import type { Metadata } from "next";
import Link from "next/link";
import {
  DoorOpen,
  Road,
  ArrowDownUp,
  Gamepad2,
  UtensilsCrossed,
  ArrowUpDown,
  Accessibility,
  Sun,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { AmenityCard } from "@/components/amenities/amenity-card";
import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Amenities & Features",
  description:
    "Explore the amenities and features at Acropolis The Mall, Chantidih, Bilaspur — including entrance foyer, wide front road, basement access, recreational area, restaurant space, lifts, toilets and open terrace sitting.",
  openGraph: {
    title: "Amenities & Features | Acropolis The Mall, Bilaspur",
    description:
      "Explore the amenities and features at Acropolis The Mall, Chantidih, Bilaspur — including entrance foyer, wide front road, basement access, recreational area, restaurant space, lifts, toilets and open terrace sitting.",
    url: `${BASE_URL}/amenities`,
  },
};

const amenities = [
  {
    icon: DoorOpen,
    title: "Entrance Foyer",
    description:
      "Dedicated entrance foyer space shown in the ground-floor plan.",
  },
  {
    icon: Road,
    title: "Wide Front Road",
    description:
      "A 24 m wide front road identified in the architectural drawing.",
  },
  {
    icon: ArrowDownUp,
    title: "Basement Access",
    description:
      "Ramp entry/exit for the first basement shown on the plan.",
  },
  {
    icon: Gamepad2,
    title: "Recreational & Play Area",
    description:
      "A recreational cum play area identified in the plan.",
  },
  {
    icon: UtensilsCrossed,
    title: "Open Restaurant Area",
    description:
      "An open restaurant area shown in the ground-floor plan.",
  },
  {
    icon: ArrowUpDown,
    title: "Lifts",
    description:
      "Multiple lift locations shown in the architectural plans.",
  },
  {
    icon: Accessibility,
    title: "Male & Female Toilets",
    description:
      "Separate male and female toilet areas shown in the plans.",
  },
  {
    icon: Sun,
    title: "Open Terrace Sitting",
    description:
      "An open terrace sitting area measuring 70' × 18' on the upper floors.",
  },
];

export default function AmenitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Amenities <span className="text-gold">&amp; Features</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              Designed to support businesses, visitors and daily operations.
            </p>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((amenity) => (
              <AmenityCard
                key={amenity.title}
                icon={amenity.icon}
                title={amenity.title}
                description={amenity.description}
              />
            ))}
          </div>

          <p className="mt-10 text-sm italic text-muted-foreground">
            Amenities and features are based on the architectural drawings
            provided for the project. For final specifications and availability,
            please contact the project team.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-darker">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-gold/25 bg-gradient-to-r from-surface-dark via-surface-card to-surface-dark p-10 text-center shadow-premium-lg sm:p-14 lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Interested in a Space?
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
