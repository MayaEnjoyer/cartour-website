'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const locales = ['sk', 'en', 'de'] as const;
type Locale = (typeof locales)[number];

function isLocale(x: string): x is Locale {
    return (locales as readonly string[]).includes(x);
}

type QA = { q: string; a: string };
type Dict = Record<Locale, { heading: string; items: QA[] }>;

const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type AccordionItem = { title: string; content: string };

function AnimatedAccordion({
                               items,
                               defaultOpen = null,
                           }: {
    items: AccordionItem[];
    defaultOpen?: number | null;
}) {
    const reduceMotion = useReducedMotion();
    const reduce = !!reduceMotion;

    // Лёгкий детект iOS, без useEffect (значение вычисляется один раз на клиенте)
    const [isIosMobile] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        const ua = window.navigator.userAgent || '';
        return /iPhone|iPad|iPod/i.test(ua) && window.innerWidth <= 820;
    });

    // Если пользователь просит меньше анимаций или это iOS — отключаем тяжёлую анимацию
    const heavyMotionDisabled = reduce || isIosMobile;

    const [openIndex, setOpenIndex] = useState<number | null>(
        typeof defaultOpen === 'number' ? defaultOpen : null,
    );

    const toggle = (idx: number) => {
        setOpenIndex((current) => (current === idx ? null : idx));
    };

    const contentVariants = {
        collapsed: { height: 0, opacity: 0 },
        open: { height: 'auto', opacity: 1 },
    } as const;

    return (
        <motion.div
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm"
            initial={heavyMotionDisabled ? undefined : { opacity: 0, y: 12 }}
            whileInView={heavyMotionDisabled ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
                heavyMotionDisabled
                    ? undefined
                    : { duration: 0.6, ease: SOFT_EASE }
            }
        >
            <div className="divide-y divide-slate-200/80">
                {items.map((item, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div key={item.title}>
                            <button
                                type="button"
                                onClick={() => toggle(idx)}
                                className={`flex w-full items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left transition-colors
                                    min-h-[72px] sm:min-h-0
                                    ${isOpen ? 'bg-slate-50/80' : 'bg-white/0'}
                                `}
                            >
                                <span className="text-[15px] sm:text-base font-medium text-slate-900">
                                    {item.title}
                                </span>
                                <div className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 text-lg leading-none transition-colors">
                                    {isOpen ? '−' : '+'}
                                </div>
                            </button>

                            {/* На iOS / reduce-motion убираем тяжёлую анимацию высоты */}
                            {heavyMotionDisabled ? (
                                isOpen && (
                                    <div className="overflow-hidden">
                                        <div className="px-4 sm:px-5 pb-4 pt-1 text-[14px] sm:text-[15px] leading-relaxed text-gray-700">
                                            {item.content}
                                        </div>
                                    </div>
                                )
                            ) : (
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial="collapsed"
                                            animate="open"
                                            exit="collapsed"
                                            variants={contentVariants}
                                            transition={{
                                                duration: 0.9,
                                                ease: SOFT_EASE,
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 sm:px-5 pb-4 pt-1 text-[14px] sm:text-[15px] leading-relaxed text-gray-700">
                                                {item.content}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default function FAQ({ locale }: { locale: string }) {
    const dict: Dict = {
        sk: {
            heading: 'Často kladené otázky',
            items: [
                {
                    q: 'Aké vozidlá máte v dispozícii vo vašom vozovom parku?',
                    a: 'Jazdíme výhradne vozidlami značky Mercedes-Benz. V ponuke máme komfortné 4-miestne vozidlá aj priestranné 5 až 8-miestne autá, vhodné aj pre väčšie skupiny či rodiny.',
                },
                {
                    q: 'Viete ma odviezť na Schwechat ak sa nachádzam mimo Bratislavy?',
                    a: 'Áno, odvoz zabezpečujeme aj z miest mimo Bratislavy. Požiadajte si o individuálnu cenovú ponuku a radi vám ju pripravíme presne podľa vašich požiadaviek.',
                },
                {
                    q: 'Ako dlho trvá cesta na letisko Schwechat?',
                    a: 'Priemerná doba cesty je približne 45 až 55 minút v závislosti od dopravnej situácie.',
                },
                {
                    q: 'Môžem si rezervovať spätnú cestu?',
                    a: 'Áno, v rezervačnom formulári nájdete možnosť „Mám záujem aj o spiatočnú cestu". Po jej rozkliknutí môžete rovno zadať všetky údaje k vášmu návratu.',
                },
                {
                    q: 'Ako môžem platiť? ',
                    a: 'Platbu je možné uskutočniť priamo u vodiča v hotovosti, pohodlne kartou alebo na faktúru.',
                },
            ],
        },
        en: {
            heading: 'Frequently asked questions',
            items: [
                {
                    q: 'What vehicles do you have available in your fleet?',
                    a: 'We operate exclusively Mercedes-Benz vehicles. Our offer includes comfortable 4-seaters as well as spacious 5- to 8-seat cars, suitable for larger groups or families.',
                },
                {
                    q: 'Can you take me to Schwechat if I’m located outside Bratislava?',
                    a: 'Yes, we also provide transfers from places outside Bratislava. Request an individual quote and we’ll gladly prepare it tailored to your requirements.',
                },
                {
                    q: 'How long does the trip to Schwechat Airport take?',
                    a: 'The average travel time is approximately 45 to 55 minutes, depending on traffic conditions.',
                },
                {
                    q: 'Can I book a return trip?',
                    a: 'Yes, in the booking form you’ll find the option “I’m also interested in a return trip.” Once you open it, you can enter all the details for your return right away.',
                },
                {
                    q: 'How can I pay?',
                    a: 'You can pay the driver directly in cash, conveniently by card, or by invoice.',
                },
            ],
        },
        de: {
            heading: 'Häufige Fragen',
            items: [
                {
                    q: 'Welche Fahrzeuge stehen in Ihrer Flotte zur Verfügung?',
                    a: 'Wir fahren ausschließlich Fahrzeuge der Marke Mercedes-Benz. Wir bieten komfortable 4-Sitzer sowie geräumige 5- bis 8-sitzige Autos, die sich auch für größere Gruppen oder Familien eignen.',
                },
                {
                    q: 'Können Sie mich nach Schwechat bringen, wenn ich mich außerhalb von Bratislava befinde?',
                    a: 'Ja, wir bieten Transfers auch aus Orten außerhalb von Bratislava an. Fordern Sie ein individuelles Preisangebot an; wir erstellen es gern genau nach Ihren Anforderungen.',
                },
                {
                    q: 'Wie lange dauert die Fahrt zum Flughafen Schwechat?',
                    a: 'Die durchschnittliche Fahrzeit beträgt etwa 45 bis 55 Minuten, je nach Verkehrslage.',
                },
                {
                    q: 'Kann ich eine Rückfahrt reservieren?',
                    a: 'Ja, im Buchungsformular finden Sie die Option „Ich interessiere mich auch für die Rückfahrt“. Wenn Sie diese öffnen, können Sie sofort alle Angaben zu Ihrer Rückfahrt eintragen.',
                },
                {
                    q: 'Wie kann ich bezahlen?',
                    a: 'Sie können direkt beim Fahrer in bar, bequem mit Karte oder per Rechnung bezahlen.',
                },
            ],
        },
    };

    const t = dict[isLocale(locale) ? locale : 'sk'];

    // Если загружаем страницу сразу с #faq-section — докрутим к себе
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.location.hash !== '#faq-section') return;

        const el = document.getElementById('faq-section');
        if (!el) return;

        setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }, []);

    return (
        <section
            id="faq-section"
            className="mx-auto max-w-6xl px-4 py-16 sm:py-24"
        >
            <div className="inline-flex items-center gap-2">
                <span className="h-2 w-10 rounded bg-sky-400" />
                <span className="h-2 w-6 rounded bg-rose-500" />
            </div>

            <div className="mt-3 rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    {t.heading}
                </h2>
                <div className="mt-6 text-[15px] sm:text-base">
                    <AnimatedAccordion
                        items={t.items.map(({ q, a }) => ({
                            title: q,
                            content: a,
                        }))}
                    />
                </div>
            </div>
        </section>
    );
}
