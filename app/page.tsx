import Link from "next/link";
import {
  ArrowRight,
  FileSearch,
  Gavel,
  Landmark,
  ScaleIcon,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";
import { HomeHero } from "@/components/shared/home-hero";
import { Spotlight } from "@/components/shared/spotlight";
import { practiceAreas } from "@/lib/data/practice-areas";
import { team } from "@/lib/data/team";
import { firm } from "@/lib/data/firm";

const scopeOfWork = [
  {
    icon: FileSearch,
    title: "Competing factual narratives",
    description: "Evidentiary disputes that turn on a contested factual record.",
  },
  {
    icon: ScaleIcon,
    title: "Statutory interpretation",
    description:
      "Interpretation and application of statutory and regulatory frameworks.",
  },
  {
    icon: Gavel,
    title: "Contractual disputes",
    description: "Matters requiring technical and legal analysis of complex agreements.",
  },
  {
    icon: Landmark,
    title: "Land & property disputes",
    description:
      "Historical, institutional, or customary dimensions of land ownership.",
  },
  {
    icon: ShieldCheck,
    title: "Employment governance",
    description: "Disputes implicating procedure, compliance, and workplace governance.",
  },
  {
    icon: Landmark,
    title: "Public resource disputes",
    description:
      "Matters involving public resources, regulatory oversight, or institutional decisions.",
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* About teaser */}
      <section className="py-16 sm:py-20">
        <Container>
          <AnimatedSection>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <SectionHeading
                eyebrow="About the Firm"
                title="A practice built on judgment, not formality."
                description={`Established in ${firm.founded}, the firm treats each matter as a unique problem requiring careful issue-framing, factual evaluation, and strategic decision-making, never a routine formality.`}
              />
              <div className="flex flex-col gap-4 text-ink-700">
                <p>
                  The firm&apos;s work is characterised by matters that demand
                  precision, sound judgment, and sustained legal engagement.
                  We routinely handle disputes and advisory briefs involving
                  contested factual records, layered legal questions, and
                  significant legal or financial consequences.
                </p>
                <p>
                  Our approach is informed by a strong appreciation of how
                  legal disputes evolve through courts, tribunals, and
                  alternative dispute resolution processes.
                </p>
                <Link
                  href="/about"
                  className="link-underline group mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink-950"
                >
                  Read our practice philosophy
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Practice areas */}
      <section className="bg-ink-50 py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="What We Do"
              title="Practice Areas"
              description="Five areas of focused, disciplined practice, from contentious litigation to preventive advisory work."
            />
          </AnimatedSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area, index) => (
              <AnimatedSection key={area.slug} delay={index * 0.05}>
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-platinum-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-burgundy-600 text-white transition-transform duration-300 group-hover:scale-110">
                      <area.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-2xl font-semibold text-ink-200">
                      {area.number}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-ink-950">
                    {area.title}
                  </h3>
                  <p className="text-sm text-ink-700">{area.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-platinum-700 group-hover:text-ink-950">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={practiceAreas.length * 0.05}>
              <Link
                href="/practice-areas"
                className="group relative flex h-full flex-col items-start justify-center gap-3 overflow-hidden rounded-2xl bg-burgundy-600 p-6 text-white transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg"
              >
                <Spotlight />
                <span className="relative z-10 font-heading text-lg font-semibold">
                  View all practice areas
                </span>
                <span className="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold text-platinum-300">
                  Explore the full scope of our work
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Nature and scope of work */}
      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Nature & Scope"
              title="The kind of matters we take on"
              description="The firm routinely handles complex and legally sensitive matters involving:"
            />
          </AnimatedSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scopeOfWork.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.05}>
                <div className="accent-line flex h-full flex-col gap-3 rounded-2xl bg-white p-6">
                  <item.icon
                    className="size-5 text-platinum-700"
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-base font-semibold text-ink-950">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-700">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision / philosophy statement */}
      <section className="py-16 sm:py-20">
        <Container>
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-burgundy-600 px-6 py-14 text-center text-white sm:px-16 sm:py-20">
              <Spotlight />
              <p className="relative z-10 mx-auto max-w-3xl font-heading text-2xl leading-snug font-medium text-balance italic sm:text-3xl">
                &ldquo;The firm approaches legal practice as an exercise in
                judgment rather than formality. Each matter is treated as a
                unique problem requiring careful issue-framing, factual
                evaluation, and strategic decision-making.&rdquo;
              </p>
              <span className="relative z-10 mx-auto mt-8 block h-px w-16 bg-platinum-400" />
              <p className="relative z-10 mt-6 text-sm font-semibold tracking-wide text-platinum-300 uppercase">
                Our Practice Philosophy
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Team teaser */}
      <section className="bg-ink-50 py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our People"
              title="The Team"
              description="Advocates and support staff bringing disciplined legal reasoning to every matter."
            />
          </AnimatedSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <AnimatedSection key={member.slug} delay={index * 0.05}>
                <div className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-platinum-300 hover:shadow-lg">
                  <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl bg-ink-100">
                    <span className="font-heading text-4xl font-semibold text-ink-300 transition-transform duration-300 group-hover:scale-110">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-ink-950">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-platinum-700">
                    {member.role}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <Link
              href="/team"
              className="link-underline group mx-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink-950"
            >
              Meet the full team
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA banner */}
      <section className="py-16 sm:py-20">
        <Container>
          <AnimatedSection>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-ink-100 bg-white p-10 text-center shadow-sm sm:p-16">
              <h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">
                Discuss your matter with disciplined legal counsel.
              </h2>
              <p className="max-w-xl text-ink-700">
                Whether litigation, arbitration, conveyancing, or regulatory
                advisory, speak with an advocate who treats your matter as
                the unique problem it is.
              </p>
              <Button
                size="lg"
                render={<Link href="/contact" />}
                nativeButton={false}
                className="btn-metallic accent-line px-6 font-semibold"
              >
                Get in Touch
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
