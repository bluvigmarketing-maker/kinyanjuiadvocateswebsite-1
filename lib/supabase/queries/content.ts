import { createClient } from "@/lib/supabase/server";
import {
  contentSchemas,
  type ContentPage,
  type ContentSectionKey,
  type ContentValue,
} from "@/lib/content-schemas";

/**
 * Reads one content_blocks section and validates it against its zod schema.
 * Returns `null` on a missing row or a shape mismatch (e.g. before the seed
 * script has run) so callers can fall back to sensible default copy rather
 * than crash the page.
 */
export async function getContentBlock<
  P extends ContentPage,
  S extends ContentSectionKey<P>,
>(page: P, sectionKey: S): Promise<ContentValue<P, S> | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("content_blocks")
    .select("content")
    .eq("page", page)
    .eq("section_key", sectionKey as string)
    .maybeSingle();

  if (!data) return null;

  const schema = contentSchemas[page][sectionKey] as import("zod").ZodType<
    ContentValue<P, S>
  >;
  const parsed = schema.safeParse(data.content);
  return parsed.success ? parsed.data : null;
}
