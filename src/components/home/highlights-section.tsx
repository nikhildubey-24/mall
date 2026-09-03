import {
  Store,
  MapPin,
  Road,
  DoorOpen,
  ParkingCircle,
  MoveVertical,
  Gamepad2,
  Utensils,
  Sun,
  Users,
  LayoutGrid,
  ShieldCheck,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"

const HIGHLIGHTS = [
  {
    icon: Store,
    title: "Commercial Shops",
    description: "Multiple shop configurations across floors.",
  },
  {
    icon: MapPin,
    title: "Strategic Location",
    description: "Located at Chantidih, Bilaspur, Chhattisgarh.",
  },
  {
    icon: Road,
    title: "24 m Wide Front Road",
    description: "A wide front road shown in the ground-floor plan.",
  },
  {
    icon: DoorOpen,
    title: "Entrance Foyer",
    description: "Dedicated entrance foyer space in the ground-floor plan.",
  },
  {
    icon: ParkingCircle,
    title: "Basement Access",
    description: "Ramp access for the first basement shown on the plan.",
  },
  {
    icon: MoveVertical,
    title: "Multiple Lifts",
    description: "Lift locations shown across the architectural plans.",
  },
  {
    icon: Gamepad2,
    title: "Recreational / Play Area",
    description: "A recreational cum play area identified in the plan.",
  },
  {
    icon: Utensils,
    title: "Open Restaurant Area",
    description: "An open restaurant area shown in the ground-floor plan.",
  },
  {
    icon: Sun,
    title: "Open Terrace Sitting",
    description: "A terrace sitting area on the upper floors.",
  },
  {
    icon: Users,
    title: "Male & Female Toilets",
    description: "Separate male and female toilet areas.",
  },
  {
    icon: LayoutGrid,
    title: "Multiple Shop Configurations",
    description: "Various shop sizes across the floor plans.",
  },
  {
    icon: ShieldCheck,
    title: "RERA Registered Project",
    description: "CG-RERA registration PCGRERA030826002133.",
  },
] as const

export function HighlightsSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Project Highlights
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Designed for Commerce, Built for You
            </h2>
            <p className="mt-4 text-muted-foreground">
              A thoughtfully planned commercial development with the facilities and
              configurations modern businesses need.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, title, description }, i) => (
            <AnimatedSection key={title} delay={i * 80}>
              <Card
                className="gap-4 transition-shadow duration-300 hover:shadow-premium-lg"
              >
                <CardHeader className="px-6 pt-6">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-gold-subtle text-gold">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription className="mt-2 leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
