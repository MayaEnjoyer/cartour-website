'use client';

import { useEffect, useState } from 'react';
import {
    motion,
    useReducedMotion,
    type MotionProps,
    type Transition,
} from 'framer-motion';

const locales = ['sk', 'en', 'de'] as const;
type Locale = (typeof locales)[number];

function isLocale(x: string): x is Locale {
    return (locales as readonly string[]).includes(x);
}

type Step = { title: string; desc: string };
type Dict = Record<Locale, { heading: string; steps: Step[] }>;

const EASE_DEFAULT: Transition['ease'] = [0.22, 1, 0.36, 1];
const EASE_SOFT_IOS: Transition['ease'] = [0.16, 1, 0.3, 1];

export default function HowItWorks({ locale }: { locale: string }) {
    const reduceMotion = useReducedMotion();
    const disableAnimation = !!reduceMotion;

    // iOS-детект только после гидратации → без расхождений HTML
    const [isIosMobile, setIsIosMobile] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const ua = window.navigator.userAgent || '';
        const isIOS = /iPhone|iPad|iPod/i.test(ua);
        const isSmall = window.innerWidth <= 820;
        setIsIosMobile(isIOS && isSmall);
        // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    }, []);

    // Для iOS: очень мягкая анимация без вертикального сдвига и без сильного стеггера
    const useSoftAnimation = !disableAnimation && isIosMobile;

    const dict: Dict = {
        sk: {
            heading: 'Ako to funguje',
            steps: [
                {
                    title: 'Vytvorte si rezerváciu online alebo telefonicky',
                    desc: 'Rezerváciu môžete jednoducho vytvoriť online prostredníctvom nášho formulára, alebo nás kontaktovať telefonicky.',
                },
                {
                    title: 'Potvrdenie rezervácie',
                    desc: 'Po spracovaní vašej rezervácie vám zašleme potvrdzujúci e-mail/SMS správu so všetkými údajmi vašej cesty. Vaša preprava je týmto záväzne potvrdená.',
                },
                {
                    title: 'V dohodnutý čas vás vyzdvihneme',
                    desc: 'V stanovenom čase bude náš vodič čakať na vami uvedenej adrese, pripravený odviezť vás spoľahlivo a pohodlne na určené miesto.',
                },
            ],
        },
        en: {
            heading: 'How it works',
            steps: [
                {
                    title: 'Create your reservation online or by phone',
                    desc: 'You can easily create a reservation online via our form, or contact us by phone.',
                },
                {
                    title: 'Reservation confirmation',
                    desc: 'After your reservation has been processed, we will send you a confirmation email/SMS with all the details of your trip. Your transport is thereby bindingly confirmed.',
                },
                {
                    title: 'We will pick you up at the agreed time',
                    desc: 'At the agreed time, our driver will be waiting at the address you provided, ready to take you safely and comfortably to your destination.',
                },
            ],
        },
        de: {
            heading: 'So funktioniert’s',
            steps: [
                {
                    title: 'Erstellen Sie Ihre Reservierung online oder telefonisch',
                    desc: 'Sie können Ihre Reservierung ganz einfach online über unser Formular vornehmen oder uns telefonisch kontaktieren.',
                },
                {
                    title: 'Bestätigung der Reservierung',
                    desc: 'Nach der Bearbeitung Ihrer Reservierung senden wir Ihnen eine Bestätigungs-E-Mail bzw. SMS mit allen Details Ihrer Reise. Ihre Fahrt ist damit verbindlich bestätigt.',
                },
                {
                    title: 'Wir holen Sie zur vereinbarten Zeit ab',
                    desc: 'Zum vereinbarten Zeitpunkt wartet unser Fahrer an der von Ihnen angegebenen Adresse und bringt Sie zuverlässig und komfortabel an Ihr Ziel.',
                },
            ],
        },
    };

    const t = dict[isLocale(locale) ? locale : 'sk'];

    return (
        <section className="relative overflow-hidden bg-black text-white">
            {/* лёгкий текстурный фон */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.18] mix-blend-screen"
                style={{ backgroundImage: "url('/leaflet/background.png')" }}
            />

            <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
                <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-10 rounded bg-sky-400" />
                    <span className="h-2 w-6 rounded bg-rose-500" />
                </div>

                <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                    {t.heading}
                </h2>

                <div className="relative mt-8">
                    {/* линия между шагами только на десктопе */}
                    <div className="hidden sm:block absolute left-10 right-10 top-7 h-px border-t border-dashed border-white/30" />

                    <ol className="grid gap-6 sm:grid-cols-3">
                        {t.steps.map((s, i) => {
                            const initial: MotionProps['initial'] = disableAnimation
                                ? undefined
                                : useSoftAnimation
                                    ? { opacity: 0 }
                                    : { opacity: 0, y: 12 };

                            const whileInView: MotionProps['whileInView'] =
                                disableAnimation
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
                                        delay: i * 0.06,
                                        ease: EASE_DEFAULT,
                                    };

                            const viewport: MotionProps['viewport'] = disableAnimation
                                ? undefined
                                : { once: true, amount: 0.25 };

                            return (
                                <motion.li
                                    key={s.title}
                                    className="relative rounded-2xl border border-white/20 bg-white/5 backdrop-blur p-5 shadow-sm"
                                    initial={initial}
                                    whileInView={whileInView}
                                    viewport={viewport}
                                    transition={transition}
                                >
                                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow ring-1 ring-black/5">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-lg font-medium">{s.title}</h3>
                                    <p className="mt-2 text-[15px] sm:text-base text-white/80">
                                        {s.desc}
                                    </p>
                                </motion.li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
}
