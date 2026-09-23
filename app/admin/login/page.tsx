"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn, type SignInState } from "@/app/admin/actions";
import logoMark from "@/public/logo-mark.png";

const initialState: SignInState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-ink-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-ink-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src={logoMark}
            alt=""
            priority
            className="h-11 w-auto rounded-md"
          />
          <div>
            <h1 className="font-heading text-xl font-semibold text-ink-950">
              Admin Sign In
            </h1>
            <p className="mt-1 text-sm text-ink-700">
              Kinyanjui T.W &amp; Co. Advocates
            </p>
          </div>
        </div>

        <form action={formAction} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-ink-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="rounded-lg border border-ink-200 px-3 py-2 outline-none focus:border-platinum-500 focus:ring-2 focus:ring-platinum-400/40"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-ink-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded-lg border border-ink-200 px-3 py-2 outline-none focus:border-platinum-500 focus:ring-2 focus:ring-platinum-400/40"
            />
          </div>

          {state.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="btn-metallic accent-line font-semibold"
          >
            {pending ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
