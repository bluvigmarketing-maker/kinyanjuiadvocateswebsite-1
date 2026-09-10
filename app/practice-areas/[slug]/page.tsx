import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/shared/spotlight";
import {
  getPracticeAreaBySlug,
  practiceAreas,
} from "@/lib/data/practice-areas";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);
  if (!area) return {};
  return {
    title: area.title,
    description: area.summary,
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);
  if (!area) notFound();

  const currentIndex = practiceAreas.findIndex((a) => a.slug === slug);
  const next = practiceAreas[(currentIndex + 1) % practiceAreas.length];

  return (
    <>
      <PageHero
        eyebrow={`Practice Area ${area.number}`}
        title={area.title}
        description={area.summary}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <AnimatedSection>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div className="flex flex-col gap-4">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-burgundy-950 text-white">
                  <area.icon className="size-6" aria-hidden="true" />
                </span>
                <Link
                  href="/practice-areas"
                  className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink-700 transition-colors hover:text-ink-950"
                >
                  <ArrowLeft
                    className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  All practice areas
                </Link>
              </div>
              <div className="flex flex-col gap-6 text-ink-700">
                <p className="text-lg">{area.intro}</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="accent-line flex items-start gap-3 rounded-xl bg-white p-4 text-sm"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-platinum-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                {area.closing ? (
                  <p className="text-base font-medium text-ink-900">
                    {area.closing}
                  </p>
                ) : null}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="bg-ink-50 py-16 sm:py-20">
        <Container>
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-burgundy-950 p-10 text-center text-white sm:p-16">
              <Spotlight />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <h2 className="max-w-2xl font-heading text-3xl font-semibold sm:text-4xl">
                  Speak with an advocate about this matter.
                </h2>
                <p className="max-w-xl text-ink-200">
                  Our team brings disciplined preparation and strategic
                  judgment to every engagement.
                </p>
                <Button
                  size="lg"
                  render={<Link href="/contact" />}
                  nativeButton={false}
                  className="btn-metallic accent-line px-6 font-semibold"
                >
                  Book a Consultation
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="mt-10">
            <Link
              href={`/practice-areas/${next.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-platinum-300 hover:shadow-lg"
            >
              <div>
                <span className="text-xs font-semibold tracking-wide text-platinum-700 uppercase">
                  Next Practice Area
                </span>
                <p className="mt-1 font-heading text-lg font-semibold text-ink-950">
                  {next.title}
                </p>
              </div>
              <ArrowRight
                className="size-5 text-ink-950 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
