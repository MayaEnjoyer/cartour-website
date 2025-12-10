// src/components/form/ReservationSuccessModal.tsx
'use client';

import type { FC } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Props = {
    locale: string;
    open: boolean;
    onCloseAction: () => void;
};

const ReservationSuccessModal: FC<Props> = ({ locale, open, onCloseAction }) => {
    const reduceMotion = useReducedMotion();
    const reduce = !!reduceMotion;

    if (!open) return null;

    const title =
        locale === 'sk'
            ? 'Rezervácia odoslaná'
            : locale === 'de'
                ? 'Reservierung gesendet'
                : 'Reservation sent';

    const text =
        locale === 'sk'
            ? 'Ďakujeme, vaša rezervácia bola úspešne odoslaná. Teraz pracujeme na jej spracovaní.'
            : locale === 'de'
                ? 'Glückwunsch! Ihre Reservierung wurde erfolgreich gesendet. Wir bearbeiten sie nun.'
                : 'Congratulations, your reservation has been successfully sent. We are now processing it.';

    const handleClose = () => {
        onCloseAction();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/70 backdrop-blur-2xl px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={reduce ? { duration: 0.15 } : { duration: 0.25 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 text-slate-50 shadow-[0_40px_120px_rgba(15,23,42,0.9)] border border-slate-700/60 px-8 py-8 sm:px-10 sm:py-9"
                        initial={reduce ? undefined : { scale: 0.9, opacity: 0, y: 20 }}
                        animate={
                            reduce
                                ? { opacity: 1 }
                                : { scale: 1, opacity: 1, y: 0 }
                        }
                        exit={
                            reduce
                                ? { opacity: 0 }
                                : { scale: 0.9, opacity: 0, y: 20 }
                        }
                        transition={
                            reduce
                                ? { duration: 0.15 }
                                : {
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 26,
                                    mass: 0.8,
                                }
                        }
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* close button */}
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/70 focus:ring-offset-2 focus:ring-offset-slate-900"
                            aria-label="Close"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                aria-hidden="true"
                            >
                                <path
                                    d="M6 6l12 12M18 6L6 18"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>

                        {/* icon + title + text */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-400/90 shadow-[0_0_40px_rgba(16,185,129,0.9)]">
                                <div className="absolute inset-[-14px] rounded-full bg-emerald-500/20 blur-2xl" />
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-9 w-9 text-white"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M20 7L10 17l-4-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                                {title}
                            </h2>
                            <p className="mt-2 max-w-md text-sm sm:text-base text-slate-300">
                                {text}
                            </p>
                        </div>

                        {/* buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm sm:text-base font-medium text-white shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                {locale === 'sk'
                                    ? 'Späť na hlavnú stránku'
                                    : locale === 'de'
                                        ? 'Zur Hauptseite'
                                        : 'Back to main page'}
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-600/70 bg-slate-900/40 px-5 py-3 text-sm sm:text-base font-medium text-slate-100 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                {locale === 'sk'
                                    ? 'Zostať na tejto stránke'
                                    : locale === 'de'
                                        ? 'Auf dieser Seite bleiben'
                                        : 'Stay on this page'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReservationSuccessModal;
