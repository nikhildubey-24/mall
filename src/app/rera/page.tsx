import type { Metadata } from "next";
import Image from "next/image";
import {
  ShieldCheck,
  ExternalLink,
  Download,
  BadgeCheck,
  MapPin,
  Building2,
  User,
  FileCheck2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { BASE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RERA Registration",
  description:
    "Acropolis The Mall is a CG-RERA registered commercial development. Registration No. PCGRERA030826002133. Verify RERA registration and download the certificate.",
  openGraph: {
    title: "RERA Registration | Acropolis The Mall, Bilaspur",
    description:
      "Acropolis The Mall is a CG-RERA registered commercial development. Registration No. PCGRERA030826002133. Verify RERA registration and download the certificate.",
    url: `${BASE_URL}/rera`,
  },
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatRegDate(date: Date | string): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  return `${day} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

const FALLBACK_REGISTRATION = {
  registrationNumber: "PCGRERA030826002133",
  registrationDate: new Date("2026-08-03"),
  validUntil: new Date("2031-07-06"),
  verificationUrl: "https://rera.cgstate.gov.in",
  projectName: "ACROPOLIS THE MALL (COMMERCIAL)",
  promoter: "YUVRAJ ENTERPRISES",
  registeredOffice: "H-2/75, Ring Road, Narmada Nagar, Bilaspur, Chhattisgarh",
};

export default async function ReraPage() {
  const dbRegistration = await prisma.reraRegistration.findFirst({
    include: { project: true },
  });

  const registration = dbRegistration
    ? {
        registrationNumber: dbRegistration.registrationNumber,
        registrationDate: dbRegistration.registrationDate,
        validUntil: dbRegistration.validUntil,
        verificationUrl: dbRegistration.verificationUrl,
        projectName: dbRegistration.project.name,
        promoter: dbRegistration.project.promoter,
        registeredOffice: FALLBACK_REGISTRATION.registeredOffice,
      }
    : FALLBACK_REGISTRATION;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface-card px-4 py-1.5 text-sm font-medium text-gold">
              <BadgeCheck className="size-4" aria-hidden="true" />
              Trust &amp; Compliance
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              RERA <span className="text-gold">Registration</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              Acropolis The Mall is a CG-RERA registered commercial
              development, offering complete transparency and buyer
              confidence.
            </p>
          </div>
        </div>
      </section>

      {/* RERA Badge + Details */}
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Badge / Plate */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-3xl border-2 border-gold/50 bg-surface-dark p-8 text-center shadow-premium-gold sm:p-10">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/15 via-transparent to-transparent" />
                <div className="relative">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gold text-gold-foreground shadow-premium-gold">
                    <ShieldCheck className="size-9" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                    Government of Chhattisgarh
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-wide text-white sm:text-3xl">
                    CG-RERA REGISTERED
                  </p>
                  <p className="mt-6 text-xs font-medium uppercase tracking-wider text-white/50">
                    Registration No.
                  </p>
                  <p className="mt-1 font-mono text-lg font-semibold tracking-wider text-gold sm:text-xl">
                    {registration.registrationNumber}
                  </p>

                  <Button
                    asChild
                    size="lg"
                    className="mt-8 w-full bg-gold text-gold-foreground hover:bg-gold/90"
                  >
                    <a
                      href={registration.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Verify RERA Registration
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-premium-md sm:p-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      Project
                    </p>
                    <p className="mt-1 flex items-start gap-2 text-lg font-medium text-foreground">
                      <Building2
                        className="mt-1 size-5 shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      {registration.projectName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      Registration No.
                    </p>
                    <p className="mt-1 font-mono text-lg font-semibold text-foreground">
                      {registration.registrationNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      Promoter
                    </p>
                    <p className="mt-1 flex items-start gap-2 text-lg font-medium text-foreground">
                      <User
                        className="mt-1 size-5 shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      {registration.promoter}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      Valid From
                    </p>
                    <p className="mt-1 text-lg font-medium text-foreground">
                      {formatRegDate(registration.registrationDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      Valid Upto
                    </p>
                    <p className="mt-1 text-lg font-medium text-foreground">
                      {formatRegDate(registration.validUntil)}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      Registered Office
                    </p>
                    <p className="mt-1 flex items-start gap-2 text-lg font-medium text-foreground">
                      <MapPin
                        className="mt-1 size-5 shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      {registration.registeredOffice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate */}
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              RERA Approval Certificate
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              View Certificate
            </h2>
            <p className="mt-4 text-white/70">
              Download the official RERA approval certificate for Acropolis
              The Mall issued by the Chhattisgarh Real Estate Regulatory
              Authority.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="overflow-hidden rounded-3xl border border-gold/30 bg-surface-dark p-3 shadow-premium-lg sm:p-4">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/rera-certificate.png"
                  alt="RERA approval certificate for Acropolis The Mall"
                  width={1200}
                  height={900}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto"
              >
                <a href="/documents/rera-approval-certificate.pdf" download>
                  <Download className="size-4" aria-hidden="true" />
                  Download Certificate (PDF)
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <a
                  href={registration.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileCheck2 className="size-4 text-gold" aria-hidden="true" />
                  Verify on RERA Portal
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
