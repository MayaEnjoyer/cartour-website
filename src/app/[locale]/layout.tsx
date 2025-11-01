import '../globals.css';
import Nav from '../../components/Nav';
import UXProvider from '../../components/providers/UXProvider';
import OrbBackground from '../../components/ui/OrbBackground';

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
            <UXProvider>
                <div className="relative">
                    <OrbBackground />
                    <Nav locale={locale} />
                    {children}
                </div>
            </UXProvider>
        </>
    );
}
