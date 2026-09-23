import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "The Team",
  description:
    "Meet the advocates and staff of Kinyanjui T.W & Co. Advocates: disciplined legal reasoning across litigation, land law, employment, and regulatory advisory.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="The Team"
        description="Advocates and support staff bringing disciplined legal reasoning to every matter."
      />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-14">
          {team.map((member, index) => (
            <AnimatedSection key={member.slug} delay={index * 0.05}>
              <div className="grid gap-8 sm:grid-cols-[220px_1fr] sm:gap-10">
                <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-ink-100 sm:aspect-auto sm:h-full">
                  <span className="font-heading text-5xl font-semibold text-ink-300">
                    {initials(member.name)}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="font-heading text-2xl font-semibold text-ink-950">
                      {member.name}
                    </h2>
                    <p className="text-sm font-medium text-platinum-700">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 text-ink-700">
                    {member.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {member.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="accent-line text-ink-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </Container>
      </section>
    </>
  );
}
