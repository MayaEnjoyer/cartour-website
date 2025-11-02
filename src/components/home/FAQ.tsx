'use client';

import Accordion from '../ui/Accordion';

const locales = ['sk', 'en', 'de'] as const;
type Locale = typeof locales[number];
function isLocale(x: string): x is Locale {
    return (locales as readonly string[]).includes(x);
}

type QA = { q: string; a: string };
type Dict = Record<Locale, { heading: string; items: QA[] }>;

export default function FAQ({ locale }: { locale: string }) {
    const dict: Dict = {
        sk: {
            heading: 'Často kladené otázky',
            items: [
                { q: 'Čo sa stane, ak môj let mešká?', a: 'Uveďte číslo príletu. Let sledujeme a prispôsobíme sa meškaniu bez príplatku — počkáme na vás.' },
                { q: 'Aké vozidlá máte k dispozícii?', a: 'Výhradne Mercedes-Benz, pohodlné 4-miestne aj priestranné 5–8 miestne.' },
                { q: 'Viete ma odviezť na Schwechat aj mimo Bratislavy?', a: 'Áno, aj mimo BA. Pripravíme individuálnu cenovú ponuku.' },
                { q: 'Ako dlho trvá cesta na letisko Schwechat?', a: 'Priemerne 45–55 minút podľa premávky.' },
                { q: 'Môžem si rezervovať spätnú cestu?', a: 'Áno. Zaškrtnite možnosť “spiatočná cesta” a vyplňte údaje.' },
                { q: 'Ako môžem platiť?', a: 'Hotovosť, karta alebo faktúra (firemní klienti).' },
            ],
        },
        en: {
            heading: 'Frequently asked questions',
            items: [
                { q: 'What if my flight is delayed?', a: 'Provide your flight number. We track arrivals and wait — no extra fees.' },
                { q: 'What vehicles do you operate?', a: 'Exclusively Mercedes-Benz; 4-seaters and 5–8 seat vans.' },
                { q: 'Do you serve Schwechat from outside Bratislava?', a: 'Yes, pickups outside Bratislava as well — ask for a quote.' },
                { q: 'How long to Vienna Airport?', a: 'Typically 45–55 minutes depending on traffic.' },
                { q: 'Can I book a return trip?', a: 'Yes — tick the “return trip” option and fill in details.' },
                { q: 'Payment methods?', a: 'Cash to the driver, card payment, or invoice (business).' },
            ],
        },
        de: {
            heading: 'Häufige Fragen',
            items: [
                { q: 'Was passiert bei Flugverspätung?', a: 'Flugnummer angeben. Wir verfolgen Ankünfte und warten ohne Aufpreis.' },
                { q: 'Welche Fahrzeuge nutzen Sie?', a: 'Ausschließlich Mercedes-Benz; 4-Sitzer und 5–8-Sitzer.' },
                { q: 'Auch außerhalb Bratislava nach Schwechat?', a: 'Ja, auch Abholungen außerhalb — Angebot auf Anfrage.' },
                { q: 'Wie lange bis Schwechat?', a: 'Meist 45–55 Minuten je nach Verkehr.' },
                { q: 'Rückfahrt buchbar?', a: 'Ja — Option „Rückfahrt“ aktivieren und Daten ergänzen.' },
                { q: 'Zahlungsarten?', a: 'Bar, Karte oder Rechnung (Firmenkunden).' },
            ],
        },
    };

    const t = dict[isLocale(locale) ? locale : 'sk'];

    return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <div className="inline-flex items-center gap-2">
                <span className="h-2 w-10 rounded bg-sky-400" />
                <span className="h-2 w-6 rounded bg-rose-500" />
            </div>

            <div className="mt-3 rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t.heading}</h2>
                <div className="mt-6 text-[15px] sm:text-base">
                    <Accordion items={t.items.map(({ q, a }) => ({ title: q, content: a }))} defaultOpen={0} />
                </div>
            </div>
        </section>
    );
}
