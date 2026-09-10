import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { AnimatedSection } from "@/components/shared/animated-section";
import { practiceAreas } from "@/lib/data/practice-areas";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Litigation & dispute resolution, land & conveyancing, employment & labour relations, arbitration & ADR, and public, financial & regulatory advisory.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Practice Areas"
        description="Five areas of focused, disciplined practice — spanning contentious litigation to preventive advisory work."
      />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-5">
          {practiceAreas.map((area, index) => (
            <AnimatedSection key={area.slug} delay={index * 0.05}>
              <Link
                href={`/practice-areas/${area.slug}`}
                className="group grid gap-6 rounded-2xl border border-ink-100 bg-white p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-platinum-300 hover:shadow-lg sm:grid-cols-[auto_1fr_auto] sm:items-center"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-ink-950 text-white transition-transform duration-300 group-hover:scale-110">
                  <area.icon className="size-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-sm font-semibold text-platinum-600">
                      {area.number}
                    </span>
                    <h2 className="font-heading text-xl font-semibold text-ink-950">
                      {area.title}
                    </h2>
                  </div>
                  <p className="text-sm text-ink-700">{area.summary}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-950 sm:justify-self-end">
                  <span className="hidden sm:inline">Details</span>
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </Container>
      </section>
    </>
  );
}
