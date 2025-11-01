'use client';

import Reveal from '../ui/Reveal';
import MapBratislavaVienna from './MapBratislavaVienna';
import ReservationForm from '../form/ReservationForm';

export default function ContactClient({ locale }: { locale: string }) {
    return (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <Reveal>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    Kontakt & Rezervácia
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Rezervujte jazdu online alebo nás kontaktujte — odpovieme rýchlo.
                </p>
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
                                Tel:&nbsp;
                                <a href="tel:+421908699151" className="text-sky-600 hover:underline">
                                    +421 908 699 151
                                </a>
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Online rezervácia dostupná 24/7. Lety sledujeme automaticky.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
