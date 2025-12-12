'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';

type FooterLocale = 'sk' | 'en' | 'de';
type InfoKey = 'about' | 'faq' | 'pricing' | 'contact' | 'vehicles';

type FooterDict = {
    blurbTitle: string;
    blurbBody: string;
    servicesTitle: string;
    services: string[];
    infoTitle: string;
    infoLinks: { key: InfoKey; label: string }[];
    contactTitle: string;
    contact: {
        locationLabel: string;
        location: string;
        phoneLabel: string;
        phoneDisplay: string;
        phoneHref: string;
        emailLabel: string;
        email: string;
        hoursLabel: string;
        hours: string;
    };
};

const FOOTER: Record<FooterLocale, FooterDict> = {
    sk: {
        blurbTitle: 'CarTour Bratislava',
        blurbBody:
            'Sme spoľahlivá a komfortná prepravná služba v rámci Bratislavy, celého Slovenska, na letiská aj do zahraničia. Ponúkame profesionálne transfery vozidlami Mercedes-Benz pre individuálnych klientov aj firemné služby, s maximálnym dôrazom na pohodlie, bezpečnosť a presnosť. Vďaka nám cestujete vždy komfortne a úplne bez stresu.',
        servicesTitle: 'Naše služby',
        services: [
            'Letiskové transfery',
            'Firemná preprava',
            'Osobná preprava na mieru',
            'Transfery na podujatia',
            'Medzinárodná preprava',
            'Hotelové transfery',
        ],
        infoTitle: 'Informácie',
        infoLinks: [
            { key: 'about', label: 'O nás' },
            { key: 'faq', label: 'FAQ – Najčastejšie otázky' },
            { key: 'pricing', label: 'Cenník' },
            { key: 'contact', label: 'Kontakt' },
            { key: 'vehicles', label: 'Naše vozidlá' },
        ],
        contactTitle: 'Kontakt',
        contact: {
            locationLabel: 'Lokalita',
            location: 'Lomonosovova 2, 811 09 Bratislava',
            phoneLabel: 'Telefón',
            phoneDisplay: '+421 908 699 151',
            phoneHref: 'tel:+421908699151',
            emailLabel: 'E-mail',
            email: 'info@cartour.sk',
            hoursLabel: 'Prevádzka',
            hours: 'NONSTOP',
        },
    },
    en: {
        blurbTitle: 'CarTour Bratislava',
        blurbBody:
            'We provide reliable and comfortable transportation in Bratislava, across Slovakia, to airports and abroad. We offer professional Mercedes-Benz transfers for individual clients and corporate partners, with maximum focus on comfort, safety and punctuality. With us, you always travel stress-free.',
        servicesTitle: 'Our services',
        services: [
            'Airport transfers',
            'Corporate transportation',
            'Personal transfers',
            'Event transportation',
            'International transfers',
            'Hotel transfers',
        ],
        infoTitle: 'Information',
        infoLinks: [
            { key: 'about', label: 'About us' },
            { key: 'faq', label: 'FAQ – Frequently asked questions' },
            { key: 'pricing', label: 'Pricing' },
            { key: 'contact', label: 'Contact' },
            { key: 'vehicles', label: 'Our vehicles' },
        ],
        contactTitle: 'Contact',
        contact: {
            locationLabel: 'Location',
            location: 'Lomonosovova 2, 811 09 Bratislava, Slovakia',
            phoneLabel: 'Phone',
            phoneDisplay: '+421 908 699 151',
            phoneHref: 'tel:+421908699151',
            emailLabel: 'E-mail',
            email: 'info@cartour.sk',
            hoursLabel: 'Service hours',
            hours: 'NONSTOP',
        },
    },
    de: {
        blurbTitle: 'CarTour Bratislava',
        blurbBody:
            'Wir bieten eine zuverlässige und komfortable Personenbeförderung in Bratislava, in der ganzen Slowakei, zu Flughäfen und ins Ausland. Unsere Mercedes-Benz Transfers sind sowohl für Privatkunden als auch für Firmenkunden – mit höchster Priorität auf Komfort, Sicherheit und Pünktlichkeit. Mit uns reisen Sie immer entspannt und ohne Stress.',
        servicesTitle: 'Unsere Dienstleistungen',
        services: [
            'Flughafentransfers',
            'Firmentransporte',
            'Individuelle Privatfahrten',
            'Transfers zu Veranstaltungen',
            'Internationale Fahrten',
            'Hoteltransfers',
        ],
        infoTitle: 'Informationen',
        infoLinks: [
            { key: 'about', label: 'Über uns' },
            { key: 'faq', label: 'FAQ – Häufige Fragen' },
            { key: 'pricing', label: 'Preise' },
            { key: 'contact', label: 'Kontakt' },
            { key: 'vehicles', label: 'Unsere Fahrzeuge' },
        ],
        contactTitle: 'Kontakt',
        contact: {
            locationLabel: 'Standort',
            location: 'Lomonosovova 2, 811 09 Bratislava, Slowakei',
            phoneLabel: 'Telefon',
            phoneDisplay: '+421 908 699 151',
            phoneHref: 'tel:+421908699151',
            emailLabel: 'E-Mail',
            email: 'info@cartour.sk',
            hoursLabel: 'Betrieb',
            hours: 'Rund um die Uhr',
        },
    },
};

