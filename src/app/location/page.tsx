import type { Metadata } from "next";
import { MapPin, Navigation } from "lucide-react";

import { CopyAddress } from "@/components/location/copy-address";
import { getSiteSettings } from "@/lib/settings";
import { BASE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Location",
  description:
    "Find Acropolis The Mall at Near Ashok Nagar Chowk, Chatidih Road, Bilaspur, Chhattisgarh. Get directions and view the location on the map.",
  openGraph: {
    title: "Location | Acropolis The Mall, Bilaspur",
    description:
      "Find Acropolis The Mall at Near Ashok Nagar Chowk, Chatidih Road, Bilaspur, Chhattisgarh. Get directions and view the location on the map.",
    url: `${BASE_URL}/location`,
  },
};

const ADDRESS =
  "Near Ashok Nagar Chowk, Chatidih Road, Bilaspur, Chhattisgarh";

const MALL_COORDS = "22.0947208,82.1596756";

const DEFAULT_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  MALL_COORDS
)}&t=m&z=17&output=embed&iwloc=near`;

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MALL_COORDS
)}`;

export default async function LocationPage() {
  const settings = await getSiteSettings();
  const embedUrl = settings.mapUrl || DEFAULT_EMBED_URL;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface-card px-4 py-1.5 text-sm font-medium text-gold">
              <MapPin className="size-4" aria-hidden="true" />
              Chantidih Road, Bilaspur
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Location
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              {ADDRESS}
            </p>
          </div>
        </div>
      </section>

      {/* Map + Details */}
      <section className="bg-surface-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
            {/* Address card */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-surface-card to-surface-dark p-8 shadow-premium-lg">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground shadow-premium-gold">
                    <MapPin className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                      Our Address
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      Acropolis The Mall
                    </p>
                  </div>
                </div>

                <p className="mt-5 leading-relaxed text-white/80">{ADDRESS}</p>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground shadow-premium-gold transition hover:bg-gold/90"
                  >
                    <Navigation className="size-4" aria-hidden="true" />
                    Get Directions
                  </a>
                  <CopyAddress address={ADDRESS} />
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-border bg-surface-card shadow-premium-xl">
                {embedUrl ? (
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={embedUrl}
                      title={`Map showing ${ADDRESS}`}
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center p-10 text-center text-white/70">
                    <div className="flex flex-col items-center gap-4">
                      <MapPin className="size-10 text-gold" aria-hidden="true" />
                      <p className="max-w-md">
                        The map is not available right now. Please use the Get
                        Directions button to open our address in Google Maps.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}