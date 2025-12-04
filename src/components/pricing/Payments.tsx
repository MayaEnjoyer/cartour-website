'use client';

import Image from 'next/image';

type PaymentKey = 'cash' | 'card' | 'invoice';

type Item = { key: PaymentKey; title: string; desc: string };
type Dict = { heading: string; items: Item[] };

const dicts: Record<'sk' | 'en' | 'de', Dict> = {
    sk: {
        heading: 'Spôsoby platby',
        items: [
            { key: 'cash', title: 'Hotovosť', desc: 'Platba priamo u vodiča' },
            { key: 'card', title: 'Kartou', desc: 'Bezhotovostná platba' },
            { key: 'invoice', title: 'Na faktúru', desc: 'Pre firemných klientov' },
        ],
    },
    en: {
        heading: 'Payment methods',
        items: [
            { key: 'cash', title: 'Cash', desc: 'Pay directly to the driver' },
            { key: 'card', title: 'Card', desc: 'Contactless card payment' },
            { key: 'invoice', title: 'Invoice', desc: 'For business clients' },
        ],
    },
    de: {
        heading: 'Zahlungsmethoden',
        items: [
            { key: 'cash', title: 'Bar', desc: 'Direkt beim Fahrer zahlen' },
            { key: 'card', title: 'Karte', desc: 'Kontaktlose Kartenzahlung' },
            { key: 'invoice', title: 'Rechnung', desc: 'Für Firmenkunden' },
        ],
    },
};

function PaymentIcon({ kind }: { kind: PaymentKey }) {
    const base =
        'inline-flex w-9 h-9 rounded-full bg-rose-600 items-center justify-center hover:bg-rose-500 transition-colors text-white shadow-md';

    if (kind === 'cash') {
        return (
            <span className={base} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <rect
              x="3"
              y="7"
              width="18"
              height="10"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="2.6" fill="currentColor" />
          <text
              x="12"
              y="12.5"
              textAnchor="middle"
              fontSize="2.6"
              fill="#ffffff"
          >
            €
          </text>
        </svg>
      </span>
        );
    }

    if (kind === 'card') {
        return (
            <span className={base} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <rect
              x="3"
              y="6"
              width="18"
              height="12"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
          />
          <rect x="4" y="10" width="16" height="2" fill="currentColor" />
          <rect x="6" y="14" width="4" height="2" fill="currentColor" />
        </svg>
      </span>
        );
    }

    return (
        <span className={base} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
        <path
            d="M9 4h6a2 2 0 0 1 2 2v12l-3-1.5L12 18l-3 1.5L6 18V6a2 2 0 0 1 2-2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
        <line
            x1="9"
            y1="9"
            x2="15"
            y2="9"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
        />
        <line
            x1="9"
            y1="12"
            x2="15"
            y2="12"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
        />
        <line
            x1="9"
            y1="15"
            x2="13"
            y2="15"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
        />
      </svg>
    </span>
    );
}

export default function Payments({
                                     locale,
                                     red = false,
                                 }: {
    locale: string;
    red?: boolean;
}) {
    const t =
        locale === 'en' ? dicts.en : locale === 'de' ? dicts.de : dicts.sk;

    return (
        <section
            className={`mx-auto max-w-6xl px-4 py-2 sm:py-3 lg:py-4 ${
                red ? 'text-white' : ''
            }`}
        >
            <div className="mb-3">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {t.heading}
                </h2>
            </div>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
                {t.items.map((it) => (
                    <div
                        key={it.title}
                        className="rounded-2xl bg-white text-slate-900 p-3 sm:p-4 shadow-xl ring-1 ring-black/5"
                    >
                        <div className="flex flex-col gap-2.5">
                            <PaymentIcon kind={it.key} />

                            <div>
                                <h3 className="text-base sm:text-lg font-semibold">
                                    {it.title}
                                </h3>
                                <p className="mt-1 text-sm text-slate-600">{it.desc}</p>

                                {it.key === 'card' && (
                                    <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                                        <Image
                                            src="/visa.png"
                                            alt="Visa"
                                            width={48}
                                            height={22}
                                            className="h-4.5 w-auto"
                                        />
                                        <Image
                                            src="/mastercard.png"
                                            alt="Mastercard"
                                            width={48}
                                            height={22}
                                            className="h-4.5 w-auto"
                                        />
                                        <Image
                                            src="/apple-pay.png"
                                            alt="Apple Pay"
                                            width={56}
                                            height={22}
                                            className="h-4.5 w-auto"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
