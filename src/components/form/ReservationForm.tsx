'use client';

import {
    useMemo,
    useState,
    type FormEvent,
    type ReactElement,
} from 'react';

type L = 'sk' | 'en' | 'de';
const isL = (x: string): x is L => (['sk', 'en', 'de'] as const).includes(x as L);

type Dict = Record<
    L,
    {
        title: string;
        personal: string;
        first: string;
        last: string;
        phone: string;
        email: string;
        ride: string;
        from: string;
        to: string;
        date: string;
        time: string;
        flight: string;
        pax: string;
        luggage: string;
        checked: string;
        carry: string;
        options: string;
        wantReturn: string;
        return: string;
        notes: string;
        submit: string;
        altCall: string;
        success: string;
        required: string;
        missingPrefix: string;
    }
>;

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
        flight: 'Číslo letu (voliteľné)',
        pax: 'Počet osôb',
        luggage: 'Batožina',
        checked: 'Podpalubná (ks)',
        carry: 'Príručná (ks)',
        options: 'Doplnkové možnosti',
        wantReturn: 'Mám záujem aj o spiatočnú cestu',
        return: 'Detaily spätného transferu',
        notes: 'Poznámky',
        submit: 'Odoslať rezerváciu',
        altCall: 'alebo zavolajte',
        success: 'Ďakujeme! Vaša požiadavka bola odoslaná. Ozveme sa vám čoskoro.',
        required: 'Povinné pole',
        missingPrefix: 'Chýbajú:',
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
        flight: 'Flight number (optional)',
        pax: 'Passengers',
        luggage: 'Luggage',
        checked: 'Checked (pcs)',
        carry: 'Carry-on (pcs)',
        options: 'Options',
        wantReturn: 'I also want a return trip',
        return: 'Return trip details',
        notes: 'Notes',
        submit: 'Send reservation',
        altCall: 'or call',
        success: 'Thanks! Your request has been sent. We will contact you shortly.',
        required: 'Required field',
        missingPrefix: 'Missing:',
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
        flight: 'Flugnummer (optional)',
        pax: 'Personen',
        luggage: 'Gepäck',
        checked: 'Aufgegeben (Stk.)',
        carry: 'Handgepäck (Stk.)',
        options: 'Optionen',
        wantReturn: 'Ich möchte auch die Rückfahrt',
        return: 'Details der Rückfahrt',
        notes: 'Anmerkungen',
        submit: 'Reservierung senden',
        altCall: 'oder anrufen',
        success: 'Danke! Ihre Anfrage wurde gesendet. Wir melden uns in Kürze.',
        required: 'Pflichtfeld',
        missingPrefix: 'Fehlend:',
    },
};

const REQUIRED_FIELDS = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'pickup',
    'dropoff',
    'date',
    'time',
    'pax',
] as const;

function listMissing(fd: FormData): string[] {
    const missing: string[] = [];
    for (const key of REQUIRED_FIELDS) {
        const v = fd.get(key);
        if (v === null || String(v).trim() === '') missing.push(key);
    }
    return missing;
}

