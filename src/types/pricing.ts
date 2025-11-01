export type Zone = {
    name: string;
    sedan: string;
    van: string;
    areas: string[];
};

export type PriceZonesDict = {
    heading: string;
    route: string;
    zones: Zone[];
    includedTitle: string;
    included: string[];
};
