// src/components/form/ReservationForm.tsx
'use client';

import {
    useMemo,
    useState,
    useEffect,
    useRef,
    type FormEvent,
    type ReactElement,
    type InputHTMLAttributes,
} from 'react';
import Image from 'next/image';
import SocialLinks from '../contact/SocialLinks';
import ReservationSuccessModal from './ReservationSuccessModal';

/* ===== i18n ===== */
type L = 'sk' | 'en' | 'de';
const isL = (x: string): x is L =>
    (['sk', 'en', 'de'] as const).includes(x as L);

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
        notesPH: string;
        notesHint: string;
        submit: string;
        altCall: string;
        successTitle: string;
        success: string;
        required: string;
        requiredBubble: string;
        gdprLabel: string;
        gdprRequiredBubble: string;

        routeTitle: string;
        routeToAirport: string;
        routeFromAirport: string;
        routeCustom: string;
        airportLabel: string;
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
        notesHint:
            'Tu môžete doplniť špeciálne požiadavky – napríklad detská sedačka, kočík, väčšia batožina a podobne.',
        submit: 'Odoslať rezerváciu',
        altCall: 'alebo zavolajte',
        successTitle: 'Rezervácia odoslaná',
        success:
            'Ďakujeme! Vaša požiadavka bola odoslaná. Ozveme sa vám čoskoro.',
        required: 'Povinné pole',
        requiredBubble: 'Vyplňte toto pole.',
        gdprLabel:
            'Súhlasím so spracovaním osobných údajov na účely rezervácie.',
        gdprRequiredBubble:
            'Prosím, potvrďte súhlas so spracovaním osobných údajov.',

        routeTitle: 'Vyberte trasu',
        routeToAirport: 'Bratislava → Letisko Viedeň (Schwechat)',
        routeFromAirport: 'Letisko Viedeň (Schwechat) → Bratislava',
        routeCustom: 'Iná trasa',
        airportLabel: 'Letisko Viedeň Schwechat (VIE)',
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
        notesHint:
            'Here you can add special requests such as a child seat, stroller, larger luggage, etc.',
        submit: 'Send reservation',
        altCall: 'or call',
        successTitle: 'Reservation sent',
        success:
            'Thanks! Your request has been sent. We will contact you shortly.',
        required: 'Required field',
        requiredBubble: 'Please fill out this field.',
        gdprLabel:
            'I agree to the processing of my personal data for the purpose of this reservation.',
        gdprRequiredBubble:
            'Please confirm the consent to process your personal data.',

        routeTitle: 'Choose route',
        routeToAirport: 'Bratislava → Vienna Airport (Schwechat)',
        routeFromAirport: 'Vienna Airport (Schwechat) → Bratislava',
        routeCustom: 'Other route',
        airportLabel: 'Letisko Viedeň Schwechat (VIE)',
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
        notesHint:
            'Hier können Sie besondere Wünsche angeben – zum Beispiel Kindersitz, Kinderwagen, größeres Gepäck usw.',
        submit: 'Reservierung senden',
        altCall: 'oder anrufen',
        successTitle: 'Reservierung gesendet',
        success:
            'Danke! Ihre Anfrage wurde gesendet. Wir melden uns in Kürze.',
        required: 'Pflichtfeld',
        requiredBubble: 'Bitte füllen Sie dieses Feld aus.',
        gdprLabel:
            'Ich stimme der Verarbeitung meiner personenbezogenen Daten zum Zweck der Reservierung zu.',
        gdprRequiredBubble:
            'Bitte bestätigen Sie die Einwilligung zur Datenverarbeitung.',

        routeTitle: 'Strecke wählen',
        routeToAirport: 'Bratislava → Flughafen Wien (Schwechat)',
        routeFromAirport: 'Flughafen Wien (Schwechat) → Bratislava',
        routeCustom: 'Andere Strecke',
        airportLabel: 'Letisko Viedeň Schwechat (VIE)',
    },
};

