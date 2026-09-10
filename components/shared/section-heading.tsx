import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2.5",
          align === "center" && "justify-center"
        )}
      >
        <span
          className={cn(
            "h-px w-6 shrink-0",
            dark ? "bg-platinum-400/70" : "bg-platinum-500"
          )}
        />
        <span
          className={cn(
            "text-xs font-semibold tracking-[0.2em] uppercase",
            dark ? "text-platinum-300" : "text-platinum-700"
          )}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={cn(
          "font-heading text-3xl font-semibold sm:text-4xl",
          dark ? "text-white" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      <span className="h-px w-16 bg-platinum-400" />
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed",
            dark ? "text-ink-200" : "text-ink-700"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
