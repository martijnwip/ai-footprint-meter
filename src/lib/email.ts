/**
 * Transactionele mail via Brevo (Frans bedrijf, verwerking binnen de EU).
 * Bewust zonder SDK — één fetch is genoeg en scheelt een dependency.
 */

interface SendArgs {
  to: string;
  name: string;
  confirmUrl: string;
}

export async function sendConfirmationMail({ to, name, confirmUrl }: SendArgs) {
  const apiKey = import.meta.env.BREVO_API_KEY;
  const fromEmail = import.meta.env.MAIL_FROM_EMAIL;
  const fromName = import.meta.env.MAIL_FROM_NAME ?? 'The AI Footprint Meter';

  if (!apiKey || !fromEmail) {
    throw new Error('BREVO_API_KEY of MAIL_FROM_EMAIL ontbreekt. Zie .env.example.');
  }

  const firstName = name.split(' ')[0] || name;

  const text = [
    `Hoi ${firstName},`,
    '',
    'Nog één klik en je naam staat eronder. Bevestig hier:',
    confirmUrl,
    '',
    'Wij vragen de Europese Unie om AI-aanbieders te verplichten het',
    'energieverbruik van elk antwoord te tonen. In de app. Op het moment zelf.',
    '',
    'Heb je dit niet aangevraagd? Doe dan niets. Zonder bevestiging wordt je',
    'gegeven binnen 48 uur verwijderd.',
  ].join('\n');

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:16px;line-height:1.6;color:#1C1C1A;max-width:32rem">
      <p>Hoi ${escapeHtml(firstName)},</p>
      <p>Nog één klik en je naam staat eronder.</p>
      <p>
        <a href="${confirmUrl}"
           style="display:inline-block;background:#1C1C1A;color:#FAF9F5;padding:14px 24px;text-decoration:none;border-radius:4px;font-weight:600">
          Bevestig mijn handtekening
        </a>
      </p>
      <p style="font-size:14px;color:#6E6E68">
        Werkt de knop niet? Plak deze link in je browser:<br />
        <span style="word-break:break-all">${confirmUrl}</span>
      </p>
      <hr style="border:none;border-top:1px solid #E6E3DA;margin:24px 0" />
      <p style="font-size:14px;color:#6E6E68">
        Wij vragen de Europese Unie om AI-aanbieders te verplichten het energieverbruik
        van elk antwoord te tonen. In de app. Op het moment zelf.
      </p>
      <p style="font-size:14px;color:#6E6E68">
        Heb je dit niet aangevraagd? Doe dan niets. Zonder bevestiging wordt je gegeven
        binnen 48 uur verwijderd.
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
      subject: 'Bevestig je handtekening',
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
