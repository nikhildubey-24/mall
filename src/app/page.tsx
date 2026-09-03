import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectIntro } from "@/components/home/project-intro";
import { HighlightsSection } from "@/components/home/highlights-section";
import { CTASection } from "@/components/home/cta-section";
import {
  BASE_URL,
  jsonLdLocalBusiness,
  jsonLdRealEstateProject,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Acropolis The Mall — Commercial Spaces in Bilaspur, Chhattisgarh",
  description:
    "Explore Acropolis The Mall, a RERA-registered commercial development at Chantidih, Bilaspur, Chhattisgarh. View commercial spaces, floor plans, project features and enquire about available spaces.",
  openGraph: {
    title: "Acropolis The Mall — Commercial Spaces in Bilaspur, Chhattisgarh",
    description:
      "Explore Acropolis The Mall, a RERA-registered commercial development at Chantidih, Bilaspur, Chhattisgarh.",
    url: BASE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdLocalBusiness()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdRealEstateProject()),
        }}
      />
      <HeroSection />
      <ProjectIntro />
      <HighlightsSection />
      <CTASection />
    </>
  )
}
