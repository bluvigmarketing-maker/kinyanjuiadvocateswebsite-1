# Design System Reference — Kinyanjui Advocates Style

This documents the exact visual/interaction system used on this site, adapted from a proven Next.js design system template. It covers the tech stack, design tokens, component patterns, motion, and page-composition conventions — with real code snippets pulled from this codebase.

The source template used two hue families (navy + gold). This site deliberately replaces both with **pure grayscale** (zero chroma, `R = G = B` at every step) to read as authoritative and modern for a law firm — no color anywhere except semantic red for destructive actions. Everything else (structure, spacing, motion, component anatomy) carries over unchanged from the source template, which is the intended way to reuse this system on a differently-branded site: swap §2's values, keep everything else.

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Server Components by default |
| Styling | Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`) | Design tokens live in `app/globals.css` via `@theme` |
| Component primitives | shadcn/ui (style: `base-nova`, built on `@base-ui/react`) | Accessible Button/Dialog/Sheet/DropdownMenu/NavigationMenu/Badge/Card out of the box |
| Motion | Framer Motion | Scroll-triggered reveal animations |
| Icons | lucide-react | Consistent line-icon set throughout |
| Fonts | `next/font/google`: Geist (sans), Geist Mono, Playfair Display (headings) | Serif display for gravitas + clean sans for clarity |

To bootstrap an equivalent project:

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --import-alias "@/*"
npx shadcn@latest init -d
npx shadcn@latest add button dialog dropdown-menu navigation-menu sheet separator badge card accordion -y
npm install framer-motion lucide-react
```

`shadcn init -d` uses the `base-nova` preset, which is built on `@base-ui/react` rather than Radix. Its components use a `render` prop for polymorphism instead of `asChild`, and native-button primitives (`Button`, `DialogClose`, etc.) default `nativeButton={true}` — pass `nativeButton={false}` whenever you render one as a `<Link>` or other non-`<button>` element, or Base UI will warn in the console.

## 2. Color System

