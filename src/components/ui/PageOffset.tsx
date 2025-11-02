'use client';

import { usePathname } from 'next/navigation';

export default function PageOffset({
                                       height = 88,
                                       locale,
                                   }: {
    height?: number;
    locale: 'sk' | 'en' | 'de';
}) {
    const pathname = usePathname() || '/';
    const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
    return <div style={{ height: isHome ? 0 : height }} aria-hidden />;
}
