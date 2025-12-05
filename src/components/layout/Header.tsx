'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type L = 'sk' | 'en' | 'de';
const isL = (x: string): x is L => (['sk', 'en', 'de'] as const).includes(x as L);

function replaceLocaleInPath(pathname: string, target: L) {
    // pathname like /sk/cennik or /en, /de/kontakt
    const parts = pathname.split('/');
    if (parts.length > 1 && isL(parts[1])) {
        parts[1] = target;
        return parts.join('/') || `/${target}`;
    }
    // default: prefix with target
    return `/${target}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

export default function Header({ locale }: { locale: L }) {
    const pathname = usePathname() || `/${locale}`;
    const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
    const [scrolled, setScrolled] = useState(false);
    const [openLang, setOpenLang] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const t = useMemo(() => {
        const dict: Record<
            L,
            { home: string; prices: string; contact: string; order: string; dial: string }
        > = {
            sk: { home: 'Domov',  prices: 'Cenník',  contact: 'Kontakt', order: 'OBJEDNAŤ',  dial: 'Zavolať' },
            en: { home: 'Home',   prices: 'Pricing', contact: 'Contact', order: 'BOOK NOW', dial: 'Call' },
            de: { home: 'Start',  prices: 'Preise',  contact: 'Kontakt', order: 'BESTELLEN', dial: 'Anrufen' },
        };
        return dict[locale] ?? dict.sk;
    }, [locale]);

    const linkBase = 'px-3 py-2 text-sm font-medium transition hover:opacity-90';
    const active = 'text-white';
    const inactive = 'text-white/85';

    return (
        <header
            className={[
                'fixed inset-x-0 top-0 z-50',
                'transition',
                scrolled
                    ? 'backdrop-blur-md bg-slate-900/45 ring-1 ring-white/10'
                    : 'bg-transparent',
            ].join(' ')}
        >
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                {/* Left: Logo */}
                <Link href={`/${locale}`} className="inline-flex items-center gap-2">
                    <Image
                        src="/leaflet/logo-nav.png"
                        alt="Cartour"
                        width={260}
                        height={39}
                        priority
                        // немного уменьшили логотип
                        className="h-4.5 sm:h-5.5 md:h-6.5 w-auto"
                    />
                </Link>

                {/* Center: Links */}
                <div className="hidden sm:flex items-center gap-2">
                    <Link
                        href={`/${locale}`}
                        className={`${linkBase} ${isHome ? active : inactive}`}
                    >
                        {t.home}
                    </Link>
                    <Link
                        href={`/${locale}/cennik`}
                        className={`${linkBase} ${
                            pathname.startsWith(`/${locale}/cennik`) ? active : inactive
                        }`}
                    >
                        {t.prices}
                    </Link>
                    <Link
                        href={`/${locale}/kontakt`}
                        className={`${linkBase} ${
                            pathname.startsWith(`/${locale}/kontakt`) ? active : inactive
                        }`}
                    >
                        {t.contact}
                    </Link>
                </div>

                {/* Right: Language + Call */}
                <div className="flex items-center gap-2">
                    {/* Language picker */}
                    <div className="relative">
                        <button
                            onClick={() => setOpenLang((v) => !v)}
                            className="inline-flex items-center gap-1 rounded-full border border-white/25 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10"
                            aria-haspopup="menu"
                            aria-expanded={openLang}
                        >
                            {locale.toUpperCase()}{' '}
                            <svg width="14" height="14" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M7 10l5 5 5-5z" />
                            </svg>
                        </button>
                        {openLang && (
                            <div
                                role="menu"
                                className="absolute right-0 mt-2 w-28 overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur shadow-lg"
                            >
                                {(['sk', 'en', 'de'] as L[]).map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => {
                                            setOpenLang(false);
                                            window.location.href = replaceLocaleInPath(pathname, l);
                                        }}
                                        className={`block w-full px-3 py-2 text-left text-sm ${
                                            l === locale
                                                ? 'text-white'
                                                : 'text-white/80 hover:bg-white/10'
                                        }`}
                                    >
                                        {l.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <a
                        href="tel:+421908699151"
                        className="inline-flex items-center gap-2 rounded-full bg-[#E10D2C] px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden
                        >
                            <path d="M21 16.5v3a1.5 1.5 0 0 1-1.64 1.5A18 18 0 0 1 3 3.64 1.5 1.5 0 0 1 4.5 2h3A1.5 1.5 0 0 1 9 3.29a9.6 9.6 0 0 0 .53 2.09 1.5 1.5 0 0 1-.34 1.6L7.9 8.27a14.5 14.5 0 0 0 7.83 7.83l1.29-1.29a1.5 1.5 0 0 1 1.6-.34 9.6 9.6 0 0 0 2.09.53 1.5 1.5 0 0 1 1.29 1.5Z" />
                        </svg>
                        +421 908 699 151
                    </a>
                </div>
            </nav>

            {/* Hairline */}
            <div
                className={
                    scrolled ? 'h-px w-full bg-white/10' : 'h-px w-full bg-transparent'
                }
            />
        </header>
    );
}
