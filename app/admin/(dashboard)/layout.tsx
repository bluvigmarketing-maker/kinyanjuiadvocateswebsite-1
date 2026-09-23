import { redirect } from "next/navigation";
import { Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/admin/actions";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense in depth alongside proxy.ts - also needed here to render the
  // signed-in email. Per Next.js's Data Security guidance, a proxy matcher
  // change could silently skip coverage, so every protected surface
  // re-checks auth itself rather than trusting proxy.ts alone.
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-full">
      <aside className="hidden w-60 shrink-0 border-r border-ink-100 bg-white md:block">
        <div className="border-b border-ink-100 px-4 py-5">
          <p className="font-heading text-sm font-semibold text-ink-950">
            Kinyanjui Advocates
          </p>
          <p className="text-xs text-ink-500">Admin Dashboard</p>
        </div>
        <AdminSidebar />
      </aside>

      <div className="flex min-h-full flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-ink-100 bg-white px-4 sm:px-6">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="border-b border-ink-100 px-4 py-5 text-left">
                <SheetTitle className="font-heading text-sm font-semibold text-ink-950">
                  Kinyanjui Advocates
                </SheetTitle>
                <p className="text-xs text-ink-500">Admin Dashboard</p>
              </SheetHeader>
              <AdminSidebar />
            </SheetContent>
          </Sheet>

          <span className="hidden text-sm font-medium text-ink-800 md:block" />

          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-600">{user.email}</span>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Sign Out
              </Button>
            </form>
          </div>
        </header>

        <main className="flex-1 bg-ink-50 p-4 sm:p-8">{children}</main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
