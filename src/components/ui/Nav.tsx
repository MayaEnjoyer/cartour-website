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

// i18n labels
const LABELS: Record<Locale, { home: string; pricing: string; contact: string; cta: string }> = {
    sk: { home: 'Domov', pricing: 'Cenník', contact: 'Kontakt', cta: 'Objednať' },
    en: { home: 'Home', pricing: 'Pricing', contact: 'Contact', cta: 'Book now' },
    de: { home: 'Startseite', pricing: 'Preise', contact: 'Kontakt', cta: 'Jetzt buchen' },
} as const;

export default function Nav({ locale }: { locale: Locale }) {
    const pathname = usePathname() || '/';
    const isActive = (path: string) => pathname === path || pathname === `${path}/`;
    const t = LABELS[locale] ?? LABELS.sk;

    // mobile
    const [open, setOpen] = useState(false);

    // закриваємо меню на зміну маршруту — БЕЗ порушення правила
    useEffect(() => {
        if (!open) return;
        const id = setTimeout(() => setOpen(false), 0); // відкладено → без каскадних ререндерів
        return () => clearTimeout(id);
    }, [pathname, open]);

    // блокуємо скрол сторінки, поки меню відкрите
    useEffect(() => {
        const root = document.documentElement;
        if (open) root.classList.add('overflow-hidden');
        else root.classList.remove('overflow-hidden');
        return () => root.classList.remove('overflow-hidden');
    }, [open]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/80">
            {/* Десктопна шапка (та сама сітка) */}
            <nav className="mx-auto grid h-32 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4">
                {/* Лого */}
                <div className="justify-self-start">
                    <Link href={`/${locale}`} className="flex items-center">
                        <Image
                            src="/leaflet/logo.png"
                            alt="CarTour"
                            width={320}
                            height={320}
                            priority
                            className="h-32 w-auto"
                        />
                    </Link>
                </div>

                {/* Центр — навігація (ховаємо на мобільному) */}
                <div className="hidden md:flex items-center gap-12 justify-self-center">
                    <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>{t.home}</NavLink>
                    <NavLink href={`/${locale}/cennik`} active={isActive(`/${locale}/cennik`)}>{t.pricing}</NavLink>
                    <NavLink href={`/${locale}/kontakt`} active={isActive(`/${locale}/kontakt`)}>{t.contact}</NavLink>
                </div>

                {/* Праворуч — CTA + мова (ховаємо на мобільному) */}
                <div className="hidden md:flex items-center gap-4 justify-self-end">
                    <Link
                        href={`/${locale}/kontakt`}
                        className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-rose-500"
                    >
                        {t.cta}
                    </Link>
                    <LocaleSwitcher locale={locale} />
                </div>

                {/* Бургер — лише мобільний */}
                <div className="md:hidden justify-self-end">
                    <button
                        type="button"
                        aria-label="Open menu"
                        onClick={() => setOpen(true)}
                        className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/5"
                    >
                        <span className="block h-0.5 w-5 bg-white"></span>
                        <span className="mt-1.5 block h-0.5 w-5 bg-white"></span>
                        <span className="mt-1.5 block h-0.5 w-5 bg-white"></span>
                    </button>
                </div>
            </nav>

            {/* Мобільне повноекранне меню */}
            <div className={`md:hidden fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                {/* фон */}
                <div
                    className={`absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setOpen(false)}
                />
                {/* контент */}
                <div className={`absolute inset-0 flex flex-col items-center gap-6 pt-6 transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-4'}`}>
                    {/* верх: лого + Х */}
                    <div className="flex w-full max-w-6xl items-center justify-between px-4">
                        <Image src="/leaflet/logo.png" alt="CarTour" width={240} height={60} className="h-10 w-auto" />
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close menu"
                            className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-current">
                                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {/* пункти */}
                    <ul className="mt-4 flex flex-col items-center gap-6 text-2xl font-semibold text-white">
                        <li><Link href={`/${locale}`} onClick={() => setOpen(false)} className="hover:text-rose-400">{t.home}</Link></li>
                        <li><Link href={`/${locale}/cennik`} onClick={() => setOpen(false)} className="hover:text-rose-400">{t.pricing}</Link></li>
                        <li><Link href={`/${locale}/kontakt`} onClick={() => setOpen(false)} className="hover:text-rose-400">{t.contact}</Link></li>
                    </ul>

                    {/* CTA */}
                    <Link
                        href={`/${locale}/kontakt`}
                        onClick={() => setOpen(false)}
                        className="mt-2 rounded-full bg-rose-600 px-6 py-3 text-white font-semibold shadow hover:bg-rose-500"
                    >
                        {t.cta}
                    </Link>

                    {/* перемикач мови */}
                    <div className="mt-4">
                        <LocaleSwitcher locale={locale} />
                    </div>
                </div>
            </div>
        </header>
    );
}
