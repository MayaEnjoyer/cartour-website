'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

type Props = { locale: string };

export default function Hero({ locale }: Props) {
    const reduce = useReducedMotion();

    const t =
        {
            sk: {
                title: 'Pohodlné transféry na Letisko',
                subtitle:
                    'Spoľahlivá preprava vozidlami Mercedes-Benz. Cestujte štýlovo a bez starostí.',
                cta1: 'Rezervovať',
                cta2: 'Zavolajte nám',
            },
            en: {
                title: 'Comfortable Airport Transfers',
                subtitle:
                    'Reliable rides with Mercedes-Benz vehicles. Travel in style, stress-free.',
                cta1: 'Book now',
                cta2: 'Call us',
            },
            de: {
                title: 'Komfortable Flughafentransfers',
                subtitle:
                    'Zuverlässige Fahrten mit Mercedes-Benz. Reisen Sie stilvoll und stressfrei.',
                cta1: 'Buchen',
                cta2: 'Anrufen',
            },
        }[locale] ?? {
            title: 'Pohodlné transféry na Letisko',
            subtitle:
                'Spoľahlivá preprava vozidlami Mercedes-Benz. Cestujte štýlovo a bez starostí.',
            cta1: 'Rezervovať',
            cta2: 'Zavolajte nám',
        };

    return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={reduce ? undefined : { duration: 0.6, ease: 'easeOut' }}
            >
                <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">{t.title}</h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600">{t.subtitle}</p>

                <div className="mt-8 flex gap-3">
                    <Link
                        href={`/${locale}/kontakt`}
                        className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                        {t.cta1}
                    </Link>

                    <Link
                        href={`/${locale}/kontakt`}
                        aria-label={t.cta2}
                        className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                        {t.cta2}
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
