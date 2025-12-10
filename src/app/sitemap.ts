// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const base =
        process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cartour.sk';

    return [
        {
            url: `${base}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // локали
        { url: `${base}/sk`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: `${base}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${base}/de`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

        // важные страницы
        { url: `${base}/sk/kontakt`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${base}/sk/cennik`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        // при желании добавь ещё маршруты
    ];
}
