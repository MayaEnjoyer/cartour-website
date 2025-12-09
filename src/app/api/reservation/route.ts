// src/app/api/reservation/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

// Гарантуємо Node.js runtime (для nodemailer)
export const runtime = 'nodejs';

// true локально при `npm run dev`, false на Vercel / проде
const IS_DEV = process.env.NODE_ENV !== 'production';

// ---- Валідація даних форми ----
const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().min(3),
    email: z.string().email(),

    pickup: z.string().min(1),
    dropoff: z.string().min(1),
    date: z.string().min(1),
    time: z.string().min(1),

    pax: z.coerce.number().int().min(1).max(8),

    bagsChecked: z.coerce.number().int().min(0).max(12).optional(),
    bagsCarry: z.coerce.number().int().min(0).max(12).optional(),

    flight: z.string().optional(),
    notes: z.string().optional(),

    // опційні додаткові точки
    pickups: z.array(z.string()).optional(),
    dropoffs: z.array(z.string()).optional(),
    pickup_extra: z.array(z.string()).optional(),
    dropoff_extra: z.array(z.string()).optional(),

    r_pickup: z.string().optional(),
    r_dropoff: z.string().optional(),
    r_date: z.string().optional(),
    r_time: z.string().optional(),
    r_flight: z.string().optional(),

    // чекбокс GDPR (нам не критично, але може прийти)
    gdpr: z.string().optional(),
});

type ReservationData = z.infer<typeof schema>;

// ---- Helpers для форматування листа ----

function formatBaggage(data: ReservationData): string {
    const parts: string[] = [];
    if (typeof data.bagsChecked === 'number') {
        parts.push(`Podpalubná: ${data.bagsChecked} ks`);
    }
    if (typeof data.bagsCarry === 'number') {
        parts.push(`Príručná: ${data.bagsCarry} ks`);
    }
    return parts.length ? parts.join(', ') : 'bez špecifikácie';
}

function hasReturn(data: ReservationData): boolean {
    return Boolean(
        data.r_pickup ||
        data.r_dropoff ||
        data.r_date ||
        data.r_time ||
        data.r_flight,
    );
}

function buildTextBody(data: ReservationData): string {
    const pickupExtra = (data.pickup_extra ?? []).filter((v) => v.trim() !== '');
    const dropoffExtra = (data.dropoff_extra ?? []).filter(
        (v) => v.trim() !== '',
    );

    const lines: string[] = [];

    lines.push('Nová rezervácia na prepravu');
    lines.push('');
    lines.push(`Meno: ${data.firstName} ${data.lastName}`);
    lines.push(`Telefón: ${data.phone}`);
    lines.push(`E-mail: ${data.email}`);
    lines.push('');
    lines.push(`Miesto vyzdvihnutia: ${data.pickup}`);

    if (pickupExtra.length) {
        lines.push(
            'Ďalšie miesta vyzdvihnutia:',
            ...pickupExtra.map((p) => `  • ${p}`),
        );
    }

    lines.push(`Miesto vysadenia: ${data.dropoff}`);

    if (dropoffExtra.length) {
        lines.push(
            'Ďalšie miesta vysadenia:',
            ...dropoffExtra.map((p) => `  • ${p}`),
        );
    }

    lines.push(`Dátum vyzdvihnutia: ${data.date}`);
    lines.push(`Čas vyzdvihnutia: ${data.time}`);
    lines.push('');
    lines.push(
        `Počet osôb (informácia, cena sa pri počte osôb nemení): ${data.pax}`,
    );
    lines.push(`Batožina: ${formatBaggage(data)}`);
    lines.push(`Čísло letu: ${data.flight || '—'}`);
    lines.push('');

    const notes = (data.notes ?? '').trim();
    lines.push(`Špeciálne požiadavky: ${notes || '—'}`);

    if (hasReturn(data)) {
        lines.push('');
        lines.push('Spätný transfer:');
        lines.push(`  Miesto vyzdvihnutia: ${data.r_pickup || '-'}`);
        lines.push(`  Miesto vysadenia:   ${data.r_dropoff || '-'}`);
        lines.push(`  Dátum návratu:      ${data.r_date || '-'}`);
        lines.push(`  Čas návratu:        ${data.r_time || '-'}`);
        lines.push(`  Číslo letu (návrat): ${data.r_flight || '-'}`);
    } else {
        lines.push('');
        lines.push('Spätný transfer: klient nepožaduje.');
    }

    lines.push('');
    lines.push('---');
    const site = process.env.NEXT_PUBLIC_SITE_URL ?? '';
    if (site) {
        lines.push(`Odoslané z rezervačného formulára Cartour (${site})`);
    } else {
        lines.push('Odoslané z rezervačného formulára Cartour.');
    }

    return lines.join('\n');
}