/* ===== helpers ===== */
type Item = { id: string };

const uid = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

type ApiResponse =
    | { ok: true }
    | {
    ok?: false;
    errors?: { _errors?: string[] } | Record<string, unknown>;
};

type RouteOption = 'toAirport' | 'fromAirport' | 'custom';

/* ===== component ===== */
export default function ReservationForm({
                                            locale,
                                        }: {
    locale: string;
}): ReactElement {
    const t = useMemo(() => dict[isL(locale) ? locale : 'sk'], [locale]);

    const [wantReturn, setWantReturn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [successOpen, setSuccessOpen] = useState(false);

    const [extraPickups, setExtraPickups] = useState<Item[]>([]);
    const [extraDrops, setExtraDrops] = useState<Item[]>([]);
    const [notesHintOpen, setNotesHintOpen] = useState(false);

    const [route, setRoute] = useState<RouteOption>('custom');

    const pickupRef = useRef<HTMLInputElement | null>(null);
    const dropoffRef = useRef<HTMLInputElement | null>(null);
    const notesRef = useRef<HTMLTextAreaElement | null>(null);

    const addExtraPickup = () =>
        setExtraPickups((a) => [...a, { id: uid() }]);
    const addExtraDrop = () =>
        setExtraDrops((a) => [...a, { id: uid() }]);
    const removeExtraPickup = (id: string) =>
        setExtraPickups((a) => a.filter((x) => x.id !== id));
    const removeExtraDrop = (id: string) =>
        setExtraDrops((a) => a.filter((x) => x.id !== id));

    useEffect(() => {
        if (!notesHintOpen) return;
        const id = setTimeout(() => setNotesHintOpen(false), 30_000);
        return () => clearTimeout(id);
    }, [notesHintOpen]);

    // авто-увеличение textarea
    const handleNotesInput = (e: FormEvent<HTMLTextAreaElement>) => {
        const el = e.currentTarget;
        if (notesRef.current !== el) {
            notesRef.current = el;
        }
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    };

    // автоподстановка аэропорта
    useEffect(() => {
        const pickupEl = pickupRef.current;
        const dropoffEl = dropoffRef.current;
        if (!pickupEl || !dropoffEl) return;

        const airport = t.airportLabel;

        if (route === 'toAirport') {
            pickupEl.value = '';
            dropoffEl.value = airport;
        } else if (route === 'fromAirport') {
            pickupEl.value = airport;
            dropoffEl.value = '';
        } else {
            pickupEl.value = '';
            dropoffEl.value = '';
        }
    }, [route, t.airportLabel]);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (loading) return;

        if (!e.currentTarget.reportValidity()) return;

        setServerError(null);

        const fd = new FormData(e.currentTarget);

        const extraP = fd.getAll('pickup_extra[]').map(String).filter(Boolean);
        const extraD = fd.getAll('dropoff_extra[]').map(String).filter(Boolean);

        const payload = {
            ...Object.fromEntries(fd.entries()),
            pickups: [String(fd.get('pickup') ?? ''), ...extraP],
            dropoffs: [String(fd.get('dropoff') ?? ''), ...extraD],
            pickup_extra: extraP,
            dropoff_extra: extraD,
        };

        setLoading(true);

        // --- только fetch + чтение JSON под try/catch ---
        let res: Response;
        let data: ApiResponse | null = null;

        try {
            res = await fetch('/api/reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const ct = res.headers.get('content-type') || '';
            if (ct.includes('application/json')) {
                data = (await res.json()) as ApiResponse;
            }
        } catch (err) {
            console.error('[Reservation] fetch /api/reservation failed', err);
            setServerError('Network error. Please try again.');
            setLoading(false);
            return;
        }

        // --- проверка статуса / ответа сервера ---
        const isOk = res.ok && (data?.ok ?? true);

        if (!isOk) {
            // пробуем достать текст ошибки из errors._errors[0]
            const maybeErrors =
                data && 'errors' in data ? data.errors : undefined;
            const rootErrors =
                maybeErrors && typeof maybeErrors === 'object'
                    ? (maybeErrors as { _errors?: unknown[] })._errors
                    : undefined;

            const msgFromServer =
                Array.isArray(rootErrors) && rootErrors.length
                    ? String(rootErrors[0])
                    : `Error ${res.status}`;

            setServerError(msgFromServer);
            setLoading(false);
            return;
        }

        // --- успех ---
        (e.currentTarget as HTMLFormElement).reset();
        setWantReturn(false);
        setExtraPickups([]);
        setExtraDrops([]);
        setRoute('custom');

        if (notesRef.current) {
            notesRef.current.style.height = '';
        }

        setLoading(false);
        setSuccessOpen(true);
    }

    const label = (id: string, text: string, req = false): ReactElement => (
        <label htmlFor={id} className="ui-label">
            {text}{' '}
            {req && <span aria-hidden className="text-red-500">*</span>}
        </label>
    );

    const textInput = (
        id: string,
        req = false,
        attrs: InputHTMLAttributes<HTMLInputElement> = {},
    ) => (
        <input
            id={id}
            name={id}
            required={req}
            aria-required={req}
            className="ui-input mt-1"
            onInvalid={(ev) =>
                (ev.currentTarget as HTMLInputElement).setCustomValidity(
                    t.requiredBubble,
                )
            }
            onInput={(ev) =>
                (ev.currentTarget as HTMLInputElement).setCustomValidity('')
            }
            {...attrs}
        />
    );

    const routeCardBase =
        'w-full text-left rounded-2xl border px-3 py-3 sm:px-4 sm:py-3 transition shadow-sm bg-white/80 hover:border-rose-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60';

    return (
        <>
            <form className="space-y-10" onSubmit={onSubmit} noValidate>
                {serverError && (
                    <div className="info-card p-3 text-sm text-red-700 border-red-200 bg-red-50/70">
                        {serverError}
                    </div>
                )}

                {/* Personal */}
                <fieldset className="grid gap-4 sm:grid-cols-2">
                    <legend className="mb-2 text-sm font-semibold">
                        {t.personal}
                    </legend>
                    <div>
                        {label('firstName', t.first, true)}
                        {textInput('firstName', true)}
                    </div>
                    <div>
                        {label('lastName', t.last, true)}
                        {textInput('lastName', true)}
                    </div>
                    <div>
                        {label('phone', t.phone, true)}
                        {textInput('phone', true, { type: 'tel' })}
                    </div>
                    <div>
                        {label('email', t.email, true)}
                        {textInput('email', true, { type: 'email' })}
                    </div>
                </fieldset>

                {/* Ride details */}
                <fieldset className="grid gap-4 sm:grid-cols-2">
                    <legend className="mb-2 text-sm font-semibold">
                        {t.ride}
                    </legend>

                    {/* выбор маршрута */}
                    <div className="sm:col-span-2 space-y-3">
                        <p className="text-xs sm:text-sm font-medium text-gray-700">
                            {t.routeTitle}
                        </p>

                        <div className="grid gap-3">
                            {/* Bratislava → letisko */}
                            <button
                                type="button"
                                aria-pressed={route === 'toAirport'}
                                onClick={() => setRoute('toAirport')}
                                className={`${routeCardBase} ${
                                    route === 'toAirport'
                                        ? 'border-rose-500 shadow-md ring-1 ring-rose-500/40'
                                        : 'border-white/0'
                                }`}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-rose-50">
                                        <Image
                                            src="/leaflet/airport-taxi.png"
                                            alt=""
                                            width={60}
                                            height={60}
                                            className="h-9 w-9 sm:h-10 sm:w-10"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm sm:text-base font-semibold text-gray-900">
                                            {t.routeToAirport}
                                        </div>
                                        <div className="text-xs text-gray-500 sm:block hidden">
                                            {t.airportLabel}
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {/* letisko → Bratislava */}
                            <button
                                type="button"
                                aria-pressed={route === 'fromAirport'}
                                onClick={() => setRoute('fromAirport')}
                                className={`${routeCardBase} ${
                                    route === 'fromAirport'
                                        ? 'border-rose-500 shadow-md ring-1 ring-rose-500/40'
                                        : 'border-white/0'
                                }`}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-rose-50">
                                        <Image
                                            src="/leaflet/route-map.png"
                                            alt=""
                                            width={65}
                                            height={65}
                                            className="h-11 w-11 sm:h-12 sm:w-12"
                                        />
                                    </div>

                                    <div className="text-left">
                                        <div className="text-sm sm:text-base font-semibold text-gray-900">
                                            {t.routeFromAirport}
                                        </div>
                                        <div className="text-xs text-gray-500 sm:block hidden">
                                            {t.airportLabel}
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {/* Iná trasa */}
                            <button
                                type="button"
                                aria-pressed={route === 'custom'}
                                onClick={() => setRoute('custom')}
                                className={`${routeCardBase} ${
                                    route === 'custom'
                                        ? 'border-rose-500 shadow-md ring-1 ring-rose-500/40'
                                        : 'border-white/0'
                                }`}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-rose-50">
                                        <Image
                                            src="/leaflet/journey.png"
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="h-7 w-7 sm:h-8 sm:w-8"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm sm:text-base font-semibold text-gray-900">
                                            {t.routeCustom}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <input type="hidden" name="routeType" value={route} />

                    <div className="sm:col-span-2">
                        {label('pickup', t.from, true)}
                        <input
                            id="pickup"
                            name="pickup"
                            required
                            aria-required
                            ref={pickupRef}
                            className="ui-input mt-1"
                            placeholder={t.from}
                            onInvalid={(ev) =>
                                (ev.currentTarget as HTMLInputElement).setCustomValidity(
                                    t.requiredBubble,
                                )
                            }
                            onInput={(ev) =>
                                (ev.currentTarget as HTMLInputElement).setCustomValidity('')
                            }
                        />
                    </div>

                    {extraPickups.map((item) => (
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
                        <button
                            type="button"
                            className="btn-secondary text-xs"
                            onClick={addExtraPickup}
                        >
                            {t.from}: +
                        </button>
                    </div>

                    <div className="sm:col-span-2">
                        {label('dropoff', t.to, true)}
                        <input
                            id="dropoff"
                            name="dropoff"
                            required
                            aria-required
                            ref={dropoffRef}
                            className="ui-input mt-1"
                            placeholder={t.to}
                            onInvalid={(ev) =>
                                (ev.currentTarget as HTMLInputElement).setCustomValidity(
                                    t.requiredBubble,
                                )
                            }
                            onInput={(ev) =>
                                (ev.currentTarget as HTMLInputElement).setCustomValidity('')
                            }
                        />
                    </div>

                    {extraDrops.map((item) => (
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
                        <button
                            type="button"
                            className="btn-secondary text-xs"
                            onClick={addExtraDrop}
                        >
                            {t.to}: +
                        </button>
                    </div>

                    <div>
                        {label('date', t.date, true)}
                        {textInput('date', true, { type: 'date' })}
                    </div>
                    <div>
                        {label('time', t.time, true)}
                        {textInput('time', true, { type: 'time' })}
                    </div>

                    <div className="sm:col-span-2">
                        {label('flight', t.flight)}
                        {textInput('flight', false, { placeholder: t.flight })}
                    </div>

                    <div>
                        {label('pax', t.pax, true)}
                        {textInput('pax', true, {
                            type: 'number',
                            min: 1,
                            max: 8,
                        })}
                    </div>

                    <div className="sm:col-span-2">
                        <span className="ui-label">{t.luggage}</span>
                        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                {label('bagsChecked', t.checked)}
                                {textInput('bagsChecked', false, {
                                    type: 'number',
                                    min: 0,
                                    max: 12,
                                })}
                            </div>
                            <div>
                                {label('bagsCarry', t.carry)}
                                {textInput('bagsCarry', false, {
                                    type: 'number',
                                    min: 0,
                                    max: 12,
                                })}
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* Options */}
                <fieldset className="space-y-4">
                    <legend className="mb-2 text-sm font-semibold">
                        {t.options}
                    </legend>

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
                        <div className="rounded-xl border p-4 bg-white/70">
                            <p className="mb-3 text-sm font-medium">
                                {t.return}
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    {label('r_pickup', t.from, true)}
                                    {textInput('r_pickup', true)}
                                </div>
                                <div className="sm:col-span-2">
                                    {label('r_dropoff', t.to, true)}
                                    {textInput('r_dropoff', true)}
                                </div>
                                <div>
                                    {label('r_date', t.date, true)}
                                    {textInput('r_date', true, {
                                        type: 'date',
                                    })}
                                </div>
                                <div>
                                    {label('r_time', t.time, true)}
                                    {textInput('r_time', true, {
                                        type: 'time',
                                    })}
                                </div>
                                <div className="sm:col-span-2">
                                    {label('r_flight', t.flight)}
                                    {textInput('r_flight', false, {
                                        placeholder: t.flight,
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </fieldset>

                {/* Notes */}
                <fieldset className="relative">
                    <legend className="mb-2 text-sm font-semibold pr-8">
                        {t.notes}
                    </legend>

                    <button
                        type="button"
                        onClick={() => setNotesHintOpen((v) => !v)}
                        aria-label="Notes hint"
                        className="absolute right-0 top-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm hover:bg-sky-700"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 2a6 6 0 00-3 11.2V15a1 1 0 001 1h4a1 1 0 001-1v-1.8A6 6 0 0012 2z"
                                fill="currentColor"
                            />
                            <path
                                d="M10 18h4a1 1 0 01.96 1.27l-.25.75A1 1 0 0113.75 21h-3.5a1 1 0 01-.96-1.27l.25-.75A1 1 0 0110 18z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                    {notesHintOpen && (
                        <div className="mb-3 mt-1 max-w-xl rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs sm:text-sm text-sky-900 shadow-sm">
                            {t.notesHint}
                        </div>
                    )}

                    <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        ref={notesRef}
                        className="ui-textarea"
                        style={{ resize: 'none' }}
                        onInput={handleNotesInput}
                    />
                </fieldset>

                {/* GDPR */}
                <div className="pt-2 border-t border-gray-100">
                    <label className="inline-flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="gdpr"
                            required
                            className="mt-0.5 h-4 w-4 rounded border"
                            onInvalid={(ev) =>
                                (ev.currentTarget as HTMLInputElement).setCustomValidity(
                                    t.gdprRequiredBubble,
                                )
                            }
                            onInput={(ev) =>
                                (ev.currentTarget as HTMLInputElement).setCustomValidity(
                                    '',
                                )
                            }
                        />
                        <span>{t.gdprLabel}</span>
                    </label>
                </div>

                {/* Submit + socials */}
                <div className="flex items-center gap-4 flex-wrap">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading ? '…' : t.submit}
                    </button>
                    <span className="text-sm text-gray-500">
            {t.altCall}:{' '}
                        <a href="tel:+421908699151" className="underline">
              +421 908 699 151
            </a>
          </span>

                    <div className="ml-auto">
                        <SocialLinks />
                    </div>
                </div>
            </form>

            <ReservationSuccessModal
                locale={locale}
                open={successOpen}
                onCloseAction={() => setSuccessOpen(false)}
            />
        </>
    );
}
