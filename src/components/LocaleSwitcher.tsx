import Link from 'next/link';

export default function LocaleSwitcher({ locale }: { locale: string }) {
    const locales = ['sk', 'en', 'de'];
    return (
        <div className="flex gap-3">
            {locales.map((l) => (
                <Link
                    key={l}
                    href={`/${l}`}
                    aria-current={l === locale ? 'page' : undefined}
                    className={l === locale ? 'underline' : ''}
                >
                    {l.toUpperCase()}
                </Link>
            ))}
        </div>
    );
}
