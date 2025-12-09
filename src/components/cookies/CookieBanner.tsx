'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const locales = ['sk', 'en', 'de'] as const;
type Locale = (typeof locales)[number];

function isLocale(x: string): x is Locale {
    return (locales as readonly string[]).includes(x);
}

type CategoryKey = 'necessary' | 'preferences' | 'analytics' | 'marketing';

type CategoryCopy = {
    label: string;
    description: string;
    alwaysOn?: boolean;
};

type Copy = {
    title: string;
    text: string;
    acceptAllLabel: string;
    settingsLabel: string;
    settingsCloseLabel: string;
    saveLabel: string;
    googleIntro: string;
    googleLinkLabel: string;
    googleUrl: string;
    categories: Record<CategoryKey, CategoryCopy>;
};

type CookieSettings = Record<CategoryKey, boolean>;

const defaultSettings: CookieSettings = {
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
};

const texts: Record<Locale, Copy> = {
    sk: {
        title: 'Nastavenia súborov cookie',
        text: 'Na tejto stránke používame súbory cookie, aby sme zlepšili tvoju skúsenosť, analyzovali návštevnosť a zabezpečili správne fungovanie stránky.',
        acceptAllLabel: 'Prijať všetko',
        settingsLabel: 'Prispôsobiť nastavenia',
        settingsCloseLabel: 'Skryť nastavenia',
        saveLabel: 'Uložiť nastavenia',
        googleIntro:
            'Viac o tom, ako Google používa súbory cookie, nájdeš v dokumente',
        googleLinkLabel: 'Ako Google používa súbory cookie',
        googleUrl: 'https://policies.google.com/technologies/cookies?hl=sk',
        categories: {
            necessary: {
                label: 'Nevyhnutné',
                description:
                    'Umožňujú bezpečné a základné fungovanie stránky (napr. rezervácia, formuláre).',
                alwaysOn: true,
            },
            preferences: {
                label: 'Preferenčné',
                description:
                    'Umožňujú ukladať tvoje nastavenia (jazyk, preferencie) a zlepšujú komfort.',
            },
            analytics: {
                label: 'Analytické',
                description:
                    'Pomáhajú nám porozumieť, ako sa stránka používa, aby sme ju mohli zlepšovať.',
            },
            marketing: {
                label: 'Marketingové',
                description:
                    'Umožňujú personalizáciu obsahu a zobrazenie relevantnej reklamy.',
            },
        },
    },
    en: {
        title: 'Cookie settings',
        text: 'We use cookies on this website to improve your experience, analyse traffic and ensure the site works correctly.',
        acceptAllLabel: 'Accept all',
        settingsLabel: 'Edit settings',
        settingsCloseLabel: 'Hide settings',
        saveLabel: 'Save settings',
        googleIntro:
            'You can read more about how Google uses cookies in the document',
        googleLinkLabel: 'How Google uses cookies',
        googleUrl: 'https://policies.google.com/technologies/cookies?hl=en',
        categories: {
            necessary: {
                label: 'Necessary',
                description:
                    'Required for the basic and secure functioning of the website (booking, forms, etc.).',
                alwaysOn: true,
            },
            preferences: {
                label: 'Preferences',
                description:
                    'Remember your choices (language, preferences) to improve your comfort.',
            },
            analytics: {
                label: 'Analytics',
                description:
                    'Help us understand how the site is used so we can improve it.',
            },
            marketing: {
                label: 'Marketing',
                description:
                    'Allow us to personalise content and show relevant ads.',
            },
        },
    },
    de: {
        title: 'Cookie-Einstellungen',
        text: 'Wir verwenden auf dieser Website Cookies, um deine Erfahrung zu verbessern, den Traffic zu analysieren und die korrekte Funktion der Seite sicherzustellen.',
        acceptAllLabel: 'Alle akzeptieren',
        settingsLabel: 'Einstellungen anpassen',
        settingsCloseLabel: 'Einstellungen ausblenden',
        saveLabel: 'Einstellungen speichern',
        googleIntro:
            'Mehr darüber, wie Google Cookies verwendet, findest du im Dokument',
        googleLinkLabel: 'Wie Google Cookies verwendet',
        googleUrl: 'https://policies.google.com/technologies/cookies?hl=de',
        categories: {
            necessary: {
                label: 'Notwendig',
                description:
                    'Ermöglichen die grundlegende und sichere Funktion der Website (Buchung, Formulare usw.).',
                alwaysOn: true,
            },
            preferences: {
                label: 'Präferenzen',
                description:
                    'Speichern deine Einstellungen (Sprache, Präferenzen) für mehr Komfort.',
            },
            analytics: {
                label: 'Analytisch',
                description:
                    'Helfen uns zu verstehen, wie die Seite genutzt wird, damit wir sie verbessern können.',
            },
            marketing: {
                label: 'Marketing',
                description:
                    'Ermöglichen personalisierte Inhalte und relevante Werbung.',
            },
        },
    },
};

