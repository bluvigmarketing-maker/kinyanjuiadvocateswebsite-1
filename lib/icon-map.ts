import {
  Building2,
  FileSearch,
  Gavel,
  Landmark,
  ScaleIcon,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Curated allow-list of icons that can be picked in the admin (practice
 * areas, and icon fields inside content_blocks sections). Keeping this as a
 * static Record - rather than a dynamic lucide-react lookup - means the
 * bundler can tree-shake unused icons and the admin's icon picker always
 * matches what's actually available.
 */
export const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  FileSearch,
  Gavel,
  Landmark,
  ScaleIcon,
  ScrollText,
  ShieldCheck,
  Users,
};

export type IconName = keyof typeof ICON_MAP;

export const ICON_NAMES = Object.keys(ICON_MAP) as IconName[];

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Gavel;
}
