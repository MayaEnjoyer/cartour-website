'use client';

import dynamic from 'next/dynamic';
import ReservationForm from '../../../components/form/ReservationForm';
import SocialLinks from '../../../components/contact/SocialLinks';

// динамічно підвантажуємо мапу лише на клієнті
const MapBratislavaVienna = dynamic(
    () => import('../../../components/contact/MapBratislavaVienna'),
    { ssr: false }
);

export default function ContactClient({ locale }: { locale: string }) {
    return (
        <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <header className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    Kontakt &amp; Rezervácia
                </h1>
                <p className="mt-2 text-gray-600">
                    Rezervujte jazdu online alebo nás kontaktujte — odpovieme rýchlo.
                </p>

                <div className="mt-4">
                    <SocialLinks />
                </div>
            </header>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                {/* Форма, як на driveme.sk */}
                <section className="lg:pr-6">
                    <div className="rounded-2xl border p-4 sm:p-6">
                        <ReservationForm locale={locale} />
                    </div>
                </section>

                {/* Мапа + короткі контакти */}
                <aside className="space-y-6 lg:pl-6">
                    <MapBratislavaVienna />

                    <div className="rounded-2xl border p-4 sm:p-6">
                        <h2 className="text-lg font-semibold tracking-tight">Cartour</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Bratislava, SK &nbsp;—&nbsp; Wien (Schwechat), AT
                        </p>

                        <div className="mt-4 space-y-2 text-sm">
                            <p>
                                Tel:{' '}
                                <a className="font-medium underline" href="tel:+421908699151">
                                    +421&nbsp;908&nbsp;699&nbsp;151
                                </a>
                            </p>
                            <p className="text-gray-500">
                                Online rezervácia dostupná 24/7. Lety sledujeme automaticky.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}
