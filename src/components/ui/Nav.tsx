'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';

type Locale = 'sk' | 'en' | 'de';

function NavLink({
                     href,
                     children,
                     active,
                     onClick,
                 }: {
    href: string;
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={[
                'relative group text-white transition',
                'hover:opacity-90',
                'after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-rose-600',
                active ? 'after:w-full' : 'after:w-0 group-hover:after:w-full',
                'after:transition-[width] after:duration-300 after:ease-out',
            ].join(' ')}
        >
            {children}
        </Link>
    );
}

const LABELS: Record<
    Locale,
    { home: string; pricing: string; contact: string; cta: string }
> = {
    sk: { home: 'Domov', pricing: 'Cenník', contact: 'Kontakt', cta: 'Objednať' },
    en: { home: 'Home', pricing: 'Pricing', contact: 'Contact', cta: 'Book now' },
    de: { home: 'Startseite', pricing: 'Preise', contact: 'Kontakt', cta: 'Jetzt buchen' },
} as const;

export default function Nav({ locale }: { locale: Locale }) {
    const t = LABELS[locale] ?? LABELS.sk;
    const pathname = usePathname() || '/';
    const isActive = (path: string) => pathname === path || pathname === `${path}/`;

    const [open, setOpen] = useState(false);

    // блокувати скрол фону під час відкритого меню
    useEffect(() => {
        document.documentElement.classList.toggle('overflow-hidden', open);
        return () => document.documentElement.classList.remove('overflow-hidden');
    }, [open]);

    // закривати меню при зміні маршруту (без ESLint-попередження)
    useEffect(() => {
        if (!open) return;
        queueMicrotask(() => setOpen(false)); // або setTimeout(() => setOpen(false));
    }, [pathname, open]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/80">
            <nav className="mx-auto grid h-20 md:h-28 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4">
                {/* Лого */}
                <div className="justify-self-start">
                    <Link href={`/${locale}`} className="flex items-center">
                        <Image
                            src="/leaflet/logo.png"
                            alt="CarTour"
                            width={320}
                            height={320}
                            priority
                            className="h-12 md:h-24 w-auto"
                        />
                    </Link>
                </div>

                {/* Центр — десктоп нав */}
                <div className="hidden md:flex items-center gap-12 justify-self-center">
                    <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>{t.home}</NavLink>
                    <NavLink href={`/${locale}/cennik`} active={isActive(`/${locale}/cennik`)}>{t.pricing}</NavLink>
                    <NavLink href={`/${locale}/kontakt`} active={isActive(`/${locale}/kontakt`)}>{t.contact}</NavLink>
                </div>

                {/* Праворуч — десктоп CTA + локаль */}
                <div className="hidden md:flex items-center gap-4 justify-self-end">
                    <Link
                        href={`/${locale}/kontakt`}
                        className="inline-flex h-10 items-center justify-center rounded-full bg-rose-600 px-5 text-sm font-semibold text-white shadow hover:bg-rose-500"
                    >
                        {t.cta}
                    </Link>
                    <LocaleSwitcher locale={locale} />
                </div>

                {/* Мобільний бургер */}
                <div className="md:hidden justify-self-end">
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen(true)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md ring-1 ring-white/10 hover:bg-white/10"
                    >
                        {/* 3 смужки */}
                        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="text-white">
                            <path fill="currentColor" d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* FULLSCREEN overlay меню для мобільних */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                className={[
                    'md:hidden fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm transition-opacity',
                    open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
                ].join(' ')}
            >
                <div className="mx-auto flex h-full max-w-6xl flex-col px-6 py-4">
                    {/* верхня панель оверлею: лого + хрестик */}
                    <div className="flex items-center justify-between">
                        <Link href={`/${locale}`} onClick={() => setOpen(false)} className="flex items-center">
                            <Image src="/leaflet/logo.png" alt="CarTour" width={160} height={64} className="h-10 w-auto" />
                        </Link>
                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() => setOpen(false)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-md ring-1 ring-white/10 hover:bg-white/10"
                        >
                            {/* X */}
                            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="text-white">
                                <path fill="currentColor" d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.7 2.88 18.3 9.17 12 2.88 5.71 4.29 4.29 10.59 10.6l6.3-6.3z"/>
                            </svg>
                        </button>
                    </div>

                    {/* нав-лінки */}
                    <div className="mt-10 flex flex-1 flex-col items-center gap-6">
                        <NavLink href={`/${locale}`} active={isActive(`/${locale}`)} onClick={() => setOpen(false)}>
                            <span className="text-2xl">{t.home}</span>
                        </NavLink>
                        <NavLink href={`/${locale}/cennik`} active={isActive(`/${locale}/cennik`)} onClick={() => setOpen(false)}>
                            <span className="text-2xl">{t.pricing}</span>
                        </NavLink>
                        <NavLink href={`/${locale}/kontakt`} active={isActive(`/${locale}/kontakt`)} onClick={() => setOpen(false)}>
                            <span className="text-2xl">{t.contact}</span>
                        </NavLink>

                        <Link
                            href={`/${locale}/kontakt`}
                            onClick={() => setOpen(false)}
                            className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-rose-600 px-7 text-base font-semibold text-white shadow hover:bg-rose-500"
                        >
                            {t.cta}
                        </Link>

                        <div className="mt-6">
                            {/* така ж висота, як у CTA (щоб не “стрибало”) */}
                            <LocaleSwitcher locale={locale} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
