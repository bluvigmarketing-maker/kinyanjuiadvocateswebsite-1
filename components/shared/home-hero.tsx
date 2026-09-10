import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Spotlight } from "@/components/shared/spotlight";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-burgundy-600 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Spotlight />
      <Container className="relative z-10 flex flex-col items-start gap-6 py-24 sm:py-32">
        <div
          className="animate-fade-rise flex items-center gap-2.5"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="h-px w-6 bg-platinum-400/70" />
          <span className="text-xs font-semibold tracking-[0.2em] text-platinum-300 uppercase">
            Advocates &middot; High Court of Kenya
          </span>
        </div>
        <h1
          className="animate-fade-rise max-w-3xl font-heading text-4xl leading-[1.1] font-bold sm:text-6xl"
          style={{ animationDelay: "0.15s" }}
        >
          Strategic advocacy. Disciplined analysis. Sound legal judgment.
        </h1>
        <p
          className="animate-fade-rise max-w-2xl text-lg text-ink-200"
          style={{ animationDelay: "0.25s" }}
        >
          Kinyanjui T.W &amp; Co. Advocates is a Kenyan law firm providing
          litigation, arbitration, conveyancing, and advisory legal services
          to individuals, corporate entities, and institutions, anchored in
          analytical depth and structured legal reasoning.
        </p>
        <div
          className="animate-fade-rise mt-2 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.35s" }}
        >
          <Button
            size="lg"
            render={<Link href="/contact" />}
            nativeButton={false}
            className="btn-metallic accent-line px-6 font-semibold"
          >
            Book a Consultation
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<Link href="/about" />}
            nativeButton={false}
            className="btn-lift accent-line border-white/40 bg-transparent px-6 text-white hover:bg-white/10"
          >
            Our Firm
          </Button>
        </div>
      </Container>
    </section>
  );
}
