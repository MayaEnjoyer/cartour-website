import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data = await req.json();

    // Мінімальна перевірка обов’язкових полів
    const required = ['firstName','lastName','phone','email','pickup','dropoff','date','time','pax'];
    const missing = required.filter((k) => !data?.[k]);
    if (missing.length) {
        return NextResponse.json(
            { ok: false, error: `Missing: ${missing.join(', ')}` },
            { status: 400 },
        );
    }

    // Тут можна інтегрувати email/CRM. Поки що просто логуємо.
    console.log('New reservation request:', data);

    return NextResponse.json({ ok: true });
}
