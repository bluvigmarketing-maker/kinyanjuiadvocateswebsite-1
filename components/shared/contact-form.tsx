"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { firm } from "@/lib/data/firm";

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sent">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const message = String(formData.get("message") ?? "");

    const subject = encodeURIComponent(`Consultation enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:${firm.emails[0]}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-ink-900">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-lg border border-ink-200 px-3 py-2 outline-none focus:border-platinum-500 focus:ring-2 focus:ring-platinum-400/40"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-ink-900">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="rounded-lg border border-ink-200 px-3 py-2 outline-none focus:border-platinum-500 focus:ring-2 focus:ring-platinum-400/40"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-ink-900">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-ink-200 px-3 py-2 outline-none focus:border-platinum-500 focus:ring-2 focus:ring-platinum-400/40"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink-900">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="resize-none rounded-lg border border-ink-200 px-3 py-2 outline-none focus:border-platinum-500 focus:ring-2 focus:ring-platinum-400/40"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="btn-metallic accent-line w-fit font-semibold"
      >
        Send Enquiry
      </Button>
      {status === "sent" ? (
        <p className="text-sm text-ink-700">
          Your email client should now be open with your message ready to
          send. If it didn&apos;t open, email us directly at{" "}
          <a
            href={`mailto:${firm.emails[0]}`}
            className="font-semibold text-ink-950 underline underline-offset-4"
          >
            {firm.emails[0]}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
