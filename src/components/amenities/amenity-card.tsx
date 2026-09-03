import type { LucideIcon } from "lucide-react";

interface AmenityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function AmenityCard({ icon: Icon, title, description }: AmenityCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 shadow-premium-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg hover:border-gold/30">
      <div className="flex size-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold/20">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
