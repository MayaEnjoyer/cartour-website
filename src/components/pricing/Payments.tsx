'use client';

type Item = { icon: string; title: string; desc: string };
type Dict = { heading: string; items: Item[] };

const dicts: Record<'sk'|'en'|'de', Dict> = {
    sk: {
        heading: 'Spôsoby platby',
        items: [
            { icon: '💵', title: 'Hotovosť', desc: 'Platba priamo u vodiča' },
            { icon: '💳', title: 'Kartou', desc: 'Bezhotovostná platba' },
            { icon: '🧾', title: 'Na faktúru', desc: 'Pre firemných klientov' },
        ],
    },
    en: {
        heading: 'Payment methods',
        items: [
            { icon: '💵', title: 'Cash', desc: 'Pay directly to the driver' },
            { icon: '💳', title: 'Card', desc: 'Contactless card payment' },
            { icon: '🧾', title: 'Invoice', desc: 'For business clients' },
        ],
    },
    de: {
        heading: 'Zahlungsmethoden',
        items: [
            { icon: '💵', title: 'Bar', desc: 'Direkt beim Fahrer zahlen' },
            { icon: '💳', title: 'Karte', desc: 'Kontaktlose Kartenzahlung' },
            { icon: '🧾', title: 'Rechnung', desc: 'Für Firmenkunden' },
        ],
    },
};

export default function Payments({ locale }: { locale: string }) {
    const t = locale === 'en' ? dicts.en : locale === 'de' ? dicts.de : dicts.sk;

    return (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.heading}</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {t.items.map((it) => (
                    <div key={it.title} className="rounded-xl border p-5">
                        <div className="text-2xl">{it.icon}</div>
                        <h3 className="mt-2 text-lg font-medium">{it.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{it.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
