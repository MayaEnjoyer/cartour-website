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
                'inline-flex items-center leading-none',
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
    en: { home: 'Home',  pricing: 'Pricing', contact: 'Contact', cta: 'Book now' },
    de: { home: 'Startseite', pricing: 'Preise',  contact: 'Kontakt', cta: 'Jetzt buchen' },
} as const;

export default function Nav({ locale }: { locale: Locale }) {
    const pathname = usePathname() || '/';
    const isActive = (p: string) => pathname === p || pathname === `${p}/`;
    const t = LABELS[locale] ?? LABELS.sk;

    const [open, setOpen] = useState(false);

    // блок скролу під оверлеєм
    useEffect(() => {
        const root = document.documentElement;
        open ? root.classList.add('overflow-hidden') : root.classList.remove('overflow-hidden');
        return () => root.classList.remove('overflow-hidden');
    }, [open]);

    // закривати при зміні сторінки
    useEffect(() => {
        if (open) queueMicrotask(() => setOpen(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // закриття на Esc
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-[100]">
            {/* чорна смуга — точно h-14 / md:h-28, все по центру по висоті */}
            <nav className="bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60" aria-label="Primary">
                <div
                    className="
            mx-auto w-full max-w-7xl
            h-14 md:h-28
            px-4 md:px-6
            grid grid-cols-[auto_1fr_auto]
            place-items-center
          "
                >
                    {/* ЛОГО зліва (трохи більше на мобільному) */}
                    <Link href={`/${locale}`} className="justify-self-start h-full flex items-center">
                        <Image
                            src="/leaflet/logo.png"
                            alt="CarTour"
                            width={720}
                            height={144}
                            priority
                            sizes="(max-width:768px) 260px, 720px"
                            className="h-12 sm:h-14 md:h-36 w-auto"
                        />
                    </Link>

                    {/* Центр — десктоп-меню */}
                    <div className="hidden md:flex h-full items-center justify-center gap-12">
                        <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>{t.home}</NavLink>
                        <NavLink href={`/${locale}/cennik`} active={isActive(`/${locale}/cennik`)}>{t.pricing}</NavLink>
                        <NavLink href={`/${locale}/kontakt`} active={isActive(`/${locale}/kontakt`)}>{t.contact}</NavLink>
                    </div>

                    {/* Праворуч — CTA + мова (десктоп) */}
                    <div className="hidden md:flex h-full items-center justify-end gap-3 justify-self-end">
                        <Link
                            href={`/${locale}/kontakt`}
                            className="inline-flex items-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-rose-500"
                        >
                            {t.cta}
                        </Link>
                        <LocaleSwitcher locale={locale} />
                    </div>

                    {/* Бургер — мобільний (менший, як на референсі) */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-controls="mobile-menu"
                        aria-expanded={open}
                        onClick={() => setOpen(v => !v)}
                        className="
              md:hidden justify-self-end
              inline-flex items-center justify-center
              w-11 h-11 rounded-xl
              bg-white/10 ring-1 ring-white/15
              hover:bg-white/15 active:scale-[.98]
              transition
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

            {/* Мобільне меню — «як на AutoGlow»:
         – зверху лого зліва + хрестик справа
         – посередині великі пункти
         – знизу ряд соц-іконок у колах */}
            <div
                id="mobile-menu"
                className={`md:hidden fixed inset-0 z-[140] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="absolute inset-0 bg-black/90" />

                <div className="absolute inset-0 flex flex-col">
                    {/* Верхня смужка оверлея */}
                    <div className="h-14 px-4 flex items-center justify-between">
                        <Image
                            src="/leaflet/logo.png"
                            alt="CarTour"
                            width={240}
                            height={72}
                            className="h-10 w-auto"
                            priority
                        />
                        <button
                            aria-label="Close menu"
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1 ring-white/15 bg-white/10 hover:bg-white/15"
                        >
                            {/* іконка X (svg, без пакетів) */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Контент меню */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-7 px-6 text-center text-white">
                        <Link href={`/${locale}`} onClick={() => setOpen(false)} className="text-2xl font-semibold">
                            {t.home}
                        </Link>
                        <Link href={`/${locale}/cennik`} onClick={() => setOpen(false)} className="text-2xl font-semibold">
                            {t.pricing}
                        </Link>
                        <Link href={`/${locale}/kontakt`} onClick={() => setOpen(false)} className="text-2xl font-semibold">
                            {t.contact}
                        </Link>

                        <Link
                            href={`/${locale}/kontakt`}
                            onClick={() => setOpen(false)}
                            className="mt-1 rounded-full bg-rose-600 px-7 py-3 text-lg font-semibold hover:bg-rose-500"
                        >
                            {t.cta}
                        </Link>
                    </div>

                    {/* Соц-іконки внизу (статичні svg) */}
                    <div className="pb-8 flex items-center justify-center gap-4">
                        <a href="#" aria-label="Facebook" className="inline-flex w-10 h-10 rounded-full bg-rose-600 items-center justify-center hover:bg-rose-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M13.5 9H16V6h-2.5C11.6 6 11 7.2 11 8.7V10H9v3h2v5h3v-5h2.1l.4-3H14v-1c0-.6.2-1 1.5-1Z"/></svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="inline-flex w-10 h-10 rounded-full bg-rose-600 items-center justify-center hover:bg-rose-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM17.5 6A1.5 1.5 0 1119 7.5 1.5 1.5 0 0117.5 6z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="YouTube" className="inline-flex w-10 h-10 rounded-full bg-rose-600 items-center justify-center hover:bg-rose-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M23 12s0-3.6-.5-5.2a3.1 3.1 0 00-2.2-2.2C18.7 4 12 4 12 4s-6.7 0-8.3.6A3.1 3.1 0 001.5 6.8C1 8.4 1 12 1 12s0 3.6.5 5.2a3.1 3.1 0 002.2 2.2C5.3 20 12 20 12 20s6.7 0 8.3-.6a3.1 3.1 0 002.2-2.2C23 15.6 23 12 23 12zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
