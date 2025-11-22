'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

type LeafletMap = import('leaflet').Map;
type LatLngExpression = import('leaflet').LatLngExpression;

export default function MapBratislavaVienna() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<LeafletMap | null>(null); // <-- зберігаємо інстанс між рендерами

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        if (mapRef.current) return;

        (el as HTMLDivElement & { _leaflet_id?: number | null })._leaflet_id = null;

        let cancelled = false;

        (async () => {
            const L = await import('leaflet');
            if (cancelled) return;
            if (!containerRef.current) return;

            // фікс іконок
            const marker1x = (await import('leaflet/dist/images/marker-icon.png')).default;
            const marker2x = (await import('leaflet/dist/images/marker-icon-2x.png')).default;
            const markerShadow = (await import('leaflet/dist/images/marker-shadow.png')).default;
            L.Icon.Default.mergeOptions({
                iconUrl: marker1x,
                iconRetinaUrl: marker2x,
                shadowUrl: markerShadow,
            });

            const bratislava: LatLngExpression = [48.1486, 17.1077];
            const vienna: LatLngExpression = [48.1108, 16.5697];

            const map = L.map(containerRef.current!, {
                center: [48.1108, 16.5697],
                zoom: 9,
                zoomControl: true,
                scrollWheelZoom: true,
                attributionControl: false,
            });

            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            L.polyline([bratislava, vienna], {
                color: '#111827',
                weight: 4,
                dashArray: '6,6',
            }).addTo(map);

            L.marker(bratislava).addTo(map);
            L.marker(vienna).addTo(map);

            map.fitBounds(L.latLngBounds([bratislava, vienna]), { padding: [20, 20] });
        })();

        return () => {
            cancelled = true;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-[360px] w-full rounded-2xl border"
            aria-label="Map Bratislava - Vienna"
        />
    );
}