const STORAGE_KEY = 'cartour_cookie_consent';
const SETTINGS_KEY = 'cartour_cookie_settings';
const COOKIE_NAME = 'cartour_cookie_consent';

const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function hasConsent(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === '1') return true;
    } catch {
        // ignore
    }

    if (typeof document !== 'undefined') {
        const found = document.cookie
            .split('; ')
            .some((c) => c.startsWith(`${COOKIE_NAME}=`));
        if (found) return true;
    }

    return false;
}

function loadSettings(): CookieSettings {
    if (typeof window === 'undefined') return defaultSettings;

    try {
        const raw = window.localStorage.getItem(SETTINGS_KEY);
        if (!raw) return defaultSettings;
        const parsed = JSON.parse(raw) as Partial<CookieSettings>;
        return {
            ...defaultSettings,
            ...parsed,
            necessary: true,
        };
    } catch {
        return defaultSettings;
    }
}

function persistConsent(settings: CookieSettings) {
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(STORAGE_KEY, '1');
            window.localStorage.setItem(
                SETTINGS_KEY,
                JSON.stringify(settings),
            );
        } catch {
            // ignore
        }
    }

    if (typeof document !== 'undefined') {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        document.cookie = `${COOKIE_NAME}=1; path=/; expires=${expires.toUTCString()}`;
    }
}

