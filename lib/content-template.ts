/**
 * Expands `{{token}}` placeholders (e.g. "{{foundedYear}}") in admin-edited
 * copy against a fixed set of values sourced elsewhere (firm_info), so a
 * fact like the founding year stays single-sourced without locking that
 * sentence out of the content editor.
 */
export function renderTemplate(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  );
}
