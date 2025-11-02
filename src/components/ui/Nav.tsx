'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
                // червоне підкреслення (анімація)
                'after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-rose-600',
                active ? 'after:w-full' : 'after:w-0 group-hover:after:w-full',
                'after:transition-[width] after:duration-300 after:ease-out',
            ].join(' ')}
        >
            {children}
        </Link>
    );
}

export default function Nav({ locale }: { locale: Locale }) {
    const pathname = usePathname() || '/';
    const isActive = (path: string) => pathname === path || pathname === `${path}/`;

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/80">
            {/* 3 колонки — центр завжди по центру */}
            <nav className="mx-auto grid h-32 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4">
                {/* Лого зліва — більше */}
                <div className="justify-self-start">
                    <Link href={`/${locale}`} className="flex items-center">
                        <Image
                            src="/leaflet/logo.png"
                            alt="CarTour"
                            width={320}
                            height={320}
                            priority
                            className="h-32 w-auto" /* ~128px заввишки */
                        />
                    </Link>
                </div>

                {/* Центр — навігація з червоним підкресленням */}
                <div className="flex items-center gap-12 justify-self-center">
                    <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>
                        Home
                    </NavLink>
                    <NavLink href={`/${locale}/cennik`} active={isActive(`/${locale}/cennik`)}>
                        Pricing
                    </NavLink>
                    <NavLink href={`/${locale}/kontakt`} active={isActive(`/${locale}/kontakt`)}>
                        Contact
                    </NavLink>
                </div>

                {/* Праворуч — CTA + перемикач мови (бірюзова гама) */}
                <div className="flex items-center gap-4 justify-self-end">
                    <Link
                        href={`/${locale}/kontakt`}
                        className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-rose-500"
                    >
                        Book now
                    </Link>
                    <LocaleSwitcher locale={locale} />
                </div>
            </nav>
        </header>
    );
}
