/**
 * One-off seed script: populates Supabase with the site's current
 * hardcoded content so the public site shows zero regression when pages
 * are switched from lib/data/*.ts imports to Supabase queries.
 *
 * Run once, after applying the migrations in supabase/migrations/, with:
 *   npx tsx scripts/seed.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in
 * .env.local (loaded here directly since this runs outside Next.js).
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { firm } from "../lib/data/firm";
import { practiceAreas } from "../lib/data/practice-areas";
import { team } from "../lib/data/team";
import type { Database } from "../lib/supabase/database.types";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, serviceRoleKey);

// Maps each practice area's lucide component to its allow-listed icon name
// (lib/icon-map.ts). Kept as a small manual table rather than reading
// `.displayName` off the component, since that's not guaranteed to match.
const PRACTICE_AREA_ICON_NAMES: Record<string, string> = {
  "litigation-dispute-resolution": "Gavel",
  "land-environment-conveyancing": "Landmark",
  "employment-labour-relations": "Users",
  "arbitration-alternative-dispute-resolution": "ScrollText",
  "public-financial-regulatory-advisory": "Building2",
};

async function seedFirmInfo() {
  const { error } = await supabase.from("firm_info").upsert({
    id: 1,
    name: firm.name,
    short_name: firm.shortName,
    tagline: firm.tagline,
    founded_year: firm.founded,
    address_line1: firm.address.line1,
    address_line2: firm.address.line2,
    phone: firm.phone,
    emails: [...firm.emails],
    office_hours: "Monday – Friday, 8:00am – 5:00pm",
  });
  if (error) throw error;
  console.log("Seeded firm_info");
}

async function seedPracticeAreas() {
  for (const [index, area] of practiceAreas.entries()) {
    const { error } = await supabase.from("practice_areas").upsert(
      {
        slug: area.slug,
        order_index: index,
        title: area.title,
        icon_name: PRACTICE_AREA_ICON_NAMES[area.slug] ?? "Gavel",
        summary: area.summary,
        intro: area.intro,
        items: area.items,
        closing: area.closing ?? null,
        is_published: true,
      },
      { onConflict: "slug" }
    );
    if (error) throw error;
  }
  console.log(`Seeded ${practiceAreas.length} practice_areas`);
}

async function seedTeamMembers() {
  for (const [index, member] of team.entries()) {
    const { error } = await supabase.from("team_members").upsert(
      {
        slug: member.slug,
        order_index: index,
        name: member.name,
        role: member.role,
        bio: member.bio,
        tags: member.tags,
        photo_url: null,
        is_published: true,
      },
      { onConflict: "slug" }
    );
    if (error) throw error;
  }
  console.log(`Seeded ${team.length} team_members`);
}

// Hand-transcribed from the current inline JSX copy in app/page.tsx,
// app/about/page.tsx, and app/contact/page.tsx (this copy isn't exported as
// data anywhere, so it's typed out here once as the seed source of truth).
async function seedContentBlocks() {
  const rows: { page: string; section_key: string; content: unknown }[] = [
    {
      page: "home",
      section_key: "hero",
      content: {
        eyebrow: "Advocates · High Court of Kenya",
        title: firm.tagline,
        description:
          "Kinyanjui T.W & Co. Advocates is a Kenyan law firm providing litigation, arbitration, conveyancing, and advisory legal services to individuals, corporate entities, and institutions, anchored in analytical depth and structured legal reasoning.",
        primaryCtaLabel: "Book a Consultation",
        secondaryCtaLabel: "Our Firm",
      },
    },
    {
      page: "home",
      section_key: "about_teaser",
      content: {
        eyebrow: "About the Firm",
        title: "A practice built on judgment, not formality.",
        description:
          "Established in {{foundedYear}}, the firm treats each matter as a unique problem requiring careful issue-framing, factual evaluation, and strategic decision-making, never a routine formality.",
        paragraphs: [
          "The firm's work is characterised by matters that demand precision, sound judgment, and sustained legal engagement. We routinely handle disputes and advisory briefs involving contested factual records, layered legal questions, and significant legal or financial consequences.",
          "Our approach is informed by a strong appreciation of how legal disputes evolve through courts, tribunals, and alternative dispute resolution processes.",
        ],
        linkLabel: "Read our practice philosophy",
      },
    },
    {
      page: "home",
      section_key: "scope_of_work",
      content: {
        eyebrow: "Nature & Scope",
        title: "The kind of matters we take on",
        description:
          "The firm routinely handles complex and legally sensitive matters involving:",
        items: [
          {
            iconName: "FileSearch",
            title: "Competing factual narratives",
            description:
              "Evidentiary disputes that turn on a contested factual record.",
          },
          {
            iconName: "ScaleIcon",
            title: "Statutory interpretation",
            description:
              "Interpretation and application of statutory and regulatory frameworks.",
          },
          {
            iconName: "Gavel",
            title: "Contractual disputes",
            description:
              "Matters requiring technical and legal analysis of complex agreements.",
          },
          {
            iconName: "Landmark",
            title: "Land & property disputes",
            description:
              "Historical, institutional, or customary dimensions of land ownership.",
          },
          {
            iconName: "ShieldCheck",
            title: "Employment governance",
            description:
              "Disputes implicating procedure, compliance, and workplace governance.",
          },
          {
            iconName: "Landmark",
            title: "Public resource disputes",
            description:
              "Matters involving public resources, regulatory oversight, or institutional decisions.",
          },
        ],
      },
    },
    {
      page: "home",
      section_key: "philosophy",
      content: {
        quote:
          "The firm approaches legal practice as an exercise in judgment rather than formality. Each matter is treated as a unique problem requiring careful issue-framing, factual evaluation, and strategic decision-making.",
        attribution: "Our Practice Philosophy",
      },
    },
    {
      page: "home",
      section_key: "team_teaser",
      content: {
        eyebrow: "Our People",
        title: "The Team",
        description:
          "Advocates and support staff bringing disciplined legal reasoning to every matter.",
        linkLabel: "Meet the full team",
      },
    },
    {
      page: "home",
      section_key: "cta",
      content: {
        title: "Discuss your matter with disciplined legal counsel.",
        description:
          "Whether litigation, arbitration, conveyancing, or regulatory advisory, speak with an advocate who treats your matter as the unique problem it is.",
        buttonLabel: "Get in Touch",
      },
    },
    {
      page: "about",
      section_key: "hero",
      content: {
        eyebrow: "About Us",
        title: "About the Firm",
        description:
          "Established in {{foundedYear}}: litigation, arbitration, conveyancing, and advisory legal services built on analytical depth and disciplined advocacy.",
      },
    },
    {
      page: "about",
      section_key: "who_we_are",
      content: {
        eyebrow: "Who We Are",
        title: "Analytical depth. Structured reasoning. Disciplined advocacy.",
        paragraphs: [
          "Kinyanjui T.W & Co. Advocates is a Kenyan law firm established in {{foundedYear}}, providing litigation, arbitration, conveyancing, and advisory legal services to individuals, corporate entities, and institutions. The firm is anchored in analytical depth, structured legal reasoning, and disciplined advocacy, with a practice that reflects careful engagement with both facts and law.",
          "The firm's work is characterised by matters that demand precision, sound judgment, and sustained legal engagement. We routinely handle disputes and advisory briefs involving contested factual records, layered legal questions, and significant legal or financial consequences. Our approach is informed by a strong appreciation of how legal disputes evolve through courts, tribunals, and alternative dispute resolution processes.",
        ],
      },
    },
    {
      page: "about",
      section_key: "philosophy",
      content: {
        eyebrow: "Our Approach",
        title: "Practice Philosophy & Distinct Advantage",
        description:
          "The firm approaches legal practice as an exercise in judgment rather than formality. Each matter is treated as a unique problem requiring careful issue-framing, factual evaluation, and strategic decision-making.",
        cards: [
          {
            iconName: "Gavel",
            title: "Litigation",
            body: "Litigation forms a central pillar of the firm's practice. We represent clients before superior and subordinate courts, specialised courts, and tribunals, managing disputes from inception through interlocutory applications, trial, and post-judgment processes. Our advocacy is informed by disciplined preparation, a clear understanding of applicable legal principles, and a pragmatic assessment of litigation risk and outcome.",
          },
          {
            iconName: "ShieldCheck",
            title: "Advisory & Preventive Work",
            body: "Alongside litigation, the firm places strong emphasis on advisory and preventive legal work, assisting clients to structure transactions, manage regulatory exposure, and resolve disputes efficiently through arbitration and mediation where appropriate.",
          },
        ],
      },
    },
    {
      page: "about",
      section_key: "scope_of_work",
      content: {
        eyebrow: "Nature & Scope of Work",
        title: "Matters that demand precision",
        description:
          "The firm routinely handles complex and legally sensitive matters involving:",
        items: [
          "Competing factual narratives and evidentiary disputes",
          "Interpretation and application of statutory and regulatory frameworks",
          "Contractual disputes requiring technical and legal analysis",
          "Land and property disputes with historical, institutional, or customary dimensions",
          "Employment disputes implicating procedure, compliance, and workplace governance",
          "Disputes involving public resources, regulatory oversight, or institutional decision-making",
        ],
        closingParagraph:
          "Our work often involves sustained engagement over time, careful evaluation of legal and factual risk, and strategic advocacy across multiple stages of dispute resolution.",
      },
    },
    {
      page: "about",
      section_key: "clients",
      content: {
        eyebrow: "Our Clients",
        title: "Who We Serve",
        paragraph:
          "The firm acts for both individuals and institutions. Our institutional advisory work has included serving as legal advisor to educational institutions, while our individual client work spans property, employment, commercial, and dispute-related matters.",
        buttonLabel: "Discuss Your Matter",
      },
    },
    {
      page: "contact",
      section_key: "hero",
      content: {
        eyebrow: "Get in Touch",
        title: "Contact Us",
        description:
          "Speak with an advocate about litigation, arbitration, conveyancing, or regulatory advisory needs.",
      },
    },
    {
      page: "contact",
      section_key: "form_intro",
      content: {
        title: "Send an enquiry",
        description:
          "Share a brief outline of your matter and we will get back to you promptly.",
      },
    },
  ];

  for (const row of rows) {
    const { error } = await supabase
      .from("content_blocks")
      .upsert(row, { onConflict: "page,section_key" });
    if (error) throw error;
  }
  console.log(`Seeded ${rows.length} content_blocks`);
}

async function main() {
  await seedFirmInfo();
  await seedPracticeAreas();
  await seedTeamMembers();
  await seedContentBlocks();
  console.log("Seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
