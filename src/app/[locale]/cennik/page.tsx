import PriceZones from '../../../components/pricing/PriceZones';
import OtherDestinations from '../../../components/pricing/OtherDestinations';
import Extras from '../../../components/pricing/Extras';
import Payments from '../../../components/pricing/Payments';

export default async function PricingPage({
                                              params,
                                          }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return (
        <main>
            <PriceZones locale={locale} />
            <OtherDestinations locale={locale} />
            <Extras locale={locale} />
            <Payments locale={locale} />
        </main>
    );
}
