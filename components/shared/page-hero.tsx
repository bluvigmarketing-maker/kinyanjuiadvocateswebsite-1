import { Container } from "@/components/shared/container";
import { Spotlight } from "@/components/shared/spotlight";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-burgundy-600 py-16 text-center text-white sm:py-20">
      <Spotlight />
      <Container className="relative z-10 flex flex-col items-center gap-4">
        <div
          className="animate-fade-rise flex items-center gap-2.5"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="h-px w-6 bg-platinum-400/70" />
          <span className="text-xs font-semibold tracking-[0.2em] text-platinum-300 uppercase">
            {eyebrow}
          </span>
          <span className="h-px w-6 bg-platinum-400/70" />
        </div>
        <h1
          className="animate-fade-rise font-heading text-4xl font-bold sm:text-5xl"
          style={{ animationDelay: "0.14s" }}
        >
          {title}
        </h1>
        <span
          className="animate-fade-rise h-px w-16 bg-platinum-400"
          style={{ animationDelay: "0.23s" }}
        />
        {description ? (
          <p
            className="animate-fade-rise max-w-2xl text-ink-200"
            style={{ animationDelay: "0.23s" }}
          >
            {description}
          </p>
        ) : null}
      </Container>
    </div>
  );
}
