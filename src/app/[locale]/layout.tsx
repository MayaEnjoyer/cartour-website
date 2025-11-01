import type { Metadata } from 'next';
import '../globals.css';
import Nav from '../../components/Nav';

type L = 'sk' | 'en' | 'de';
const isL = (x: string): x is L => (['sk', 'en', 'de'] as const).includes(x as L);

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.cartour.sk';

const titles: Record<L, string> = {
    sk: 'CarTour – Pohodlné transféry na letisko (Bratislava ↔ Schwechat)',
    en: 'CarTour – Comfortable airport transfers (Bratislava ↔ Schwechat)',
    de: 'CarTour – Bequeme Flughafentransfers (Bratislava ↔ Schwechat)',
};

const desc: Record<L, string> = {
    sk: 'Spoľahlivá preprava vozidlami Mercedes-Benz. Letiskové a firemné transfery 24/7, sledovanie letov, skúsení vodiči.',
    en: 'Reliable Mercedes-Benz transfers. Airport & corporate rides 24/7, flight tracking, experienced drivers.',
    de: 'Zuverlässige Transfers mit Mercedes-Benz. Flughafen- & Firmenfahrten 24/7, Flugverfolgung, erfahrene Fahrer.',
};

// ⬇️ ТУТ головна зміна: приймаємо Promise і робимо await
export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;                 // ← розгортаємо Promise
    const l = isL(locale) ? locale : 'sk';
    const base = `${SITE}/${l}`;

    return {
        title: titles[l],
        description: desc[l],
        metadataBase: new URL(SITE),
        alternates: {
            canonical: base,
            languages: {
                sk: `${SITE}/sk`,
                en: `${SITE}/en`,
                de: `${SITE}/de`,
            },
        },
        openGraph: {
            type: 'website',
            url: base,
            siteName: 'CarTour',
            title: titles[l],
            description: desc[l],
            locale: l,
        },
        twitter: {
            card: 'summary_large_image',
            title: titles[l],
            description: desc[l],
        },
    };
}

export default async function LocalizedLayout({
                                                  children,
                                                  params,
                                              }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return (
        <>
            <Nav locale={locale} />
            {children}
        </>
    );
}
