import { createClient } from "@/lib/supabase/server";

export type FirmInfo = {
  name: string;
  shortName: string;
  tagline: string;
  founded: number;
  address: { line1: string; line2: string };
  phone: string;
  emails: string[];
  officeHours: string;
};

/** Falls back to the original hardcoded values (lib/data/firm.ts) if the
 * singleton row hasn't been seeded yet, so pages never render blank. */
const FALLBACK: FirmInfo = {
  name: "Kinyanjui T.W & Co. Advocates",
  shortName: "Kinyanjui Advocates",
  tagline: "Strategic advocacy. Disciplined analysis. Sound legal judgment.",
  founded: 2020,
  address: {
    line1: "Star House, 3rd Floor, Suite 304",
    line2: "Njiri Karago Road, Ruiru, Kenya",
  },
  phone: "0723 938 614",
  emails: ["info@kinyanjuiadvocates.com", "kinyanjuiadvocates@gmail.com"],
  officeHours: "Monday – Friday, 8:00am – 5:00pm",
};

export async function getFirmInfo(): Promise<FirmInfo> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("firm_info")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (!data) return FALLBACK;

  return {
    name: data.name,
    shortName: data.short_name,
    tagline: data.tagline,
    founded: data.founded_year,
    address: { line1: data.address_line1, line2: data.address_line2 },
    phone: data.phone,
    emails: data.emails,
    officeHours: data.office_hours,
  };
}
