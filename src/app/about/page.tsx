import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  MapPin,
  ExternalLink,
  ArrowRight,
  UserRound,
} from "lucide-react";
import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Acropolis The Mall, a RERA-registered (PCGRERA030826002133) commercial development at Chantidih, Bilaspur, Chhattisgarh promoted by Yuvraj Enterprises.",
  openGraph: {
    title: "About Acropolis The Mall | Commercial Spaces in Bilaspur",
    description:
      "Learn about Acropolis The Mall, a RERA-registered commercial development at Chantidih, Bilaspur, Chhattisgarh promoted by Yuvraj Enterprises.",
    url: `${BASE_URL}/about`,
  },
};

const quickFacts = [
  {
    label: "Promoter",
    value: "YUVRAJ ENTERPRISES",
  },
  {
    label: "Registered Office",
    value: "H-2/75, Ring Road, Narmada Nagar, Bilaspur, Chhattisgarh",
  },
  {
    label: "Constructed Area",
    value: "≈ 2,25,000 sq ft",
  },
  {
    label: "Location",
    value: "Near Ashok Nagar Chowk, Chatidih Road, Bilaspur, Chhattisgarh",
  },
  {
    label: "RERA Registered",
    value: "PCGRERA030826002133",
  },
];

const directors = [
  {
    name: "Mr. Santosh Gupta",
    role: "Director",
    image: "/images/SantoshGupta.jpeg",
    width: 1068,
    height: 1600,
  },
  {
    name: "Mr. Sahil Gupta",
    role: "Director",
    image: "/images/sahilgupta.jpeg",
    width: 413,
    height: 531,
  },
  {
    name: "Mrs. Sudha Gupta",
    role: "Director",
    image: "/images/sudhagupta.jpeg",
    width: 413,
    height: 531,
    note: "Vice President, Bhartiya Janta Party, Bilaspur, Chhattisgarh",
  },
];

export default function AboutPage() {
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
              About <span className="text-gold">Acropolis The Mall</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              A RERA-registered commercial destination designed for the growth
              of Bilaspur and the surrounding region.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-surface-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
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
                  foyer space, basement ramp access, recreational/play area,
                  open restaurant area, lifts, toilets and open terrace sitting
                  space.
                </p>
                <p>
                  The ground-floor plan identifies a 24 m wide front road,
                  entrance foyer space, basement ramp access, open restaurant
                  area and recreational/play area.
                </p>
              </div>
            </div>

            {/* Image */}
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
              <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-40 w-40 rounded-2xl border-2 border-gold/40 lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Project at a Glance
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Quick Facts
            </h2>
          </div>

          <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm"
              >
                <dt className="text-sm font-semibold uppercase tracking-wider text-gold">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-lg font-medium text-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* RERA trust element */}
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-gold/30 bg-gold-subtle p-6 shadow-premium-md sm:flex-row sm:items-center sm:p-8">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground shadow-premium-gold">
                <ShieldCheck className="size-8" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-xl font-semibold text-gold-foreground">
                  CG-RERA Registered
                </p>
                <p className="mt-1 text-sm text-gold-muted-foreground">
                  Registration No. PCGRERA030826002133
                </p>
              </div>
              <a
                href="https://rera.cgstate.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gold/50 px-4 py-2 text-sm font-medium text-gold-foreground transition hover:bg-gold/20"
              >
                Verify RERA Registration
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="bg-surface-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Leadership
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Our Directors
            </h2>
            <p className="mt-4 text-white/70">
              The vision and dedication behind Acropolis The Mall.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
            {directors.map((director) => (
              <div
                key={director.name}
                className="group overflow-hidden rounded-2xl border border-border bg-surface-card shadow-premium-lg"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  <Image
                    src={director.image}
                    alt={director.name}
                    width={director.width}
                    height={director.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white">
                    {director.name}
                  </h3>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-gold">
                    <UserRound className="size-4" aria-hidden="true" />
                    {director.role}
                  </p>
                  {"note" in director && director.note ? (
                    <p className="mt-3 text-xs leading-relaxed text-white/60">
                      {director.note}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-darker">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-gold/25 bg-gradient-to-r from-surface-dark via-surface-card to-surface-dark p-10 text-center shadow-premium-lg sm:p-14 lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to Find Your Space?
              </h2>
              <p className="mt-3 max-w-xl text-white/70">
                Explore the available commercial spaces at Acropolis The Mall or
                speak with our team about your requirements.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-gold text-gold-foreground hover:bg-gold/90"
              >
                <Link href="/spaces">
                  Explore commercial spaces
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/enquiry">Enquire Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