// HTML-body для листа
function buildHtmlBody(data: ReservationData, subject: string): string {
    const baggage = formatBaggage(data);
    const notes = (data.notes ?? '').trim() || '—';
    const pickupExtra = (data.pickup_extra ?? []).filter((v) => v.trim() !== '');
    const dropoffExtra = (data.dropoff_extra ?? []).filter(
        (v) => v.trim() !== '',
    );
    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.cartour.sk';

    return `<!doctype html>
<html lang="sk">
<head>
  <meta charSet="utf-8" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;">
  <div style="max-width:640px;margin:0 auto;padding:24px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="background:#111827;border-radius:16px 16px 0 0;padding:16px 20px;">
      <h1 style="margin:0;font-size:20px;line-height:1.3;color:#f9fafb;">Nová rezervácia na prepravu</h1>
      <p style="margin:4px 0 0 0;font-size:13px;color:#9ca3af;">Online rezervácia z webu Cartour.</p>
    </div>

    <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:20px 20px 18px;border:1px solid #e5e7eb;border-top:none;font-size:14px;color:#111827;">
      <h2 style="margin:0 0 8px 0;font-size:16px;">Osobné údaje</h2>
      <p style="margin:0 0 4px 0;"><strong>Meno:</strong> ${data.firstName} ${data.lastName}</p>
      <p style="margin:0 0 4px 0;"><strong>Telefón:</strong> ${data.phone}</p>
      <p style="margin:0 0 12px 0;"><strong>E-mail:</strong> ${data.email}</p>

      <h2 style="margin:0 0 8px 0;font-size:16px;">Detaily jazdy</h2>
      <p style="margin:0 0 4px 0;"><strong>Miesto vyzdvihnutia:</strong> ${data.pickup}</p>
      ${
        pickupExtra.length
            ? `<p style="margin:0 0 4px 0;"><strong>Ďalšie miesta vyzdvihnutia:</strong><br/>${pickupExtra
                .map((p) => `• ${p}`)
                .join('<br/>')}</p>`
            : ''
    }
      <p style="margin:0 0 4px 0;"><strong>Miesto vysadenia:</strong> ${data.dropoff}</p>
      ${
        dropoffExtra.length
            ? `<p style="margin:0 0 4px 0;"><strong>Ďalšie miesta vysadenia:</strong><br/>${dropoffExtra
                .map((p) => `• ${p}`)
                .join('<br/>')}</p>`
            : ''
    }
      <p style="margin:0 0 4px 0;"><strong>Dátum vyzdvihnutia:</strong> ${data.date}</p>
      <p style="margin:0 0 12px 0;"><strong>Čас vyzdvihnutia:</strong> ${data.time}</p>

      <h2 style="margin:0 0 8px 0;font-size:16px;">Cestujúci a batožina</h2>
      <p style="margin:0 0 4px 0;"><strong>Počet osôb</strong> (informácia, cena sa pri počте osôb nemení): ${data.pax}</p>
      <p style="margin:0 0 4px 0;"><strong>Batožina:</strong> ${baggage}</p>
      <p style="margin:0 0 12px 0;"><strong>Číslo letu:</strong> ${data.flight || '—'}</p>

      <h2 style="margin:0 0 8px 0;font-size:16px;">Špeciálne požiadavky</h2>
      <p style="margin:0 0 12px 0;white-space:pre-line;">${notes}</p>

      ${
        hasReturn(data)
            ? `<h2 style="margin:0 0 8px 0;font-size:16px;">Spätný transfer</h2>
      <p style="margin:0 0 4px 0;"><strong>Miesto vyzdvihnutia:</strong> ${
                data.r_pickup || '-'
            }</p>
      <p style="margin:0 0 4px 0;"><strong>Miesto vysadenia:</strong> ${
                data.r_dropoff || '-'
            }</p>
      <p style="margin:0 0 4px 0;"><strong>Dátum návratu:</strong> ${
                data.r_date || '-'
            }</p>
      <p style="margin:0 0 12px 0;"><strong>Čас návratu:</strong> ${
                data.r_time || '-'
            }</p>
      <p style="margin:0 0 12px 0;"><strong>Čísло letu (návrat):</strong> ${
                data.r_flight || '-'
            }</p>`
            : `<h2 style="margin:0 0 8px 0;font-size:16px;">Spätný transfer</h2>
      <p style="margin:0 0 12px 0;">Klient nepožaduje spätný transfer.</p>`
    }

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0 10px;" />
      <p style="margin:0;font-size:12px;color:#6b7280;">
        Tento e-mail bol vygenerovaný automaticky z formulára na stránke
        <a href="${siteUrl}" style="color:#0ea5e9;text-decoration:none;">${siteUrl}</a>.
        Na správu môžete priamo odpovedať.
      </p>
    </div>

    <p style="margin:16px 0 0 0;font-size:11px;color:#9ca3af;text-align:center;">
      Cartour – letiskové a mestské transfery
    </p>
  </div>
</body>
</html>`;
}

