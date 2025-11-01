'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function About({ locale }: { locale: string }) {
    const reduce = useReducedMotion();

    const dict = {
        sk: {
            heading: 'O nás',
            p: [
                'Viac ako sedem rokov sme overeným partnerom v oblasti osobnej prepravy, so špecializáciou na letiskové a firemné transfery.',
                'Naše služby zabezpečujeme výlučne vozidlami Mercedes-Benz, od krátkych jázd až po dlhšie cesty.',
                'Každý z našich vodičov má dlhoročné skúsenosti a kladie dôraz na bezpečnosť, presnosť a komfort cestujúcich. Preto sa môžete vždy spoľahnúť na ústretový prístup, ochotu a maximálnu starostlivosť o vaše pohodlie.',
                'S nami získate partnera, na ktorého sa môžete obrátiť pri obchodných cestách, letiskových transferoch, spoločenských udalostiach či každodenných presunoch po meste aj mimo neho.'
            ]
        },
        en: {
            heading: 'About us',
            p: [
                'For over seven years, we have been a trusted partner in passenger transport, focusing on airport and corporate transfers.',
                'We operate exclusively Mercedes-Benz vehicles for both short and long journeys.',
                'Our drivers are experienced and prioritize safety, punctuality, and comfort — with a friendly, customer-first approach.',
                'Count on us for business trips, airport transfers, events, and daily city or out-of-town rides.'
            ]
        },
        de: {
            heading: 'Über uns',
            p: [
                'Seit über sieben Jahren sind wir ein verlässlicher Partner im Personentransport, spezialisiert auf Flughafen- und Firmen­transfers.',
                'Wir fahren ausschließlich mit Mercedes-Benz – für kurze Fahrten ebenso wie für längere Strecken.',
                'Unsere Fahrer sind erfahren und legen Wert auf Sicherheit, Pünktlichkeit und Komfort – mit kundenfreundlichem Auftreten.',
                'Wir sind Ihr Partner für Geschäftsreisen, Flughafentransfers, Events sowie tägliche Fahrten in und außerhalb der Stadt.'
            ]
        }
    } as const;

    const t = (dict as any)[locale] ?? dict.sk;

    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.heading}</h2>
            <div className="mt-6 space-y-4 text-gray-700">
                {t.p.map((para: string, i: number) => (
                    <motion.p
                        key={i}
                        initial={reduce ? undefined : { opacity: 0, y: 8 }}
                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.35, delay: i * 0.03, ease: 'easeOut' }}
                    >
                        {para}
                    </motion.p>
                ))}
            </div>
        </section>
    );
}
