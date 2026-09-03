import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Factory, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { prisma } from "@/lib/prisma";
import { BASE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore the portfolio of commercial destinations developed by Yuvraj Enterprises, including retail outlets, commercial complexes and entertainment venues.",
  openGraph: {
    title: "Portfolio | Acropolis The Mall, Bilaspur",
    description:
      "Explore the portfolio of commercial destinations developed by Yuvraj Enterprises, including retail outlets, commercial complexes and entertainment venues.",
    url: `${BASE_URL}/portfolio`,
  },
};

const industrialBusinesses = [
  {
    icon: Factory,
    name: "Sahil Enterprises",
    description:
      "An industrial unit engaged in manufacturing and supply.",
  },
  {
    icon: Briefcase,
    name: "Agrahari Plastic Industries",
    description:
      "An industrial unit engaged in plastic manufacturing and allied supply.",
  },
];

export default async function PortfolioPage() {
  const items = await prisma.portfolioItem.findMany({
    orderBy: { name: "asc" },
    select: {
      name: true,
      category: true,
      location: true,
      description: true,
      imageUrl: true,
    },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Our <span className="text-gold">Portfolio</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              A selection of commercial destinations developed by the Promoter,
              Yuvraj Enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <PortfolioCard
                  key={item.name}
                  name={item.name}
                  category={item.category}
                  location={item.location}
                  description={item.description}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Portfolio items will be available soon.
            </p>
          )}
        </div>
      </section>

      {/* Industrial Business */}
      <section className="bg-surface-dark py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Industrial Division
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Industrial Business
            </h2>
            <p className="mt-4 text-white/70">
              The promoter group also operates industrial businesses engaged in
              manufacturing and supply.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {industrialBusinesses.map((biz) => (
              <div
                key={biz.name}
                className="group rounded-2xl border border-white/10 bg-surface-card p-6 shadow-premium-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg hover:border-gold/30"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold/20">
                  <biz.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                  {biz.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {biz.description}
                </p>
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
                Interested in Our Projects?
              </h2>
              <p className="mt-3 max-w-xl text-white/70">
                Speak with our team about commercial opportunities developed by
                Yuvraj Enterprises.
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
                <Link href="/about">About the Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
