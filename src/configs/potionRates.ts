import { EPotionIds } from '../data/itemIds';

const buyingRates: Map<EPotionIds, number> = new Map()
    .set(EPotionIds.atk, 7)
    .set(EPotionIds.def, 5)
    .set(EPotionIds.spd, 7)
    .set(EPotionIds.dex, 7)
    // .set(EPotionIds.vit, 4)
    .set(EPotionIds.wis, 5)
;

const sellingRates: Map<EPotionIds, number> = new Map()
    .set(EPotionIds.atk, 4)
    .set(EPotionIds.def, 3)
    .set(EPotionIds.spd, 4)
    .set(EPotionIds.dex, 4)
    .set(EPotionIds.vit, 3)
    .set(EPotionIds.wis, 4)
;

export const potionRates = {
    potBuyingRates: buyingRates,
    potSellingRates: sellingRates,
};
