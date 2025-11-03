// src/components/ui/Nav.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LocaleSwitcher from './LocaleSwitcher';

type Locale = 'sk' | 'en' | 'de';

function NavLink({
                     href, children, active,
                 }: { href: string; children: React.ReactNode; active?: boolean }) {
    return (
        <Link
            href={href}
            className={[
                'inline-flex items-center leading-none',         // ← вертикальний центр тексту
                'relative group text-white transition hover:opacity-90',
                'after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-rose-600',
                active ? 'after:w-full' : 'after:w-0 group-hover:after:w-full',
                'after:transition-[width] after:duration-300',
            ].join(' ')}
        >
            {children}
        </Link>
    );
}

const LABELS: Record<Locale, { home: string; pricing: string; contact: string; cta: string }> = {
    sk: { home: 'Domov', pricing: 'Cenník', contact: 'Kontakt', cta: 'Objednať' },
    en: { home: 'Home', pricing: 'Pricing', contact: 'Contact', cta: 'Book now' },
    de: { home: 'Startseite', pricing: 'Preise', contact: 'Kontakt', cta: 'Jetzt buchen' },
} as const;

export default function Nav({ locale }: { locale: Locale }) {
    const pathname = usePathname() || '/';
    const isActive = (p: string) => pathname === p || pathname === `${p}/`;
    const t = LABELS[locale] ?? LABELS.sk;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        open ? root.classList.add('overflow-hidden') : root.classList.remove('overflow-hidden');
        return () => root.classList.remove('overflow-hidden');
    }, [open]);

    useEffect(() => {
        if (open) queueMicrotask(() => setOpen(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <header className="fixed inset-x-0 top-0 z-[100]">
            <nav className="bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60" aria-label="Primary">
                <div
                    className="
            mx-auto w-full max-w-7xl
            h-14 md:h-28                          /* ← рівно така висота */
            px-4 md:px-6
            grid grid-cols-[auto_1fr_auto]
            place-items-center                    /* ← центрує елементи по вертикалі */
          "
                >
                    {/* ЛОГО зліва */}
                    <Link href={`/${locale}`} className="justify-self-start h-full flex items-center">
                        <Image
                            src="/leaflet/logo.png"
                            alt="CarTour"
                            width={720}
                            height={144}
                            priority
                            sizes="(max-width:768px) 180px, 720px"
                            className="h-12 md:h-36 w-auto"
                        />
                    </Link>

                    {/* Центр: лінки (desktop) */}
                    <div className="hidden md:flex h-full items-center justify-center gap-12">
                        <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>{t.home}</NavLink>
                        <NavLink href={`/${locale}/cennik`} active={isActive(`/${locale}/cennik`)}>{t.pricing}</NavLink>
                        <NavLink href={`/${locale}/kontakt`} active={isActive(`/${locale}/kontakt`)}>{t.contact}</NavLink>
                    </div>

                    {/* Праворуч: CTA + мова (desktop) */}
                    <div className="hidden md:flex h-full items-center justify-end gap-3 justify-self-end">
                        <Link
                            href={`/${locale}/kontakt`}
                            className="inline-flex items-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-rose-500"
                        >
                            {t.cta}
                        </Link>
                        <LocaleSwitcher locale={locale} />
                    </div>

                    {/* Бургер (mobile, праворуч, по центру вертикалі) */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-controls="mobile-menu"
                        aria-expanded={open}
                        onClick={() => setOpen(v => !v)}
                        className="
              md:hidden justify-self-end
              inline-flex items-center justify-center
              w-12 h-12 rounded-xl
              bg-white/10 ring-1 ring-white/15
              hover:bg-white/15 active:scale-[.98]
              relative z-[110]
            "
                    >
                        <span className="sr-only">Menu</span>
                        <div className="space-y-1.5">
                            <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
                            <span className={`block h-0.5 w-6 bg-white transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Повноекранне мобільне меню */}
            <div
                id="mobile-menu"
                className={`md:hidden fixed inset-0 z-[140] transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            >
                <div className="absolute inset-0 bg-black/90" />
                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center text-white transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-4'}`}>
                    <Link href={`/${locale}`} onClick={() => setOpen(false)} className="text-2xl font-semibold">{t.home}</Link>
                    <Link href={`/${locale}/cennik`} onClick={() => setOpen(false)} className="text-2xl font-semibold">{t.pricing}</Link>
                    <Link href={`/${locale}/kontakt`} onClick={() => setOpen(false)} className="text-2xl font-semibold">{t.contact}</Link>
                    <Link href={`/${locale}/kontakt`} onClick={() => setOpen(false)} className="mt-2 rounded-full bg-rose-600 px-7 py-3 text-lg font-semibold hover:bg-rose-500">
                        {t.cta}
                    </Link>
                    <div className="mt-4">
                        <LocaleSwitcher locale={locale} />
                    </div>
                </div>
            </div>
        </header>
    );
}
