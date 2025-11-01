// src/app/api/reservation/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

// Гарантуємо Node.js runtime (для nodemailer)
export const runtime = 'nodejs';

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

    // Опційний зворотній трансфер
    r_pickup: z.string().optional(),
    r_dropoff: z.string().optional(),
    r_date: z.string().optional(),
    r_time: z.string().optional(),
    r_flight: z.string().optional(),
});

// Невеличкий helper для форматування тіла листа
function asText(obj: Record<string, unknown>) {
    return Object.entries(obj)
        .filter(([, v]) => v !== undefined && v !== '')
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
}

export async function POST(req: NextRequest) {
    // 1) читаємо та валідимо JSON
    const json = await req.json().catch(() => null);
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
        return NextResponse.json(
            { ok: false, errors: parsed.error.flatten() },
            { status: 400 },
        );
    }

    const data = parsed.data;

    // 2) Лінивий імпорт nodemailer — так TS не вимагає декларацій
    //    і не буде помилки TS7016. Якщо хочеш статичний імпорт —
    //    просто встанови типи: `npm i -D @types/nodemailer`
    const nodemailer = await import('nodemailer');

    // 3) Транспорт з env (додай їх у .env.local)
    // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const to = process.env.MAIL_TO ?? process.env.SMTP_USER;
    const from = process.env.MAIL_FROM ?? `CarTour <${process.env.SMTP_USER}>`;

    const subject = 'New reservation request';
    const text = asText(data);
    const html = `
    <h2>${subject}</h2>
    <pre style="font-size:14px;line-height:1.5">${text}</pre>
  `;

    // 4) Відправляємо лист
    await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
    });

    return NextResponse.json({ ok: true });
}
