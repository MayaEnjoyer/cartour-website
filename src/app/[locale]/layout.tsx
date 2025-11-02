// src/app/[locale]/layout.tsx
import '../globals.css';
import UXProvider from '../../components/providers/UXProvider';
import AirportBackground from '../../components/ui/AirportBackground';
import Nav from '../../components/ui/Nav';
import PageOffset from '../../components/ui/PageOffset';

export default async function LocalizedLayout({
                                                  children,
                                                  params,
                                              }: {
    children: React.ReactNode;
    params: Promise<{ locale: 'sk' | 'en' | 'de' }>;
}) {
    const { locale } = await params;

    return (
        <UXProvider>
            <div className="relative">
                {/* легкий декоративний фон (діагональні штрихи) */}
                <AirportBackground />

                {/* прозорий/скляний хедер поверх контенту */}
                <Nav locale={locale} />

                {/* на головній відступ = 0; на інших сторінках = 88px */}
                <PageOffset locale={locale} height={88} />

                {children}
            </div>
        </UXProvider>
    );
}
