'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
    const isActive = (p: string) => pathname === p || pathname === `${p}/`;

    const [open, setOpen] = useState(false);

    // блокуємо скрол під оверлеєм
    useEffect(() => {
        document.documentElement.classList.toggle('overflow-hidden', open);
        return () => document.documentElement.classList.remove('overflow-hidden');
    }, [open]);

    // закриваємо при зміні маршруту
    useEffect(() => {
        if (open) queueMicrotask(() => setOpen(false));
    }, [pathname, open]);

    return (
        <header
            className="fixed inset-x-0 top-0 z-[100] bg-black/85 backdrop-blur supports-[backdrop-filter]:bg-black/75 pointer-events-auto"
        >
            {/* мобільно: flex з відступом між лівою і правою частиною.
          на md+ перемикаємося у грід з центровим меню */}
            <nav className="mx-auto flex h-16 md:h-28 max-w-6xl items-center justify-between px-4 md:grid md:grid-cols-[1fr_auto_1fr]">
                {/* лого (зліва) */}
                <div className="justify-self-start">
                    <Link href={`/${locale}`} className="flex items-center">
                        <Image
                            src="/leaflet/logo.png"
                            alt="CarTour"
                            width={320}
                            height={320}
                            priority
                            className="h-8 md:h-24 w-auto"
                        />
                    </Link>
                </div>

                {/* центр (тільки десктоп) */}
                <div className="hidden md:flex items-center gap-12 justify-self-center">
                    <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>{t.home}</NavLink>
                    <NavLink href={`/${locale}/cennik`} active={isActive(`/${locale}/cennik`)}>
                        {t.pricing}
                    </NavLink>
                    <NavLink href={`/${locale}/kontakt`} active={isActive(`/${locale}/kontakt`)}>
                        {t.contact}
                    </NavLink>
                </div>

                {/* праворуч (десктоп) */}
                <div className="hidden md:flex items-center gap-4 justify-self-end">
                    <Link
                        href={`/${locale}/kontakt`}
                        className="inline-flex h-10 items-center justify-center rounded-full bg-rose-600 px-5 text-sm font-semibold text-white shadow hover:bg-rose-500"
                    >
                        {t.cta}
                    </Link>
                    <LocaleSwitcher locale={locale} />
                </div>

                {/* бургер (мобільний) — СПРАВА */}
                <div className="md:hidden">
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen(true)}
                        className="relative z-[110] inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 hover:bg-white/15 active:bg-white/20"
                    >
                        <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor" d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* повноекранне меню */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                className={[
                    'md:hidden fixed inset-0 z-[120] bg-black/95 backdrop-blur-sm transition-opacity',
                    open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
                ].join(' ')}
            >
                <div className="mx-auto flex h-full max-w-6xl flex-col px-6 py-4">
                    {/* верхня панель оверлею */}
                    <div className="flex items-center justify-between">
                        <Link href={`/${locale}`} onClick={() => setOpen(false)} className="flex items-center">
                            <Image src="/leaflet/logo.png" alt="CarTour" width={160} height={64} className="h-8 w-auto" />
                        </Link>

                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() => setOpen(false)}
                            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 hover:bg-white/15"
                        >
                            <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="currentColor" d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.7 2.88 18.3 9.17 12 2.88 5.71 4.29 4.29 10.59 10.6l6.3-6.3z"/>
                            </svg>
                        </button>
                    </div>

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
                            <LocaleSwitcher locale={locale} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
