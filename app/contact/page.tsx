import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ContactForm } from "@/components/shared/contact-form";
import { firm } from "@/lib/data/firm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kinyanjui T.W & Co. Advocates in Ruiru, Kenya. Call, email, or send an enquiry directly.",
};

const details = [
  {
    icon: MapPin,
    label: "Office",
    lines: [firm.address.line1, firm.address.line2],
  },
  {
    icon: Phone,
    label: "Telephone",
    lines: [firm.phone],
    href: `tel:${firm.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    lines: firm.emails,
  },
  {
    icon: Clock,
    label: "Office Hours",
    lines: ["Monday – Friday, 8:00am – 5:00pm"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Speak with an advocate about litigation, arbitration, conveyancing, or regulatory advisory needs."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <AnimatedSection>
              <div className="flex flex-col gap-6">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="accent-line flex items-start gap-4 rounded-2xl bg-white p-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-burgundy-950 text-white">
                      <detail.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-platinum-700 uppercase">
                        {detail.label}
                      </p>
                      {detail.lines.map((line) =>
                        detail.href ? (
                          <a
                            key={line}
                            href={detail.href}
                            className="block text-sm text-ink-800 hover:text-ink-950"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line} className="text-sm text-ink-800">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm sm:p-10">
                <h2 className="font-heading text-xl font-semibold text-ink-950">
                  Send an enquiry
                </h2>
                <p className="mt-1 mb-6 text-sm text-ink-700">
                  Share a brief outline of your matter and we will get back to
                  you promptly.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  );
}
