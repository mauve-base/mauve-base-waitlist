import { Resend } from "resend";
import {
  verifyVerificationToken,
  getTokenId,
} from "@/lib/waitlist-token";
import { getOrigin } from "@/lib/site-url";
import { splitName } from "@/lib/name";
import { wasTokenUsed, rememberTokenUsed } from "@/lib/waitlist-replay";

// Confirmation is a POST (from the /verify confirm page), NOT a GET. Mail
// security scanners and link-preview bots auto-fetch GET links in emails; making
// the mutation a POST stops them from silently auto-confirming signups.
const USED_TTL_SEC = 48 * 60 * 60;

export async function POST(request: Request) {
  const origin = getOrigin(request);
  const redirectTo = (status: string) =>
    Response.redirect(`${origin}/verified?status=${status}`, 303);

  const form = await request.formData().catch(() => null);
  const token = String(form?.get("token") ?? "");

  const result = verifyVerificationToken(token);
  if (!result.ok) {
    // "invalid" (forged/garbled) or "expired".
    return redirectTo(result.reason);
  }

  const { RESEND_API_KEY, RESEND_AUDIENCE_ID } = process.env;
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    console.error("Missing RESEND_API_KEY or RESEND_AUDIENCE_ID env vars");
    return redirectTo("error");
  }

  // Single-use: an already-redeemed token just lands on success (idempotent for
  // double-clicks) and can't be replayed to re-subscribe someone.
  const tokenId = getTokenId(token);
  if (await wasTokenUsed(tokenId)) return redirectTo("success");

  const { email, name, company, category, role } = result.data;
  const { firstName, lastName } = splitName(name);
  const properties = {
    category,
    company,
    role: category === "other" ? role : "",
  };

  const resend = new Resend(RESEND_API_KEY);

  // Verified: NOW add the contact to the audience, subscribed.
  const { error: createError } = await resend.contacts.create({
    email,
    audienceId: RESEND_AUDIENCE_ID,
    unsubscribed: false,
    firstName,
    lastName,
    properties,
  });

  // Clicking the link twice ("already exists") is success — make sure they're
  // subscribed and their details are current.
  if (createError && /already|exist/i.test(createError.message ?? "")) {
    await resend.contacts.update({
      email,
      audienceId: RESEND_AUDIENCE_ID,
      unsubscribed: false,
      firstName,
      lastName,
      properties,
    });
  } else if (createError) {
    console.error("Resend confirm (contacts.create) error:", createError);
    return redirectTo("error");
  }

  // Only mark used after a successful write, so a transient Resend error still
  // lets the recipient retry their link.
  await rememberTokenUsed(tokenId, USED_TTL_SEC);
  return redirectTo("success");
}

// Backwards-compat for one-click links from emails sent before this change:
// bounce them to the confirm page (no side effect) instead of returning 405.
export async function GET(request: Request) {
  const origin = getOrigin(request);
  const token = new URL(request.url).searchParams.get("token") ?? "";
  return Response.redirect(
    `${origin}/verify?token=${encodeURIComponent(token)}`,
    302,
  );
}
