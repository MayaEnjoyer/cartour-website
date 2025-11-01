'use client';

import { motion, useReducedMotion } from 'framer-motion';

const locales = ['sk', 'en', 'de'] as const;
type Locale = typeof locales[number];

type Feature = { title: string; desc: string };
type Dict = Record<Locale, { heading: string; items: Feature[] }>;

function isLocale(v: string): v is Locale {
    return (locales as readonly string[]).includes(v);
}

export default function Features({ locale }: { locale: string }) {
    const reduce = useReducedMotion();

    const dict: Dict = {
        sk: {
            heading: 'Prečo si vybrať nás',
            items: [
                { title: 'Flexibilita 24/7', desc: 'Odvezieme vás kedykoľvek, ráno aj v noci, podľa vášho času odletu či príletu.' },
                { title: 'Sledovanie letov', desc: 'Sledujeme váš let a prispôsobíme sa prípadnému meškaniu bez príplatku.' },
                { title: 'Stovky spokojných zákazníkov', desc: 'Naša najlepšia reklama sú ľudia, ktorí s nami cestujú pravidelne.' },
                { title: 'Dochvíľnosť bez kompromisov', desc: 'Prídeme vždy načas, aby ste stihli svoj let v pokoji a bez stresu.' },
                { title: 'Skúsení vodiči', desc: 'Naši šoféri myslia na vašu bezpečnosť a pohodlie počas celej jazdy.' },
                { title: 'Dlhoročné skúsenosti', desc: 'Vieme, ako to na letisku chodí, a postaráme sa, aby ste cestovali bez stresu.' },
            ],
        },
        en: {
            heading: 'Why choose us',
            items: [
                { title: 'Flexibility 24/7', desc: 'Rides any time—early or late—to match your flight.' },
                { title: 'Flight tracking', desc: 'We track delays and adjust pickup—no extra fees.' },
                { title: 'Hundreds of happy clients', desc: 'Many regulars trust us for every trip.' },
                { title: 'Punctual, no excuses', desc: 'On time so you catch your flight calmly.' },
                { title: 'Experienced drivers', desc: 'Safety and comfort throughout your journey.' },
                { title: 'Years of expertise', desc: 'Airport routines handled—travel without stress.' },
            ],
        },
        de: {
            heading: 'Warum wir',
            items: [
                { title: 'Flexibel 24/7', desc: 'Fahrten zu jeder Zeit passend zu Ihrem Flug.' },
                { title: 'Flugverfolgung', desc: 'Bei Verspätungen passen wir die Abholung ohne Aufpreis an.' },
                { title: 'Hunderte zufriedene Kunden', desc: 'Viele Stammkunden vertrauen uns regelmäßig.' },
                { title: 'Pünktlich ohne Kompromisse', desc: 'Rechtzeitig, damit Sie entspannt abfliegen.' },
                { title: 'Erfahrene Fahrer', desc: 'Sicherheit und Komfort während der gesamten Fahrt.' },
                { title: 'Langjährige Erfahrung', desc: 'Abläufe am Flughafen im Griff – stressfrei reisen.' },
            ],
        },
    };

    const safeLocale: Locale = isLocale(locale) ? locale as Locale : 'sk';
    const t = dict[safeLocale];

    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.heading}</h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {t.items.map((it, i) => (
                    <motion.article
                        key={it.title}
                        className="rounded-xl border p-5"
                        initial={reduce ? undefined : { opacity: 0, y: 12 }}
                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                    >
                        <h3 className="text-lg font-medium">{it.title}</h3>
                        <p className="mt-2 text-gray-600 text-sm">{it.desc}</p>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
