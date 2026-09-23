import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gavel, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { firm } from "@/lib/data/firm";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "Kinyanjui T.W & Co. Advocates is a Kenyan law firm anchored in analytical depth, structured legal reasoning, and disciplined advocacy.",
};

const scopeItems = [
  "Competing factual narratives and evidentiary disputes",
  "Interpretation and application of statutory and regulatory frameworks",
  "Contractual disputes requiring technical and legal analysis",
  "Land and property disputes with historical, institutional, or customary dimensions",
  "Employment disputes implicating procedure, compliance, and workplace governance",
  "Disputes involving public resources, regulatory oversight, or institutional decision-making",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About the Firm"
        description={`Established in ${firm.founded}: litigation, arbitration, conveyancing, and advisory legal services built on analytical depth and disciplined advocacy.`}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <AnimatedSection>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <SectionHeading
                eyebrow="Who We Are"
                title="Analytical depth. Structured reasoning. Disciplined advocacy."
              />
              <div className="flex flex-col gap-4 text-ink-700">
                <p>
                  Kinyanjui T.W &amp; Co. Advocates is a Kenyan law firm
                  established in {firm.founded}, providing litigation,
                  arbitration, conveyancing, and advisory legal services to
                  individuals, corporate entities, and institutions. The firm
                  is anchored in analytical depth, structured legal reasoning,
                  and disciplined advocacy, with a practice that reflects
                  careful engagement with both facts and law.
                </p>
                <p>
                  The firm&apos;s work is characterised by matters that demand
                  precision, sound judgment, and sustained legal engagement.
                  We routinely handle disputes and advisory briefs involving
                  contested factual records, layered legal questions, and
                  significant legal or financial consequences. Our approach is
                  informed by a strong appreciation of how legal disputes
                  evolve through courts, tribunals, and alternative dispute
                  resolution processes.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="bg-ink-50 py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Approach"
              title="Practice Philosophy & Distinct Advantage"
              description="The firm approaches legal practice as an exercise in judgment rather than formality. Each matter is treated as a unique problem requiring careful issue-framing, factual evaluation, and strategic decision-making."
            />
          </AnimatedSection>
          <div className="grid gap-5 lg:grid-cols-2">
            <AnimatedSection>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-8 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-xl bg-burgundy-600 text-white">
                  <Gavel className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-ink-950">
                  Litigation
                </h3>
                <p className="text-sm text-ink-700">
                  Litigation forms a central pillar of the firm&apos;s
                  practice. We represent clients before superior and
                  subordinate courts, specialised courts, and tribunals,
                  managing disputes from inception through interlocutory
                  applications, trial, and post-judgment processes. Our
                  advocacy is informed by disciplined preparation, a clear
                  understanding of applicable legal principles, and a
                  pragmatic assessment of litigation risk and outcome.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-8 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-xl bg-burgundy-600 text-white">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-ink-950">
                  Advisory & Preventive Work
                </h3>
                <p className="text-sm text-ink-700">
                  Alongside litigation, the firm places strong emphasis on
                  advisory and preventive legal work, assisting clients to
                  structure transactions, manage regulatory exposure, and
                  resolve disputes efficiently through arbitration and
                  mediation where appropriate.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Nature & Scope of Work"
              title="Matters that demand precision"
              description="The firm routinely handles complex and legally sensitive matters involving:"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {scopeItems.map((item) => (
                <li
                  key={item}
                  className="accent-line flex items-start gap-3 rounded-2xl bg-white p-5 text-sm text-ink-700"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-platinum-500" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="max-w-3xl text-ink-700">
              Our work often involves sustained engagement over time, careful
              evaluation of legal and factual risk, and strategic advocacy
              across multiple stages of dispute resolution.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      <section className="bg-ink-50 py-16 sm:py-20">
        <Container>
          <AnimatedSection>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <SectionHeading eyebrow="Our Clients" title="Who We Serve" />
              <div className="flex flex-col gap-4 text-ink-700">
                <p>
                  The firm acts for both individuals and institutions. Our
                  institutional advisory work has included serving as legal
                  advisor to educational institutions, while our individual
                  client work spans property, employment, commercial, and
                  dispute-related matters.
                </p>
                <Button
                  render={<Link href="/contact" />}
                  nativeButton={false}
                  className="btn-metallic accent-line w-fit font-semibold"
                >
                  Discuss Your Matter
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
