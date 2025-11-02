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
                { title: 'Vytvorte si rezerváciu online alebo telefonicky', desc: 'Rezerváciu vytvoríte online cez formulár alebo telefonicky.' },
                { title: 'Potvrdenie rezervácie', desc: 'Zašleme e-mail/SMS s detailmi — jazda je potvrdená.' },
                { title: 'V dohodnutý čas vás vyzdvihneme', desc: 'Vodič príde načas a odvezie vás pohodlne na miesto určenia.' },
            ],
        },
        en: {
            heading: 'How it works',
            steps: [
                { title: 'Make a reservation online or by phone', desc: 'Book easily via our online form or by phone.' },
                { title: 'Reservation confirmation', desc: 'We’ll send an e-mail/SMS with all details — ride confirmed.' },
                { title: 'Pickup at the agreed time', desc: 'Driver arrives on time and takes you comfortably to your destination.' },
            ],
        },
        de: {
            heading: 'So funktioniert’s',
            steps: [
                { title: 'Online oder telefonisch reservieren', desc: 'Einfach über das Online-Formular oder telefonisch buchen.' },
                { title: 'Reservierungsbestätigung', desc: 'Bestätigung per E-Mail/SMS mit allen Details — Fahrt fixiert.' },
                { title: 'Abholung zur vereinbarten Zeit', desc: 'Fahrer kommt pünktlich und bringt Sie komfortabel ans Ziel.' },
            ],
        },
    };

    const t = dict[isLocale(locale) ? locale : 'sk'];

    return (
        <section className="relative overflow-hidden bg-black text-white">
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
                <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">{t.heading}</h2>

                <div className="relative mt-8">
                    <div className="hidden sm:block absolute left-10 right-10 top-7 h-px border-t border-dashed border-white/30" />
                    <ol className="grid gap-6 sm:grid-cols-3">
                        {t.steps.map((s, i) => (
                            <motion.li
                                key={s.title}
                                className="relative rounded-2xl border border-white/20 bg-white/5 backdrop-blur p-5 shadow-sm"
                                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow ring-1 ring-black/5">
                                    {i + 1}
                                </div>
                                <h3 className="text-lg font-medium">{s.title}</h3>
                                <p className="mt-2 text-[15px] sm:text-base text-white/80">{s.desc}</p>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
