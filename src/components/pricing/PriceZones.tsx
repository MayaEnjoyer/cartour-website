'use client';

import type { PriceZonesDict, Zone } from '../../types/pricing';

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
                    'Staré Mesto', 'Ružinov', 'Nové Mesto', 'Petržalka',
                    'Karlova Ves', 'Jarovce', 'Hlavná vlaková stanica',
                ],
            },
            {
                name: 'Rozšírené mestské časti',
                sedan: '65€',
                van: '85€ (VAN 5/8 osôb)',
                areas: [
                    'Rača', 'Vajnory', 'Devín', 'Vrakuňa',
                    'Letisko M. R. Štefánika (BTS)', 'Podunajské Biskupice',
                    'Rusovce', 'Dúbravka', 'Lamač',
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
                    'Staré Mesto (Old Town)', 'Ružinov', 'Nové Mesto', 'Petržalka',
                    'Karlova Ves', 'Jarovce', 'Main railway station',
                ],
            },
            {
                name: 'Extended districts',
                sedan: '€65',
                van: '€85 (VAN 5/8 seats)',
                areas: [
                    'Rača', 'Vajnory', 'Devín', 'Vrakuňa',
                    'Bratislava Airport (BTS)', 'Podunajské Biskupice',
                    'Rusovce', 'Dúbravka', 'Lamač',
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
                    'Staré Mesto', 'Ružinov', 'Nové Mesto', 'Petržalka',
                    'Karlova Ves', 'Jarovce', 'Hauptbahnhof',
                ],
            },
            {
                name: 'Erweiterte Stadtteile',
                sedan: '65€',
                van: '85€ (VAN 5/8 Plätze)',
                areas: [
                    'Rača', 'Vajnory', 'Devín', 'Vrakuňa',
                    'Flughafen BTS', 'Podunajské Biskupice',
                    'Rusovce', 'Dúbravka', 'Lamač',
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

    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{dict.heading}</h1>
            <p className="mt-2 text-gray-600">{dict.route}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {dict.zones.map((z: Zone) => (
                    <article key={z.name} className="rounded-xl border p-5">
                        <h2 className="text-lg font-medium">{z.name}</h2>

                        <div className="mt-3 flex items-center gap-2 text-sm">
                            <span className="inline-flex rounded border px-2 py-1">Sedan {z.sedan}</span>
                            <span className="inline-flex rounded border px-2 py-1">{z.van}</span>
                        </div>

                        <ul className="mt-4 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {z.areas.map((a) => (
                                <li key={a}>{a}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>

            <div className="mt-10 rounded-xl border p-5">
                <h3 className="font-medium">{dict.includedTitle}</h3>
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {dict.included.map((i) => (
                        <li key={i}>{i}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
