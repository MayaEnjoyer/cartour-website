'use client';

import { motion, useReducedMotion } from 'framer-motion';

const locales = ['sk', 'en', 'de'] as const;
type Locale = typeof locales[number];

type Dict = Record<
    Locale,
    {
        heading: string;
        p: string[];
        stats: string[];
        badges: string[];
    }
>;

function isLocale(x: string): x is Locale {
    return (locales as readonly string[]).includes(x);
}

export default function About({ locale }: { locale: string }) {
    const reduce = useReducedMotion();

    const dict: Dict = {
        sk: {
            heading: 'O nás',
            p: [
                'Viac ako sedem rokov sme overeným partnerom v osobnej preprave so zameraním na letiskové a firemné transfery.',
                'Jazdíme výlučne Mercedes-Benz — pre krátke aj dlhé cesty, s dôrazom na pohodlie a bezpečnosť.',
                'Naši vodiči majú dlhoročnú prax, sú presní, diskrétni a orientovaní na váš komfort.',
                'Sme tu pre obchodné cesty, letiskové transfery, spoločenské udalosti aj každodenné presuny v meste a mimo neho.',
            ],
            stats: ['4+ rokov skúseností', '1000+ transferov ročne', 'Hodnotenie 4.8★'],
            badges: ['Airport', 'Corporate', '24/7'],
        },
        en: {
            heading: 'About us',
            p: [
                'For 7+ years, we’ve been a trusted partner in passenger transport focused on airport and corporate transfers.',
                'We operate exclusively Mercedes-Benz — for both short and long journeys with comfort and safety.',
                'Our drivers are seasoned professionals, punctual, discreet and comfort-oriented.',
                'Business trips, airport transfers, events or daily rides — we’ve got you covered in and outside the city.',
            ],
            stats: ['7+ years of experience', '1000+ transfers / year', 'Rating 4.3★'],
            badges: ['Airport', 'Corporate', '24/7'],
        },
        de: {
            heading: 'Über uns',
            p: [
                'Seit über 7 Jahren sind wir ein verlässlicher Partner im Personentransport mit Fokus auf Flughafen- und Firmen­transfers.',
                'Wir fahren ausschließlich Mercedes-Benz — kurze wie lange Strecken mit Komfort und Sicherheit.',
                'Unsere Fahrer sind erfahren, pünktlich, diskret und auf Ihren Komfort bedacht.',
                'Geschäftsreisen, Flughafentransfers, Events oder tägliche Fahrten — in und außerhalb der Stadt.',
            ],
            stats: ['7+ Jahre Erfahrung', '1000+ Transfers/Jahr', 'Bewertung 5★'],
            badges: ['Airport', 'Corporate', '24/7'],
        },
    };

    const safeLocale: Locale = isLocale(locale) ? locale : 'sk';
    const t = dict[safeLocale];

    const ringByIdx = (i: number) =>
        ['ring-sky-500/20 bg-white/80', 'ring-indigo-500/20 bg-white/80', 'ring-rose-500/20 bg-white/80', 'ring-emerald-500/20 bg-white/80'][i % 4];

    const textByIdx = (i: number) =>
        ['text-sky-700', 'text-indigo-700', 'text-rose-700', 'text-emerald-700'][i % 4];

    return (
        <section className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
            {/* м’які підсвічування */}
            <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />

            <div className="inline-flex items-center gap-2">
                <span className="h-2 w-10 rounded bg-sky-400" />
                <span className="h-2 w-6 rounded bg-rose-500" />
            </div>

            <div className="mt-3 grid items-center gap-10 lg:grid-cols-2">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t.heading}</h2>

                    <div className="mt-6 space-y-4 text-gray-700">
                        {t.p.map((para, i) => (
                            <motion.p
                                key={i}
                                className="text-[15px] sm:text-base leading-relaxed"
                                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {para}
                            </motion.p>
                        ))}
                    </div>

                    <ul className="mt-7 flex flex-wrap gap-3">
                        {t.stats.map((s, i) => (
                            <li key={s} className={`rounded-xl px-3 py-2 text-sm font-medium shadow-sm ring-1 ${ringByIdx(i)}`}>
                                <span className={textByIdx(i)}>{s}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {t.badges.map((b, i) => (
                            <span
                                key={b}
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${textByIdx(i)} border-current/20`}
                            >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {b}
              </span>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={reduce ? undefined : { opacity: 0, scale: 0.985 }}
                    whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5"
                >
                    <div
                        className="aspect-[16/10] bg-cover bg-center"
                        style={{ backgroundImage: "url('/leaflet/background_car2.png')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/25 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3">
                        <div className="rounded-xl bg-white/85 backdrop-blur px-3 py-2 text-sm font-medium shadow">
                            Mercedes-Benz • E-Class
                        </div>
                        <div className="rounded-xl bg-sky-600 text-white px-3 py-2 text-sm font-medium shadow">Comfort • Wi-Fi • Water</div>
                        <div className="rounded-xl bg-rose-600 text-white px-3 py-2 text-sm font-medium shadow">Professional Drivers</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
