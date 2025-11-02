import { use } from 'react';

import Hero from '../../components/home/Hero';
import Features from '../../components/home/Features';
import About from '../../components/home/About';
import HowItWorks from '../../components/home/HowItWorks';
import FAQ from '../../components/home/FAQ';
import SeoJsonLd from '../../components/SeoJsonLd';

import { normalizeLocale, Locale } from '../../lib/i18n';

export default function LocalizedHome({
                                          params,
                                      }: {
    // ВАЖЛИВО: string
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = use(params);
    const locale: Locale = normalizeLocale(raw);

    return (
        <>
            <SeoJsonLd locale={locale} />
            <main>
                <Hero locale={locale} />
                <Features locale={locale} />
                <About locale={locale} />
                <HowItWorks locale={locale} />
                <FAQ locale={locale} />
            </main>
        </>
    );
}
