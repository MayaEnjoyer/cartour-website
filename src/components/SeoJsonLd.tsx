'use client';
import Script from 'next/script';

export default function SeoJsonLd({ locale }: { locale: 'sk' | 'en' | 'de' }) {
    const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.cartour.sk';
    const url = `${SITE}/${locale}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        name: 'CarTour',
        url,
        areaServed: ['Bratislava', 'Vienna Airport (Schwechat)'],
        serviceArea: { '@type': 'Place', name: 'Bratislava & Vienna Airport' },
        telephone: '+421 908 699 151',
        offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: '60',
            description: 'Bratislava (centrum) ↔ Letisko Viedeň – Schwechat',
        },
    };

    return (
        <Script
            id="ld-json-taxi"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
