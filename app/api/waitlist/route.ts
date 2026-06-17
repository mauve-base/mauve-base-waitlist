import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const honeypot = body?.website;

  // Bots fill the hidden "website" field; humans never do. Silently accept so
  // the bot thinks it succeeded, but write nothing.
  if (honeypot) return Response.json({ ok: true });

  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 422 },
    );
  }

  const { RESEND_API_KEY, RESEND_AUDIENCE_ID } = process.env;
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    console.error("Missing RESEND_API_KEY or RESEND_AUDIENCE_ID env vars");
    return Response.json(
      { ok: false, error: "Server not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.contacts.create({
    email,
    audienceId: RESEND_AUDIENCE_ID,
    unsubscribed: false,
  });

  // A repeat signup ("already exists") should still read as success to the user.
  if (error && !/already|exist/i.test(error.message ?? "")) {
    console.error("Resend contacts.create error:", error);
    return Response.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
