'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const locales = ['sk', 'en', 'de'] as const;
type Locale = (typeof locales)[number];

type Dict = Record<
    Locale,
    {
        heading: string;
        p: string[];
        stats: string[];
        badges: string[];
    }
>;

function isLocale(x: string): x is Locale {
    return (locales as readonly string[]).includes(x);
}

const GALLERY = [
    { src: '/leaflet/car6.png.webp', alt: 'Two black Mercedes sedans' },
    { src: '/leaflet/car.png.webp', alt: 'Mercedes interior – rear seats' },
    { src: '/leaflet/car1.png.webp', alt: 'Mercedes E-Class side view' },
    { src: '/leaflet/car4.png', alt: 'Mercedes E-Class in modern parking' },
    { src: '/leaflet/car5.png.webp', alt: 'Mercedes front view' },
    { src: '/leaflet/car7.png.webp', alt: 'Mercedes-Benz Vito' },
    { src: '/leaflet/car8.png.webp', alt: 'Mercedes-Benz Vito' },
    { src: '/leaflet/car9.png.webp', alt: 'Mercedes-Benz Vito' },
];

const dict: Dict = {
    sk: {
        heading: 'O nás',
        p: [
            'Viac ako sedem rokov sme overeným partnerom v osobnej preprave so zameraním na letiskové a firemné transfery.',
            'Jazdíme výlučne vozidlami Mercedes-Benz — pre krátke aj dlhé cesty, s dôrazom na pohodlie a bezpečnosť.',
            'Naši vodiči majú dlhoročnú prax, sú presní, diskrétni a orientovaní na váš komfort.',
            'Sme tu pre obchodné cesty, letiskové transfery, spoločenské udalosti aj každodenné presuny v meste a mimo neho.',
        ],
        stats: ['7+ rokov skúseností', '1000+ transferov ročne', 'Overená služba'],
        badges: ['Airport', 'Corporate', '24/7'],
    },
    en: {
        heading: 'About us',
        p: [
            'For 7+ years, we’ve been a trusted partner in passenger transport focused on airport and corporate transfers.',
            'We operate exclusively Mercedes-Benz — for both short and long journeys with comfort and safety.',
            'Our drivers are seasoned professionals, punctual, discreet and comfort-oriented.',
            'Business trips, airport transfers, events or daily rides — we’ve got you covered in and outside the city.',
        ],
        stats: ['7+ years of experience', '1000+ transfers / year', 'Verified service'],
        badges: ['Airport', 'Corporate', '24/7'],
    },
    de: {
        heading: 'Über uns',
        p: [
            'Seit über 7 Jahren sind wir ein verlässlicher Partner im Personentransport mit Fokus auf Flughafen- und Firmentransfers.',
            'Wir fahren ausschließlich Mercedes-Benz — kurze wie lange Strecken mit Komfort und Sicherheit.',
            'Unsere Fahrer sind erfahren, pünktlich, diskret und auf Ihren Komfort bedacht.',
            'Geschäftsreisen, Flughafentransfers, Events oder tägliche Fahrten — in und außerhalb der Stadt.',
        ],
        stats: ['7+ Jahre Erfahrung', '1000+ Transfers/Jahr', 'Verifizierter Service'],
        badges: ['Airport', 'Corporate', '24/7'],
    },
};

const ringByIdx = (i: number) =>
    [
        'ring-sky-500/20 bg-white/80',
        'ring-indigo-500/20 bg-white/80',
        'ring-rose-500/20 bg-white/80',
        'ring-emerald-500/20 bg-white/80',
    ][i % 4];

const textByIdx = (i: number) =>
    ['text-sky-700', 'text-indigo-700', 'text-rose-700', 'text-emerald-700'][i % 4];

/* ===== Очень быстрая “печатающая” анимация ===== */

// шаг между буквами (секунды) — очень быстро
const LETTER_STAGGER = 0.004;
// длительность анимации одной буквы (секунды)
const LETTER_DURATION = 0.1;
// небольшая пауза после заголовка
const HEADING_EXTRA_DELAY = 0.14;
// пауза между абзацами
const PARAGRAPH_GAP = 0.08;

type AnimatedTextProps = {
    text: string;
    visible: boolean;
    reduce: boolean;
    delayOffset?: number;
};

function AnimatedText({ text, visible, reduce, delayOffset = 0 }: AnimatedTextProps) {
    // если пользователь просит уменьшить анимации — показываем текст сразу
    if (reduce) return <>{text}</>;

    const letters = Array.from(text);

    // отдельный индекс только для "настоящих" букв (без пробелов)
    let visibleIndex = 0;

    return (
        <>
            {letters.map((ch, index) => {
                // пробелы и прочие whitespace НЕ анимируем, чтобы они не ломали слова
                if (/\s/.test(ch)) {
                    return <span key={index}>{ch}</span>;
                }

                const delay = delayOffset + visibleIndex * LETTER_STAGGER;
                visibleIndex += 1;

                return (
                    <span
                        key={index}
                        className="inline-block will-change-transform"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(0.35em)',
                            transition: `opacity ${LETTER_DURATION}s cubic-bezier(0.22, 1, 0.36, 1), transform ${LETTER_DURATION}s cubic-bezier(0.22, 1, 0.36, 1)`,
                            transitionDelay: visible ? `${delay.toFixed(3)}s` : '0s',
                        }}
                    >
            {ch}
          </span>
                );
            })}
        </>
    );
}

