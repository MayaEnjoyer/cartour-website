// src/app/[locale]/kontakt/page.tsx
import ContactClient from '../../../components/contact/ContactClient';

export default async function ContactPage({
                                              params,
                                          }: {
    params: Promise<{ locale: string }>;
}) {
    // 👇 розпаковуємо проміс
    const { locale } = await params;
    return <ContactClient locale={locale} />;
}
