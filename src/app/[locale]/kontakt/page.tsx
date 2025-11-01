import ContactClient from './ContactClient';

export default async function ContactPage({
                                              params,
                                          }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <ContactClient locale={locale} />;
}