export default function About({ locale }: { locale: string }) {
    const reduceMotion = useReducedMotion();
    const reduce = !!reduceMotion;

    const safeLocale: Locale = isLocale(locale) ? locale : 'sk';
    const t = useMemo(() => dict[safeLocale], [safeLocale]);

    const [textVisible, setTextVisible] = useState<boolean>(reduce);

    const total = GALLERY.length;

    const [position, setPosition] = useState(1);
    const [isAnimating, setIsAnimating] = useState(true);
    const [lightbox, setLightbox] = useState(false);

    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchCurrentX, setTouchCurrentX] = useState<number | null>(null);
    const [didSwipe, setDidSwipe] = useState(false);

    const displayIndex = (position - 1 + total) % total;

    const next = () => {
        setIsAnimating(true);
        setPosition((p) => p + 1);
    };

    const prev = () => {
        setIsAnimating(true);
        setPosition((p) => p - 1);
    };

    const handleTransitionEnd = () => {
        if (reduce) return;

        if (position === total + 1) {
            setIsAnimating(false);
            setPosition(1);
        } else if (position === 0) {
            setIsAnimating(false);
            setPosition(total);
        }
    };

    useEffect(() => {
        if (!isAnimating) {
            const id = requestAnimationFrame(() => setIsAnimating(true));
            return () => cancelAnimationFrame(id);
        }
    }, [isAnimating]);

    const extendedSlides = [GALLERY[total - 1], ...GALLERY, GALLERY[0]];

    const sliderStyle = {
        transform: `translateX(-${position * 100}%)`,
        willChange: 'transform' as const,
        ...(reduce || !isAnimating
            ? { transition: 'none' }
            : { transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)' }),
    };

    const handleTouchStartCommon = (clientX: number) => {
        setTouchStartX(clientX);
        setTouchCurrentX(clientX);
        setDidSwipe(false);
    };

    const handleTouchMoveCommon = (clientX: number) => {
        if (touchStartX == null) return;
        setTouchCurrentX(clientX);
    };

    const handleTouchEndCommon = () => {
        if (touchStartX == null || touchCurrentX == null) {
            setTouchStartX(null);
            setTouchCurrentX(null);
            return;
        }

        const dx = touchCurrentX - touchStartX;
        const threshold = 40;

        if (Math.abs(dx) > threshold) {
            if (dx < 0) {
                next();
            } else {
                prev();
            }
            setDidSwipe(true);
        }

        setTouchStartX(null);
        setTouchCurrentX(null);
    };

    // смещения, чтобы абзацы стартовали по очереди (очень быстро)
    const paragraphOffsets = useMemo(() => {
        if (reduce) return t.p.map(() => 0);

        // считаем только непустые символы, чтобы не учитывать пробелы
        const headingChars = t.heading.replace(/\s+/g, '').length;
        let acc = headingChars * LETTER_STAGGER + HEADING_EXTRA_DELAY;

        const offsets: number[] = [];
        for (const para of t.p) {
            offsets.push(acc);
            const chars = para.replace(/\s+/g, '').length;
            acc += chars * LETTER_STAGGER + PARAGRAPH_GAP;
        }
        return offsets;
    }, [t, reduce]);

    return (
        <section
            id="about-section"
            className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl"
            />

            <div className="inline-flex items-center gap-2">
                <span className="h-2 w-10 rounded bg-sky-400" />
                <span className="h-2 w-6 rounded bg-rose-500" />
            </div>

            <div className="mt-3 grid items-center gap-10 lg:grid-cols-2">
                {/* ЛЕВАЯ КОЛОНКА — текст с анимацией */}
                <motion.div
                    viewport={{ once: true, amount: 0.3 }}
                    onViewportEnter={() => {
                        if (!reduce) setTextVisible(true);
                    }}
                >
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                        <AnimatedText text={t.heading} visible={textVisible} reduce={reduce} />
                    </h2>

                    <div className="mt-6 space-y-4 text-gray-700">
                        {t.p.map((para, i) => (
                            <p key={i} className="text-[15px] sm:text-base leading-relaxed">
                                <AnimatedText
                                    text={para}
                                    visible={textVisible}
                                    reduce={reduce}
                                    delayOffset={paragraphOffsets[i] ?? 0}
                                />
                            </p>
                        ))}
                    </div>

                    <ul className="mt-7 flex flex-wrap gap-3">
                        {t.stats.map((s, i) => (
                            <li
                                key={s}
                                className={`rounded-xl px-3 py-2 text-sm font-medium shadow-sm ring-1 ${ringByIdx(
                                    i,
                                )}`}
                            >
                                <span className={textByIdx(i)}>{s}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {t.badges.map((b, i) => (
                            <span
                                key={b}
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${textByIdx(
                                    i,
                                )} border-current/20`}
                            >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {b}
              </span>
                        ))}
                    </div>
                </motion.div>

                {/* ПРАВАЯ КОЛОНКА — слайдер */}
                <motion.div
                    initial={reduce ? undefined : { opacity: 0, scale: 0.985 }}
                    whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 bg-slate-900/70"
                >
                    <div
                        className="relative aspect-[16/10] w-full cursor-pointer touch-pan-y"
                        onClick={() => {
                            if (didSwipe) {
                                setDidSwipe(false);
                                return;
                            }
                            setLightbox(true);
                        }}
                        onTouchStart={(e) => {
                            if (e.touches.length === 1) {
                                handleTouchStartCommon(e.touches[0].clientX);
                            }
                        }}
                        onTouchMove={(e) => {
                            if (e.touches.length === 1) {
                                handleTouchMoveCommon(e.touches[0].clientX);
                            }
                        }}
                        onTouchEnd={() => {
                            handleTouchEndCommon();
                        }}
                    >
                        <div
                            className="flex h-full w-full select-none"
                            style={sliderStyle}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {extendedSlides.map((img, i) => (
                                <div key={`${img.src}-${i}`} className="relative min-w-full h-full">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        priority={i === 1}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/55 via-black/30 to-transparent" />

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow-md hover:bg-slate-100"
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow-md hover:bg-slate-100"
                            aria-label="Next image"
                        >
                            ›
                        </button>

                        <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                            {GALLERY.map((_, i) => (
                                <span
                                    key={i}
                                    className={`h-1.5 w-1.5 rounded-full ${
                                        i === displayIndex ? 'bg-white' : 'bg-white/40'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="sm:hidden px-3 pb-3 pt-2 flex flex-wrap justify-center gap-2">
                        <div className="rounded-[999px] bg-white/95 px-4 py-2 text-[11px] font-medium shadow whitespace-nowrap">
                            Mercedes-Benz • E-Class
                        </div>
                        <div className="rounded-[999px] bg-sky-600 text-white px-4 py-2 text-[11px] font-medium shadow whitespace-nowrap">
                            Comfort • Wi-Fi • Water
                        </div>
                        <div className="rounded-[999px] bg-rose-600 text-white px-4 py-2 text-[11px] font-medium shadow whitespace-nowrap">
                            Professional Drivers
                        </div>
                    </div>

                    <div className="hidden sm:flex absolute bottom-7 left-6.5 right-4 flex-wrap lg:flex-nowrap items-center gap-2 lg:gap-3">
                        <div className="rounded-xl bg-white/90 backdrop-blur px-2.5 py-2 text-xs sm:text-sm lg:text-[13px] font-medium shadow whitespace-nowrap">
                            Mercedes-Benz • E-Class
                        </div>
                        <div className="rounded-xl bg-sky-600 text-white px-2.5 py-2 text-xs sm:text-sm lg:text-[13px] font-medium shadow whitespace-nowrap">
                            Comfort • Wi-Fi • Water
                        </div>
                        <div className="rounded-xl bg-rose-600 text-white px-2.5 py-2 text-xs sm:text-sm lg:text-[13px] font-medium shadow whitespace-nowrap">
                            Professional Drivers
                        </div>
                    </div>
                </motion.div>
            </div>

            {lightbox && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setLightbox(false)}
                >
                    <div
                        className="relative max-w-5xl w-full px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setLightbox(false)}
                            aria-label="Close"
                            className="absolute -top-10 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow hover:bg-white"
                        >
                            ✕
                        </button>

                        <div
                            className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black touch-pan-y"
                            onTouchStart={(e) => {
                                if (e.touches.length === 1) {
                                    handleTouchStartCommon(e.touches[0].clientX);
                                }
                            }}
                            onTouchMove={(e) => {
                                if (e.touches.length === 1) {
                                    handleTouchMoveCommon(e.touches[0].clientX);
                                }
                            }}
                            onTouchEnd={() => {
                                handleTouchEndCommon();
                            }}
                        >
                            <div
                                className="flex h-full w-full select-none"
                                style={sliderStyle}
                                onTransitionEnd={handleTransitionEnd}
                            >
                                {extendedSlides.map((img, i) => (
                                    <div key={`${img.src}-lb-${i}`} className="relative min-w-full h-full">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                            className="object-contain"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={prev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-md hover:bg-slate-100"
                                aria-label="Previous image"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-md hover:bg-slate-100"
                                aria-label="Next image"
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
