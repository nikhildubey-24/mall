import type { Metadata } from "next";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://acropolismall.info";

export const baseMetadata: Partial<Metadata> = {
  title: {
    template: "%s | Acropolis The Mall, Bilaspur",
    default: "Acropolis The Mall | Commercial Spaces in Bilaspur, Chhattisgarh",
  },
  description:
    "Explore Acropolis The Mall, a RERA-registered commercial development at Chantidih, Bilaspur, Chhattisgarh. View commercial spaces, floor plans, project features and enquire about available spaces.",
  openGraph: {
    siteName: "Acropolis The Mall",
    locale: "en_IN",
    type: "website",
  },
};

export function jsonLdLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "YUVRAJ ENTERPRISES",
    address: {
      "@type": "PostalAddress",
      streetAddress: "H-2/75, Ring Road, Narmada Nagar",
      addressLocality: "Bilaspur",
      addressRegion: "Chhattisgarh",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Bilaspur",
    },
  };
}

export function jsonLdRealEstateProject() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateProject",
    name: "ACROPOLIS THE MALL (COMMERCIAL)",
    description:
      "A RERA-registered commercial development at Chantidih, Bilaspur, Chhattisgarh featuring commercial shops, restaurant space, recreational area and open terrace sitting.",
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "P.H.N. 33, Village Chantidih",
      addressLocality: "Bilaspur",
      addressRegion: "Chhattisgarh",
      addressCountry: "IN",
    },
    provider: {
      "@type": "Organization",
      name: "YUVRAJ ENTERPRISES",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/enquiry`,
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "RERA Registration Number",
        value: "PCGRERA030826002133",
      },
      {
        "@type": "PropertyValue",
        name: "RERA Verification",
        value: "https://rera.cgstate.gov.in",
      },
    ],
  };
}
