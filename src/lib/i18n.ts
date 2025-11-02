export const SUPPORTED = ['sk', 'en', 'de'] as const;
export type Locale = (typeof SUPPORTED)[number];

/** Type-guard: перевіряє, що рядок є підтримуваною локаллю */
export function isSupportedLocale(v: string): v is Locale {
    return (SUPPORTED as readonly string[]).includes(v);
}

/** Нормалізує будь-який рядок у коректну локаль (fallback — 'sk') */
export function normalizeLocale(x: string): Locale {
    return isSupportedLocale(x) ? x : 'sk';
}
