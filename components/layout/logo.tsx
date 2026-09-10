import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label="Kinyanjui T.W & Co. Advocates — home"
    >
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-heading text-lg font-bold tracking-tight sm:h-13 sm:w-13 sm:text-xl",
          dark ? "bg-white text-ink-950" : "bg-ink-950 text-white"
        )}
      >
        KT
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-heading text-base font-semibold tracking-tight sm:text-lg",
            dark ? "text-white" : "text-ink-950"
          )}
        >
          Kinyanjui T.W &amp; Co.
        </span>
        <span
          className={cn(
            "text-[0.65rem] font-semibold tracking-[0.2em] uppercase",
            dark ? "text-platinum-300" : "text-platinum-700"
          )}
        >
          Advocates
        </span>
      </span>
    </Link>
  );
}
