'use client';

type Row = { fromTo: string; sedan: string; van: string };
type Dict = { heading: string; col1: string; col2: string; col3: string; rows: Row[] };

const dicts: Record<'sk' | 'en' | 'de', Dict> = {
    sk: {
        heading: 'Ďalšie destinácie',
        col1: 'Trasa',
        col2: 'Sedan',
        col3: 'VAN 5/8',
        rows: [
            { fromTo: 'Bratislava ⟷ Viedeň Centrum', sedan: '80€',  van: '94€'  },
            { fromTo: 'Bratislava ⟷ Budapešť',       sedan: '229€', van: '259€' },
            { fromTo: 'Bratislava ⟷ Praha',          sedan: '339€', van: '369€' },
        ],
    },
    en: {
        heading: 'Other destinations',
        col1: 'Route',
        col2: 'Sedan',
        col3: 'VAN 5/8',
        rows: [
            { fromTo: 'Bratislava ⟷ Vienna City', sedan: '€80',  van: '€94'  },
            { fromTo: 'Bratislava ⟷ Budapest',    sedan: '€229', van: '€259' },
            { fromTo: 'Bratislava ⟷ Prague',      sedan: '€339', van: '€369' },
        ],
    },
    de: {
        heading: 'Weitere Ziele',
        col1: 'Strecke',
        col2: 'Sedan',
        col3: 'VAN 5/8',
        rows: [
            { fromTo: 'Bratislava ⟷ Wien Zentrum', sedan: '80€',  van: '94€'  },
            { fromTo: 'Bratislava ⟷ Budapest',     sedan: '229€', van: '259€' },
            { fromTo: 'Bratislava ⟷ Prag',         sedan: '339€', van: '369€' },
        ],
    },
};

export default function OtherDestinations({ locale }: { locale: string }) {
    const t = locale === 'en' ? dicts.en : locale === 'de' ? dicts.de : dicts.sk;

    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.heading}</h2>

            <div className="mt-6 overflow-x-auto rounded-xl border">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                    <tr className="text-left">
                        <th className="px-4 py-3">{t.col1}</th>
                        <th className="px-4 py-3">{t.col2}</th>
                        <th className="px-4 py-3">{t.col3}</th>
                    </tr>
                    </thead>
                    <tbody className="[&>tr:nth-child(even)]:bg-gray-50/60">
                    {t.rows.map((r) => (
                        <tr key={r.fromTo}>
                            <td className="px-4 py-3">{r.fromTo}</td>
                            <td className="px-4 py-3 font-medium">{r.sedan}</td>
                            <td className="px-4 py-3 font-medium">{r.van}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
