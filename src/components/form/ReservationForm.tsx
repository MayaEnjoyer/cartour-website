// src/components/pricing/ReservationForm.tsx
'use client';

import {
    useMemo, useState, type FormEvent, type ReactElement, type InputHTMLAttributes,
} from 'react';
import Link from 'next/link';
import SocialLinks from '../contact/SocialLinks';

/* ===== i18n ===== */
type L = 'sk' | 'en' | 'de';
const isL = (x: string): x is L => (['sk', 'en', 'de'] as const).includes(x as L);

type Dict = Record<L, {
    title: string;
    personal: string;
    first: string; last: string; phone: string; email: string;
    ride: string; from: string; to: string; date: string; time: string; flight: string;
    pax: string; luggage: string; checked: string; carry: string;
    options: string; wantReturn: string; return: string; notes: string;
    notesPH: string;
    submit: string; altCall: string;
    successTitle: string; success: string;
    required: string; requiredBubble: string;
}>;

const dict: Dict = {
    sk: {
        title: 'Rezervačný formulár',
        personal: 'Osobné údaje',
        first: 'Meno',
        last: 'Priezvisko',
        phone: 'Telefón',
        email: 'E-mail',
        ride: 'Detaily jazdy',
        from: 'Miesto vyzdvihnutia',
        to: 'Cieľ cesty',
        date: 'Dátum',
        time: 'Čas',
        flight: 'Číslo letu',
        pax: 'Počet osôb',
        luggage: 'Batožina',
        checked: 'Podpalubná (ks)',
        carry: 'Príručná (ks)',
        options: 'Doplnkové možnosti',
        wantReturn: 'Mám záujem aj o spiatočnú cestu',
        return: 'Detaily spätného transferu',
        notes: 'Poznámky',
        notesPH: 'napr. detská sedačka, kočík, väčšia batožina…',
        submit: 'Odoslať rezerváciu',
        altCall: 'alebo zavolajte',
        successTitle: 'Rezervácia odoslaná',
        success: 'Ďakujeme! Vaša požiadavka bola odoslaná. Ozveme sa vám čoskoro.',
        required: 'Povinné pole',
        requiredBubble: 'Vyplňte toto pole.',
    },
    en: {
        title: 'Reservation form',
        personal: 'Personal details',
        first: 'First name',
        last: 'Last name',
        phone: 'Phone',
        email: 'E-mail',
        ride: 'Ride details',
        from: 'Pickup address',
        to: 'Destination',
        date: 'Date',
        time: 'Time',
        flight: 'Flight number',
        pax: 'Passengers',
        luggage: 'Luggage',
        checked: 'Checked (pcs)',
        carry: 'Carry-on (pcs)',
        options: 'Options',
        wantReturn: 'I also want a return trip',
        return: 'Return trip details',
        notes: 'Notes',
        notesPH: 'e.g., child seat, stroller, large luggage…',
        submit: 'Send reservation',
        altCall: 'or call',
        successTitle: 'Reservation sent',
        success: 'Thanks! Your request has been sent. We will contact you shortly.',
        required: 'Required field',
        requiredBubble: 'Please fill out this field.',
    },
    de: {
        title: 'Reservierungsformular',
        personal: 'Persönliche Daten',
        first: 'Vorname',
        last: 'Nachname',
        phone: 'Telefon',
        email: 'E-Mail',
        ride: 'Fahrtdetails',
        from: 'Abholadresse',
        to: 'Ziel',
        date: 'Datum',
        time: 'Uhrzeit',
        flight: 'Flugnummer',
        pax: 'Personen',
        luggage: 'Gepäck',
        checked: 'Aufgegeben (Stk.)',
        carry: 'Handgepäck (Stk.)',
        options: 'Optionen',
        wantReturn: 'Ich möchte auch die Rückfahrt',
        return: 'Details der Rückfahrt',
        notes: 'Anmerkungen',
        notesPH: 'z. B. Kindersitz, Kinderwagen, größeres Gepäck…',
        submit: 'Reservierung senden',
        altCall: 'oder anrufen',
        successTitle: 'Reservierung gesendet',
        success: 'Danke! Ihre Anfrage wurde gesendet. Wir melden uns in Kürze.',
        required: 'Pflichtfeld',
        requiredBubble: 'Bitte füllen Sie dieses Feld aus.',
    },
};

/* ===== helpers ===== */
type Item = { id: string };
const uid = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

