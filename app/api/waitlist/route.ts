import { Resend } from "resend";
import { createVerificationToken } from "@/lib/waitlist-token";
import { buildVerificationEmail } from "@/lib/waitlist-email";
import { getOrigin } from "@/lib/site-url";
import { splitName } from "@/lib/name";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORIES = ["vendor", "restaurant", "other"];

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  // Bots fill the hidden "website" field; humans never do. Silently accept so
  // the bot thinks it succeeded, but write nothing.
  if (body?.website) return Response.json({ ok: true });

  const email = String(body?.email ?? "").trim().toLowerCase();
  const name = String(body?.name ?? "").trim();
  const company = String(body?.company ?? "").trim();
  const category = String(body?.category ?? "").trim().toLowerCase();
  const role = String(body?.role ?? "").trim(); // free-text detail when category === "other"

  const fail = (error: string) =>
    Response.json({ ok: false, error }, { status: 422 });

  if (!EMAIL_RE.test(email)) return fail("Please enter a valid email.");
  if (!name) return fail("Please enter your name.");
  if (!company) return fail("Please enter your company.");
  if (!CATEGORIES.includes(category)) return fail("Please tell us what you are.");
  if (category === "other" && !role) return fail("Please tell us what you are.");

  const { RESEND_API_KEY, RESEND_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL env vars");
    return Response.json(
      { ok: false, error: "Server not configured." },
      { status: 500 },
    );
  }

  // Double opt-in: we do NOT add the contact yet. The signed link below carries
  // the whole signup; the contact is only created in Resend once the recipient
  // clicks it (see /api/waitlist/verify). So an unverified email never lands in
  // the audience.
  const token = createVerificationToken({ email, name, company, category, role });
  const confirmUrl = `${getOrigin(request)}/api/waitlist/verify?token=${encodeURIComponent(token)}`;
  const { firstName } = splitName(name);
  const { subject, html, text } = buildVerificationEmail(confirmUrl, firstName);

  const resend = new Resend(RESEND_API_KEY);
  const { error: sendError } = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: email,
    subject,
    html,
    text,
  });

  if (sendError) {
    console.error("Resend emails.send error:", sendError);
    return Response.json(
      {
        ok: false,
        error: "We couldn't send your confirmation email. Please try again.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
