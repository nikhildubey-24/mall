import type { Metadata } from "next";
import { Lock, Mail, ShieldCheck } from "lucide-react";

import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Acropolis The Mall by Yuvraj Enterprises. Learn how we collect, use and protect your personal information on our website.",
  openGraph: {
    title: "Privacy Policy | Acropolis The Mall, Bilaspur",
    description:
      "Privacy Policy for Acropolis The Mall by Yuvraj Enterprises. Learn how we collect, use and protect your personal information.",
    url: `${BASE_URL}/privacy-policy`,
  },
};

const sections = [
  {
    title: "1. Information We Collect",
    paragraphs: [
      "When you interact with this website, we may collect information you voluntarily provide through our enquiry forms, such as your name, phone number, email address and the details of the property or space you are interested in.",
      "We may also collect limited technical information automatically, such as your browser type, device information and pages visited, to help us understand how visitors use our site.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    paragraphs: [
      "The information you provide is used to respond to your enquiries, share details about Acropolis The Mall and its available commercial spaces, schedule site visits, and provide you with relevant information about the project and related services.",
      "We may also use aggregated, non-identifiable information to improve our website and marketing efforts.",
    ],
  },
  {
    title: "3. Sharing of Information",
    paragraphs: [
      "We do not sell, rent or trade your personal information to third parties. Your information may be shared with authorised team members and service providers of Yuvraj Enterprises strictly for the purpose of processing your enquiry and providing you with the requested information.",
      "We may disclose information where required by law, regulation or legal process.",
    ],
  },
  {
    title: "4. Cookies and Analytics",
    paragraphs: [
      "Our website may use cookies and similar technologies to improve your browsing experience and to understand site usage. You can control or disable cookies through your browser settings; however, some features of the site may not function optimally without them.",
    ],
  },
  {
    title: "5. Data Security",
    paragraphs: [
      "We take reasonable measures to protect the personal information you share with us against unauthorised access, alteration, disclosure or destruction. While no method of transmission over the internet is completely secure, we strive to use commercially acceptable means to safeguard your data.",
    ],
  },
  {
    title: "6. Your Rights",
    paragraphs: [
      "You have the right to request access to, correction of, or deletion of the personal information we hold about you. You may also withdraw your consent for us to process your information at any time by contacting us.",
      "To exercise any of these rights, please reach out using the contact details provided below.",
    ],
  },
  {
    title: "7. Third-Party Links",
    paragraphs: [
      "This website may contain links to third-party websites, including the official RERA portal (rera.cgstate.gov.in). We are not responsible for the privacy practices or content of external websites.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface-card px-4 py-1.5 text-sm font-medium text-gold">
              <Lock className="size-4" aria-hidden="true" />
              Your Privacy Matters
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              How Acropolis The Mall and Yuvraj Enterprises collect, use and
              protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-premium-md sm:p-10">
            <p className="text-sm text-foreground/60">
              Effective Date: This Privacy Policy applies to the website of
              Acropolis The Mall, a commercial development promoted by Yuvraj
              Enterprises, registered office at H-2/75, Ring Road, Narmada
              Nagar, Bilaspur, Chhattisgarh.
            </p>

            <div className="mt-8 space-y-10">
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

            {/* Contact */}
            <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-gold/30 bg-gold-subtle p-6 shadow-premium-md sm:flex-row sm:items-center sm:p-8">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground shadow-premium-gold">
                <ShieldCheck className="size-8" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gold-foreground">
                  Contact Us
                </p>
                <p className="mt-1 text-sm text-gold-muted-foreground">
                  For privacy-related queries, please contact Yuvraj Enterprises
                  at H-2/75, Ring Road, Narmada Nagar, Bilaspur, Chhattisgarh.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gold-foreground">
                <Mail className="size-4" aria-hidden="true" />
                Via our enquiry page
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
