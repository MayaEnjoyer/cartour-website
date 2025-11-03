'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LocaleSwitcher from './LocaleSwitcher';

type Locale = 'sk' | 'en' | 'de';

function NavLink({
                     href,
                     children,
                     active,
                 }: {
    href: string;
    children: React.ReactNode;
    active?: boolean;
}) {
    return (
        <Link
            href={href}
            className={[
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

const LABELS: Record<
    Locale,
    { home: string; pricing: string; contact: string; cta: string }
> = {
    sk: { home: 'Domov', pricing: 'Cenník', contact: 'Kontakt', cta: 'Objednať' },
    en: { home: 'Home', pricing: 'Pricing', contact: 'Contact', cta: 'Book now' },
    de: { home: 'Startseite', pricing: 'Preise', contact: 'Kontakt', cta: 'Jetzt buchen' },
} as const;

export default function Nav({ locale }: { locale: Locale }) {
    const pathname = usePathname() || '/';
    const isActive = (p: string) => pathname === p || pathname === `${p}/`;
    const t = LABELS[locale] ?? LABELS.sk;

    const [open, setOpen] = useState(false);

    // Блокуємо скрол під відкритим мобільним меню
    useEffect(() => {
        const root = document.documentElement;
        if (open) root.classList.add('overflow-hidden');
        else root.classList.remove('overflow-hidden');
        return () => root.classList.remove('overflow-hidden');
    }, [open]);

    // Закриваємо меню при переході між сторінками
    useEffect(() => {
        if (open) queueMicrotask(() => setOpen(false));
    }, [pathname, open]);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            {/* Верхня панель */}
            <nav
                className="bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60"
                aria-label="Primary"
            >
                <div
                    className="
            mx-auto w-full max-w-7xl
            h-14 md:h-28
            px-4 md:px-6
            grid grid-cols-[1fr_auto_1fr] items-center
          "
                >
                    {/* ЛОГО зліва (на desktop h-36) */}
                    <Link href={`/${locale}`} className="justify-self-start flex items-center">
                        <Image
                            src="/leaflet/logo.png"
                            alt="CarTour"
                            width={720}
                            height={144}
                            priority
                            sizes="(max-width:768px) 160px, 720px"
                            className="h-8 md:h-36 w-auto"
                        />
                    </Link>

                    {/* Центр: посилання (desktop) */}
                    <div className="hidden md:flex items-center gap-12 justify-self-center">
                        <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>
                            {t.home}
                        </NavLink>
                        <NavLink href={`/${locale}/cennik`} active={isActive(`/${locale}/cennik`)}>
                            {t.pricing}
                        </NavLink>
                        <NavLink href={`/${locale}/kontakt`} active={isActive(`/${locale}/kontakt`)}>
                            {t.contact}
                        </NavLink>
                    </div>

                    {/* Праворуч: CTA + перемикач мови (desktop) */}
                    <div className="hidden md:flex items-center gap-3 justify-self-end">
                        <Link
                            href={`/${locale}/kontakt`}
                            className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-rose-500"
                        >
                            {t.cta}
                        </Link>
                        <LocaleSwitcher locale={locale} />
                    </div>

                    {/* Бургер справа (mobile) */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-controls="mobile-menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="
              md:hidden justify-self-end
              inline-flex items-center justify-center
              w-14 h-14 rounded-2xl
              bg-white/10 ring-1 ring-white/15
            "
                    >
                        <span className="sr-only">Menu</span>
                        <div className="space-y-2">
              <span
                  className={`block h-0.5 w-8 bg-white transition-transform ${
                      open ? 'translate-y-2 rotate-45' : ''
                  }`}
              />
                            <span
                                className={`block h-0.5 w-8 bg-white transition-opacity ${
                                    open ? 'opacity-0' : 'opacity-100'
                                }`}
                            />
                            <span
                                className={`block h-0.5 w-8 bg-white transition-transform ${
                                    open ? '-translate-y-2 -rotate-45' : ''
                                }`}
                            />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Повноекранне мобільне меню */}
            <div
                id="mobile-menu"
                className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
                    open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
            >
                <div className="absolute inset-0 bg-black/90" />

                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-8 px-6
                      text-center text-white transition-transform duration-300
                      ${open ? 'translate-y-0' : '-translate-y-4'}`}
                >
                    <Link
                        href={`/${locale}`}
                        onClick={() => setOpen(false)}
                        className="text-2xl font-semibold"
                    >
                        {t.home}
                    </Link>
                    <Link
                        href={`/${locale}/cennik`}
                        onClick={() => setOpen(false)}
                        className="text-2xl font-semibold"
                    >
                        {t.pricing}
                    </Link>
                    <Link
                        href={`/${locale}/kontakt`}
                        onClick={() => setOpen(false)}
                        className="text-2xl font-semibold"
                    >
                        {t.contact}
                    </Link>

                    <Link
                        href={`/${locale}/kontakt`}
                        onClick={() => setOpen(false)}
                        className="mt-2 rounded-full bg-rose-600 px-7 py-3 text-lg font-semibold hover:bg-rose-500"
                    >
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
