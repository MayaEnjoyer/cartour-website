'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, MouseEvent } from 'react';
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

function ScrollButton({
                          onClick,
                          children,
                          active,
                      }: {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    active?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                'inline-flex items-center leading-none',
                'relative group text-white transition hover:opacity-90',
                'after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-rose-600',
                active ? 'after:w-full' : 'after:w-0 group-hover:after:w-full',
                'after:transition-[width] after:duration-300',
            ].join(' ')}
        >
            {children}
        </button>
    );
}

const LABELS: Record<
    Locale,
    { home: string; about: string; pricing: string; contact: string; cta: string }
> = {
    sk: {
        home: 'Domov',
        about: 'O nás',
        pricing: 'Cenník',
        contact: 'Kontakt',
        cta: 'Objednať',
    },
    en: {
        home: 'Home',
        about: 'About',
        pricing: 'Pricing',
        contact: 'Contact',
        cta: 'Book now',
    },
    de: {
        home: 'Startseite',
        about: 'Über uns',
        pricing: 'Preise',
        contact: 'Kontakt',
        cta: 'Jetzt buchen',
    },
} as const;

export default function Nav({ locale }: { locale: Locale }) {
    const pathname = usePathname() || '/';
    const router = useRouter();

    const isActive = (p: string) => pathname === p || pathname === `${p}/`;
    const t = LABELS[locale] ?? LABELS.sk;

    const [open, setOpen] = useState(false);
    const [aboutActive, setAboutActive] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (open) {
            root.classList.add('overflow-hidden');
        } else {
            root.classList.remove('overflow-hidden');
        }
        return () => root.classList.remove('overflow-hidden');
    }, [open]);

    useEffect(() => {
        if (open) queueMicrotask(() => setOpen(false));
    }, [pathname]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        const homePath = `/${locale}`;
        if (pathname !== homePath && pathname !== `${homePath}/` && aboutActive) {
            const id = setTimeout(() => setAboutActive(false), 0);
            return () => clearTimeout(id);
        }
    }, [pathname, locale, aboutActive]);

    const scrollToAbout = () => {
        const el = document.getElementById('about-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleAboutClick = (e?: MouseEvent<HTMLButtonElement>) => {
        if (e) e.preventDefault();

        const homePath = `/${locale}`;

        if (pathname === homePath || pathname === `${homePath}/`) {
            scrollToAbout();
            setAboutActive(true);
            return;
        }

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('scrollToAbout', '1');
        }
        router.push(homePath);
    };

    useEffect(() => {
        const homePath = `/${locale}`;
        if (
            (pathname === homePath || pathname === `${homePath}/`) &&
            typeof window !== 'undefined'
        ) {
            const flag = sessionStorage.getItem('scrollToAbout');
            if (flag === '1') {
                sessionStorage.removeItem('scrollToAbout');
                setTimeout(() => {
                    scrollToAbout();
                    setAboutActive(true);
                }, 80);
            }
        }
    }, [pathname, locale]);

    return (
        <header className="fixed inset-x-0 top-0 z-[100]">
            <nav
                className="bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60"
                aria-label="Primary"
            >
                <div
                    className="
            mx-auto w-full max-w-7xl
            h-20 md:h-28
            px-4 md:px-6
            grid grid-cols-[auto_1fr_auto]
            place-items-center
          "
                >
                    <Link
                        href={`/${locale}`}
                        className="justify-self-start h-full flex items-center"
                    >
                        <Image
                            src="/leaflet/logo.png"
                            alt="CarTour"
                            width={720}
                            height={144}
                            priority
                            sizes="(max-width:768px) 260px, 720px"
                            className="h-16 sm:h-20 md:h-36 w-auto"
                        />
                    </Link>

                    <div className="hidden md:flex h-full items-center justify-center gap-12">
                        <NavLink
                            href={`/${locale}`}
                            active={isActive(`/${locale}`) && !aboutActive}
                            onClick={() => setAboutActive(false)}
                        >
                            {t.home}
                        </NavLink>

                        <ScrollButton onClick={handleAboutClick} active={aboutActive}>
                            {t.about}
                        </ScrollButton>

                        <NavLink
                            href={`/${locale}/cennik`}
                            active={isActive(`/${locale}/cennik`)}
                            onClick={() => setAboutActive(false)}
                        >
                            {t.pricing}
                        </NavLink>
                        <NavLink
                            href={`/${locale}/kontakt`}
                            active={isActive(`/${locale}/kontakt`)}
                            onClick={() => setAboutActive(false)}
                        >
                            {t.contact}
                        </NavLink>
                    </div>

                    <div className="hidden md:flex h-full items-center justify-end gap-3 justify-self-end">
                        <Link
                            href={`/${locale}/kontakt`}
                            onClick={() => setAboutActive(false)}
                            className="inline-flex items-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-rose-500"
                        >
                            {t.cta}
                        </Link>
                        <LocaleSwitcher locale={locale} />
                    </div>

                    <div className="md:hidden justify-self-end flex items-center gap-2">
                        <div className="-mr-1 scale-90">
                            <LocaleSwitcher locale={locale} />
                        </div>
                        <button
                            type="button"
                            aria-label="Open menu"
                            aria-controls="mobile-menu"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="
                inline-flex items-center justify-center
                w-11 h-11 rounded-xl
                bg-white/10 ring-1 ring-white/15
                hover:bg-white/15 active:scale-[.98]
                transition
              "
                        >
                            <span className="sr-only">Menu</span>
                            <div className="space-y-1.5">
                <span
                    className={`block h-0.5 w-6 bg-white transition-transform ${
                        open ? 'translate-y-2 rotate-45' : ''
                    }`}
                />
                                <span
                                    className={`block h-0.5 w-6 bg-white transition-opacity ${
                                        open ? 'opacity-0' : 'opacity-100'
                                    }`}
                                />
                                <span
                                    className={`block h-0.5 w-6 bg-white transition-transform ${
                                        open ? '-translate-y-2 -rotate-45' : ''
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            <div
                id="mobile-menu"
                className={`md:hidden fixed inset-0 z-[140] transition-opacity duration-300 ${
                    open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div className="absolute inset-0 bg-black/90" />

                <div className="absolute inset-0 flex flex-col">
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
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M6 6l12 12M18 6L6 18"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center gap-7 px-6 text-center text-white">
                        <Link
                            href={`/${locale}`}
                            onClick={() => {
                                setOpen(false);
                                setAboutActive(false);
                            }}
                            className="text-2xl font-semibold"
                        >
                            {t.home}
                        </Link>

                        <button
                            type="button"
                            onClick={() => {
                                setOpen(false);
                                handleAboutClick();
                            }}
                            className="text-2xl font-semibold"
                        >
                            {t.about}
                        </button>

                        <Link
                            href={`/${locale}/cennik`}
                            onClick={() => {
                                setOpen(false);
                                setAboutActive(false);
                            }}
                            className="text-2xl font-semibold"
                        >
                            {t.pricing}
                        </Link>
                        <Link
                            href={`/${locale}/kontakt`}
                            onClick={() => {
                                setOpen(false);
                                setAboutActive(false);
                            }}
                            className="text-2xl font-semibold"
                        >
                            {t.contact}
                        </Link>

                        <Link
                            href={`/${locale}/kontakt`}
                            onClick={() => {
                                setOpen(false);
                                setAboutActive(false);
                            }}
                            className="mt-1 rounded-full bg-rose-600 px-7 py-3 text-lg font-semibold hover:bg-rose-500"
                        >
                            {t.cta}
                        </Link>
                    </div>

                    <div className="pb-8 flex items-center justify-center gap-4">
                        <a
                            href="https://www.facebook.com/cartour.sk/"
                            aria-label="Facebook"
                            className="inline-flex w-10 h-10 rounded-full bg-rose-600 items-center justify-center hover:bg-rose-500"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M13.5 9H16V6h-2.5C11.6 6 11 7.2 11 8.7V10H9v3h2v5h3v-5h2.1l.4-3H14v-1c0-.6.2-1 1.5-1Z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/cartour.sk/"
                            aria-label="Instagram"
                            className="inline-flex w-10 h-10 rounded-full bg-rose-600 items-center justify-center hover:bg-rose-500"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM17.5 6A1.5 1.5 0 1119 7.5 1.5 1.5 0 0117.5 6z" />
                            </svg>
                        </a>
                        <a
                            href="tel:+421908699151"
                            aria-label="Call"
                            className="inline-flex w-10 h-10 rounded-full bg-rose-600 items-center justify-center hover:bg-rose-500"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
