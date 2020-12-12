export type IStocks = Array<{ id: number, quantity: number }>;

export type IOffer = {
    quantity: number,
    sellingItems: number[],
    sellingQuantities: number[],
    buyingItems: number[],
    buyingQuantities: number[],
    suspended: boolean,
}
