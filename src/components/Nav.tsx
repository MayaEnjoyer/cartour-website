import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';

export default function Nav({ locale }: { locale: string }) {
    const t =
        {
            sk: { home: 'Domov', pricing: 'Cenník', contact: 'Kontakt', cta: 'Objednať' },
            en: { home: 'Home', pricing: 'Pricing', contact: 'Contact', cta: 'Book now' },
            de: { home: 'Startseite', pricing: 'Preise', contact: 'Kontakt', cta: 'Jetzt buchen' }
        }[locale] ?? { home: 'Domov', pricing: 'Cenník', contact: 'Kontakt', cta: 'Objednať' };

    return (
        <header className="p-4 border-b">
            <nav className="flex items-center gap-6">
                <Link href={`/${locale}`}>{t.home}</Link>
                <Link href={`/${locale}/cennik`}>{t.pricing}</Link>
                <Link href={`/${locale}/kontakt`}>{t.contact}</Link>

                <Link href={`/${locale}/kontakt`} className="ml-auto px-3 py-1 rounded border">
                    {t.cta}
                </Link>

                <LocaleSwitcher locale={locale} />
            </nav>
        </header>
    );
}
