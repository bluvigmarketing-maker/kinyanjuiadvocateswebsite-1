# Kinyanjui T.W & Co. Advocates

Marketing website for Kinyanjui T.W & Co. Advocates, a Kenyan law firm based in Ruiru, Kenya.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui (base-nova), and Framer Motion. See [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) for the full design system reference.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Structure

- `app/` — routes: home, `/about`, `/practice-areas`, `/practice-areas/[slug]`, `/team`, `/contact`
- `components/layout/` — header, footer, logo
- `components/shared/` — container, section heading, page hero, animated section, contact form
- `components/ui/` — shadcn/ui primitives
- `lib/data/` — firm details, practice areas, and team content
