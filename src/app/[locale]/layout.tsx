import '../globals.css';
import { ReactNode, use } from 'react';

import UXProvider from '../../components/providers/UXProvider';
import AirportBackground from '../../components/ui/AirportBackground';
import Nav from '../../components/ui/Nav';
import PageOffset from '../../components/ui/PageOffset';

import { normalizeLocale, Locale } from '../../lib/i18n';

export default function LocalizedLayout({
                                            children,
                                            params,
                                        }: {
    children: ReactNode;
    // ВАЖЛИВО: тут саме string (вимагає Next validator)
    params: Promise<{ locale: string }>;
}) {
    // Layout не може бути async → розпаковуємо так
    const { locale: rawLocale } = use(params);
    const locale: Locale = normalizeLocale(rawLocale);

    return (
        <UXProvider>
            <div className="relative">
                <AirportBackground />
                <Nav locale={locale} />
                <PageOffset height={88} locale={locale} />
                {children}
            </div>
        </UXProvider>
    );
}
