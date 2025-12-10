'use client';

import { useState } from 'react';
import {
    motion,
    useReducedMotion,
    type Transition,
} from 'framer-motion';

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
            {
                title: 'Flexibility 24/7',
                desc: 'Rides any time—early or late—to match your flight.',
            },
            {
                title: 'Flight tracking',
                desc: 'We track delays and adjust pickup—no extra fees.',
            },
            {
                title: 'Hundreds of happy clients',
                desc: 'Many regulars trust us for every trip.',
            },
            {
                title: 'Punctual, no excuses',
                desc: 'On time so you catch your flight calmly.',
            },
            {
                title: 'Experienced drivers',
                desc: 'Safety and comfort throughout your journey.',
            },
            {
                title: 'Years of expertise',
                desc: 'Airport routines handled—travel without stress.',
            },
        ],
    },
    de: {
        heading: 'Warum wir',
        items: [
            {
                title: 'Flexibel 24/7',
                desc: 'Fahrten zu jeder Zeit passend zu Ihrem Flug.',
            },
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
            {
                title: 'Erfahrene Fahrer',
                desc: 'Sicherheit und Komfort während der gesamten Fahrt.',
            },
            {
                title: 'Langjährige Erfahrung',
                desc: 'Abläufe am Flughafen im Griff – stressfrei reisen.',
            },
        ],
    },
};

export default function Features({ locale }: { locale: string }) {
    const safeLocale: Locale = isLocale(locale) ? locale : 'sk';
    const t = dict[safeLocale];
    const icons = [IconClock, IconRadar, IconShield, IconClock, IconShield, IconRadar];
    const reduceMotion = useReducedMotion();

    // лёгкий детект iOS + маленький экран, без useEffect → нет варнинга ESLint
    const [isIosMobile] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        const ua = window.navigator.userAgent || '';
        const isIOS = /iP(hone|od|ad)/.test(ua);
        const isSmall = window.innerWidth <= 768;
        return isIOS && isSmall;
    });

    const disableAnimation = !!reduceMotion;
    const useSoftAnimation = !disableAnimation && isIosMobile;

    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <div className="inline-flex items-center gap-2">
                <span className="h-2 w-10 rounded bg-sky-400" />
                <span className="h-2 w-6 rounded bg-rose-500" />
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                {t.heading}
            </h2>

            <div className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {t.items.map((it, i) => {
                        const Ico = icons[i % icons.length];

                        const initial = disableAnimation
                            ? undefined
                            : useSoftAnimation
                                ? { opacity: 0 }
                                : { opacity: 0, y: 12 };

                        const whileInView = disableAnimation
                            ? undefined
                            : useSoftAnimation
                                ? { opacity: 1 }
                                : { opacity: 1, y: 0 };

                        const transition: Transition | undefined = disableAnimation
                            ? undefined
                            : useSoftAnimation
                                ? {
                                    duration: 0.35,
                                    ease: [0.16, 1, 0.3, 1],
                                }
                                : {
                                    duration: 0.6,
                                    delay: i * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                };

                        return (
                            <motion.article
                                key={it.title}
                                className="relative rounded-2xl border border-slate-200/70 bg-white/80 md:backdrop-blur p-5 shadow-sm"
                                style={{ willChange: 'transform, opacity' }}
                                initial={initial}
                                whileInView={whileInView}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={transition}
                            >
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-semibold">
                                    <Ico />
                                    <span className="opacity-90">{it.title}</span>
                                </div>
                                <p className="text-sm text-gray-600">{it.desc}</p>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
