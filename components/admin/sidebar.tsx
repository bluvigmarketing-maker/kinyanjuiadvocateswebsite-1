"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  FileText,
  Inbox,
  LayoutDashboard,
  Newspaper,
  Scale,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Page Content", href: "/admin/content", icon: FileText },
  { label: "Practice Areas", href: "/admin/practice-areas", icon: Scale },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarClock },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-ink-950 text-white"
                : "text-ink-700 hover:bg-muted hover:text-ink-950"
            )}
          >
            <item.icon className="size-4 shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
