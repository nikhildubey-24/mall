import { Store } from "lucide-react"

interface ShopGridProps {
  dimensions: readonly string[]
  label?: string
  variant?: "light" | "dark"
}

export function ShopGrid({
  dimensions,
  label = "Shop",
  variant = "light",
}: ShopGridProps) {
  const isDark = variant === "dark"

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {dimensions.map((dimension) => (
        <div
          key={dimension}
          className={
            isDark
              ? "flex flex-col gap-4 rounded-xl border border-gold/20 bg-surface-card p-5 shadow-premium-sm transition-shadow duration-300 hover:shadow-premium-lg"
              : "flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-premium-sm transition-shadow duration-300 hover:shadow-premium-lg"
          }
        >
          <div className="flex items-center gap-3">
            <span
              className={
                isDark
                  ? "flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-gold"
                  : "flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold-subtle text-gold"
              }
            >
              <Store className="size-5" aria-hidden="true" />
            </span>
            <span
              className={
                isDark
                  ? "text-sm font-semibold uppercase tracking-wider text-gold"
                  : "text-sm font-semibold uppercase tracking-wider text-gold-muted-foreground"
              }
            >
              {label}
            </span>
          </div>
          <span
            className={
              isDark
                ? "text-xl font-semibold tracking-tight text-white sm:text-2xl"
                : "text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            }
          >
            {dimension}
          </span>
        </div>
      ))}
    </div>
  )
}