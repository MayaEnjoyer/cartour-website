'use client';

import { useEffect, type PropsWithChildren } from 'react';
import Lenis, { type LenisOptions } from 'lenis';

export default function UXProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const options: Partial<LenisOptions> = {
            smoothWheel: true,
            lerp: 0.1,
            wheelMultiplier: 1.0,
        };

        const lenis = new Lenis(options as LenisOptions);

        let raf = 0;
        const loop = (t: number) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
