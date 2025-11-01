import Hero from '../../components/home/Hero';
import Features from '../../components/home/Features';
import About from '../../components/home/About';
import HowItWorks from '../../components/home/HowItWorks';
import FAQ from '../../components/home/FAQ';
import SeoJsonLd from '../../components/SeoJsonLd';

export default async function LocalizedHome({
                                                params,
                                            }: {
    params: Promise<{ locale: 'sk' | 'en' | 'de' }>;
}) {
    const { locale } = await params;

    return (
        <>
            {/* JSON-LD для TaxiService / пошуковиків */}
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
