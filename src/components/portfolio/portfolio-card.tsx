import { Building2, MapPin } from "lucide-react";

interface PortfolioCardProps {
  name: string;
  category: string;
  location: string;
  description: string | null;
  imageUrl: string | null;
}

export function PortfolioCard({
  name,
  category,
  location,
  description,
  imageUrl,
}: PortfolioCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg hover:border-gold/30">
      {/* Image / Placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-card">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-card to-surface-darker">
            <div className="flex flex-col items-center gap-3 text-gold/40">
              <Building2 className="size-12" aria-hidden="true" />
              <span className="text-4xl font-bold tracking-tight text-gold/20">
                {name.charAt(0)}
              </span>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold-subtle px-3 py-1 text-xs font-semibold text-gold">
          {category}
        </span>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
          {name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {location}
        </div>

        {description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
