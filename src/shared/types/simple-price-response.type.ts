export type SimplePriceResponse = {
    [coin: string]: {
        [currency: string]: number;
    };
};
