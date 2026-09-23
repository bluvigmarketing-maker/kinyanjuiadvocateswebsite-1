import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getStats() {
  const supabase = await createClient();

  const [newEnquiries, upcomingBookings, publishedPosts, draftPosts] =
    await Promise.all([
      supabase
        .from("enquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("status", "active")
        .gte("start_time", new Date().toISOString()),
      supabase
        .from("blog_posts")
        .select("id", { count: "exact", head: true })
        .eq("status", "published"),
      supabase
        .from("blog_posts")
        .select("id", { count: "exact", head: true })
        .eq("status", "draft"),
    ]);

  return {
    newEnquiries: newEnquiries.count ?? 0,
    upcomingBookings: upcomingBookings.count ?? 0,
    publishedPosts: publishedPosts.count ?? 0,
    draftPosts: draftPosts.count ?? 0,
  };
}

const cards = [
  { key: "newEnquiries", label: "New Enquiries", href: "/admin/enquiries" },
  {
    key: "upcomingBookings",
    label: "Upcoming Bookings",
    href: "/admin/bookings",
  },
  { key: "publishedPosts", label: "Published Posts", href: "/admin/blog" },
  { key: "draftPosts", label: "Draft Posts", href: "/admin/blog" },
] as const;

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink-950">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          An at-a-glance view of enquiries, bookings, and blog activity.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="accent-line flex flex-col gap-1 rounded-2xl bg-white p-6 transition-shadow hover:shadow-md"
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-platinum-700 uppercase">
              {card.label}
            </span>
            <span className="font-heading text-4xl font-semibold text-ink-950">
              {stats[card.key]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
