'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

type Props = { locale: string };

export default function Hero({ locale }: Props) {
    const reduce = useReducedMotion();

    const t =
        {
            sk: {
                badge: '— LETISKOVÉ TRANSFERY',
                title: 'Pohodlné transféry na Letisko',
                subtitle:
                    'Spoľahlivá preprava vozidlami Mercedes-Benz. Cestujte pohodlne a bez starostí.',
                cta1: 'Rezervovať',
                cta2: 'Zavolajte nám',
                quick: ['24/7 flexibilita', 'Sledovanie letov', 'Mercedes-Benz'],
            },
            en: {
                badge: '— AIRPORT TRANSFERS',
                title: 'Comfortable Airport Transfers',
                subtitle:
                    'Reliable rides with Mercedes-Benz vehicles. Travel in style, stress-free.',
                cta1: 'Book now',
                cta2: 'Call us',
                quick: ['Flexibility 24/7', 'Flight tracking', 'Mercedes-Benz'],
            },
            de: {
                badge: '— FLUGHAFENTRANSFER',
                title: 'Komfortable Flughafentransfers',
                subtitle:
                    'Zuverlässige Fahrten mit Mercedes-Benz. Reisen Sie stilvoll und stressfrei.',
                cta1: 'Buchen',
                cta2: 'Anrufen',
                quick: ['24/7 Flexibilität', 'Flugverfolgung', 'Mercedes-Benz'],
            },
        }[locale] ?? {
            badge: '— AIRPORT TRANSFERS',
            title: 'Comfortable Airport Transfers',
            subtitle:
                'Reliable rides with Mercedes-Benz vehicles. Travel in style, stress-free.',
            cta1: 'Book now',
            cta2: 'Call us',
            quick: ['Flexibility 24/7', 'Flight tracking', 'Mercedes-Benz'],
        };

    return (
        <section className="relative overflow-hidden bg-black text-white">
            {/* background image + gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/leaflet/background_car3.png')] bg-cover bg-center bg-no-repeat opacity-45" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/3" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 min-h-[100svh] flex items-end sm:items-center">
                <motion.div
                    initial={reduce ? undefined : { opacity: 0, y: 18 }}
                    animate={
                        reduce
                            ? undefined
                            : {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                            }
                    }
                    className="pb-10 sm:pb-0"
                >
                    <p className="text-[#E10D2C] font-semibold tracking-widest text-xs sm:text-sm">
                        {t.badge}
                    </p>

                    {/* кольорова «рама» під заголовком */}
                    <div className="mt-2 inline-flex items-center gap-2">
                        <span className="h-2 w-10 rounded bg-sky-400" />
                        <span className="h-2 w-6 rounded bg-rose-500" />
                    </div>

                    <h1 className="mt-4 text-5xl sm:text-7xl font-semibold tracking-tight">
                        {t.title}
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg sm:text-2xl text-white/85">
                        {t.subtitle}
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <Link
                            href={`/${locale}/kontakt`}
                            className="rounded-xl bg-white text-slate-900 px-6 py-3 text-base font-semibold shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            {t.cta1}
                        </Link>
                        <Link
                            href={`/${locale}/kontakt`}
                            aria-label={t.cta2}
                            className="rounded-xl border border-white/30 px-6 py-3 text-base font-semibold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            {t.cta2}
                        </Link>
                    </div>

                    {/* quick highlights */}
                    <ul className="mt-8 flex flex-wrap gap-4 text-[15px] sm:text-base text-white/85">
                        {t.quick.map((q) => (
                            <li
                                key={q}
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90" fill="currentColor">
                                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                {q}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
