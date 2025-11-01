'use client';

import { motion } from 'framer-motion';
import ReservationForm from '../form/ReservationForm';
import MapBratislavaVienna from './MapBratislavaVienna';
import ContactCard from './ContactCard';
import SocialLinks from './SocialLinks';

type Props = { locale: string };

const dict = {
    sk: {
        title: 'Kontakt & Rezervácia',
        subtitle:
            'Rezervujte jazdu online alebo nás kontaktujte — odpovieme rýchlo.',
        formTitle: 'Rezervačný formulár',
    },
    en: {
        title: 'Contact & Reservation',
        subtitle:
            'Book a ride online or contact us — we’ll reply quickly.',
        formTitle: 'Reservation form',
    },
    de: {
        title: 'Kontakt & Reservierung',
        subtitle:
            'Buchen Sie online oder kontaktieren Sie uns — wir antworten schnell.',
        formTitle: 'Reservierungsformular',
    },
} as const;

export default function ContactClient({ locale }: Props) {
    const t = dict[(['sk', 'en', 'de'] as const).includes(locale as any) ? (locale as 'sk' | 'en' | 'de') : 'sk'];

    return (
        <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:pt-14">
            {/* Фонові «блоби» + дот-ґрід */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid">
                <div className="absolute -top-16 -left-10 h-56 w-56 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 blob" />
                <div className="absolute top-24 -right-12 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-400 to-sky-400 blob" />
            </div>

            {/* Заголовок */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          <span className="bg-gradient-to-r from-sky-600 via-fuchsia-600 to-emerald-600 bg-clip-text text-transparent">
            {t.title}
          </span>
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    {t.subtitle}
                </p>

                {/* Соц. кнопки з градієнтним кільцем */}
                <div className="mt-4">
                    <SocialLinks />
                </div>
            </motion.div>

            {/* Контентна сітка */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Ліва колонка — форма в склі з градієнтною рамкою */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="gradient-ring glow"
                >
                    <div className="glass rounded-2xl p-5 sm:p-6">
                        <h2 className="mb-4 text-lg font-semibold tracking-tight">
                            {t.formTitle}
                        </h2>

                        {/* існуюча твоя форма — без змін */}
                        <ReservationForm locale={locale} />
                    </div>
                </motion.div>

                {/* Права колонка — карта + контактна картка */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="gradient-ring glow"
                    >
                        <div className="glass rounded-2xl p-2">
                            <MapBratislavaVienna />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="gradient-ring glow"
                    >
                        <div className="glass rounded-2xl p-5">
                            <ContactCard locale={locale} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
