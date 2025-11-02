'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

const LOCALES = ['sk', 'en', 'de'] as const;
type Locale = (typeof LOCALES)[number];

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
    const router = useRouter();
    const params = useParams<{ locale?: string }>();
    const pathname = usePathname() || '/';

    const current: Locale = (params?.locale as Locale) || locale || 'sk';

    // побудова шляху з новою локаллю (заміна першого сегмента)
    const buildHref = (target: Locale) => {
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length === 0) return `/${target}`;
        parts[0] = target;
        return `/${parts.join('/')}`;
    };

    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    // закриття при кліку поза меню
    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, []);

    const handlePick = (l: Locale) => {
        setOpen(false);
        router.push(buildHref(l));
    };

    return (
        <div ref={rootRef} className="relative inline-block text-left">
            {/* ЧЕРВОНА кнопка */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="
          inline-flex items-center gap-2 rounded-full
          bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white
          shadow ring-1 ring-white/10 hover:bg-rose-500 transition
        "
                title="Change language"
            >
                {current.toUpperCase()}
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
                </svg>
            </button>

            {/* Меню мов */}
            <div
                role="menu"
                className={[
                    'absolute right-0 mt-2 w-36 origin-top-right rounded-xl border border-white/10',
                    'bg-black/90 backdrop-blur shadow-lg',
                    'transition transform',
                    open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95',
                ].join(' ')}
            >
                <ul className="py-1">
                    {LOCALES.map((l) => {
                        const active = l === current;
                        return (
                            <li key={l}>
                                <button
                                    onClick={() => handlePick(l)}
                                    className={[
                                        'flex w-full items-center justify-between px-3 py-2 text-sm',
                                        'text-white/90 hover:bg-white/10 rounded-lg transition',
                                        active ? 'bg-rose-600/20 text-white' : '',
                                    ].join(' ')}
                                >
                                    {l.toUpperCase()}
                                    {active && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                                            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19l12-12-1.4-1.4z" />
                                        </svg>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
