export type IStocks = Array<{ id: number, quantity: number }>;

export type IAPIOffer = {
    quantity: number,
    sellingItems: number[],
    sellingQuantities: number[],
    buyingItems: number[],
    buyingQuantities: number[],
    suspended: boolean,
}
