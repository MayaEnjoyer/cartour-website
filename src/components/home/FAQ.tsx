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
                {
                    q: 'Čo sa stane, ak môj let mešká?',
                    a: 'V rezervačnom formulári uveďte číslo príletu. Let sledujeme a prispôsobíme sa meškaniu bez príplatku – počkáme na vás.',
                },
                {
                    q: 'Aké vozidlá máte k dispozícii?',
                    a: 'Jazdíme výhradne vozidlami Mercedes-Benz. K dispozícii sú pohodlné 4-miestne aj priestranné 5–8 miestne vozidlá.',
                },
                {
                    q: 'Viete ma odviezť na Schwechat aj mimo Bratislavy?',
                    a: 'Áno, odvoz zabezpečujeme aj z miest mimo Bratislavy. Radi pripravíme individuálnu cenovú ponuku.',
                },
                {
                    q: 'Ako dlho trvá cesta na letisko Schwechat?',
                    a: 'Priemerne 45–55 minút v závislosti od dopravnej situácie.',
                },
                {
                    q: 'Môžem si rezervovať spätnú cestu?',
                    a: 'Áno. Zaškrtnite možnosť „Mám záujem aj o spiatočnú cestu“ a vyplňte údaje k návratu.',
                },
                {
                    q: 'Ako môžem platiť?',
                    a: 'Hotovosťou u vodiča, kartou alebo na faktúru (firemní klienti).',
                },
            ],
        },
        en: {
            heading: 'Frequently asked questions',
            items: [
                {
                    q: 'What if my flight is delayed?',
                    a: 'Provide your flight number. We track arrivals and adjust pickup with no extra fees — we wait for you.',
                },
                {
                    q: 'What vehicles do you operate?',
                    a: 'Exclusively Mercedes-Benz, from comfortable 4-seaters to spacious 5–8 seat vans.',
                },
                {
                    q: 'Do you serve Schwechat from outside Bratislava?',
                    a: 'Yes. We also pick up outside Bratislava; request a tailored quote.',
                },
                {
                    q: 'How long is the ride to Vienna Airport?',
                    a: 'Typically 45–55 minutes, depending on traffic.',
                },
                {
                    q: 'Can I book a return trip?',
                    a: 'Yes — tick “I also want a return trip” and fill in the return details.',
                },
                {
                    q: 'What payment methods are available?',
                    a: 'Cash to the driver, card payment, or invoice for business clients.',
                },
            ],
        },
        de: {
            heading: 'Häufige Fragen',
            items: [
                {
                    q: 'Was passiert bei Flugverspätung?',
                    a: 'Geben Sie die Flugnummer an. Wir verfolgen Ankünfte und passen die Abholung ohne Aufpreis an — wir warten.',
                },
                {
                    q: 'Welche Fahrzeuge nutzen Sie?',
                    a: 'Ausschließlich Mercedes-Benz, von bequemen 4-Sitzern bis zu geräumigen 5–8-Sitzern.',
                },
                {
                    q: 'Fahren Sie den Flughafen Schwechat auch außerhalb von Bratislava an?',
                    a: 'Ja, auch Abholungen außerhalb Bratislavas sind möglich — gerne mit individuellem Angebot.',
                },
                {
                    q: 'Wie lange dauert die Fahrt nach Schwechat?',
                    a: 'In der Regel 45–55 Minuten, je nach Verkehr.',
                },
                {
                    q: 'Kann ich eine Rückfahrt buchen?',
                    a: 'Ja — Option „Ich möchte auch die Rückfahrt“ aktivieren und die Daten ergänzen.',
                },
                {
                    q: 'Welche Zahlungsarten gibt es?',
                    a: 'Barzahlung beim Fahrer, Kartenzahlung oder Rechnung (Firmenkunden).',
                },
            ],
        },
    };

    const t = dict[isLocale(locale) ? locale : 'sk'];

    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.heading}</h2>
            <div className="mt-6">
                <Accordion
                    items={t.items.map(({ q, a }) => ({ title: q, content: a }))}
                    defaultOpen={0}
                />
            </div>
        </section>
    );
}
