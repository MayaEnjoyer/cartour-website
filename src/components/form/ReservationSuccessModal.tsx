'use client';

import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    locale: string;
    open: boolean;
    // чтобы линтер Next не орал на имя onClose
    onCloseAction: () => void;
};

const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ReservationSuccessModal({
                                                    locale,
                                                    open,
                                                    onCloseAction,
                                                }: Props) {
    // На сервере документа нет, поэтому просто ничего не рендерим
    if (typeof document === 'undefined') return null;

    const title =
        locale === 'sk'
            ? 'Rezervácia odoslaná'
            : locale === 'de'
                ? 'Reservierung gesendet'
                : 'Reservation sent';

    const text =
        locale === 'sk'
            ? 'Blahoželáme! Vaša rezervácia bola odoslaná na spracovanie. Ozveme sa vám čo najskôr.'
            : locale === 'de'
                ? 'Glückwunsch! Ihre Reservierung wurde zur Bearbeitung gesendet. Wir melden uns so schnell wie möglich.'
                : 'Congratulations! Your reservation has been sent for processing. We will get back to you as soon as possible.';

    const backLabel =
        locale === 'sk'
            ? 'Späť na hlavnú stránku'
            : locale === 'de'
                ? 'Zur Startseite'
                : 'Back to home';

    const stayLabel =
        locale === 'sk'
            ? 'Zostať na tejto stránke'
            : locale === 'de'
                ? 'Auf dieser Seite bleiben'
                : 'Stay on this page';

    const homeHref = `/${locale}`;

    // ВАЖНО: всё, что ниже, рендерится в document.body → НЕ ограничено ни формой, ни section, ни Reveal
    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: SOFT_EASE }}
                >
                    {/* фон на ВЕСЬ экран с блюром */}
                    <button
                        type="button"
                        aria-hidden="true"
                        onClick={onCloseAction}
                        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm cursor-default"
                    />

                    {/* сама карточка по центру */}
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: SOFT_EASE }}
                        className="relative w-full max-w-xl rounded-3xl bg-slate-900/95 text-slate-50 shadow-2xl shadow-slate-950/80 ring-1 ring-emerald-400/40 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                    >
                        {/* крестик */}
                        <button
                            type="button"
                            onClick={onCloseAction}
                            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/90 text-slate-300 text-sm hover:bg-slate-700 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        <div className="px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-7 text-center">
                            {/* круг с галочкой, без квадрата */}
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.9)]">
                                <div className="h-16 w-16 overflow-hidden rounded-full">
                                    <Image
                                        src="/leaflet/confirmation.png"
                                        alt="Success"
                                        width={128}
                                        height={128}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>

                            <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
                            <p className="mt-3 text-sm sm:text-base text-slate-200/90">
                                {text}
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                                <Link
                                    href={homeHref}
                                    className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(16,185,129,0.8)] hover:bg-emerald-400 transition-colors"
                                >
                                    {backLabel}
                                </Link>
                                <button
                                    type="button"
                                    onClick={onCloseAction}
                                    className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-slate-50 hover:bg-slate-800 transition-colors"
                                >
                                    {stayLabel}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
// ладно я все равно вижу что ты не можешь исправить эту ошибку