export default function ReservationForm({ locale }: { locale: string }): ReactElement {
    const t = useMemo(() => dict[isL(locale) ? locale : 'sk'], [locale]);

    const [wantReturn, setWantReturn] = useState(false);
    const [sent, setSent] = useState<string | null>(null);
    const [missing, setMissing] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSent(null);
        setServerError(null);

        const fd = new FormData(e.currentTarget);
        const m = listMissing(fd);
        if (m.length) {
            setMissing(m);
            return;
        }
        setMissing(null);

        // Перетворюємо FormData → простий об’єкт
        const payload = Object.fromEntries(fd.entries());

        setLoading(true);
        try {
            const res = await fetch('/api/reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            // Якщо сервер повернув помилки валідації (zod)
            const data = await res.json().catch(() => ({}));
            if (!res.ok || data?.ok === false) {
                const zodFieldErrors = data?.errors?.fieldErrors as Record<string, string[]> | undefined;
                if (zodFieldErrors) {
                    setMissing(Object.keys(zodFieldErrors));
                } else {
                    setServerError(`Error ${res.status}`);
                }
                return;
            }

            setSent(t.success);
            e.currentTarget.reset();
            setWantReturn(false);
        } catch {
            setServerError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const label = (id: string, text: string, req = false): ReactElement => (
        <label htmlFor={id} className="block text-sm font-medium">
            {text} {req && <span aria-hidden className="text-red-500">*</span>}
        </label>
    );

    type InputType = 'text' | 'email' | 'tel' | 'date' | 'time' | 'number';

    const input = (type: InputType = 'text') => {
        function RenderInput(id: string, req = false, extra = ''): ReactElement {
            return (
                <input
                    id={id}
                    name={id}
                    type={type}
                    required={req}
                    aria-required={req}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 ${extra}`}
                />
            );
        }
        RenderInput.displayName = `Input<${type}>`;
        return RenderInput;
    };

    const text = input('text');
    const email = input('email');
    const tel = input('tel');
    const date = input('date');
    const time = input('time');

    const number = (id: string, req = false, min = 0, max = 32): ReactElement => (
        <input
            id={id}
            name={id}
            type="number"
            min={min}
            max={max}
            required={req}
            aria-required={req}
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
        />
    );

    return (
        <section className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.title}</h1>

            {missing && missing.length > 0 && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {t.missingPrefix} {missing.join(', ')}
                </div>
            )}

            {serverError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {serverError}
                </div>
            )}

            {sent && (
                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    {sent}
                </div>
            )}

            <form className="mt-6 space-y-10" noValidate onSubmit={onSubmit}>
                {/* Personal */}
                <fieldset className="grid gap-4 sm:grid-cols-2">
                    <legend className="mb-2 text-sm font-semibold">{t.personal}</legend>
                    <div>
                        {label('firstName', t.first, true)}
                        {text('firstName', true)}
                    </div>
                    <div>
                        {label('lastName', t.last, true)}
                        {text('lastName', true)}
                    </div>
                    <div>
                        {label('phone', t.phone, true)}
                        {tel('phone', true)}
                    </div>
                    <div>
                        {label('email', t.email, true)}
                        {email('email', true)}
                    </div>
                </fieldset>

                {/* Ride details */}
                <fieldset className="grid gap-4 sm:grid-cols-2">
                    <legend className="mb-2 text-sm font-semibold">{t.ride}</legend>
                    <div className="sm:col-span-2">
                        {label('pickup', t.from, true)}
                        {text('pickup', true)}
                    </div>
                    <div className="sm:col-span-2">
                        {label('dropoff', t.to, true)}
                        {text('dropoff', true)}
                    </div>

                    <div>
                        {label('date', t.date, true)}
                        {date('date', true)}
                    </div>
                    <div>
                        {label('time', t.time, true)}
                        {time('time', true)}
                    </div>

                    <div>
                        {label('flight', t.flight)}
                        {text('flight')}
                    </div>

                    <div>
                        {label('pax', t.pax, true)}
                        {number('pax', true, 1, 8)}
                    </div>

                    <div className="sm:col-span-2">
                        <span className="block text-sm font-medium">{t.luggage}</span>
                        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                {label('bagsChecked', t.checked)}
                                {number('bagsChecked', false, 0, 12)}
                            </div>
                            <div>
                                {label('bagsCarry', t.carry)}
                                {number('bagsCarry', false, 0, 12)}
                            </div>
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
                            onChange={(e) => setWantReturn(e.target.checked)}
                        />
                        <span className="text-sm">{t.wantReturn}</span>
                    </label>

                    {wantReturn && (
                        <div className="rounded-xl border p-4">
                            <p className="mb-3 text-sm font-medium">{t.return}</p>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    {label('r_pickup', t.from, true)}
                                    {text('r_pickup', true)}
                                </div>
                                <div className="sm:col-span-2">
                                    {label('r_dropoff', t.to, true)}
                                    {text('r_dropoff', true)}
                                </div>
                                <div>
                                    {label('r_date', t.date, true)}
                                    {date('r_date', true)}
                                </div>
                                <div>
                                    {label('r_time', t.time, true)}
                                    {time('r_time', true)}
                                </div>
                                <div className="sm:col-span-2">
                                    {label('r_flight', t.flight)}
                                    {text('r_flight')}
                                </div>
                            </div>
                        </div>
                    )}
                </fieldset>

                {/* Notes */}
                <fieldset>
                    <legend className="mb-2 text-sm font-semibold">{t.notes}</legend>
                    <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                    />
                </fieldset>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl border bg-black px-5 py-2 text-white shadow hover:bg-black/90 focus:ring-2 focus:ring-black/20 disabled:opacity-60"
                    >
                        {loading ? '…' : t.submit}
                    </button>
                    <span className="text-sm text-gray-500">
            {t.altCall}:{' '}
                        <a href="tel:+421908699151" className="underline">
              +421 908 699 151
            </a>
          </span>
                </div>

                <p className="text-xs text-gray-500">* {t.required}. Nikdy nezdieľame údaje s tretími stranami.</p>
            </form>
        </section>
    );
}
