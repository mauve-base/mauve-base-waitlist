import { Resend } from "resend";
import { verifyVerificationToken } from "@/lib/waitlist-token";
import { getOrigin } from "@/lib/site-url";
import { splitName } from "@/lib/name";

export async function GET(request: Request) {
  const origin = getOrigin(request);
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const redirectTo = (status: string) =>
    Response.redirect(`${origin}/verified?status=${status}`, 303);

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

  return redirectTo("success");
}
