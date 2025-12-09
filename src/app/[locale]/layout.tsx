import '../globals.css';
import { ReactNode, use } from 'react';

import UXProvider from '../../components/providers/UXProvider';
import AirportBackground from '../../components/ui/AirportBackground';
import Nav from '../../components/ui/Nav';
import PageOffset from '../../components/ui/PageOffset';
import SiteFooter from '../../components/ui/SiteFooter';

import CookieBanner from '../../components/cookies/CookieBanner'; // ← добавили

import { normalizeLocale, Locale } from '@/lib/i18n';

export default function LocalizedLayout({
                                            children,
                                            params,
                                        }: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = use(params);
    const locale: Locale = normalizeLocale(rawLocale);

    return (
        <UXProvider>
            <div className="relative min-h-screen flex flex-col">
                <AirportBackground />
                <Nav locale={locale} />
                <PageOffset height={88} locale={locale} />

                <div className="flex-1">{children}</div>

                <SiteFooter locale={locale} />
            </div>

            {/* баннер куки поверх всего */}
            <CookieBanner locale={locale} />
        </UXProvider>
    );
}
