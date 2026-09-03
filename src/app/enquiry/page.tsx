import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { EnquiryForm } from "@/components/enquiry/enquiry-form";
import { getSiteSettings } from "@/lib/settings";
import { BASE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enquire Now",
  description:
    "Tell us about the commercial space you're looking for at Acropolis The Mall, Chantidih, Bilaspur, Chhattisgarh and our team will get back to you.",
  openGraph: {
    title: "Enquire Now | Acropolis The Mall, Bilaspur",
    description:
      "Tell us about the commercial space you're looking for at Acropolis The Mall, Chantidih, Bilaspur, Chhattisgarh and our team will get back to you.",
    url: `${BASE_URL}/enquiry`,
  },
};

export default async function EnquiryPage() {
  const settings = await getSiteSettings();
  const hasContact =
    Boolean(settings.phone) || Boolean(settings.whatsapp) || Boolean(settings.email);

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
              Enquire <span className="text-gold">Now</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              Tell us about the space you&apos;re looking for and our team will
              get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Get in Touch
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Book Your Visit Today
            </h2>
          </div>

          <div className="mx-auto mt-14 max-w-xl">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-lg sm:p-8">
              <EnquiryForm />
            </div>

            {/* Contact fallback */}
            <div className="mt-8 rounded-2xl border border-gold/25 bg-gold-subtle p-6 text-center shadow-premium-md">
              {hasContact ? (
                <>
                  <p className="text-sm font-medium text-gold-muted-foreground">
                    Prefer to talk directly? Reach us at:
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                    {settings.phone && (
                      <a
                        href={`tel:${settings.phone}`}
                        className="inline-flex items-center gap-2 text-base font-semibold text-gold-foreground transition hover:text-gold"
                      >
                        <Phone className="size-4" aria-hidden="true" />
                        {settings.phone}
                      </a>
                    )}
                    {settings.whatsapp && (
                      <a
                        href={`https://wa.me/${settings.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-base font-semibold text-gold-foreground transition hover:text-gold"
                      >
                        <MessageCircle className="size-4" aria-hidden="true" />
                        WhatsApp
                      </a>
                    )}
                    {settings.email && (
                      <a
                        href={`mailto:${settings.email}`}
                        className="inline-flex items-center gap-2 text-base font-semibold text-gold-foreground transition hover:text-gold"
                      >
                        <Mail className="size-4" aria-hidden="true" />
                        {settings.email}
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm font-medium text-gold-muted-foreground">
                  Prefer to talk? Our team is happy to help — or contact us
                  directly and we&apos;ll get back to you.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}