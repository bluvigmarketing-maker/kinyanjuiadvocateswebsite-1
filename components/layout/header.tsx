"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/layout/logo";
import { practiceAreas } from "@/lib/data/practice-areas";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="border-b border-ink-100 bg-background">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium text-ink-800 transition-colors hover:bg-muted hover:text-ink-950">
              Practice Areas
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-64">
              {practiceAreas.map((area) => (
                <DropdownMenuItem key={area.slug} className="py-2" render={
                  <Link href={`/practice-areas/${area.slug}`} />
                }>
                  <area.icon
                    className="size-4 text-platinum-700"
                    aria-hidden="true"
                  />
                  {area.title}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="py-2 font-medium text-ink-950" render={
                <Link href="/practice-areas" />
              }>
                View all practice areas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-ink-800 transition-colors hover:bg-muted hover:text-ink-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            className="btn-metallic accent-line font-semibold"
          >
            Book a Consultation
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
          }>
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="w-3/4 sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              <span className="px-2 pt-2 pb-1 text-xs font-semibold tracking-wide text-ink-500 uppercase">
                Practice Areas
              </span>
              {practiceAreas.map((area) => (
                <SheetClose
                  key={area.slug}
                  render={<Link href={`/practice-areas/${area.slug}`} />}
                  nativeButton={false}
                  className="rounded-lg border-l-2 border-transparent px-4 py-2 text-sm text-ink-800 hover:border-platinum-400 hover:bg-muted hover:text-ink-950"
                >
                  {area.title}
                </SheetClose>
              ))}
              <div className="my-2 h-px bg-border" />
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={<Link href={link.href} />}
                  nativeButton={false}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-ink-800 hover:bg-muted hover:text-ink-950"
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto p-4">
              <Button
                render={<Link href="/contact" onClick={() => setOpen(false)} />}
                nativeButton={false}
                className="btn-metallic accent-line w-full font-semibold"
              >
                Book a Consultation
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
