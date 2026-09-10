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
      <span
        className={cn(
          "w-fit rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase",
          dark
            ? "border-platinum-400/40 text-platinum-300"
            : "border-platinum-400/60 text-platinum-700"
        )}
      >
        {eyebrow}
      </span>
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
