'use client';

type Row = { service: string; price: string; note: string };
type Dict = { heading: string; colS: string; colP: string; colN: string; rows: Row[] };

const dicts: Record<'sk'|'en'|'de', Dict> = {
    sk: {
        heading: 'Doplnkové služby a príplatky',
        colS: 'Služba',
        colP: 'Cena',
        colN: 'Poznámka',
        rows: [
            { service: 'Autosedačka, podsedák, vajíčko', price: 'Zdarma', note: 'Bezplatná služba' },
            { service: 'Každá pridaná adresa vyzdvihnutia / vysadenia', price: 'od 5 €', note: 'Podľa vzdialenosti (km)' },
            { service: 'Čakanie', price: '20 €/hod', note: '1. hodina po pristátí zdarma, meškanie letu bez príplatku' },
            { service: 'Vyzdvihnutie s menovkou v príletovej hale', price: '+5 €', note: 'Personalizovaná služba' },
        ],
    },
    en: {
        heading: 'Add-on services & surcharges',
        colS: 'Service',
        colP: 'Price',
        colN: 'Note',
        rows: [
            { service: 'Child seat / booster / infant seat', price: 'Free', note: 'Complimentary' },
            { service: 'Extra pickup / drop-off address', price: 'from €5', note: 'Depends on distance (km)' },
            { service: 'Waiting time', price: '€20/h', note: 'First hour after landing free, flight delay free' },
            { service: 'Meet & Greet (name board)', price: '+€5', note: 'Personalized pickup' },
        ],
    },
    de: {
        heading: 'Zusatzleistungen & Zuschläge',
        colS: 'Leistung',
        colP: 'Preis',
        colN: 'Hinweis',
        rows: [
            { service: 'Kindersitz / Sitzerhöhung / Babyschale', price: 'Kostenlos', note: 'Gratis' },
            { service: 'Zusätzliche Abhol-/Abladeadresse', price: 'ab 5 €', note: 'Je nach Entfernung (km)' },
            { service: 'Wartezeit', price: '20 €/h', note: 'Erste Stunde nach Landung gratis, Verspätung kostenlos' },
            { service: 'Meet & Greet (Namensschild)', price: '+5 €', note: 'Personalisierte Abholung' },
        ],
    },
};

export default function Extras({
                                   locale,
                                   dark = false,
                               }: {
    locale: string;
    dark?: boolean;
}) {
    const t = locale === 'en' ? dicts.en : locale === 'de' ? dicts.de : dicts.sk;

    return (
        <section className={`mx-auto max-w-6xl px-4 py-14 sm:py-20 ${dark ? 'text-white' : ''}`}>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.heading}</h2>

            <div className={`mt-6 overflow-x-auto rounded-2xl ${dark ? 'border border-white/10 bg-white/5' : 'border bg-white'}`}>
                <table className="min-w-full text-sm">
                    <thead className={dark ? 'bg-white/10' : 'bg-gray-50'}>
                    <tr className="text-left">
                        <th className="px-4 py-3">{t.colS}</th>
                        <th className="px-4 py-3">{t.colP}</th>
                        <th className="px-4 py-3">{t.colN}</th>
                    </tr>
                    </thead>
                    <tbody className={dark ? "[&>tr:nth-child(even)]:bg-white/5" : "[&>tr:nth-child(even)]:bg-gray-50/60"}>
                    {t.rows.map((r) => (
                        <tr key={r.service}>
                            <td className="px-4 py-3">{r.service}</td>
                            <td className="px-4 py-3 font-medium">{r.price}</td>
                            <td className={`px-4 py-3 ${dark ? 'text-white/80' : 'text-gray-600'}`}>{r.note}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
