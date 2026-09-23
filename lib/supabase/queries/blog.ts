import { createClient } from "@/lib/supabase/server";

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  tags: string[];
  publishedAt: string;
};

export type BlogPost = BlogPostSummary & {
  contentJson: unknown;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImageUrl: string | null;
  canonicalUrl: string | null;
};

const PAGE_SIZE = 9;

export async function getPublishedBlogPosts(options?: {
  page?: number;
  tag?: string;
}): Promise<{ posts: BlogPostSummary[]; total: number }> {
  const page = options?.page ?? 1;
  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
    .select(
      "slug, title, excerpt, cover_image_url, tags, published_at",
      { count: "exact" }
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (options?.tag) {
    query = query.contains("tags", [options.tag]);
  }

  const from = (page - 1) * PAGE_SIZE;
  const { data, count } = await query.range(from, from + PAGE_SIZE - 1);

  return {
    posts: (data ?? []).map((row) => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      coverImageUrl: row.cover_image_url,
      tags: row.tags,
      publishedAt: row.published_at ?? "",
    })),
    total: count ?? 0,
  };
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");
  return (data ?? []).map((row) => row.slug);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    coverImageUrl: data.cover_image_url,
    tags: data.tags,
    publishedAt: data.published_at ?? data.created_at,
    contentJson: data.content_json,
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    ogImageUrl: data.og_image_url,
    canonicalUrl: data.canonical_url,
  };
}

export { PAGE_SIZE as BLOG_PAGE_SIZE };
