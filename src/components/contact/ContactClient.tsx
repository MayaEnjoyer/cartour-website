'use client';

import Reveal from '../ui/Reveal';
import MapBratislavaVienna from './MapBratislavaVienna';
import ReservationForm from '../form/ReservationForm';

type L = 'sk' | 'en' | 'de';
const isL = (x: string): x is L => (['sk', 'en', 'de'] as const).includes(x as L);

const dict: Record<
    L,
    {
        title: string;
        subtitle: string;
        telLabel: string;
        contactNote: string;
    }
> = {
    sk: {
        title: 'Rezervačný formulár',
        subtitle: 'Rezervujte si jazdu online, alebo nás kontaktujte telefonicky.',
        telLabel: 'Tel:',
        contactNote:
            'Online rezervácia dostupná 24/7. Lety sledujeme automaticky.',
    },
    en: {
        title: 'Reservation form',
        subtitle: 'Book a ride online or contact us by phone.',
        telLabel: 'Tel:',
        contactNote:
            'Online reservations available 24/7. We track your flights automatically.',
    },
    de: {
        title: 'Reservierungsformular',
        subtitle:
            'Buchen Sie eine Fahrt online oder kontaktieren Sie uns telefonisch.',
        telLabel: 'Tel.:',
        contactNote:
            'Online-Reservierungen 24/7 verfügbar. Wir verfolgen Ihre Flüge automatisch.',
    },
};

export default function ContactClient({ locale }: { locale: string }) {
    const lang: L = isL(locale) ? locale : 'sk';
    const t = dict[lang];

    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <Reveal>
                {/* Обёртка, чтобы на мобиле всё было по центру, а на десктопе слева */}
                <div className="text-center sm:text-left">
                    {/* Подчёркивание ТОЛЬКО на телефоне: border-b, а на sm и выше убираем */}
                    <h1 className="inline-block text-2xl sm:text-3xl font-semibold tracking-tight pb-1 border-b border-slate-300 sm:border-b-0">
                        {t.title}
                    </h1>

                    {/* Текст по центру на телефоне, слева на больших, плюс мягкая ширина */}
                    <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto sm:mx-0">
                        {t.subtitle}
                    </p>
                </div>
            </Reveal>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <Reveal delay={0.05}>
                    <div className="rounded-2xl border bg-white/70 backdrop-blur-xl shadow-sm p-6 dark:bg-white/5">
                        <ReservationForm locale={locale} />
                    </div>
                </Reveal>

                <div className="space-y-6">
                    <Reveal delay={0.1}>
                        <div className="rounded-2xl border bg-white/70 backdrop-blur-xl shadow-sm p-2 dark:bg-white/5">
                            <MapBratislavaVienna />
                        </div>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div className="rounded-2xl border bg-white/70 backdrop-blur-xl shadow-sm p-6 dark:bg-white/5">
                            <h3 className="font-semibold">Cartour</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Bratislava, SK — Wien (Schwechat), AT
                            </p>
                            <p className="text-sm mt-3">
                                {t.telLabel}&nbsp;
                                <a
                                    href="tel:+421908699151"
                                    className="text-sky-600 hover:underline"
                                >
                                    +421 908 699 151
                                </a>
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                {t.contactNote}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}


