import { createClient } from "@/lib/supabase/server";
import { resolveIcon } from "@/lib/icon-map";
import type { PracticeArea } from "@/lib/data/practice-areas";

function toPracticeArea(
  row: {
    slug: string;
    order_index: number;
    title: string;
    icon_name: string;
    summary: string;
    intro: string;
    items: string[];
    closing: string | null;
  },
  index: number
): PracticeArea {
  return {
    slug: row.slug,
    number: String(index + 1).padStart(2, "0"),
    title: row.title,
    icon: resolveIcon(row.icon_name),
    summary: row.summary,
    intro: row.intro,
    items: row.items,
    closing: row.closing ?? undefined,
  };
}

export async function getPracticeAreas(): Promise<PracticeArea[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("practice_areas")
    .select("*")
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  return (data ?? []).map(toPracticeArea);
}

export async function getPracticeAreaBySlug(
  slug: string
): Promise<PracticeArea | undefined> {
  const areas = await getPracticeAreas();
  return areas.find((area) => area.slug === slug);
}