Two grayscale families only: `ink` (structural/primary — the full dark-to-light range) and `platinum` (accent/CTA — a lighter, narrower band used for highlights, thin dividers, and the metallic button). Both are strictly achromatic (`R = G = B` at every step) — no hue is used anywhere in the UI except semantic red for destructive actions (inherited from shadcn's default `--destructive`).

### 2.1 Raw scale (defined once, in `:root`)

```css
:root {
  --ink-50:  #f6f6f6;
  --ink-100: #e8e8e8;
  --ink-200: #d3d3d3;
  --ink-300: #b3b3b3;
  --ink-400: #8c8c8c;
  --ink-500: #6e6e6e;
  --ink-600: #555555;   /* mid ink */
  --ink-700: #404040;   /* primary brand ink (button/link default) */
  --ink-800: #2b2b2b;
  --ink-900: #1d1d1d;
  --ink-950: #0e0e0e;   /* darkest surface — headers/footers/hero overlays */

  --platinum-50:  #fafafa;
  --platinum-100: #f0f0f0;
  --platinum-200: #e0e0e0;
  --platinum-300: #c7c7c7;
  --platinum-400: #ababab;  /* ring/focus color */
  --platinum-500: #949494;  /* classic "platinum" — accent/secondary */
  --platinum-600: #7a7a7a;
  --platinum-700: #5e5e5e;  /* accent text on light backgrounds (AA-safe) */
  --platinum-800: #464646;
  --platinum-900: #303030;
}
```

To re-brand with an actual hue pair: replace these two 10-step scales with a different hue pair at the same lightness steps — everything downstream (semantic tokens, components) references these variables, never raw hex.

### 2.2 Semantic tokens (map the scale to meaning, light + dark)

Tailwind v4's `@theme inline` block exposes the scale as utilities (`bg-ink-700`, `text-platinum-700`, etc.) and shadcn's semantic tokens are re-pointed at the scale instead of a generic neutral:

```css
:root {
  --background: #ffffff;
  --foreground: var(--ink-950);
  --primary: var(--ink-700);
  --primary-foreground: #fafafa;
  --secondary: var(--platinum-500);
  --secondary-foreground: var(--ink-950);
  --muted: var(--ink-50);
  --muted-foreground: var(--ink-700);
  --accent: var(--platinum-100);
  --accent-foreground: var(--ink-900);
  --border: var(--ink-100);
  --input: var(--ink-100);
  --ring: var(--platinum-400);
}

.dark {
  --background: var(--ink-950);
  --foreground: #fafafa;
  --primary: var(--platinum-500);        /* inverts: platinum becomes primary in dark mode */
  --primary-foreground: var(--ink-950);
  --secondary: var(--ink-700);
  --muted: var(--ink-800);
  --muted-foreground: var(--ink-200);
  --accent: var(--ink-800);
  --accent-foreground: var(--platinum-300);
  --ring: var(--platinum-400);
}
```

### 2.3 Usage rules (how color is actually applied across the site)

- **`ink-950` surfaces:** page hero banners (`PageHero`), the homepage hero, the footer, and the "vision statement" dark card — reserved for "big structural blocks," never body copy backgrounds.
- **White surfaces:** default page background, all cards.
- **`ink-50`:** subtle section backgrounds to break up all-white pages (e.g. the Practice Areas grid sits on `bg-ink-50` between two white sections).
- **`accent-line` (`border-platinum-400/60`):** a thin outline used on emphasized cards, buttons, and dividers — see §4.2.
- **`platinum-700` text on white / `platinum-300` text on `ink-950`:** the "eyebrow" label color and accent text — always the 700-step on light backgrounds and the 300-step on dark backgrounds, for contrast.
- Never use platinum as a large fill for body text backgrounds; it's an accent, not a surface color.

## 3. Typography

```tsx
// app/layout.tsx
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
```

```css
--font-display: var(--font-playfair);
--font-heading: var(--font-display);   /* aliased so `font-heading` utility works */

@layer base {
  html { @apply font-sans; }              /* Geist Sans is the default body font */
  h1, h2, h3, h4 { @apply font-heading; } /* every heading auto-gets Playfair Display */
}
```

Rules:

- Headings (h1–h4) are always the serif display font, semibold–bold weight.
- Body copy is always Geist Sans, regular weight, `text-ink-700` (not pure black) for de-emphasized warmth against the grayscale palette.
- Pull-quotes (the practice-philosophy statement on the homepage) use `font-heading` (serif) + italic even though they aren't semantically headings — serif italic signals "quoted/authoritative text" throughout the site.
- Monospace (`font-mono`, Geist Mono) is reserved for literal technical strings only — never decorative.
- Eyebrow/label text: `text-xs font-semibold uppercase tracking-wide`.

## 4. Core Component Patterns

### 4.1 Buttons

Base button comes from shadcn (`components/ui/button.tsx`) with variants `default | outline | secondary | ghost | destructive | link` and sizes `xs | sm | default | lg | icon...`. Two custom utility classes layer on top for brand CTAs:

```css
@layer utilities {
  .btn-metallic {
    background-image: linear-gradient(
      110deg,
      var(--platinum-600) 0%, var(--platinum-300) 30%, var(--platinum-500) 45%,
      var(--platinum-100) 55%, var(--platinum-500) 70%, var(--platinum-600) 100%
    );
    background-size: 250% 100%;
    color: var(--ink-950);
    animation: shimmer 5s linear infinite;
  }
  .btn-metallic:hover {
    animation-duration: 1.8s;
    transform: scale(1.02);
    box-shadow: 0 8px 24px -8px color-mix(in oklch, var(--ink-950) 45%, transparent);
  } /* speeds up + lifts on hover */
  .btn-metallic:active { transform: scale(0.99); }

  .accent-line { @apply border border-platinum-400/60; } /* thin outline, reused everywhere */

  .btn-lift {
    @apply transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.99];
  } /* same hover/press feedback as .btn-metallic, for non-metallic (outline/ghost) buttons */

  .link-underline {
    @apply relative;
  }
  .link-underline::after {
    content: "";
    @apply absolute right-0 bottom-0 left-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out;
  }
  .link-underline:hover::after {
    @apply scale-x-100;
  } /* animated slide-in underline for inline text links, in place of instant `hover:underline` */
}

@keyframes shimmer {
  0%   { background-position: 0% 50%; }
  100% { background-position: -200% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .btn-metallic { animation: none; }
}
```

Usage — every primary CTA in the site is (note the `render` prop + `nativeButton={false}` when the button is really a link — see §1):

```tsx
<Button
  render={<Link href="/contact" />}
  nativeButton={false}
  className="btn-metallic accent-line font-semibold"
>
  Book a Consultation
</Button>
```

Secondary/outline CTAs (e.g. on the dark hero) use `variant="outline"` with `accent-line` and a translucent white background:

```tsx
<Button
  variant="outline"
  render={<Link href="/about" />}
  nativeButton={false}
  className="accent-line border-white/40 bg-transparent text-white hover:bg-white/10"
>
  Our Firm
</Button>
```

### 4.2 Cards

Two card treatments, chosen by emphasis:

```tsx
// Standard card
<div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">…</div>

// Emphasized card ("accent-line")
<div className="accent-line rounded-2xl bg-white p-6">…</div>
```

Interactive/clickable cards add a lift-on-hover:

```
className="transition-transform hover:-translate-y-1 hover:shadow-md"
```

Dark cards (used sparingly, e.g. the practice-philosophy statement block) invert to `bg-ink-950 text-white`.

Radius scale: `rounded-lg` (buttons/inputs) → `rounded-xl`/`rounded-2xl` (cards, most common) → `rounded-3xl` (large hero-ish feature cards). Never sharp corners.

### 4.3 Section heading

Every content section uses the same three-part heading — a **kicker** (short line + uppercase label, no border/pill) → serif title → short platinum underline rule → optional description — via the shared `SectionHeading` component (`components/shared/section-heading.tsx`). Eyebrow labels are deliberately borderless: no pill/badge shape anywhere in the UI outside of the `Badge` component itself (§4.5), to keep the grayscale system reading as clean editorial typography rather than boxed chips:

```tsx
<div className="flex items-center gap-2.5">
  <span className="h-px w-6 shrink-0 bg-platinum-500" />
  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-platinum-700">
    Eyebrow Label
  </span>
</div>
<h2 className="font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">Title</h2>
<span className="h-px w-16 bg-platinum-400" />
<p className="max-w-2xl text-ink-700">Optional supporting description.</p>
```

On a dark background (`dark` prop), it swaps to `text-platinum-300` (kicker + label), `text-white` (title), `text-ink-200` (description).

### 4.4 Page hero banner (interior pages) & hero entrance animation

Every non-homepage page opens with the same dark banner before its content, via the shared `PageHero` component (`components/shared/page-hero.tsx`):

```tsx
<div className="bg-ink-950 py-16 text-center text-white sm:py-20">
  <div className="flex items-center gap-2.5">
    <span className="h-px w-6 bg-platinum-400/70" />
    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-platinum-300">
      Eyebrow
    </span>
    <span className="h-px w-6 bg-platinum-400/70" />
  </div>
  <h1 className="font-heading text-4xl font-bold sm:text-5xl">Page Title</h1>
  <span className="h-px w-16 bg-platinum-400" />
  <p className="max-w-2xl text-ink-200">Optional description</p>
</div>
```

`PageHero` and the homepage `HomeHero` are both above-the-fold, so their entrance reveal is **pure CSS**, not Framer Motion — each child gets `.animate-fade-rise` (defined in `globals.css`) with a staggered inline `animationDelay`. This is deliberate: content wrapped in Framer Motion's `initial`/`animate` sits at `opacity: 0` until React hydrates, which is a real flash-of-invisible-heading risk for the page's primary `<h1>` on a slow connection or during dev-mode compilation. A CSS `@keyframes` animation is present in the server-rendered HTML immediately and plays with zero JS dependency:

```css
@keyframes fade-rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-rise {
  animation: fade-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

Below-the-fold content has no such constraint — it's already deferred until scrolled into view — so it stays on `AnimatedSection`/Framer Motion (§5).
```

### 4.5 Badges

shadcn `Badge`, `variant="outline"` combined with `accent-line` for a consistent pill look (used for tags like advocate specialisms):

```tsx
<Badge variant="outline" className="accent-line text-ink-800">Litigation</Badge>
```

### 4.6 Header / Navigation

- Sticky, `bg-background/95 backdrop-blur`, `border-b border-ink-100`.
- Desktop: horizontal links + a shadcn `DropdownMenu` for "Practice Areas" (the only nav item with children), plus a `btn-metallic` CTA on the far right.
- Mobile (`< md`): a hamburger button opens a shadcn `Sheet` (slide-in drawer) with a flat, indented list (practice areas nested under a left border).
- Logo: a text-based monogram badge (`KT`) at `size-11 sm:size-13`, next to a two-line wordmark — sized generously, never shrunk to fit a cramped bar.

### 4.7 Footer

`bg-ink-950 text-ink-100`, three-column grid (brand+tagline / practice-area links / contact). Bottom bar: copyright + "Advocates of the High Court of Kenya", `border-t border-ink-800`, `text-xs text-ink-400`.

### 4.8 Forms

Plain HTML inputs (no heavy form library), consistent styling:

```
className="rounded-lg border border-ink-200 px-3 py-2 outline-none focus:border-platinum-500 focus:ring-2 focus:ring-platinum-400/40"
```

Every field: `<label>` above input, `text-sm font-medium text-ink-900`. The contact form (`components/shared/contact-form.tsx`) submits via a `mailto:` link (no backend) — swap in a real submit handler if a backend/email API is added later.

## 5. Motion

One reusable wrapper drives nearly all animation — a scroll-triggered zoom+fade+rise, via Framer Motion (`components/shared/animated-section.tsx`):

```tsx
"use client";
import { motion } from "framer-motion";

export function AnimatedSection({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

Rules:

- Wrap each logical content block (a card, a text column, a section) in its own `<AnimatedSection>` — not the whole page in one.
- Grids stagger via `delay={index * 0.05}` per item.
- `viewport={{ once: true }}` — animations play once on first scroll-into-view, never replay on re-scroll.
- The hero itself is not animated (it's the first thing visible, already "revealed") — only content below the fold animates in.
- Interactive hover lifts (`hover:-translate-y-1`) are plain CSS transitions, not Framer Motion — reserve JS-driven motion for scroll-reveal only.
- Respect `prefers-reduced-motion` (already handled for `.btn-metallic`; Framer Motion's `whileInView` is itself fairly subtle and left as-is).

## 6. Iconography

`lucide-react` exclusively. Convention:

- Inline icon next to text: `<Icon className="size-4" aria-hidden="true" />` immediately before the text, `gap-1.5` to `gap-2` flex container.
- Icons are always `aria-hidden="true"` when paired with visible text (the text is the accessible label).
- Icon color follows context: `text-platinum-600`/`text-platinum-700` for accent icons next to headings, inherits `currentColor` inside buttons.

## 7. Imagery

- **Hero:** no stock photography — a solid `ink-950` background with a faint 48px grid overlay (`opacity-[0.07]`) and a large serif headline reads as deliberately minimal and authoritative rather than empty. If real photography is added later, use full-bleed `object-cover` with a dark gradient overlay (`bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40`) so white text stays legible.
- **Portrait/profile photos:** fixed aspect ratio containers (`aspect-[4/5]`), `object-cover`, rounded corners matching the surrounding card. Until real photography exists, the team page renders initials on an `ink-100` placeholder in that same aspect ratio — never a broken image.
- **Empty/missing-image state:** never show a broken image — render a solid `bg-ink-100` (light) or `bg-ink-950` (dark) placeholder box with a muted icon or initials centered in it.

## 8. Layout Conventions

- Global content width: `mx-auto max-w-6xl px-4 sm:px-6`, via the shared `Container` component (`components/shared/container.tsx`), reused on every page.
- Vertical rhythm: sections are `py-16 sm:py-20` by default.
- Grids: `grid gap-5`, responsive column counts (`sm:grid-cols-2 lg:grid-cols-3`), never more than 3 columns for card grids.
- Mobile-first everywhere: base styles target mobile, `sm:`/`md:`/`lg:` prefixes layer up — never the reverse.

## 9. Applying This to a New Project — Checklist

1. Scaffold Next.js + Tailwind v4 + shadcn/ui (`base-nova` style) + Framer Motion + lucide-react (§1).
2. Pick a palette — a hue pair, or grayscale as here — and generate 10-step scales at the same lightness bands as §2.1; wire them into `@theme inline` + `:root`/`.dark` exactly as in §2.2.
3. Set up the three fonts (serif display for headings, sans for body) via `next/font/google`, matching §3.
4. Build the shared primitives first, in this order: `Container`, `SectionHeading`, `PageHero`, `AnimatedSection`, the `.btn-metallic`/`.accent-line` utilities — every page composes from these five.
5. Build `Header` (sticky + dropdown + mobile `Sheet`) and `Footer` (dark, three-column) once, shared via the root layout.
6. For every new page: `PageHero` → one or more `Container`-wrapped sections, each section's content wrapped in `AnimatedSection`, headings via `SectionHeading`.
7. Re-use the exact card/badge/form/button class strings from §4 verbatim — consistency comes from copying the same Tailwind class combinations, not from reinventing similar-looking ones per page.
8. Remember the Base UI `render`/`nativeButton` gotcha from §1 whenever a `Button`, `DropdownMenuItem`, or `SheetClose` needs to render as a `<Link>`.
