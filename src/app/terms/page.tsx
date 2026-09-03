import type { Metadata } from "next";
import { FileText, Scale } from "lucide-react";

import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for Acropolis The Mall by Yuvraj Enterprises. Includes information accuracy disclaimer, RERA compliance, enquiry usage and governing law.",
  openGraph: {
    title: "Terms & Conditions | Acropolis The Mall, Bilaspur",
    description:
      "Terms and Conditions for Acropolis The Mall by Yuvraj Enterprises. Includes information accuracy disclaimer, RERA compliance and governing law.",
    url: `${BASE_URL}/terms`,
  },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing and using this website, you acknowledge that you have read, understood and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.",
    ],
  },
  {
    title: "2. Information Accuracy Disclaimer",
    paragraphs: [
      "The information, plans, images and specifications on this website are provided for general information and indicative purposes only. They do not constitute an offer, a contract or any form of investment or financial advice.",
      "Project details, specifications and availability are subject to change without prior notice. While we strive to keep the information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability or suitability of the information provided.",
      "Nothing on this website should be construed as investment advice. Prospective buyers should independently verify all information and seek professional legal and financial advice before making any purchase decision.",
    ],
  },
  {
    title: "3. RERA Compliance",
    paragraphs: [
      "Acropolis The Mall is a commercial project registered under the Real Estate (Regulation and Development) Act, 2016 with the Chhattisgarh RERA (Registration No. PCGRERA030826002133).",
      "In accordance with the Act, we encourage prospective allottees to verify the project details and the promoter's credentials on the official RERA website at https://rera.cgstate.gov.in. RERA registration does not constitute a recommendation or endorsement of the project by the authority.",
    ],
  },
  {
    title: "4. Use of the Enquiry Form",
    paragraphs: [
      "By submitting the enquiry form on this website, you consent to being contacted by our team regarding Acropolis The Mall. You agree to provide accurate and current information in your enquiry.",
      "The information submitted through the enquiry form is used solely to address your query and is handled in accordance with our Privacy Policy.",
    ],
  },
  {
    title: "5. Intellectual Property",
    paragraphs: [
      "All content on this website, including text, graphics, logos, images, layouts and design, is the property of Yuvraj Enterprises and is protected by applicable intellectual property laws. You may not reproduce, distribute or use any content from this website for commercial purposes without prior written consent.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, Yuvraj Enterprises and its associates shall not be liable for any loss or damage, including without limitation indirect or consequential loss, arising out of or in connection with the use of this website or reliance on any information provided herein.",
    ],
  },
  {
    title: "7. Governing Law",
    paragraphs: [
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms or the use of this website shall be subject to the exclusive jurisdiction of the courts of Bilaspur, Chhattisgarh.",
    ],
  },
  {
    title: "8. Contact Us",
    paragraphs: [
      "For any questions regarding these Terms and Conditions, please contact Yuvraj Enterprises at H-2/75, Ring Road, Narmada Nagar, Bilaspur, Chhattisgarh.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface-card px-4 py-1.5 text-sm font-medium text-gold">
              <FileText className="size-4" aria-hidden="true" />
              Terms &amp; Conditions
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Terms &amp; <span className="text-gold">Conditions</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              The terms governing your use of the Acropolis The Mall website and
              its services.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-premium-md sm:p-10">
            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold tracking-tight text-gold">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-foreground/80">
                    {section.paragraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* RERA note */}
            <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-gold/30 bg-gold-subtle p-6 shadow-premium-md sm:flex-row sm:items-center sm:p-8">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground shadow-premium-gold">
                <Scale className="size-8" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gold-foreground">
                  RERA Disclaimer
                </p>
                <p className="mt-1 text-sm text-gold-muted-foreground">
                  Please verify all project details on the official RERA portal
                  at https://rera.cgstate.gov.in. RERA registration number:
                  PCGRERA030826002133.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
