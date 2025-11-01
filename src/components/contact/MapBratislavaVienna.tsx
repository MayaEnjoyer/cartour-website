'use client';

import { useEffect, useRef } from 'react';
import L, { LatLngExpression, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker1x from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker1x,
    shadowUrl: markerShadow,
});

export default function MapBratislavaVienna() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        if (mapRef.current) return;

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

        L.polyline([bratislava, vienna], {
            color: '#1f2937',
            weight: 4,
            dashArray: '6,6',
        }).addTo(map);

        L.marker(bratislava).addTo(map);
        L.marker(vienna).addTo(map);

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
