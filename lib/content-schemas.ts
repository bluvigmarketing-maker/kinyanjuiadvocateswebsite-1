import { z } from "zod";
import { ICON_NAMES } from "@/lib/icon-map";

const iconName = z.enum(ICON_NAMES as [string, ...string[]]);

/**
 * Shape of every editable `content_blocks` row, keyed by `page.section_key`.
 * Each schema is the single source of truth for: the admin form fields,
 * validation on save, and the type the public page query mapper returns.
 *
 * Text that needs to interpolate a value from `firm_info` (currently just
 * the founding year) uses a `{{foundedYear}}` token, expanded at render time
 * by `renderTemplate` in lib/content-template.ts - this keeps the founding
 * year single-sourced in firm_info while still letting the admin edit the
 * surrounding sentence freely.
 */
export const contentSchemas = {
  home: {
    hero: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      primaryCtaLabel: z.string().min(1),
      secondaryCtaLabel: z.string().min(1),
    }),
    about_teaser: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      paragraphs: z.array(z.string().min(1)).min(1),
      linkLabel: z.string().min(1),
    }),
    scope_of_work: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      items: z
        .array(
          z.object({
            iconName,
            title: z.string().min(1),
            description: z.string().min(1),
          })
        )
        .min(1),
    }),
    philosophy: z.object({
      quote: z.string().min(1),
      attribution: z.string().min(1),
    }),
    team_teaser: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      linkLabel: z.string().min(1),
    }),
    cta: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      buttonLabel: z.string().min(1),
    }),
  },
  about: {
    hero: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
    }),
    who_we_are: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      paragraphs: z.array(z.string().min(1)).min(1),
    }),
    philosophy: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      cards: z
        .array(
          z.object({
            iconName,
            title: z.string().min(1),
            body: z.string().min(1),
          })
        )
        .min(1),
    }),
    scope_of_work: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      items: z.array(z.string().min(1)).min(1),
      closingParagraph: z.string().min(1),
    }),
    clients: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      paragraph: z.string().min(1),
      buttonLabel: z.string().min(1),
    }),
  },
  contact: {
    hero: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
    }),
    form_intro: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  },
} as const;

export type ContentPage = keyof typeof contentSchemas;
export type ContentSectionKey<P extends ContentPage> =
  keyof (typeof contentSchemas)[P];

export type ContentValue<
  P extends ContentPage,
  S extends ContentSectionKey<P>,
> = z.infer<(typeof contentSchemas)[P][S]>;

/** Flat list of every (page, sectionKey) pair, used to drive the seed script and nav. */
export const CONTENT_SECTION_LIST = (
  Object.keys(contentSchemas) as ContentPage[]
).flatMap((page) =>
  (Object.keys(contentSchemas[page]) as ContentSectionKey<typeof page>[]).map(
    (sectionKey) => ({ page, sectionKey })
  )
);
