'use client';

import { motion, useReducedMotion } from 'framer-motion';

const locales = ['sk', 'en', 'de'] as const;
type Locale = typeof locales[number];
function isLocale(x: string): x is Locale {
    return (locales as readonly string[]).includes(x);
}

type Step = { title: string; desc: string };
type Dict = Record<Locale, { heading: string; steps: Step[] }>;

export default function HowItWorks({ locale }: { locale: string }) {
    const reduce = useReducedMotion();

    const dict: Dict = {
        sk: {
            heading: 'Ako to funguje',
            steps: [
                {
                    title: 'Vytvorte si rezerváciu online alebo telefonicky',
                    desc:
                        'Rezerváciu môžete jednoducho vytvoriť online prostredníctvom nášho formulára, alebo nás kontaktovať telefonicky.',
                },
                {
                    title: 'Potvrdenie rezervácie',
                    desc:
                        'Po spracovaní rezervácie vám pošleme e-mail/SMS so všetkými údajmi. Vaša preprava je týmto záväzne potvrdená a zorganizovaná.',
                },
                {
                    title: 'V dohodnutý čas vás vyzdvihneme',
                    desc:
                        'Náš vodič bude v stanovenom čase čakať na dohodnutej adrese a odvezie vás spoľahlivo a pohodlne na miesto určenia.',
                },
            ],
        },
        en: {
            heading: 'How it works',
            steps: [
                {
                    title: 'Make a reservation online or by phone',
                    desc:
                        'Book easily via our online form or contact us by phone.',
                },
                {
                    title: 'Reservation confirmation',
                    desc:
                        'We’ll send a confirmation via e-mail/SMS with all trip details. Your ride is scheduled and confirmed.',
                },
                {
                    title: 'Pickup at the agreed time',
                    desc:
                        'Our driver will wait at the specified address and take you safely and comfortably to your destination.',
                },
            ],
        },
        de: {
            heading: 'So funktioniert’s',
            steps: [
                {
                    title: 'Online oder telefonisch reservieren',
                    desc:
                        'Buchen Sie bequem über unser Online-Formular oder telefonisch.',
                },
                {
                    title: 'Reservierungsbestätigung',
                    desc:
                        'Wir senden eine Bestätigung per E-Mail/SMS mit allen Details. Ihre Fahrt ist fix eingeplant.',
                },
                {
                    title: 'Abholung zur vereinbarten Zeit',
                    desc:
                        'Unser Fahrer wartet zur vereinbarten Zeit und bringt Sie sicher und komfortabel ans Ziel.',
                },
            ],
        },
    };

    const t = dict[isLocale(locale) ? locale : 'sk'];

    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.heading}</h2>

            <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                {t.steps.map((s, i) => (
                    <motion.li
                        key={s.title}
                        className="rounded-xl border p-5"
                        initial={reduce ? undefined : { opacity: 0, y: 12 }}
                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
                    >
                        <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium">
                            {i + 1}
                        </div>
                        <h3 className="text-lg font-medium">{s.title}</h3>
                        <p className="mt-2 text-gray-600 text-sm">{s.desc}</p>
                    </motion.li>
                ))}
            </ol>
        </section>
    );
}
