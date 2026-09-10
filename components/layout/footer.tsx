import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/layout/logo";
import { firm } from "@/lib/data/firm";
import { practiceAreas } from "@/lib/data/practice-areas";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-ink-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Logo dark />
          <p className="max-w-xs text-sm text-ink-300">{firm.tagline}</p>
          <p className="text-xs text-ink-400">
            Est. {firm.founded} &middot; Ruiru, Kenya
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-wide text-platinum-300 uppercase">
            Practice Areas
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="text-ink-300 transition-colors hover:text-white"
                >
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-wide text-platinum-300 uppercase">
            Contact
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-ink-300">
            <li className="flex items-start gap-2.5">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-platinum-400"
                aria-hidden="true"
              />
              <span>
                {firm.address.line1}
                <br />
                {firm.address.line2}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone
                className="size-4 shrink-0 text-platinum-400"
                aria-hidden="true"
              />
              <a
                href={`tel:${firm.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {firm.phone}
              </a>
            </li>
            {firm.emails.map((email) => (
              <li key={email} className="flex items-center gap-2.5">
                <Mail
                  className="size-4 shrink-0 text-platinum-400"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-white"
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink-800">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-400 sm:flex-row">
          <p>
            &copy; {year} {firm.name}. All rights reserved.
          </p>
          <p>Advocates of the High Court of Kenya</p>
        </Container>
      </div>
    </footer>
  );
}
