import { Container } from "@/components/shared/container";

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
    <div className="bg-ink-950 py-16 text-center text-white sm:py-20">
      <Container className="flex flex-col items-center gap-4">
        <span className="w-fit rounded-full border border-platinum-400/60 px-3 py-1 text-xs font-semibold tracking-wide text-platinum-300 uppercase">
          {eyebrow}
        </span>
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">
          {title}
        </h1>
        <span className="h-px w-16 bg-platinum-400" />
        {description ? (
          <p className="max-w-2xl text-ink-200">{description}</p>
        ) : null}
      </Container>
    </div>
  );
}
