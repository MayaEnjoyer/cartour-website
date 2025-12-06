'use client';

import { motion, useReducedMotion } from 'framer-motion';

const locales = ['sk', 'en', 'de'] as const;
type Locale = (typeof locales)[number];

type Feature = { title: string; desc: string };
type Dict = Record<Locale, { heading: string; items: Feature[] }>;

function isLocale(v: string): v is Locale {
    return (locales as readonly string[]).includes(v);
}

function IconShield() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3z" />
        </svg>
    );
}
function IconClock() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm1 12h5v-2h-4V6h-2v7Z" />
        </svg>
    );
}
function IconRadar() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10H20A8 8 0 1 1 12 4Z" />
            <circle cx="12" cy="12" r="2" />
            <path d="M12 12 21 3" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

const dict: Dict = {
    sk: {
        heading: 'Prečo si vybrať nás',
        items: [
            {
                title: 'Flexibilita 24/7',
                desc: 'Odvezieme vás kedykoľvek, ráno aj v noci, podľa vášho času odletu či príletu.',
            },
            {
                title: 'Sledovanie letov',
                desc: 'Sledujeme váš let a prispôsobíme sa prípadnému meškaniu bez príplatku.',
            },
            {
                title: 'Stovky spokojných zákazníkov',
                desc: 'Naša najlepšia reklama sú ľudia, ktorí s nami cestujú pravidelne.',
            },
            {
                title: 'Dochvíľnosť bez kompromisov',
                desc: 'Prídeme vždy načas, aby ste stihli svoj let v pokoji a bez stresu.',
            },
            {
                title: 'Skúsení vodiči',
                desc: 'Naši šoféri myslia na vašu bezpečnosť a pohodlie počas celej jazdy.',
            },
            {
                title: 'Dlhoročné skúsenosti',
                desc: 'Vieme, ako to na letisku chodí, a postaráme sa, aby ste cestovali bez stresu.',
            },
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
            {
                title: 'Flugverfolgung',
                desc: 'Bei Verspätungen passen wir die Abholung ohne Aufpreis an.',
            },
            {
                title: 'Hunderte zufriedene Kunden',
                desc: 'Viele Stammkunden vertrauen uns regelmäßig.',
            },
            {
                title: 'Pünktlich ohne Kompromisse',
                desc: 'Rechtzeitig, damit Sie entspannt abfliegen.',
            },
            { title: 'Erfahrene Fahrer', desc: 'Sicherheit und Komfort während der gesamten Fahrt.' },
            {
                title: 'Langjährige Erfahrung',
                desc: 'Abläufe am Flughafen im Griff – stressfrei reisen.',
            },
        ],
    },
};

/* Плавная «строчная» анимация карточек */

const gridVariants = {
    hidden: {},
    show: {
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.12,
        },
    },
} as const;

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 18,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
} as const;

export default function Features({ locale }: { locale: string }) {
    const safeLocale: Locale = isLocale(locale) ? locale : 'sk';
    const t = dict[safeLocale];
    const icons = [IconClock, IconRadar, IconShield, IconClock, IconShield, IconRadar];
    const reduce = useReducedMotion();

    return (
        <motion.section
            className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
            {...(!reduce
                ? {
                    initial: 'hidden',
                    whileInView: 'show',
                    viewport: { once: true, amount: 0.3 },
                }
                : {})}
        >
            <motion.h2
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                {...(!reduce
                    ? {
                        initial: { opacity: 0, y: 12 },
                        whileInView: { opacity: 1, y: 0 },
                        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                        viewport: { once: true, amount: 0.6 },
                    }
                    : {})}
            >
                {t.heading}
            </motion.h2>

            <motion.div
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                {...(!reduce ? { variants: gridVariants } : {})}
            >
                {t.items.map((it, i) => {
                    const Ico = icons[i % icons.length];
                    return (
                        <motion.article
                            key={it.title}
                            className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur p-5 shadow-sm"
                            {...(!reduce ? { variants: cardVariants } : {})}
                        >
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-semibold">
                                <Ico />
                                <span className="opacity-90">{it.title}</span>
                            </div>
                            <p className="text-sm text-gray-600">{it.desc}</p>
                        </motion.article>
                    );
                })}
            </motion.div>
        </motion.section>
    );
}
