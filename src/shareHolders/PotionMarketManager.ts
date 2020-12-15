import { RegionalMarketManager } from './RegionalMarketManager';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';

export class PotionMarketManager extends RegionalMarketManager {
    constructor() {
        super();
    }

    public get offers(): IOffer[] {
        const potionIds = Object.values(EPotionIds);
        const stocks = this.stocks.filter(s => potionIds.includes(s.id));

        const offer: IOffer[] = [];

        // convert to glife
        for (const stock of stocks) {
            const ratio = (() => {
                switch (stock.id) {
                    case EPotionIds.dex:
                    case EPotionIds.spd:
                        return 8;
                    case EPotionIds.wis:
                    case EPotionIds.atk:
                        return 6;
                    case EPotionIds.def:
                    case EPotionIds.vit:
                        return 4;
                    default:
                        return Number.MAX_SAFE_INTEGER;
                }
            })();
            const batchCount = Math.floor(stock.quantity / ratio);
            if (batchCount === 0) {
                continue;
            }
            offer.push({
                sellingItems: [stock.id],
                sellingQuantities: [batchCount * ratio],
                buyingItems: [EPotionIds.glife],
                buyingQuantities: [batchCount],
                quantity: 1,
                suspended: false,
            });
        }

        return offer;
    }
}

