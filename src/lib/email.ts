/**
 * Transactionele mail via Brevo (Frans bedrijf, verwerking binnen de EU).
 * Bewust zonder SDK — één fetch is genoeg en scheelt een dependency.
 */
import { useTranslations, type Locale } from '../i18n/utils';

interface SendArgs {
  to: string;
  name: string;
  confirmUrl: string;
  lang: Locale;
}

export async function sendConfirmationMail({ to, name, confirmUrl, lang }: SendArgs) {
  const apiKey = import.meta.env.BREVO_API_KEY;
  const fromEmail = import.meta.env.MAIL_FROM_EMAIL;
  const fromName = import.meta.env.MAIL_FROM_NAME ?? 'The AI Footprint Meter';

  if (!apiKey || !fromEmail) {
    throw new Error('BREVO_API_KEY of MAIL_FROM_EMAIL ontbreekt. Zie .env.example.');
  }

  const t = useTranslations(lang).email;
  const firstName = name.split(' ')[0] || name;

  const text = [
    `${t.greetingPrefix} ${firstName},`,
    '',
    t.confirmLine,
    confirmUrl,
    '',
    t.body1,
    '',
    t.body2,
  ].join('\n');

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:16px;line-height:1.6;color:#1C1C1A;max-width:32rem">
      <p>${t.greetingPrefix} ${escapeHtml(firstName)},</p>
      <p>${t.confirmLine}</p>
      <p>
        <a href="${confirmUrl}"
           style="display:inline-block;background:#1C1C1A;color:#FAF9F5;padding:14px 24px;text-decoration:none;border-radius:4px;font-weight:600">
          ${t.buttonText}
        </a>
      </p>
      <p style="font-size:14px;color:#6E6E68">
        ${t.buttonFallback}<br />
        <span style="word-break:break-all">${confirmUrl}</span>
      </p>
      <hr style="border:none;border-top:1px solid #E6E3DA;margin:24px 0" />
      <p style="font-size:14px;color:#6E6E68">
        ${t.body1}
      </p>
      <p style="font-size:14px;color:#6E6E68">
        ${t.body2}
      </p>
    </div>
  `;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { name: fromName, email: fromEmail },
      to: [{ email: to, name }],
      replyTo: { email: 'aifootprintmeter@proton.me' },
      subject: t.subject,
      textContent: text,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Brevo gaf ${response.status}: ${await response.text()}`);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
