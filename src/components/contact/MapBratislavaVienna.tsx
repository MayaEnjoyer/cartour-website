'use client';

import { useEffect, useRef } from 'react';
import L, { LatLngExpression, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Іконки беремо з /public, щоб не тягнути png як модулі
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
});

type LeafletContainerFlag = { _leaflet_id?: number };

export default function MapBratislavaVienna() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // guard від повторної ініціалізації в StrictMode
        if (mapRef.current) return;

        // інколи Leaflet залишає службовий id на DOM-вузлі — приберемо
        const maybe = el as unknown as LeafletContainerFlag;
        if (typeof maybe._leaflet_id !== 'undefined') {
            delete maybe._leaflet_id;
        }

        // Координати Братислава ↔ Відень
        const bratislava: LatLngExpression = [48.1486, 17.1077];
        const vienna: LatLngExpression = [48.2082, 16.3738];

        const map = L.map(el, {
            center: [48.2, 16.8],
            zoom: 8,
            zoomControl: true,
            scrollWheelZoom: true,
            attributionControl: false,
        });
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Маршрут (пунктир)
        L.polyline([bratislava, vienna], {
            color: '#1f2937', // slate-800
            weight: 4,
            dashArray: '6,6',
            className: 'route-dash',
        }).addTo(map);

        // Маркери
        L.marker(bratislava, { title: 'Bratislava' }).addTo(map);
        L.marker(vienna, { title: 'Wien' }).addTo(map);

        // Автопідгонка вʼюпорту
        map.fitBounds(L.latLngBounds([bratislava, vienna]), { padding: [20, 20] });

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-[360px] w-full rounded-xl border"
            aria-label="Map Bratislava - Vienna"
        />
    );
}