// ---- Обробник POST ----

export async function POST(req: NextRequest) {
    const json = await req.json().catch(() => null);

    if (!json) {
        return NextResponse.json(
            {ok: false, errors: {_errors: ['Invalid JSON']}},
            {status: 400},
        );
    }

    // DEV-режим: на localhost не валидируем и не шлём письма,
    // только показываем модалку, чтобы можно было спокойно верстать.
    if (IS_DEV) {
        console.log('[DEV] reservation payload:', json);
        return NextResponse.json({ok: true});
    }

    const parsed = schema.safeParse(json);

    if (!parsed.success) {
        return NextResponse.json(
            {ok: false, errors: parsed.error.format()},
            {status: 400},
        );
    }

    const data = parsed.data;

    const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS} = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        console.error(
            'Reservation mail error: missing SMTP_* env variables',
        );
        return NextResponse.json(
            {ok: false, errors: {_errors: ['Mail config error']}},
            {status: 500},
        );
    }

    // Лінивий імпорт nodemailer
    const nodemailer = await import('nodemailer');

    // По умолчанию ждём порт 465 (SSL/TLS), как на Websupport
    const port = Number(SMTP_PORT || '465');
    const useSecure = port === 465;

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: useSecure, // true для 465
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    const to =
        process.env.MAIL_TO ??
        SMTP_USER ??
        'info@cartour.sk';

    const from =
        process.env.MAIL_FROM ?? `CarTour <${SMTP_USER}>`;

    const subject = `Rezervácia prepravy - ${data.firstName} ${data.lastName} - ${data.date}`;
    const textBody = buildTextBody(data);
    const htmlBody = buildHtmlBody(data, subject);

    try {
        await transporter.sendMail({
            from,
            to,
            subject,
            text: textBody,
            html: htmlBody,
            replyTo: `${data.firstName} ${data.lastName} <${data.email}>`,
        });

        return NextResponse.json({ok: true});
    } catch (err: unknown) {
        console.error('Reservation mail error', err);

        const message =
            err instanceof Error
                ? err.message
                : 'Mail send failed';

        return NextResponse.json(
            {ok: false, errors: {_errors: [message]}},
            {status: 500},
        );
    }
}
