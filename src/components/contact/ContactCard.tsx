'use client';

type Props = { locale: string };

const dict = {
    sk: {
        title: 'Cartour',
        desc:
            'Bratislava, SK — Wien (Schwechat), AT',
        phone: 'Tel:',
        call: '+421 908 699 151',
        note:
            'Online rezervácia dostupná 24/7. Lety sledujeme automaticky.',
    },
    en: {
        title: 'Cartour',
        desc:
            'Bratislava, SK — Vienna (Schwechat), AT',
        phone: 'Phone:',
        call: '+421 908 699 151',
        note:
            'Online booking 24/7. We track flights automatically.',
    },
    de: {
        title: 'Cartour',
        desc:
            'Bratislava, SK — Wien (Schwechat), AT',
        phone: 'Tel:',
        call: '+421 908 699 151',
        note:
            'Online-Reservierung 24/7. Flüge werden automatisch verfolgt.',
    },
} as const;

export default function ContactCard({ locale }: Props) {
    const t = dict[(['sk', 'en', 'de'] as const).includes(locale as any) ? (locale as 'sk' | 'en' | 'de') : 'sk'];

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow">
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zm0 7L2 14l10 5 10-5-10-5z" />
          </svg>
        </span>
                <h3 className="text-base font-semibold">{t.title}</h3>
            </div>

            <p className="text-sm text-gray-700">{t.desc}</p>

            <p className="text-sm">
                <span className="text-gray-600">{t.phone}</span>{' '}
                <a href="tel:+421908699151" className="font-medium text-sky-700 underline hover:text-sky-900">
                    {t.call}
                </a>
            </p>

            <p className="text-xs text-gray-500">{t.note}</p>
        </div>
    );
}
