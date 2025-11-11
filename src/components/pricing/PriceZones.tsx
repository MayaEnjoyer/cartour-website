'use client';

import Link from 'next/link';

type Zone = {
    name: string;
    sedan: string;
    van: string;
    areas: string[];
};

type PriceZonesDict = {
    heading: string;
    route: string;
    zones: Zone[];
    includedTitle: string;
    included: string[];
};

export default function PriceZones({ locale }: { locale: string }) {
    const sk: PriceZonesDict = {
        heading: 'Cenník — Schwechat',
        route: 'Bratislava ↔ Letisko Viedeň – Schwechat',
        zones: [
            {
                name: 'Centrum a blízke mestské časti',
                sedan: '60€',
                van: '75€ (VAN 5/8 osôb)',
                areas: [
                    'Staré Mesto',
                    'Ružinov',
                    'Nové Mesto',
                    'Petržalka',
                    'Karlova Ves',
                    'Jarovce',
                    'Hlavná vlaková stanica',
                ],
            },
            {
                name: 'Rozšírené mestské časti',
                sedan: '65€',
                van: '85€ (VAN 5/8 osôb)',
                areas: [
                    'Rača',
                    'Vajnory',
                    'Devín',
                    'Vrakuňa',
                    'Letisko M. R. Štefánika (BTS)',
                    'Podunajské Biskupice',
                    'Rusovce',
                    'Dúbravka',
                    'Lamač',
                ],
            },
            {
                name: 'Okrajové mestské časti',
                sedan: '70€',
                van: '95€ (VAN 5/8 osôb)',
                areas: ['Záhorská Bystrica', 'Devínska Nová Ves', 'Čuňovo'],
            },
        ],
        includedTitle: 'V cene transferu je zahrnuté',
        included: [
            'Parkovné na letiskových termináloch',
            'Diaľničné poplatky',
            'Pitný režim vo vozidle',
        ],
    };

    const en: PriceZonesDict = {
        heading: 'Pricing — Schwechat',
        route: 'Bratislava ↔ Vienna Airport (Schwechat)',
        zones: [
            {
                name: 'City centre & nearby districts',
                sedan: '€60',
                van: '€75 (VAN 5/8 seats)',
                areas: [
                    'Staré Mesto (Old Town)',
                    'Ružinov',
                    'Nové Mesto',
                    'Petržalka',
                    'Karlova Ves',
                    'Jarovce',
                    'Main railway station',
                ],
            },
            {
                name: 'Extended districts',
                sedan: '€65',
                van: '€85 (VAN 5/8 seats)',
                areas: [
                    'Rača',
                    'Vajnory',
                    'Devín',
                    'Vrakuňa',
                    'Bratislava Airport (BTS)',
                    'Podunajské Biskupice',
                    'Rusovce',
                    'Dúbravka',
                    'Lamač',
                ],
            },
            {
                name: 'Outer districts',
                sedan: '€70',
                van: '€95 (VAN 5/8 seats)',
                areas: ['Záhorská Bystrica', 'Devínska Nová Ves', 'Čuňovo'],
            },
        ],
        includedTitle: 'Included in the price',
        included: ['Airport terminal parking', 'Highway tolls', 'Bottled water on board'],
    };

    const de: PriceZonesDict = {
        heading: 'Preise — Schwechat',
        route: 'Bratislava ↔ Flughafen Wien (Schwechat)',
        zones: [
            {
                name: 'Zentrum & nahe Bezirke',
                sedan: '60€',
                van: '75€ (VAN 5/8 Plätze)',
                areas: [
                    'Staré Mesto',
                    'Ružinov',
                    'Nové Mesto',
                    'Petržalka',
                    'Karlova Ves',
                    'Jarovce',
                    'Hauptbahnhof',
                ],
            },
            {
                name: 'Erweiterte Stadtteile',
                sedan: '65€',
                van: '85€ (VAN 5/8 Plätze)',
                areas: [
                    'Rača',
                    'Vajnory',
                    'Devín',
                    'Vrakuňa',
                    'Flughafen BTS',
                    'Podunajské Biskupice',
                    'Rusovce',
                    'Dúbravka',
                    'Lamač',
                ],
            },
            {
                name: 'Äußere Stadtteile',
                sedan: '70€',
                van: '95€ (VAN 5/8 Plätze)',
                areas: ['Záhorská Bystrica', 'Devínska Nová Ves', 'Čuňovo'],
            },
        ],
        includedTitle: 'Im Preis enthalten',
        included: ['Terminal-Parkgebühren', 'Mautgebühren', 'Getränke im Fahrzeug'],
    };

    const dict = locale === 'en' ? en : locale === 'de' ? de : sk;

    // Легка підсвітка "без прихованих платежів"
    const tagline =
        locale === 'en'
            ? {
                before: 'Fixed prices by Bratislava zones — ',
                hi: 'no hidden fees',
                after: '.',
            }
            : locale === 'de'
                ? {
                    before: 'Feste Preise nach Bratislava-Zonen — ',
                    hi: 'keine versteckten Gebühren',
                    after: '.',
                }
                : {
                    before: 'Fixné ceny podľa zón Bratislavy — ',
                    hi: 'žiadne skryté poplatky',
                    after: '.',
                };

    // Примітка під трьома блоками
    const bothWaysNote =
        locale === 'en'
            ? 'The listed price applies both ways.'
            : locale === 'de'
                ? 'Der angegebene Preis gilt in beide Richtungen.'
                : 'Uvedená cena platí v oboch smeroch.';

    const ctaLabel =
        locale === 'en' ? 'Book now' : locale === 'de' ? 'Jetzt buchen' : 'Objednať';

    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <div className="text-center max-w-3xl mx-auto">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-600">— {dict.route}</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
                    {dict.heading}
                </h1>
                <p className="mt-3 text-sm text-gray-600">
                    {tagline.before}
                    <span className="font-medium underline decoration-rose-500/30 underline-offset-4">
            {tagline.hi}
          </span>
                    {tagline.after}
                </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {dict.zones.map((z) => (
                    <article
                        key={z.name}
                        className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5"
                    >
                        <h2 className="text-lg font-semibold">{z.name}</h2>

                        <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center rounded-full bg-slate-900 text-white px-3 py-1 text-sm font-semibold">
                Sedan {z.sedan}
              </span>
                            <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                {z.van}
              </span>
                        </div>

                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                            {z.areas.map((a) => (
                                <li key={a} className="flex items-start gap-2">
                                    <span className="mt-1 text-emerald-600">✓</span>
                                    <span>{a}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={`/${locale}/kontakt`}
                            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            {ctaLabel}
                        </Link>
                    </article>
                ))}
            </div>

            {/* Примітка під трьома блоками */}
            <p className="mt-3 text-xs text-gray-500">{bothWaysNote}</p>

            <div className="mt-10 rounded-2xl border bg-white p-6">
                <h3 className="font-medium">{dict.includedTitle}</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-3 text-sm text-gray-700">
                    {dict.included.map((i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 text-emerald-600">✓</span>
                            <span>{i}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
