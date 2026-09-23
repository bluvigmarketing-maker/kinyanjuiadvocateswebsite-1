import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16 renamed the `middleware.ts` file convention to `proxy.ts`
// (same behavior, same `config.matcher`) - see AGENTS.md and
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md.
export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