/* ===== component ===== */
export default function ReservationForm({ locale }: { locale: string }): ReactElement {
    const t = useMemo(() => dict[isL(locale) ? locale : 'sk'], [locale]);

    const [wantReturn, setWantReturn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [successOpen, setSuccessOpen] = useState(false);

    const [extraPickups, setExtraPickups] = useState<Item[]>([]);
    const [extraDrops, setExtraDrops] = useState<Item[]>([]);
    const addExtraPickup = () => setExtraPickups(a => [...a, { id: uid() }]);
    const addExtraDrop   = () => setExtraDrops(a => [...a, { id: uid() }]);
    const removeExtraPickup = (id: string) => setExtraPickups(a => a.filter(x => x.id !== id));
    const removeExtraDrop   = (id: string) => setExtraDrops(a => a.filter(x => x.id !== id));

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Показати нативні «баббли» (як на скріні) і зупинити, якщо є невалідні поля
        if (!e.currentTarget.reportValidity()) return;

        setServerError(null);
        const fd = new FormData(e.currentTarget);

        const extraP = fd.getAll('pickup_extra[]').map(String).filter(Boolean);
        const extraD = fd.getAll('dropoff_extra[]').map(String).filter(Boolean);

        const payload = {
            ...Object.fromEntries(fd.entries()),
            pickups:  [String(fd.get('pickup') ?? ''),  ...extraP],
            dropoffs: [String(fd.get('dropoff') ?? ''), ...extraD],
            pickup_extra: extraP,
            dropoff_extra: extraD,
        };

        setLoading(true);
        try {
            const res = await fetch('/api/reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || data?.ok === false) {
                setServerError(`Error ${res.status}`);
                return;
            }
            // успіх → показуємо модальне вікно
            (e.currentTarget as HTMLFormElement).reset();
            setWantReturn(false);
            setExtraPickups([]); setExtraDrops([]);
            setSuccessOpen(true);
        } catch {
            setServerError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const label = (id: string, text: string, req = false): ReactElement => (
        <label htmlFor={id} className="ui-label">
            {text} {req && <span aria-hidden className="text-red-500">*</span>}
        </label>
    );

    // Інпут з локалізованими нативними підказками («Please fill out this field.»)
    const textInput = (
        id: string,
        req = false,
        attrs: InputHTMLAttributes<HTMLInputElement> = {}
    ) => (
        <input
            id={id}
            name={id}
            required={req}
            aria-required={req}
            className="ui-input mt-1"
            onInvalid={(ev) => (ev.currentTarget as HTMLInputElement).setCustomValidity(t.requiredBubble)}
            onInput={(ev) => (ev.currentTarget as HTMLInputElement).setCustomValidity('')}
            {...attrs}
        />
    );

    return (
        <>
            <form className="space-y-10" onSubmit={onSubmit}>
                {/* server error */}
                {serverError && (
                    <div className="info-card p-3 text-sm text-red-700 border-red-200 bg-red-50/70">
                        {serverError}
                    </div>
                )}

                {/* Personal */}
                <fieldset className="grid gap-4 sm:grid-cols-2">
                    <legend className="mb-2 text-sm font-semibold">{t.personal}</legend>
                    <div>{label('firstName', t.first, true)}{textInput('firstName', true)}</div>
                    <div>{label('lastName', t.last, true)}{textInput('lastName', true)}</div>
                    <div>{label('phone', t.phone, true)}{textInput('phone', true, { type: 'tel' })}</div>
                    <div>{label('email', t.email, true)}{textInput('email', true, { type: 'email' })}</div>
                </fieldset>

                {/* Ride details */}
                <fieldset className="grid gap-4 sm:grid-cols-2">
                    <legend className="mb-2 text-sm font-semibold">{t.ride}</legend>

                    <div className="sm:col-span-2">
                        {label('pickup', t.from, true)}
                        {textInput('pickup', true, { placeholder: t.from })}
                    </div>

                    {extraPickups.map(item => (
                        <div key={item.id} className="sm:col-span-2 relative">
                            <input
                                name="pickup_extra[]"
                                className="ui-input mt-1 pr-8"
                                placeholder={`${t.from} — extra`}
                            />
                            <button
                                type="button"
                                onClick={() => removeExtraPickup(item.id)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                                aria-label="Remove extra pickup"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <div className="sm:col-span-2">
                        <button type="button" className="btn-secondary text-xs" onClick={addExtraPickup}>
                            {t.from}: +
                        </button>
                    </div>

                    <div className="sm:col-span-2">
                        {label('dropoff', t.to, true)}
                        {textInput('dropoff', true, { placeholder: t.to })}
                    </div>

                    {extraDrops.map(item => (
                        <div key={item.id} className="sm:col-span-2 relative">
                            <input
                                name="dropoff_extra[]"
                                className="ui-input mt-1 pr-8"
                                placeholder={`${t.to} — extra`}
                            />
                            <button
                                type="button"
                                onClick={() => removeExtraDrop(item.id)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                                aria-label="Remove extra dropoff"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <div className="sm:col-span-2">
                        <button type="button" className="btn-secondary text-xs" onClick={addExtraDrop}>
                            {t.to}: +
                        </button>
                    </div>

                    <div>{label('date', t.date, true)}{textInput('date', true, { type: 'date' })}</div>
                    <div>{label('time', t.time, true)}{textInput('time', true, { type: 'time' })}</div>

                    <div className="sm:col-span-2">
                        {label('flight', t.flight)}
                        {textInput('flight', false, { placeholder: t.flight })}
                    </div>

                    <div>
                        {label('pax', t.pax, true)}
                        {textInput('pax', true, { type: 'number', min: 1, max: 8 })}
                    </div>

                    <div className="sm:col-span-2">
                        <span className="ui-label">{t.luggage}</span>
                        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>{label('bagsChecked', t.checked)}{textInput('bagsChecked', false, { type: 'number', min: 0, max: 12 })}</div>
                            <div>{label('bagsCarry', t.carry)}{textInput('bagsCarry', false, { type: 'number', min: 0, max: 12 })}</div>
                        </div>
                    </div>
                </fieldset>

                {/* Options */}
                <fieldset className="space-y-4">
                    <legend className="mb-2 text-sm font-semibold">{t.options}</legend>

                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border"
                            checked={wantReturn}
                            onChange={e => setWantReturn(e.target.checked)}
                        />
                        <span className="text-sm">{t.wantReturn}</span>
                    </label>

                    {wantReturn && (
                        <div className="rounded-xl border p-4 bg-white/70">
                            <p className="mb-3 text-sm font-medium">{t.return}</p>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">{label('r_pickup', t.from, true)}{textInput('r_pickup', true)}</div>
                                <div className="sm:col-span-2">{label('r_dropoff', t.to, true)}{textInput('r_dropoff', true)}</div>
                                <div>{label('r_date', t.date, true)}{textInput('r_date', true, { type: 'date' })}</div>
                                <div>{label('r_time', t.time, true)}{textInput('r_time', true, { type: 'time' })}</div>
                                <div className="sm:col-span-2">{label('r_flight', t.flight)}{textInput('r_flight', false, { placeholder: t.flight })}</div>
                            </div>
                        </div>
                    )}
                </fieldset>

                {/* Notes + submit + socials */}
                <fieldset>
                    <legend className="mb-2 text-sm font-semibold">{t.notes}</legend>
                    <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        className="ui-textarea"
                        placeholder={t.notesPH}
                    />
                </fieldset>

                <div className="flex items-center gap-4 flex-wrap">
                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? '…' : t.submit}
                    </button>
                    <span className="text-sm text-gray-500">
            {t.altCall}:{' '}
                        <a href="tel:+421908699151" className="underline">+421 908 699 151</a>
          </span>

                    <div className="ml-auto">
                        <SocialLinks />
                    </div>
                </div>

                <p className="hint">* {t.required}. Nikdy nezdieľame údaje s tretími stranami.</p>
            </form>

            {/* ===== Success modal ===== */}
            {successOpen && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4"
                    role="dialog" aria-modal="true" aria-label={t.successTitle}
                >
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                            <svg viewBox="0 0 24 24" width="24" height="24" className="text-emerald-600">
                                <path d="M20 7L9 18l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h3 className="text-center text-lg font-semibold">{t.successTitle}</h3>
                        <p className="mt-1 text-center text-sm text-gray-600">{t.success}</p>

                        <div className="mt-6 flex gap-3">
                            <Link
                                href={`/${locale}`}
                                className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-white font-medium hover:bg-emerald-500"
                            >
                                {locale === 'sk' ? 'Späť na Domov' : locale === 'de' ? 'Zur Startseite' : 'Back to Home'}
                            </Link>
                            <button
                                type="button"
                                onClick={() => setSuccessOpen(false)}
                                className="inline-flex flex-1 items-center justify-center rounded-xl border px-4 py-2.5 font-medium hover:bg-gray-50"
                            >
                                {locale === 'sk' ? 'Zostať tu' : locale === 'de' ? 'Hier bleiben' : 'Stay here'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