function buildHref(locale: FooterLocale, key: InfoKey): string {
    const base = `/${locale}`;
    switch (key) {
        case 'about':
            return `${base}#about-text`;
        case 'vehicles':
            return `${base}#vehicles-section`;
        case 'faq':
            return `${base}#faq-section`;
        case 'pricing':
            return `${base}/cennik`;
        case 'contact':
            return `${base}/kontakt`;
        default:
            return base;
    }
}

export default function SiteFooter({ locale }: { locale: FooterLocale }) {
    const t = FOOTER[locale] ?? FOOTER.sk;
    const pathname = usePathname() || `/${locale}`;
    const homePath = `/${locale}`;

    const handleInfoClick =
        (key: InfoKey) =>
            (e: MouseEvent<HTMLAnchorElement>) => {
                const onHome =
                    pathname === homePath || pathname === `${homePath}/`;

                if (!onHome) return;

                let targetId: string | null = null;
                if (key === 'about') targetId = 'about-text';
                else if (key === 'faq') targetId = 'faq-section';
                else if (key === 'vehicles') targetId = 'vehicles-section';

                if (!targetId) return;

                const el = document.getElementById(targetId);
                if (!el) return;

                e.preventDefault();

                const block: ScrollLogicalPosition =
                    key === 'about' || key === 'vehicles' ? 'center' : 'start';

                el.scrollIntoView({
                    behavior: 'smooth',
                    block,
                    inline: 'nearest',
                });

                if (typeof window !== 'undefined') {
                    const url = new URL(window.location.href);
                    url.hash = `#${targetId}`;
                    window.history.replaceState(null, '', url.toString());
                }
            };

    return (
        <footer className="mt-16 border-t border-slate-200 bg-slate-100/80">
            {/* основной контент футера */}
            <div className="mx-auto max-w-screen-2xl px-4 py-10 md:py-14">
                <div className="grid gap-10 lg:gap-14 md:grid-cols-2 lg:grid-cols-4">
                    <section className="space-y-4 lg:col-span-1 md:col-span-2">
                        <h2 className="text-sm font-semibold tracking-[0.25em] uppercase text-rose-600">
                            {t.blurbTitle}
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-700">
                            {t.blurbBody}
                        </p>
                    </section>

                    <section>
                        <h3 className="mb-3 text-sm font-semibold text-slate-900">
                            {t.servicesTitle}
                        </h3>
                        <ul className="space-y-1.5 text-sm text-slate-700">
                            {t.services.map((s) => (
                                <li key={s} className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-3 text-sm font-semibold text-slate-900">
                            {t.infoTitle}
                        </h3>
                        <ul className="space-y-1.5 text-sm text-slate-700">
                            {t.infoLinks.map((link) => {
                                const href = buildHref(locale, link.key);
                                return (
                                    <li key={link.key}>
                                        <Link
                                            href={href}
                                            className="hover:text-rose-600 transition-colors"
                                            onClick={handleInfoClick(link.key)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-3 text-sm font-semibold text-slate-900">
                            {t.contactTitle}
                        </h3>
                        <dl className="space-y-3 text-sm text-slate-700">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white shadow-sm">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 2a7 7 0 00-7 7c0 4.62 5.4 10.38 6.3 11.3a1 1 0 001.4 0C13.6 19.38 19 13.62 19 9a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <dt className="font-medium text-slate-900">
                                        {t.contact.locationLabel}
                                    </dt>
                                    <dd>{t.contact.location}</dd>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white shadow-sm">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M6.62 10.79a15 15 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11 11 0 003.57.57 1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1 11 11 0 00.57 3.57 1 1 0 01-.24 1.02z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <dt className="font-medium text-slate-900">
                                        {t.contact.phoneLabel}
                                    </dt>
                                    <dd>
                                        <a
                                            href={t.contact.phoneHref}
                                            className="hover:text-rose-600 transition-colors"
                                        >
                                            {t.contact.phoneDisplay}
                                        </a>
                                    </dd>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white shadow-sm">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M4 4h16a2 2 0 012 2v1.2l-10 5.6-10-5.6V6a2 2 0 012-2zm-2 7.09V18a2 2 0 002 2h16a2 2 0 002-2v-6.91l-9.35 5.24a2 2 0 01-1.96 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <dt className="font-medium text-slate-900">
                                        {t.contact.emailLabel}
                                    </dt>
                                    <dd>
                                        <a
                                            href={`mailto:${t.contact.email}`}
                                            className="hover:text-rose-600 transition-colors"
                                        >
                                            {t.contact.email}
                                        </a>
                                    </dd>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white shadow-sm">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 2a9 9 0 109 9 9 9 0 00-9-9zm0 2a7 7 0 11-7 7 7 7 0 017-7zm-.5 3a1 1 0 00-1 1v3.38a1 1 0 00.3.71l2.5 2.5a1 1 0 001.4-1.42L13 10.59V8a1 1 0 00-1-1z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <dt className="font-medium text-slate-900">
                                        {t.contact.hoursLabel}
                                    </dt>
                                    <dd>{t.contact.hours}</dd>
                                </div>
                            </div>
                        </dl>
                    </section>
                </div>
            </div>

            {/* нижняя подпись по центру на всех страницах */}
            <div className="border-t border-slate-200/80">
                <div className="mx-auto max-w-screen-2xl px-4 py-4">
                    <p className="text-center text-xs sm:text-sm text-slate-500">
                        © 2025 Cartour | Všetky práva vyhradené.
                    </p>
                </div>
            </div>
        </footer>
    );
}
