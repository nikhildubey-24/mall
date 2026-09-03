import { MapPin } from "lucide-react";

import { getSiteSettings } from "@/lib/settings";

const DEFAULT_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  "P.H.N. 33, Village Chantidih, Tehsil Bilaspur, Chhattisgarh"
)}&t=m&z=15&output=embed&iwloc=near`;

export async function MapEmbed({
  title = "Map location",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const settings = await getSiteSettings();
  const embedUrl = settings.mapUrl || DEFAULT_EMBED_URL;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface-card shadow-premium-xl ${className}`}
    >
      {embedUrl ? (
        <div className="relative aspect-video w-full">
          <iframe
            src={embedUrl}
            title={title}
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
            <p className="max-w-md">The map is not available right now.</p>
          </div>
        </div>
      )}
    </div>
  );
}
