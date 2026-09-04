import type { Metadata } from "next";
import {
  Building2,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { MapEmbed } from "@/components/contact/map-embed";
import { EnquiryForm } from "@/components/enquiry/enquiry-form";
import { getSiteSettings } from "@/lib/settings";
import { BASE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Acropolis The Mall at Chantidih, Bilaspur, Chhattisgarh. Contact our team through the enquiry form or reach us by phone, WhatsApp or email.",
  openGraph: {
    title: "Contact Us | Acropolis The Mall, Bilaspur",
    description:
      "Get in touch with Acropolis The Mall at Chantidih, Bilaspur, Chhattisgarh. Contact our team through the enquiry form or reach us by phone, WhatsApp or email.",
    url: `${BASE_URL}/contact`,
  },
};

const PROJECT_ADDRESS =
  "Near Ashok Nagar Chowk, Chatidih Road, Bilaspur, Chhattisgarh";
const LOCATION = "Chantidih Road, Bilaspur";
const PROMOTER = "YUVRAJ ENTERPRISES";
const REGISTERED_OFFICE =
  "H-2/75, Ring Road, Narmada Nagar, Bilaspur, Chhattisgarh";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface-card px-4 py-1.5 text-sm font-medium text-gold">
              <MapPin className="size-4" aria-hidden="true" />
              {LOCATION}
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Contact <span className="text-gold">Us</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              We&apos;d love to hear from you. Reach out through the enquiry
              form or contact information below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            {/* Left: details + map */}
            <div className="flex flex-col gap-8">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-premium-lg">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Contact Details
                </h2>

                <dl className="mt-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Building2 className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-wider text-gold">
                        Project Address
                      </dt>
                      <dd className="mt-1 leading-relaxed text-muted-foreground">
                        {PROJECT_ADDRESS}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-wider text-gold">
                        Location
                      </dt>
                      <dd className="mt-1 leading-relaxed text-muted-foreground">
                        {LOCATION}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Home className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-wider text-gold">
                        Promoter
                      </dt>
                      <dd className="mt-1 font-medium text-foreground">
                        {PROMOTER}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Building2 className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-wider text-gold">
                        Registered Office
                      </dt>
                      <dd className="mt-1 leading-relaxed text-muted-foreground">
                        {REGISTERED_OFFICE}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Phone className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-wider text-gold">
                        Phone
                      </dt>
                      <dd className="mt-1">
                        {settings.phone ? (
                          <a
                            href={`tel:${settings.phone}`}
                            className="font-medium text-foreground transition hover:text-gold"
                          >
                            {settings.phone}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <MessageCircle className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-wider text-gold">
                        WhatsApp
                      </dt>
                      <dd className="mt-1">
                        {settings.whatsapp ? (
                          <a
                            href={`https://wa.me/${settings.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-foreground transition hover:text-gold"
                          >
                            {settings.whatsapp}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Mail className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-wider text-gold">
                        Email
                      </dt>
                      <dd className="mt-1">
                        {settings.email ? (
                          <a
                            href={`mailto:${settings.email}`}
                            className="font-medium text-foreground transition hover:text-gold"
                          >
                            {settings.email}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </dd>
                    </div>
                  </div>
                </dl>

                {!settings.phone && !settings.whatsapp && !settings.email && (
                  <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
                    Contact details will be updated here.
                  </p>
                )}
              </div>

              <MapEmbed title={`Map showing ${PROJECT_ADDRESS}`} />
            </div>

            {/* Right: enquiry form */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-lg sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Send an Enquiry
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in the form and our team will get back to you.
              </p>
              <div className="mt-8">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
