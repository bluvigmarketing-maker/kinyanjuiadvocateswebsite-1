import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Server-side Supabase client for Server Components, Server Actions, and
 * Route Handlers. Reads/writes auth cookies via next/headers `cookies()`.
 *
 * Server Components can't set cookies (Next.js only allows that in a Server
 * Action or Route Handler), so `setAll` is wrapped in a try/catch there -
 * this is safe as long as the proxy (root proxy.ts) also refreshes the
 * session, which keeps cookies in sync regardless.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component - ignore, proxy.ts refreshes the session.
          }
        },
      },
    }
  );
}

/**
 * Service-role client for server code that must bypass RLS deliberately:
 * the public enquiry API route (no user session exists on a public form)
 * and any future Calendly booking sync. Never import this from a Client
 * Component or expose it to the browser.
 */
export function createServiceRoleClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op: the service-role client never participates in user sessions.
        },
      },
    }
  );
}
