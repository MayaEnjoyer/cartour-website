// src/components/home/Features.tsx
'use client';

import { useState } from 'react';
import {
    motion,
    useReducedMotion,
    type Transition,
    type MotionProps,
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

const EASE_DEFAULT: Transition['ease'] = [0.22, 1, 0.36, 1];
const EASE_SOFT_IOS: Transition['ease'] = [0.16, 1, 0.3, 1];

export default function Features({ locale }: { locale: string }) {
    const safeLocale: Locale = isLocale(locale) ? locale : 'sk';
    const t = dict[safeLocale];
    const icons = [IconClock, IconRadar, IconShield, IconClock, IconShield, IconRadar];

    const reduceMotion = useReducedMotion();

    // Лёгкий клиентский детект iOS + маленький экран
    const [isIosMobile] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        const ua = window.navigator.userAgent || '';
        const isIOS = /iP(hone|od|ad)/i.test(ua);
        const isSmall = window.innerWidth <= 768;
        return isIOS && isSmall;
    });

    // Если пользователь включил "Reduce motion" → вообще не анимируем
    const disableAnimation = !!reduceMotion;
    // Для iOS: супер-мягкая анимация без сдвигов и без задержек
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

                        // Конфиг анимации под платформу
                        const initial: MotionProps['initial'] = disableAnimation
                            ? undefined
                            : useSoftAnimation
                                ? { opacity: 0 }
                                : { opacity: 0, y: 12 };

                        const whileInView: MotionProps['whileInView'] = disableAnimation
                            ? undefined
                            : useSoftAnimation
                                ? { opacity: 1 }
                                : { opacity: 1, y: 0 };

                        const transition: Transition | undefined = disableAnimation
                            ? undefined
                            : useSoftAnimation
                                ? {
                                    duration: 0.35,
                                    ease: EASE_SOFT_IOS,
                                }
                                : {
                                    duration: 0.55,
                                    delay: i * 0.07,
                                    ease: EASE_DEFAULT,
                                };

                        const viewport: MotionProps['viewport'] = disableAnimation
                            ? undefined
                            : { once: true, amount: 0.2 };

                        return (
                            <motion.div
                                key={it.title}
                                // Вынесли motion в обёртку → внутри обычный <article>,
                                // чтобы можно было спокойно давать GPU-подсказки
                                className="will-change-transform will-change-opacity"
                                style={{
                                    willChange: 'transform, opacity',
                                }}
                                initial={initial}
                                whileInView={whileInView}
                                transition={transition}
                                viewport={viewport}
                            >
                                <article className="relative rounded-2xl border border-slate-200/70 bg-white/80 md:backdrop-blur p-5 shadow-sm">
                                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-semibold">
                                        <Ico />
                                        <span className="opacity-90">{it.title}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{it.desc}</p>
                                </article>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
