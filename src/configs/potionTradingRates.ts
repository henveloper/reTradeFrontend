import { EPotionIds } from '../data/itemIds';

// S> 1 GL equivalent B> rainbows
const lifeToRainbowRates: Map<EPotionIds, number> = new Map()
    .set(EPotionIds.atk, 7)
    .set(EPotionIds.def, 5)
    .set(EPotionIds.spd, 7)
    .set(EPotionIds.dex, 7)
    .set(EPotionIds.vit, 5)
    .set(EPotionIds.wis, 5)
;

// S> 1 GMana equivalent B> rainbows
const manaToRainbowRates: Map<EPotionIds, number> = new Map()
    .set(EPotionIds.atk, 6)
    .set(EPotionIds.def, 4)
    .set(EPotionIds.spd, 6)
    .set(EPotionIds.dex, 6)
    .set(EPotionIds.vit, 4)
    .set(EPotionIds.wis, 4)
;

// S> 16 rainbow B> GL
const rainbowToLifeRates: Map<EPotionIds, number> = new Map()
    .set(EPotionIds.atk, 6)
    .set(EPotionIds.def, 8)
    .set(EPotionIds.spd, 6)
    .set(EPotionIds.dex, 6)
    .set(EPotionIds.vit, 8)
    .set(EPotionIds.wis, 8)
;


export const potionTradingRates = {
    lifeToRainbowRates,
    manaToRainbowRates,
    rainbowToLifeRates,
};
