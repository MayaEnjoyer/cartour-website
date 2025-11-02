// src/app/[locale]/layout.tsx
import '../globals.css';
import Nav from '../../components/Nav';
import UXProvider from '../../components/providers/UXProvider';
import AirportBackground from '../../components/ui/AirportBackground';

export default async function LocalizedLayout({
                                                  children, params,
                                              }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <UXProvider>
            <div className="relative">
                <AirportBackground />
                <Nav locale={locale} />
                {children}
            </div>
        </UXProvider>
    );
}
