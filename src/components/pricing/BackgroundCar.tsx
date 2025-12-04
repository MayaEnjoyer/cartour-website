'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundCar() {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // На десктопе используем обычный bg-fixed — JS не нужен
        if (window.innerWidth >= 768) {
            el.style.backgroundPosition = 'center center';
            return;
        }

        // Мобильный «псевдо-fixed» через изменение background-position
        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            // Коэффициент 0.35 можно поменять, чтобы фон двигался быстрее / медленнее
            const offset = rect.top * 0.35;
            el.style.backgroundPosition = `center ${offset}px`;
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <section
            ref={ref}
            className="
        relative py-28 md:py-40
        bg-[url('/leaflet/background_car.png')]
        bg-cover bg-center bg-no-repeat
        md:bg-fixed
      "
        >
            {/* затемнение поверх картинки */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative" />
        </section>
    );
}
