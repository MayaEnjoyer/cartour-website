'use client';

type Row = { fromTo: string; sedan: string; van: string };
type Dict = {
    heading: string;
    col1: string;
    col2: string;
    col3: string;
    rows: Row[];
    note: string;
};

const dicts: Record<'sk' | 'en' | 'de', Dict> = {
    sk: {
        heading: 'Ďalšie destinácie',
        col1: 'Trasa',
        col2: 'Sedan',
        col3: 'VAN 5/8',
        rows: [
            { fromTo: 'Bratislava ⟷ Letisko M. R. Štefánika (BTS)', sedan: '20€',  van: '20€' },
            { fromTo: 'Bratislava ⟷ Viedeň Centrum',                sedan: '80€',  van: '94€'  },
            { fromTo: 'Bratislava ⟷ Budapešť',                      sedan: '229€', van: '259€' },
            { fromTo: 'Bratislava ⟷ Praha',                         sedan: '339€', van: '369€' },
        ],
        note:
            'Pre transfery z iných miest nás prosím kontaktujte. Pripravíme pre vás individuálnu cenovú ponuku.',
    },
    en: {
        heading: 'Other destinations',
        col1: 'Route',
        col2: 'Sedan',
        col3: 'VAN 5/8',
        rows: [
            { fromTo: 'Bratislava ⟷ M. R. Štefánik Airport (BTS)', sedan: '€20',  van: '€20'  },
            { fromTo: 'Bratislava ⟷ Vienna City',                  sedan: '€80',  van: '€94'  },
            { fromTo: 'Bratislava ⟷ Budapest',                     sedan: '€229', van: '€259' },
            { fromTo: 'Bratislava ⟷ Prague',                       sedan: '€339', van: '€369' },
        ],
        note:
            'For transfers from other locations, please contact us. We will prepare an individual quote for you.',
    },
    de: {
        heading: 'Weitere Ziele',
        col1: 'Strecke',
        col2: 'Sedan',
        col3: 'VAN 5/8',
        rows: [
            { fromTo: 'Bratislava ⟷ Flughafen M. R. Štefánika (BTS)', sedan: '20€',  van: '20€'  },
            { fromTo: 'Bratislava ⟷ Wien Zentrum',                    sedan: '80€',  van: '94€'  },
            { fromTo: 'Bratislava ⟷ Budapest',                        sedan: '229€', van: '259€' },
            { fromTo: 'Bratislava ⟷ Prag',                           sedan: '339€', van: '369€' },
        ],
        note:
            'Für Transfers aus anderen Orten kontaktieren Sie uns bitte. Wir erstellen Ihnen gern ein individuelles Angebot.',
    },
};

export default function OtherDestinations({
                                              locale,
                                              dark = false,
                                          }: {
    locale: string;
    dark?: boolean;
}) {
    const t = locale === 'en' ? dicts.en : locale === 'de' ? dicts.de : dicts.sk;

    return (
        <section
            className={`mx-auto max-w-6xl px-4 py-14 sm:py-20 ${dark ? 'text-white' : ''}`}
        >
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.heading}</h2>

            <div
                className={`mt-6 overflow-x-auto rounded-2xl ${
                    dark ? 'border border-white/10 bg-white/5' : 'border bg-white'
                }`}
            >
                <table className="min-w-full text-sm">
                    <thead className={dark ? 'bg-white/10' : 'bg-gray-50'}>
                    <tr className="text-left">
                        <th className="px-4 py-3">{t.col1}</th>
                        <th className="px-4 py-3">{t.col2}</th>
                        <th className="px-4 py-3">{t.col3}</th>
                    </tr>
                    </thead>
                    <tbody
                        className={
                            dark ? '[&>tr:nth-child(even)]:bg-white/5' : '[&>tr:nth-child(even)]:bg-gray-50/60'
                        }
                    >
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

            {/* маленька примітка під таблицею */}
            <p className={`mt-3 text-xs ${dark ? 'text-white/70' : 'text-gray-500'}`}>{t.note}</p>
        </section>
    );
}
