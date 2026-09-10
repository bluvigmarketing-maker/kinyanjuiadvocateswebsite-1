import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoMark from "@/public/logo-mark.png";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label="Kinyanjui T.W & Co. Advocates home"
    >
      <Image
        src={logoMark}
        alt=""
        priority
        className="h-9 w-auto shrink-0 rounded-md sm:h-11"
      />
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
