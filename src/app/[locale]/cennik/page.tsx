// src/app/[locale]/cennik/page.tsx
import PriceZones from '../../../components/pricing/PriceZones';
import OtherDestinations from '../../../components/pricing/OtherDestinations';
import Extras from '../../../components/pricing/Extras';
import Payments from '../../../components/pricing/Payments';

function BackgroundCar() {
    // Один (єдиний) блок з фоном background_car.png
    return (
        <section
            className="
        relative py-28 md:py-40
        bg-[url('/leaflet/background_car.png')] bg-cover bg-center bg-no-repeat bg-fixed
      "
        >
            {/* легке затемнення, щоб текст/блоки над фоном читались */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative" />
        </section>
    );
}

export default async function PricingPage(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params; // <-- головне виправлення

    return (
        <main className="relative">
            {/* 1) Білий блок з цінами */}
            <section className="bg-white">
                <PriceZones locale={locale} />
            </section>

            {/* 2) Чорний блок (інші напрямки + доплати) з діагональним патерном */}
            <section className="relative text-white">
                <div className="absolute inset-0 bg-black" />
                <div className="absolute inset-0 opacity-25 bg-[url('/leaflet/background.png')] bg-[length:24px_24px] bg-repeat" />
                <div className="relative">
                    <OtherDestinations locale={locale} dark />
                    <Extras locale={locale} dark />
                </div>
            </section>

            {/* 3) Один єдиний фон з машиною — не дублюємо */}
            <BackgroundCar />

            {/* 4) Червоний блок — способи оплати */}
            <section className="bg-[#E10D2C]">
                <Payments locale={locale} red />
            </section>
        </main>
    );
}