export default function CookieBanner({ locale }: { locale: string }) {
    const [panelOpen, setPanelOpen] = useState(false);
    const [fabVisible, setFabVisible] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [settings, setSettings] = useState<CookieSettings>(defaultSettings);

    const reduceMotion = useReducedMotion();
    const reduce = !!reduceMotion;

    const t = texts[isLocale(locale) ? locale : 'sk'];

    useEffect(() => {
        const consent = hasConsent();
        const loaded = loadSettings();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings(loaded);

        if (consent) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFabVisible(true);
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPanelOpen(true);
        }
    }, []);

    const handleAcceptAll = () => {
        const allOn: CookieSettings = {
            necessary: true,
            preferences: true,
            analytics: true,
            marketing: true,
        };
        persistConsent(allOn);
        setSettings(allOn);
        setPanelOpen(false);
        setFabVisible(true);
    };

    const handleSaveSettings = () => {
        const normalized: CookieSettings = {
            ...settings,
            necessary: true,
        };
        persistConsent(normalized);
        setSettings(normalized);
        setPanelOpen(false);
        setFabVisible(true);
    };

    const handleCloseOnlyNecessary = () => {
        persistConsent(defaultSettings);
        setSettings(defaultSettings);
        setPanelOpen(false);
        setFabVisible(true);
    };

    const toggleCategory = (key: CategoryKey) => {
        if (key === 'necessary') return;
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const openFromFab = () => {
        setPanelOpen(true);
        setSettingsOpen(true);
    };

    const primaryBtnClasses =
        'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold min-w-[150px] h-10';
    const secondaryBtnClasses =
        'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium min-w-[150px] h-10';

    return (
        <>
            {/* плавающая кнопка снизу справа */}
            <AnimatePresence>
                {fabVisible && !panelOpen && (
                    <motion.button
                        type="button"
                        onClick={openFromFab}
                        initial={reduce ? undefined : { opacity: 0, y: 20 }}
                        animate={reduce ? undefined : { opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: 20 }}
                        transition={
                            reduce
                                ? { duration: 0 }
                                : { duration: 0.35, ease: SOFT_EASE }
                        }
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9998] rounded-full bg-slate-900/95 px-4 py-2 shadow-lg shadow-slate-900/80 ring-1 ring-sky-500/40 hover:bg-slate-800 transition-colors"
                        aria-label="Open cookie settings"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800/90">
                                <Image
                                    src="/leaflet/cookie.png"
                                    alt="Cookie icon"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <span className="hidden text-[11px] font-medium text-slate-100 sm:inline">
                                Cookie nastavenia
                            </span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* главный блок с баннером */}
            <AnimatePresence>
                {panelOpen && (
                    <motion.div
                        initial={
                            reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }
                        }
                        animate={
                            reduce ? undefined : { opacity: 1, y: 0, scale: 1 }
                        }
                        exit={
                            reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }
                        }
                        transition={
                            reduce
                                ? { duration: 0 }
                                : { duration: 0.4, ease: SOFT_EASE }
                        }
                        className="fixed inset-x-0 bottom-4 sm:bottom-6 z-[9999] flex items-end justify-center sm:justify-end px-3 sm:px-6 pointer-events-none"
                    >
                        {/* карточка, без затемнения фона */}
                        <div className="relative w-full sm:w-auto max-w-md pointer-events-auto rounded-3xl bg-slate-900/98 text-slate-50 shadow-2xl shadow-slate-950/80 ring-1 ring-sky-500/35">
                            {/* увеличили допустимую высоту, чтобы не было вертикального скролла */}
                            <div className="flex max-h-[min(640px,calc(100vh-4rem))] flex-col overflow-hidden">
                                {/* прокручиваемая часть (на очень маленьких экранах всё ещё может скроллиться) */}
                                <div className="flex-1 overflow-y-auto px-4 pt-4 pb-3 sm:px-5 sm:pt-4 sm:pb-3">
                                    {/* шапка */}
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-800/95 ring-1 ring-rose-500/70 shadow-[0_8px_20px_rgba(248,113,113,0.55)]">
                                                <Image
                                                    src="/leaflet/cookie.png"
                                                    alt="Cookie icon"
                                                    width={22}
                                                    height={22}
                                                />
                                            </div>
                                            <div className="text-xs font-semibold sm:text-sm">
                                                {t.title}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleCloseOnlyNecessary}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/90 text-slate-300 text-xs hover:bg-slate-700 hover:text-slate-50 transition-colors"
                                            aria-label="Close cookie banner"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* текст */}
                                    <p className="text-[11px] leading-relaxed text-slate-100/90 sm:text-xs">
                                        {t.text}
                                    </p>
                                    <p className="mt-1 text-[10px] leading-snug text-slate-300/80 sm:text-[11px]">
                                        {t.googleIntro}{' '}
                                        <a
                                            href={t.googleUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-medium text-rose-300 underline underline-offset-2 hover:text-rose-200"
                                        >
                                            {t.googleLinkLabel}
                                        </a>
                                        .
                                    </p>

                                    {/* категории */}
                                    <AnimatePresence initial={false}>
                                        {settingsOpen && (
                                            <motion.div
                                                key="settings"
                                                initial={
                                                    reduce
                                                        ? undefined
                                                        : {
                                                            opacity: 0,
                                                            height: 0,
                                                            y: -4,
                                                        }
                                                }
                                                animate={
                                                    reduce
                                                        ? undefined
                                                        : {
                                                            opacity: 1,
                                                            height: 'auto',
                                                            y: 0,
                                                        }
                                                }
                                                exit={
                                                    reduce
                                                        ? undefined
                                                        : {
                                                            opacity: 0,
                                                            height: 0,
                                                            y: -4,
                                                        }
                                                }
                                                transition={
                                                    reduce
                                                        ? { duration: 0 }
                                                        : {
                                                            duration: 0.35,
                                                            ease: SOFT_EASE,
                                                        }
                                                }
                                                className="mt-4 space-y-3 overflow-hidden"
                                            >
                                                {(Object.entries(
                                                    t.categories,
                                                ) as [
                                                    CategoryKey,
                                                    CategoryCopy,
                                                ][]).map(([key, cat]) => {
                                                    const isOn =
                                                        cat.alwaysOn ||
                                                        settings[key];

                                                    return (
                                                        <div
                                                            key={key}
                                                            className="flex flex-col gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3.5 py-2.5 sm:flex-row sm:items-center sm:gap-3.5 sm:px-4 sm:py-3"
                                                        >
                                                            <div className="flex-1 pr-1">
                                                                <div className="text-[11px] font-semibold sm:text-xs">
                                                                    {
                                                                        cat.label
                                                                    }{' '}
                                                                    {cat.alwaysOn && (
                                                                        <span className="align-middle text-[9px] font-medium uppercase tracking-wide text-emerald-300">
                                                                            •
                                                                            vždy
                                                                            zapnuté
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="mt-1 text-[10px] leading-snug text-slate-200/80 sm:text-[11px]">
                                                                    {
                                                                        cat.description
                                                                    }
                                                                </p>
                                                            </div>

                                                            {/* свитч */}
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleCategory(
                                                                        key,
                                                                    )
                                                                }
                                                                disabled={
                                                                    cat.alwaysOn
                                                                }
                                                                className={`relative mt-1.5 sm:mt-0 flex h-6 w-11 flex-shrink-0 items-center self-end sm:self-center rounded-full border overflow-hidden transition-colors ${
                                                                    cat.alwaysOn
                                                                        ? 'cursor-default border-rose-300 bg-rose-500'
                                                                        : isOn
                                                                            ? 'border-rose-300 bg-rose-500'
                                                                            : 'border-slate-500 bg-slate-700'
                                                                }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                                                                        isOn
                                                                            ? 'left-[24px]'
                                                                            : 'left-[3px]'
                                                                    }`}
                                                                />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* нижние кнопки */}
                                <div className="border-t border-slate-800/80 px-4 py-3 sm:px-5 sm:py-3.5">
                                    {settingsOpen ? (
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <button
                                                type="button"
                                                onClick={handleSaveSettings}
                                                className={`${primaryBtnClasses} w-full sm:w-auto bg-rose-600 text-white shadow-[0_10px_26px_rgba(248,113,113,0.65)] transition-transform transition-colors hover:-translate-y-[1px] hover:bg-rose-500`}
                                            >
                                                {t.saveLabel}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleAcceptAll}
                                                className={`${secondaryBtnClasses} w-full sm:w-auto border border-slate-500/70 bg-slate-900/80 text-slate-100 hover:bg-slate-800/90`}
                                            >
                                                {t.acceptAllLabel}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <button
                                                type="button"
                                                onClick={handleAcceptAll}
                                                className={`${primaryBtnClasses} w-full sm:w-auto bg-rose-600 text-white shadow-[0_10px_26px_rgba(248,113,113,0.65)] transition-transform transition-colors hover:-translate-y-[1px] hover:bg-rose-500`}
                                            >
                                                {t.acceptAllLabel}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSettingsOpen(
                                                        (open) => !open,
                                                    )
                                                }
                                                className={`${secondaryBtnClasses} w-full sm:w-auto border border-slate-500/70 bg-slate-900/80 text-slate-100 hover:bg-slate-800/90`}
                                            >
                                                {settingsOpen
                                                    ? t.settingsCloseLabel
                                                    : t.settingsLabel}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
