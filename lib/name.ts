/** Splits a full name into Resend's first/last fields (first word vs the rest). */
export function splitName(name: string): { firstName: string; lastName?: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? name.trim(),
    lastName: parts.slice(1).join(" ") || undefined,
  };
}
