'use client';

import { useEffect, useState } from 'react';
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

const SOFT_FAST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Features({ locale }: { locale: string }) {
    const safeLocale: Locale = isLocale(locale) ? locale : 'sk';
    const t = dict[safeLocale];
    const icons = [IconClock, IconRadar, IconShield, IconClock, IconShield, IconRadar];
    const reduceMotion = useReducedMotion();

    const [isMobile, setIsMobile] = useState(false);

    // Определяем мобильный viewport (только на клиенте)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const check = () => {
            setIsMobile(window.innerWidth < 640); // < 640px — mobile
        };

        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const reduce = !!reduceMotion;

    // Варианты анимаций, зависящие от isMobile
    const sectionVariants = {
        hidden: { opacity: 0, y: isMobile ? 14 : 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: isMobile ? 0.4 : 0.55, // мобилка быстрее
                ease: SOFT_FAST_EASE,
                when: 'beforeChildren',
            },
        },
    } as const;

    const headingVariants = {
        hidden: { opacity: 0, y: 8 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.35,
                ease: SOFT_FAST_EASE,
                delay: 0.06,
            },
        },
    } as const;

    const gridVariants = {
        hidden: {},
        show: {
            transition: {
                delayChildren: isMobile ? 0.04 : 0.12,
                staggerChildren: isMobile ? 0.05 : 0.1,
            },
        },
    } as const;

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: isMobile ? 10 : 14,
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: isMobile ? 0.35 : 0.45, // быстро, но мягко
                ease: SOFT_FAST_EASE,
            },
        },
    } as const;

    return (
        <motion.section
            id="features-section"
            className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
            style={{ willChange: 'transform, opacity' }}
            {...(!reduce
                ? {
                    variants: sectionVariants,
                    initial: 'hidden',
                    whileInView: 'show',
                    viewport: { once: true, amount: 0.25 },
                }
                : {})}
        >
            <motion.h2
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ willChange: 'transform, opacity' }}
                {...(!reduce ? { variants: headingVariants } : {})}
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
                            style={{ willChange: 'transform, opacity' }}
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
