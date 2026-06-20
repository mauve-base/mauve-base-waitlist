// Brand palette (mirrors app/theme.ts).
const VIOLET = "#5e2d91";
const INK = "#1e1730";
const PAPER = "#faf8fc";

// Escape user-supplied text before it goes into the email HTML. The recipient
// address is attacker-choosable (it's whatever was typed on the form), so an
// unescaped name could smuggle markup into a message sent from our own domain.
const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/**
 * Plain inline-styled HTML — email clients ignore <style>/external CSS and
 * strip class names, so every style lives on the element. Table-free layout is
 * fine for a single centered column on modern clients.
 */
export function buildVerificationEmail(
  confirmUrl: string,
  firstName?: string,
): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = "Confirm your Mauve Base waitlist signup";
  // HTML context gets the escaped name; the plain-text part gets it raw.
  const greetingHtml = firstName ? `Hi ${escapeHtml(firstName)}, thanks` : "Thanks";
  const greetingText = firstName ? `Hi ${firstName}, thanks` : "Thanks";

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:${PAPER};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Confirm your email to join the Mauve Base waitlist.</div>
    <div style="max-width:520px;margin:0 auto;padding:40px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
      <div style="font-size:13px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${VIOLET};">Mauve Base</div>
      <h1 style="margin:24px 0 0;font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-0.02em;color:${INK};">Confirm your email</h1>
      <p style="margin:18px 0 0;font-size:16px;line-height:1.6;color:${INK};opacity:0.78;">
        ${greetingHtml} for requesting early access to Mauve Base. Confirm this email address to lock in your place on the waitlist &mdash; we&rsquo;ll only reach out as we onboard.
      </p>
      <a href="${confirmUrl}" style="display:inline-block;margin:28px 0;padding:14px 26px;background:${VIOLET};color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
        Confirm my email
      </a>
      <p style="margin:0;font-size:13px;line-height:1.6;color:${INK};opacity:0.55;">
        Or paste this link into your browser:<br />
        <a href="${confirmUrl}" style="color:${VIOLET};word-break:break-all;">${confirmUrl}</a>
      </p>
      <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:${INK};opacity:0.55;">
        This link expires in 48 hours. If you didn&rsquo;t request this, you can safely ignore this email.
      </p>
    </div>
  </body>
</html>`;

  const text = [
    "Confirm your Mauve Base waitlist signup",
    "",
    `${greetingText} for requesting early access to Mauve Base. Confirm your email address to lock in your place on the waitlist:`,
    "",
    confirmUrl,
    "",
    "This link expires in 48 hours. If you didn't request this, you can safely ignore this email.",
  ].join("\n");

  return { subject, html, text };
}
