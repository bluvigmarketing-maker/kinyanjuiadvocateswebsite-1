import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/data/team";

export type TeamMemberWithPhoto = TeamMember & { photoUrl: string | null };

export async function getTeamMembers(): Promise<TeamMemberWithPhoto[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  return (data ?? []).map((row) => ({
    slug: row.slug,
    name: row.name,
    role: row.role,
    bio: row.bio,
    tags: row.tags,
    photoUrl: row.photo_url,
  }));
}
