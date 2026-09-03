import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Acropolis The Mall, Chantidih, Bilaspur — available commercial spaces, RERA registration, amenities, developer and how to enquire.",
  openGraph: {
    title: "FAQ | Acropolis The Mall, Bilaspur",
    description:
      "Answers to common questions about Acropolis The Mall, Chantidih, Bilaspur — available commercial spaces, RERA registration, amenities and how to enquire.",
    url: `${BASE_URL}/faq`,
  },
};

const faqs = [
  {
    question: "What is Acropolis The Mall?",
    answer:
      "Acropolis The Mall is a planned commercial development located near Chantidih, Bilaspur, Chhattisgarh. It is designed to offer a mix of commercial spaces including shops, office spaces, a food court and retail kiosks, along with supporting facilities such as covered parking, power backup and 24/7 security.",
  },
  {
    question: "What types of spaces are available?",
    answer:
      "The project offers a range of commercial spaces including commercial shops, office spaces, food court and restaurant space, and retail kiosks. Each space is designed to cater to different business requirements across the growing Bilaspur market.",
  },
  {
    question: "Is the project RERA registered?",
    answer:
      "Yes. Acropolis The Mall is registered under the Real Estate (Regulation and Development) Act with the Chhattisgarh RERA. The registration number is PCGRERA030826002133. You can verify the registration at the official RERA website: https://rera.cgstate.gov.in.",
  },
  {
    question: "Who is the developer?",
    answer:
      "The project is promoted by Yuvraj Enterprises, a Bilaspur-based developer with its registered office at H-2/75, Ring Road, Narmada Nagar, Bilaspur, Chhattisgarh.",
  },
  {
    question: "What amenities are provided?",
    answer:
      "Acropolis The Mall includes a comprehensive set of amenities such as covered parking, power backup, 24/7 security, escalators, fire safety systems, rainwater harvesting, landscaping and dedicated visitor parking.",
  },
  {
    question: "Where is the project located?",
    answer:
      "The project is situated at P.H.N. 33, Village Chantidih, Tehsil Bilaspur, Chhattisgarh — close to Chantidih Road. Visit our location page to see the exact site position and surrounding connectivity.",
    link: { label: "View location details", href: "/location" },
  },
  {
    question: "How can I enquire about a space?",
    answer:
      "You can enquire about available spaces by filling out the enquiry form on our website or by contacting our team directly. Our team will reach out to discuss pricing, availability and site visits.",
    link: { label: "Submit an enquiry", href: "/enquiry" },
  },
  {
    question: "When is the project expected to be completed?",
    answer:
      "The project is progressing in line with its RERA registration, which was registered on 03-Aug-2026 and is valid until 06-Jul-2031. For the most accurate and updated status, please refer to the RERA registration or contact our team.",
  },
];

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-darker">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface-card px-4 py-1.5 text-sm font-medium text-gold">
              <HelpCircle className="size-4" aria-hidden="true" />
              Frequently Asked Questions
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Frequently Asked <span className="text-gold">Questions</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
              Everything you need to know about Acropolis The Mall, its spaces,
              RERA registration and how to get in touch.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Need Answers?
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Common Questions
            </h2>
          </div>

          <div className="mt-12">
            <Accordion type="multiple" className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-border bg-card px-5 shadow-premium-sm"
                >
                  <AccordionTrigger className="text-base font-semibold text-gold hover:no-underline [&[data-state=open]]:text-gold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    <p>{faq.answer}</p>
                    {faq.link ? (
                      <Link
                        href={faq.link.href}
                        className="mt-3 inline-flex items-center font-medium text-gold underline-offset-4 hover:underline"
                      >
                        {faq.link.label}
                      </Link>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-2xl border border-gold/25 bg-gradient-to-r from-surface-dark via-surface-card to-surface-dark p-10 text-center shadow-premium-lg sm:p-12 lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Still Have Questions?
              </h2>
              <p className="mt-3 max-w-xl text-white/70">
                Our team is happy to help. Reach out through the enquiry form
                and we&apos;ll respond promptly.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <Link href="/enquiry">Enquire Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
