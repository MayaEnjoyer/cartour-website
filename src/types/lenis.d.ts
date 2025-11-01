declare module 'lenis' {
    export type LenisOptions = {
        smoothWheel?: boolean;
        wheelMultiplier?: number;
        lerp?: number;
        duration?: number;
        easing?: (t: number) => number;
    };

    export default class Lenis {
        constructor(options?: Partial<LenisOptions>);
        raf(time: number): void;
        destroy(): void;
    }
}
